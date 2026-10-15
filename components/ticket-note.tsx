'use client'

import { useId, useState, type FormEvent } from 'react'
import { EVENT } from '@/lib/data'
import { ticketMessage } from '@/lib/ticket-copy'

export function TicketNote({ pass }: { pass: string }) {
  const fieldId = useId()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get('email') || '').trim()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Could not save email')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Could not save email')
    }
  }

  if (status === 'done') {
    return (
      <>
        <p className="cfp-kicker">You're on the list</p>
        <h2 className="cfp-h2">We'll write {EVENT.opensOn}</h2>
        <p className="cfp-copy offer-confirm">{ticketMessage('confirm', { pass }).text}</p>
      </>
    )
  }

  return (
    <>
      <p className="cfp-kicker">A note</p>
      <h2 className="cfp-h2">We'll write you</h2>
      <p className="cfp-copy">
        Leave an email. The morning tickets open, you'll get the link from {EVENT.contactEmail}.
      </p>
      <form className="offer-remind ticket-note" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor={fieldId}>
          Email
        </label>
        <input
          id={fieldId}
          className="cfp-input"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          disabled={status === 'loading'}
        />
        <button className="harbor-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving…' : 'Remind me'}
        </button>
        {status === 'error' ? (
          <p className="offer-remind-error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </>
  )
}
