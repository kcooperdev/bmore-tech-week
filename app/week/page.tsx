import type { Metadata } from 'next'
import Link from 'next/link'
import { CTA, EVENT, HOW_IT_WORKS, involveLink } from '@/lib/data'
import { pageSocial } from '@/lib/seo'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import '../../styles.css'

const title = 'The Week'
const description =
  'Five nights, five industries: MedTech at the BioPark, Creative Tech in Station North, Hardware and Makerspace in Hampden, Founders at the Harbor, and a citywide finale. April 26–30, 2027.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.weekPath },
  ...pageSocial({ title, description, path: EVENT.weekPath }),
}

const NIGHT_TONES = ['gold', 'sky', 'bronze', 'gold', 'sky'] as const

export default function WeekPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="week" />
      <PageBanner title="The Week" kicker="Five nights" />

      {/* Cream Editorial Block: How the Week Works */}
      <section className="ed-cream-section" id="nights-intro">
        <div className="ed-container">
          <p className="ed-eyebrow">April 26 to 30, 2027 · 5:30–10PM</p>
          <h2 className="ed-manifesto-title">
            Five nights. Five industries. Across <span className="ed-highlight">Baltimore</span>.
          </h2>
          <p className="ed-manifesto-sub">
            Monday is MedTech at the BioPark. Tuesday is creative tech in Station North. Wednesday is hardware and
            makerspace on The Avenue. Thursday is founders at the Harbor. Friday is a citywide finale. Doors at 5:30.
            One night still counts.
          </p>

          <div className="ed-steps-grid">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="ed-step-card">
                <span className="ed-step-num">{item.step}</span>
                <h3 className="ed-step-title">{item.title}</h3>
                <p className="ed-step-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giant "NIGHTS" Display Header + Stacked Rounded Cards */}
      <main className="ed-dark-showcase" id="main" tabIndex={-1}>
        <div className="ed-container" id="nights">
          <h2 className="ed-section-title">The program</h2>

          <div className="ed-card-stack">
            {PROGRAM_NIGHTS.map((night, idx) => {
              const tone = NIGHT_TONES[idx % NIGHT_TONES.length]
              return (
                <article key={night.iso} className={`ed-service-card ed-tone-${tone}`}>
                  <span className="ed-service-num" aria-hidden="true">
                    0{idx + 1}
                  </span>
                  <div className="ed-service-copy">
                    <span className="ed-service-kicker">
                      Night 0{idx + 1} · {night.weekday}, {night.date} · {night.neighborhood} · {EVENT.nightWindow}
                    </span>
                    <h3 className="ed-service-title">{night.name}</h3>
                    <p className="ed-service-lead">{night.body}</p>
                    <ul className="ed-service-list">
                      {night.activities.map((item) => (
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
                        Claim Pass for {night.weekday} →
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </main>

      {/* Harbor-Blue Band: Build the Week */}
      <section className="ed-sky-band">
        <div className="ed-container">
          <div className="ed-sky-header">
            <h2 className="ed-sky-title">
              Help build
              <br />
              the week
            </h2>
            <p className="ed-sky-copy">
              We need speakers from the city, community groups that already gather people, and companies willing to
              back the rooms. If that sounds like you, start here.
            </p>
          </div>
          <div className="ed-manifesto-cta" style={{ justifyContent: 'flex-start', marginTop: '2rem' }}>
            <Link className="ed-pill-btn" href={involveLink('speak').href}>
              {CTA.callForSpeakers}
            </Link>
            <Link className="ed-pill-btn ed-pill-btn-outline" href={involveLink('partner').href}>
              {CTA.partnerWithUs}
            </Link>
            <Link className="ed-pill-btn ed-pill-btn-outline" href={involveLink('sponsor').href}>
              {CTA.sponsorUs}
            </Link>
          </div>
        </div>
      </section>

      <HarborFooter />
    </div>
  )
}
