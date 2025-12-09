'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CalModal from '../components/CalModal'

export default function Contact() {
  const [isCalModalOpen, setIsCalModalOpen] = useState(false)
  
  const calUrl = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/janos-mozer/30min'
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            We'd love to hear from you
          </p>

          <div className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-8 md:p-12">
            <p className="text-gray-300 mb-6">
              For inquiries, bug reports, or collaboration, reach out:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-cyber-blue font-semibold">LinkedIn:</span>
                <a 
                  href="https://www.linkedin.com/in/janos-mozer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-blue hover:text-cyber-pink transition-colors"
                >
                  Janos Mozer
                </a>
              </li>
              <li className="flex items-center">
                <a 
                  href="https://discord.gg/mu5QZ98A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-cyber-pink transition-colors"
                >
                  Join our Discord
                </a>
              </li>
            </ul>

            <div className="pt-6 border-t border-cyber-red/20">
              <button
                onClick={() => setIsCalModalOpen(true)}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-cyber-red hover:bg-cyber-pink transition-colors rounded-lg font-semibold text-white"
              >
                Schedule a Meeting
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <CalModal
        isOpen={isCalModalOpen}
        onClose={() => setIsCalModalOpen(false)}
        calUrl={calUrl}
      />
    </section>
  )
}

