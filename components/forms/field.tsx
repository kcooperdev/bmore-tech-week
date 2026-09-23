import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function RadioChip({
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
    <label className="chip-toggle cursor-pointer" data-on={checked}>
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

export function ChipToggle({
  checked,
  onChange,
  children,
  className,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn('chip-toggle cursor-pointer', className)} data-on={checked}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {children}
    </label>
  )
}

export function Field({
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
    <label className="block">
      <span className="cfp-label mb-1.5 block text-sm font-semibold text-cream">
        {label}
        {required ? null : <span className="cfp-hint font-normal text-cream/70"> (optional)</span>}
      </span>
      {children}
      {error ? (
        <span className="cfp-field-error" id={errorId} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="cfp-hint mt-1.5 block text-xs leading-relaxed text-cream/70">{hint}</span>
      ) : null}
    </label>
  )
}

export function FieldGroup({
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
    <fieldset aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined}>
      <legend className="cfp-label mb-2 text-sm font-semibold text-cream">{label}</legend>
      {children}
      {error ? (
        <p className="cfp-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="cfp-hint mt-2 text-xs leading-relaxed text-cream/70">{hint}</p>
      ) : null}
    </fieldset>
  )
}
