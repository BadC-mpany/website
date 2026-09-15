# The Problem

AI systems and the underlying infrastructure are changing continuously. Security needs to last forever.

1. **Obsolete Architectures**: The AI stack changes week by week. That means security frameworks built around a specific model or API can become outdated almost as soon as the foundation underneath them shifts.

2. **Execution Blind Spots**: Once an agent has tool access, what it actually does becomes a black box. Current stacks do not have the visibility to detect, or the control to stop, and data exfiltration.

3. **The "Guardrail" Fallacy**: AI security today relies on linguistic constraints and high-level filters. These controls are probabilistic, easy to bypass, and introduce significant latency. You cannot secure a system by asking it to behave safely.

4. **Policy Definitions are Difficult**: The policies agents are expected to follow are narrow in scope, hard to formalize, and lack mathematical guarantees of soundness.

# The Solution: Securing the Execution Layer

Replace best effort guardrails with deterministic enforcement.

* **Architectural Durability**: The kernel-level core is stable and durable, providing long-term, predictable security for critical infrastructure.
* **Action-level Auditability**: Every privileged action is logged with searchable, tamper-evident integrity.
* **Deny-by-Default Capabilities**: The agent retains its dynamic decision-making and tool-selection logic, but starts with zero execution authority. All privileged actions require cryptographic authorization.
* **Natural Language for Policy Definitions**: A module to translate natural language to policy definitions. An algorithm that verifies the completeness and correctness of a policy.

# The Product

Meet ***Lilith***: runtime security and observability at the kernel layer.

* **Visibility**: at the kernel level, ***Lilith*** sees everything that happens in an AI execution environment
* **Detection**: every system event and log is monitored, analyzed, and categorised in real time
* **Enforcement**: harmful and non-compliant requests are revoked at layer zero
* **Durability**: deployed at OS level
* **Traceability**: cryptographically signed, tamper-evident audit logs
* **Natural language**: unlocking common language description of to automate policy creation

We provide ***Lilith*** as an execution environment that contains agent workloads, transforming untrusted AI agents into deterministic and secure systems. It provides a near-zero latency, provable and durable security environment for agents.

![System Architecture](/tech_doc/diagram.mmd)

# We offer ***Lilith*** for two deployment environments

**Autonomous Agent Containment (Server-Side)**: For organizations deploying proprietary or third-party agents in cloud or on-premise environments. ***Lilith*** encapsulates the agent within a secure, hardened virtual machine. By monitoring execution at the kernel level, it prevents agents from exfiltrating sensitive data, installing unauthorized binaries, or compromising lateral infrastructure.

**Endpoint Agent Governance (Workstation-Side)**: Deployed directly on an employee's workstation to mitigate risks from local agentic interactions. This prevents data leakage and unauthorized breaches on the employee’s side. ***Lilith*** provides forensic-grade traceability, allowing organizations to determine whether a leak was intentional or accidental by tracking the data flow directly to the originating system call.