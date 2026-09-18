import { CTA, EVENT } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ComingSoonButton({
  className,
  variant = 'primary',
}: {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}) {
  const styles = {
    primary: 'btn-cta-primary',
    secondary: 'btn-cta-secondary',
    outline: 'btn-cta-outline',
  }

  return (
    <span
      className={cn(styles[variant], 'pointer-events-none cursor-not-allowed opacity-75 hover:translate-y-0', className)}
      aria-disabled="true"
    >
      {CTA.comingSoon}
    </span>
  )
}

export function ComingSoonNotice({
  title = CTA.comingSoon,
  body = 'Host, talk, and crew signups are not open yet. Check back, or reach us if you need us sooner.',
}: {
  title?: string
  body?: string
}) {
  return (
    <div className="panel p-5 sm:p-7">
      <p className="text-lg font-semibold text-cream">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-cream/75">{body}</p>
      <a href={`mailto:${EVENT.contactEmail}`} className="mt-4 inline-block text-sm font-semibold text-gold">
        {EVENT.contactEmail}
      </a>
    </div>
  )
}
