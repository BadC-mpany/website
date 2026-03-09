'use client'

import { motion } from 'framer-motion'
import { Shield, Server, Activity } from 'lucide-react'

// You mentioned 3 cards
// 1. Secure Development Environments
// 2. Secure Container for Agents
// 3. MedTech

const enterprises = [
    {
        title: 'MCP Security Audit',
        subtitle: 'ASSESSMENT',
        sections: [
            {
                description: 'white-box assessment',
                features: [
                    'logical defects',
                    'attack surfaces',
                    'tool poisoning',
                    'other vulnerabilities',
                    'discovery document + detailed remediation plan',
                ],
            },
        ],
        icon: <Shield className="w-8 h-8 text-white" />,
    },
    {
        title: 'Securing Existing Agents',
        subtitle: 'DEPLOYMENT',
        sections: [
            {
                description: (
                    <span>
                        Deploying <a href="https://github.com/BadC-mpany/lilith-zero" target="_blank" rel="noopener noreferrer" className="text-cyber-red hover:underline decoration-cyber-red/50 hover:text-white transition-colors">Lilith-zero</a>
                    </span>
                ),
                features: [
                    'Security middleware at the application layer',
                    'Agent scope definition',
                    'Policy set definition',
                    'Runtime observability',
                    'MCP native',
                    'Secure deployment of existing AI agents'
                ],
            },
        ],
        icon: <Activity className="w-8 h-8 text-white" />,
    },
    {
        title: 'Complete workstation Safety',
        subtitle: 'COMING SOON',
        sections: [
            {
                description: 'Deploying Lilith substrate as an agent and os agnostic security layer',
                features: [
                    'API access to NLP for precise and fine-grained policy definitions',
                    'Built on the kernel',
                    'Enterprise-grade security solution at the kernel-level',
                ],
            },
        ],
        icon: <Server className="w-8 h-8 text-white" />,
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
                                    <h3 className="text-2xl font-bold font-mono text-white mb-6 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="flex flex-col gap-8">
                                        {item.sections.map((section, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-4 flex gap-2">
                                                    <span className="mt-0">{section.description}</span>
                                                </p>
                                                <ul className="space-y-3">
                                                    {section.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-sm font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                                            <span className="text-cyber-red mt-0.5">-</span>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

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
