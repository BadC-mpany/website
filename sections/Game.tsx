'use client'

import { motion } from 'framer-motion'

export default function Game() {
  return (
    <section id="game" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-cyber-red/20 to-cyber-purple/20 border-2 border-cyber-red/40 rounded-3xl p-12 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-red/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-purple/10 rounded-full blur-3xl"></div>
          
              <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient glow-red">Hack the AI</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Put your red teaming skills to the test
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Hack prompt injections, jailbreaks, RAG attacks, and supply-chain exploits across difficulty levels. 
              Help build the adversarial knowledge that secures AI systems at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://play.badcompany.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-cyber-red hover:bg-cyber-pink transition-colors rounded-lg font-bold text-lg"
              >
                Play Beta
              </a>
              <p className="text-sm text-gray-400">
                Browser-based • Free to play
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

