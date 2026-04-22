'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import Link from 'next/link'

const TERMINAL_LINES = [
  { type: 'header', text: 'LILITH RUNTIME  v0.3.1  ● ACTIVE' },
  { type: 'blank', text: '' },
  { type: 'event', text: '[14:23:01] tools/call  read_file' },
  { type: 'detail', text: '  identity: spiffe://corp/agent-42' },
  { type: 'taint',  text: '  taint:    +file_read +sensitive' },
  { type: 'allow',  text: '  verdict:  ALLOW   (0.3ms)' },
  { type: 'blank', text: '' },
  { type: 'event', text: '[14:23:02] tools/call  http_post' },
  { type: 'detail', text: '  dest:     api.attacker.com:443' },
  { type: 'warn',  text: '  taint:    file_read → BLOCKED' },
  { type: 'deny',  text: '  verdict:  DENY    (0.2ms)' },
  { type: 'blank', text: '' },
  { type: 'alert', text: '✗ EXFILTRATION PREVENTED  seq:8821' },
]

const lineColor = {
  header: 'text-emerald-400 font-bold',
  blank:  '',
  event:  'text-zinc-300',
  detail: 'text-zinc-500',
  taint:  'text-yellow-400',
  allow:  'text-emerald-400',
  warn:   'text-orange-400',
  deny:   'text-cyber-red',
  alert:  'text-cyber-red font-bold',
}

const INSTALL_CMD = 'pip install lilith-zero'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    let alive = true
    let timer: ReturnType<typeof setTimeout>

    const showNext = (n: number) => {
      if (!alive) return
      setVisibleLines(n)
      if (n < TERMINAL_LINES.length) {
        timer = setTimeout(() => showNext(n + 1), 380)
      } else {
        timer = setTimeout(() => {
          if (!alive) return
          setVisibleLines(0)
          timer = setTimeout(() => showNext(1), 200)
        }, 4000)
      }
    }

    showNext(1)
    return () => { alive = false; clearTimeout(timer) }
  }, [])

  const stats = [
    { value: '>1.5M', label: 'decisions/sec' },
    { value: '<1ms', label: 'latency overhead' },
    { value: 'Ring 0', label: 'BPF-LSM enforcement' },
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 bg-cyber-black overflow-hidden w-full max-w-[100vw] relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
              <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">AI Agent Security</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-white">
              RUNTIME<br />
              DEFENSE FOR<br />
              <span className="text-cyber-red font-mono">AI AGENTS</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-lg font-mono leading-relaxed">
              MCP agents operate without runtime security controls. Tool poisoning,
              prompt injection, and lateral exfiltration go undetected by every
              existing security layer. Lilith closes all three, at the kernel level.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10 border-l-2 border-cyber-red pl-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-white font-mono font-bold text-xl">{s.value}</div>
                  <div className="text-zinc-500 font-mono text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/product"
                className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded font-mono font-bold text-sm tracking-wide"
              >
                LILITH ZERO / FREE
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 border border-zinc-700 text-white hover:border-cyber-red hover:text-cyber-red transition-colors rounded font-mono font-bold text-sm tracking-wide"
              >
                ENTERPRISE DEMO →
              </Link>
            </div>

            {/* Install */}
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between max-w-sm hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 font-mono text-sm text-gray-300">
                <span className="text-gray-500 select-none">$</span>
                <span>{INSTALL_CMD}</span>
              </div>
              <button onClick={copy} className="ml-4 p-1.5 text-gray-500 hover:text-white transition-colors rounded">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Right: live enforcement terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-[#0d1117] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-zinc-500">lilith: enforcement log</span>
              </div>

              <div className="p-6 font-mono text-xs leading-relaxed min-h-[320px]">
                {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    className={`${lineColor[line.type as keyof typeof lineColor]} ${line.type === 'blank' ? 'h-3' : ''}`}
                  >
                    {line.text}
                  </div>
                ))}
                {visibleLines < TERMINAL_LINES.length && (
                  <span className="inline-block w-2 h-4 bg-cyber-red animate-pulse ml-0.5" />
                )}
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 bg-cyber-red/3 blur-[120px] rounded-full pointer-events-none -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
