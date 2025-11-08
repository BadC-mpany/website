'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const team = [
  {
    name: 'Matteo Horváth',
    role: 'Chief Hacker',
    bio: 'placeholder',
    image: '/images/matteo.jpeg'
  },
  {
    name: 'János Mozer',
    role: 'Architect',
    bio: 'Physics background with experience in error-proof systems and distributed, resilient architectures ensuring high availability and consistency via secure protocols.',
    image: '/images/profile.jpeg'
  },
  {
    name: 'Péter Tallósy',
    role: 'ML Engineer',
    bio: 'placeholder',
    image: '/images/petya.jpeg'
  },
  {
    name: 'Gregorio Jaca',
    role: 'Research Engineer',
    bio: 'Physics and Biology background. Currently studying LLM dynamics and interpretability through the lens of chaos theory.',
    image: '/images/grego.jpeg'
  },
  {
    name: 'Koppany Kovats',
    role: 'Advisor',
    bio: 'placeholder',
    image: '/images/koppany.jpeg'
  }
]

const createRows = () => {
  const shuffled = [...team].sort(() => Math.random() - 0.5)
  return {
    topRow: shuffled.slice(0, 2),
    bottomRow: shuffled.slice(2)
  }
}

export default function Team() {
  const initialRows = useMemo(
    () => ({
      topRow: team.slice(0, 2),
      bottomRow: team.slice(2)
    }),
    []
  )
  const [rows, setRows] = useState(initialRows)

  useEffect(() => {
    setRows(createRows())
  }, [])

  const renderCard = (member: (typeof team)[number], index: number) => (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-6 text-center hover:border-cyber-red transition-all h-full flex flex-col items-center"
    >
      <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border-2 border-cyber-red/40">
                  <Image
                    src={member.image}
                    alt={`${member.name} portrait`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-cyber-pink font-semibold mb-2 text-sm">{member.role}</p>
                <p className="text-xs text-gray-400 flex-1">{member.bio}</p>
    </motion.div>
  )

  return (
    <section id="team" className="flex items-center justify-center px-6 py-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-2">
            Meet the <span className="text-gradient">Troublemakers</span>
          </h2>
          <p className="text-lg text-gray-400 text-center mb-8">
            The rebels behind the code
          </p>

          <div className="space-y-6">
            <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
              {rows.topRow.map((member, index) => renderCard(member, index))}
            </div>

            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {rows.bottomRow.map((member, index) =>
                renderCard(member, index + rows.topRow.length)
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

