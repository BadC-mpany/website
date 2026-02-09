'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../../components/Header'

interface BlogPost {
  title: string
  date: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    title: 'Agency Without Assurance: The Security Risks of OpenClaw',
    date: 'February 2026',
    slug: 'clawdbot'
  },
  {
    title: 'vSAML: Primitives for a General Architecture of Agent Security',
    date: 'December 2025',
    slug: 'vsaml'
  }
]

export default function Blog() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-0">
              {blogPosts.map((post, index) => (
                <div key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block w-full text-left py-6 hover:opacity-80 transition-opacity"
                  >
                    <h2 className="text-2xl font-bold font-mono text-white mb-2">{post.title}</h2>
                    <p className="text-gray-400 font-mono">{post.date}</p>
                  </Link>
                  {index < blogPosts.length - 1 && (
                    <hr className="border-white/20 my-0" />
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
