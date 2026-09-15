import PageShell from '../../components/PageShell'

const people = [
  {
    name: 'Janos Mozer',
    role: 'CEO',
    href: 'https://www.linkedin.com/in/janos-mozer/',
    photo: '/images/profile.jpeg',
  },
  {
    name: 'Gregorio Jaca',
    role: 'Principal Engineer',
    href: 'https://www.linkedin.com/in/gregorio-jaca-3ab70a296/',
    photo: '/images/grego.jpg',
  },
  {
    name: 'Peter Tallosy',
    role: 'CTO',
    href: 'https://www.linkedin.com/in/peter-tallosy/',
    photo: '/images/petya.jpeg',
  },
]

export default function People() {
  return (
    <PageShell>
      <h1>Team</h1>
      <p className="kicker">BadCompany.</p>
      <div className="people">
        {people.map((p) => (
          <div className="person" key={p.name}>
            <a href={p.href} className="person-pic-link">
              <img src={p.photo} alt="" className="person-pic" />
            </a>
            <div>
              <div className="person-name">{p.name}</div>
              <p>
                {p.role}. <a href={p.href}>mail</a>
              </p>
            </div>
          </div>
        ))}
      </div>
      <p>
        <a href="https://cal.com/janos-mozer/30min">cal.com/janos-mozer</a>
      </p>
    </PageShell>
  )
}
