import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PublicEvent } from '@/lib/models'
import { formatWeekDate } from '@/lib/format'
import { cn } from '@/lib/utils'

export function EventCard({
  event,
  className,
}: {
  event: PublicEvent
  className?: string
}) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col bg-card p-5 transition-colors hover:bg-purple/40 sm:p-6',
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
        {formatWeekDate(event.date, 'short')} · {event.time}
      </p>
      <h3 className="mt-2 font-display text-2xl uppercase leading-[0.95] tracking-wide text-cream text-balance">
        {event.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-cream/75">{event.description}</p>
      <dl className="mt-4 grid gap-1 text-sm text-cream/80">
        <div>
          <dt className="sr-only">Venue</dt>
          <dd>{event.venueName}</dd>
        </div>
        <div>
          <dt className="sr-only">Speaker</dt>
          <dd>{event.speakerName}</dd>
        </div>
        <div className="text-muted-foreground">
          {event.neighborhood} · {event.topic} · {event.format}
        </div>
      </dl>
      <Link
        href={`/events/${event.slug}`}
        aria-label={`${event.name} details`}
        className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold"
      >
        Event details
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        <span className="absolute inset-0" aria-hidden />
      </Link>
    </article>
  )
}
