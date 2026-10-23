import type { Metadata } from 'next'
import Link from 'next/link'
import { AUDIENCES, EVENT, VISION, involveLink } from '@/lib/data'
import { pageSocial } from '@/lib/seo'
import { CFP_WHY } from '@/lib/cfp'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import '../../styles.css'

const title = 'Why Baltimore'
const description =
  "Baltimore's first official tech conference week. Five nights of talks, workshops, and panels across the city. April 26–30, 2027."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.whyPath },
  ...pageSocial({ title, description, path: EVENT.whyPath }),
}

export default function WhyPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="why" />
      <PageBanner title="Why Baltimore" />

      {/* Cream Editorial Story Section */}
      <main id="main" tabIndex={-1}>
        <section className="ed-cream-section">
          <div className="ed-container">
            <p className="ed-eyebrow">The Heartbeat of Baltimore · April 26 to 30, 2027</p>

            <h2 className="ed-manifesto-title">
              You already do this. You take a table, someone you know walks in, and you{' '}
              <span className="ed-highlight">stay longer</span> than you meant to.
            </h2>

            <p className="ed-manifesto-sub">
              For one week, that feeling is the conference. A different industry and neighborhood each evening. People
              who already work here. Stay as late as you want.
            </p>

            <div className="ed-manifesto-cta">
              <Link className="ed-pill-btn" href={EVENT.ticketsPath}>
                Come for the Week
              </Link>
              <Link className="ed-pill-btn ed-pill-btn-outline" href={involveLink('speak').href}>
                Give a Talk
              </Link>
            </div>
          </div>
        </section>

        {/* Dark Showcase: Who It's For & Vision */}
        <section className="ed-dark-showcase">
          <div className="ed-container">
            <h2 className="ed-section-title">The City</h2>

            <div className="ed-card-stack">
              <article className="ed-service-card ed-tone-gold">
                <div className="ed-service-copy">
                  <span className="ed-service-kicker">Who should come</span>
                  <h3 className="ed-service-title">People who want a neighborhood room, not a ballroom</h3>
                  <p className="ed-service-lead">
                    Come for one night or stay for all five. The rooms change. Baltimore stays the point.
                  </p>
                  <ul className="ed-service-list">
                    {AUDIENCES.map((item) => (
                      <li key={item}>
                        <span>{item}</span>
                        <span className="ed-service-plus" aria-hidden="true">
                          +
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="ed-service-action">
                    <Link href={EVENT.ticketsPath} className="ed-card-cta">
                      Reserve Your Pass →
                    </Link>
                  </div>
                </div>
              </article>

              <article className="ed-service-card ed-tone-sky">
                <div className="ed-service-copy">
                  <span className="ed-service-kicker">Why we are building it</span>
                  <h3 className="ed-service-title">Show Baltimore as a place where the work happens</h3>
                  <p className="ed-service-lead">
                    Year one is grassroots on purpose, backed by the founders, technologists, universities, and local
                    spots that already run the city.
                  </p>
                  <ul className="ed-service-list">
                    {CFP_WHY.slice(0, 4).map((item) => (
                      <li key={item}>
                        <span>{item}</span>
                        <span className="ed-service-plus" aria-hidden="true">
                          +
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="ed-service-action">
                    <Link href={involveLink('partner').href} className="ed-card-cta">
                      Partner →
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Harbor-Blue Band: Vision Principles */}
        <section className="ed-sky-band">
          <div className="ed-container">
            <div className="ed-sky-header">
              <h2 className="ed-sky-title">
                How it
                <br />
                should feel
              </h2>
              <p className="ed-sky-copy">
                Tickets open {EVENT.opensOn}. General Admission is free. Upgrade to a $45 night VIP or the $125 week
                VIP for the express line, drinks, front row, and swag.
              </p>
            </div>

            <ul className="ed-badge-strip">
              {VISION.map((line, i) => (
                <li key={line} className="ed-hood-badge">
                  <span className="ed-hood-mark">0{i + 1}</span>
                  <span className="ed-hood-name">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <HarborFooter />
    </div>
  )
}
