import Link from 'next/link'
import { involveLink, type ApplyKind } from '@/lib/data'
import { ApplyLink } from '@/components/apply-link'

export type Offer = {
  id: string
  name: string
  price: string
  spots: string
  fit: string
  gets: string[]
  shares?: string[]
}

const TONES = ['gold', 'sky', 'bronze', 'gold', 'sky'] as const

export function OfferBoard({
  railLabel,
  title,
  lead,
  applyKind,
  sibling,
  offers,
}: {
  railLabel: string
  title?: string
  lead: string
  applyKind: ApplyKind
  sibling?: { kind: ApplyKind; label: string }
  offers: Offer[]
}) {
  const isPartner = applyKind === 'partner'
  const heading = title ?? (isPartner ? 'What you get' : 'Sponsor tiers')

  return (
    <div>
      <section className="ed-dark-showcase">
        <div className="ed-container">
          <p className="ed-offer-rail">{railLabel}</p>
          <h2 className="ed-section-title">{heading}</h2>
          <p className="ed-offer-lead">{lead}</p>
          {sibling ? (
            <p className="ed-offer-sibling">
              Looking for the other path?{' '}
              <Link href={involveLink(sibling.kind).href} className="ed-inline-apply">
                {sibling.label} instead
              </Link>
            </p>
          ) : null}

          <div className="ed-card-stack">
            {offers.map((item, itemIndex) => {
              const tone = TONES[itemIndex % TONES.length]
              return (
                <article key={item.id} className={`ed-service-card ed-tone-${tone}`}>
                  <span className="ed-service-num" aria-hidden="true">
                    0{itemIndex + 1}
                  </span>
                  <div className="ed-service-copy">
                    <span className="ed-service-kicker">
                      {item.price} · {item.spots}
                    </span>
                    <div className="ed-pass-header">
                      <h3 className="ed-service-title">{item.name}</h3>
                      <span className="ed-pass-price">{item.price}</span>
                    </div>
                    <p className="ed-service-lead">{item.fit}</p>

                    <ul className="ed-service-list">
                      {item.gets.map((g) => (
                        <li key={g}>
                          <span>{g}</span>
                          <span className="ed-service-plus" aria-hidden="true">
                            +
                          </span>
                        </li>
                      ))}
                    </ul>

                    {item.shares ? (
                      <div style={{ marginTop: '1rem' }}>
                        <span className="ed-service-kicker">What You Share</span>
                        <ul className="ed-service-list">
                          {item.shares.map((s) => (
                            <li key={s}>
                              <span>{s}</span>
                              <span className="ed-service-plus" aria-hidden="true">
                                +
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="ed-service-action">
                      <ApplyLink
                        kind={applyKind}
                        query={isPartner ? undefined : `tier=${item.id}`}
                        className="ed-card-cta"
                      >
                        {isPartner ? 'Apply to Partner →' : `Apply for ${item.name} →`}
                      </ApplyLink>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
