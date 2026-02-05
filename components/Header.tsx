'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/product', label: 'PRODUCT' },
    { href: '/blog', label: 'BLOG' },
    // { href: '/story', label: 'STORY' },
    { href: '/#team', label: 'TEAM' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cyber-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold font-mono text-cyber-red tracking-tighter">
              Bad Company
            </span>
          </Link>

          {/* Center: Navigation */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact Button */}
          <Link
            href="/#contact"
            className="text-sm font-mono font-bold bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition-colors tracking-wide"
          >
            CONTACT US
          </Link>
        </div>
      </nav>
    </header>
  )
}

