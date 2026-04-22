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
    tagline: 'Application-layer enforcement for MCP agents.',
    features: [
      'Cedar policy engine: policy-as-code, human-readable',
      '64-bit taint bitmask per agent session',
      'Python and TypeScript SDKs',
      '>1.5M decisions/sec, <1ms overhead',
      'HMAC-signed tamper-evident audit log',
      'Formal verification via Kani proof harnesses',
      'MIT licensed, full source available',
    ],
    cta: { label: 'View on GitHub →', href: 'https://github.com/BadC-mpany/lilith-zero', external: true },
    highlight: false,
  },
  {
    badge: 'ENTERPRISE',
    badgeColor: 'text-cyber-red border-cyber-red/30 bg-cyber-red/5',
    icon: Server,
    name: 'Lilith',
    tagline: 'Kernel-level enforcement. Zero agent code changes.',
    features: [
      'BPF-LSM at Ring 0, transparent to any agent framework',
      'SPIFFE/SPIRE cryptographic workload identity',
      'Cedar policy with taint propagation, per tool-call precision',
      'Ed25519-signed policy capsules with anti-rollback watermarks',
      'Fail-closed BPF heartbeat: all connections blocked if daemon dies',
      'FIPS 140-3 capable (aws-lc-rs crypto backend)',
      'Audit stream: gRPC server-streaming, HMAC-verified',
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
      'Threat model assessment: Lethal Trifecta coverage audit',
      'White-box security audit of existing AI agent pipelines',
      'MCP server attack surface review (tool poisoning, injection)',
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
          className="text-center mb-16"
        >
          <span className="text-cyber-red font-mono text-xs tracking-widest uppercase">Products & Services</span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mt-4 mb-6">
            TWO PRODUCTS.<br />
            <span className="text-zinc-500">ONE SECURITY ARCHITECTURE.</span>
          </h2>
          <p className="text-gray-400 font-mono text-base max-w-2xl mx-auto leading-relaxed">
            Start open source at the application layer. Upgrade to kernel-level enforcement
            when the threat model demands it. Both run the same Cedar policy language
            and taint engine.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className={`h-full flex flex-col bg-zinc-900/50 border rounded-lg p-8 transition-all duration-300 ${
                tier.highlight
                  ? 'border-cyber-red/50 shadow-[0_0_40px_rgba(255,0,85,0.07)]'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}>
                {tier.highlight && (
                  <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyber-red to-transparent" />
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-lg transition-colors ${
                    tier.highlight ? 'bg-cyber-red/20' : 'bg-zinc-800 group-hover:bg-zinc-700'
                  }`}>
                    <tier.icon className={`w-6 h-6 ${tier.highlight ? 'text-cyber-red' : 'text-white'}`} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold tracking-widest border px-2 py-1 rounded ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white mb-2">{tier.name}</h3>
                <p className="text-zinc-400 font-mono text-sm mb-6 leading-relaxed">{tier.tagline}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-mono text-zinc-400">
                      <span className={`mt-0.5 shrink-0 ${tier.highlight ? 'text-cyber-red' : 'text-zinc-600'}`}>-</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto pt-6 border-t border-zinc-800">
                  {tier.cta.external ? (
                    <a
                      href={tier.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono font-bold text-sm tracking-wide transition-colors ${
                        tier.highlight ? 'text-cyber-red hover:text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tier.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={tier.cta.href}
                      className={`font-mono font-bold text-sm tracking-wide transition-colors ${
                        tier.highlight ? 'text-cyber-red hover:text-white' : 'text-zinc-400 hover:text-white'
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
