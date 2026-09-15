'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="desktop">
      <div className="stage">
        <h1>Error</h1>
        <p>{error.message || 'Something went wrong.'}</p>
        <p>
          <button type="button" className="btn" onClick={reset}>
            Try again
          </button>
        </p>
      </div>
    </div>
  )
}
