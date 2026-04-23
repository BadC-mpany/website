'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-4">Error</p>
        <p className="font-mono text-sm text-zinc-400 mb-8">{error.message || 'Something went wrong.'}</p>
        <button
          onClick={reset}
          className="font-mono text-xs text-zinc-500 hover:text-white transition-colors tracking-widest"
        >
          TRY AGAIN →
        </button>
      </div>
    </div>
  )
}
