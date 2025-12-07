import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Badcompany - AI Security',
  description: 'Breaking the rules to protect your AI systems',
  icons: {
    icon: '/images/badcompany_logo_2.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EV66MNDL09"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EV66MNDL09');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <Script
          id="scroll-offset-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function handleAnchorScroll() {
                  const hash = window.location.hash;
                  if (hash) {
                    const element = document.querySelector(hash);
                    if (element) {
                      setTimeout(() => {
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }, 100);
                    }
                  }
                }
                
                // Handle on page load
                if (window.location.hash) {
                  handleAnchorScroll();
                }
                
                // Handle hash changes
                window.addEventListener('hashchange', handleAnchorScroll);
                
                // Handle clicks on anchor links
                document.addEventListener('click', function(e) {
                  const target = e.target.closest('a[href^="#"]');
                  if (target && target.getAttribute('href') !== '#') {
                    const hash = target.getAttribute('href');
                    if (hash.startsWith('#')) {
                      const element = document.querySelector(hash);
                      if (element) {
                        e.preventDefault();
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        // Update URL without triggering scroll
                        window.history.pushState(null, '', hash);
                      }
                    }
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}

