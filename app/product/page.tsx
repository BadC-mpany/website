'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '../../components/Header'

export default function Product() {
  const [markdown, setMarkdown] = useState<string>('')

  useEffect(() => {
    fetch('/tech_doc/doc.md')
      .then(res => res.text())
      .then(text => {
        // Transform HTML images to Markdown images and fix paths
        // Matches: <div align="center"> <img src="..." alt="..."> </div>
        let processedText = text.replace(
          /<div align="center">\s*<img src="([^"]+)" alt="([^"]+)">\s*<\/div>(?:\s*<br\s*\/?>)?/g,
          '![$2](/tech_doc/$1)'
        )

        // Also handle potential standalone invalid HTML img tags if any, or just failover
        // The regex above handles the specific format in the doc.md file.

        setMarkdown(processedText)
      })
      .catch(err => console.error('Error loading product doc:', err))
  }, [])

  return (
    <main className="relative min-h-screen">
      <Header />
      <div className="relative z-10">

        <section className="min-h-screen pt-32 px-6 pb-20 font-sans">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Content using markdown-body for consistent typography */}
              <div className="markdown-body font-sans">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: (props: any) => (
                      <img
                        {...props}
                        className="max-w-full h-auto mx-auto block rounded-lg my-8"
                        style={{ maxHeight: '600px' }}
                      />
                    ),
                    // Ensure headers have proper anchors/styles if needed, currently reusing global .markdown-body styles
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

