import Header from '../../components/Header'
import Link from 'next/link'

const HOOKS = [
  { name: 'bprm_check_security', role: 'Write WorkloadIdentity to IDENTITY_TASK_STORAGE on exec' },
  { name: 'task_alloc', role: 'Propagate identity + taint bitmask to child on fork' },
  { name: 'socket_connect', role: 'Enforce tproxy-only topology; check DAEMON_HEARTBEAT' },
  { name: 'socket_create', role: 'Deny SOCK_RAW / AF_PACKET, blocks L2/L3 injection' },
  { name: 'socket_sendmsg', role: 'Deny UDP/ICMP egress, closes covert data channels' },
  { name: 'mmap_file', role: 'Exec allowlist: inode-keyed, TOCTOU-immune (Tier 2)' },
  { name: 'file_mprotect', role: 'W^X enforcement: deny anonymous PROT_EXEC (Tier 3)' },
  { name: 'mmap_addr', role: 'W^X enforcement: non-JIT agents only (Tier 3)' },
]

const METRICS = [
  { value: '>1.5M', unit: 'decisions / sec', sub: 'DashMap sharding + Cedar DFA + AtomicU64' },
  { value: '~100µs', unit: 'Cedar p99', sub: 'Zero heap allocation per evaluation' },
  { value: '<1ms', unit: 'latency overhead', sub: 'Agent syscall path unaffected' },
  { value: '2 s', unit: 'fail-closed TTL', sub: 'Daemon death, EPERM at next connect()' },
]

function DownArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-4 pl-8">
      <svg width="14" height="32" viewBox="0 0 14 32" fill="none">
        <path d="M7 0 L7 24" stroke="#3f3f46" strokeWidth="1.5" />
        <path d="M3 20 L7 29 L11 20" stroke="#3f3f46" strokeWidth="1.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-mono text-[10px] text-zinc-600 tracking-wide">{label}</span>
    </div>
  )
}

function StepArrow() {
  return (
    <div className="flex items-center self-center shrink-0 px-1">
      <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
        <path d="M0 7 L24 7" stroke="#3f3f46" strokeWidth="1.5" />
        <path d="M20 4 L28 7 L20 10" stroke="#3f3f46" strokeWidth="1.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Product() {
  return (
    <main className="min-h-screen bg-cyber-black text-white">
      <Header />

      {/* Zero-knowledge hero */}
      <section className="pt-40 pb-20 px-6 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-6">
            How Lilith Works
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            The agent has<br />
            no idea Lilith<br />
            <span className="text-cyber-red">exists.</span>
          </h1>
          <p className="text-base text-zinc-300 font-mono leading-relaxed max-w-2xl mb-6 border-l-2 border-cyber-red pl-5">
            Any agent that touches your infrastructure or config is an unsecured attack surface.
            Cloud credentials, SSH keys, production secrets: no runtime control exists for any of it.
            Tool poisoning, prompt injection, and silent exfiltration are all demonstrated in the wild.
            Lilith enforces at the kernel with full observability of every agent action, transparent to agents, impossible to bypass from userspace.
          </p>
          <p className="text-base text-zinc-400 font-mono leading-relaxed max-w-2xl">
            Lilith is a systemd daemon that enforces security at the kernel level, before any
            agent syscall completes, before any byte reaches the network. No SDK to install.
            No environment variable to set. No proxy to configure. The agent&apos;s code is never
            touched. The agent&apos;s config is never touched. The agent has no idea.
          </p>
        </div>
      </section>

      {/* Transparent proxy intercept */}
      <section className="px-6 py-24 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-4">
            Transparent Interception
          </p>
          <h2 className="text-2xl font-bold mb-10">
            Every TCP connection is intercepted at the kernel, before{' '}
            <code className="text-cyber-red text-xl">connect()</code> returns.
          </h2>

          {/* Architecture flow diagram — vertical, full-width, no scroll */}
          <div className="mb-10 bg-[#0a0a0a] border border-zinc-800 p-8">

            {/* Row 1: Agent */}
            <div className="border border-zinc-700 p-5">
              <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-4">Agent Process</div>
              <div className="flex items-center justify-between border border-zinc-700 px-6 py-5 bg-zinc-900/30">
                <div>
                  <div className="font-mono text-sm font-semibold text-white mb-1">AI Agent</div>
                  <div className="font-mono text-xs text-zinc-400">MCP / gRPC / HTTP</div>
                </div>
                <div className="font-mono text-xs text-zinc-600 bg-[var(--surface-terminal)] px-3 py-2">
                  connect(&quot;mcp-server:8080&quot;)
                </div>
              </div>
            </div>

            <DownArrow label="intercepted at kernel, before connect() returns" />

            {/* Row 2: Kernel */}
            <div className="border border-red-900/50 p-5">
              <div className="font-mono text-[10px] text-cyber-red tracking-widest uppercase mb-4">Linux Kernel</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 border border-zinc-700 px-5 py-4 bg-zinc-900/50">
                  <div className="font-mono text-xs font-semibold text-white mb-2">cgroup/connect4</div>
                  <div className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                    Rewrites destination to 127.0.0.1:7890. Agent never sees this rewrite.
                  </div>
                </div>
                <StepArrow />
                <div className="flex-1 border border-zinc-700 px-5 py-4 bg-zinc-900/50">
                  <div className="font-mono text-xs font-semibold text-white mb-2">socket_connect LSM</div>
                  <div className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                    Allows only the tproxy endpoint. All other AF_INET from managed processes: EPERM.
                  </div>
                </div>
              </div>
            </div>

            <DownArrow label="plaintext stream arrives at Lilith" />

            {/* Row 3: Daemon */}
            <div className="border border-emerald-900/40 p-5">
              <div className="font-mono text-[10px] text-emerald-500 tracking-widest uppercase mb-4">Lilith Daemon</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 border border-zinc-700 px-5 py-4 bg-zinc-900/50">
                  <div className="font-mono text-xs font-semibold text-white mb-2">SPIFFE Identity</div>
                  <div className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                    Resolved from task_struct* key. PID-reuse attacks are structurally impossible.
                  </div>
                </div>
                <StepArrow />
                <div className="flex-1 border border-zinc-700 px-5 py-4 bg-zinc-900/50">
                  <div className="font-mono text-xs font-semibold text-white mb-2">Cedar Policy Eval</div>
                  <div className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                    Non-Turing-complete. ~100 µs p99. Zero heap allocation per evaluation.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 border border-emerald-800/50 px-5 py-4 bg-emerald-900/10">
                  <div className="font-mono text-xs text-emerald-400 font-bold mb-1">ALLOW</div>
                  <div className="font-mono text-[11px] text-zinc-500">TLS 1.3 relay to original upstream</div>
                </div>
                <div className="flex-1 border border-red-900/50 px-5 py-4 bg-red-900/10">
                  <div className="font-mono text-xs text-cyber-red font-bold mb-1">DENY</div>
                  <div className="font-mono text-[11px] text-zinc-500">RST_STREAM + audit event emitted</div>
                </div>
              </div>
            </div>

          </div>

          {/* Two-column callouts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-zinc-800 p-5">
              <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-3">Identity</div>
              <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                Identity is stored in <span className="text-cyber-red">IDENTITY_TASK_STORAGE</span> keyed
                by <span className="text-cyber-red">task_struct*</span>, not PID. PID reuse attacks
                are structurally impossible: the kernel frees the entry automatically when the task exits.
              </p>
            </div>
            <div className="border border-zinc-800 p-5">
              <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-3">Protocol</div>
              <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                Protocol-agnostic. Cedar evaluates the same{' '}
                <span className="text-cyber-red">(principal, action, resource, context)</span> tuple
                whether the agent speaks MCP JSON-RPC, A2A gRPC, OpenAPI HTTP/1.1, or any other protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three enforcement layers */}
      <section className="px-6 py-24 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-4">
            Enforcement Architecture
          </p>
          <h2 className="text-2xl font-bold mb-16">Three independent enforcement layers.</h2>

          {/* Layer 1 */}
          <div className="grid md:grid-cols-[180px_1fr] gap-8 mb-16">
            <div className="md:pt-1">
              <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-2">Layer 1</div>
              <div className="font-mono text-sm font-bold text-white">BPF-LSM</div>
              <div className="font-mono text-xs text-zinc-500 mt-1">Ring 0</div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Eight Linux Security Module hooks run in kernel context, synchronous, before any syscall
                returns to userspace. Two additional cgroup BPF programs handle transparent TCP interception.
                All 10 programs are formally verified by the kernel&apos;s BPF verifier before loading.
              </p>
              <div className="space-y-2.5">
                {HOOKS.map(h => (
                  <div key={h.name} className="flex items-start gap-4 font-mono text-xs">
                    <span className="text-cyber-red shrink-0 w-44 leading-relaxed">{h.name}</span>
                    <span className="text-zinc-500 leading-relaxed">{h.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layer 2 */}
          <div className="grid md:grid-cols-[180px_1fr] gap-8 mb-16">
            <div className="md:pt-1">
              <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-2">Layer 2</div>
              <div className="font-mono text-sm font-bold text-white">Cedar Policy</div>
              <div className="font-mono text-xs text-zinc-500 mt-1">L7 Dataplane</div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Every tool call is evaluated against a Cedar policy, a non-Turing-complete,
                formally verified policy language (Lean 4 + Dafny). Static analysis via CVC5 1.2.1 SMT solver
                proves privilege non-escalation before any policy is deployed. Policies are Ed25519-signed
                capsules with anti-rollback watermarks.
              </p>

              <div className="bg-[var(--surface-terminal)] border border-zinc-800 p-4 font-mono text-xs mb-6">
                <div className="text-zinc-600 text-[10px] tracking-widest uppercase mb-3">Cedar example</div>
                <div>
                  <span className="text-emerald-400">permit</span>
                  <span className="text-zinc-300">{' (principal is Agent, action == Action::"read_file", resource is MCPServer)'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-zinc-300">{'when { context.data_touched & 8 == 0 };'}</span>
                  <span className="text-zinc-600 ml-3">{'// no CREDENTIALS taint'}</span>
                </div>
                <div className="mt-3">
                  <span className="text-cyber-red">forbid</span>
                  <span className="text-zinc-300">{' (principal is Agent, action == Action::"http_post", resource is MCPServer)'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-zinc-300">{'when { context.data_touched != 0 };'}</span>
                  <span className="text-zinc-600 ml-3">{'// any taint, deny network egress'}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ['Non-Turing-complete', 'Guaranteed termination on every input'],
                  ['Formally verified', 'Lean 4 + Dafny; CVC5 SMT static analysis'],
                  ['~100 µs p99', 'Zero heap allocation per evaluation'],
                ].map(([title, desc]) => (
                  <div key={title} className="border border-zinc-800 p-4">
                    <div className="font-mono text-xs text-white font-bold mb-1.5">{title}</div>
                    <div className="font-mono text-xs text-zinc-500">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layer 3 */}
          <div className="grid md:grid-cols-[180px_1fr] gap-8">
            <div className="md:pt-1">
              <div className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mb-2">Layer 3</div>
              <div className="font-mono text-sm font-bold text-white">Seccomp + Landlock</div>
              <div className="font-mono text-xs text-zinc-500 mt-1">Kernel</div>
            </div>
            <div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Seccomp-BPF restricts agents to ~60 allowed syscalls.
                All LPE primitives are blocked at the kernel boundary. Landlock constrains filesystem access
                to specific ephemeral directories using kernel inode evaluation, TOCTOU-immune, composable,
                unprivileged.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-zinc-800 p-4">
                  <div className="font-mono text-[10px] text-emerald-400 font-bold tracking-widest uppercase mb-2">
                    Allowed syscalls
                  </div>
                  <div className="font-mono text-xs text-zinc-500 space-y-1 leading-relaxed">
                    <div>read, write, pread64, pwrite64</div>
                    <div>socket(AF_UNIX) only</div>
                    <div>epoll_*, poll, select</div>
                    <div>futex, nanosleep, clone(THREAD)</div>
                    <div>exit, exit_group</div>
                  </div>
                </div>
                <div className="border border-zinc-800 p-4">
                  <div className="font-mono text-[10px] text-cyber-red font-bold tracking-widest uppercase mb-2">
                    Blocked (LPE primitives)
                  </div>
                  <div className="font-mono text-xs text-zinc-500 space-y-1 leading-relaxed">
                    <div>ptrace, process_vm_readv/writev</div>
                    <div>bpf, userfaultfd, keyctl</div>
                    <div>io_uring_setup/enter/register</div>
                    <div>memfd_create(MFD_EXEC)</div>
                    <div>mount, pivot_root, unshare</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taint propagation */}
      <section className="px-6 py-24 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-4">
            Data Flow Tracking
          </p>
          <h2 className="text-2xl font-bold mb-4">Taint propagation, not detection.</h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mb-10">
            A 64-bit bitmask accumulates across every tool call in a session via{' '}
            <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">AtomicU64::fetch_or</code>.
            Once a sensitive bit is set, it cannot be cleared, no race condition, no window for a bypass.
            Cedar policies read{' '}
            <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">context.data_touched</code>{' '}
            and structurally prohibit egress after any sensitive read.
          </p>

          <div className="bg-[var(--surface-terminal)] border border-zinc-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-zinc-800">
              <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                64-bit taint bitmask: data_touched per SPIFFE session
              </span>
            </div>
            <div className="p-5">
              <div className="flex gap-1.5 mb-6 flex-wrap">
                {[
                  { label: 'PII', bit: '0', active: true },
                  { label: 'FIN', bit: '1', active: true },
                  { label: 'UNTRUSTED', bit: '2', active: false },
                  { label: 'CREDS', bit: '3', active: false },
                  { label: 'A', bit: '4', active: false },
                  { label: 'B', bit: '5', active: false },
                  { label: '...', bit: '6-63', active: false },
                ].map(b => (
                  <div
                    key={b.bit}
                    className={`border px-2.5 py-2 text-center font-mono ${
                      b.active
                        ? 'border-cyber-red bg-cyber-red/10 text-cyber-red'
                        : 'border-zinc-800 text-zinc-700'
                    }`}
                  >
                    <div className="text-[9px] font-bold">{b.label}</div>
                    <div className="text-[9px] mt-0.5 opacity-60">bit {b.bit}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex gap-3 flex-wrap">
                  <span className="text-zinc-600 shrink-0">[14:23:01]</span>
                  <span className="text-zinc-300">tools/call <span className="text-zinc-400">read_file</span></span>
                  <span className="text-emerald-400">ALLOW</span>
                  <span className="text-zinc-600">data_touched:</span>
                  <span className="text-yellow-400">0x0001</span>
                  <span className="text-zinc-600">PII bit set</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <span className="text-zinc-600 shrink-0">[14:23:02]</span>
                  <span className="text-zinc-300">tools/call <span className="text-zinc-400">fetch_report</span></span>
                  <span className="text-emerald-400">ALLOW</span>
                  <span className="text-zinc-600">data_touched:</span>
                  <span className="text-yellow-400">0x0003</span>
                  <span className="text-zinc-600">PII + FINANCIAL</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <span className="text-zinc-600 shrink-0">[14:23:03]</span>
                  <span className="text-zinc-300">tools/call <span className="text-zinc-400">http_post</span></span>
                  <span className="text-cyber-red">DENY</span>
                  <span className="text-zinc-600">data_touched:</span>
                  <span className="text-yellow-400">0x0003</span>
                  <span className="text-zinc-600">any taint, exfiltration blocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fail-closed */}
      <section className="px-6 py-24 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-4">Reliability</p>
              <h2 className="text-2xl font-bold mb-4">Fail-closed by design.</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The{' '}
                <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">DAEMON_HEARTBEAT</code>{' '}
                BPF array receives a write every 500 ms from the daemon.
                The{' '}
                <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">socket_connect</code>{' '}
                hook checks staleness on every verdict. If the daemon crashes or is killed,
                all managed-process connections receive{' '}
                <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">EPERM</code>{' '}
                within 2 seconds, no silent bypass, no open window.
              </p>
            </div>
            <div className="bg-[var(--surface-terminal)] border border-zinc-800 p-5 font-mono text-xs">
              <div className="text-zinc-600 text-[10px] tracking-widest uppercase mb-3">
                socket_connect LSM hook
              </div>
              <div className="leading-relaxed">
                <div className="text-zinc-600">{'// BPF: runs before every agent connect()'}</div>
                <div className="mt-2">
                  <span className="text-yellow-400">let</span>
                  <span className="text-zinc-300"> hb = DAEMON_HEARTBEAT.get(0)?;</span>
                </div>
                <div>
                  <span className="text-yellow-400">let</span>
                  <span className="text-zinc-300"> now = bpf_ktime_get_ns();</span>
                </div>
                <div className="mt-2">
                  <span className="text-yellow-400">if</span>
                  <span className="text-zinc-300"> now - hb.last_update_ns {'>'} </span>
                  <span className="text-emerald-400">2_000_000_000</span>
                  <span className="text-zinc-300"> {'{'}</span>
                </div>
                <div className="ml-4 text-zinc-600">{'// daemon dead, deny all'}</div>
                <div className="ml-4">
                  <span className="text-cyber-red">return</span>
                  <span className="text-zinc-300"> Err(EPERM);</span>
                </div>
                <div className="text-zinc-300">{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-24 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 overflow-hidden">
            {METRICS.map(m => (
              <div key={m.unit} className="bg-cyber-black p-8">
                <div className="font-mono text-3xl font-bold text-white mb-1">{m.value}</div>
                <div className="font-mono text-[10px] text-cyber-red tracking-widest uppercase mb-3">{m.unit}</div>
                <div className="font-mono text-xs text-zinc-600 leading-relaxed">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="px-6 py-24 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-4">Deployment</p>
          <h2 className="text-2xl font-bold mb-4">One daemon. Any agent. Any protocol.</h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mb-10">
            Lilith runs as a systemd service or Kubernetes DaemonSet. It requires{' '}
            <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">CAP_BPF</code> and{' '}
            <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">CAP_PERFMON</code>. No{' '}
            <code className="text-cyber-red bg-zinc-900 px-1 rounded text-xs">CAP_SYS_ADMIN</code>,
            no privileged container. Operates at the host OS layer, outside every agent namespace,
            invisible to every agent process.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                env: 'systemd',
                lines: [
                  'ExecStart=/usr/bin/lilith-enforcer',
                  'Environment=LILITH_CAPSULE_PATH=...',
                  'AmbientCapabilities=CAP_BPF CAP_PERFMON',
                  'Restart=on-failure',
                ],
              },
              {
                env: 'Kubernetes DaemonSet',
                lines: [
                  'hostPID: true',
                  'hostNetwork: true',
                  'capabilities:',
                  '  add: [BPF, PERFMON]',
                ],
              },
              {
                env: 'Docker',
                lines: [
                  'pid: host',
                  'cap_add: [BPF, PERFMON]',
                  'LILITH_TPROXY_ADDR:',
                  '  172.17.0.1:7890',
                ],
              },
            ].map(d => (
              <div key={d.env} className="bg-[var(--surface-terminal)] border border-zinc-800 p-5">
                <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-3">{d.env}</div>
                <div className="space-y-1.5">
                  {d.lines.map(l => (
                    <div key={l} className="font-mono text-xs text-zinc-400">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-zinc-800 p-5">
            <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-3">Requirements</div>
            <div className="flex flex-wrap gap-3 font-mono text-xs text-zinc-400">
              <span className="border border-zinc-800 px-3 py-1.5">Linux 5.15+ LTS</span>
              <span className="border border-zinc-800 px-3 py-1.5">CONFIG_BPF_LSM=y</span>
              <span className="border border-zinc-800 px-3 py-1.5">CONFIG_DEBUG_INFO_BTF=y</span>
              <span className="border border-zinc-800 px-3 py-1.5">lsm=bpf,landlock,yama</span>
              <span className="border border-zinc-800 px-3 py-1.5">SPIRE agent (workload attestation)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Deploy Lilith today.</h2>
            <p className="font-mono text-sm text-zinc-500">
              Kernel-level enforcement on any Linux host in under 10 minutes.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/#contact"
              className="px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-colors duration-200 font-mono font-bold text-sm tracking-wide"
            >
              BOOK A DEMO
            </Link>
            <Link
              href="/product"
              className="px-6 py-3 border border-zinc-700 text-white hover:border-zinc-500 transition-colors duration-200 font-mono font-bold text-sm tracking-wide"
            >
              LILITH ZERO
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
