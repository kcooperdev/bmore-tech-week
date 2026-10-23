import type { Metadata } from 'next'
import { CTA, EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { VenueForm } from '@/components/forms/venue-form'
import '../../../styles.css'

const title = 'Host a Night'
const description =
  'Got a room, bar, office, gallery, or coffee shop in Baltimore for April 26–30? Submit your venue to host a session or evening event during Baltimore Tech Week.'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.venueSubmitPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.venueSubmitPath,
  },
}

export default async function SubmitVenuePage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>
}) {
  const { demo } = await searchParams
  const isDemo = demo === '1'
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="venues" />
      <PageBanner title={CTA.submitVenue} kicker="Venues & Hosts" />

      <main className="cfp-main" id="main" tabIndex={-1}>
        <section className="cfp-section">
          <p className="cfp-kicker">Submit a space</p>
          <h2 className="cfp-h2">Put a night in your room</h2>
          <p className="cfp-copy">
            Bar, office, gallery, studio, or coffee shop. Tell us what you’ve got, your capacity, and which nights
            work between April 26 and 30. We match approved talks and events directly with local venues.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <VenueForm demo={isDemo} />
          </div>
        </section>
      </main>

      <HarborFooter />
    </div>
  )
}
