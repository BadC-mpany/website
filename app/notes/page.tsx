import Link from 'next/link'
import PageShell from '../../components/PageShell'
import { notes } from '../../lib/notes'

export default function Notes() {
  return (
    <PageShell>
      <h1>Notes</h1>
      <p className="kicker">Writing from BadCompany.</p>
      <ul>
        {notes.map((post) => (
          <li key={post.slug}>
            <Link href={`/notes/${post.slug}`}>{post.title}</Link>
            <div style={{ color: 'var(--mute)', fontSize: 11, marginTop: 2 }}>
              {post.date}
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
