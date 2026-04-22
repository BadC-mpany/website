# Why We Built on the Linux Kernel: BPF-LSM Enforcement for AI Agents

*April 2026*

Every AI security product you've seen so far is a proxy. A Python wrapper. An LLM-based guardrail. They all share a fatal structural flaw: they operate in user space, at the application layer, and they can all be bypassed if the agent process itself is compromised, which is exactly the threat model we're trying to defend against.

We went a different direction. Lilith enforces at Ring 0, using BPF-LSM hooks in the Linux kernel. Here's why that decision matters and exactly what we built.

## The Fundamental Problem With Application-Layer Security

Imagine an AI agent that has read-file and network-post capabilities. The agent is wrapped in a Python security middleware that checks each tool call against a policy. Now consider what happens under prompt injection: the injected instruction tells the agent to call the middleware's internal bypass API, use the OS subprocess module directly, or simply spawn a child process that isn't monitored.

Application-layer security has the same control boundary as the process it's trying to protect. If the agent can execute code, which it can, because that's the entire point of an agentic system, it can theoretically escape any control you implement in the same address space.

The only security boundary that cannot be escaped by an application is the kernel.

## What BPF-LSM Actually Does

Linux Security Modules (LSM) is the kernel's hook system for mandatory access control. Historically you needed to write a kernel module to use it. BPF-LSM (introduced in Linux 5.7, stabilized in 5.19) lets you attach eBPF programs to LSM hooks, programs that the kernel's verifier statically proves to be safe before they ever run.

The hooks fire synchronously in the kernel's execution path. When a managed process calls `connect()`, the kernel executes our `socket_connect` hook before the syscall completes. The hook can return `-EPERM` to block the call entirely. The process never gets a file descriptor. There's nothing in user space to bypass.

We attach 8 LSM hooks:

- **`bprm_check_security`**: fires on every `execve`. We register new processes in an identity map and verify them against the agent allowlist.
- **`task_alloc` / `task_free`**: track process lifecycle. When a managed process dies, we clean its session state atomically.
- **`socket_connect`**: the core enforcement hook. Any AF_INET connection from a managed process that doesn't target Lilith's transparent proxy port returns EPERM immediately.
- **`socket_create`**: blocks raw socket creation (prevents ICMP tunneling and other exfiltration channels that bypass TCP).
- **`socket_sendmsg`**: blocks direct UDP sends from managed processes.
- **`mmap_file`**: restricts executable mappings to the agent's allowlist, preventing dynamic code injection.
- **`file_mprotect`**: blocks making anonymous pages executable (JIT shellcode mitigation).

Two cgroup programs run alongside:

- **`connect4_intercept`** (cgroup/connect4), transparently rewrites the destination of every TCP connect from a managed process to Lilith's proxy port, and stores the original destination in a BPF hash map. The agent's code never changes. It calls `connect("api.example.com:443")` and reaches Lilith.
- **`sock_ops_track`** (sockops), fires on connection establishment, maps the agent's ephemeral source port to the original destination so Lilith's userspace proxy can look up where to forward the request.

All programs are written in Rust using the `aya-ebpf` crate. All maps are pinned to bpffs at `/sys/fs/bpf/lilith` for lifetime management independent of the daemon process.

## The Heartbeat Mechanism: Fail-Closed by Default

A security daemon that fails open on crash is worse than no security daemon. We use a `DAEMON_HEARTBEAT` BPF array map to implement kernel-level fail-closed behavior.

The daemon writes the current `CLOCK_MONOTONIC` timestamp to `DAEMON_HEARTBEAT[0]` every 500ms. Every socket hook checks the delta between `bpf_ktime_get_ns()` and the stored value. If the delta exceeds 2 seconds, meaning the daemon has died or become unresponsive, the hook returns `-EPERM` for all managed-process connections.

The window from daemon death to enforcement is at most 2.5 seconds. After that, every network syscall from a managed agent returns permission denied. The BPF programs continue running in the kernel with zero userspace involvement.

## SPIFFE/SPIRE for Cryptographic Identity

Knowing that a process is being intercepted by the kernel isn't enough, you need to know *which* workload it belongs to. We use SPIFFE (Secure Production Identity Framework For Everyone) for this.

Every agent process is attested by SPIRE using process attributes (UID, cgroup path, binary hash). SPIRE issues a short-lived X.509 SVID containing a SPIFFE URI like `spiffe://corp.example.com/agents/coding-agent`. Lilith's proxy verifies this SVID on every connection and uses the URI as the principal in Cedar policy evaluation.

The result: Cedar policy can say `permit(principal == Agent::"spiffe://corp/agent-42", ...)` and the enforcement is cryptographically tied to the workload's identity, not a process ID that can be spoofed, not an environment variable that can be overridden.

## Multi-Kernel Portability: BTF CO-RE

A common objection to kernel-level security tools is portability. Kernel struct layouts change between versions, what works on Linux 6.19 may silently misread fields on 6.12.

We solve this with BTF CO-RE (Compile Once, Run Everywhere). At daemon startup, Lilith parses `/sys/kernel/btf/vmlinux` to resolve the actual byte offsets of the kernel fields we read: `task_struct.pid`, `task_struct.tgid`, `task_struct.real_parent`, `task_struct.start_time`, `vm_area_struct.vm_file`. These offsets vary by kernel version (e.g., `task_struct.pid` is at offset 2768 on 6.19 but 2784 on 6.12). The resolved values are written into a `KERNEL_OFFSETS` BPF array map before any hook fires. Every hook reads from this map instead of using hardcoded offsets.

We test against Linux 5.15, 6.1, 6.6, 6.12, and 6.19 in CI using cilium/little-vm-helper to boot real kernel VMs in every pull request.

## What This Looks Like in Practice

A developer deploys Lilith on a machine running a Claude Code agent. They configure an allowlist: the agent may communicate with their internal MCP server at `10.0.1.50:8080`. Nothing else.

The agent calls a tool that triggers an outbound HTTP request to `api.anthropic.com`. In userspace this looks like a normal `connect()` syscall. At the kernel level:

1. `connect4_intercept` fires, stores the original destination, rewrites the destination to `127.0.0.1:7890` (Lilith's proxy port).
2. `socket_connect` LSM fires, sees the rewritten destination matches the allowed proxy address, returns 0 (allow).
3. The TCP handshake completes. `sock_ops_track` fires, maps the source port to the original destination.
4. Lilith's proxy accepts the connection, looks up the source port in `CONNECT_PORT_MAP`, finds the original destination.
5. Cedar policy is evaluated: `api.anthropic.com` is not in the allowed upstream list. Verdict: DENY.
6. Lilith returns HTTP 403 to the agent. The connection to `api.anthropic.com` is never made.

The agent tried to reach the internet. The kernel prevented it. No agent code was modified.

## Comparison to Alternatives

**Python/Node.js proxies**: Application-layer, bypassable by the process they're protecting, 10-50ms overhead per tool call, no fail-closed behavior.

**Network firewalls (iptables, nftables)**: Enforce at the packet level, have no knowledge of which process is sending, cannot correlate a packet with a Cedar policy or SPIFFE identity.

**Kernel modules**: Require compilation per kernel version, no static verification, ring 0 bugs crash the machine. BPF-LSM programs are statically verified by the kernel before attachment.

**Riptides**: Enforces at connection establishment using a kernel module, excellent for network identity, but no per-tool-call semantic enforcement and no session taint tracking. Complementary, not competing.

---

Lilith is in private beta. If you're deploying AI agents in a regulated environment or one where data exfiltration is a real threat, [book a technical call](https://badcompany.xyz/#contact).
