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
        url: 'https://github.com/BadC-mpany/rag-game'
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
    url: '/blog?post=vsaml'
  },
  {
    name: 'Agency Without Assurance',
    description: 'Investigating the security risks of autonomous agents with full computer access and OpenClaw configuration vulnerabilities.',
    language: 'Security Audit',
    url: '/blog?post=clawdbot'
  }
]

export default function Repositories() {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  return (
    <section id="repositories" className="min-h-screen flex items-center justify-center px-6 py-20 bg-cyber-black">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono text-white text-center">
              OPEN SOURCE <span className="text-cyber-red">RESEARCH</span>
            </h2>
            <p className="text-xl text-gray-500 text-center font-mono max-w-2xl">
              Publishing our findings to secure the future of AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  if (repo.hasOptions) {
                    setSelectedRepo(repo.name)
                  } else if (repo.url) {
                    if (repo.url.startsWith('/')) {
                      window.location.href = repo.url
                    } else {
                      window.open(repo.url, '_blank', 'noopener,noreferrer')
                    }
                  }
                }}
                className={`group relative h-full ${repo.hasOptions || repo.url ? 'cursor-pointer' : ''}`}
              >
                <div className="h-full bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-cyber-red/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold font-mono text-white transition-colors">
                      {repo.name}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
                    {repo.name === 'Agency Without Assurance' ? (
                      <>
                        <span className="font-bold text-white">Investigating the security risks of</span> autonomous agents with full computer access and <span className="font-bold text-white">OpenClaw</span> configuration vulnerabilities.
                      </>
                    ) : repo.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 border border-zinc-800 bg-zinc-900 px-2 py-1 rounded">
                      {repo.language}
                    </span>
                    <span className="text-zinc-600 group-hover:text-cyber-red transition-colors">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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

