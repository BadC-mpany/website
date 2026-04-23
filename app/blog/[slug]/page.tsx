import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/Header'
import { MarkdownBody } from './MarkdownBody'

const blogPosts = [
  {
    title: 'Why We Built on the Linux Kernel: BPF-LSM Enforcement for AI Agents',
    date: 'March 2026',
    slug: 'bpf-lsm-kernel',
    tag: 'Security',
  },
  {
    title: 'Prompt Injection Is the Right Problem to Solve',
    date: 'March 2026',
    slug: 'taint-propagation',
    tag: 'Security',
  },
  {
    title: 'We built deterministic agent security at ms scale: Lilith Zero',
    date: 'February 2026',
    slug: 'lilith-zero',
    tag: 'Product',
  },
  {
    title: 'Agency Without Assurance: The Security Risks of OpenClaw',
    date: 'February 2026',
    slug: 'clawdbot',
    tag: 'Research',
  },
  {
    title: 'vSAML: Primitives for a General Architecture of Agent Security',
    date: 'December 2025',
    slug: 'vsaml',
    tag: 'Research',
  },
]

const tagColors: Record<string, string> = {
  Engineering: 'text-blue-400',
  Security:    'text-cyber-red',
  Product:     'text-emerald-400',
  Research:    'text-zinc-400',
}

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

function readingTime(text: string): number {
  return Math.ceil(text.trim().split(/\s+/).length / 200)
}

function processMarkdown(raw: string): string {
  const lines = raw.split('\n')
  let skipNext = false
  return lines.filter((line, i) => {
    if (skipNext) { skipNext = false; return false }
    if (i === 0 && line.startsWith('# ')) { skipNext = true; return false }
    if (line.trim().startsWith('**By') && line.includes('December 2025')) return false
    return true
  }).join('\n')
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const fileName = params.slug === 'vsaml' ? 'vSAML.md' : `${params.slug}.md`
  const filePath = path.join(process.cwd(), 'public', 'blog_md', fileName)

  let raw = ''
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    notFound()
  }

  const markdown = processMarkdown(raw)
  const minutes = readingTime(markdown)

  return (
    <main className="min-h-screen bg-cyber-black">
      <Header />
      <div className="px-6 pt-32 pb-40">
        <div className="max-w-[720px] mx-auto">

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors mb-14 tracking-widest"
          >
            <span>←</span>
            <span>BLOG</span>
          </Link>

          <div className="mb-3">
            <span className={`font-mono text-[10px] font-bold tracking-widest uppercase ${tagColors[post!.tag] ?? 'text-zinc-500'}`}>
              {post!.tag}
            </span>
          </div>

          <h1 className="text-3xl md:text-[2.6rem] font-bold text-white leading-[1.15] tracking-tight mb-8">
            {post!.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-zinc-600 mb-14 pb-14 border-b border-zinc-900">
            <span>BadCompany Research</span>
            <span aria-hidden>·</span>
            <span>{post!.date}</span>
            <span aria-hidden>·</span>
            <span>{minutes} min read</span>
          </div>

          <MarkdownBody content={markdown} />

        </div>
      </div>
    </main>
  )
}
