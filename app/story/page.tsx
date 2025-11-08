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
              <h1 className="text-6xl md:text-7xl font-bold mb-12">
                <span className="text-gradient glow-red">Our Story</span>
              </h1>

              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <p>
                  For the past few years, we've been building and securing AI systems in enterprise environments. 
                  We have seen the industry pour billions into making AI faster, smarter, and more capable. We built some 
                  of those systems ourselves. But somewhere in the rush for performance, something critical was forgotten: 
                  the brakes.
                </p>

                <p>
                  There's a fundamental architecture gap in AI security. We have no airbags, no seatbelts, no crash tests 
                  for the most powerful technology being deployed in production systems right now.
                </p>

                <h2 className="text-3xl font-bold text-cyber-pink mt-12 mb-4">The Real Problem</h2>
                
                <p>
                  As regulations grow around AI, companies need to adapt. But it's not just compliance. The issue is deeper: 
                  as more freedom is given to AI—like access to documents and tools—the stochastic nature of AI makes it 
                  incredibly difficult to control, align to your interests, and keep secure.
                </p>

                <p>
                  We started testing this in the wild. We jailbroke the LLMs of banks and enterprises. We showed how 
                  prompt-injected documents could manipulate their systems. We exposed vulnerabilities in every state-of-the-art model.
                </p>

                <p>
                  But here's what struck us: when we looked at why some companies seemed more secure, we found something 
                  unsettling. They weren't actually secure—they were just incapable. They had such a limited set of functions 
                  their AI could perform that it was practically useless. The only way they achieved security was by removing all capability.
                </p>

                <p>
                  That's not a solution. That's a trap.
                </p>

                <h2 className="text-3xl font-bold text-cyber-pink mt-12 mb-4">A Different Approach</h2>

                <p>
                  What we're working on is different. Instead of choosing between capability and security, we're building both. Our goal is simple: an agent with the maximum amount of capability and the minimum amount of risk. 
                  We're building runtime defense architectures that verify every action, ensure provenance of every decision, 
                  and enforce least-privilege at the cryptographic level.
                </p>

                <p>
                  This isn't detection. This isn't a band-aid. This is prevention.
                </p>

                <div className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-8 mt-12">
                  <h3 className="text-2xl font-bold text-cyber-pink mb-4">Where We Are Now</h3>
                  <p>
                    Our guardrails and defense architectures are in private beta with four enterprise clients. 
                    We're validating our approach in real-world conditions—in systems where the stakes are high and the 
                    need for both capability and security is urgent. We've moved from proving the problem exists to proving 
                    that solutions can work.
                  </p>
                </div>

                {/* <p className="text-gray-400 italic mt-12">
                  Since 2022 we've been building enterprise AI applications. Since 2024 we've focused on AI security research. 
                  Since June 2025 we've been fully committed to this. Since September 2025, it's been 24/7.
                </p> */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
