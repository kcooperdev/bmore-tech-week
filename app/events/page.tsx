import type { Metadata } from 'next'
import Link from 'next/link'
import { CTA, EVENT, involveLink } from '@/lib/data'
import { pageSocial } from '@/lib/seo'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import { listPublishedEvents } from '@/lib/store'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { EventDirectory } from '@/components/events/event-directory'
import '../../styles.css'

export const dynamic = 'force-dynamic'

const title = 'Calendar & Schedule'
const description =
  'Explore the Baltimore Tech Week calendar. MedTech, AI Night, Creative Tech, Founders, and BTW Finale. April 26–30, 2027.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.eventsPath },
  ...pageSocial({ title, description, path: EVENT.eventsPath }),
}

export default async function EventsPage() {
  const events = await listPublishedEvents()

  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="events" />
      <PageBanner title="Schedule" kicker="April 26–30, 2027" />

      <main className="cfp-main" id="main" tabIndex={-1}>
        <section className="cfp-section">
          <p className="cfp-kicker">Five Nights</p>
          <h2 className="cfp-h2">Nightly programming</h2>
          <p className="cfp-copy">
            Doors at 5:30. Four industry nights, then BTW Finale. Rooms to be announced.
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
          <p className="cfp-kicker">Community Calendar</p>
          <h2 className="cfp-h2">Published sessions &amp; events</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <EventDirectory events={events} />
          </div>
        </section>

        <section className="cfp-section">
          <p className="cfp-kicker">Self-Service</p>
          <h2 className="cfp-h2">Put your event, talk, or company on the calendar</h2>
          <p className="cfp-copy">
            Apply to speak, partner, sponsor, or become an ambassador. You can also submit a venue to host a
            night, or join the volunteer crew. Tickets open {EVENT.opensOn}.
          </p>
          <p className="cfp-copy cfp-actions">
            <Link className="harbor-btn" href={involveLink('speak').href}>
              {CTA.callForSpeakers}
            </Link>
            <Link className="harbor-btn harbor-btn-ghost" href={involveLink('partner').href}>
              {CTA.partnerWithUs}
            </Link>
            <Link className="harbor-btn harbor-btn-ghost" href={involveLink('sponsor').href}>
              {CTA.sponsorUs}
            </Link>
            <Link className="harbor-btn harbor-btn-ghost" href={EVENT.venueSubmitPath}>
              Host a Night
            </Link>
            <Link className="harbor-btn harbor-btn-ghost" href={EVENT.volunteerSubmitPath}>
              Volunteer
            </Link>
          </p>
        </section>
      </main>

      <HarborFooter />
    </div>
  )
}
