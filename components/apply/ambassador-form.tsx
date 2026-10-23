'use client'

import { useState, type FormEvent } from 'react'
import { applyFetchHeaders, NEIGHBORHOODS } from '@/lib/data'
import { AMBASSADOR_CHANNELS, AMBASSADOR_REACH, HEARD_ABOUT, PRONOUNS, YEARS_AROUND } from '@/lib/apply-options'
import { DEMO_AMBASSADOR } from '@/lib/demo-data'
import {
  dropError,
  firstErrorStep,
  mergeErrors,
  minChars,
  minWords,
  required,
  validEmail,
  validPhone,
  type FieldErrors,
} from '@/lib/form-rules'
import {
  ApplyChip,
  ApplyField,
  ApplyGroup,
  ApplySelect,
  ApplySuccess,
  ApplyWizard,
  ReviewRow,
  toggle,
} from '@/components/apply/apply-ui'

const STEPS = [
  { id: 'you', label: 'You' },
  { id: 'reach', label: 'Get the word out' },
  { id: 'review', label: 'Review' },
] as const

const empty = {
  name: '',
  email: '',
  phone: '',
  pronouns: '',
  city: '',
  yearsAround: '',
  organization: '',
  title: '',
  neighborhood: '',
  reach: '',
  why: '',
  heardAbout: '',
  notes: '',
}

export function AmbassadorForm({ demo = false }: { demo?: boolean }) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [channels, setChannels] = useState<string[]>(demo ? DEMO_AMBASSADOR.channels : [])
  const [form, setForm] = useState(demo ? DEMO_AMBASSADOR.form : empty)

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => dropError(prev, key))
  }

  function validateStep(index: number): FieldErrors {
    const next: FieldErrors = {}
    if (index === 0) {
      next.name = minChars(form.name, 2, 'Enter your name')
      next.email = validEmail(form.email)
      next.city = required(form.city, 'City is required')
      next.phone = validPhone(form.phone)
    }
    if (index === 1) {
      if (channels.length === 0) next.channels = 'Where will you share?'
      next.reach = required(form.reach, 'About how many people can you reach?')
      next.why = minWords(form.why, 12, 'Tell us how you’ll get the word out, in a sentence or two')
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
    const steps = [0, 1].map(validateStep)
    const nextErrors = mergeErrors(...steps)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setMessage('Check the fields marked below.')
      setStep(firstErrorStep(steps))
      return
    }

    setStatus('loading')
    setMessage('')

    const notes = [
      `Channels: ${channels.join(', ')}`,
      `Reach: ${form.reach}`,
      form.neighborhood && `Neighborhood: ${form.neighborhood}`,
      form.city && `City: ${form.city}`,
      form.yearsAround && `Around Baltimore: ${form.yearsAround}`,
      form.why && `How they’ll spread the word: ${form.why}`,
      form.heardAbout && `Heard about us: ${form.heardAbout}`,
      form.pronouns && `Pronouns: ${form.pronouns}`,
      form.phone && `Phone: ${form.phone}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: applyFetchHeaders(demo),
        body: JSON.stringify({
          kind: 'ambassador',
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          role: form.title.trim() || 'Ambassador',
          notes,
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
        title="Thanks. You are on the ambassador list."
        email={form.email}
        againLabel="Register someone else"
        onAgain={() => {
          setStatus('idle')
          setStep(0)
          setForm(empty)
          setChannels([])
        }}
      >
        <p>
          You can start telling people now: campus, group chat, workplace, the feed. Share the night, the time, and the
          ticket link.
        </p>
        <p>We will write if we need anything else. Nothing else to do on this form.</p>
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
        nextLabel={step === STEPS.length - 1 ? 'Submit' : 'Continue'}
        submitting={status === 'loading'}
        error={message}
      >
        {step === 0 ? (
          <div className="apply-grid">
            <ApplyField label="Your name" required error={errors.name}>
              <input className={`apply-input${errors.name ? ' is-invalid' : ''}`} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
            </ApplyField>
            <ApplyField label="Email" required error={errors.email}>
              <input
                className={`apply-input${errors.email ? ' is-invalid' : ''}`}
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                autoComplete="email"
              />
            </ApplyField>
            <ApplyField label="City" required error={errors.city}>
              <input
                className={`apply-input${errors.city ? ' is-invalid' : ''}`}
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="Baltimore, MD"
              />
            </ApplyField>
            <ApplyField label="Pronouns">
              <ApplySelect name="pronouns" value={form.pronouns} onChange={(v) => set('pronouns', v)} placeholder="Choose pronouns" options={PRONOUNS} />
            </ApplyField>
            <ApplyField label="Your tie to the city">
              <ApplySelect
                name="years"
                value={form.yearsAround}
                onChange={(v) => set('yearsAround', v)}
                placeholder="How you know Baltimore"
                options={YEARS_AROUND}
              />
            </ApplyField>
            <ApplyField label="Neighborhood you move through">
              <ApplySelect
                name="neighborhood"
                value={form.neighborhood}
                onChange={(v) => set('neighborhood', v)}
                placeholder="Choose one"
                options={NEIGHBORHOODS}
              />
            </ApplyField>
            <ApplyField label="School, workplace, or group">
              <input
                className="apply-input"
                value={form.organization}
                onChange={(e) => set('organization', e.target.value)}
                placeholder="Optional"
              />
            </ApplyField>
            <ApplyField label="What you do there">
              <input className="apply-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Student, organizer, engineer" />
            </ApplyField>
            <ApplyField label="Phone" error={errors.phone}>
              <input className={`apply-input${errors.phone ? ' is-invalid' : ''}`} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </ApplyField>
            <ApplyField label="How did you hear about the week?">
              <ApplySelect name="heard" value={form.heardAbout} onChange={(v) => set('heardAbout', v)} placeholder="Choose one" options={HEARD_ABOUT} />
            </ApplyField>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="apply-stack">
            <p className="apply-call-lead">
              Ambassadors get the word out. Tell the people you already talk to. No booth. No quota. A real voice in
              the city.
            </p>
            <ApplyGroup label="Where will you share?" error={errors.channels}>
              <div className="apply-chips">
                {AMBASSADOR_CHANNELS.map((item) => (
                  <ApplyChip
                    key={item}
                    checked={channels.includes(item)}
                    onChange={() => {
                      setChannels(toggle(channels, item))
                      setErrors((prev) => dropError(prev, 'channels'))
                    }}
                  >
                    {item}
                  </ApplyChip>
                ))}
              </div>
            </ApplyGroup>
            <ApplyField label="About how many people can you reach?" required error={errors.reach}>
              <ApplySelect
                name="reach"
                value={form.reach}
                onChange={(v) => set('reach', v)}
                placeholder="Choose a range"
                options={AMBASSADOR_REACH}
                error={errors.reach}
              />
            </ApplyField>
            <ApplyField
              label="How will you get the word out?"
              required
              error={errors.why}
              hint="A campus Slack, a Sunday dinner, a story you already tell. Be specific."
            >
              <textarea
                className={`apply-input apply-area${errors.why ? ' is-invalid' : ''}`}
                rows={5}
                value={form.why}
                onChange={(e) => set('why', e.target.value)}
                placeholder="Who you’ll tell, and where."
              />
            </ApplyField>
            <ApplyField label="Anything else?">
              <textarea className="apply-input apply-area" rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} />
            </ApplyField>
          </div>
        ) : null}

        {step === 2 ? (
          <dl className="apply-review-list">
            <ReviewRow label="Name" value={`${form.name} · ${form.email}`} />
            <ReviewRow label="From" value={[form.city, form.neighborhood].filter(Boolean).join(' · ')} />
            <ReviewRow label="Group" value={[form.organization, form.title].filter(Boolean).join(' · ')} />
            <ReviewRow label="Share via" value={channels.join(', ')} />
            <ReviewRow label="Reach" value={form.reach} />
            <ReviewRow label="Plan" value={form.why} />
          </dl>
        ) : null}
      </ApplyWizard>
    </form>
  )
}
