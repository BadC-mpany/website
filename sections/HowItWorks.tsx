'use client'

import { motion } from 'framer-motion'

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-cyber-black border-t border-zinc-900">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">How</span>
          <p className="text-zinc-400 font-mono text-base md:text-lg leading-relaxed mt-4 max-w-2xl">
            Any agent that touches your infrastructure or config is an unsecured attack surface.
            Cloud credentials, SSH keys, production secrets: no runtime control exists for any of it.
            Tool poisoning, prompt injection, and silent exfiltration are all demonstrated in the wild.
            Lilith enforces at the kernel with full observability of every agent action, transparent to agents, impossible to bypass from userspace.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
