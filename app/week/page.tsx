import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CTA, EVENT } from '@/lib/data'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import { HarborTopbar } from '@/components/harbor-topbar'
import '../../styles.css'

const title = 'The Week'
const description =
  'Baltimore Tech Week is one week with two parts. Charm City CoWeek by day, the tech conference at night. April 26–30, 2027.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.weekPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.weekPath,
  },
}

export default function WeekPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="week" />

      <section className="cfp-hero cfp-hero-week" aria-label="The week">
        <Image
          className="cfp-hero-plate"
          src="/images/harbor-night.png"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={78}
        />
        <div className="cfp-hero-veil" />
        <div className="cfp-hero-copy">
          <div className="night-title">
            <p className="night-kicker">Day and night</p>
            <h1>
              <span>The</span>
              <span>Week</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <section className="cfp-section" id="day">
          <p className="cfp-kicker">Days</p>
          <h2 className="cfp-h2">April 26–30</h2>
          <p className="cfp-copy">
            One week, two parts. By day it’s Charm City CoWeek: a featured Baltimore coffee shop, and the shop
            changes through the week.
          </p>
          <p className="cfp-copy">
            Show up, grab a coffee, and work. Meet someone if you feel like it. You don’t have to spend the day
            networking.
          </p>
          <p className="cfp-copy" id="nights">
            At night it’s the tech conference, still Baltimore Tech Week. Stay if you want. The coworking day
            still counts if you don’t.
          </p>
          <ol className="cfp-nights">
            {PROGRAM_NIGHTS.map((night) => (
              <li key={night.iso}>
                <p className="cfp-night-meta">
                  {night.weekday} · {night.date}
                </p>
                <h3 className="cfp-h3">{night.name}</h3>
                <p className="cfp-tight">{night.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cfp-section">
          <p className="cfp-kicker">Speak</p>
          <h2 className="cfp-h2">We're looking for speakers</h2>
          <p className="cfp-copy">
            The conference needs voices. Workshops, panels, and short talks across the five nights. If you want one,
            apply.
          </p>
          <p className="cfp-copy">
            <Link className="harbor-btn" href={EVENT.speakersPath}>
              {CTA.callForSpeakers}
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}
