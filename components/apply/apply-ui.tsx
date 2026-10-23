'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { EVENT } from '@/lib/data'

export function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export function ApplyField({
  label,
  hint,
  required,
  error,
  errorId,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  error?: string
  errorId?: string
  children: ReactNode
}) {
  return (
    <label className="apply-field">
      <span className="apply-label">
        {label}
        {required ? <span className="apply-req" aria-hidden="true"> *</span> : <span className="apply-opt"> optional</span>}
      </span>
      {children}
      {error ? (
        <span className="apply-error" id={errorId} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="apply-hint">{hint}</span>
      ) : null}
    </label>
  )
}

export function ApplyGroup({
  label,
  hint,
  error,
  errorId,
  children,
}: {
  label: string
  hint?: string
  error?: string
  errorId?: string
  children: ReactNode
}) {
  return (
    <fieldset className="apply-field" aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined}>
      <legend className="apply-label">{label}</legend>
      {children}
      {error ? (
        <p className="apply-error" id={errorId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="apply-hint">{hint}</p>
      ) : null}
    </fieldset>
  )
}

export function ApplySelect({
  name,
  value,
  onChange,
  placeholder,
  options,
  error,
  errorId,
}: {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: readonly string[] | readonly { id: string; label: string }[]
  error?: string
  errorId?: string
}) {
  return (
    <span className="apply-select-wrap">
      <select
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`apply-input apply-select${error ? ' is-invalid' : ''}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const id = typeof option === 'string' ? option : option.id
          const label = typeof option === 'string' ? option : option.label
          return (
            <option key={id} value={id}>
              {label}
            </option>
          )
        })}
      </select>
    </span>
  )
}

export function ApplyChip({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: () => void
  children: ReactNode
}) {
  return (
    <label className="apply-chip" data-on={checked}>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {children}
    </label>
  )
}

export const WORK_LINK_KINDS = ['Talk', 'Article', 'Video', 'Deck', 'Event', 'Press', 'Other'] as const

export type WorkLink = {
  id: string
  kind: (typeof WORK_LINK_KINDS)[number]
  url: string
  note: string
}

export function emptyWorkLink(kind: WorkLink['kind'] = 'Talk'): WorkLink {
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `link-${Date.now()}-${Math.random()}`
  return { id, kind, url: '', note: '' }
}

export function formatWorkLinks(links: WorkLink[]) {
  return links
    .filter((item) => item.url.trim() || item.note.trim())
    .map((item) => [item.kind, item.url.trim(), item.note.trim()].filter(Boolean).join(' · '))
    .join('\n')
}

export function ApplyLinkList({
  label,
  hint,
  links,
  onChange,
  errors,
}: {
  label: string
  hint?: string
  links: WorkLink[]
  onChange: (links: WorkLink[]) => void
  errors?: Record<string, string>
}) {
  function update(id: string, patch: Partial<WorkLink>) {
    onChange(links.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  return (
    <div className="apply-field">
      <p className="apply-label">
        {label}
        <span className="apply-opt"> optional</span>
      </p>
      {hint ? <p className="apply-hint apply-hint-top">{hint}</p> : null}
      <div className="apply-link-list">
        {links.map((item, index) => {
          const urlError = errors?.[item.id]
          return (
            <div key={item.id} className="apply-link-card">
              <div className="apply-link-head">
                <label className="apply-link-kind apply-select-wrap">
                  <span className="sr-only">Type for item {index + 1}</span>
                  <select
                    className="apply-input apply-select"
                    value={item.kind}
                    onChange={(event) => update(item.id, { kind: event.target.value as WorkLink['kind'] })}
                  >
                    {WORK_LINK_KINDS.map((kind) => (
                      <option key={kind} value={kind}>
                        {kind}
                      </option>
                    ))}
                  </select>
                </label>
                {links.length > 1 ? (
                  <button
                    type="button"
                    className="apply-link-remove"
                    onClick={() => onChange(links.filter((link) => link.id !== item.id))}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <label>
                <span className="sr-only">Link {index + 1}</span>
                <input
                  className={`apply-input${urlError ? ' is-invalid' : ''}`}
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://"
                  value={item.url}
                  onChange={(event) => update(item.id, { url: event.target.value })}
                  aria-invalid={urlError ? true : undefined}
                />
              </label>
              <label>
                <span className="sr-only">Note {index + 1}</span>
                <input
                  className="apply-input"
                  type="text"
                  placeholder="What is this? A meetup talk, a write-up, a deck…"
                  value={item.note}
                  onChange={(event) => update(item.id, { note: event.target.value })}
                />
              </label>
              {urlError ? (
                <p className="apply-error" role="alert">
                  {urlError}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
      <button
        type="button"
        className="apply-link-add"
        onClick={() => onChange([...links, emptyWorkLink(links[links.length - 1]?.kind || 'Talk')])}
      >
        <span className="apply-link-plus" aria-hidden="true">
          +
        </span>
        Add a link
      </button>
    </div>
  )
}

export function ApplyRadio({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <label className="apply-chip" data-on={checked}>
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      {children}
    </label>
  )
}

export function ApplyWizard({
  steps,
  step,
  onStep,
  children,
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  submitting,
  error,
}: {
  steps: readonly { id: string; label: string }[]
  step: number
  onStep: (index: number) => void
  children: ReactNode
  onBack: () => void
  onNext: () => void
  nextLabel: string
  nextDisabled?: boolean
  submitting?: boolean
  error?: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const last = step === steps.length - 1

  useEffect(() => {
    const root = panelRef.current
    if (!root) return
    const focusable = root.querySelector<HTMLElement>('input, select, textarea, button')
    focusable?.focus()
    root.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  return (
    <div className="apply-card">
      <ol className="apply-steps" aria-label="Application steps">
        {steps.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className={`apply-step${index === step ? ' is-current' : ''}${index < step ? ' is-done' : ''}`}
              onClick={() => index < step && onStep(index)}
              disabled={index > step}
            >
              <span className="apply-step-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="apply-step-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="apply-progress" aria-hidden="true">
        <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="apply-panel" ref={panelRef}>
        <p className="apply-panel-kicker">
          Step {step + 1} of {steps.length}
        </p>
        <h2 className="apply-panel-title">{steps[step]?.label}</h2>
        {children}
      </div>

      {error ? (
        <p className="apply-error apply-banner" role="alert">
          {error}
        </p>
      ) : null}

      <div className="apply-actions">
        {step > 0 ? (
          <button type="button" className="apply-btn apply-btn-ghost" onClick={onBack} disabled={submitting}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type={last ? 'submit' : 'button'}
          className="apply-btn"
          onClick={last ? undefined : onNext}
          disabled={nextDisabled || submitting}
        >
          {submitting ? 'Sending…' : nextLabel}
        </button>
      </div>
    </div>
  )
}

export function ApplySuccess({
  title,
  children,
  onAgain,
  againLabel,
  email,
}: {
  title: string
  children: ReactNode
  onAgain: () => void
  againLabel: string
  email?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="apply-card apply-success" role="status" aria-live="polite">
      <p className="apply-kicker">We got it</p>
      <p className="apply-panel-title" ref={ref} tabIndex={-1}>
        {title}
      </p>
      <div className="apply-success-copy">{children}</div>
      {email ? (
        <p className="apply-success-inbox">
          Watch <strong>{email}</strong>. Mail comes from {EVENT.contactEmail}.
        </p>
      ) : null}
      <button type="button" className="apply-btn apply-btn-ghost" onClick={onAgain}>
        {againLabel}
      </button>
    </div>
  )
}

export function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="apply-review">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
