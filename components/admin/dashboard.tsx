'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TIME_SLOTS } from '@/lib/data'
import { formatCost, formatWeekDate } from '@/lib/format'
import { rankVenuesForSpeaker } from '@/lib/matching'
import type { EventRecord, Speaker, Venue, Volunteer } from '@/lib/models'

type Tab = 'match' | 'venues' | 'speakers' | 'volunteers' | 'events'

type Payload = {
  venues: Venue[]
  speakers: Speaker[]
  events: EventRecord[]
  volunteers: Volunteer[]
}

export function AdminDashboard() {
  const router = useRouter()
  const [data, setData] = useState<Payload | null>(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('match')
  const [speakerId, setSpeakerId] = useState<string | null>(null)
  const [venueId, setVenueId] = useState<string | null>(null)
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState<string>(TIME_SLOTS[1])
  const [eventDescription, setEventDescription] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/data')
    if (res.status === 401) {
      router.replace('/admin/login')
      return
    }
    const json = (await res.json()) as Payload & { error?: string }
    if (!res.ok) throw new Error(json.error || 'Could not load')
    setData(json)
  }, [router])

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : 'Could not load'))
  }, [load])

  const speaker = data?.speakers.find((item) => item.id === speakerId) ?? null
  const venue = data?.venues.find((item) => item.id === venueId) ?? null

  const ranked = useMemo(() => {
    if (!speaker || !data) return []
    return rankVenuesForSpeaker(speaker, data.venues)
  }, [speaker, data])

  useEffect(() => {
    if (!speaker) return
    setEventName(speaker.talkTitle)
    setEventDescription(speaker.talkDescription)
    if (speaker.preferredDate !== 'Any') setEventDate(speaker.preferredDate)
  }, [speaker])

  useEffect(() => {
    if (!venue) return
    if (eventDate && venue.availableDates.includes(eventDate as Venue['availableDates'][number])) return
    setEventDate(venue.availableDates[0] || '')
  }, [venue, eventDate])

  async function patch(url: string, body: unknown) {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Update failed')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  async function createMatch() {
    if (!speaker || !venue) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: eventName,
          description: eventDescription,
          venueId: venue.id,
          speakerId: speaker.id,
          date: eventDate,
          time: eventTime,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Could not create event')
      setTab('events')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create event')
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  if (!data) {
    return (
      <main className="px-4 py-16 text-center text-cream/70">
        {error || 'Loading matching desk…'}
      </main>
    )
  }

  const stats = [
    { label: 'Venues', value: data.venues.length },
    { label: 'Talks', value: data.speakers.length },
    { label: 'Crew', value: (data.volunteers ?? []).length },
    { label: 'Live', value: data.events.filter((e) => e.status === 'published').length },
  ]

  return (
    <div className="min-h-[100svh]">
      <header className="border-b border-border bg-card/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold">Night Edition</p>
            <h1 className="font-display text-2xl uppercase tracking-wide text-cream">Matching desk</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/events" className="text-sm font-semibold text-primary hover:text-cream">
              Public schedule
            </Link>
            <button type="button" onClick={logout} className="text-sm font-semibold text-cream/70 hover:text-cream">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-cream/15 bg-card/60 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-3xl text-gold">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              ['match', 'Match'],
              ['venues', 'Venues'],
              ['speakers', 'Speakers'],
              ['volunteers', 'Volunteers'],
              ['events', 'Events'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wide ${
                tab === id ? 'bg-gold text-charcoal' : 'border border-cream/20 text-cream/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm font-semibold text-secondary" role="alert">
            {error}
          </p>
        ) : null}

        {tab === 'match' ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-xl uppercase text-cream">Talks</h2>
              <ul className="mt-3 space-y-2">
                {data.speakers.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setSpeakerId(item.id)}
                      className={`w-full border px-3 py-3 text-left ${
                        speakerId === item.id ? 'border-gold bg-gold/10' : 'border-cream/15 bg-card/50'
                      }`}
                    >
                      <p className="font-semibold text-cream">{item.talkTitle}</p>
                      <p className="mt-1 text-xs text-cream/65">
                        {item.name} · {item.topic} · {item.format}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.preferredDate === 'Any' ? 'Any night' : formatWeekDate(item.preferredDate, 'short')} ·{' '}
                        {item.preferredNeighborhood}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h2 className="font-display text-xl uppercase text-cream">Suggested rooms</h2>
              {!speaker ? (
                <p className="mt-3 text-sm text-cream/60">Pick a talk to rank venues.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {ranked.map(({ venue: room, score, reasons }) => (
                    <li key={room.id}>
                      <button
                        type="button"
                        onClick={() => setVenueId(room.id)}
                        className={`w-full border px-3 py-3 text-left ${
                          venueId === room.id ? 'border-primary bg-primary/10' : 'border-cream/15 bg-card/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-cream">{room.name}</p>
                          <span className="font-display text-lg text-gold">{score}</span>
                        </div>
                        <p className="mt-1 text-xs text-cream/65">
                          {room.neighborhood} · {room.venueType} · {room.capacity} ppl
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{reasons[0]}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:col-span-4">
              <h2 className="font-display text-xl uppercase text-cream">Create event</h2>
              {!speaker || !venue ? (
                <p className="mt-3 text-sm text-cream/60">Select a talk and a room.</p>
              ) : (
                <div className="mt-3 space-y-3 border border-cream/15 bg-card/70 p-4">
                  <p className="text-xs text-cream/65">
                    {speaker.name} → {venue.name}
                  </p>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-cream">Event name</span>
                    <input className="ea-input" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-cream">Date</span>
                    <select className="ea-input" value={eventDate} onChange={(e) => setEventDate(e.target.value)}>
                      {venue.availableDates.map((iso) => (
                        <option key={iso} value={iso}>
                          {formatWeekDate(iso)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-cream">Time</span>
                    <select className="ea-input" value={eventTime} onChange={(e) => setEventTime(e.target.value)}>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-cream">Description</span>
                    <textarea
                      className="ea-input min-h-24"
                      rows={4}
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={createMatch}
                    className="btn-cta-primary w-full"
                  >
                    Save as draft
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {tab === 'venues' ? (
          <section className="mt-8 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Venue</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Dates</th>
                  <th className="py-2 pr-4">Cost</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.venues.map((item) => (
                  <tr key={item.id} className="border-t border-cream/10 align-top">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-cream">{item.name}</p>
                      <p className="text-xs text-cream/60">
                        {item.neighborhood} · {item.capacity} ppl
                      </p>
                      <p className="text-xs text-cream/50">{item.contactEmail}</p>
                    </td>
                    <td className="py-3 pr-4 capitalize text-cream/80">{item.venueType}</td>
                    <td className="py-3 pr-4 text-cream/80">
                      {item.availableDates.map((d) => formatWeekDate(d, 'short')).join(', ')}
                    </td>
                    <td className="py-3 pr-4 text-cream/80">{formatCost(item.costType, item.costAmount)}</td>
                    <td className="py-3 pr-4">
                      <StatusButton
                        disabled={busy}
                        current={item.status}
                        onToggle={() =>
                          patch('/api/admin/venues', {
                            id: item.id,
                            status: item.status === 'reviewed' ? 'pending' : 'reviewed',
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {tab === 'speakers' ? (
          <section className="mt-8 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Talk</th>
                  <th className="py-2 pr-4">Topic</th>
                  <th className="py-2 pr-4">Prefer</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.speakers.map((item) => (
                  <tr key={item.id} className="border-t border-cream/10 align-top">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-cream">{item.talkTitle}</p>
                      <p className="text-xs text-cream/60">
                        {item.name} · {item.format}
                      </p>
                      <p className="text-xs text-cream/50">{item.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-cream/80">{item.topic}</td>
                    <td className="py-3 pr-4 text-cream/80">
                      {item.preferredNeighborhood} ·{' '}
                      {item.preferredDate === 'Any' ? 'Any night' : formatWeekDate(item.preferredDate, 'short')}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusButton
                        disabled={busy}
                        current={item.status}
                        onToggle={() =>
                          patch('/api/admin/speakers', {
                            id: item.id,
                            status: item.status === 'reviewed' ? 'pending' : 'reviewed',
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {tab === 'volunteers' ? (
          <section className="mt-8 overflow-x-auto">
            {(data.volunteers ?? []).length === 0 ? (
              <p className="text-sm text-cream/60">No crew signups yet.</p>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Roles</th>
                    <th className="py-2 pr-4">Nights</th>
                    <th className="py-2 pr-4">Where</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.volunteers ?? []).map((item) => (
                    <tr key={item.id} className="border-t border-cream/10 align-top">
                      <td className="py-3 pr-4">
                        <p className="font-semibold text-cream">{item.name}</p>
                        <p className="text-xs text-cream/50">{item.email}</p>
                        {item.phone ? <p className="text-xs text-cream/50">{item.phone}</p> : null}
                        {item.notes ? <p className="mt-1 text-xs text-cream/55">{item.notes}</p> : null}
                      </td>
                      <td className="py-3 pr-4 capitalize text-cream/80">{item.roles.join(', ')}</td>
                      <td className="py-3 pr-4 text-cream/80">
                        {item.availableDates.map((d) => formatWeekDate(d, 'short')).join(', ')}
                      </td>
                      <td className="py-3 pr-4 text-cream/80">{item.preferredNeighborhood}</td>
                      <td className="py-3 pr-4">
                        <StatusButton
                          disabled={busy}
                          current={item.status}
                          onToggle={() =>
                            patch('/api/admin/volunteers', {
                              id: item.id,
                              status: item.status === 'reviewed' ? 'pending' : 'reviewed',
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        ) : null}

        {tab === 'events' ? (
          <section className="mt-8 space-y-3">
            {data.events.map((item) => {
              const room = data.venues.find((v) => v.id === item.venueId)
              const talk = data.speakers.find((s) => s.id === item.speakerId)
              return (
                <article key={item.id} className="border border-cream/15 bg-card/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gold">{item.status}</p>
                      <h3 className="mt-1 font-display text-2xl uppercase text-cream">{item.name}</h3>
                      <p className="mt-1 text-sm text-cream/70">
                        {talk?.name} · {room?.name} · {formatWeekDate(item.date, 'short')} · {item.time}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.status !== 'approved' ? (
                        <button
                          type="button"
                          disabled={busy}
                          className="chip-toggle"
                          onClick={() => patch('/api/admin/events', { id: item.id, status: 'approved' })}
                        >
                          Approve
                        </button>
                      ) : null}
                      {item.status !== 'published' ? (
                        <button
                          type="button"
                          disabled={busy}
                          className="chip-toggle"
                          data-on="true"
                          onClick={() => patch('/api/admin/events', { id: item.id, status: 'published' })}
                        >
                          Publish
                        </button>
                      ) : (
                        <Link href={`/events/${item.slug}`} className="chip-toggle" data-on="true">
                          Live
                        </Link>
                      )}
                      {item.status !== 'draft' ? (
                        <button
                          type="button"
                          disabled={busy}
                          className="chip-toggle"
                          onClick={() => patch('/api/admin/events', { id: item.id, status: 'draft' })}
                        >
                          Unpublish
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        ) : null}
      </main>
    </div>
  )
}

function StatusButton({
  current,
  onToggle,
  disabled,
}: {
  current: string
  onToggle: () => void
  disabled?: boolean
}) {
  return (
    <button type="button" disabled={disabled} onClick={onToggle} className="chip-toggle" data-on={current === 'reviewed'}>
      {current}
    </button>
  )
}
