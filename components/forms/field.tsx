import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-cream">
        {label}
        {required ? null : <span className="font-normal text-cream/55"> (optional)</span>}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs leading-relaxed text-cream/50">{hint}</span> : null}
    </label>
  )
}

export function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-cream">{label}</legend>
      {children}
      {hint ? <p className="mt-2 text-xs leading-relaxed text-cream/50">{hint}</p> : null}
    </fieldset>
  )
}
