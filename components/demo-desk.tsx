'use client'

import { useState } from 'react'
import Link from 'next/link'
import { applyFetchHeaders, applyLink, EVENT, involveLink } from '@/lib/data'
import {
  ambassadorPayload,
  partnerPayload,
  speakerPayload,
  sponsorPayload,
  DEMO_TICKET,
  DEMO_VENUE,
  DEMO_VOLUNTEER,
} from '@/lib/demo-data'

const RUN_SHEET =
  process.env.NEXT_PUBLIC_EVENT_OPS_URL?.trim() || 'http://localhost:3001'

type Lane = {
  id: string
  title: string
  lookFor: string
  pitchHref?: string
  formHref?: string
  formNewTab?: boolean
  send?: () => Promise<Response>
}

const LANES: Lane[] = [
  {
    id: 'speak',
    title: 'Give a Talk',
    lookFor: 'Speakers · Test Maya Ortiz',
    pitchHref: involveLink('speak').href,
    formHref: `${applyLink('speak').href}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/speakers', {
        method: 'POST',
        headers: applyFetchHeaders(true),
        body: JSON.stringify(speakerPayload()),
      }),
  },
  {
    id: 'partner',
    title: 'Partner',
    lookFor: 'Community partners · Test Jordan Blake',
    pitchHref: involveLink('partner').href,
    formHref: `${applyLink('partner').href}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/apply', {
        method: 'POST',
        headers: applyFetchHeaders(true),
        body: JSON.stringify(partnerPayload()),
      }),
  },
  {
    id: 'sponsor',
    title: 'Sponsor',
    lookFor: 'Sponsors · Test Priya Shah · Innovation intro call',
    pitchHref: involveLink('sponsor').href,
    formHref: `${applyLink('sponsor').href}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/apply', {
        method: 'POST',
        headers: applyFetchHeaders(true),
        body: JSON.stringify(sponsorPayload()),
      }),
  },
  {
    id: 'ambassador',
    title: 'Ambassador',
    lookFor: 'Ambassadors · Test Chris Vale',
    pitchHref: involveLink('ambassador').href,
    formHref: `${applyLink('ambassador').href}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/apply', {
        method: 'POST',
        headers: applyFetchHeaders(true),
        body: JSON.stringify(ambassadorPayload()),
      }),
  },
  {
    id: 'tickets',
    title: 'Tickets',
    lookFor: 'Updates list · Test Alex Kim',
    formHref: `${EVENT.ticketsPath}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEMO_TICKET),
      }),
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    lookFor: 'Volunteers · Test Sam Rivera',
    formHref: `${EVENT.volunteerSubmitPath}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEMO_VOLUNTEER),
      }),
  },
  {
    id: 'venue',
    title: 'Host a night',
    lookFor: 'Venues · Test Harbor Room',
    formHref: `${EVENT.venueSubmitPath}?demo=1`,
    formNewTab: true,
    send: () =>
      fetch('/api/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEMO_VENUE),
      }),
  },
]

type Result = { id: string; ok: boolean; detail: string }

export function DemoDesk() {
  const [busy, setBusy] = useState<string | null>(null)
  const [results, setResults] = useState<Result[]>([])

  async function run(lane: Lane) {
    if (!lane.send) return
    setBusy(lane.id)
    try {
      const res = await lane.send()
      const json = (await res.json().catch(() => ({}))) as { error?: string; id?: string }
      setResults((prev) => [
        {
          id: lane.id,
          ok: res.ok,
          detail: res.ok
            ? `${lane.title} landed${json.id ? ` · ${json.id.slice(0, 8)}` : ''}. Check ${lane.lookFor}.`
            : json.error || `Could not send ${lane.title}.`,
        },
        ...prev.filter((item) => item.id !== lane.id),
      ])
    } catch {
      setResults((prev) => [
        { id: lane.id, ok: false, detail: `Could not reach the site API for ${lane.title}.` },
        ...prev.filter((item) => item.id !== lane.id),
      ])
    } finally {
      setBusy(null)
    }
  }

  async function runCore() {
    for (const lane of LANES.slice(0, 4)) {
      await run(lane)
    }
  }

  return (
    <div>
      <section className="ed-cream-section">
        <div className="ed-container">
          <p className="ed-eyebrow">Internal · Demo desk</p>
          <h2 className="ed-manifesto-title">
            Click through every form. Watch it hit the <span className="ed-highlight">run sheet</span>.
          </h2>
          <p className="ed-manifesto-sub">
            Pitch pages stay on this site. Each apply form opens in a new tab, already filled. Submit it, then
            check the run sheet. Or send the demo from here if you just need the row.
          </p>

          <div className="ed-manifesto-cta">
            <a href={RUN_SHEET} target="_blank" rel="noopener noreferrer" className="ed-pill-btn">
              Open the run sheet
            </a>
            <button type="button" className="ed-pill-btn ed-pill-btn-outline" onClick={runCore} disabled={busy !== null}>
              {busy ? 'Sending…' : 'Send the four apply demos'}
            </button>
          </div>

          <ol className="ed-steps-grid ed-three-col-grid">
            <li className="ed-step-card">
              <span className="ed-step-num">01</span>
              <h3 className="ed-step-title">Read the pitch</h3>
              <p className="ed-step-body">Same page a speaker, partner, sponsor, or ambassador sees. Stays on this site.</p>
            </li>
            <li className="ed-step-card">
              <span className="ed-step-num">02</span>
              <h3 className="ed-step-title">Open the form</h3>
              <p className="ed-step-body">New tab. Demo fill is ready. Click through each step and submit.</p>
            </li>
            <li className="ed-step-card">
              <span className="ed-step-num">03</span>
              <h3 className="ed-step-title">Check the run sheet</h3>
              <p className="ed-step-body">
                Event operations on port 3001. Names start with Demo. Refresh that tab after you submit.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="ed-dark-showcase">
        <div className="ed-container">
          <h2 className="ed-section-title">The forms</h2>
          <div className="demo-lanes">
            {LANES.map((lane, index) => {
              const result = results.find((item) => item.id === lane.id)
              return (
                <article key={lane.id} className="demo-lane">
                  <p className="demo-lane-num">0{index + 1}</p>
                  <h3 className="demo-lane-title">{lane.title}</h3>
                  <p className="demo-lane-look">Look for {lane.lookFor}</p>
                  <div className="demo-lane-actions">
                    {lane.pitchHref ? (
                      <Link href={lane.pitchHref} className="ed-pill-btn ed-pill-btn-outline">
                        Read the pitch
                      </Link>
                    ) : null}
                    {lane.formHref ? (
                      <a
                        href={lane.formHref}
                        className="ed-pill-btn"
                        {...(lane.formNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        Open the form
                      </a>
                    ) : null}
                    {lane.send ? (
                      <button
                        type="button"
                        className="ed-pill-btn ed-pill-btn-outline"
                        onClick={() => void run(lane)}
                        disabled={busy !== null}
                      >
                        {busy === lane.id ? 'Sending…' : 'Send demo now'}
                      </button>
                    ) : null}
                  </div>
                  {result ? (
                    <p className={`demo-lane-result${result.ok ? ' is-ok' : ' is-bad'}`}>{result.detail}</p>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
