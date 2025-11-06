'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Story() {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-red/20">
          <nav className="container mx-auto px-6 py-4">
            <Link href="/" className="text-cyber-pink hover:text-cyber-red transition-colors">
              ← Back to Home
            </Link>
          </nav>
        </header>

        <section className="min-h-screen pt-32 px-6 pb-20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
                <span className="text-gradient glow-red">How We Got Here</span>
              </h1>

              <div className="space-y-12 text-lg text-gray-300 leading-relaxed">
                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">The Architecture Gap</h2>
                  <p>
                    There is a fundamental architecture gap in AI security. In the past few years, we've been building 
                    the fastest, most powerful engines for AI models, and now we're doing the same for AI agents. But in 
                    the rush, we completely forgot about the brakes.
                  </p>
                  <p className="mt-4">
                    No airbags. No seatbelts. No crash tests.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">Our Timeline</h2>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <span className="text-cyber-red font-bold min-w-fit">Since 2022</span>
                      <span>Developing AI applications in enterprise settings</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-cyber-red font-bold min-w-fit">Since 2024</span>
                      <span>Researching the AI security vertical</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-cyber-red font-bold min-w-fit">June 2025</span>
                      <span>Started actively building full-time</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-cyber-red font-bold min-w-fit">September 2025</span>
                      <span>Lock-in 24/7 mode</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">Domain Expertise</h2>
                  <p>
                    We're not new to this space. We've been building and securing AI systems in enterprise environments 
                    for years. We have deep expertise in:
                  </p>
                  <ul className="mt-4 space-y-3 ml-6">
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span>Enterprise AI application architecture</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span>Adversarial AI research and red-teaming</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span>LLM security vulnerabilities and exploitation techniques</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span>Real-world impact assessment and risk modeling</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-cyber-red/20 pt-8">
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">What We've Found</h2>
                  <p>
                    We started by jailbreaking the largest adult content creators and one of Europe's leading banks. 
                    We exposed critical vulnerabilities in every state-of-the-art LLM.
                  </p>
                  <p className="mt-4">
                    But here's what we realized: jailbreaking alone doesn't drive urgency. One-off vulnerabilities don't 
                    cost these companies money directly. We got a few consulting contracts, nothing more.
                  </p>
                  <p className="mt-4 font-bold text-cyber-red glow-red">
                    Then we poisoned their agentic frameworks.
                  </p>
                  <p className="mt-4">
                    These frameworks were integrated with their payroll, billing, and financial operations. With a single 
                    prompt-injected PDF, we demonstrated we could hijack their bank accounts.
                  </p>
                  <p className="mt-4">
                    Suddenly, the conversations shifted. The discussions accelerated. They understood the risk immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">Why This Matters</h2>
                  <p>
                    AI agents in the very near future will have authority over bank accounts—whether fiat or crypto. 
                    They'll control payment rails, internal accounting operations, and financial workflows.
                  </p>
                  <p className="mt-4">
                    We are literally building a playground for hackers with zero guardrails.
                  </p>
                  <p className="mt-4">
                    That's not acceptable. That's what we're here to fix.
                  </p>
                </div>

                <div className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-8 mt-12">
                  <h3 className="text-2xl font-bold text-cyber-pink mb-4">Private Beta Status</h3>
                  <p>
                    Our agentic guardrails and red-teaming agents are in private beta with four enterprise clients. 
                    We're validating our approach in real-world conditions with teams that understand the stakes.
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

