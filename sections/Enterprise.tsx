'use client'

import { motion } from 'framer-motion'
import { Shield, Server, Users } from 'lucide-react'
import Link from 'next/link'

const tiers = [
  {
    badge: 'OPEN SOURCE',
    badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
    icon: Shield,
    name: 'Lilith Zero',
    tagline: 'Application-layer enforcement for MCP agents. No kernel required.',
    features: [
      'Cedar policy engine: policy-as-code, human-readable',
      '64-bit taint bitmask per agent session',
      'Python and TypeScript SDKs',
      'HMAC-signed tamper-evident audit log',
      'Apache 2.0 licensed, full source available',
    ],
    cta: { label: 'View on GitHub →', href: 'https://github.com/BadC-mpany/lilith-zero', external: true },
    highlight: false,
  },
  {
    badge: 'ENTERPRISE',
    badgeColor: 'text-cyber-red border-cyber-red/30 bg-cyber-red/5',
    icon: Server,
    name: 'Lilith',
    tagline: 'Kernel-level enforcement. Zero agent code changes. Zero trust gaps.',
    features: [
      'BPF-LSM at Ring 0, transparent to any agent framework',
      'SPIFFE/SPIRE cryptographic workload identity',
      'Fail-closed BPF heartbeat: all connections blocked if daemon dies',
      'Ed25519-signed policy capsules with anti-rollback watermarks',
      'FIPS 140-3 capable (aws-lc-rs crypto backend)',
    ],
    cta: { label: 'BOOK A DEMO →', href: '/#contact', external: false },
    highlight: true,
  },
  {
    badge: 'SERVICES',
    badgeColor: 'text-zinc-400 border-zinc-600/30 bg-zinc-800/30',
    icon: Users,
    name: 'Professional Services',
    tagline: 'Architecture review, deployment, and ongoing security posture.',
    features: [
      'AI agent attack surface assessment and threat modeling',
      'White-box security audit of existing AI agent pipelines',
      'Cedar policy authoring and formal verification',
      'SPIRE deployment and SPIFFE identity integration',
      'Bespoke incident response and remediation planning',
    ],
    cta: { label: 'GET IN TOUCH →', href: '/#contact', external: false },
    highlight: false,
  },
]

export default function Enterprise() {
  return (
    <section id="enterprise" className="py-24 px-6 bg-cyber-black">
      <div className="container mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">Products</span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mt-4 mb-5 leading-tight">
            ONE SECURITY<br />
            <span className="text-zinc-500">ARCHITECTURE.</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Start open source at the application layer. Upgrade to kernel-level enforcement
            when the threat model demands it. Both run the same Cedar policy language and taint engine.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className={`h-full flex flex-col bg-zinc-900/40 border rounded-lg p-7 transition-all duration-300 ${
                tier.highlight
                  ? 'border-cyber-red/40 shadow-[0_0_40px_rgba(255,0,85,0.06)]'
                  : 'border-zinc-800/80 hover:border-zinc-700'
              }`}>
                {tier.highlight && (
                  <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyber-red to-transparent" />
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className={`p-2.5 rounded-md transition-colors ${
                    tier.highlight ? 'bg-cyber-red/15' : 'bg-zinc-800 group-hover:bg-zinc-700/80'
                  }`}>
                    <tier.icon className={`w-5 h-5 ${tier.highlight ? 'text-cyber-red' : 'text-white'}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    {tier.highlight && (
                      <div className="flex items-center gap-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/fips-140-2.png"
                          alt="FIPS 140-2 Validated"
                          className="h-7 w-auto"
                          style={{ filter: 'invert(1)', opacity: 0.7 }}
                        />
                        <span className="font-mono text-[8px] text-zinc-600 tracking-widest uppercase leading-tight">
                          FIPS<br />140-2
                        </span>
                      </div>
                    )}
                    <span className={`text-[10px] font-mono font-bold tracking-widest border px-2 py-0.5 rounded ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-mono text-white mb-1.5">{tier.name}</h3>
                <p className="text-zinc-500 font-mono text-xs mb-6 leading-relaxed">{tier.tagline}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs font-mono text-zinc-400">
                      <span className={`mt-0.5 shrink-0 ${tier.highlight ? 'text-cyber-red' : 'text-zinc-600'}`}>-</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 border-t border-zinc-800/80">
                  {tier.cta.external ? (
                    <a
                      href={tier.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono font-bold text-xs tracking-widest transition-colors ${
                        tier.highlight ? 'text-cyber-red hover:text-white' : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {tier.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={tier.cta.href}
                      className={`font-mono font-bold text-xs tracking-widest transition-colors ${
                        tier.highlight ? 'text-cyber-red hover:text-white' : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {tier.cta.label}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
