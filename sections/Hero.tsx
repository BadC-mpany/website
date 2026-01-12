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
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient glow-red whitespace-nowrap">Runtime Defense</span>
              <span className="text-white block mt-2">for Autonomous AI Agents</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-2">
              In private beta with enterprise clients
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              AI agents now have authority over bank accounts, sensitive data, and financial operations. We're building the security the industry forgot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/product"
                className="px-8 py-3 border-2 border-cyber-red hover:bg-cyber-red/10 transition-colors rounded-lg font-semibold text-center"
              >
                Learn More
              </a>
              <a
                href="#subscribe"
                className="flex items-center justify-center px-8 py-3 bg-cyber-red hover:bg-cyber-pink transition-colors rounded-lg font-semibold"
              >
                Stay Updated
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
                loading="lazy"
                className="object-contain border-4 border-cyber-red/30 rounded-2xl border-glow"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

