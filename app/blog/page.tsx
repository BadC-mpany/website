import Link from 'next/link'
import Header from '../../components/Header'

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
  Security:    'text-cyber-red',
  Product:     'text-emerald-400',
  Research:    'text-zinc-500',
}

export default function Blog() {
  return (
    <main className="min-h-screen bg-cyber-black">
      <Header />
      <div className="px-6 pt-32 pb-24">
        <div className="max-w-[680px] mx-auto">

          <div className="mb-14">
            <p className="font-mono text-xs text-cyber-red tracking-widest uppercase mb-2">Writing</p>
            <h1 className="text-3xl font-bold text-white">Blog</h1>
          </div>

          <div className="divide-y divide-zinc-900">
            {blogPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-7 group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-white group-hover:text-zinc-300 transition-colors leading-snug mb-2">
                      {post.title}
                    </h2>
                    <p className="font-mono text-xs text-zinc-600">{post.date}</p>
                  </div>
                  <span className={`shrink-0 font-mono text-[10px] font-bold tracking-widest mt-0.5 ${tagColors[post.tag] ?? 'text-zinc-500'}`}>
                    {post.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </main>
  )
}
