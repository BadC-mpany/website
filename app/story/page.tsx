'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'

export default function Story() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="relative z-10">

        <section className="min-h-screen pt-32 px-6 pb-20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-12">
                <span className="text-gradient glow-red">Our Evolution</span>
              </h1>

              <div className="space-y-12 text-lg text-gray-300 leading-relaxed">
                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">2023 - 2025</h2>
                  <p>
                    We watched the industry build guardrails. As we analyzed enterprise AI applications
                    we realized that ensuring safety typically meant wrapping model outputs in layers of prompt engineering and
                    regex filters. We followed this closely.
                  </p>
                  <p className="mt-4">
                    By breaking them constantly, we found that probabilistic defenses could be bypassed with enough
                    persistence. A clever jailbreak or a subtle context manipulation could always slip through the cracks.
                    Security was a cat and mouse game and the attackers were winning.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">August 2025</h2>
                  <p>
                    Everything changed in August 2025. The release of truly autonomous agentic frameworks triggered an
                    explosion in capability. Assistants were no longer just chatting; they were executing code, managing
                    databases, and moving money.
                  </p>
                  <p className="mt-4">
                    We watched as traditional guardrails crumbled under the weight of agentic complexity.
                    You cannot prompt an agent into security when it has shell access. The stakes had shifted from
                    offensive text to remote code execution and data exfiltration. We realized that linguistic defenses were fundamentally
                    insufficient for behavioral threats.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">Current Stage</h2>
                  <p>
                    This led us to our current architecture. We realized that policy enforcement at the application layer does not solve all security issues.
                  </p>
                  <p className="mt-4">
                    We moved to the kernel because it changes very slowly. High-level AI frameworks are volatile but the kernel and syscall interface is stable. Security architecture needs to last.
                  </p>
                  <p className="mt-4">
                    By operating at the OS level, we not only make the performance overhead a lot smaller but we enable the architecture to catch even more malicious activity. We don't just suggest that an agent shouldn't access a file; the operating system simply pretends the file does not exist.
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
