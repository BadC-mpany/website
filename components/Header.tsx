'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isBlueTheme, setIsBlueTheme] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Check if header overlaps with the opensource section
      const opensourceSection = document.getElementById('opensource')
      if (opensourceSection) {
        const rect = opensourceSection.getBoundingClientRect()
        const headerHeight = 80 // approximate header height
        const offset = 150 // Trigger transition slightly earlier/later

        // If the section is in view (with offset)
        // Start blue sooner (when section is approaching top)
        // End blue sooner (when section is leaving top)
        const isOverOpensource = rect.top < (headerHeight + offset) && rect.bottom > offset
        setIsBlueTheme(isOverOpensource)
      } else {
        setIsBlueTheme(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Color values for smooth transitions
  const accentColor = isBlueTheme ? '#3b82f6' : '#ff0055' // cyber-blue vs cyber-red
  const borderColorValue = isBlueTheme ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 0, 85, 0.2)'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cyber-black/80 backdrop-blur-md' : ''
        }`}
      style={{
        borderBottom: scrolled ? `1px solid ${borderColorValue}` : 'none',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span
              className="text-2xl font-bold"
              style={{
                color: accentColor,
                transition: 'color 0.5s ease-in-out'
              }}
            >
              Badcompany
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            {[
              { href: '/product', label: 'Product' },
              { href: '/blog', label: 'Blog' },
              { href: '/story', label: 'Story' },
              { href: '/#team', label: 'Team' },
              { href: '/#contact', label: 'Contact' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 transition-colors duration-500"
                style={{
                  ['--hover-color' as string]: accentColor,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

