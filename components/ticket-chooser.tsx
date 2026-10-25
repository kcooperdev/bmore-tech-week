import { EVENT } from '@/lib/data'

const PASSES = [
  {
    id: 'ga-week',
    lane: 'week',
    name: 'General Admission week pass',
    badge: 'All 5 nights',
    price: '$40',
    priceNote: 'Save $35',
    audience: 'Come back all week. Same talks and the floor.',
    features: ['Access to all five nights'],
    cta: 'Get week pass ($40)',
    featured: false,
  },
  {
    id: 'week-vip',
    lane: 'week',
    name: 'Week VIP pass',
    badge: 'Best value. Save $100',
    price: '$125',
    priceNote: 'All 5 nights',
    audience: 'The cheaper way to do VIP all week: the line, drinks, and swag.',
    features: [
      'Priority check-in every night',
      '3 drink tickets through the week',
      'Tech Week t-shirt and VIP swag bag',
      'Front-row seating',
    ],
    cta: 'Get week VIP ($125)',
    featured: true,
  },
  {
    id: 'ga-night',
    lane: 'night',
    name: 'General Admission day pass',
    badge: 'One night',
    price: '$15',
    priceNote: '/ night',
    audience: 'Same talks and the floor. One night.',
    features: ['Access to that night’s talks and the floor'],
    cta: 'Get day pass ($15)',
    featured: false,
  },
  {
    id: 'day-vip',
    lane: 'night',
    name: 'Night VIP pass',
    badge: 'One-night upgrade',
    price: '$45',
    priceNote: '/ night',
    audience: 'One night, nicer check-in. Skip the line and take a drink.',
    features: [
      'Priority check-in. Skip the wait.',
      '1 drink ticket (beer, wine, or cocktail)',
      'Front-row seating and VIP swag bag',
    ],
    cta: 'Get night VIP ($45)',
    featured: false,
    highlight: true,
  },
] as const

const GIFTS = [
  {
    id: 'gift-night',
    name: 'Sponsor a night',
    price: '$15',
    note: 'One night',
    cta: 'Sponsor one night',
  },
  {
    id: 'gift-week',
    name: 'Sponsor a week',
    price: '$40',
    note: 'All 5 nights',
    cta: 'Sponsor the week',
  },
] as const

function PassCard({ item }: { item: (typeof PASSES)[number] }) {
  return (
    <article
      className={`vip-card${item.featured ? ' is-featured' : ''}${'highlight' in item && item.highlight ? ' is-upgrade' : ''}`}
    >
      <p className={`vip-badge${item.featured ? ' is-accent' : ''}`}>{item.badge}</p>
      <h3 className="vip-title">{item.name}</h3>
      <p className="vip-price">
        {item.price}
        {item.priceNote ? <span>{item.priceNote}</span> : null}
      </p>
      <p className="vip-audience">{item.audience}</p>
      <ul className="vip-features">
        {item.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <span className="vip-cta-wrap">
        <button type="button" className="ed-pill-btn vip-cta is-apply-closed" disabled>
          {item.cta}
        </button>
        <span className="apply-cta-closed-note">Opens {EVENT.opensOn}</span>
      </span>
    </article>
  )
}

export function TicketChooser() {
  const week = PASSES.filter((item) => item.lane === 'week')
  const night = PASSES.filter((item) => item.lane === 'night')

  return (
    <div id="tickets-vip">
      <section className="ed-cream-section" aria-labelledby="vip-heading">
        <div className="ed-container">
          <p className="ed-eyebrow">Tickets · April 26 to 30, 2027</p>
          <h2 id="vip-heading" className="ed-manifesto-title">
            Pick the week, or pick a <span className="ed-highlight">night</span>
          </h2>
          <p className="ed-manifesto-sub">
            General Admission is $15 a night or $40 for the week. VIP is the line, a drink, and swag. You can also pay
            for someone else’s seat. Sale opens {EVENT.opensOn}.
          </p>
        </div>
      </section>

      <section className="ed-dark-showcase" aria-label="Ticket options">
        <div className="ed-container vip-lanes">
          <div className="vip-lane">
            <p className="vip-lane-kicker">The week</p>
            <h3 className="vip-lane-title">Come more than once</h3>
            <div className="vip-grid">
              {week.map((item) => (
                <PassCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="vip-lane">
            <p className="vip-lane-kicker">One night</p>
            <h3 className="vip-lane-title">Come for a single evening</h3>
            <div className="vip-grid">
              {night.map((item) => (
                <PassCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ed-cream-section vip-gift-section" aria-labelledby="gift-heading">
        <div className="ed-container">
          <div className="vip-gift-panel">
            <div className="vip-gift-copy">
              <p className="ed-eyebrow">Get someone in the room</p>
              <h2 id="gift-heading" className="ed-manifesto-title">
                Sponsor a <span className="ed-highlight">seat</span>
              </h2>
              <p className="ed-manifesto-sub">
                Same General Admission. You pay. We give it to a student, a Per Scholas learner, or someone who asked.
                Not VIP. Just the door.
              </p>
            </div>
            <div className="vip-gift-picks">
              {GIFTS.map((item) => (
                <button key={item.id} type="button" className="vip-gift-pick is-apply-closed" disabled>
                  <span className="vip-gift-pick-note">{item.note}</span>
                  <span className="vip-gift-pick-price">{item.price}</span>
                  <span className="vip-gift-pick-cta">{item.cta}</span>
                  <span className="apply-cta-closed-note">Opens {EVENT.opensOn}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
