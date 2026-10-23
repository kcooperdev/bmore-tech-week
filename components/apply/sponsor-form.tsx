'use client'

import { useState, type FormEvent } from 'react'
import { applyFetchHeaders } from '@/lib/data'
import { COMPANY_SIZES, HEARD_ABOUT, SPONSOR_CALL_SLOTS, SPONSOR_DECISIONS, SPONSOR_GOALS, SPONSOR_TIERS } from '@/lib/apply-options'
import { DEMO_SPONSOR } from '@/lib/demo-data'
import {
  dropError,
  firstErrorStep,
  mergeErrors,
  minChars,
  required,
  validEmail,
  validPhone,
  validUrl,
  type FieldErrors,
} from '@/lib/form-rules'
import {
  ApplyChip,
  ApplyField,
  ApplyGroup,
  ApplyRadio,
  ApplySelect,
  ApplySuccess,
  ApplyWizard,
  ReviewRow,
  toggle,
} from '@/components/apply/apply-ui'

const STEPS = [
  { id: 'you', label: 'You' },
  { id: 'company', label: 'Company & tier' },
  { id: 'call', label: 'Book a call' },
  { id: 'review', label: 'Review & submit' },
] as const

const empty = {
  name: '',
  email: '',
  phone: '',
  title: '',
  organization: '',
  website: '',
  size: '',
  tier: '',
  decision: '',
  heardAbout: '',
  slot: '',
  booked: '',
  notes: '',
}

export function SponsorForm({ initialTier = '', demo = false }: { initialTier?: string; demo?: boolean }) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [goals, setGoals] = useState<string[]>(demo ? DEMO_SPONSOR.goals : [])
  const [form, setForm] = useState({
    ...(demo ? DEMO_SPONSOR.form : empty),
    tier: SPONSOR_TIERS.some((item) => item.id === initialTier)
      ? initialTier
      : demo
        ? DEMO_SPONSOR.form.tier
        : '',
  })
  const tier = SPONSOR_TIERS.find((item) => item.id === form.tier)
  const slot = SPONSOR_CALL_SLOTS.find((item) => item.id === form.slot)

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => dropError(prev, key))
  }

  function validateStep(index: number): FieldErrors {
    const next: FieldErrors = {}
    if (index === 0) {
      next.name = minChars(form.name, 2, 'Enter your name')
      next.email = validEmail(form.email)
      next.title = required(form.title, 'Your role is required')
      next.phone = validPhone(form.phone)
    }
    if (index === 1) {
      next.organization = required(form.organization, 'Company is required')
      next.tier = required(form.tier, 'Choose a tier, or say you want to talk first')
      if (goals.length === 0) next.goals = 'Pick at least one goal'
      next.decision = required(form.decision, 'Who decides?')
      next.website = validUrl(form.website, 'Website')
    }
    if (index === 2) {
      if (!form.slot && form.booked !== 'no') next.slot = 'Pick a 20-minute call'
      next.booked = required(form.booked, 'Confirm you can take this call')
      if (form.booked === 'no' && !form.notes.trim()) next.notes = 'Tell us a week that works'
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
    const steps = [0, 1, 2].map(validateStep)
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
      `Tier: ${tier ? `${tier.label} (${tier.price})` : form.tier}`,
      form.size && `Company size: ${form.size}`,
      `Goals: ${goals.join(', ')}`,
      `Decision: ${form.decision}`,
      `Call booked: ${slot?.label || form.slot}`,
      form.heardAbout && `Heard about us: ${form.heardAbout}`,
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
          kind: 'sponsor',
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          role: form.title.trim(),
          website: form.website.trim(),
          pass: `Sponsor · ${tier?.label || 'Talk first'}`,
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
        title="Thanks. Your call is requested."
        email={form.email}
        againLabel="Start another"
        onAgain={() => {
          setStatus('idle')
          setStep(0)
          setForm(empty)
          setGoals([])
        }}
      >
        <p>
          We will hold {slot?.label || 'your window'} and send a calendar invite. The call is 20 minutes: whether the
          fit is right, which nights make sense, and what that tier actually includes.
        </p>
        <p>Nothing to pay today. If the time has to move, we will say so before the week of the call.</p>
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
        nextLabel={step === STEPS.length - 1 ? 'Book call & submit' : step === 2 ? 'Confirm this call' : 'Continue'}
        submitting={status === 'loading'}
        error={message}
      >
        {step === 0 ? (
          <div className="apply-grid">
            <ApplyField label="Your name" required error={errors.name}>
              <input className={`apply-input${errors.name ? ' is-invalid' : ''}`} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
            </ApplyField>
            <ApplyField label="Work email" required error={errors.email}>
              <input
                className={`apply-input${errors.email ? ' is-invalid' : ''}`}
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                autoComplete="email"
                placeholder="you@company.com"
              />
            </ApplyField>
            <ApplyField label="Role / title" required error={errors.title}>
              <input
                className={`apply-input${errors.title ? ' is-invalid' : ''}`}
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Partnerships, founder, marketing"
              />
            </ApplyField>
            <ApplyField label="Phone" error={errors.phone} hint="We’ll use this only if the calendar invite bounces.">
              <input className={`apply-input${errors.phone ? ' is-invalid' : ''}`} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </ApplyField>
            <div className="apply-wide">
              <ApplyField label="How did you hear about the week?">
                <ApplySelect name="heard" value={form.heardAbout} onChange={(v) => set('heardAbout', v)} placeholder="Choose one" options={HEARD_ABOUT} />
              </ApplyField>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="apply-stack">
            <div className="apply-grid">
              <ApplyField label="Company" required error={errors.organization}>
                <input
                  className={`apply-input${errors.organization ? ' is-invalid' : ''}`}
                  value={form.organization}
                  onChange={(e) => set('organization', e.target.value)}
                  autoComplete="organization"
                />
              </ApplyField>
              <ApplyField label="Website" error={errors.website}>
                <input className={`apply-input${errors.website ? ' is-invalid' : ''}`} type="url" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" />
              </ApplyField>
              <ApplyField label="Company size">
                <ApplySelect name="size" value={form.size} onChange={(v) => set('size', v)} placeholder="Headcount" options={COMPANY_SIZES} />
              </ApplyField>
              <ApplyField label="Who decides?" required error={errors.decision}>
                <ApplySelect
                  name="decision"
                  value={form.decision}
                  onChange={(v) => set('decision', v)}
                  placeholder="Choose one"
                  options={SPONSOR_DECISIONS}
                  error={errors.decision}
                />
              </ApplyField>
            </div>
            <ApplyGroup label="Which tier are you looking at?" error={errors.tier} hint="You can change this on the call.">
              <div className="apply-tier-grid">
                {SPONSOR_TIERS.map((item) => (
                  <label key={item.id} className="apply-tier" data-on={form.tier === item.id}>
                    <input
                      type="radio"
                      className="sr-only"
                      name="tier"
                      value={item.id}
                      checked={form.tier === item.id}
                      onChange={() => set('tier', item.id)}
                    />
                    <span className="apply-tier-price">{item.price}</span>
                    <span className="apply-tier-name">{item.label}</span>
                  </label>
                ))}
              </div>
            </ApplyGroup>
            <ApplyGroup label="What do you want out of the week?" error={errors.goals}>
              <div className="apply-chips">
                {SPONSOR_GOALS.map((item) => (
                  <ApplyChip
                    key={item}
                    checked={goals.includes(item)}
                    onChange={() => {
                      setGoals(toggle(goals, item))
                      setErrors((prev) => dropError(prev, 'goals'))
                    }}
                  >
                    {item}
                  </ApplyChip>
                ))}
              </div>
            </ApplyGroup>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="apply-stack">
            <p className="apply-call-lead">
              Sponsors book a 20-minute intro first. Pick a time. After you submit, we send the calendar invite. Then we
              talk nights, placement, and the tier.
            </p>
            <ApplyGroup label="Pick a 20-minute window" error={errors.slot}>
              <div className="apply-chips apply-chips-block">
                {SPONSOR_CALL_SLOTS.map((item) => (
                  <ApplyRadio
                    key={item.id}
                    name="slot"
                    value={item.id}
                    checked={form.slot === item.id}
                    onChange={(value) => set('slot', value)}
                  >
                    {item.label}
                  </ApplyRadio>
                ))}
              </div>
            </ApplyGroup>
            <ApplyGroup label="Can you take this call?" error={errors.booked}>
              <div className="apply-chips">
                <ApplyRadio name="booked" value="yes" checked={form.booked === 'yes'} onChange={(v) => set('booked', v)}>
                  Yes, hold this time
                </ApplyRadio>
                <ApplyRadio name="booked" value="no" checked={form.booked === 'no'} onChange={(v) => set('booked', v)}>
                  I need a different week
                </ApplyRadio>
              </div>
            </ApplyGroup>
            {form.booked === 'no' ? (
              <ApplyField label="What week works better?" required error={errors.notes}>
                <textarea
                  className="apply-input apply-area"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="A few dates or a timezone note."
                />
              </ApplyField>
            ) : (
              <ApplyField label="Anything the call should cover?">
                <textarea className="apply-input apply-area" rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} />
              </ApplyField>
            )}
          </div>
        ) : null}

        {step === 3 ? (
          <dl className="apply-review-list">
            <ReviewRow label="Contact" value={`${form.name} · ${form.email}`} />
            <ReviewRow label="Company" value={[form.organization, form.title].filter(Boolean).join(' · ')} />
            <ReviewRow label="Tier" value={tier ? `${tier.label} · ${tier.price}` : ''} />
            <ReviewRow label="Goals" value={goals.join(', ')} />
            <ReviewRow label="Decision" value={form.decision} />
            <ReviewRow label="Call" value={slot?.label || ''} />
          </dl>
        ) : null}
      </ApplyWizard>
    </form>
  )
}
