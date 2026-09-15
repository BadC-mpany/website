import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageShell from '../../../components/PageShell'
import { MarkdownBody } from './MarkdownBody'
import { notes } from '../../../lib/notes'

export function generateStaticParams() {
  return notes.map((post) => ({ slug: post.slug }))
}

function readingTime(text: string): number {
  return Math.ceil(text.trim().split(/\s+/).length / 200)
}

function processMarkdown(raw: string): string {
  const lines = raw.split('\n')
  let skipNext = false
  return lines
    .filter((line, i) => {
      if (skipNext) {
        skipNext = false
        return false
      }
      if (i === 0 && line.startsWith('# ')) {
        skipNext = true
        return false
      }
      if (line.trim().startsWith('**By') && line.includes('December 2025')) return false
      return true
    })
    .join('\n')
}

export default function Note({ params }: { params: { slug: string } }) {
  const post = notes.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const fileName = params.slug === 'vsaml' ? 'vSAML.md' : `${params.slug}.md`
  const filePath = path.join(process.cwd(), 'content', 'notes', fileName)

  let raw = ''
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    notFound()
  }

  const markdown = processMarkdown(raw)
  const minutes = readingTime(markdown)

  return (
    <PageShell>
      <p className="kicker">
        <Link href="/notes">Notes</Link>
      </p>
      <h1>{post.title}</h1>
      <p className="kicker">
        {post.date} / {minutes} min
      </p>
      <MarkdownBody content={markdown} />
    </PageShell>
  )
}
