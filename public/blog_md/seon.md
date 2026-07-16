# SEON x BadCompany Security Audit

*July 2026*

SEON partnered with BadCompany to conduct a security audit of its newly developed MCP server. The MCP exposes SEON's core fraud-investigation capabilities as standardized tools that AI agents can call, giving agents controlled access to context such as events, users, statistics, and rules, and the ability to take well-scoped actions.

The engagement evaluated the application logic, AI-interaction patterns, and compliance posture of the integration as part of preparing it for production use, with a focus on the new attack surfaces that an agent-facing interface introduces.

## Scope and Methodology

The review concentrated on the new attack surfaces created by the MCP integration and its interface with upstream LLMs. Standard infrastructure tests like container breakout, cloud IAM permission analysis, and WAF/DDoS testing were out of scope, as SEON has robust, pre-existing protections for its foundational cloud infrastructure.

BadCompany ran a full-stack evaluation combining grey-box penetration testing, source-code analysis, capability-flow mapping across the registered tools, and custom generative fuzzing of the agent-facing interface.

Because the target environment used short-lived authentication, BadCompany, with SEON's authorization, built a custom testing harness that maintained a valid authenticated session under the platform's rotating-token model. This enabled uninterrupted, authenticated fuzzing and continuous evaluation of the server's state-handling logic without the test cycle stalling on token rotation.

## Findings and Architectural Improvements

BadCompany mapped the attack surface across all registered MCP tools. As part of the pre-production hardening process, the team refined input handling and data minimization in logfiles based on the audit findings. BadCompany also proposed data redaction rules to ensure that sensitive information is scrubbed before it reaches the AI's context window or operational logs, aligning the system with GDPR and PCI-DSS standards.

## Areas of Assessment

Working from the capability-flow map, BadCompany examined the MCP server across the dimensions where an agent-facing interface most changes a system's risk profile. The objective was to understand how untrusted input, service-to-service trust, and data exposure behave once SEON's core fraud-investigation capabilities become reachable by autonomous agents rather than only by human operators.

Areas of focus included:

- **The tool and capability surface**: how each registered tool is defined, invoked, and bounded, and how an agent's requests translate into actions against SEON's underlying systems.
- **Input and data flows**: how external and agent-supplied input moves through the server, including the handling of third-party dependencies in the request path.
- **Authentication and trust boundaries**: how identity and authorization are established and carried across inter-service communication.
- **Data exposure to the agent**: what information the server surfaces into an agent's context, evaluated against SEON's principle of separating viewing from action.
- **Logging and observability**: how activity is recorded, and how that recording behaves under both normal and error conditions.
- **The agent–LLM interaction layer**: the patterns specific to an LLM driving these tools, and the new surfaces that emerge at that boundary.

Across each of these dimensions, BadCompany worked closely with SEON's engineering team to review the implementation and align it with SEON's security and compliance objectives for the deployment.

## Compliance and Auditability

Because SEON wanted to provide transparency and control over how the MCP is used, the system needed to be highly auditable and aligned with the relevant requirements of the EU AI Act and GDPR.

GDPR's data-minimization principle and the need for thorough decision traceability pull in opposite directions: one argues for retaining as little as possible, the other for recording enough to reconstruct what happened. To reconcile them, BadCompany proposed a dual-stream logging architecture that separates operational logging from compliance auditing. The compliance stream records structural metadata and tamper-evident, hash-chained execution proofs without storing the raw, sensitive data values themselves.

This design supports reconstructing the scope and timing of AI-assisted data access, in line with the EU AI Act's record-keeping requirements (Article 12), while retaining no PII in the audit record itself. The same architecture maps cleanly onto the Act's broader provisions on data governance, transparency, and accuracy and robustness (Articles 10, 13, and 15).

## Conclusion

SEON strengthened its MCP implementation by addressing complex architectural challenges at the intersection of AI execution and data security. By partnering with BadCompany, SEON brought its MCP server toward production with defenses against new, agent-specific attack vectors, using an auditable, compliance-aligned foundation for its agentic fraud-investigation workflows.
