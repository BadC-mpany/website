# Prompt Injection Is the Right Problem to Solve

*April 2026*

There is a particular kind of security mistake that looks like a product decision: defending against the wrong threat. Teams build classifiers, guardrails, and behavioral monitors when the actual attack surface is structural, not semantic. We spent months being certain that prompt injection was the right threat to focus on. This is the technical argument for why, and exactly how we built the structural defense.

## Why Classifiers Cannot Win

The standard industry response to prompt injection is a classifier: a secondary model trained on injection patterns that scores inputs for malicious intent. This is understandable and fundamentally wrong in adversarial contexts.

The failure mode is mathematical. Any classifier generalizes from a training distribution. Injections outside that distribution are invisible to it. An attacker who knows the classifier's architecture can generate novel phrasings that score benign. This is not a theoretical concern, it is the standard adversarial example problem, documented in the machine learning literature since Szegedy et al. 2014. Classifiers in high-stakes security paths against adaptive adversaries is a known-bad design pattern.

The correct distinction: whether an input *looks like* an injection is a question for the model layer. Whether an agent *can execute a harmful sequence of tool calls* is a question for the enforcement layer. Conflating these two in a guardrail proxy produces a system that is confident but wrong.

You do not need to detect injections. You need to make the harmful call sequence structurally impossible, regardless of what the model decided.

## Information Flow Control: The Right Abstraction

Taint propagation is an instance of information flow control (IFC), a field with roots in Denning's 1976 lattice model and decades of application in operating systems (SELinux, AppArmor), compilers (Perl's taint mode), and formal verification (information flow type systems in Jif and FlowCaml).

The abstraction maps directly to agentic systems:
- **Sources**: tool calls that read potentially sensitive or untrusted data (`read_file`, `fetch_url`, `query_database`)
- **Sinks**: tool calls that write data outside the agent boundary (`http_post`, `send_email`, `write_file`)
- **Labels**: a 64-bit bitmask of capability tags, one bit per data category

The invariant is total and simple: if a session's taint accumulator has bit k set, any Cedar policy that checks bit k will block the action. The model's reasoning about the data is structurally irrelevant. The bit was set by a prior tool call, not by anything the model said or decided.

## The 64-bit Taint Bitmask

Each SPIFFE identity session maintains a single `AtomicU64` taint accumulator, initialized to zero. Bit assignments are defined in the taint registry, part of the signed policy capsule:

```
file_read:       bit 0   (mask = 0x0000000000000001)
network_in:      bit 1   (mask = 0x0000000000000002)
sensitive_pii:   bit 2   (mask = 0x0000000000000004)
database_read:   bit 3   (mask = 0x0000000000000008)
user_data:       bit 4   (mask = 0x0000000000000010)
exec_output:     bit 5   (mask = 0x0000000000000020)
```

When the agent calls `read_file`, the evaluator executes `fetch_or(0x01, Ordering::Release)`. Subsequent calls to `http_post` see bit 0 set and apply the Cedar rule:

```cedar
forbid(
  principal is Agent,
  action == Action::"http_post",
  resource is RemoteHost
)
when { context.data_touched & 1 != 0 };
```

The exfiltration is blocked at the enforcement layer. The agent may "intend" the exfiltration. The taint bit is already set. The action is forbidden.

## Concurrency: Why AtomicU64::fetch_or Is the Only Correct Operation

Agents make concurrent tool calls. A naive read-modify-write of the taint accumulator under concurrent load loses bits:

```
Thread A reads data_touched = 0x01
Thread B reads data_touched = 0x01
Thread A ORs 0x02, writes 0x03
Thread B ORs 0x04, writes 0x05   // overwrites Thread A
Result: 0x05                      // 0x02 is silently lost
```

`AtomicU64::fetch_or(bits, Ordering::Release)` is a single atomic read-modify-write instruction. On x86-64 this compiles to `lock xor [addr], bits`. There is no window for a race. Combined with `DashMap` for per-session storage (16 shards, no global lock), the hot path serializes nothing and holds no locks.

The correctness property is provable: `fetch_or` is monotone. Within a session lifetime, `data_touched` can only increase. Bits are never cleared, only added.

## NLP to Cedar: How We Scale Policy Authoring

The hard operational problem with Cedar is authoring at scale. Security teams are not Cedar programmers. We need to go from natural language security intent to verified Cedar policy without manual translation errors.

Our pipeline has four stages:

**Stage 1: Intent capture.** The operator writes a natural language description: "Agents that read any file must not be able to make outbound network requests in the same session."

**Stage 2: LLM-assisted compilation.** A structured prompt sends the intent plus the Cedar schema (action names, resource types, context fields, taint bit assignments) to an LLM. Critically, the LLM outputs Cedar AST in JSON, not Cedar text directly. Structured output against a JSON schema catches hallucinated action names at parse time before any code runs.

**Stage 3: Schema validation.** The AST is validated against the active Cedar schema. Every `Action::""` reference is checked against the registered action set. Every `context.data_touched` bit reference is validated against the taint registry bit assignments. Policies that reference non-existent actions or invalid bit positions are rejected with precise error messages pointing to the invalid node.

**Stage 4: Formal verification.** Before signing into a capsule, the compiled Cedar policy is analyzed by CVC5, the SMT solver embedded in Cedar's own verification toolchain. This is not testing. It is machine-checked proof over all possible inputs.

## What CVC5 Proves

Cedar ships with a symbolic analyzer backed by CVC5. When a policy is submitted for signing, it is checked against the Cedar schema and the registered taint registry. The solver runs over the full space of possible principal, resource, action, and context values.

**Taint constraint consistency.** For every deny rule of the form `when { context.data_touched & mask != 0 }`, CVC5 proves the constraint is satisfiable and non-vacuous: there exists a context that triggers it and a context that does not. An unsatisfiable deny rule is a policy bug. It is rejected before signing.

**No forbidden-action bypass.** For each action the natural language intent marks as forbidden, CVC5 confirms no combination of principal, resource, and context satisfies a permit rule for that action. The policy cannot accidentally permit what it was written to deny.

**Schema completeness.** Every `Action::""` reference is verified against the Cedar schema. Every `context.data_touched` bit reference is within the registered 64-bit taint label space. Policies referencing undefined entities are rejected.

These checks run in CI on every capsule sign operation. A capsule that fails any CVC5 check is not issued.

## Throughput: 1.5 Million Decisions per Second

The evaluation hot path on 8 cores:

1. `DashMap::get(&spiffe_id)` -- sharded lookup, no global lock (~50 ns)
2. `session.data_touched.load(Ordering::Acquire)` -- atomic read (~5 ns)
3. Cedar DFA evaluation -- pre-compiled from policy text at capsule load, pure function over (action, context) (~200 ns)
4. `fetch_or(taint_update, Ordering::Release)` -- atomic write (~5 ns)

Total per decision: approximately 260 ns. At 8 threads, theoretical maximum is around 30 million decisions per second. Measured throughput under production-realistic workloads (connection overhead, TLS termination, HTTP/1.1 frame parsing, audit log emission) is 1.5 million decisions per second at under 1 ms p99 latency.

The Cedar DFA is pre-compiled once when the capsule loads. Policy evaluation is a state machine traversal, not a re-parse. This is what allows Cedar evaluation to run inline in the proxy hot path without a separate policy engine process or inter-process round-trip.

---

Prompt injection is the right problem because it is the attack class where model-layer defenses are structurally insufficient. The enforcement layer must be independent of the model's reasoning. Taint propagation is the right answer because it makes the harmful call sequence impossible, not detectable, impossible.

If you are building or deploying AI agents in production, [get in touch](https://badcompany.xyz/#contact).
