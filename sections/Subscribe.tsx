'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
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
    <section id="subscribe" className="flex items-center justify-center px-6 py-12">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-2xl p-8"
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            Stay <span className="text-gradient">Updated</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-8">
            Get the latest on AI security research and product updates
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="flex-1 px-6 py-3 bg-cyber-black/50 border-2 border-cyber-red/30 rounded-lg text-white placeholder-gray-500 focus:border-cyber-red focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-cyber-red hover:bg-cyber-pink transition-colors rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-sm p-3 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/40'
                    : 'bg-cyber-red/20 text-cyber-red border border-cyber-red/40'
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

