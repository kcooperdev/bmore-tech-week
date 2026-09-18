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
import { ChipToggle, Field, FieldGroup } from '@/components/forms/field'
import { FormSuccess } from '@/components/forms/form-success'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function VenueForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [costType, setCostType] = useState<(typeof COST_TYPES)[number]>('Free')
  const [dates, setDates] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  function toggle(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  function onContinue() {
    if (dates.length === 0) {
      setStatus('error')
      setMessage('Select at least one night.')
      return
    }
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
    if (dates.length === 0) {
      setStatus('error')
      setMessage('Select at least one night.')
      setStep(1)
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          neighborhood: String(data.get('neighborhood') || '').trim(),
          address: String(data.get('address') || '').trim(),
          capacity: Number(data.get('capacity')),
          availableDates: dates,
          venueType: String(data.get('venueType') || '').trim(),
          costType,
          costAmount: costType === 'Free' ? null : Number(data.get('costAmount')),
          amenities,
          contactName: String(data.get('contactName') || '').trim(),
          contactEmail: String(data.get('contactEmail') || '').trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      form.reset()
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
        title="Got it."
        body="If we can put a night in this room, we will email you."
        current="host"
        resetLabel="Add another room"
        onReset={() => setStatus('idle')}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-5 sm:p-7">
      <p className="text-sm text-cream/60">Step {step} of 2</p>

      <div hidden={step !== 1} className="space-y-5">
        <Field label="Venue name" required>
          <input name="name" required autoComplete="organization" className="ea-input" placeholder="4MLK" />
        </Field>
        <Field label="Neighborhood" required>
          <select name="neighborhood" required className="ea-input" defaultValue="">
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
        <Field label="Address" required>
          <input
            name="address"
            required
            autoComplete="street-address"
            className="ea-input"
            placeholder="Street, city, ZIP"
          />
        </Field>
        <Field label="Capacity" required hint="How many people can the room hold comfortably?">
          <input name="capacity" type="number" min={1} max={5000} required className="ea-input" placeholder="80" />
        </Field>

        <FieldGroup label="Available dates" hint="Nights you can host, April 26 to 30, 6PM to 10PM. Pick at least one.">
          <div className="flex flex-wrap gap-2">
            {WEEK_DATES.map((date) => (
              <ChipToggle
                key={date.iso}
                checked={dates.includes(date.iso)}
                onChange={() => setDates(toggle(dates, date.iso))}
              >
                {date.short}
              </ChipToggle>
            ))}
          </div>
        </FieldGroup>

        <Field label="Contact name" required>
          <input name="contactName" required autoComplete="name" className="ea-input" placeholder="Who we should email" />
        </Field>
        <Field label="Contact email" required>
          <input
            name="contactEmail"
            type="email"
            required
            autoComplete="email"
            className="ea-input"
            placeholder="host@venue.com"
          />
        </Field>
      </div>

      <div hidden={step !== 2} className="space-y-5">
        <Field label="Venue type" required>
          <select name="venueType" required={step === 2} className="ea-input" defaultValue="">
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
            required={step === 2}
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
          <Field label="Cost amount (USD)" required>
            <input name="costAmount" type="number" min={1} max={100000} required className="ea-input" placeholder="250" />
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
    </form>
  )
}
