'use client'

import { motion } from 'framer-motion'

export default function Contact() {
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

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-cyber-green font-semibold">Email:</span>
                <a 
                  href="mailto:janos.mozer@growmesh.io"
                  className="text-cyber-green hover:text-cyber-pink transition-colors"
                >
                  janos.mozer@growmesh.io
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-cyber-blue font-semibold">LinkedIn:</span>
                <a 
                  href="https://www.linkedin.com/company/growmesh-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-blue hover:text-cyber-pink transition-colors"
                >
                  GrowMesh.io
                </a>
              </li>
              <li>
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}

