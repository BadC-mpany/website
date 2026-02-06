'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import CalModal from '../components/CalModal'

import ShinyText from '../components/ShinyText'
import StarBorder from '../components/StarBorder'

export default function OpenSource() {
    const [isCalModalOpen, setIsCalModalOpen] = useState(false)
    const calUrl = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/janos-mozer/30min'
    const [copied, setCopied] = useState(false)

    const copyCloneCommand = () => {
        navigator.clipboard.writeText('git clone https://github.com/BadC-mpany/lilith-v1.0')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="opensource" data-section="opensource" className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-cyber-black overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse"></div>
                            <span className="text-cyber-red font-mono text-sm tracking-wider uppercase">Open Source</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-mono">
                            <span className="text-white uppercase">Lilith SDK</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-8 max-w-xl font-mono leading-relaxed">
                            Our first open source MCP middleware. Establish a deterministic security envelope for your agents in under 10 minutes.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            <a
                                href="https://sentinel.badcompany.xyz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded font-mono font-bold text-sm tracking-wide flex items-center justify-center min-w-[160px]"
                            >
                                <ShinyText
                                    text="EXPLORE DOCS"
                                    disabled={false}
                                    speed={2}
                                    color="#4b5563"
                                    shineColor="#ffffff"
                                    className="shiny-text"
                                />
                            </a>
                            <a
                                href="https://github.com/BadC-mpany/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-zinc-700 text-white hover:border-cyber-red hover:text-cyber-red transition-colors rounded font-mono font-bold text-sm tracking-wide flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                STAR ON GITHUB
                            </a>
                        </div>

                        <div className="border-t border-zinc-800 pt-6">
                            <p className="text-zinc-500 mb-2 font-mono text-sm">
                                Have feedback or found a vulnerability?
                            </p>
                            <button
                                onClick={() => setIsCalModalOpen(true)}
                                className="text-sm font-semibold font-mono text-cyber-red hover:text-white transition-colors flex items-center gap-2"
                            >
                                SCHEDULE A CALL
                                <span>→</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Terminal / Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* The "Git Clone Box" visualization requested */}
                        <div className="bg-[#0d1117] border border-zinc-800 rounded-xl p-6 shadow-2xl relative overflow-hidden group hover:border-zinc-700 transition-all">

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-800/50 rounded-md">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold font-mono text-sm">Lilith</h3>
                                        <p className="text-zinc-500 text-xs font-mono">Public Repository</p>
                                    </div>
                                </div>
                            </div>

                            <StarBorder as="div" color="magenta" speed="5s" className="w-full">
                                <div className="flex items-center justify-between">
                                    <code className="font-mono text-sm text-gray-300">
                                        <span className="text-[#ff7b72] mr-2">git</span>
                                        <span className="text-[#d2a8ff] mr-2">clone</span>
                                        BadC-mpany/lilith-v1.0
                                    </code>
                                    <button
                                        onClick={copyCloneCommand}
                                        className="text-zinc-400 hover:text-white transition-colors"
                                    >
                                        {copied ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                        )}
                                    </button>
                                </div>
                            </StarBorder>

                        </div>
                    </motion.div>
                </div>
            </div>

            <CalModal
                isOpen={isCalModalOpen}
                onClose={() => setIsCalModalOpen(false)}
                calUrl={calUrl}
                theme="red"
            />
        </section>
    )
}
