import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CTA, EVENT } from '@/lib/data'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import { HarborTopbar } from '@/components/harbor-topbar'
import '../../styles.css'

const title = 'The Week'
const description =
  'Baltimore Tech Week 2027 is five nights in local restaurants, coworking spaces, and neighborhood rooms. April 26–30.'

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
            <p className="night-kicker">Night Edition</p>
            <h1>
              <span>The</span>
              <span>Week</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <section className="cfp-section">
          <p className="cfp-kicker">Nights</p>
          <h2 className="cfp-h2">April 26–30</h2>
          <p className="cfp-copy">
            Five nights of talks and workshops in local restaurants, coworking spaces, and neighborhood rooms — a
            festival, not a conference.
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
            About 12 sessions over the five nights. Workshops, panels, and shorter talks. If you want to do one,
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
