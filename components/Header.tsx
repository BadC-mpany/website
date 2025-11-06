'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cyber-black/80 backdrop-blur-md border-b border-cyber-red/20' : ''
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/badcompany_logo1.jpg"
                alt="Badcompany Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-gradient">Badcompany</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              href="#about" 
              className="text-gray-300 hover:text-cyber-red transition-colors"
            >
              About
            </Link>
            <Link 
              href="#team" 
              className="text-gray-300 hover:text-cyber-red transition-colors"
            >
              Team
            </Link>
            <Link 
              href="#blog" 
              className="text-gray-300 hover:text-cyber-red transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

