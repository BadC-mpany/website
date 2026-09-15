import type { ReactNode } from 'react'

function Mark({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <span className="mark">
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        fill="currentColor"
      >
        {children}
      </svg>
      {label}
    </span>
  )
}

export default function Marks() {
  return (
    <fieldset className="group">
      <legend>Platform</legend>
      <fieldset className="group">
        <legend>Systems</legend>
        <div className="marks">
          <Mark label="Linux">
            <rect x="3" y="3" width="10" height="10" />
          </Mark>
          <Mark label="Kubernetes">
            <polygon points="8,2 13,5.5 13,10.5 8,14 3,10.5 3,5.5" />
          </Mark>
          <Mark label="WSL">
            <rect x="2" y="2" width="5" height="5" />
            <rect x="9" y="2" width="5" height="5" />
            <rect x="2" y="9" width="5" height="5" />
            <rect x="9" y="9" width="5" height="5" />
          </Mark>
          <Mark label="Mac">
            <path d="M10.5 3.5c-1 0-1.7.6-2 .6-.4 0-1.2-.6-2-.6-1.7.1-3 1.8-3 3.6 0 2.2 1.6 4.7 3.2 4.7.5 0 .9-.4 1.7-.4s1.1.4 1.7.4c1.6 0 2.7-2.3 2.7-2.3s-1.6-.6-1.6-2.3c0-1.5 1.2-2.1 1.2-2.1S11.6 3.5 10.5 3.5z" />
          </Mark>
        </div>
      </fieldset>
      <fieldset className="group">
        <legend>Agents</legend>
        <p>
          Coding agents and <em>custom agents</em>. Lilith integrates because
          the policy engine is an interoperable protocol, not a vendor plugin.
        </p>
        <div className="marks">
          <Mark label="Cursor">
            <path d="M3.5 1.8v12.4l3.4-3.3 2.4 4.4 1.8-1-2.4-4.3H14z" />
          </Mark>
          <Mark label="Claude Code">
            <polygon points="8,1.5 9.1,6.4 14,5.2 10.2,8 14,10.8 9.1,9.6 8,14.5 6.9,9.6 2,10.8 5.8,8 2,5.2 6.9,6.4" />
          </Mark>
          <Mark label="Copilot">
            <circle cx="5.5" cy="8" r="3.2" />
            <circle cx="10.5" cy="8" r="3.2" />
          </Mark>
          <Mark label="Codex">
            <path d="M6 3 2 8l4 5 1.2-1.2L4.2 8 7.2 4.2zm4 0 4 5-4 5-1.2-1.2L11.8 8 8.8 4.2z" />
          </Mark>
          <Mark label="Gemini">
            <polygon points="8,1 9.4,6.6 15,8 9.4,9.4 8,15 6.6,9.4 1,8 6.6,6.6" />
          </Mark>
          <Mark label="Windsurf">
            <polygon points="2,11 6.5,4 11,11" />
            <polygon points="6,13 10.5,6 15,13" />
          </Mark>
          <Mark label="Custom">
            <path d="M7 3h2v4h4v2H9v4H7V9H3V7h4z" />
          </Mark>
        </div>
      </fieldset>
    </fieldset>
  )
}
