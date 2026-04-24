'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Link from 'next/link'

const milestones = [
  { year: '2023', label: 'Physics research, academic labs' },
  { year: '2024', label: 'Infrastructure-grade ML systems' },
  { year: '2025', label: 'Building and hacking LLMs and agents' },
  { year: 'Late 2025', label: 'Lilith Zero open-sourced, EF program' },
  { year: '2026', label: 'Kernel-level enforcement' },
]

export default function Story() {
  return (
    <main className="relative min-h-screen bg-cyber-black">
      <Header />

      <div className="relative z-10 pt-32 px-6 pb-24">
        <div className="container mx-auto max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
              <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">Who We Are</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold font-mono text-white leading-tight mb-12">
              THREE PHYSICISTS<br />
              <span className="text-zinc-500">AND A MARTIAL ARTIST.</span>
            </h1>

            {/* Timeline strip */}
            <div className="flex gap-0 mb-16 overflow-x-auto no-scrollbar">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex-1 min-w-[120px] border-l border-zinc-800 pl-3 pr-4">
                  <div className="text-cyber-red font-mono text-xs font-bold mb-1">{m.year}</div>
                  <div className="text-zinc-600 font-mono text-[10px] leading-relaxed">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Story body */}
            <div className="space-y-16 font-mono text-sm leading-relaxed text-zinc-400">

              <section>
                <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wide">We did not all come from the same place.</h2>
                <p>
                  Three of us came from physics research labs and production ML infrastructure. We built systems that had to work under real load, with real data, with real consequences for failure. One competed internationally in martial arts, with a decade of experience at the infrastructure that moves real money at scale.
                </p>
                <p className="mt-4">
                  That combination turned out to matter. The physicists approached agent security as an experiment: build a model, find where it breaks, update the model. The martial artist had already seen what breaks in production.
                </p>
              </section>

              <section>
                <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wide">We built agents. Then we broke them.</h2>
                <p>
                  From 2023 onward we were building AI agents for production workloads. Not demos. Agents with filesystem access, live API keys, database connections, shell execution. The things enterprises are actually deploying today.
                </p>
                <p className="mt-4">
                  We immediately started attacking them. We reproduced every attack class now appearing in CVEs: prompt injection that redirected outbound traffic, tool poisoning that exfiltrated SSH keys, jailbreaks that bypassed deny rules. We were early. We had working exploits before most of these attacks had names.
                </p>
                <p className="mt-4">
                  The experience crystallized one observation: every defense we tested was probabilistic. Prompt-based guardrails, LLM classifiers, regex filters. All bypassable with enough persistence or a clever injection. Security as a cat-and-mouse game at the application layer, where the attacker always gets another turn.
                </p>
              </section>

              <section>
                <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wide">Lilith Zero and the SF moment.</h2>
                <p>
                  We built and{' '}
                  <a
                    href="https://medium.com/@peter_48867/deterministic-agent-security-at-ms-scale-lilith-zero-ab6bff4c3ff0?postPublishedType=repub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyber-red transition-colors"
                  >
                    open-sourced Lilith Zero
                  </a>
                  : application-layer enforcement with taint propagation, policy hooks for Claude Code and GitHub Copilot, and OpenClaw integration. Real enterprises started using it. It closes real attack vectors.
                </p>
                <p className="mt-4">
                  In 2025, our CEO Janos Mozer was accepted into{' '}
                  <a
                    href="https://www.joinef.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyber-red transition-colors"
                  >
                    Entrepreneur First
                  </a>
                  , giving us access to the SF startup ecosystem and direct conversations with enterprise security teams at scale.
                </p>
                <p className="mt-4">
                  Those conversations confirmed what our research had already shown: no solution fully solved the problem. Every tool on the market was a probabilistic filter, a proxy, an LLM-based heuristic. Bypassable. Noisy. Architecturally insufficient.
                </p>
              </section>

              <section>
                <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wide">Why the kernel is the only answer.</h2>
                <p>
                  Application-layer security has one structural flaw: it runs in the same trust domain as the thing it is protecting. An attacker who controls the agent process controls the defense. Any sufficiently capable agent can, by design, read files, make network calls, and execute commands. The only layer that can constrain this without being in the same trust domain is the OS kernel.
                </p>
                <p className="mt-4">
                  We chose BPF-LSM for four reasons. First, durability: the Linux syscall interface has not changed meaningfully in decades. High-level AI frameworks change every six months. Security infrastructure needs to last. Second, observability: every syscall an agent makes is visible, logged, and attributable before it executes. Third, fail-closed correctness: BPF programs are statically verified before attachment; the heartbeat mechanism ensures agents are blocked if the daemon dies. Fourth, zero agent awareness: the kernel intercepts at the syscall boundary before the application layer can react.
                </p>
                <p className="mt-4">
                  For policy authoring we chose Cedar, whose semantics are formally proven in Lean 4 and whose policy analysis runs on a CVC5 SMT solver. Operators write policy intent in natural language; it compiles to Cedar AST via LLM, undergoes formal verification, and is signed into a tamper-evident capsule. The policy is mathematically proven correct before it enforces anything.
                </p>
                <p className="mt-4">
                  Durable. Observable. Formally verified. Scalable. Impossible to bypass from userspace.
                </p>
              </section>

            </div>

            {/* CTA */}
            <div className="mt-16 pt-12 border-t border-zinc-900 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-colors duration-200 font-mono font-bold text-sm tracking-wide"
              >
                TALK TO US
              </Link>
              <Link
                href="/product"
                className="px-6 py-3 border border-zinc-700 text-white hover:border-cyber-red hover:text-cyber-red transition-colors duration-200 font-mono font-bold text-sm tracking-wide"
              >
                READ THE DOCS
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  )
}
