'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Product() {
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
              <h1 className="text-6xl md:text-7xl font-bold mb-4">
                <span className="text-gradient glow-red">Runtime Defense</span>
                <span className="text-white block mt-2">for Autonomous AI Agents</span>
              </h1>
              <p className="text-xl text-cyber-pink mb-8">In private beta</p>

              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <div>
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">From Detection to Prevention</h2>
                  <p>
                    We're building a pluggable, production-grade security layer that shifts the industry from detection-first 
                    to prevention-first guarantees. Our product combines self-evolving runtime guardrails, a cryptographic 
                    capability-and-provenance layer, and a risk engine that enforces least-privilege at call time.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-cyber-pink mb-3">How It Works</h3>
                  <ul className="space-y-3 ml-6">
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span><strong>Self-Evolving Guardrails:</strong> Guardrails evolve continuously through automated red-teaming and incorporation of the latest AI-security research</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span><strong>Cryptographic Capability Layer:</strong> Issues attenuable, auditable tokens and cryptographic verification so every tool invocation and side-effect is verifiably authorized and traceable</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">▪</span>
                      <span><strong>Risk Engine:</strong> Enforces least-privilege at call time with deterministic, auditable agent behavior</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-cyber-pink mb-3">Key Benefits</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-cyber-red">✓</span>
                      <span>Minimal integration overhead</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">✓</span>
                      <span>High autonomy with verifiable authority</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">✓</span>
                      <span>No UX compromises</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">✓</span>
                      <span>Prevents privilege escalation</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-red">✓</span>
                      <span>Enables safe delegation between agents and subagents</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-cyber-pink mb-3">The Problem We Solve</h3>
                  <p>
                    We've jailbroken every state-of-the-art LLM. We've poisoned agentic frameworks integrated with payroll, 
                    billing, and financial systems. We've demonstrated how a single prompt-injected PDF can hijack bank accounts.
                  </p>
                  <p className="mt-4">
                    AI agents are about to control payment rails, crypto transfers, and financial operations. Without runtime 
                    defense, we're building an open playground for attackers.
                  </p>
                </div>

                <div className="border-t border-cyber-red/20 pt-8 mt-12">
                  <h2 className="text-3xl font-bold text-cyber-pink mb-4">The Bounty Platform</h2>
                  <p>
                    As a complement to our core product, we're launching a Kaggle-style platform for AI-security bounties 
                    and competitive games. Researchers and practitioners hack realistic scenarios including prompt injections, 
                    jailbreaks, RAG attacks, and supply-chain tricks across difficulty levels.
                  </p>

                  <div className="mt-4 space-y-3">
                    <p>
                      <strong className="text-cyber-pink">Custom Challenges:</strong> Create custom challenge scenarios using 
                      privacy-preserving building blocks that mimic real systems without revealing proprietary logic.
                    </p>
                    <p>
                      <strong className="text-cyber-pink">Continuous Red-Teaming:</strong> This marketplace accelerates continuous 
                      red-teaming and builds a corpus of exploitable patterns.
                    </p>
                    <p>
                      <strong className="text-cyber-pink">Feedback Loop:</strong> Practical adversarial data feeds back into our 
                      guardrails and threat models, creating a virtuous cycle of security improvement.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

