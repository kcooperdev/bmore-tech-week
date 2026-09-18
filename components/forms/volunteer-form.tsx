'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { CTA, NEIGHBORHOODS, VOLUNTEER_ROLES, WEEK_DATES } from '@/lib/data'
import { ChipToggle, Field, FieldGroup } from '@/components/forms/field'
import { FormSuccess } from '@/components/forms/form-success'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function VolunteerForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [roles, setRoles] = useState<string[]>([])
  const [dates, setDates] = useState<string[]>([])

  function toggle(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (roles.length === 0) {
      setStatus('error')
      setMessage('Pick at least one role.')
      return
    }
    if (dates.length === 0) {
      setStatus('error')
      setMessage('Select at least one night.')
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          roles,
          availableDates: dates,
          preferredNeighborhood: String(data.get('preferredNeighborhood') || '').trim(),
          notes: String(data.get('notes') || '').trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      form.reset()
      setRoles([])
      setDates([])
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <FormSuccess
        title="You’re on the list."
        body="We will email you a night and a role when the rooms lock."
        current="crew"
        resetLabel="Add another person"
        onReset={() => setStatus('idle')}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-5 sm:p-7">
      <Field label="Name" required>
        <input name="name" required autoComplete="name" className="ea-input" placeholder="Your name" />
      </Field>
      <Field label="Email" required>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="ea-input"
          placeholder="you@email.com"
        />
      </Field>

      <FieldGroup label="Roles" hint="Check-in, set up, breakdown. Take one or all three.">
        <div className="flex flex-col gap-2">
          {VOLUNTEER_ROLES.map((role) => (
            <ChipToggle
              key={role.id}
              checked={roles.includes(role.id)}
              onChange={() => setRoles(toggle(roles, role.id))}
              className="min-h-12 justify-start px-4 text-left"
            >
              <span>
                <span className="block font-semibold">{role.label}</span>
                <span className="mt-0.5 block text-xs font-normal text-cream/60">{role.body}</span>
              </span>
            </ChipToggle>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup label="Nights you can work" hint="April 26 to 30. Shifts sit around 5:15 to 7:15 or 9:45 to 10:40.">
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

      <details className="border-t border-cream/10 pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-cream/80">
          Anything else
        </summary>
        <div className="mt-4 space-y-5">
          <Field label="Phone" hint="If we need you the day of.">
            <input name="phone" type="tel" autoComplete="tel" className="ea-input" placeholder="410-555-0100" />
          </Field>
          <Field label="Preferred neighborhood" required>
            <select name="preferredNeighborhood" required className="ea-input" defaultValue="Any">
              <option value="Any">Anywhere in town</option>
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Notes">
            <textarea
              name="notes"
              rows={3}
              className="ea-input min-h-[6rem] resize-y"
              placeholder="First time, need a later shift, bringing a friend…"
            />
          </Field>
        </div>
      </details>

      {status === 'error' ? (
        <p className="text-sm font-semibold text-red-300" role="alert">
          {message || 'Could not submit. Try again.'}
        </p>
      ) : null}

      <button type="submit" disabled={status === 'loading'} className="btn-cta-secondary group w-full disabled:opacity-70 sm:w-auto">
        {status === 'loading' ? 'Sending…' : CTA.submitVolunteer}
        {status !== 'loading' ? (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </button>
    </form>
  )
}
