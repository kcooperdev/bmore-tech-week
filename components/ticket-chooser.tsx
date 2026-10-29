import { EVENT } from '@/lib/data'

const PASSES = [
  {
    id: 'ga-week',
    name: 'General Admission week pass',
    badge: 'All 5 nights',
    price: '$40',
    priceNote: 'All 5 nights',
    audience: 'Come back all week. Same talks and the floor.',
    features: ['Access to all five nights'],
    cta: 'Get week pass ($40)',
    featured: false,
  },
  {
    id: 'week-vip',
    name: 'Week VIP pass',
    badge: 'Best value',
    price: '$125',
    priceNote: 'All 5 nights',
    audience: 'VIP all week: the line, drinks, and swag.',
    features: [
      'Priority check-in every night',
      '3 drink tickets through the week',
      'Tech Week t-shirt and VIP swag bag',
      'Front-row seating',
    ],
    cta: 'Get week VIP ($125)',
    featured: true,
  },
] as const

function PassCard({ item }: { item: (typeof PASSES)[number] }) {
  return (
    <article className={`vip-card${item.featured ? ' is-featured' : ''}`}>
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
  return (
    <div id="tickets-vip">
      <section className="ed-cream-section" aria-labelledby="vip-heading">
        <div className="ed-container">
          <p className="ed-eyebrow">Tickets · April 26 to 30, 2027</p>
          <h2 id="vip-heading" className="ed-manifesto-title">
            One pass for the <span className="ed-highlight">week</span>
          </h2>
          <p className="ed-manifesto-sub">
            General Admission is $40 for all five nights. VIP is $125 if you want the line, a drink, and swag. You can
            also pay for someone else’s week. Sale opens {EVENT.opensOn}.
          </p>
        </div>
      </section>

      <section className="ed-dark-showcase" aria-label="Ticket options">
        <div className="ed-container">
          <div className="vip-grid">
            {PASSES.map((item) => (
              <PassCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="ed-cream-section vip-gift-section" aria-labelledby="gift-heading">
        <div className="ed-container">
          <div className="vip-gift-panel">
            <div className="vip-gift-copy">
              <p className="ed-eyebrow">Get someone in the room</p>
              <h2 id="gift-heading" className="ed-manifesto-title">
                Sponsor a <span className="ed-highlight">week</span>
              </h2>
              <p className="ed-manifesto-sub">
                Same General Admission week pass. You pay. We give it to a student, a professional, or someone who asked
                to be in the room. Not VIP. Just the door.
              </p>
            </div>
            <div className="vip-gift-picks">
              <button type="button" className="vip-gift-pick is-apply-closed" disabled>
                <span className="vip-gift-pick-note">All 5 nights</span>
                <span className="vip-gift-pick-price">$40</span>
                <span className="vip-gift-pick-cta">Sponsor the week</span>
                <span className="apply-cta-closed-note">Opens {EVENT.opensOn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
