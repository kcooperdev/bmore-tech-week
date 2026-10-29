'use client'

import { useState, type FormEvent } from 'react'
import { applyFetchHeaders, NEIGHBORHOODS } from '@/lib/data'
import { PROGRAM_NIGHTS } from '@/lib/cfp'
import {
  HEARD_ABOUT,
  PARTNER_CHANNELS,
  PARTNER_HELP,
  PARTNER_SIZES,
  PARTNER_TYPES,
  PRONOUNS,
} from '@/lib/apply-options'
import { DEMO_PARTNER } from '@/lib/demo-data'
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
  ApplySelect,
  ApplySuccess,
  ApplyWizard,
  ReviewRow,
  toggle,
} from '@/components/apply/apply-ui'

const STEPS = [
  { id: 'you', label: 'You' },
  { id: 'group', label: 'Your group' },
  { id: 'share', label: 'How you’ll help' },
  { id: 'review', label: 'Review' },
] as const

const empty = {
  name: '',
  email: '',
  phone: '',
  pronouns: '',
  title: '',
  organization: '',
  type: '',
  size: '',
  neighborhood: '',
  website: '',
  instagram: '',
  audience: '',
  heardAbout: '',
  notes: '',
}

export function PartnerForm({ demo = false }: { demo?: boolean }) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [channels, setChannels] = useState<string[]>(demo ? DEMO_PARTNER.channels : [])
  const [help, setHelp] = useState<string[]>(demo ? DEMO_PARTNER.help : [])
  const [nights, setNights] = useState<string[]>(demo ? DEMO_PARTNER.nights : [])
  const [form, setForm] = useState(demo ? DEMO_PARTNER.form : empty)

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
      next.organization = required(form.organization, 'Organization is required')
      next.type = required(form.type, 'What kind of group is this?')
      next.size = required(form.size, 'How large is the group?')
      next.website = validUrl(form.website, 'Website')
    }
    if (index === 2) {
      if (channels.length === 0) next.channels = 'Pick at least one channel'
      if (help.length === 0) next.help = 'How can you help?'
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
      `Type: ${form.type}`,
      `Size: ${form.size}`,
      form.neighborhood && `Neighborhood: ${form.neighborhood}`,
      form.instagram && `Instagram: ${form.instagram}`,
      form.audience && `Audience: ${form.audience}`,
      `Channels: ${channels.join(', ')}`,
      `Help: ${help.join(', ')}`,
      nights.length ? `Nights they can show: ${nights.join(', ')}` : '',
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
          kind: 'partner',
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          role: form.title.trim(),
          website: form.website.trim(),
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
        title="Thanks. We have your partner application."
        email={form.email}
        againLabel="Submit another group"
        onAgain={() => {
          setStatus('idle')
          setStep(0)
          setForm(empty)
          setChannels([])
          setHelp([])
          setNights([])
        }}
      >
        <p>
          If the fit is right, we will write you about listing, shout-outs, and the link you can share with your
          people. Community partner is free.
        </p>
        <p>No invoice. No pitch deck. Nothing else to do right now.</p>
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
        nextLabel={step === STEPS.length - 1 ? 'Submit partnership' : 'Continue'}
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
                placeholder="you@group.org"
              />
            </ApplyField>
            <ApplyField label="Your role" required error={errors.title}>
              <input
                className={`apply-input${errors.title ? ' is-invalid' : ''}`}
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Organizer, director, faculty"
              />
            </ApplyField>
            <ApplyField label="Phone" error={errors.phone}>
              <input className={`apply-input${errors.phone ? ' is-invalid' : ''}`} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </ApplyField>
            <ApplyField label="Pronouns">
              <ApplySelect name="pronouns" value={form.pronouns} onChange={(v) => set('pronouns', v)} placeholder="Choose pronouns" options={PRONOUNS} />
            </ApplyField>
            <ApplyField label="How did you hear about the week?">
              <ApplySelect name="heard" value={form.heardAbout} onChange={(v) => set('heardAbout', v)} placeholder="Choose one" options={HEARD_ABOUT} />
            </ApplyField>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="apply-grid">
            <div className="apply-wide">
              <ApplyField label="Organization" required error={errors.organization}>
                <input
                  className={`apply-input${errors.organization ? ' is-invalid' : ''}`}
                  value={form.organization}
                  onChange={(e) => set('organization', e.target.value)}
                  autoComplete="organization"
                  placeholder="Meetup, school, or group name"
                />
              </ApplyField>
            </div>
            <ApplyField label="What kind of group?" required error={errors.type}>
              <ApplySelect name="type" value={form.type} onChange={(v) => set('type', v)} placeholder="Choose a type" options={PARTNER_TYPES} error={errors.type} />
            </ApplyField>
            <ApplyField label="About how many people?" required error={errors.size}>
              <ApplySelect name="size" value={form.size} onChange={(v) => set('size', v)} placeholder="Choose a size" options={PARTNER_SIZES} error={errors.size} />
            </ApplyField>
            <ApplyField label="Home neighborhood">
              <ApplySelect
                name="neighborhood"
                value={form.neighborhood}
                onChange={(v) => set('neighborhood', v)}
                placeholder="Where you gather"
                options={NEIGHBORHOODS}
              />
            </ApplyField>
            <ApplyField label="Website" error={errors.website}>
              <input className={`apply-input${errors.website ? ' is-invalid' : ''}`} type="url" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" />
            </ApplyField>
            <ApplyField label="Instagram">
              <input className="apply-input" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="@yourgroup" />
            </ApplyField>
            <div className="apply-wide">
              <ApplyField label="Who do you gather?" hint="Students, founders, operators, neighbors.">
                <textarea
                  className="apply-input apply-area"
                  rows={3}
                  value={form.audience}
                  onChange={(e) => set('audience', e.target.value)}
                  placeholder="A sentence on who shows up."
                />
              </ApplyField>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="apply-stack">
            <ApplyGroup label="Where can you share the week?" error={errors.channels}>
              <div className="apply-chips">
                {PARTNER_CHANNELS.map((item) => (
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
            <ApplyGroup label="How do you want to help?" error={errors.help}>
              <div className="apply-chips">
                {PARTNER_HELP.map((item) => (
                  <ApplyChip
                    key={item}
                    checked={help.includes(item)}
                    onChange={() => {
                      setHelp(toggle(help, item))
                      setErrors((prev) => dropError(prev, 'help'))
                    }}
                  >
                    {item}
                  </ApplyChip>
                ))}
              </div>
            </ApplyGroup>
            <ApplyGroup label="Nights you could show up" hint="Optional. Helps us plan shout-outs and rooms.">
              <div className="apply-chips apply-chips-block">
                {PROGRAM_NIGHTS.map((night) => (
                  <ApplyChip key={night.iso} checked={nights.includes(night.short)} onChange={() => setNights(toggle(nights, night.short))}>
                    {night.short}
                    <span>
                      {night.weekday.slice(0, 3)} · {night.date}
                    </span>
                  </ApplyChip>
                ))}
              </div>
            </ApplyGroup>
            <ApplyField label="Anything else we should know?">
              <textarea className="apply-input apply-area" rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} />
            </ApplyField>
          </div>
        ) : null}

        {step === 3 ? (
          <dl className="apply-review-list">
            <ReviewRow label="Contact" value={`${form.name} · ${form.email}`} />
            <ReviewRow label="Role" value={form.title} />
            <ReviewRow label="Group" value={`${form.organization} · ${form.type}`} />
            <ReviewRow label="Size" value={form.size} />
            <ReviewRow label="Neighborhood" value={form.neighborhood} />
            <ReviewRow label="Share via" value={channels.join(', ')} />
            <ReviewRow label="Help" value={help.join(', ')} />
            <ReviewRow label="Nights" value={nights.join(', ')} />
          </dl>
        ) : null}
      </ApplyWizard>
    </form>
  )
}
