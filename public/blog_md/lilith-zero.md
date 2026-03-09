# **We built deterministic agent security at ms scale: Lilith Zero**

Everyone who has built agents knows MCP. It rapidly standardized how LLMs natively interact with _external tools_ and _data sources_. Major organizations sprinted to connect their data warehouses, internal APIs, and operational tooling directly into agent execution loops. But with massive enterprise adoption came the inevitable reality of massive and structural vulnerability.

We watched the [**Replit incident**](https://codenotary.com/blog/a-reflective-perspective-on-replits-ai-incident) unfold in July 2025, where an over-permissioned AI agent autonomously wiped over 1200 production DB records, completely ignoring a requested code freeze. Shortly after, the security landscape was rocked by [**CVE-2025–6514**](https://nvd.nist.gov/vuln/detail/CVE-2025-6514), a staggering **CVSS 9.6** command injection flaw discovered in [**mcp-remote**](https://www.npmjs.com/package/mcp-remote). That single vulnerability compromised the host systems of Claude and Cursor users globally, proving exactly how fragile the integration layer had become.

The response to these architectural failures was pretty predictable. We saw a flood of probabilistic guardrails, Python/JS-based WAFs (web application firewalls) masquerading as modern AI security infrastructure. Solutions like [**Lasso MCP Gateway**](https://github.com/lasso-security/mcp-gateway) and [**MCP Guardian**](https://github.com/eqtylab/mcp-guardian) attempt to solve agent security by bolting on heuristic classifiers (LLM-based guardrails like [**NeMo**](https://www.nvidia.com/en-us/ai-data-science/products/nemo/)), regex filters and slow app-layer firewalls (latter is better inherently in terms of the security model, though some of them even stored API keys in plain text).

[**Trail of Bits**](https://blog.trailofbits.com/2025/07/28/we-built-the-security-layer-mcp-always-needed/) correctly identified the severity of prompt injection and line jumping attacks (skipping validation steps and directly jumping to sensitive tool execution) with their [**mcp-context-protector**](https://github.com/trailofbits/mcp-context-protector), pushing for robust end-to-end (E2E) encryption and trust-on-first-use pinning (used in ssh to prevent middleman attacks). Though its still a python-based wrapper solution.

> _That’s why we built our first MVP for agent security at_ [**_BadCompany_**](https://badcompany.xyz/)_.
> It’s called_ [**_Lilith_**](https://en.wikipedia.org/wiki/Lilith) **_Zero_**._The first and only_ ultra-fast, rust-based, deterministic, completely general **_security middleware for the MCP_**._Opensourced. Github repo_ [_here_](https://github.com/BadC-mpany/lilith-zero)_._

We also argue (many do since the beginning of 2025 already) that treating prompt injection fundamentally as a parsing or semantic classification problem is a _category error_. Semantic detection (based on guardrails) of prompt injection is a _distinct separation of concerns_. It belongs in the model layer or a dedicated classification pipeline upstream.

Security is all about _verifiable guarantees_ of not getting fucked. An agent security solution has to be able to _verify data flows_, maintain rigorous execution state and impose near-zero latency when enforcing policies on the execution loop. We argue that _latency is itself a security feature_; if an auth proxy is slow, adding 50-200ms per tool call as python interpreters thrash through garbage collection, devs will inevitably bypass it.

**Moats of optimized security in lilith-zero**
----------------------------------------------

For autonomous agents negotiating hundreds of asynchronous tool calls a minute, a Python interpreter overhead is fatal. The **`lilith-zero`** Rust core operates at microsecond scales, boasting _codec decoding times_ of approx. _247 ns_ and _policy validation_ in roughly _660 ns_ on a usual windows desktop (I wouldn’t show off with the results on M4 MacBook now though). But raw speed is only half of the equation. We leveraged Rust’s memory safety and affine type system to construct OS-level process isolation, making structural vulnerabilities _unrepresentable_.

**`lilith-zero`** adheres to strict _Fail-Closed_ patterns. Any omission in policy, unmapped operational state, malformed JSON-RPC 2.0 request or unexpected network drop defaults to a _hard failure_.

Unlike other MCP security solutions (some _self-promotion_ is coming but still true;) that run as fragile Python subprocesses, **`lilith-zero`** acts as an **OS-level process supervisor**. If a traditional middleware crashes, the underlying MCP server can become a _zombie process_, potentially even quietly holding onto OAuth tokens and database sockets. By binding child processes to Windows Job Objects (win32job) and utilizing Linux `PR_SET_PDEATHSIG` alongside Landlock sandbox capabilities, **`lilith-zero`** guarantees that if the agent or the middleware crashes, the upstream connection is immediately killed. There are no orphaned states and no leaking credentials.

The implemented taint tracking types (used for tag-based information flow control) are enforced at compile time. In **`lilith-zero`** it is impossible to compile a binary that passes an unsanitized string into a critical execution sink (like a web query or email). Every piece of incoming data from the MCP codec is strictly wrapped in a `TaintedString` type, and only explicitly audited extraction mechanisms are permitted to unwrap it into a `Clean<T>` type for operational use.

Finally, **`lilith-zero`** intercepts communication entirely over standard stdio, enforcing rigorous `Content-Length` ([LSP-stlye](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)) bounds and strict JSON-RPC 2.0 framing at the stream level. This pre-emptively strips away _JSON smuggling_ and _request splitting attacks_ before payloads can ever reach a vulnerable tool server.

**YAML policy engine and Agents Rule of Two**
---------------------------------------------

We entirely abandoned heuristic blocking in favor of a deterministic YAML policy engine. Devs explicitly define authorization logic, resource constraints using standard wildcards and granular state-tracking actions such as **`ADD_TAINT`** or **`CHECK_TAINT`**.

Our core structural defense targets the architectural root of the LLM data exfiltration problem by implementing a useful abstraction which natively enforces the **Agents Rule of Two** which is often referred to as the [**Lethal Trifecta**](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).

For data exfiltration event to occur, an attacker requires three things simultaneously within a single session: **_(1) access to private data_** (such as querying a PII database or reading emails), the ability to **_(2) process untrusted content_** (like fetching an external web page containing an injection payload), and a route for **_(3) external communication_** (such as executing a benign looking web search which is an HTTP POST to an attacker-controlled endpoint called with /params=<API_key> and an easy exfiltration happened).

Because LLM classifiers (guardrails) suffer from massive generalization gaps (plus all such defenses are _optimizable_ meaning they can be broken by adaptive attacks) when facing novel injection attacks, **`lilith-zero`** does not attempt to guess if a payload (e.g. prompt, tool description, tool response etc.) is malicious. Instead, it breaks the attack chain deterministically. Using the YAML engine, **`lilith-zero`** dynamically tracks session state. An agent is structurally forbidden from executing tools that satisfy all three legs of the **Lethal Trifecta** simultaneously.

**Rigorous assurance during development**
-----------------------------------------

We didn’t just write a middleware, unit tested it and pushed it to github; we used standard security methods developed for rust and formally proved the correctness of some key modules of **`lilith-zero`** and also analysed the runtime behavior of unsafe implementation with [**miri**](https://github.com/rust-lang/miri) (undefined behavior detection tool for rust).

We used the [**Kani Rust Verifier**](https://github.com/model-checking/kani) to formally prove invariants in our most critical execution paths. We have mathematically verified that our taint sanitization routines preserve data integrity, our `Content-Length` parsing is strictly immune to integer overflow, and our session ID generation maintains true >256-bit entropy.

> Disclaimer: Even after dozens of sophisticated security testing, vulnerabilities could have seeked in and remain present, so don’t trust **`lilith-zero`** like you would trust a bank vault, though its pretty damn secure! If you find any issue or vulnerabily though, please report them to [security@badcompany.xyz](mailto:security@badcompany.xyz)

**Sub-ms security in under a minute**
-------------------------------------

Hard reality of enterprise DevOps is that security fails if devs dont deploy it because of potential performance degradation or integration related friction (including the deployment agent; hopefully they know and understand the pretty high risk security threats coming with MCP out-of-the-box). **`lilith-zero`** is designed to _wrap_ any existing MCP server with minimal code changes, sidestepping the friction that slows.

```bash
# 1. Download the static 12MB Rust binary
curl -sSL https://badcompany.xyz/lilith-zero/install.sh | sh
# 2. Optionally grab the Python SDK
uv pip install lilith-zero
```

> _Configure your infra to use_ **`_lilith-zero_`** _as the command wrapper for your tool servers, point it to your YAML policy definition, and your agents and tool servers become secured processes by binding._

You can run **`lilith-zero`** fully standalone from the command line. It also supports file-based logging utilizing **HMAC-SHA256** signatures via the `LILITH_ZERO_JWT_SECRET` environment variable, writing directly to structured _.jsonl_ files (`--audit-logs`) which guarantees tamper-proof auditing of tool calls.

```bash
# Command Line Wrapping 
LILITH_ZERO_JWT_SECRET="my-hmac-key" lilith-zero \
  -u "npx" \
  --policy my-security.yaml \
  --audit-logs /var/log/mcp_audit.jsonl \
  -- -y @modelcontextprotocol/server-postgres
```

For teams building Python-based agent workflows, we provide a native SDK indexed on PyPI as [**`lilith-zero`**](https://libraries.io/pypi/lilith-zero):

```python
import asyncio
from lilith_zero import Lilith

async def main():
    # Lilith auto discovers the correct Rust binary & starts the OS supervisor
    async with Lilith(
        upstream="npx -y @modelcontextprotocol/server-postgres",
        policy="my-security.yaml"
    ) as lilith:
        # transparently restricts tool server execution based on YAML rules
        res = await lilith.call_tool("query_db", {"sql": "SELECT 1"})
        print(f"Result: {res['content'][0]['text']}")

if __name__ == "__main__":
    asyncio.run(main())
```

Memory-safe, deterministic, sub-ms agent infra is not a premium enterprise add-on. It’s the baseline like https for webapps.

Next steps and considerations for lilith-zero
---------------------------------------------

**`lilith-zero`** is a _foundational security layer_ for MCP, but the landscape of true autonomous agency is expanding rapidly. Our architectural roadmap is focused on expanding enforcement fidelity without sacrificing performance.

**Cedar Policy Engine**

While our YAML engine is highly efficient, complex enterprise topologies require formal authorization languages. We plan to integrate [**AWS Cedar**](https://www.cedarpolicy.com/), an open-source policy language rooted in Verification-Guided Development. Because Cedar’s formal proofs guarantee that policies terminate and do not conflict, integrating it allows **`lilith-zero`** to support complex RBAC/ABAC models without sacrificing performance.

**DAG-Based Information Flow Control**

Binary taint tracking (e.g., classifying data as simply `TAINTED` or `CLEAN`) falls apart in highly complex, multi-agent workflows. Inspired by the [**FIDES**](https://arxiv.org/abs/2412.04633) (Flow Integrity Deterministic Enforcement System) architecture, we plan to migrate our binary taint tracking into a Directed Acyclic Graph (DAG) lattice. This allows **`lilith-zero`** to track granular data lineage across thousands of asynchronous executions, selectively quarantine downstream tool requests and enforce mathematically sound Information Flow Control across disparate MCP boundaries.

**Transport Extension: Remote Server Support (streamable HTTP/SSE)**

Currently, **`lilith-zero`** operates exclusively over local stdio to maximize process supervision. However, the ecosystem heavily utilizes remote tools. In an upcoming transport evolution, Lilith will natively support the Server-Sent Events (SSE) and streamable HTTP transport mechanisms standard in MCP (version 2025 november), allowing enterprises to securely proxy remote server connections while preserving our strict codec framing and boundary defenses.

**Protocol Feature Sync: Handshakes and Elicitation**

Anthropic released several crucial features to the MCP protocol in late 2025, including native support for long-running task workflows, pagination, and human-in-the-loop elicitation. **`lilith-zero`**’s codec will be expanded to validate, sanitize, and pass through these new message types seamlessly.

**Crucial Note on Separation of Concerns**

The ecosystem also demands human-in-the-loop (HITL) authentication and tool execution authorization integrations, sandboxed tool execution envs for running unknown code (via WebAssembly or OS containers like gVisor), and cryptographic code/tool signing. While we view these features as absolutely essential for agent security, **`lilith-zero`** **will not build them.**

**End**

**`lilith-zero`** is a dedicated _general_ _transport-layer security middleware_. Building Identity Providers or WebAssembly runtimes directly into the proxy is an architectural mistake that fractures the ecosystem. Instead, our plan with **`lilith-zero`** is about making it easily integrable with these external systems (delegating execution sandboxing to the host systems and identity validation to specialized providers). This ensures that our core intercept remains _small_, _auditable_, and _blindingly fast,_ but supports _all_ parts of the _security lifecycle of agents_.

check out the [**codebase on github**](https://github.com/BadC-mpany/lilith-zero)