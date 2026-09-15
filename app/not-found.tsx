import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="desktop">
      <div className="stage">
        <h1>404</h1>
        <p>Nothing here.</p>
        <p>
          <Link href="/" className="btn">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}
