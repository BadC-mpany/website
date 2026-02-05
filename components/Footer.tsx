export default function Footer() {
  return (
    <footer className="bg-cyber-black border-t border-zinc-800 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold font-mono text-white tracking-tighter block mb-2">
              Bad Company
            </span>
            <p className="text-gray-500 font-mono text-sm">
              Runtime Defense for Autonomous AI Agents.
            </p>
          </div>

          <div className="flex items-center gap-8">
            {/* Simple footer links or social icons could go here */}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-mono">
          <p>&copy; {new Date().getFullYear()} Bad Company Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

