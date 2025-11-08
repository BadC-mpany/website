'use client'

import { motion } from 'framer-motion'

const team = [
  {
    name: 'Matteo Horváth',
    role: 'Chief Hacker',
    bio: 'placeholder',
    image: '👾'
  },
  {
    name: 'János Mozer',
    role: 'Technical Lead',
    bio: 'Physics background with experience in error-proof systems and resilient distributed architectures ensuring high availability and consistency via secure protocols.',
    image: '🤖'
  },
  {
    name: 'Péter Tallósy',
    role: 'Research Engineer',
    bio: 'placeholder',
    image: '🔬'
  },
  {
    name: 'Gregorio Jaca',
    role: 'Research Engineer',
    bio: 'Physics and Biology background. Currently studying LLM dynamics and interpretability through the lens of chaos theory.',
    image: '🥷'
  }
  // TODO: confirm roles. write bios. Koppany ?
]

export default function Team() {
  return (
    <section id="team" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Meet the <span className="text-gradient">Troublemakers</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            The rebels behind the code
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-6 text-center hover:border-cyber-red transition-all"
              >
                <div className="text-7xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-cyber-pink font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

