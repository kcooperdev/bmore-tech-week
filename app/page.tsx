import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { ConnectorCtas } from '@/components/connector-ctas'
import { SiteFooter } from '@/components/site-footer'
import { StickyRsvp } from '@/components/sticky-rsvp'
import { JsonLd } from '@/components/json-ld'
import { EVENT } from '@/lib/data'
import { listPublishedEvents } from '@/lib/store'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const events = await listPublishedEvents()

  return (
    <>
      <JsonLd />
      <SiteNav hasSchedule={events.length > 0} />
      <main id="main">
        <Hero />
        <HowItWorks />
        <ConnectorCtas />
      </main>
      <SiteFooter hasSchedule={events.length > 0} />
      {EVENT.submissionsOpen ? <StickyRsvp /> : null}
    </>
  )
}
