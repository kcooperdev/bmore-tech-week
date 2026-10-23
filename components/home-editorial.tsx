import Link from 'next/link'
import { CTA, EVENT, STATS, involveLink, isApplyOpenNow, type ApplyKind } from '@/lib/data'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import { TicketChooser } from '@/components/ticket-chooser'

const TRACK_CARDS = [
  {
    id: 'speak',
    tone: 'gold',
    num: '01',
    badge: isApplyOpenNow() ? `Closes ${EVENT.speakerDeadline}` : `Opens ${EVENT.opensOn}`,
    title: 'Give a Talk',
    lead: 'If you have something to share, we want you in a room. First-time speakers are welcome.',
    meta: 'Workshop · Panel · Tech Talk',
    bullets: [
      'Share a skill, a story from the work, or a point of view',
      'Workshop, panel, or a short tech talk. Whatever fits how you talk',
      `Deadline ${EVENT.speakerDeadline}. We read every one.`,
    ],
    kind: 'speak' as ApplyKind,
    cta: CTA.submitTalk,
  },
  {
    id: 'partner',
    tone: 'sky',
    num: '02',
    badge: isApplyOpenNow() ? 'Free · Open to groups' : `Opens ${EVENT.opensOn}`,
    title: 'Partner',
    lead: 'If you already gather people in Baltimore, bring them with you. Partnership is free for community groups.',
    meta: 'Meetups · Schools · Communities',
    bullets: [
      'Meetups, schools, accelerators, and student groups',
      'We list you and send a link so you can see who came',
      'No fee. You already have the circle.',
    ],
    kind: 'partner' as ApplyKind,
    cta: CTA.partnerWithUs,
  },
  {
    id: 'sponsor',
    tone: 'bronze',
    num: '03',
    badge: isApplyOpenNow() ? '$500 to $10,000' : `Opens ${EVENT.opensOn}`,
    title: 'Sponsor',
    lead: 'Sponsors get a table people can walk up to, not a logo buried on a wall. Tiers from $500 to $10,000.',
    meta: 'Five tiers · Limited tables',
    bullets: [
      'Meet talent, founders, and operators after 5:30',
      'A 20-minute intro first. Nothing to pay today',
      'Only so many tables. Year one is small on purpose.',
    ],
    kind: 'sponsor' as ApplyKind,
    cta: CTA.sponsorUs,
  },
  {
    id: 'ambassador',
    tone: 'violet',
    num: '04',
    badge: isApplyOpenNow() ? 'Get the word out' : `Opens ${EVENT.opensOn}`,
    title: 'Ambassador',
    lead: 'Tell people you already know. A class, a group chat, a workplace. That is how rooms fill.',
    meta: 'Friends · Classrooms · Rooms you already have',
    bullets: [
      'You do not need a following. You need a circle',
      'Share the night, the time, and the ticket link',
      'No booth. No quota. Just a real voice.',
    ],
    kind: 'ambassador' as ApplyKind,
    cta: CTA.beAmbassador,
  },
] as const

export function HomeEditorial() {
  return (
    <div className="editorial-flow">
      {/* 1. Cream Editorial Manifesto Block (Rebel Riot / Skillex inspired) */}
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

      {/* 2. Oversized Display Header + Overlapping Rounded Cards (Rebel Riot "SERVICES" inspired) */}
      <section className="ed-dark-showcase" id="get-involved" aria-labelledby="ed-involved-heading">
        <div className="ed-container">
          <div className="ed-involve-head">
            <h2 id="ed-involved-heading" className="ed-section-title">
              Get Involved
            </h2>
            <p className="ed-involve-sub">
              Four ways to help build the week. Applications open {EVENT.opensOn}. Pick the one that fits how you
              move through the city.
            </p>
          </div>

          <div className="ed-involve-grid">
            {TRACK_CARDS.map((card) => (
              <Link
                key={card.id}
                href={involveLink(card.kind).href}
                className={`ed-involve-card ed-involve-${card.tone}`}
              >
                <span className="ed-involve-num" aria-hidden="true">
                  {card.num}
                </span>
                <span className="ed-involve-badge">{card.badge}</span>
                <h3 className="ed-involve-title">{card.title}</h3>
                <p className="ed-involve-lead">{card.lead}</p>
                <p className="ed-involve-meta">{card.meta}</p>
                <ul className="ed-involve-list">
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <span className="ed-involve-cta">{card.cta}</span>
              </Link>
            ))}
          </div>
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
