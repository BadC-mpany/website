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
            <p className="text-xl text-gray-300 mb-8">
              Think you can break our AI? Try your skills in our interactive security challenge game. 
              Find vulnerabilities, exploit weaknesses, and climb the leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/game"
                className="px-10 py-4 bg-cyber-red hover:bg-cyber-pink transition-colors rounded-lg font-bold text-lg"
              >
                Launch Game
              </a>
              <p className="text-sm text-gray-400">
                No installation required • Browser-based • Free to play
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

