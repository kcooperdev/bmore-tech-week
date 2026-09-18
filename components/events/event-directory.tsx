'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ComingSoonButton } from '@/components/coming-soon'
import { CTA, EVENT, NEIGHBORHOODS, TOPICS, WEEK_DATES } from '@/lib/data'
import type { PublicEvent } from '@/lib/models'
import { EventCard } from '@/components/cards/event-card'

export function EventDirectory({ events }: { events: PublicEvent[] }) {
  const [date, setDate] = useState('all')
  const [neighborhood, setNeighborhood] = useState('all')
  const [topic, setTopic] = useState('all')

  const filtered = useMemo(() => {
    return events.filter((event) => {
      if (date !== 'all' && event.date !== date) return false
      if (neighborhood !== 'all' && event.neighborhood !== neighborhood) return false
      if (topic !== 'all' && event.topic !== topic) return false
      return true
    })
  }, [events, date, neighborhood, topic])

  const selectClass = 'ea-input min-h-11'

  if (events.length === 0) {
    return (
      <div className="panel px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="font-display text-3xl uppercase text-cream sm:text-4xl">Tickets coming soon</p>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cream/70">
          {EVENT.submissionsOpen
            ? 'The schedule isn’t up yet. Help build the week first. Host, talk, or crew.'
            : 'The schedule isn’t up yet. Host, talk, and crew signups are coming soon.'}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {EVENT.submissionsOpen ? (
            <>
              <Link href={EVENT.venueSubmitPath} className="btn-cta-outline w-full sm:w-auto">
                {CTA.submitVenue}
              </Link>
              <Link href={EVENT.speakerSubmitPath} className="btn-cta-secondary w-full sm:w-auto">
                {CTA.submitTalk}
              </Link>
              <Link href={EVENT.volunteerSubmitPath} className="btn-cta-outline w-full sm:w-auto">
                {CTA.submitVolunteer}
              </Link>
            </>
          ) : (
            <ComingSoonButton />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-cream">Date</span>
          <select className={selectClass} value={date} onChange={(e) => setDate(e.target.value)}>
            <option value="all">All nights</option>
            {WEEK_DATES.map((row) => (
              <option key={row.iso} value={row.iso}>
                {row.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-cream">Neighborhood</span>
          <select
            className={selectClass}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          >
            <option value="all">All neighborhoods</option>
            {NEIGHBORHOODS.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-cream">Topic</span>
          <select className={selectClass} value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="all">All topics</option>
            {TOPICS.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-cream/70">Nothing for those filters yet. Try another night or neighborhood.</p>
      ) : (
        <div className="mt-8 grid gap-px bg-cream/12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
