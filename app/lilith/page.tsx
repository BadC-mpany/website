import Link from 'next/link'
import PageShell from '../../components/PageShell'
import Marks from '../../components/Marks'

export default function Lilith() {
  return (
    <PageShell>
      <h1>Product</h1>
      <p className="kicker">
        How Lilith is built. Policy on the call, kernel on the syscall, a log
        that still means something.
      </p>

      <h2>How it is built</h2>
      <p className="build-path">
        <span>1 Enroll</span>
        <span className="arrow">-</span>
        <span>2 Decide</span>
        <span className="arrow">-</span>
        <span>3 Bind</span>
        <span className="arrow">-</span>
        <span>4 Seal</span>
      </p>
      <div className="parts-4">
        <fieldset className="group">
          <legend>1 Enroll</legend>
          <p>
            The agent is a process on a Linux kernel. Coding agents and
            custom agents. Enrollment is the process, not a vendor plugin.
            WSL counts. A Mac is a desk.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>2 Decide</legend>
          <p>
            Policy engine. Each tool call: principal, action, resource,
            context. An interoperable protocol, so custom agents use the same
            path. Expressive enough for the real rule. Formal verification
            is built in. <em>Proven before anything goes live</em>.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>3 Bind</legend>
          <p>
            Kernel enforcer. We <em>halt syscalls</em>. BPF extensions,
            verified by the kernel before they attach. Userspace does not get
            to argue with a <em>deny</em>. Fail closed: enforcer dies, the
            process is <em>caged</em>.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>4 Seal</legend>
          <p>
            Observability. Each decision is written to a node log sealed with
            HMAC. A Merkle tree chains the events. The root is the tip. Edit a
            past deny, verify fails. Search copies are not the seal.{' '}
            <em>Tamper evident</em>.
          </p>
        </fieldset>
      </div>

      <p>
        Two parts make the decision hold: the engine writes the rule, the
        kernel makes it <em>bind</em>. The fourth part is so the story of
        what happened cannot be quietly rewritten. Simple machinery.{' '}
        <em>Highest guarantee</em>.
      </p>

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
            <em>a later deny can depend on an earlier call</em>. ARM locks
            the session if it keeps eating denials.
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
            Observability: HMAC-sealed log, Merkle tree.{' '}
            <em>Tamper evident</em>. The node log is the seal. Copies for
            search are not.
          </span>
        </li>
      </ul>

      <Marks />

      <h2>Use cases</h2>
      <div className="parts-4 cases">
        <fieldset className="group">
          <legend>Fintech and banks</legend>
          <p>
            Banks already put agents on fraud queues, KYC, and payment ops.
            The useful work is reading the case and drafting what a human
            should do. The failure is the last mile: ACH, SWIFT, an internal
            book transfer, a CSV of every customer. Lilith allows the score
            and the draft. The send and the export are denied at the syscall,
            even if the model has already said yes. That deny is in the
            sealed log.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>Medicine</legend>
          <p>
            A hospital agent that can open one chart will try to open all of
            them. Same for PACS, claims files, the research extract. Policy
            names the patient and the action: this encounter, this study.
            Bulk export and the next MRN over are denied. If it already had
            her labs, that still counts when it reaches for the rest of the
            ward. The control is which record, on which call.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>Defense</legend>
          <p>
            Classified and restricted shops still want coding agents on the
            project tree. The model will fetch from the public internet or
            pack up a share if the prompt asks. Enrolled, the process talks
            where policy says: the internal model, the repo, a ticket system
            on the same side of the fence. Crossing a classification
            boundary is a kernel deny. Unenrolled processes do not get a
            seat. The record of the deny survives a rewrite of the chat.
          </p>
        </fieldset>
        <fieldset className="group">
          <legend>Live systems</legend>
          <p>
            Merge bots and coding agents are fine in staging. They become
            an incident when the same process holds prod credentials: the
            kubeconfig, the root CA, terraform on the money VPC. Lilith
            keeps npm test and the staging cluster. Production apply and
            the secret store stay closed. A prompt that says to fix prod
            does not open those paths. The kernel never takes that meeting.
          </p>
        </fieldset>
      </div>

      <p>
        <Link href="/" className="btn">
          Home
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
