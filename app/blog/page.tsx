'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPost {
  title: string
  date: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    title: 'vSAML: Primitives for a General Architecture of Agent Security',
    date: 'December 2025',
    slug: 'vsaml'
  }
]

function extractHeadings(markdown: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const lines = markdown.split('\n')
  
  for (const line of lines) {
    if (line.startsWith('#')) {
      const match = line.match(/^(#{1,6})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        let text = match[2].trim()
        
        // Remove markdown formatting (bold, italic, etc.)
        text = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/_/g, '')
        
        // Only include h2 and below for sidebar navigation
        if (level >= 2) {
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
          headings.push({ id, text, level })
        }
      }
    }
  }
  
  return headings
}

export default function Blog() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [markdown, setMarkdown] = useState<string>('')
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])
  const [activeHeading, setActiveHeading] = useState<string>('')

  // Read post from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const postParam = params.get('post')
    if (postParam) {
      setSelectedSlug(postParam)
    }
  }, [])

  useEffect(() => {
    if (selectedSlug) {
      // Read markdown file
      fetch(`/blog_md/${selectedSlug === 'vsaml' ? 'vSAML' : selectedSlug}.md`)
        .then(res => res.text())
        .then(text => {
          // Remove the first h1 (title) and the "By BadCompany Research" line
          const lines = text.split('\n')
          let skipNext = false
          const processedLines = lines.filter((line, index) => {
            if (skipNext) {
              skipNext = false
              return false
            }
            if (index === 0 && line.startsWith('# ')) {
              skipNext = true
              return false
            }
            if (line.trim().startsWith('**By') && line.includes('December 2025')) {
              return false
            }
            return true
          })
          const processedMarkdown = processedLines.join('\n')
          setMarkdown(processedMarkdown)
          const extractedHeadings = extractHeadings(processedMarkdown)
          setHeadings(extractedHeadings)
        })
        .catch(err => console.error('Error loading markdown:', err))
    }
  }, [selectedSlug])

  useEffect(() => {
    if (!selectedSlug || headings.length === 0) return

    // Use IntersectionObserver for more accurate tracking
    const observerOptions = {
      rootMargin: '-120px 0px -66% 0px', // Trigger when heading is near top of viewport
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that's intersecting (visible in viewport)
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
      
      if (visibleEntries.length > 0) {
        // Get the first visible heading (closest to top)
        const topEntry = visibleEntries.reduce((prev, current) => {
          return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
        })
        
        const id = topEntry.target.id
        if (id) {
          setActiveHeading(id)
        }
      } else {
        // If no heading is intersecting, find the one just above viewport
        const allEntries = entries.sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top
        })
        
        // Find the last heading that's above the viewport
        for (let i = allEntries.length - 1; i >= 0; i--) {
          if (allEntries[i].boundingClientRect.top < 120) {
            const id = allEntries[i].target.id
            if (id) {
              setActiveHeading(id)
            }
            break
          }
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all headings
    headings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    // Also handle scroll for initial state
    const handleScroll = () => {
      const headingElements = headings.map(h => {
        const el = document.getElementById(h.id)
        return el ? { element: el, id: h.id, top: el.getBoundingClientRect().top } : null
      }).filter(Boolean) as Array<{ element: HTMLElement; id: string; top: number }>
      
      if (headingElements.length === 0) return

      // Find the heading closest to the top of viewport (with offset)
      const viewportTop = 120
      let activeId = headingElements[0].id
      let minDistance = Math.abs(headingElements[0].top - viewportTop)

      for (const { element, id, top } of headingElements) {
        const distance = Math.abs(top - viewportTop)
        // Prefer headings that are above or at the viewport top
        if (top <= viewportTop && distance < minDistance) {
          minDistance = distance
          activeId = id
        }
      }

      setActiveHeading(activeId)
    }

    // Set initial state after a delay to ensure DOM is ready
    setTimeout(() => {
      handleScroll()
    }, 300)

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings, selectedSlug])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const currentPost = selectedSlug ? blogPosts.find(p => p.slug === selectedSlug) : null

  // Blog list view
  if (!selectedSlug) {
    return (
      <main className="relative min-h-screen">
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-0">
                {blogPosts.map((post, index) => (
                  <div key={post.slug}>
                    <button
                      onClick={() => setSelectedSlug(post.slug)}
                      className="w-full text-left py-6 hover:opacity-80 transition-opacity"
                    >
                      <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                      <p className="text-gray-400">{post.date}</p>
                    </button>
                    {index < blogPosts.length - 1 && (
                      <hr className="border-white/20 my-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  // Blog post view
  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex gap-12 max-w-6xl mx-auto">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-cyber-black/50 border-2 border-cyber-red/30 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-cyber-pink mb-4">Contents</h3>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      activeHeading === heading.id
                        ? 'bg-cyber-red/20 text-cyber-pink border-l-2 border-cyber-red'
                        : 'text-gray-400 hover:text-cyber-pink hover:bg-cyber-red/10'
                    }`}
                    style={{ paddingLeft: `${(heading.level - 1) * 0.75 + 0.75}rem` }}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </motion.div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Blog Post Header */}
              <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="text-gradient">{currentPost?.title}</span>
                </h1>
                <div className="flex items-center gap-4 text-gray-400 mb-8">
                  <span>{currentPost?.date}</span>
                  <span>•</span>
                  <span>BadCompany Research</span>
                </div>
              </div>

              {/* Markdown Content - render exactly like standard markdown viewer */}
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Only add IDs to headings for navigation
                    h1: ({ node, children, ...props }) => {
                      const id = extractId(children as string)
                      return <h1 id={id} {...props}>{children}</h1>
                    },
                    h2: ({ node, children, ...props }) => {
                      const id = extractId(children as string)
                      return <h2 id={id} {...props}>{children}</h2>
                    },
                    h3: ({ node, children, ...props }) => {
                      const id = extractId(children as string)
                      return <h3 id={id} {...props}>{children}</h3>
                    },
                    h4: ({ node, children, ...props }) => {
                      const id = extractId(children as string)
                      return <h4 id={id} {...props}>{children}</h4>
                    },
                    h5: ({ node, children, ...props }) => {
                      const id = extractId(children as string)
                      return <h5 id={id} {...props}>{children}</h5>
                    },
                    h6: ({ node, children, ...props }) => {
                      const id = extractId(children as string)
                      return <h6 id={id} {...props}>{children}</h6>
                    },
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </motion.div>
          </article>
        </div>
      </div>
    </main>
  )
}

function extractId(children: any): string {
  // Handle React nodes - extract text content
  let text = ''
  if (typeof children === 'string') {
    text = children
  } else if (Array.isArray(children)) {
    text = children.map((child: any) => {
      if (typeof child === 'string') return child
      if (child?.props?.children) return extractId(child.props.children)
      return ''
    }).join('')
  } else if (children?.props?.children) {
    text = extractId(children.props.children)
  }
  
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
