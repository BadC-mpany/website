# Taint Propagation: Why Heuristics Will Always Lose Against Prompt Injection

*April 2026*

Prompt injection has a fundamental property that makes it unusually resistant to classifier-based defenses: it is an adversarial optimization problem where the attacker has direct feedback. If you publish a guardrail that blocks "ignore previous instructions," attackers will find phrasing that passes. Always. This isn't a limitation of a specific product, it's a mathematical property of the problem.

We use a different approach. Instead of trying to detect injected instructions, we track what data has touched what agent capabilities. If a file read happened in this session, certain network writes become structurally impossible, regardless of what the model decided. This is taint propagation, and it's the only category of defense that holds against adaptive attackers.

## Why Semantic Detection Fails

The standard approach to prompt injection defense is a classifier: pass the LLM's input and output through a secondary model that looks for injection patterns. This approach is understandable but fundamentally broken for three reasons.

**Generalization gaps.** Any classifier trained on known injection patterns will fail against novel phrasings. The attack surface is the entire natural language space minus whatever you trained on. Attackers can generate novel evasions faster than you can retrain classifiers.

**Adaptive attacks.** If an attacker knows the structure of your defense (and they can, because most products use similar architectures), they can directly optimize inputs to maximize classifier confidence of being benign. This is the standard adversarial example problem, known since 2014. Classifiers in security-critical paths against adaptive adversaries is a known-bad design pattern.

**Separation of concerns.** Whether content *looks like* an injection is a question for the model layer. Whether an agent *can* execute a harmful sequence of tool calls is a question for the enforcement layer. Conflating these two problems in a guardrail proxy means neither is solved well.

Taint propagation solves the enforcement problem. It makes no claim about detecting injections, it simply makes the harmful tool-call sequences structurally impossible.

## Information Flow Control: The Academic Foundation

Taint propagation is a specific instance of information flow control (IFC), a field of programming languages and formal methods research going back to Denning's 1976 lattice model. The core idea: every piece of data has a *security label*, and computations propagate labels according to fixed rules. Data that flows from a high-security source cannot flow to a low-security sink without an explicit, audited declassification.

In the context of AI agents:

- **Sources** are tool calls that read potentially sensitive or untrusted data: `read_file`, `fetch_url`, `query_database`.
- **Sinks** are tool calls that write data outside the agent's boundary: `http_post`, `send_email`, `write_file` (in certain contexts).
- **Labels** are capability tags: `file_read`, `network_in`, `sensitive_pii`, `user_data`.

The invariant: if session data is labeled `file_read`, any tool call that writes to an external sink is blocked. The agent can still think about the file contents. It simply cannot act on them in ways that constitute exfiltration.

## The Implementation: 64-bit Taint Bitmask

Lilith tracks taint as a 64-bit integer per agent session. Each bit position corresponds to a capability label defined in the taint registry. The bit assignments are part of the signed policy capsule, so they cannot be modified at runtime.

Example registry (simplified):
```
file_read:       bit 0  (mask = 0x01)
network_in:      bit 1  (mask = 0x02)
sensitive_pii:   bit 2  (mask = 0x04)
database_read:   bit 3  (mask = 0x08)
user_data:       bit 4  (mask = 0x10)
```

When the agent calls `read_file`, Lilith ORs `0x01` into the session's taint accumulator. When it subsequently calls `http_post`, the Cedar evaluator sees `context.data_touched` with bit 0 set and can apply the rule:

```cedar
forbid(
  principal is Agent,
  action == Action::"http_post",
  resource is RemoteHost
)
when { context.data_touched & 1 != 0 };
```

No network egress after any file read. The model's reasoning about the file is irrelevant. The taint bit was set by the file read, not by the model.

## Concurrency: AtomicU64::fetch_or

Agents make concurrent tool calls. A naive read-modify-write of the taint accumulator under concurrent load will lose bits under race conditions:

```
Thread A: read(data_touched = 0x01) → compute OR with 0x02 → write(0x03)
Thread B: read(data_touched = 0x01) → compute OR with 0x04 → write(0x05)
Result:   0x05  (lost 0x02, thread A's taint update was overwritten)
```

We use `AtomicU64::fetch_or(bits, Ordering::Release)` for all taint accumulation. This is a single atomic read-modify-write instruction at the CPU level, no mutex, no window for a race. Combined with `DashMap` for per-session storage (sharded hash map, no global lock), the evaluator can handle thousands of concurrent tool calls per agent without serialization.

The correctness property: taint bits can only increase within a session. `fetch_or` is monotone, bits are never cleared, only added. An agent that has performed a sensitive operation remains tainted for the entire session lifetime, regardless of what subsequent tool calls do.

## Session Lifecycle: When Does Taint Reset?

Taint resets when the session ends. Sessions are identified by SPIFFE URI, `spiffe://corp/agent-42`, and have a configurable TTL (default: 1 hour after last activity). When a session expires or is explicitly evicted, the taint accumulator returns to zero for the next session.

This is a deliberate design tradeoff. A long-running agent that reads a sensitive file at session start is restricted for the entire session, not just until the next tool call. This is conservative, it may frustrate some legitimate use cases, but it correctly handles the attacker model where a sophisticated injection persists across many tool calls, waiting for the right moment to exfiltrate.

Operators can configure shorter session TTLs for high-sensitivity contexts, or use Cedar policy to express more granular time-based rules.

## Closed-Form Proof of Lethal Trifecta Prevention

The Lethal Trifecta requires three capabilities to co-occur in a single session:
1. Access to private/sensitive data (source)
2. Processing of untrusted external content (contamination)
3. External communication (sink)

With taint propagation:

- Capability 1 sets taint bits for `sensitive_data` and/or `file_read`.
- Capability 2 sets taint bits for `network_in` and/or `untrusted_input`.
- The Cedar policy `forbid action == "http_post" when data_touched != 0` blocks capability 3 the moment any bit is set.

An exfiltration event requires all three. The policy forbids the sink whenever either of the first two has occurred. The attack chain is broken at the enforcement layer, not detected, not classified, not heuristically identified, **made structurally impossible**.

## Lilith Zero vs Lilith: Where Taint Runs

In **Lilith Zero**, taint propagation runs in the Python or TypeScript SDK. The `@guard.tool(taint=["file_read"])` decorator intercepts tool calls, computes the taint update, evaluates Cedar policy via our Rust core (via FFI), and blocks or permits the call before it reaches the MCP server. This is application-layer enforcement, it works with any agent framework without kernel requirements.

In **Lilith**, taint propagation runs in the kernel-level proxy. The proxy intercepts every tool call (via transparent BPF redirect), evaluates Cedar + taint, and either relays the request to the upstream MCP server or returns HTTP 403. The agent's code is entirely unmodified. There is no SDK to install. There is no way for the agent to bypass the proxy, the BPF hook redirects every connection at the kernel level before the agent's syscall completes.

Both enforce the same Cedar policy. An operator writes the policy once and deploys it to both layers.

---

Taint propagation has been standard in operating systems (SELinux, AppArmor), compilers (Perl's taint mode, Rust's ownership), and formal verification (information flow type systems) for decades. It has never been applied to AI agents. We believe it's the only structurally sound defense against prompt injection-driven exfiltration, and we're building the production infrastructure for it.

If you're building or deploying AI agents and want to discuss the threat model, [get in touch](https://badcompany.xyz/#contact).
