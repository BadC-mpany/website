import Link from 'next/link'

const links = [
  { href: '/lilith', label: 'Product' },
  { href: '/lilith/zero', label: 'OpenSource' },
  { href: '/notes', label: 'Notes' },
  { href: '/people', label: 'Team' },
]

export default function Header() {
  return (
    <>
      <div className="top">
        <Link href="/" className="wordmark">
          <img
            src="/lilith.png"
            width={40}
            height={40}
            alt=""
            className="mark-logo"
          />
          BadCompany
        </Link>
        <ul className="nav">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="btn">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="rule" />
    </>
  )
}
