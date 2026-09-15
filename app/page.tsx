import Link from 'next/link'
import PageShell from '../components/PageShell'

export default function Home() {
  return (
    <PageShell>
      <h1>Lilith</h1>
      <p className="kicker">
        Mandatory access control for AI agents. A product of BadCompany.
      </p>

      <div className="edit">
        <p>
          Agents were built on the newest, tallest stack. More model, more
          tools, more abstraction. That is <em>playing with fire</em>.
        </p>
        <p>
          Lilith is the older idea. Its policy engine decides each tool call.
          Its kernel enforcer makes the decision <em>bind</em>. Two parts.
          Simple machinery. <em>Highest guarantee</em>.
        </p>
      </div>

      <div className="parts">
        <fieldset className="group">
          <legend>Policy engine</legend>
          <p>
            Authorization on the call itself: principal, action, resource,
            context. Expressive enough to write the real rule. Formal
            verification is built in: <em>proven before anything goes live</em>.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>Kernel enforcer</legend>
          <p>
            We <em>halt syscalls</em>, the lowest operations an OS performs.
            BPF kernel extensions, verified by the kernel before they attach.
            Userspace does not get to argue with a <em>deny</em>.
          </p>
        </fieldset>
      </div>

      <h2>Properties</h2>
      <ul className="props">
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            Fail closed: enforcer dies, the process is <em>caged</em>.
          </span>
        </li>
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            Stateful: what it already did still counts, so{' '}
            <em>a later deny can depend on an earlier call</em>. ARM locks the
            session if it keeps eating denials.
          </span>
        </li>
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            Formally verified policies: key properties like consistency are
            proven before anything goes live.
          </span>
        </li>
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            p50 under <em>20 microseconds</em> on the decide path.
          </span>
        </li>
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            Just a <em>Linux kernel</em> is needed to run it.
          </span>
        </li>
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            Works with coding agents and <em>custom agents</em>. The policy
            engine is an interoperable protocol, so Lilith integrates without
            a vendor plugin.
          </span>
        </li>
        <li>
          <input type="checkbox" checked readOnly tabIndex={-1} />
          <span>
            Rich decision logs which cannot be quietly rewritten. A rewrite
            is <em>exposed</em>.
          </span>
        </li>
      </ul>

      <p>
        <Link href="/lilith" className="btn">
          Product
        </Link>{' '}
        <Link href="/lilith/zero" className="btn">
          OpenSource
        </Link>{' '}
        <a href="https://cal.com/janos-mozer/30min" className="btn">
          Write
        </a>
      </p>
    </PageShell>
  )
}
