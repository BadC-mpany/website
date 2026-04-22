'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../../components/Header'

interface BlogPost {
  title: string
  date: string
  slug: string
  tag?: string
}

const blogPosts: BlogPost[] = [
  {
    title: 'Why We Built on the Linux Kernel: BPF-LSM Enforcement for AI Agents',
    date: 'April 2026',
    slug: 'bpf-lsm-kernel',
    tag: 'Engineering',
  },
  {
    title: 'Taint Propagation: Why Heuristics Will Always Lose Against Prompt Injection',
    date: 'April 2026',
    slug: 'taint-propagation',
    tag: 'Security',
  },
  {
    title: 'We built deterministic agent security at ms scale: Lilith Zero',
    date: 'February 2026',
    slug: 'lilith-zero',
    tag: 'Product',
  },
  {
    title: 'Agency Without Assurance: The Security Risks of OpenClaw',
    date: 'February 2026',
    slug: 'clawdbot',
    tag: 'Research',
  },
  {
    title: 'vSAML: Primitives for a General Architecture of Agent Security',
    date: 'December 2025',
    slug: 'vsaml',
    tag: 'Research',
  },
]

const tagColors: Record<string, string> = {
  Engineering: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  Security: 'text-cyber-red border-cyber-red/30 bg-cyber-red/5',
  Product: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  Research: 'text-zinc-400 border-zinc-600/30 bg-zinc-800/30',
}

export default function Blog() {
  return (
    <main className="relative min-h-screen bg-cyber-black">
      <Header />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">Writing</span>
              <h1 className="text-4xl font-bold font-mono text-white mt-2">BLOG</h1>
            </div>

            <div className="space-y-0">
              {blogPosts.map((post, index) => (
                <div key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block w-full text-left py-7 group hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-cyber-red transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 font-mono text-sm">{post.date}</p>
                      </div>
                      {post.tag && (
                        <span className={`shrink-0 text-[10px] font-mono font-bold tracking-widest border px-2 py-0.5 rounded mt-0.5 ${tagColors[post.tag] ?? ''}`}>
                          {post.tag}
                        </span>
                      )}
                    </div>
                  </Link>
                  {index < blogPosts.length - 1 && (
                    <hr className="border-zinc-800" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
