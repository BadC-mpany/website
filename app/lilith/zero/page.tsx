import Link from 'next/link'
import PageShell from '../../../components/PageShell'

export default function LilithZero() {
  return (
    <PageShell>
      <h1>OpenSource</h1>
      <p className="kicker">Lilith Zero. Userspace SDK. Apache 2.0. No kernel.</p>
      <div className="edit">
        <p>
          The policy engine without the kernel enforcer. Use it where a kernel
          seat is not possible.
        </p>
      </div>
      <p>
        <code>uv add lilith-zero</code>
      </p>
      <p>
        <a href="https://github.com/BadC-mpany/lilith-zero" className="btn">
          GitHub
        </a>{' '}
        <Link href="/lilith" className="btn">
          Product
        </Link>
      </p>
    </PageShell>
  )
}
