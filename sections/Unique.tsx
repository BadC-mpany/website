'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Adversarial Mindset',
    description: 'We think like attackers to build better defenses. Our team includes ethical hackers and red teamers who understand the dark arts.',
    icon: '⚔️'
  },
  {
    title: 'Open Source First',
    description: 'Security through obscurity is dead. We believe in transparent, community-driven tools that everyone can audit and improve.',
    icon: '🔓'
  },
  {
    title: 'Real-World Testing',
    description: 'No theoretical BS. Every tool and technique we develop is battle-tested against actual AI systems in production environments.',
    icon: '🎯'
  },
  {
    title: 'Cutting Edge Research',
    description: 'We publish our findings, speak at conferences, and push the boundaries of what\'s possible in AI security research.',
    icon: '🧬'
  }
]

export default function Unique() {
  return (
    <section id="unique" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Why We're <span className="text-gradient">Different</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Not your typical security company
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-8 hover:border-cyber-red transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-cyber-pink">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

