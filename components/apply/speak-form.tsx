'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { applyFetchHeaders, EVENT, NEIGHBORHOODS } from '@/lib/data'
import { AUDIENCE_LEVELS, PROGRAM_NIGHTS, SESSION_TYPES, SPEAKER_TOPICS } from '@/lib/cfp'
import { HEARD_ABOUT, PRONOUNS, YEARS_AROUND } from '@/lib/apply-options'
import { DEMO_SPEAK } from '@/lib/demo-data'
import {
  dropError,
  firstErrorStep,
  mergeErrors,
  minChars,
  minWords,
  required,
  threeTakeaways,
  validEmail,
  validPhone,
  validUrl,
  type FieldErrors,
} from '@/lib/form-rules'
import {
  ApplyChip,
  ApplyField,
  ApplyGroup,
  ApplyLinkList,
  ApplyRadio,
  ApplySelect,
  ApplySuccess,
  ApplyWizard,
  ReviewRow,
  emptyWorkLink,
  formatWorkLinks,
  toggle,
  wordCount,
  type WorkLink,
} from '@/components/apply/apply-ui'

const STEPS = [
  { id: 'you', label: 'You' },
  { id: 'session', label: 'The session' },
  { id: 'fit', label: 'Night & topics' },
  { id: 'more', label: 'Experience' },
  { id: 'review', label: 'Review' },
] as const

const empty = {
  name: '',
  email: '',
  phone: '',
  pronouns: '',
  cityState: '',
  yearsAround: '',
  title: '',
  company: '',
  linkedinUrl: '',
  websiteUrl: '',
  heardAbout: '',
  format: '',
  talkTitle: '',
  description: '',
  takeaways: '',
  audience: '',
  spokenBefore: '',
  panelist: '',
  accessibility: '',
  notes: '',
  neighborhood: '',
}

export function SpeakForm({ initialFormat = '', demo = false }: { initialFormat?: string; demo?: boolean }) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [nights, setNights] = useState<string[]>(demo ? DEMO_SPEAK.nights : [])
  const [topics, setTopics] = useState<string[]>(demo ? DEMO_SPEAK.topics : [])
  const [links, setLinks] = useState<WorkLink[]>(
    demo
      ? DEMO_SPEAK.links.map((item, index) => ({ ...item, id: `demo-link-${index}` }))
      : [emptyWorkLink()],
  )
  const [form, setForm] = useState({
    ...(demo ? DEMO_SPEAK.form : empty),
    format: SESSION_TYPES.some((item) => item.id === initialFormat)
      ? initialFormat
      : demo
        ? DEMO_SPEAK.form.format
        : '',
  })
  const words = useMemo(() => wordCount(form.description), [form.description])
  const picked = SESSION_TYPES.find((item) => item.id === form.format)

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => dropError(prev, key))
  }

  function setNightsWithAny(value: string) {
    setErrors((prev) => dropError(prev, 'nights'))
    if (value === 'Any') {
      setNights(nights.includes('Any') ? [] : ['Any'])
      return
    }
    setNights(toggle(nights.filter((item) => item !== 'Any'), value))
  }

  function validateStep(index: number): FieldErrors {
    const next: FieldErrors = {}
    if (index === 0) {
      next.name = minChars(form.name, 2, 'Enter your full name')
      next.email = validEmail(form.email)
      next.phone = validPhone(form.phone)
      next.cityState = required(form.cityState, 'City and state are required')
      next.title = required(form.title, 'Title is required')
      next.linkedinUrl = validUrl(form.linkedinUrl, 'LinkedIn')
      next.websiteUrl = validUrl(form.websiteUrl, 'Website')
    }
    if (index === 1) {
      next.format = required(form.format, 'Select a session type')
      next.talkTitle = minChars(form.talkTitle, 8, 'Session title needs a bit more')
      next.description = minWords(form.description, 40, 'Give the room at least 40 words')
      next.takeaways = threeTakeaways(form.takeaways)
      next.audience = required(form.audience, 'Select an audience level')
    }
    if (index === 2) {
      if (nights.length === 0) next.nights = 'Select at least one night'
      if (topics.length === 0) next.topics = 'Select at least one topic'
    }
    if (index === 3) {
      next.spokenBefore = required(form.spokenBefore, 'Have you spoken before?')
      next.panelist = required(form.panelist, 'Say if you would panel')
      for (const link of links) {
        const error = validUrl(link.url, link.kind)
        if (error) next[link.id] = error
      }
    }
    return Object.fromEntries(Object.entries(next).filter(([, value]) => value)) as FieldErrors
  }

  function goNext() {
    const nextErrors = validateStep(step)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setMessage('Check the fields marked below.')
      return
    }
    setErrors({})
    setMessage('')
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const steps = [0, 1, 2, 3].map(validateStep)
    const nextErrors = mergeErrors(...steps)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setMessage('Check the fields marked below.')
      setStep(firstErrorStep(steps))
      return
    }

    setStatus('loading')
    setMessage('')

    const extras = [
      form.pronouns && `Pronouns: ${form.pronouns}`,
      form.yearsAround && `Around Baltimore: ${form.yearsAround}`,
      form.heardAbout && `Heard about us: ${form.heardAbout}`,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('/api/speakers', {
        method: 'POST',
        headers: applyFetchHeaders(demo),
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          title: form.title.trim(),
          cityState: form.cityState.trim(),
          talkTitle: form.talkTitle.trim(),
          talkDescription: form.description.trim(),
          takeaways: form.takeaways.trim(),
          format: form.format,
          preferredNights: nights,
          preferredNeighborhood: form.neighborhood || 'Any',
          topics,
          audienceLevel: form.audience,
          spokenBefore: form.spokenBefore,
          previousTalks: formatWorkLinks(links),
          accessibility: form.accessibility.trim(),
          panelistFallback: form.panelist,
          notes: [extras, form.notes.trim()].filter(Boolean).join('\n\n'),
          linkedinUrl: form.linkedinUrl.trim(),
          websiteUrl: form.websiteUrl.trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <ApplySuccess
        title="Thanks. We have your session."
        email={form.email}
        againLabel="Submit another session"
        onAgain={() => {
          setStatus('idle')
          setStep(0)
          setForm({ ...empty })
          setNights([])
          setTopics([])
          setLinks([emptyWorkLink()])
        }}
      >
        <p>
          We read every application. If it fits a night, we will write you. If you offered to sit on a panel, we may
          still be in touch even if this session is not picked.
        </p>
        <p>Decisions go out by {EVENT.speakerDecision}. Nothing else to do right now.</p>
      </ApplySuccess>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <ApplyWizard
        steps={STEPS}
        step={step}
        onStep={setStep}
        onBack={() => {
          setMessage('')
          setStep((prev) => Math.max(prev - 1, 0))
        }}
        onNext={goNext}
        nextLabel={step === STEPS.length - 1 ? 'Submit application' : 'Continue'}
        submitting={status === 'loading'}
        error={message}
      >
        {step === 0 ? (
          <div className="apply-grid">
            <ApplyField label="Full name" required error={errors.name} errorId="err-name">
              <input
                className={`apply-input${errors.name ? ' is-invalid' : ''}`}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={errors.name ? true : undefined}
              />
            </ApplyField>
            <ApplyField label="Email" required error={errors.email} errorId="err-email">
              <input
                className={`apply-input${errors.email ? ' is-invalid' : ''}`}
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                autoComplete="email"
                placeholder="you@studio.com"
                aria-invalid={errors.email ? true : undefined}
              />
            </ApplyField>
            <ApplyField label="Phone" error={errors.phone}>
              <input
                className={`apply-input${errors.phone ? ' is-invalid' : ''}`}
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                autoComplete="tel"
                placeholder="410-555-0100"
              />
            </ApplyField>
            <ApplyField label="Pronouns">
              <ApplySelect
                name="pronouns"
                value={form.pronouns}
                onChange={(value) => set('pronouns', value)}
                placeholder="Choose pronouns"
                options={PRONOUNS}
              />
            </ApplyField>
            <ApplyField label="City & state" required error={errors.cityState}>
              <input
                className={`apply-input${errors.cityState ? ' is-invalid' : ''}`}
                value={form.cityState}
                onChange={(e) => set('cityState', e.target.value)}
                autoComplete="address-level1"
                placeholder="Baltimore, MD"
              />
            </ApplyField>
            <ApplyField label="Your tie to the city">
              <ApplySelect
                name="yearsAround"
                value={form.yearsAround}
                onChange={(value) => set('yearsAround', value)}
                placeholder="How you know Baltimore"
                options={YEARS_AROUND}
              />
            </ApplyField>
            <ApplyField label="Professional title" required error={errors.title}>
              <input
                className={`apply-input${errors.title ? ' is-invalid' : ''}`}
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Founder, engineer, organizer"
              />
            </ApplyField>
            <ApplyField label="Company / organization">
              <input
                className="apply-input"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                autoComplete="organization"
                placeholder="Studio, company, or independent"
              />
            </ApplyField>
            <ApplyField label="LinkedIn" error={errors.linkedinUrl}>
              <input
                className={`apply-input${errors.linkedinUrl ? ' is-invalid' : ''}`}
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => set('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/"
              />
            </ApplyField>
            <ApplyField label="Website" error={errors.websiteUrl}>
              <input
                className={`apply-input${errors.websiteUrl ? ' is-invalid' : ''}`}
                type="url"
                value={form.websiteUrl}
                onChange={(e) => set('websiteUrl', e.target.value)}
                placeholder="https://"
              />
            </ApplyField>
            <div className="apply-wide">
              <ApplyField label="How did you hear about the week?">
                <ApplySelect
                  name="heardAbout"
                  value={form.heardAbout}
                  onChange={(value) => set('heardAbout', value)}
                  placeholder="Choose one"
                  options={HEARD_ABOUT}
                />
              </ApplyField>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="apply-stack">
            <ApplyField label="Session type" required error={errors.format} hint={picked ? `${picked.length}. ${picked.body}` : 'Workshop, panel, or tech talk.'}>
              <ApplySelect
                name="format"
                value={form.format}
                onChange={(value) => set('format', value)}
                placeholder="Choose a format"
                options={SESSION_TYPES.map((item) => ({ id: item.id, label: `${item.label} · ${item.length}` }))}
                error={errors.format}
              />
            </ApplyField>
            <ApplyField label="Session title" required error={errors.talkTitle}>
              <input
                className={`apply-input${errors.talkTitle ? ' is-invalid' : ''}`}
                value={form.talkTitle}
                onChange={(e) => set('talkTitle', e.target.value)}
                placeholder="What the room is actually about"
              />
            </ApplyField>
            <ApplyField
              label="Session description"
              required
              error={errors.description}
              hint={`${words} words. What happens in the room, not a bio.`}
            >
              <textarea
                className={`apply-input apply-area${errors.description ? ' is-invalid' : ''}`}
                rows={7}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="The conversation, the exercise, or the story."
              />
            </ApplyField>
            <ApplyField label="Three key takeaways" required error={errors.takeaways} hint="What people can use the next day.">
              <textarea
                className={`apply-input apply-area${errors.takeaways ? ' is-invalid' : ''}`}
                rows={4}
                value={form.takeaways}
                onChange={(e) => set('takeaways', e.target.value)}
                placeholder={'1. \n2. \n3. '}
              />
            </ApplyField>
            <ApplyGroup label="Audience level" error={errors.audience}>
              <div className="apply-chips">
                {AUDIENCE_LEVELS.map((level) => (
                  <ApplyRadio
                    key={level}
                    name="audience"
                    value={level}
                    checked={form.audience === level}
                    onChange={(value) => set('audience', value)}
                  >
                    {level}
                  </ApplyRadio>
                ))}
              </div>
            </ApplyGroup>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="apply-stack">
            <ApplyGroup label="Preferred night" error={errors.nights} hint="Pick every night this could live.">
              <div className="apply-chips apply-chips-block">
                {PROGRAM_NIGHTS.map((night) => (
                  <ApplyChip key={night.iso} checked={nights.includes(night.iso)} onChange={() => setNightsWithAny(night.iso)}>
                    {night.name}
                    <span>
                      {night.weekday.slice(0, 3)} · {night.date} · {night.neighborhood}
                    </span>
                  </ApplyChip>
                ))}
                <ApplyChip checked={nights.includes('Any')} onChange={() => setNightsWithAny('Any')}>
                  No preference
                </ApplyChip>
              </div>
            </ApplyGroup>
            <ApplyField label="Closest neighborhood" hint="Helps us place the room.">
              <ApplySelect
                name="neighborhood"
                value={form.neighborhood}
                onChange={(value) => set('neighborhood', value)}
                placeholder="Choose a neighborhood"
                options={NEIGHBORHOODS}
              />
            </ApplyField>
            <ApplyGroup label="Topic" error={errors.topics}>
              <div className="apply-chips">
                {SPEAKER_TOPICS.map((topic) => (
                  <ApplyChip
                    key={topic.id}
                    checked={topics.includes(topic.id)}
                    onChange={() => {
                      setTopics(toggle(topics, topic.id))
                      setErrors((prev) => dropError(prev, 'topics'))
                    }}
                  >
                    {topic.id}
                  </ApplyChip>
                ))}
              </div>
            </ApplyGroup>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="apply-stack">
            <ApplyGroup label="Have you spoken before?" error={errors.spokenBefore} hint="First rooms are welcome.">
              <div className="apply-chips">
                <ApplyRadio name="spoken" value="yes" checked={form.spokenBefore === 'yes'} onChange={(v) => set('spokenBefore', v)}>
                  Yes
                </ApplyRadio>
                <ApplyRadio name="spoken" value="no" checked={form.spokenBefore === 'no'} onChange={(v) => set('spokenBefore', v)}>
                  No
                </ApplyRadio>
              </div>
            </ApplyGroup>
            {form.spokenBefore ? (
              <ApplyLinkList
                label={form.spokenBefore === 'yes' ? 'Talks, articles, and links' : 'Articles, links, or anything else'}
                hint="Talks, videos, decks, articles, or anything else we should look at."
                links={links}
                onChange={(next) => {
                  setLinks(next)
                  setErrors((prev) => {
                    const nextErrors = { ...prev }
                    for (const link of next) delete nextErrors[link.id]
                    return nextErrors
                  })
                }}
                errors={errors}
              />
            ) : null}
            <ApplyGroup label="If this session isn’t selected, would you serve as a panelist?" error={errors.panelist}>
              <div className="apply-chips">
                <ApplyRadio name="panel" value="yes" checked={form.panelist === 'yes'} onChange={(v) => set('panelist', v)}>
                  Yes
                </ApplyRadio>
                <ApplyRadio name="panel" value="no" checked={form.panelist === 'no'} onChange={(v) => set('panelist', v)}>
                  No
                </ApplyRadio>
              </div>
            </ApplyGroup>
            <ApplyField label="Accessibility accommodations">
              <textarea
                className="apply-input apply-area"
                rows={3}
                value={form.accessibility}
                onChange={(e) => set('accessibility', e.target.value)}
                placeholder="What the room should know so you can do the work."
              />
            </ApplyField>
            <ApplyField label="Anything else we should know?">
              <textarea className="apply-input apply-area" rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} />
            </ApplyField>
          </div>
        ) : null}

        {step === 4 ? (
          <dl className="apply-review-list">
            <ReviewRow label="Name" value={form.name} />
            <ReviewRow label="Email" value={form.email} />
            <ReviewRow label="Title" value={[form.title, form.company].filter(Boolean).join(' · ')} />
            <ReviewRow label="From" value={form.cityState} />
            <ReviewRow label="Format" value={picked?.label || form.format} />
            <ReviewRow label="Session" value={form.talkTitle} />
            <ReviewRow label="Audience" value={form.audience} />
            <ReviewRow
              label="Nights"
              value={
                nights.includes('Any')
                  ? 'No preference'
                  : nights
                      .map((iso) => PROGRAM_NIGHTS.find((night) => night.iso === iso)?.short || iso)
                      .join(', ')
              }
            />
            <ReviewRow label="Topics" value={topics.join(', ')} />
            <ReviewRow label="Links" value={formatWorkLinks(links) || 'None added'} />
            <ReviewRow label="Panelist fallback" value={form.panelist === 'yes' ? 'Yes' : 'No'} />
          </dl>
        ) : null}
      </ApplyWizard>
    </form>
  )
}
