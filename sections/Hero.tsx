'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Copy, Lock, Cpu, Zap, Eye, BookOpen } from 'lucide-react'
import AnimatedContent from '../components/AnimatedContent'
import DecryptedText from '../components/DecryptedText'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'unix' | 'windows'>('unix')

  const commands = {
    unix: "curl -fsSL https://badcompany.ai/install | bash",
    windows: 'powershell -c "irm https://badcompany.ai/install.ps1 | iex"'
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }



  const features = [
    { icon: Lock, text: "deterministic security" },
    { icon: Cpu, text: "complete hardware isolation" },
    { icon: Zap, text: "near-zero overhead maximising utility" },
    { icon: Eye, text: "complete visibility into agentic processes" },
    { icon: BookOpen, text: "natural language for policy definitions + formal verification" },
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 bg-cyber-black overflow-hidden w-full max-w-[100vw] relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center max-w-full"
          >
            {/* Heading */}
            {/* Heading */}
            <h1 className="text-3xl md:text-7xl font-bold leading-tight tracking-tight mb-8 text-white break-words w-full max-w-[calc(100vw-3rem)]">
              RUNTIME<br />
              DEFENSE FOR<br />
              <span className="text-cyber-red font-mono">AI AGENTS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-400 mb-12 max-w-lg font-mono leading-relaxed">
              The deterministic security architecture built for <span className="bg-white/10 px-1 py-0.5 rounded text-white text-sm">autonomous</span> AI systems.
            </p>

            {/* Terminal Install Box */}
            <div className="max-w-xl w-full max-w-[calc(100vw-3rem)]">
              <div className="flex items-center gap-6 mb-2 ml-1">
                <button
                  onClick={() => setActiveTab('unix')}
                  className={`text-xs font-mono pb-1 transition-colors ${activeTab === 'unix' ? 'text-white border-b border-cyber-red' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  MAC / LINUX
                </button>
                <button
                  onClick={() => setActiveTab('windows')}
                  className={`text-xs font-mono pb-1 transition-colors ${activeTab === 'windows' ? 'text-white border-b border-cyber-red' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  WINDOWS (POWERSHELL)
                </button>
              </div>
              <div className="relative group bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex items-center justify-between hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3 font-mono text-sm text-gray-300 overflow-x-auto no-scrollbar flex-1 min-w-0">
                  <span className="text-gray-500 select-none">{'>'}</span>
                  <span className="whitespace-nowrap">{commands[activeTab]}</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 p-2 text-gray-500 hover:text-white transition-colors rounded-md"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>

                {/* Corner accents */}
                <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-zinc-600 rounded-bl-sm opacity-50"></div>
                <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-zinc-600 rounded-br-sm opacity-50"></div>
              </div>
            </div>

          </motion.div>

          {/* Right Content - Visual */}
          <div className="hidden lg:flex flex-col justify-center items-start gap-8 relative pl-10 min-h-[600px]">
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-cyber-red/5 blur-[100px] rounded-full user-select-none pointer-events-none -z-10"></div>

            {features.map((feature, index) => (
              <AnimatedContent
                key={index}
                distance={100}
                direction="vertical"
                reverse={false}
                duration={0.4}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={index * 0.33}
                disappearAfter={0}
              >
                <div className="flex items-center gap-6 group">
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 group-hover:border-cyber-red/50 transition-colors">
                    <feature.icon className="w-6 h-6 text-cyber-red" />
                  </div>
                  <div className="font-mono text-white text-lg tracking-tight">
                    <DecryptedText
                      text={feature.text}
                      animateOn="view"
                      animateDelay={index * 333 + 133}
                      speed={33}
                      maxIterations={20}
                      revealDirection="start"
                      sequential={true}
                      className="text-white"
                      parentClassName="block"
                    />
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

