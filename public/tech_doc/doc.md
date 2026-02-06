# Bad Company

## Product Technical Specification

<div align="center">
  <img src="cover-art.png" alt="Bad Company Abstract Art">
</div>
<br>

## High Level Architecture

**Component 1 (Environment): The Lilith Runtime**
A hardened container engine that uses Confidential Computing to isolate memory at the silicon level.

**Component 2 (Control): The Lilith Defense**
A policy engine that enforces Sealed Secrets and Signed Capabilities.

<div align="center">
  <img src="architecture-diagram.png" alt="High Level Architecture Diagram">
</div>
<br>

---

## Component 1: Lilith Runtime
**Confidential, Real-Time Execution Environment for AI Agents**

The **Lilith Runtime** is a deterministic, capability-mediated container engine that treats the Host OS as an availability-only provider (adversarial for confidentiality). It enforces a strict **Denial-by-Default** posture where agents possess no ambient authority; all side effects are mediated through typed handles, ensuring that even a compromised agent cannot exceed its provisioned blast radius.

### L0: Hardware / Platform Abstraction Layer Architectures
* **Tier A1 (Server, Confidential):** AMD EPYC SEV-SNP CVMs; attestation-gated key release; bounded by TCB/patch level.
* **Tier A2 (Server, Confidential):** Intel TDX where attestation/quotes available; provider-dependent.
* **Tier B (Server, Standard):** No TEE; enforce capability gating + signed policy as primary control.
* **Tier C (Endpoint, Isolated):** Windows Enterprise VBS/VSM + vTPM measurement for runtime identity binding.

> **Constraints:** CVM pricing/feature limits vary (e.g., AWS SEV-SNP +10% fee; lifecycle constraints); CC does not prevent DoS/side channels.
>
> **Specs:** Platform tier; attestation report/quote; verifier; KMS release policy; patch-level pinning; threat-model exclusions (DoS/covert channels).

### L1/L2: Minimal TCB (Guest Kernel & Hypervisor)
* **Host/VMM:** KVM + minimal VMM; trusted for availability only (not confidentiality boundary in Tier A).
* **Guest OS (Lilith OS):** Minimal Linux (6.12 LTS baseline); immutable kernel; measured/signed image.
* **Hardening:** `CONFIG_MODULES=n`; no interactive shell; `no_new_privs`; minimal drivers; locked-down boot chain.
* **Syscall defense-in-depth:** `seccomp-bpf` allowlist; disable `ptrace`/`perf_event`/unprivileged namespaces as policy; eBPF restricted to signed artifacts if used (telemetry only).

> **Specs:** Kernel config set; seccomp profile; process sandbox flags; image signing; update cadence; telemetry BPF policy.

### L3: Data Plane (Network I/O + Egress Mediation)
* **Modes:** `virtio-net` compatibility; SR-IOV + AF_XDP optional perf path (not required for security).
* **Egress model:** No raw socket capability for agent workers; all networking via runtime.
* **Egress Handles:** Allowlist + quotas enforced per operation.

> **Specs:** Egress handle API; host allowlist (scheme/authority/method/path); size limits; concurrency limits; budgets (req/bytes/tokens); canonical URL parser.

### L4: Runtime Core (Wasm Execution + Capability Boundary)
* **Engine:** Wasmtime; WASI 0.2 Component Model; memory64 opt-in; shared-nothing instantiation.
* **Isolation:** Per-component instance; bounded WIT message sizes; per-instance quotas (mem/table/instances); CPU budgets (fuel/epoch).
* **Hostcall Safety:** Copy-in validation; strict parsing/canonicalization; no guest pointer trust; version pinning + advisory tracking (e.g., CVE-2024-30266 fixed in 19.0.1).

> **Specs:** Wasmtime config flags; fuel/epoch limits; resource limiter; WIT max message sizes; canonicalization rules; upgrade policy.

### L5: Compute Bridge (GPU Acceleration, Optional)
* **GPU worker:** Isolated process; seccomp-locked; no network; bounded IPC (shared ring buffer/vsock).
* **GPU CC reality:** GPU compute uses plaintext in GPU memory; HBM not encrypted (per NVIDIA); treat as threat-model-bounded hardening not absolute secrecy.
* **Output handling:** Model outputs treated untrusted; schema/tool-arg validation before privileged use.

> **Specs:** GPU worker sandbox profile; IPC protocol + bounds; CC mode flags; allowed ops; output validation policy.

---

## Component 2: Lilith Defense
**Runtime Defense for AI agents (incorporated into Component 1; integrated with Runtime Gate)**

**Lilith Defense** is the agentic defense layer that provides the provable constraints. It shifts security from detecting bad behavior to **making bad behavior inexpressible** via strict capability accounting and cryptographic anchoring.

### L4.0 Policy Verification Layer
Formal, pre-execution verification of agent policies and capability grants against a core security model (for completeness, soundness, non-violation).
Specs: Logic: SMT solver/Datalog, TLA+/Promela; Model: CEDAR; Target: Policy completeness, soundness, non-violation; Deployment: Attestation-gated artifacts; Cadence: Updates must pass verification.

### L4.1 WASI Object-Capability Gate
The **fundamental control plane**.
* **Handle model:** Opaque handles/resources (Egress/Secret/Tool/File optional); no ambient authority; rights checked every use.
* **Anti-ABA:** Generational index table; stale handles fail deterministically.
* **Revocation:** Immediate revocation + TTL expiry; no guest-cached privileges.

> **Specs:** Handle encoding (idx+gen); rights bitmask; atomic check path; revocation API; TTL semantics; max handles per agent.

### L4.2: Information Flow Control (Sealed Secrets)
Anti-Exfil layer. Agents never possess raw secret bytes.
* **Property:** Secret bytes never enter guest/agent memory; only `SecretHandle` is exposed.
* **Use:** Runtime injects auth/signs requests after verifying destination allowlist + budgets; agent cannot read key bytes.
* **Scope:** Does not prevent exfil of other data via allowed egress; controlled via allowlists/quotas/tool semantics.

> **Specs:** Secret store location; SecretHandle API; sign/inject operation; binding to egress constraints; body-hash signing; per-secret usage policy.

### L4.3 Signed Policy Capsules (Cryptographic Authorization)
*Optional: Operationally deployable, cryptographically verifiable authorization of critical actions.*
* **Capsule:** Signed token (with aud/exp/nbf/jti); binds `agent_id` + `build_hash`; grants capabilities + budgets.
* **Enforcement:** Verified per privileged op or per short-lived session token minted by gate; replay resistance via jti/nonce.
* **Revocation:** Short TTL + denylist emergency path.

> **Specs:** Signature scheme; claim set; TTL max; replay cache window; session token derivation; key rotation; issuer trust policy; optional: human-in-the-loop/centralized auth server.

### L4.4 Tool Argument Validator
Prevent tool misuse and suppresses prompt injections. Syntactically it employs **structural output enforcement** and policy-conformant tool arguments; semantically it uses **probabilistic guardrails** and **Context-Aware Behavioral Analysis**.
* **Structural:** Strict typed decode / JSON Schema validation for tool args.
* **Semantics:** Canonicalization + per-tool constraints (allowlisted fields; max amounts; idempotency; commit tokens for irreversible ops).

> **Specs:** Schema registry; canonicalization rules; optional (probabilistic) guardrails (indirect prompt injection defense); fail-closed policy; idempotency requirements; irreversible-op gating.

### L4.5 Hardware-Anchored Forensics
Provides non-repudiation for all agent actions and I/O.
* **Audit:** Append-only log for every privileged boundary; allow/deny reason codes + canonical arg hashes.
* **Integrity:** Hash chain / Merkle + monotonic sequence; periodic signed log tips.
* **Binding (optional):** Signer identity bound to CVM/VBS attestation identity when available.

> **Specs:** Event schema; hash function; sequence rules; anchoring interval; signature scheme; verifier tool; export formats (SIEM).

### L4.6 Side-Channel Suppression
**Reduces the practicality** of timing/cache attacks on shared infrastructure; does **not claim elimination** of covert channels.
* **Controls:** CPU pinning/isolation; timer coarsening/fuzz; deterministic budgets; constant-time secret crypto; strict log/output quotas.
* **Non-goal:** No claim of eliminating covert channels/DoS.

> **Specs:** Pinning policy; timer config; budget parameters; crypto constant-time requirements; output/log rate limits; tenant isolation guidance.