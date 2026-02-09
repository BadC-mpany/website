'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '../../components/Header'
import MermaidDiagram from '../../components/MermaidDiagram'

export default function Product() {
  const [markdown, setMarkdown] = useState<string>('')
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeHeading, setActiveHeading] = useState<string>('')

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  useEffect(() => {
    fetch('/tech_doc/doc.md')
      .then(res => res.text())
      .then(text => {
        let processedText = text.replace(
          /<div align="center">\s*<img src="([^"]+)" alt="([^"]+)">\s*<\/div>(?:\s*<br\s*\/?>)?/g,
          '![$2](/tech_doc/$1)'
        )
        setMarkdown(processedText)

        // Extract headings
        const lines = processedText.split('\n')
        const extractedHeadings = []
        for (const line of lines) {
          const match = line.match(/^(#{1,3})\s+(.+)$/)
          if (match) {
            // Remove markdown formatting (bold/italic markers)
            let cleanText = match[2].replace(/\*\*\*/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/_/g, '')
            extractedHeadings.push({
              level: match[1].length,
              text: cleanText,
              id: slugify(cleanText)
            })
          }
        }
        setHeadings(extractedHeadings)
      })
      .catch(err => console.error('Error loading product doc:', err))
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const headingElements = headings.map(h => {
        const el = document.getElementById(h.id)
        return el ? { id: h.id, top: el.getBoundingClientRect().top } : null
      }).filter(Boolean) as Array<{ id: string; top: number }>

      if (headingElements.length === 0) return

      // Find the heading closest to the top of viewport
      const viewportTop = 120
      let activeId = headingElements[0].id

      for (const { id, top } of headingElements) {
        if (top <= viewportTop) {
          activeId = id
        }
      }

      setActiveHeading(activeId)
    }

    // Set initial state after delay
    setTimeout(handleScroll, 300)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  const HeadingRenderer = ({ level, children }: { level: number, children: React.ReactNode }) => {
    const text = extractText(children)
    const id = slugify(text)
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    return <Tag id={id}>{children}</Tag>
  }

  // Helper to extract text from React children
  const extractText = (children: any): string => {
    if (typeof children === 'string') return children
    if (Array.isArray(children)) return children.map(extractText).join('')
    if (children?.props?.children) return extractText(children.props.children)
    return ''
  }

  const MermaidFetcher = ({ src, alt }: { src: string, alt: string }) => {
    const [chart, setChart] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
      fetch(src)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load diagram')
          return res.text()
        })
        .then(setChart)
        .catch(err => {
          console.error(err)
          setError(true)
        })
    }, [src])

    if (error) return <div className="text-red-500">Failed to load diagram: {alt}</div>
    if (!chart) return <div className="h-24 w-full animate-pulse bg-white/5 rounded-lg border border-white/10 my-8" />

    return <MermaidDiagram chart={chart} />
  }

  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="relative z-10 pt-32 px-6 pb-[50vh] font-sans">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Table of Contents - Sticky Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <div className="sticky top-32">
                <h4 className="text-white font-bold mb-6 font-mono border-b border-zinc-800 pb-2">CONTENTS</h4>
                <ul className="space-y-3">
                  {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}>
                      <a
                        href={`#${heading.id}`}
                        className={`text-sm block font-mono transition-colors ${activeHeading === heading.id
                          ? 'text-white font-bold'
                          : 'text-zinc-500 hover:text-white'
                          }`}
                        dangerouslySetInnerHTML={{ __html: heading.text.replace(/Lilith/g, 'Lilith') }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-3xl"
            >
              <div className="markdown-body font-sans">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: (props: any) => {
                      if (props.src?.endsWith('.mmd')) {
                        return <MermaidFetcher src={props.src} alt={props.alt} />
                      }
                      return (
                        <img
                          {...props}
                          className="max-w-full h-auto mx-auto block rounded-lg my-8"
                          style={{ maxHeight: '600px' }}
                        />
                      )
                    },
                    h1: ({ children }) => <HeadingRenderer level={1}>{children}</HeadingRenderer>,
                    h2: ({ children }) => <HeadingRenderer level={2}>{children}</HeadingRenderer>,
                    h3: ({ children }) => <HeadingRenderer level={3}>{children}</HeadingRenderer>,
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

