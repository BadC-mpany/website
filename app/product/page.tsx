'use client'

import { motion } from 'framer-motion'
import Header from '../../components/Header'
import ProductArchitectureDiagram from '../../components/ProductArchitectureDiagram'

export default function Product() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="relative z-10">

        <section className="min-h-screen pt-32 px-6 pb-20 font-sans">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header that matches blog post style */}
              <div className="mb-12 border-b border-white/20 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
                  Deterministic Security Framework
                </h1>
                <p className="text-xl text-gray-400 font-sans">
                  Cross-platform protection for Linux, Windows, and MacOS systems
                </p>
              </div>

              {/* Content using markdown-body for consistent typography */}
              <div className="markdown-body font-sans">
                <p>
                  Bad Company develops a cross-platform, deterministic security substrate that establishes a mathematically verifiable safety envelope for autonomous agents. We replace probabilistic guardrails with execution-layer enforcement, securing critical infrastructure by making safety an immutable physical constraint of the system.
                </p>

                <h2>The Architectural Core</h2>

                <h3>Deterministic Policy Enforcement Point (PEP)</h3>
                <p>
                  The PEP sits directly in the execution path between the agent and the operating system. It acts as a
                  mandatory gatekeeper for every tool call, API request, and file system interaction. By intercepting
                  actions at the syscall level, it replaces best-effort filters with absolute, binary enforcement.
                </p>

                <h3>RL-Driven Intent Recognition</h3>
                <p>
                  While the PEP handles static rules, a specialized Reinforcement Learning Engine analyzes
                  high-fidelity logs in real-time. It identifies intent patterns, detecting multi-step injection
                  attacks or anomalous logic branches that static signatures miss, and communicates with the PEP to
                  dynamically revoke capabilities.
                </p>

                <h3>Stateful Taint Tracking</h3>
                <p>
                  We track the origin and flow of data throughout the agentic session. If an agent interacts with
                  untrusted context (e.g., a RAG-retrieved document or a web search), the system taints the session,
                  automatically restricting access to sensitive tools until the state is verified or cleansed.
                </p>

                <div className="my-10 bg-[#0d1117] p-4 rounded-lg border border-white/10 not-prose">
                  <ProductArchitectureDiagram />
                </div>

                <h2>Technical Reasoning: The Kernel-Level Shift</h2>
                <p>
                  Current AI infrastructure resembles the Enterprise Java era of the 2000s; bloated with high-level
                  abstractions that introduce massive latency and unobservable debt. We move enforcement to the kernel
                  level for two reasons:
                </p>

                <ul>
                  <li>
                    <strong>Near-Latency Performance (&lt;10ms):</strong> Security cannot be a trade-off
                    for utility. By operating at the lowest level of the stack, we achieve a target latency of less than
                    10ms, ensuring that real-time agentic workflows remain fast enough for business-critical operations.
                  </li>
                  <li>
                    <strong>Architectural Durability:</strong> High-level AI frameworks and Gemini/GPT
                    integrations are volatile and change monthly. The kernel/syscall interface is stable. By building at
                    this level, our security substrate remains immune to the rapid obsolescence of high-abstraction software.
                  </li>
                </ul>

                <h2>Observability and Verification</h2>
                <ul>
                  <li>
                    <strong>High-Fidelity Logs:</strong> We provide deep visibility into agent
                    behavior that is impossible at the application layer, capturing exactly how an agent interacts with
                    the underlying infrastructure.
                  </li>
                  <li>
                    <strong>Cryptographic Capability Binding:</strong> Every tool access is backed
                    by a cryptographically signed token. An agent cannot hallucinate its way into an unauthorized
                    database; the execution environment simply refuses to resolve the request without a valid, policy-backed signature.
                  </li>
                </ul>

                <hr />

                <p>
                  <em>
                    In summary, Badcompany transforms security from a linguistic suggestion into a deterministic
                    execution substrate, allowing organizations to deploy autonomous agents with mathematical certainty.
                  </em>
                </p>

              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

