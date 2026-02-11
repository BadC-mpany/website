import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-cyber-black border-t border-zinc-800 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold font-mono text-white tracking-tighter block md:inline md:mr-4">
              Bad Company
            </span>
            <p className="text-gray-500 font-mono text-sm md:inline">
              Runtime Defense for Autonomous AI Agents.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-zinc-600 font-mono whitespace-nowrap">
            <p>&copy; {new Date().getFullYear()} Bad Company Inc. All rights reserved.</p>
            <a
              href="https://github.com/BadC-mpany/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

