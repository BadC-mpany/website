'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient glow-red">Bad</span>
              <span className="text-white">company</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Breaking the rules to secure AI systems
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              We are an AI security company that thinks differently. While others play it safe, 
              we embrace the chaos to find vulnerabilities before the bad actors do. 
              Our mission is to push boundaries, challenge conventions, and make AI systems truly secure.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#repositories"
                className="px-8 py-3 bg-cyber-red hover:bg-cyber-pink transition-colors rounded-lg font-semibold"
              >
                Explore Projects
              </a>
              <a 
                href="#game"
                className="px-8 py-3 border-2 border-cyber-red hover:bg-cyber-red/10 transition-colors rounded-lg font-semibold"
              >
                Play Our Game
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/images/badcompany_logo_2.jpg"
                alt="Badcompany Cyberpunk Logo"
                fill
                className="object-contain border-4 border-cyber-red/30 rounded-2xl border-glow"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

