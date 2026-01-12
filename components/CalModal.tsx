'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalModalProps {
  isOpen: boolean
  onClose: () => void
  calUrl: string
  theme?: 'red' | 'blue'
}

export default function CalModal({ isOpen, onClose, calUrl, theme = 'red' }: CalModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const borderColor = theme === 'blue' ? 'border-cyber-blue/30' : 'border-cyber-red/30'
  const hoverBorderColor = theme === 'blue' ? 'hover:border-cyber-blue' : 'hover:border-cyber-red'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative w-full h-full max-w-5xl max-h-[90vh] bg-cyber-black border-2 ${borderColor} rounded-xl overflow-hidden shadow-2xl transition-colors`}>
              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-cyber-black/80 border ${borderColor} rounded-lg ${hoverBorderColor} transition-colors text-white`}
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Cal.com iframe */}
              <iframe
                src={calUrl}
                className="w-full h-full border-0"
                title="Schedule a meeting"
                allow="camera; microphone; geolocation"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

