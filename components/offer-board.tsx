'use client'

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { EVENT } from '@/lib/data'
import { ticketMessage } from '@/lib/ticket-copy'

export type Offer = {
  id: string
  name: string
  price: string
  spots: string
  fit: string
  gets: string[]
  shares?: string[]
}

export function OfferBoard({
  railLabel,
  lead,
  sibling,
  offers,
  close,
}: {
  railLabel: string
  lead: string
  sibling?: { href: string; label: string }
  offers: Offer[]
  close?: {
    title: string
    body: string
    label: string
    remind?: boolean
  }
}) {
  const baseId = useId()
  const [index, setIndex] = useState(0)
  const fromKey = useRef(false)
  const mounted = useRef(false)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const offer = offers[index] ?? offers[0]
  const [remindStatus, setRemindStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [remindError, setRemindError] = useState('')
  const [remindPass, setRemindPass] = useState('')

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const tab = tabs.current[index]
    if (!tab) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    tab.scrollIntoView({
      inline: 'nearest',
      block: 'nearest',
      behavior: reduce ? 'auto' : 'smooth',
    })
    if (!fromKey.current) return
    fromKey.current = false
    tab.focus()
  }, [index])

  function move(next: number) {
    fromKey.current = true
    setIndex(next)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = offers.length - 1
    if (event.key === 'ArrowRight') move((index + 1) % offers.length)
    else if (event.key === 'ArrowLeft') move((index - 1 + offers.length) % offers.length)
    else if (event.key === 'Home') move(0)
    else if (event.key === 'End') move(last)
    else return
    event.preventDefault()
  }

  async function onRemind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const emailValue = String(new FormData(form).get('email') || '').trim()
    setRemindStatus('loading')
    setRemindError('')
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, pass: offer.name }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Could not save email')
      setRemindPass(offer.name)
      setRemindStatus('done')
    } catch (err) {
      setRemindStatus('error')
      setRemindError(err instanceof Error ? err.message : 'Could not save email')
    }
  }

  const choosing = offers.length > 1
  const closeTitle = close?.title ?? 'Book a time to speak'
  const closeLabel = close?.label ?? 'Book a time to speak'
  const reminding = Boolean(close?.remind)

  return (
    <div className="offer-board">
      <p className="offer-lead">{lead}</p>
      {sibling ? (
        <p className="offer-switch">
          <a href={sibling.href}>{sibling.label}</a>
        </p>
      ) : null}

      {choosing ? (
        <div
          className="offer-rail"
          role="tablist"
          aria-label={railLabel}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
        >
          {offers.map((item, itemIndex) => {
            const selected = itemIndex === index
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[itemIndex] = node
                }}
                id={`${baseId}-tab-${item.id}`}
                className="offer-card"
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(itemIndex)}
              >
                <span className="offer-card-price">{item.price}</span>
                <span className="offer-card-spots">{item.spots}</span>
                <span className="offer-card-name">{item.name}</span>
                <span className="offer-card-fit">{item.fit}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      <div
        id={`${baseId}-panel`}
        role={choosing ? 'tabpanel' : undefined}
        aria-labelledby={choosing ? `${baseId}-tab-${offer.id}` : undefined}
        className="offer-detail"
        tabIndex={choosing ? 0 : undefined}
      >
        <div>
          <p className="cfp-night-meta">
            {offer.price} · {offer.spots}
          </p>
          <h2 className="offer-detail-name">{offer.name}</h2>
          <p className="cfp-copy">{offer.fit}</p>
          <ul className={`cfp-compact offer-gets${offer.gets.length > 6 ? ' is-split' : ''}`}>
            {offer.gets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {offer.shares ? (
          <div className="offer-shares">
            <p className="cfp-night-meta">You share</p>
            <ul className="cfp-compact">
              {offer.shares.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <section className="offer-book" id="book" aria-label={closeTitle}>
        {remindStatus === 'done' ? (
          <div className="offer-book-copy">
            <p className="cfp-kicker">You're on the list</p>
            <h2 className="offer-book-title">We'll write {EVENT.opensOn}</h2>
            <p className="cfp-copy offer-confirm">{ticketMessage('confirm', { pass: remindPass }).text}</p>
          </div>
        ) : (
          <>
            <div className="offer-book-copy">
              <p className="cfp-kicker">{close ? 'Next' : `Opens ${EVENT.opensOn}`}</p>
              <h2 className="offer-book-title">{closeTitle}</h2>
              <p className="cfp-copy">
                {close
                  ? close.body.replace('{name}', offer.name)
                  : `A short call about ${offer.name}. Booking opens ${EVENT.opensOn}.`}
              </p>
            </div>
            {reminding ? (
              <form className="offer-remind" onSubmit={onRemind}>
                <label className="sr-only" htmlFor={`${baseId}-email`}>
                  Email
                </label>
                <input
                  id={`${baseId}-email`}
                  className="cfp-input"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  disabled={remindStatus === 'loading'}
                />
                <button className="harbor-btn" type="submit" disabled={remindStatus === 'loading'}>
                  {remindStatus === 'loading' ? 'Saving…' : closeLabel}
                </button>
                {remindStatus === 'error' ? (
                  <p className="offer-remind-error" role="alert">
                    {remindError}
                  </p>
                ) : null}
              </form>
            ) : (
              <button type="button" className="harbor-btn" disabled>
                {closeLabel}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  )
}
