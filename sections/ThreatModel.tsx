'use client'

import { motion } from 'framer-motion'

const quotes = [
  { text: 'These are working exploits with immediate, real-world consequences. Attackers silently hijack AI agents to exfiltrate sensitive data and move across enterprise systems, bypassing the human entirely.', author: 'Michael Bargury', role: 'CTO, Zenity · Black Hat USA 2025' },
  { text: 'An agent does not have the same human understanding of things that are wrong to do. When given a goal, an agent will do harmful things.', author: 'Dean Sysman', role: 'Co-founder, Axonius · Bessemer Venture Partners' },
  { text: 'Prompt injection is unlikely to ever be fully solved.', author: 'OpenAI', role: 'Official statement, December 2025' },
  { text: 'The rapid adoption of AI agents has created an attack surface that most organizations do not even know exists. While vendors promise AI safety, attackers are already exploiting these systems in production.', author: 'Ben Kilger', role: 'CEO, Zenity' },
  { text: 'Attackers use AI freely. Defenders face red tape.', author: 'Rob Lee', role: 'Chief AI Officer, SANS Institute · RSAC 2025' },
  { text: 'AI agents are autonomous, high-privilege actors that can reason, act, and chain workflows across systems.', author: 'Barak Turovsky', role: 'Former Chief AI Officer, General Motors · Bessemer Venture Partners' },
  { text: 'IDPI is no longer merely theoretical but is being actively weaponized. The web itself effectively becomes an LLM prompt delivery mechanism.', author: 'Unit 42', role: 'Palo Alto Networks Threat Research' },
]

const incidents = [
  {
    n: '01',
    tag: 'CVE-2025-59536',
    href: 'https://adversa.ai/blog/claude-code-security-bypass-deny-rules-disabled/',
    name: 'Claude Code silently disables its own deny rules',
    what: 'Security checks stop firing when they cost too many tokens. Full RCE and API key theft confirmed via malicious repo files.',
    how: 'Kernel hook fires on every connect(). No token budget at Ring 0.',
  },
  {
    n: '02',
    tag: 'INVARIANT LABS · 2025',
    href: 'https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks',
    name: 'Tool descriptions exfiltrate SSH keys and configs',
    what: 'Instructions hidden in MCP tool descriptions directed agents to read and upload private keys to an attacker server. Affected Anthropic, OpenAI, Zapier, Cursor.',
    how: 'Taint set on read_file. Outbound POST returns EPERM at the kernel before data leaves. Swapped MCP server refused before first call.',
  },
  {
    n: '03',
    tag: 'CVE-2025-32711',
    href: 'https://www.aim.security/blog/echolean-the-first-zero-click-ai-data-exfiltration-attack',
    name: 'One email. OneDrive, SharePoint, Teams. No click.',
    what: 'Crafted email caused Copilot to exfiltrate across three Microsoft services. Four controls bypassed. No alert fired.',
    how: 'Taint tracks every read. EPERM at kernel before the packet forms, regardless of routing domain.',
  },
]

const row1 = [quotes[0], quotes[2], quotes[4], quotes[6]]
const row2 = [quotes[1], quotes[3], quotes[5], quotes[0]]
const row3 = [quotes[2], quotes[4], quotes[6], quotes[1]]

function TickerRow({ items, duration, reverse = false }: { items: typeof quotes; duration: number; reverse?: boolean }) {
  const doubled = [...items, ...items]
  const cls = reverse ? 'ticker-rtl' : 'ticker-ltr'
  return (
    <div className="overflow-hidden border-b border-zinc-800/40 last:border-b-0">
      <div className={`${cls} flex whitespace-nowrap w-max py-5`} style={{ animationDuration: `${duration}s` }}>
        {doubled.map((q, i) => (
          <div key={i} className="flex items-baseline gap-3 px-12 border-r border-zinc-800/40">
            <span className="text-zinc-400 text-xs font-mono shrink-0 italic">{q.text}</span>
            <span className="text-cyber-red font-mono text-[11px] tracking-widest shrink-0 ml-3 not-italic">{q.author}</span>
            <span className="text-zinc-600 font-mono text-[11px] shrink-0">{q.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ThreatModel() {
  return (
    <section id="threats" className="bg-cyber-black">
      <style>{`
        @keyframes ticker-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ticker-rtl { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .ticker-ltr { animation: ticker-ltr linear infinite; }
        .ticker-rtl { animation: ticker-rtl linear infinite; }
        .ticker-ltr:hover, .ticker-rtl:hover { animation-play-state: paused; }
      `}</style>

      {/* Quote ticker — 3 rows */}
      <div className="border-y border-zinc-800/60">
        <TickerRow items={row1} duration={90} />
        <TickerRow items={row2} duration={120} reverse />
        <TickerRow items={row3} duration={100} />
      </div>

      {/* Main content */}
      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Three attack classes your<br className="hidden md:block" /> existing stack cannot see.
            </h2>
            <p className="text-zinc-500 mt-4 text-lg">
              Each demonstrated in the wild. Firewalls, WAFs, CASB, and SIEM missed every one.
            </p>
          </motion.div>

          {/* Incidents */}
          <div className="border-t border-zinc-800 font-mono">
            {incidents.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="border-b border-zinc-800 grid md:grid-cols-[24px_160px_1fr_1fr] gap-x-8 gap-y-3 py-6 items-start"
              >
                <span className="text-zinc-700 text-sm pt-0.5">{t.n}</span>

                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-cyber-red tracking-widest border border-cyber-red/20 bg-cyber-red/5 px-2 py-0.5 hover:bg-cyber-red/10 transition-colors duration-200 self-start whitespace-nowrap"
                >
                  {t.tag} ↗
                </a>

                <div>
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="text-sm font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors duration-200 leading-snug">
                      {t.name}
                    </div>
                  </a>
                  <div className="text-xs text-zinc-500 leading-relaxed">{t.what}</div>
                </div>

                <div>
                  <div className="text-[9px] text-cyber-red tracking-widest uppercase mb-2">Lilith</div>
                  <div className="text-xs text-zinc-300 leading-relaxed">{t.how}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-zinc-500 font-mono text-sm leading-relaxed max-w-2xl"
          >
            Firewalls inspect packets. WAFs inspect HTTP headers. EDRs watch process creation.{' '}
            <span className="text-white">None operate at tool-call granularity. None track data flow across calls. None enforce at the moment connect() fires.</span>{' '}
            The only enforcement point that cannot be bypassed from userspace is the kernel.
          </motion.p>

        </div>
      </div>
    </section>
  )
}
