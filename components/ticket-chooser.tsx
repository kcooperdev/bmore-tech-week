'use client'

import { useState } from 'react'
import { requestUpdates } from '@/components/updates-popup'

const PASSES = [
  {
    id: 'ga',
    name: 'General Admission',
    badge: 'Standard entry',
    price: 'Free',
    priceNote: '',
    audience: 'For students, developers, and anyone who wants the talks and a chance to meet people on the floor.',
    features: [
      'Access to all keynotes, panels, and venue talks',
      'Main floor networking',
      'Standard check-in entry',
    ],
    cta: 'Claim free pass',
    featured: false,
  },
  {
    id: 'day-vip',
    name: 'Single-day VIP pass',
    badge: 'Single-night upgrade',
    price: '$45',
    priceNote: '/ night',
    audience: 'If you can only make one or two nights and still want the nicer check-in.',
    features: [
      'Priority express line check-in. Skip the wait.',
      '1 complimentary drink ticket (beer, wine, or cocktail. $18 value)',
      'Reserved front-row seating near main stage speakers',
      'Official VIP swag bag with sponsor gear and tech goodies',
    ],
    scarcity: 'Limited to 35 VIP passes per night to keep the room premium.',
    cta: 'Get day VIP pass ($45)',
    featured: false,
    highlight: true,
  },
  {
    id: 'week-vip',
    name: '5-night Week VIP pass',
    badge: 'Best value. Save $100',
    price: '$125',
    priceNote: 'All 5 nights',
    audience: 'If you plan to come more than once, this is the cheaper way to do VIP all week.',
    features: [
      'Priority express line check-in every night',
      '3 complimentary drink tickets to use through the week',
      'Limited edition Tech Week t-shirt',
      'Official VIP swag bag',
      'Reserved front-row seating across all host venues',
    ],
    cta: 'Get 5-night Week VIP pass ($125)',
    featured: true,
  },
] as const

const COMPARE = [
  { feature: 'Event entry', ga: 'Single night', day: 'Single night', week: 'All 5 nights' },
  { feature: 'Check-in line', ga: 'Standard entry', day: 'Priority express line', week: 'Priority express line' },
  { feature: 'Drink tickets', ga: 'None', day: '1 ticket ($18 value)', week: '3 tickets total' },
  { feature: 'Stage seating', ga: 'GA seating', day: 'Reserved front row', week: 'Reserved front row' },
  { feature: 'VIP swag bag', ga: 'None', day: 'Included', week: 'Included' },
  { feature: 'Tech Week t-shirt', ga: 'None', day: 'None', week: 'Included' },
] as const

export function TicketChooser() {
  const [selected, setSelected] = useState<(typeof PASSES)[number]['id']>('week-vip')

  function choose(id: (typeof PASSES)[number]['id']) {
    const next = PASSES.find((item) => item.id === id) ?? PASSES[2]
    setSelected(id)
    requestUpdates(next.name)
  }

  return (
    <div id="tickets-vip">
      <section className="ed-cream-section" aria-labelledby="vip-heading">
        <div className="ed-container">
          <p className="ed-eyebrow">Tickets and VIP upgrades · April 26 to 30, 2027</p>
          <h2 id="vip-heading" className="ed-manifesto-title">
            Pick how you want to come to <span className="ed-highlight">Tech Week</span>
          </h2>
          <p className="ed-manifesto-sub">
            General Admission is free. If you want to skip the line, grab a drink, and take home some swag, that is the
            VIP upgrade.
          </p>
        </div>
      </section>

      <section className="ed-dark-showcase" aria-label="Ticket options">
        <div className="ed-container">
          <div className="vip-grid">
            {PASSES.map((item) => {
              const active = selected === item.id
              return (
                <article
                  key={item.id}
                  className={`vip-card${item.featured ? ' is-featured' : ''}${'highlight' in item && item.highlight ? ' is-upgrade' : ''}${active ? ' is-selected' : ''}`}
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
                  {'scarcity' in item && item.scarcity ? <p className="vip-scarcity">{item.scarcity}</p> : null}
                  <button
                    type="button"
                    className="ed-pill-btn vip-cta"
                    aria-pressed={active}
                    onClick={() => choose(item.id)}
                  >
                    {active ? `Selected: ${item.name}` : item.cta}
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="ed-cream-section vip-compare-section" aria-labelledby="vip-compare-heading">
        <div className="ed-container">
          <h2 id="vip-compare-heading" className="ed-section-title vip-compare-title">
            What each pass includes
          </h2>
          <div className="vip-table-wrap">
            <table className="vip-table">
              <caption className="sr-only">Feature comparison for General Admission, Single-day VIP, and Week VIP</caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">General Admission</th>
                  <th scope="col">Single-day VIP ($45)</th>
                  <th scope="col">5-night Week VIP ($125)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td>{row.ga}</td>
                    <td>{row.day}</td>
                    <td>{row.week}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="vip-logistics">
            <details>
              <summary>Venue and parking guidance</summary>
              <p>
                Tech Week events are hosted across local coworking spaces and partner venues. Specific garage
                recommendations, walking maps, and discount codes (where available) will be emailed to all ticket
                holders before each evening.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  )
}
