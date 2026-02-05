'use client'

import { motion } from 'framer-motion'
import { Shield, Server, Activity } from 'lucide-react'

// You mentioned 3 cards
// 1. Secure Development Environments
// 2. Secure Container for Agents
// 3. MedTech

const enterprises = [
    {
        title: 'Secure Environment',
        subtitle: 'DEVELOPER SIDE',
        description: 'A verified development framework for high-assurance coding.',
        features: [
            'Verified browser actions',
            'Coding actions verified',
            'No API leak',
            'No bloatware install',
            'No network exploit',
            'No wallet key exfiltration',
        ],
        icon: <Shield className="w-8 h-8 text-white" />,
    },
    {
        title: 'Secure Container',
        subtitle: 'SELF-HOSTED ENTERPRISE',
        description: 'Verified execution environment for autonomous agent swarms.',
        features: [
            'Agent swarms verified',
            'No leftover zombie processes',
            'No data exfiltration',
            'No bloatware install',
            'No sensitive leak',
            'No database deletion',
        ],
        icon: <Server className="w-8 h-8 text-white" />,
    },
    {
        title: 'MedTech / High Stakes',
        subtitle: 'COMBINED PROTECTION',
        description: 'End-to-end protection for critical IP and regulated data.',
        features: [
            'Confidential information obfuscation',
            'Full audit trail for FDA',
            'Encrypted inference',
            'Model weight protection',
            'Zero-trust data ingress',
        ],
        icon: <Activity className="w-8 h-8 text-white" />,
    },
]

export default function Enterprise() {
    return (
        <section id="enterprise" className="min-h-screen flex items-center justify-center px-6 py-24 bg-cyber-black">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Header */}
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono text-white text-center">
                            ENTERPRISE <span className="text-cyber-red">SOLUTIONS</span>
                        </h2>
                        <p className="text-xl text-gray-500 text-center font-mono max-w-2xl">
                            Deterministic security for critical infrastructure
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {enterprises.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative h-full"
                            >
                                <div className="h-full bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg hover:border-cyber-red/50 transition-all duration-300 flex flex-col">
                                    {/* Icon Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-cyber-red/20 transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-mono font-bold text-cyber-red tracking-wider uppercase border border-cyber-red/30 px-2 py-1 rounded bg-cyber-red/5">
                                            {item.subtitle}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold font-mono text-white mb-3 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
                                        {item.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-3 mt-auto">
                                        {item.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                                <span className="text-cyber-red mt-0.5">/</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Decoration */}
                                    {/* Decoration element removed */}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
