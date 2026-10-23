'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { CTA, NEIGHBORHOODS, VOLUNTEER_ROLES, WEEK_DATES } from '@/lib/data'
import { DEMO_VOLUNTEER } from '@/lib/demo-data'
import { dropError, minChars, validEmail, validPhone, type FieldErrors } from '@/lib/form-rules'
import { ChipToggle, Field, FieldGroup } from '@/components/forms/field'
import { FormFootnote } from '@/components/forms/form-footnote'
import { FormSuccess } from '@/components/forms/form-success'

type Status = 'idle' | 'loading' | 'success' | 'error'

const empty = {
  name: '',
  email: '',
  phone: '',
  preferredNeighborhood: 'Any',
  notes: '',
}

export function VolunteerForm({ demo = false }: { demo?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [roles, setRoles] = useState<string[]>(demo ? DEMO_VOLUNTEER.roles : [])
  const [dates, setDates] = useState<string[]>(demo ? DEMO_VOLUNTEER.availableDates : [])
  const [form, setForm] = useState(
    demo
      ? {
          name: DEMO_VOLUNTEER.name,
          email: DEMO_VOLUNTEER.email,
          phone: DEMO_VOLUNTEER.phone,
          preferredNeighborhood: DEMO_VOLUNTEER.preferredNeighborhood,
          notes: DEMO_VOLUNTEER.notes,
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

  function validate() {
    const next: FieldErrors = {}
    next.name = minChars(form.name, 2, 'Enter your name')
    next.email = validEmail(form.email)
    next.phone = validPhone(form.phone)
    if (roles.length === 0) next.roles = 'Pick at least one role'
    if (dates.length === 0) next.dates = 'Select at least one night'
    return Object.fromEntries(Object.entries(next).filter(([, value]) => value)) as FieldErrors
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      setMessage('Check the fields marked below.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          roles,
          availableDates: dates,
          preferredNeighborhood: form.preferredNeighborhood.trim() || 'Any',
          notes: form.notes.trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      setForm(empty)
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
        title="Thanks. You are on the volunteer list."
        body="When the rooms lock, we will email you a night and a role. You do not need to do anything else right now."
        current="crew"
        resetLabel="Add another person"
        onReset={() => setStatus('idle')}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-5 sm:p-7" noValidate>
      {demo ? (
        <p className="text-sm font-semibold text-gold" role="status">
          Test data is filled in. Check it, then submit.
        </p>
      ) : null}
      <Field label="Name" required error={errors.name}>
        <input
          name="name"
          autoComplete="name"
          className="ea-input"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
        />
      </Field>
      <Field label="Email" required error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="ea-input"
          placeholder="you@email.com"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
        />
      </Field>

      <FieldGroup label="Roles" hint="Check-in, set up, breakdown. Take one or all three." error={errors.roles}>
        <div className="flex flex-col gap-2">
          {VOLUNTEER_ROLES.map((role) => (
            <ChipToggle
              key={role.id}
              checked={roles.includes(role.id)}
              onChange={() => {
                setRoles(toggle(roles, role.id))
                setErrors((prev) => dropError(prev, 'roles'))
              }}
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

      <FieldGroup label="Nights you can work" hint="April 26 to 30. Shifts sit around 5:15 to 7:15 or 9:45 to 10:40." error={errors.dates}>
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

      <details className="border-t border-cream/10 pt-4" open={demo || undefined}>
        <summary className="cursor-pointer text-sm font-semibold text-cream/80">
          Anything else
        </summary>
        <div className="mt-4 space-y-5">
          <Field label="Phone" hint="If we need you the day of." error={errors.phone}>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="ea-input"
              placeholder="410-555-0100"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
          </Field>
          <Field label="Preferred neighborhood">
            <select
              name="preferredNeighborhood"
              className="ea-input"
              value={form.preferredNeighborhood}
              onChange={(e) => set('preferredNeighborhood', e.target.value)}
            >
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
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
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
      <FormFootnote />
    </form>
  )
}
