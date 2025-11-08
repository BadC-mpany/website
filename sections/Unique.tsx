'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'We Jailbreak Everything',
    description: 'We\'ve cracked every state-of-the-art LLM. We understand the attack surface better than anyone.',
    icon: '💣'
  },
  {
    title: 'Architectures, Not Just Guardrails',
    description: 'Just detection fails at scale. We build architectures that prevent risks using cryptographic proof of authorization.',
    icon: '🛡️'
  },
  {
    title: 'Battle-Tested', // TODO will we include this?
    description: 'We continuously validate our products through communities and ethical hacking of enterprise clients.',
    icon: '⚙️'
  },
  {
    title: 'R&D',
    description: 'We are a team of engineers and researchers at the frontier of AI and cybersecurity progress. We are constanly prototyping and improving our products',
    icon: '🔭'
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
            Our strongsuit
          </h2>
          {/* <p className="text-xl text-gray-400 text-center mb-16">
            Not your typical security company
          </p> */}

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

