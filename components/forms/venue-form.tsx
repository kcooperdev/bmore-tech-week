'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  AMENITIES,
  COST_TYPES,
  CTA,
  NEIGHBORHOODS,
  VENUE_TYPES,
  WEEK_DATES,
} from '@/lib/data'
import { DEMO_VENUE } from '@/lib/demo-data'
import { dropError, minChars, validEmail, type FieldErrors } from '@/lib/form-rules'
import { ChipToggle, Field, FieldGroup } from '@/components/forms/field'
import { FormFootnote } from '@/components/forms/form-footnote'
import { FormSuccess } from '@/components/forms/form-success'

type Status = 'idle' | 'loading' | 'success' | 'error'

const empty = {
  name: '',
  neighborhood: '',
  address: '',
  capacity: '',
  venueType: '',
  costAmount: '',
  contactName: '',
  contactEmail: '',
}

export function VenueForm({ demo = false }: { demo?: boolean }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [costType, setCostType] = useState<(typeof COST_TYPES)[number]>(demo ? DEMO_VENUE.costType : 'Free')
  const [dates, setDates] = useState<string[]>(demo ? DEMO_VENUE.availableDates : [])
  const [amenities, setAmenities] = useState<string[]>(demo ? DEMO_VENUE.amenities : [])
  const [form, setForm] = useState(
    demo
      ? {
          name: DEMO_VENUE.name,
          neighborhood: DEMO_VENUE.neighborhood,
          address: DEMO_VENUE.address,
          capacity: String(DEMO_VENUE.capacity),
          venueType: DEMO_VENUE.venueType,
          costAmount: DEMO_VENUE.costAmount,
          contactName: DEMO_VENUE.contactName,
          contactEmail: DEMO_VENUE.contactEmail,
        }
      : empty,
  )

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => dropError(prev, key))
  }

  function toggle(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  function validateStep(index: 1 | 2) {
    const next: FieldErrors = {}
    if (index === 1) {
      next.name = minChars(form.name, 2, 'Venue name is required')
      if (!form.neighborhood) next.neighborhood = 'Pick a neighborhood'
      next.address = minChars(form.address, 8, 'Enter a street address')
      const capacity = Number(form.capacity)
      if (!Number.isFinite(capacity) || capacity < 1 || capacity > 5000) {
        next.capacity = 'Capacity must be between 1 and 5,000'
      }
      if (dates.length === 0) next.dates = 'Select at least one night'
      next.contactName = minChars(form.contactName, 2, 'Contact name is required')
      next.contactEmail = validEmail(form.contactEmail)
    }
    if (index === 2) {
      if (!form.venueType) next.venueType = 'Pick a venue type'
      if (costType !== 'Free') {
        const amount = Number(form.costAmount)
        if (!Number.isFinite(amount) || amount < 1) next.costAmount = 'Enter a cost in dollars'
      }
    }
    return Object.fromEntries(Object.entries(next).filter(([, value]) => value)) as FieldErrors
  }

  function onContinue() {
    const nextErrors = validateStep(1)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      setMessage('Check the fields marked below.')
      return
    }
    setErrors({})
    setStatus('idle')
    setMessage('')
    setStep(2)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (step === 1) {
      onContinue()
      return
    }
    const nextErrors = { ...validateStep(1), ...validateStep(2) }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      setMessage('Check the fields marked below.')
      if (validateStep(1) && Object.keys(validateStep(1)).length > 0) setStep(1)
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          neighborhood: form.neighborhood.trim(),
          address: form.address.trim(),
          capacity: Number(form.capacity),
          availableDates: dates,
          venueType: form.venueType.trim(),
          costType,
          costAmount: costType === 'Free' ? null : Number(form.costAmount),
          amenities,
          contactName: form.contactName.trim(),
          contactEmail: form.contactEmail.trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      setForm(empty)
      setCostType('Free')
      setDates([])
      setAmenities([])
      setStep(1)
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <FormSuccess
        title="Thanks. We have your room."
        body="If we can put a night here, we will email you with dates and what we would need from the space."
        current="host"
        resetLabel="Add another room"
        onReset={() => setStatus('idle')}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-5 sm:p-7" noValidate>
      <p className="text-sm text-cream/60">Step {step} of 2</p>
      {demo ? (
        <p className="text-sm font-semibold text-gold" role="status">
          Test data is filled in. Check it, then submit.
        </p>
      ) : null}

      <div hidden={step !== 1} className="space-y-5">
        <Field label="Venue name" required error={errors.name}>
          <input
            name="name"
            autoComplete="organization"
            className="ea-input"
            placeholder="4MLK"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </Field>
        <Field label="Neighborhood" required error={errors.neighborhood}>
          <select
            name="neighborhood"
            className="ea-input"
            value={form.neighborhood}
            onChange={(e) => set('neighborhood', e.target.value)}
          >
            <option value="" disabled>
              Select a neighborhood
            </option>
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Address" required error={errors.address}>
          <input
            name="address"
            autoComplete="street-address"
            className="ea-input"
            placeholder="Street, city, ZIP"
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
          />
        </Field>
        <Field label="Capacity" required hint="How many people can the room hold comfortably?" error={errors.capacity}>
          <input
            name="capacity"
            type="number"
            min={1}
            max={5000}
            className="ea-input"
            placeholder="80"
            value={form.capacity}
            onChange={(e) => set('capacity', e.target.value)}
          />
        </Field>

        <FieldGroup label="Available dates" hint="Nights you can host, April 26 to 30, 6PM to 10PM. Pick at least one." error={errors.dates}>
          <div className="flex flex-wrap gap-2">
            {WEEK_DATES.map((date) => (
              <ChipToggle
                key={date.iso}
                checked={dates.includes(date.iso)}
                onChange={() => {
                  setDates(toggle(dates, date.iso))
                  setErrors((prev) => dropError(prev, 'dates'))
                }}
              >
                {date.short}
              </ChipToggle>
            ))}
          </div>
        </FieldGroup>

        <Field label="Contact name" required error={errors.contactName}>
          <input
            name="contactName"
            autoComplete="name"
            className="ea-input"
            placeholder="Who we should email"
            value={form.contactName}
            onChange={(e) => set('contactName', e.target.value)}
          />
        </Field>
        <Field label="Contact email" required error={errors.contactEmail}>
          <input
            name="contactEmail"
            type="email"
            autoComplete="email"
            className="ea-input"
            placeholder="host@venue.com"
            value={form.contactEmail}
            onChange={(e) => set('contactEmail', e.target.value)}
          />
        </Field>
      </div>

      <div hidden={step !== 2} className="space-y-5">
        <Field label="Venue type" required error={errors.venueType}>
          <select
            name="venueType"
            className="ea-input"
            value={form.venueType}
            onChange={(e) => set('venueType', e.target.value)}
          >
            <option value="" disabled>
              Tech, social, or hybrid
            </option>
            {VENUE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Cost type" required>
          <select
            name="costType"
            className="ea-input"
            value={costType}
            onChange={(e) => setCostType(e.target.value as (typeof COST_TYPES)[number])}
          >
            {COST_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        {costType !== 'Free' ? (
          <Field label="Cost amount (USD)" required error={errors.costAmount}>
            <input
              name="costAmount"
              type="number"
              min={1}
              max={100000}
              className="ea-input"
              placeholder="250"
              value={form.costAmount}
              onChange={(e) => set('costAmount', e.target.value)}
            />
          </Field>
        ) : null}

        <FieldGroup label="Amenities">
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((item) => (
              <ChipToggle
                key={item}
                checked={amenities.includes(item)}
                onChange={() => setAmenities(toggle(amenities, item))}
              >
                {item}
              </ChipToggle>
            ))}
          </div>
        </FieldGroup>
      </div>

      {status === 'error' ? (
        <p className="text-sm font-semibold text-red-300" role="alert">
          {message || 'Could not submit. Try again.'}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        {step === 2 ? (
          <button
            type="button"
            className="btn-cta-outline w-full sm:w-auto"
            onClick={() => {
              setStatus('idle')
              setMessage('')
              setStep(1)
            }}
          >
            Back
          </button>
        ) : null}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-cta-primary group w-full disabled:opacity-70 sm:w-auto"
        >
          {status === 'loading' ? 'Sending…' : step === 1 ? 'Continue' : CTA.submitVenue}
          {status !== 'loading' ? (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          ) : null}
        </button>
      </div>
      <FormFootnote />
    </form>
  )
}
