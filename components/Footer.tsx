import Link from 'next/link'

export default function Footer() {
  return (
    <div className="foot">
      <p>
        BadCompany, 2026. Born out of{' '}
        <a href="https://growmesh.io">mesh.</a>(R)
      </p>
      <p>
        <Link href="/people">Team</Link>
        {' | '}
        <a
          href="https://github.com/BadC-mpany/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git
        </a>
      </p>
    </div>
  )
}
