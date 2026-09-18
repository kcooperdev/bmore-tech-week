'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function TicketWaitlist() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(data.get('email') || '').trim(),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Could not save email')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Could not save email')
    }
  }

  if (status === 'success') {
    return (
      <p className="mt-10 inline-flex items-center gap-2 text-sm text-cream/80" role="status">
        <Check className="size-4 text-gold" aria-hidden />
        You are on the ticket list. We will email you when they drop.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-md">
      <label htmlFor="ticket-email" className="block text-sm font-semibold text-cream">
        Tickets, when they drop
      </label>
      <p className="mt-1 text-sm leading-relaxed text-cream/60">
        Leave an email. We will not sell a seat until the rooms lock.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="ticket-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="ea-input"
          placeholder="you@email.com"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-cta-outline shrink-0 disabled:opacity-70"
        >
          {status === 'loading' ? 'Saving…' : 'Notify me'}
          {status !== 'loading' ? <ArrowRight className="size-4" aria-hidden /> : null}
        </button>
      </div>
      {status === 'error' ? (
        <p className="mt-2 text-sm font-semibold text-red-300" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  )
}
