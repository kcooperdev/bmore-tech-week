import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { EVENT, SITE_URL } from '@/lib/data'
import { getPublishedEvent, listPublishedEvents } from '@/lib/store'
import { formatWeekDate } from '@/lib/format'
import { PublicShell } from '@/components/public-shell'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getPublishedEvent(slug)
  if (!event) return { title: 'Event' }
  const description = `${event.name} with ${event.speakerName} at ${event.venueName}. ${formatWeekDate(event.date)} · ${event.time}.`
  return {
    title: event.name,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: `${event.name} | Baltimore Tech Week`,
      description,
      url: `/events/${event.slug}`,
    },
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params
  const event = await getPublishedEvent(slug)
  if (!event) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: `${event.date}T18:00:00-04:00`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: [`${SITE_URL}/images/hero-inner-harbor.jpg`],
    url: `${SITE_URL}/events/${event.slug}`,
    organizer: { '@type': 'Organization', name: EVENT.name, url: SITE_URL },
    location: {
      '@type': 'Place',
      name: event.venueName,
      address: event.venueAddress,
    },
    performer: { '@type': 'Person', name: event.speakerName },
  }

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-20 md:px-8 md:pt-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
          {formatWeekDate(event.date)} · {event.time}
        </p>
        <div className="hairline-gold mt-4" />
        <h1 className="mt-5 font-display text-4xl uppercase leading-[0.9] text-cream sm:text-5xl md:text-6xl text-balance">
          {event.name}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-cream/80">{event.description}</p>

        <dl className="mt-10 grid gap-5 border-t border-cream/10 pt-8 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Speaker</dt>
            <dd className="mt-1 text-base font-semibold text-cream">{event.speakerName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Venue</dt>
            <dd className="mt-1 text-base font-semibold text-cream">{event.venueName}</dd>
            <dd className="mt-1 text-cream/70">{event.venueAddress}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Neighborhood</dt>
            <dd className="mt-1 text-cream">{event.neighborhood}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Topic / format</dt>
            <dd className="mt-1 capitalize text-cream">
              {event.topic} · {event.format}
            </dd>
          </div>
        </dl>

        <Link
          href={EVENT.eventsPath}
          className="mt-10 inline-flex text-sm font-semibold text-gold"
        >
          ← All events
        </Link>
      </article>
    </PublicShell>
  )
}

export async function generateStaticParams() {
  const events = await listPublishedEvents()
  return events.map((event) => ({ slug: event.slug }))
}
