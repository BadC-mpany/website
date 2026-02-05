'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const team = [
  {
    name: 'János Mozer',
    role: 'CEO & ARCHITECT',
    bio: 'Physics background with experience in developing error-proof systems for distributed, resilient architectures, guaranteeing high availability through secure protocols.',
    image: '/images/profile.jpeg'
  },
  {
    name: 'Péter Tallósy',
    role: 'ML ENGINEER',
    bio: 'Physics-trained research engineer with deep expertise in ML/AI and strong full-stack software engineering capability. Experienced in building system spanning generative CAD, large-scale ML optimization, and ML-enabled infrastructure solutions.',
    image: '/images/petya.jpeg'
  },
  {
    name: 'Gregorio Jaca',
    role: 'RESEARCH ENGINEER',
    bio: 'Physics and Biology background. Worked on simulations from fluid dynamics and rockets to network systems. Currently researching LLM dynamics and interpretability through the lens of chaos theory.',
    image: '/images/grego.jpeg'
  }
]

export default function Team() {
  return (
    <section id="team" className="flex items-center justify-center px-6 py-24 bg-cyber-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono text-white text-center">
              MEET THE <span className="text-cyber-red">TROUBLEMAKERS</span>
            </h2>
            <p className="text-xl text-gray-500 text-center font-mono max-w-2xl">
              The rebels behind the code
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-cyber-red/50 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-cyber-red/50 transition-colors">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <h3 className="text-xl font-bold font-mono text-white mb-2">{member.name}</h3>
                  <div className="px-3 py-1 bg-cyber-red/10 border border-cyber-red/20 rounded mb-4">
                    <p className="text-xs font-bold font-mono text-cyber-red tracking-wider">{member.role}</p>
                  </div>

                  <p className="text-sm text-zinc-500 font-mono leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

