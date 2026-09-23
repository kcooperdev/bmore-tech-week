'use client'

import { useState } from 'react'
import { EVENT } from '@/lib/data'
import { CFP_NOT_LOOKING, CFP_VALUES, SESSION_TYPES } from '@/lib/cfp'
import { SpeakerForm } from '@/components/forms/speaker-form'

export function SpeakersApply() {
  const [format, setFormat] = useState('')

  function pickFormat(id: string) {
    setFormat(id)
    const apply = document.getElementById('apply')
    apply?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    document.getElementById('apply-title')?.focus({ preventScroll: true })
  }

  return (
    <>
      <section className="cfp-section" id="formats">
        <p className="cfp-kicker">Formats</p>
        <h2 className="cfp-h2">Session types</h2>
        <p className="cfp-copy">Choose a type to start the application.</p>
        <div className="cfp-formats">
          {SESSION_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`cfp-select${format === item.id ? ' is-on' : ''}`}
              onClick={() => pickFormat(item.id)}
              aria-pressed={format === item.id}
            >
              <p className="cfp-format-meta">{item.length}</p>
              <h3 className="cfp-h3">{item.label}</h3>
              <p className="cfp-tight">{item.body}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="cfp-section">
        <div className="cfp-split">
          <div>
            <p className="cfp-kicker">We want</p>
            <ul className="cfp-compact">
              {CFP_VALUES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cfp-kicker">Not this</p>
            <ul className="cfp-compact">
              {CFP_NOT_LOOKING.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cfp-section" id="apply">
        <p className="cfp-kicker">Apply</p>
        <h2 className="cfp-h2" id="apply-title" tabIndex={-1}>
          Speaker application
        </h2>
        <p className="cfp-copy">
          Deadline is <time dateTime={EVENT.speakerDeadlineIso}>{EVENT.speakerDeadline}</time>. Decisions on{' '}
          <time dateTime={EVENT.speakerDecisionIso}>{EVENT.speakerDecision}</time>.
        </p>
        {EVENT.speakerCallOpen ? (
          <SpeakerForm format={format} onFormatChange={setFormat} />
        ) : (
          <p className="cfp-copy">
            Applications open November 2026. The call is posted. Reach us at{' '}
            <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a> if you need us sooner.
          </p>
        )}
      </section>
    </>
  )
}
