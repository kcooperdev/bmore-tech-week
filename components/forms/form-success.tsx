import Link from 'next/link'
import { Check } from 'lucide-react'
import { CTA, EVENT } from '@/lib/data'

const ROLES = [
  { id: 'host' as const, href: EVENT.venueSubmitPath, label: CTA.submitVenue },
  { id: 'talk' as const, href: EVENT.speakerSubmitPath, label: CTA.submitTalk },
  { id: 'crew' as const, href: EVENT.volunteerSubmitPath, label: CTA.submitVolunteer },
]

export function FormSuccess({
  title,
  body,
  current,
  onReset,
  resetLabel,
}: {
  title: string
  body: string
  current: (typeof ROLES)[number]['id']
  onReset: () => void
  resetLabel: string
}) {
  const others = ROLES.filter((role) => role.id !== current)

  return (
    <div className="panel p-5 sm:p-7" role="status">
      <p className="inline-flex items-center gap-2 text-lg font-semibold text-cream">
        <Check className="size-5 text-gold" aria-hidden />
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-cream/80">{body}</p>
      <p className="mt-4 text-sm leading-relaxed text-cream/65">
        We read every one. If it fits a night, we email you. Nothing else to do right now.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          className="text-sm font-semibold text-gold underline-offset-2 hover:underline"
          onClick={onReset}
        >
          {resetLabel}
        </button>
        {others.map((role) => (
          <Link
            key={role.id}
            href={role.href}
            className="text-sm font-semibold text-cream/70 underline-offset-2 hover:text-cream hover:underline"
          >
            {role.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
