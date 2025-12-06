'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RepositoryModal from '../components/RepositoryModal'

const repositories = [
  {
    name: 'Red-Teaming Agent',
    description: 'A comprehensive framework for LLM safety through adversarial prompt generation and automated evaluation.',
    language: 'Python',
    url: 'https://github.com/BadC-mpany/red-teaming-agent'
  },
  {
    name: 'Hack the AI',
    description: 'Red-Teaming game where users hack realistic multimodal agent systems with RAG, memory, and tool usage.',
    language: 'TypeScript, Python, LangChain',
    hasOptions: true,
    options: [
      {
        title: 'Interactive Game',
        description: 'Play the browser-based hacking game and test your red-teaming skills',
        url: 'https://play.badcompany.xyz/'
      },
      {
        title: 'RAG System',
        description: 'Explore the architecture behind our multimodal agent systems',
        url: 'https://github.com/BadC-mpany/rag-system'
      }
    ]
  },
  {
    name: 'CHIMERA',
    description: 'Cryptographic Honeypot & Intent-Mediated Enforcement Response Architecture',
    language: 'Python',
    url: 'https://github.com/BadC-mpany/chimera-hackathon'
  }
]

export default function Repositories() {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  return (
    <section id="repositories" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Open Source <span className="text-gradient">Research</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Publishing our findings to secure the future of AI
          </p>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
              {repositories.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    if (repo.hasOptions) {
                      setSelectedRepo(repo.name)
                    } else if (repo.url) {
                      window.open(repo.url, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  className={`${repo.hasOptions || repo.url ? 'cursor-pointer' : ''}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-6 hover:border-cyber-red transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{repo.name}</h3>
                      {repo.hasOptions && (
                        <span className="text-xs text-cyber-pink bg-cyber-red/20 px-2 py-1 rounded ml-2">
                          Multiple Options
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-4">{repo.description}</p>
                    <div className="inline-block px-3 py-1 bg-cyber-red/20 rounded-full text-sm text-cyber-pink">
                      {repo.language}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <RepositoryModal
        isOpen={selectedRepo !== null}
        onClose={() => setSelectedRepo(null)}
        options={
          repositories.find(r => r.name === selectedRepo && r.hasOptions)?.options || []
        }
      />
    </section>
  )
}

