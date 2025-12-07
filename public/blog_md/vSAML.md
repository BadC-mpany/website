# Beyond the Context Window: Why We Built a Stateful Security Layer for AI Agents


**By BadCompany Research December 2025**

The transition from LLMs as Chatbots to LLMs as **Agents** is a phase transition in software. We have moved from systems that _read_ to systems that _do_. Agents call APIs, execute code, query databases, manage infrastructure and are able to manage their own state by updating their memory.

But this utility comes with a **catastrophic security** **debt**. We are currently building Software 2.0 agents, _probabilistic_, _adaptive_, and _autonomous_, while securing them with Software 1.0 locks; _static_, _rigid_, and _stateless. Or in some sense even worse, we secure them with just as unpredictable, probabilistic AI as they are._

Most current enterprise frameworks (Google Vertex AI, LangChain, AutoGen) treat security as a compliance checklist or a content filter. They rely on the model’s alignment and guardrails, _probabilistic LLMs_ just like the brain of any agent, to prevent misuse. This is a fundamental architectural error.

We propose a different approach: **vSAML (Verifiable Secure Agent Mediation Layer)**. A zero-trust security layer for AI agents that assumes the model is compromised and enforces safety through **Stateful Taint Tracking** and **Cryptographic Verification**.

| Feature | Standard Frameworks (e.g. Vertex AI) | vSAML Architecture (Our) |
|---------|--------------------------------------|--------------------------|
| **Security State** | Stateless Inspection. Evaluates risk per-request. Ignores historical context. | Finite State Machine. Tracks accumulated risk and data provenance. |
| **Enforcement** | Content Filters. Scans text inputs/outputs. Vulnerable to jailbreaks. | Runtime Hypervisor. Intercepts tool execution. Enforces policy on actions, not just words. |
| **Defense Strategy** | Passive Blocking. Returns errors, providing feedback to attackers. | Honeypot. Silently redirects compromised sessions to High-Interaction Honeypots. |
| **Access Control** | Static RBAC. Permissions are fixed at session start (e.g., IAM Roles). | Dynamic Attenuation. Capabilities are cryptographically downgraded in real-time based on state. |

## The Confused Deputy (1988)

To understand why agents are broken, we must look back to 1988, when Hardy defined the **Confused Deputy Problem** (original paper [**here**](https://dl.acm.org/doi/pdf/10.1145/54289.871709)).

A deputy is a privileged program that is tricked by a malicious user into abusing its authority. In the classical example, a compiler (the deputy) is tricked into overwriting a billing file it has access to. The compiler wasn’t “hacked” via a buffer overflow; it was simply confused about _which_ authority it was exercising.

**AI Agents are the _ultimate Confused Deputies_**

They are designed to be helpful. They hold high-level permissions (API keys, SQL access). When an attacker uses **Indirect Prompt Injection**, hiding a malicious command in a seemingly benign document, they hijack the agent’s intent and trick it to take unintended actions like deleting database entries or exfiltrating private information.

The Agent reads the document, the context window shifts, and the Agent executes the attacker’s goal using its own legitimate credentials. Standard Access Control Lists (ACLs) fail here because they authenticate the _Agent’s Identity_, not the _User’s Intent_.

**Verifiable Information Flow Control**

The critical flaw in current frameworks is that they are **stateless** regarding security. They ask: _“Is this prompt malicious?”_ rather than _“Did this user access a private file 10 turns ago?”_

To solve this, we moved beyond brittle file tagging. vSAML implements **Dynamic Information Flow Control**, adapted from high-assurance kernels (like seL4) for the probabilistic stream of LLMs. We treat the agent’s memory as a **Security Lattice**.

**Label Propagation:** Every token, whether from RAG, user input, or tool output, carries a cryptographic label (e.g., `confidential`, `public`). We enforce a **Non-Interference Property**: output tokens _automatically inherit_ the highest security label of the input. The taint isn't a flag; it's a mathematical property of the data lineage.

**The Lattice Gate:** Our enforcement layer is a deterministic **Access Control Enforcement** kernel. It verifies that information flows only _up_ the lattice (integrity) or _down_ via specific channels.

> _Scenario:_ Agent tries to post a summary of a `confidential` patient record to a `public` Slack channel.
> 
> _Result:_ The kernel blocks the API call construction. Not because the model “refused,” but because `confidential` > `public`. It’s a type-checking error at the infrastructure level.


**Safe Declassification:** To preserve utility, agents _can_ release high-side data if it passes through a verified “Sanitizer” tool (like a deterministic PII scrubber) that cryptographically downgrades the label.

## Cryptographic Sovereignty: JWTs and Macaroons

To enforce this state, we need a robust token strategy tailored to the agent configuration.

### **1. Single-Agent: The Trusted Interceptor**

For direct agent-to-tool interactions, we reject the notion of giving agents direct access to MCP (Model Context Protocol) servers. Instead, we insert a **Trusted Interceptor** (our “Sentinel”) between the untrusted Client (the Agent) and the Tool Executor.

*   **The Checkpoint:** Every tool call is intercepted by a Policy Enforcement Point that loads `policies.yaml`. It checks **Static Rules** (allow/deny) and **Dynamic Rules** (Taint State from Redis).
*   **The Binding:** If the Policy Engine approves the action, it mints a short-lived **JWS (JSON Web Signature)**. This token cryptographically binds the permission to the _exact arguments_ of the call (preventing TOCTOU attacks).

**The Execution:** The MCP server is effectively _air-gapped_ from the agent. It trusts _only_ the **JWT signature from the Interceptor**. If the Agent starts hallucinating or trying to bypass the proxy, it fails immediately because it lacks the cryptographic capability to sign its own requests on tool calls.

### **2. Multi-Agent: The Cryptographic Handshake.**

New attack surfaces arise with delegation. When Agent A spawns Agent B, passing the root keys is a nightmare. We solve this with two primitives:

**A. Offline Attenuation (Macaroons):** Unlike JWTs, Macaroons allow us to derive weaker tokens offline.

*   _Scenario:_ Agent A has `[READ, WRITE, DELETE]`. It needs Agent B to read a file.
*   _Constraint:_ Agent A signs a new token restricted to `[READ_ONLY]` and passes it to B.
*   _Guarantee:_ Even if Agent B is fully jailbroken, it mathematically cannot execute a `DELETE` since it never held the keys.

**B. Transitive Taint Inheritance:** Security state is transitive across the delegation chain. If Agent A is in a `TAINTED` state, it is blocked from spawning a `CLEAN` sub-agent. Any child inherits the parent's taint. We enforce structured communication (via MCP) to prevent malicious context from leaking through unstructured natural language channels (one such an architecture is proposed in the [IsolateGPT paper](https://arxiv.org/abs/2403.04960)).

## The Honeypot

Standard blocking measures provide feedback to attackers. If a agent attacking the system receives `ACCESS DENIED`, it effectively learns what _not_ to do, allowing it to refine its next attempt. To counter this, we apply a classic cybersecurity active defense strategy: _Deception_.

We implement a **Split-Horizon Honeypot**. Upon detecting an attack signature, such as invisible canary tokens appearing in the output, we silently hot-swap the backend to a high-interaction “Shadow Twin.”

This environment mimics the production system but contains only synthetic data. The attacker “successfully” exploits the shadow system, retrieving fake credentials or files. This disrupts the optimization loop by validating a useless strategy, protecting real production assets while generating valuable forensic intelligence on new attack vectors.

The honeypot realization is very limited and is also only tested to minimal extent and potential questions arise related to the definition of the trigger and implications on benign users getting fake data because of false positives.

## Conclusion

vSAML represents a necessary architectural evolution. While this framework provides robust protection against direct injection and exfiltration, it remains subject to the constraints of the underlying infrastructure, specifically relying on taint propagation and also can add substantial overhead on agentic workflows. Theoretically it remains vulnerable to sophisticated side-channel attacks.

Despite these boundaries, the value of this architecture lies in the fundamental paradigm shift it enables. We are moving the industry away from vibe-based security which relies on the probabilistic hope of model alignment, toward **state**-**based** security, where we can mathematically prove that an agent, compromised or not, simply lacks the capability to act against its directive.


Check out the research and what we built:
[github.com/BadC-mpany/chimera-hackathon](https://github.com/BadC-mpany/chimera-hackathon)

_Grego, Janos & Petya_
