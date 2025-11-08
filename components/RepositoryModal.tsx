'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RepositoryOption {
  title: string
  description: string
  url: string
}

interface RepositoryModalProps {
  isOpen: boolean
  onClose: () => void
  options: RepositoryOption[]
}

export default function RepositoryModal({ isOpen, onClose, options }: RepositoryModalProps) {
  const randomOffset = useMemo(() => {
    if (!isOpen) return { x: 0, y: 0 }
    return {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            drag
            dragMomentum={false}
            className="fixed top-1/2 left-1/2 z-50 cursor-grab active:cursor-grabbing"
            style={{
              transform: `translate(calc(-50% + ${randomOffset.x}px), calc(-50% + ${randomOffset.y}px))`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="bg-cyber-black/30 border-2 border-cyber-red/40 rounded-2xl p-4 min-w-max shadow-2xl">
              <div className="space-y-2">
                {options.map((option) => (
                  <motion.a
                    key={option.title}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="block px-4 py-2 rounded-lg border border-cyber-red/30 hover:border-cyber-red hover:bg-cyber-red/10 transition-all cursor-pointer text-white text-sm"
                  >
                    {option.title}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

