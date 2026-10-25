'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { EVENT } from '@/lib/data'
import { DEMO_TICKET } from '@/lib/demo-data'
import { validEmail } from '@/lib/form-rules'

const STORAGE_KEY = 'btw-updates-list'
const OPEN_EVENT = 'btw:updates'

type Status = 'idle' | 'loading' | 'done' | 'error'

export function requestUpdates(pass?: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { pass: pass || '' } }))
}

function isDemo() {
  return new URLSearchParams(window.location.search).get('demo') === '1'
}

function readStore() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStore(value: 'joined' | 'later') {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore private mode */
  }
}

export function UpdatesPopup({ skipAuto = false }: { skipAuto?: boolean }) {
  const fieldId = useId()
  const titleId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [pass, setPass] = useState('Updates list')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    function show(nextPass?: string) {
      setPass(nextPass?.trim() || 'Updates list')
      setStatus('idle')
      setError('')
      if (isDemo()) setEmail(DEMO_TICKET.email)
      setOpen(true)
    }

    function onRequest(event: Event) {
      const detail = (event as CustomEvent<{ pass?: string }>).detail
      show(detail?.pass)
    }

    window.addEventListener(OPEN_EVENT, onRequest)

    if (!skipAuto && (isDemo() || !readStore())) {
      const wait = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 700
      const timer = window.setTimeout(() => show(), wait)
      return () => {
        window.clearTimeout(timer)
        window.removeEventListener(OPEN_EVENT, onRequest)
      }
    }

    return () => window.removeEventListener(OPEN_EVENT, onRequest)
  }, [mounted, skipAuto])

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && status !== 'loading') dismiss()
    }

    document.addEventListener('keydown', onKey)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [open, status])

  function dismiss() {
    if (status === 'loading') return
    if (status !== 'done') writeStore('later')
    setOpen(false)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const emailError = validEmail(email)
    if (emailError) {
      setStatus('error')
      setError(emailError)
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          pass,
          name: isDemo() ? DEMO_TICKET.name : undefined,
          organization: isDemo() ? DEMO_TICKET.organization : undefined,
          role: isDemo() ? DEMO_TICKET.role : undefined,
          notes: isDemo() ? DEMO_TICKET.notes : undefined,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Could not save email')
      writeStore('joined')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Could not save email')
    }
  }

  if (!mounted || !open) return null

  return createPortal(
    <div className="updates-layer" role="presentation">
      <button type="button" className="updates-backdrop" aria-label="Close updates popup" onClick={dismiss} />
      <div className="updates-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        {status === 'done' ? (
          <div aria-live="polite">
            <p className="updates-kicker">You are on the list</p>
            <h2 id={titleId} className="updates-title">
              Thanks. We will write you.
            </h2>
            <p className="updates-copy">
              Tickets open {EVENT.opensOn}. You will hear from {EVENT.contactEmail} that day with the sale link, and
              again if the nights or speakers change in a way worth knowing.
            </p>
            <p className="updates-fine">Nothing else to do right now. You can close this and keep looking around.</p>
            <button type="button" className="ed-pill-btn updates-submit" onClick={dismiss}>
              Back to the week
            </button>
          </div>
        ) : (
          <>
            <p className="updates-kicker">Baltimore Tech Week {EVENT.year}</p>
            <h2 id={titleId} className="updates-title">
              Want the ticket link when it goes live?
            </h2>
            <p className="updates-copy">
              Tickets open {EVENT.opensOn}. Leave your email and we will send the sale link that day, plus the
              nights and speakers as they come together.
            </p>
            <form className="updates-form" onSubmit={onSubmit}>
              <label htmlFor={fieldId} className="updates-label">
                Email
              </label>
              <input
                ref={inputRef}
                id={fieldId}
                className={`updates-input${status === 'error' ? ' is-invalid' : ''}`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@email.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (error) setError('')
                }}
                disabled={status === 'loading'}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? `${fieldId}-error` : `${fieldId}-hint`}
              />
              <button className="ed-pill-btn updates-submit" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Saving…' : 'Add me to the list'}
              </button>
              {status === 'error' ? (
                <p className="updates-error" id={`${fieldId}-error`} role="alert">
                  {error}
                </p>
              ) : (
                <p className="updates-fine" id={`${fieldId}-hint`}>
                  General Admission is $15 a night or $40 for the week. You can sponsor a seat for someone else. VIP starts at
                  $45. We will not sell your email.
                </p>
              )}
            </form>
            <button type="button" className="updates-later" onClick={dismiss} disabled={status === 'loading'}>
              Not now
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
