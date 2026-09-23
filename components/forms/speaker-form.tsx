'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { EVENT } from '@/lib/data'
import {
  AUDIENCE_LEVELS,
  PROGRAM_NIGHTS,
  SESSION_TYPES,
  SPEAKER_TOPICS,
  TOPIC_GROUPS,
} from '@/lib/cfp'
import { ChipToggle, Field, FieldGroup, RadioChip } from '@/components/forms/field'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Errors = Partial<Record<string, string>>

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export function SpeakerForm({
  format,
  onFormatChange,
}: {
  format: string
  onFormatChange: (value: string) => void
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [nights, setNights] = useState<string[]>([])
  const [topics, setTopics] = useState<string[]>([])
  const [audience, setAudience] = useState('')
  const [spokenBefore, setSpokenBefore] = useState('')
  const [panelist, setPanelist] = useState('')
  const [description, setDescription] = useState('')
  const successRef = useRef<HTMLParagraphElement>(null)
  const words = useMemo(() => wordCount(description), [description])
  const picked = SESSION_TYPES.find((item) => item.id === format)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function setNightsWithAny(value: string) {
    if (value === 'Any') {
      setNights(nights.includes('Any') ? [] : ['Any'])
      return
    }
    setNights(
      toggle(
        nights.filter((item) => item !== 'Any'),
        value,
      ),
    )
  }

  function validate(data: FormData): Errors {
    const next: Errors = {}
    if (!String(data.get('name') || '').trim()) next.name = 'Name is required'
    if (!String(data.get('email') || '').trim()) next.email = 'Email is required'
    const phone = String(data.get('phone') || '').trim()
    if (phone && phone.replace(/\D/g, '').length < 7) next.phone = 'Phone number looks short'
    if (!String(data.get('title') || '').trim()) next.title = 'Title is required'
    if (!String(data.get('cityState') || '').trim()) next.cityState = 'City and state are required'
    if (!String(data.get('talkTitle') || '').trim()) next.talkTitle = 'Session title is required'
    if (!description.trim()) next.description = 'Session description is required'
    if (!String(data.get('takeaways') || '').trim()) next.takeaways = 'Add three takeaways'
    if (!format) next.format = 'Select a session type'
    if (nights.length === 0) next.nights = 'Select at least one night'
    if (topics.length === 0) next.topics = 'Select at least one topic'
    if (!audience) next.audience = 'Select an audience level'
    if (!spokenBefore) next.spokenBefore = 'Have you spoken before?'
    if (!panelist) next.panelist = 'Say if you would panel'
    return next
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const nextErrors = validate(data)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setErrors(nextErrors)
      setMessage('Check the fields marked below.')
      window.setTimeout(() => {
        if (nextErrors.format && !form.querySelector('[aria-invalid="true"]')) {
          document.getElementById('formats')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          document.querySelector<HTMLElement>('#formats button')?.focus()
          return
        }
        const invalid = form.querySelector<HTMLElement>('[aria-invalid="true"]')
        invalid?.focus()
        invalid?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 0)
      return
    }

    setStatus('loading')
    setMessage('')
    setErrors({})

    try {
      const res = await fetch('/api/speakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          company: String(data.get('company') || '').trim(),
          title: String(data.get('title') || '').trim(),
          cityState: String(data.get('cityState') || '').trim(),
          talkTitle: String(data.get('talkTitle') || '').trim(),
          talkDescription: description.trim(),
          takeaways: String(data.get('takeaways') || '').trim(),
          format,
          preferredNights: nights,
          topics,
          audienceLevel: audience,
          spokenBefore,
          previousTalks: String(data.get('previousTalks') || '').trim(),
          accessibility: String(data.get('accessibility') || '').trim(),
          panelistFallback: panelist,
          notes: String(data.get('notes') || '').trim(),
          linkedinUrl: String(data.get('linkedinUrl') || '').trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      form.reset()
      onFormatChange('')
      setNights([])
      setTopics([])
      setAudience('')
      setSpokenBefore('')
      setPanelist('')
      setDescription('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="cfp-success" role="status">
        <p className="cfp-h3" ref={successRef} tabIndex={-1}>
          Got it.
        </p>
        <p>
          We review monthly and write only if it fits a room. If you said yes to paneling, that still counts if the
          session isn’t picked.
        </p>
        <p>Nothing else to do right now. Watch the inbox you listed.</p>
        <button type="button" className="cfp-btn" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="cfp-form" noValidate>
      <div>
        <p className="cfp-step">1. Contact</p>
        <div className="cfp-grid">
          <Field label="Full name" required error={errors.name} errorId="err-name">
            <input
              name="name"
              required
              autoComplete="name"
              className="ea-input"
              placeholder="Your name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'err-name' : undefined}
            />
          </Field>
          <Field label="Email" required error={errors.email} errorId="err-email">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="ea-input"
              placeholder="you@company.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
          </Field>
          <Field label="Phone number" error={errors.phone} errorId="err-phone">
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="ea-input"
              placeholder="410-555-0100"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
            />
          </Field>
          <Field label="LinkedIn URL">
            <input name="linkedinUrl" type="url" className="ea-input" placeholder="https://linkedin.com/in/…" />
          </Field>
          <Field label="Company / organization">
            <input name="company" autoComplete="organization" className="ea-input" placeholder="Studio, company, or independent" />
          </Field>
          <Field label="Professional title" required error={errors.title} errorId="err-title">
            <input
              name="title"
              required
              className="ea-input"
              placeholder="Founder, engineer, organizer…"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? 'err-title' : undefined}
            />
          </Field>
          <div className="cfp-wide">
            <Field label="City & state" required error={errors.cityState} errorId="err-city">
              <input
                name="cityState"
                required
                autoComplete="address-level1"
                className="ea-input"
                placeholder="Baltimore, MD"
                aria-invalid={errors.cityState ? true : undefined}
                aria-describedby={errors.cityState ? 'err-city' : undefined}
              />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <p className="cfp-step">2. Session</p>
        <div className="cfp-stack">
          <Field label="Proposed session title" required error={errors.talkTitle} errorId="err-title-talk">
            <input
              name="talkTitle"
              required
              className="ea-input"
              placeholder="What the room is actually about"
              aria-invalid={errors.talkTitle ? true : undefined}
              aria-describedby={errors.talkTitle ? 'err-title-talk' : undefined}
            />
          </Field>
          <Field
            label="Session description"
            required
            error={errors.description}
            errorId="err-desc"
            hint={`${words} words. A few paragraphs on what happens in the room — not a bio.`}
          >
            <textarea
              name="talkDescription"
              required
              rows={7}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="ea-input min-h-[9rem] resize-y"
              placeholder="Tell us the conversation, the exercise, or the story."
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={errors.description ? 'err-desc' : undefined}
            />
          </Field>
          <Field
            label="Three key takeaways"
            required
            error={errors.takeaways}
            errorId="err-take"
            hint="What attendees can use the next day."
          >
            <textarea
              name="takeaways"
              required
              rows={4}
              className="ea-input min-h-[6rem] resize-y"
              placeholder={'1. \n2. \n3. '}
              aria-invalid={errors.takeaways ? true : undefined}
              aria-describedby={errors.takeaways ? 'err-take' : undefined}
            />
          </Field>

          <div>
            <p className="cfp-step">Session type</p>
            {picked ? (
              <p className="cfp-picked">
                {picked.label}
                <span className="cfp-format-meta">{picked.length}</span>
              </p>
            ) : (
              <p className={errors.format ? 'cfp-error' : 'cfp-copy'} id={errors.format ? 'err-format' : undefined}>
                <a href="#formats">Choose a type above.</a>
              </p>
            )}
          </div>

          <FieldGroup
            label="Preferred night"
            error={errors.nights}
            errorId="err-nights"
            hint="Select every night this could live."
          >
            <p className="cfp-hint">
              <Link href={EVENT.weekPath}>What the nights are</Link>
            </p>
            <div className="cfp-chips">
              {PROGRAM_NIGHTS.map((night) => (
                <ChipToggle
                  key={night.iso}
                  checked={nights.includes(night.iso)}
                  onChange={() => setNightsWithAny(night.iso)}
                >
                  {night.name}
                  <span className="cfp-chip-sub">
                    {night.weekday.slice(0, 3)} · {night.date}
                  </span>
                </ChipToggle>
              ))}
              <ChipToggle checked={nights.includes('Any')} onChange={() => setNightsWithAny('Any')}>
                No preference
              </ChipToggle>
            </div>
          </FieldGroup>

          <FieldGroup label="Topic category" error={errors.topics} errorId="err-topics">
            {TOPIC_GROUPS.map((group) => (
              <div key={group} className="cfp-topic-group">
                <p className="cfp-topic-label">{group}</p>
                <div className="cfp-chips">
                  {SPEAKER_TOPICS.filter((topic) => topic.group === group).map((topic) => (
                    <ChipToggle
                      key={topic.id}
                      checked={topics.includes(topic.id)}
                      onChange={() => setTopics(toggle(topics, topic.id))}
                    >
                      {topic.id}
                    </ChipToggle>
                  ))}
                </div>
              </div>
            ))}
          </FieldGroup>

          <FieldGroup label="Audience level" error={errors.audience} errorId="err-audience">
            <div className="cfp-chips">
              {AUDIENCE_LEVELS.map((level) => (
                <RadioChip
                  key={level}
                  name="audienceLevel"
                  value={level}
                  checked={audience === level}
                  onChange={setAudience}
                >
                  {level}
                </RadioChip>
              ))}
            </div>
          </FieldGroup>
        </div>
      </div>

      <div>
        <p className="cfp-step">3. Experience</p>
        <div className="cfp-stack">
          <FieldGroup
            label="Have you spoken before?"
            error={errors.spokenBefore}
            errorId="err-spoken"
            hint="Prior talks are optional. First rooms are welcome."
          >
            <div className="cfp-chips">
              <RadioChip name="spokenBefore" value="yes" checked={spokenBefore === 'yes'} onChange={setSpokenBefore}>
                Yes
              </RadioChip>
              <RadioChip name="spokenBefore" value="no" checked={spokenBefore === 'no'} onChange={setSpokenBefore}>
                No
              </RadioChip>
            </div>
          </FieldGroup>
          {spokenBefore === 'yes' ? (
            <Field label="Previous talks" hint="Links to talks, videos, decks, or events.">
              <textarea name="previousTalks" rows={3} className="ea-input min-h-[5rem] resize-y" placeholder="https://" />
            </Field>
          ) : null}
        </div>
      </div>

      <div>
        <p className="cfp-step">4. Anything else</p>
        <div className="cfp-stack">
          <Field label="Accessibility accommodations">
            <textarea
              name="accessibility"
              rows={3}
              className="ea-input min-h-[5rem] resize-y"
              placeholder="What the room should know so you can do the work."
            />
          </Field>
          <FieldGroup
            label="If this session isn’t selected, would you serve as a panelist?"
            error={errors.panelist}
            errorId="err-panel"
          >
            <div className="cfp-chips">
              <RadioChip name="panelistFallback" value="yes" checked={panelist === 'yes'} onChange={setPanelist}>
                Yes
              </RadioChip>
              <RadioChip name="panelistFallback" value="no" checked={panelist === 'no'} onChange={setPanelist}>
                No
              </RadioChip>
            </div>
          </FieldGroup>
          <Field label="Anything else we should know?">
            <textarea name="notes" rows={3} className="ea-input min-h-[5rem] resize-y" />
          </Field>
        </div>
      </div>

      {status === 'error' && message ? (
        <p className="cfp-error" role="alert">
          {message}
        </p>
      ) : null}

      <button type="button" className="cfp-btn" disabled>
        Opening Nov 1st, 2026
      </button>
    </form>
  )
}
