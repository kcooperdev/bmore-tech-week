import Link from 'next/link'
import { EVENT, STATS, involveLink, isApplyOpenNow, type ApplyKind } from '@/lib/data'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import { TicketChooser } from '@/components/ticket-chooser'

const TRACK_ROWS = [
  {
    id: 'speak',
    title: 'Give a talk',
    note: isApplyOpenNow() ? `Apply by ${EVENT.speakerDeadline}` : `Opens ${EVENT.opensOn}`,
    lead: 'Share what you’re building, working on, or learning. First-time speakers welcome.',
    kind: 'speak' as ApplyKind,
  },
  {
    id: 'partner',
    title: 'Partner',
    note: 'Free to participate',
    lead: 'Bring your community to the conversation. Help shape a session, co-host an event, or connect your members.',
    kind: 'partner' as ApplyKind,
  },
  {
    id: 'sponsor',
    title: 'Sponsor',
    note: '$500 to $10,000',
    lead: 'Put your business in the room. Meet attendees, showcase your work, and support the experience.',
    kind: 'sponsor' as ApplyKind,
  },
  {
    id: 'ambassador',
    title: 'Become an ambassador',
    note: 'Help get the word out',
    lead: 'Share events with your network and introduce more people to the community.',
    kind: 'ambassador' as ApplyKind,
  },
] as const

export function HomeEditorial() {
  return (
    <div className="editorial-flow">
      <section className="ed-cream-section" aria-labelledby="ed-manifesto-heading">
        <div className="ed-container">
          <p className="ed-eyebrow">April 26 to 30, 2027 · Baltimore, MD</p>

          <h2 id="ed-manifesto-heading" className="ed-manifesto-title">
            Five nights. Five industries. Across <span className="ed-highlight">Baltimore</span>.
          </h2>

          <p className="ed-manifesto-sub">
            Each evening is a different neighborhood and a different industry. Doors open at 5:30. Come for one night,
            or come back the next.
          </p>

          <div className="ed-manifesto-cta">
            <Link href={EVENT.ticketsPath} className="ed-pill-btn">
              Get Tickets · Starting at $0
            </Link>
            <Link href={EVENT.weekPath} className="ed-pill-btn ed-pill-btn-outline">
              Explore The Week
            </Link>
          </div>

          <dl className="ed-stats-row">
            {STATS.map((stat) => (
              <div key={stat.label} className="ed-stat-cell">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ed-dark-showcase" id="get-involved" aria-labelledby="ed-involved-heading">
        <div className="ed-container">
          <div className="ed-involve-head">
            <h2 id="ed-involved-heading" className="ed-section-title">
              Get involved
            </h2>
            <p className="ed-involve-sub">
              Applications are open. Tickets wait until {EVENT.opensOn}.
            </p>
          </div>

          <ul className="ed-involve-list">
            {TRACK_ROWS.map((row) => (
              <li key={row.id}>
                <Link href={involveLink(row.kind).href} className="ed-involve-row">
                  <div className="ed-involve-line">
                    <h3 className="ed-involve-title">{row.title}</h3>
                    <span className="ed-involve-note">{row.note}</span>
                  </div>
                  <p className="ed-involve-lead">{row.lead}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ed-nights-strip" aria-labelledby="ed-nights-heading">
        <div className="ed-container">
          <div className="ed-nights-header">
            <div>
              <p className="cfp-kicker">5:30–10PM</p>
              <h2 id="ed-nights-heading" className="ed-nights-title">
                The nights
              </h2>
            </div>
            <Link href={EVENT.weekPath} className="ed-pill-btn ed-pill-btn-outline">
              See the week
            </Link>
          </div>

          <ol className="ed-nights-grid">
            {PROGRAM_NIGHTS.map((night, idx) => (
              <li key={night.iso}>
                <Link href={`${EVENT.weekPath}#nights`} className="ed-night-card">
                  <span className="ed-night-num">0{idx + 1}</span>
                  <div className="ed-night-copy">
                    <p className="ed-night-meta">{night.weekday.slice(0, 3)}</p>
                    <h3 className="ed-night-name">{night.short}</h3>
                    <p className="ed-night-place">{night.neighborhood}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TicketChooser />
    </div>
  )
}
