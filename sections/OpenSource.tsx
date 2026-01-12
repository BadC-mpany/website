'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import CalModal from '../components/CalModal'

export default function OpenSource() {
    const [isCalModalOpen, setIsCalModalOpen] = useState(false)

    // Use the env var or default
    const calUrl = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/janos-mozer/30min'

    return (
        <section id="opensource" data-section="opensource" className="min-h-[70vh] flex items-center justify-center px-6 py-20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 border-2 border-cyber-blue/30 rounded-3xl p-12 overflow-hidden"
                >
                    {/* Background blurs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-cyber-blue">Sentinel v1.0</span>
                        </h2>

                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                            Our first open source security framework. <br />
                            Set up in under 10 minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                            <a
                                href="https://sentinel.badcompany.xyz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-cyber-blue/20 border border-cyber-blue hover:bg-cyber-blue/40 transition-colors rounded-lg font-bold text-lg text-white"
                            >
                                Explore Sentinel
                            </a>
                        </div>

                        <div className="border-t border-gray-700/50 pt-8 mt-4">
                            <p className="text-gray-400 mb-4">
                                We're curious to hear your feedback
                            </p>
                            <button
                                onClick={() => setIsCalModalOpen(true)}
                                className="text-sm font-semibold text-cyber-blue hover:text-white transition-colors underline decoration-dotted underline-offset-4"
                            >
                                Schedule a call with us
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <CalModal
                isOpen={isCalModalOpen}
                onClose={() => setIsCalModalOpen(false)}
                calUrl={calUrl}
                theme="blue"
            />
        </section>
    )
}
