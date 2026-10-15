import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { listPublishedEvents } from '@/lib/store'
import { PublicShell, PageIntro } from '@/components/public-shell'
import { EventDirectory } from '@/components/events/event-directory'

export const dynamic = 'force-dynamic'

const title = 'Schedule'
const description =
  'The tech conference nights are still coming together. Days are coworking, April 26–30.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.eventsPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.eventsPath,
  },
}

export default async function EventsPage() {
  const events = await listPublishedEvents()

  return (
    <PublicShell>
      <PageIntro
        eyebrow="Not up yet"
        title="What’s on"
        body="The conference list lands once rooms and talks get paired. Days are coworking. You can still host, talk, or crew."
      />
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <EventDirectory events={events} />
      </div>
    </PublicShell>
  )
}
