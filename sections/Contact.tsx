'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CalModal from '../components/CalModal'
import ShinyText from '../components/ShinyText'
import StarBorder from '../components/StarBorder'

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
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono text-white text-center uppercase">
              Get in <span className="text-cyber-red">Touch</span>
            </h2>
          </div>

          <div className="group bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-lg hover:border-cyber-red/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left: Socials */}
              <div className="flex flex-col gap-8 w-full md:w-auto">
                <a
                  href="https://www.linkedin.com/in/janos-mozer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group/social"
                >
                  <div className="px-3 py-1 bg-cyber-red/10 border border-cyber-red/20 rounded">
                    <p className="text-[10px] font-bold font-mono text-cyber-red tracking-widest">LINKEDIN</p>
                  </div>
                  <span className="text-xl font-bold font-mono text-white group-hover/social:text-cyber-red transition-colors">Janos Mozer</span>
                </a>

                <a
                  href="https://discord.gg/mu5QZ98A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group/social"
                >
                  <div className="px-3 py-1 bg-cyber-red/10 border border-cyber-red/20 rounded">
                    <p className="text-[10px] font-bold font-mono text-cyber-red tracking-widest">DISCORD</p>
                  </div>
                  <span className="text-xl font-bold font-mono text-white group-hover/social:text-cyber-red transition-colors">Join Community</span>
                </a>
              </div>

              {/* Vertical Divider (Hidden on mobile) */}
              <div className="hidden md:block w-px h-32 bg-zinc-800"></div>

              {/* Right: Meeting Button */}
              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                <button
                  onClick={() => setIsCalModalOpen(true)}
                  className="px-10 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded font-mono font-bold text-sm tracking-widest group relative overflow-hidden"
                >
                  <ShinyText
                    text="SCHEDULE A MEETING"
                    disabled={false}
                    speed={2}
                    color="#4b5563"
                    shineColor="#ffffff"
                    className="shiny-text"
                  />
                </button>
              </div>
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

