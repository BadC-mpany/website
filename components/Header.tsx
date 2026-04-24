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
    { href: '/story', label: 'STORY' },
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
              BadCompany
            </span>
          </Link>

          {/* Center: Navigation */}
          <div className="flex items-center space-x-2 md:space-x-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] md:text-sm font-mono text-zinc-400 hover:text-white transition-colors tracking-wide whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://github.com/BadC-mpany/lilith-zero"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-500 px-2 md:px-3 py-1 md:py-1.5 transition-colors duration-200 group"
            >
              <svg viewBox="0 0 16 16" className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current shrink-0" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="tracking-wide">Lilith Zero</span>
              <span className="text-[8px] md:text-[9px] text-zinc-600 group-hover:text-zinc-400 border border-zinc-800 group-hover:border-zinc-600 px-1 py-px transition-all font-mono">
                0.2.0
              </span>
            </a>
            <Link
              href="/#contact"
              className="text-[10px] md:text-sm font-mono font-bold bg-white text-black px-2 md:px-5 py-1 md:py-2 hover:bg-zinc-200 transition-colors duration-200 tracking-wide"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

