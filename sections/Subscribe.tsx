'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { Mail, ArrowRight } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    // ... logic remains same ...
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          setMessage({ type: 'error', text: 'This email is already subscribed.' })
        } else {
          setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' })
        }
      } else {
        setMessage({ type: 'success', text: 'Thanks for subscribing! You will hear from us soon.' })
        setEmail('')
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="subscribe" className="flex items-center justify-center px-6 py-24 bg-cyber-black border-y border-white/5">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-cyber-red" />
            <span className="text-cyber-red font-mono text-sm tracking-wider uppercase">Newsletter</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-mono">
            STAY <span className="text-zinc-600">UPDATED</span>
          </h2>
          <p className="text-xl text-gray-500 mb-12 font-mono max-w-2xl mx-auto">
            Get the latest research on agentic security and product updates directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative">
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 rounded text-white font-mono placeholder-zinc-600 focus:border-cyber-red/50 focus:outline-none transition-all pr-16"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 px-4 bg-white hover:bg-gray-200 text-black rounded font-mono font-bold transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-left font-mono text-sm p-3 border rounded ${message.type === 'success'
                    ? 'bg-green-900/10 text-green-400 border-green-900/30'
                    : 'bg-red-900/10 text-red-400 border-red-900/30'
                  }`}
              >
                <span className="mr-2 opacity-50">/</span>{message.text}
              </motion.div>
            )}

            <p className="mt-4 text-xs text-zinc-600 font-mono">
              No spam. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

