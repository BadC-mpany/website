'use client'

import { motion } from 'framer-motion'

const repositories = [
  // {
  //   name: 'AI-Adversarial-Toolkit',
  //   description: 'Advanced toolkit for testing AI model robustness against adversarial attacks',
  //   language: 'Python',
  //   url: 'https://github.com/badcompany'
  // },
  {
    name: 'Red-Teaming Agent',
    description: 'A comprehensive framework for LLM safety through adversarial prompt generation and automated evaluation.',
    language: 'Python',
    url: 'https://github.com/BadC-mpany/red-teaming-agent'
  },
  {
    name: 'Hacker Bounty', // TODO: name ?
    description: 'Red-Teaming game where users hack realistic multimodal agent systems with RAG, memory, and tool usage.',
    language: 'TypeScript', // add multiple {'TypeScript', 'SQL', 'CSS', "JavaScript"}
    url: 'https://github.com/BadC-mpany/rag-game'
  }
  // TODO are we going to put 2 or 3 repos here? if 2, align and center properly 
]

export default function Repositories() {
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

          <div className="grid md:grid-cols-3 gap-8">
            {repositories.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-6 hover:border-cyber-red transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{repo.name}</h3>
                  <div className="flex items-center space-x-1 text-cyber-pink">
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{repo.description}</p>
                <div className="inline-block px-3 py-1 bg-cyber-red/20 rounded-full text-sm text-cyber-pink">
                  {repo.language}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

