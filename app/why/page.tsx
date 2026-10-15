import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import '../../styles.css'

const title = 'Why Baltimore'
const description =
  "Baltimore's first official tech week. Coworking in the neighborhoods by day, the conference at night. April 26–30, 2027."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.whyPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.whyPath,
  },
}

export default function WhyPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="why" />

      <section className="cfp-hero cfp-hero-week" aria-label="Why Baltimore">
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
            <h1>
              <span>Why</span>
              <span>Baltimore</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <div className="story">
          <p>
            You already do this. You take a table, someone you know walks in, and you stay longer than you meant
            to.
          </p>
          <p>
            For one week, bring the laptop and don&apos;t rush out. Work the day. When you close it, stay. The
            conference is the night.
          </p>
          <p>
            April 26–30, 2027. The first official tech week. Tickets open {EVENT.opensOn}.
          </p>
          <p>
            <Link className="harbor-btn" href={EVENT.ticketsPath}>
              Come for the week
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
