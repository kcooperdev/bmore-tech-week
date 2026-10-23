import { EVENT, applyLink, isApplyOpenNow, type ApplyKind } from '@/lib/data'

export function ApplyLink({
  kind,
  className,
  children,
  query,
}: {
  kind: ApplyKind
  className?: string
  children: React.ReactNode
  query?: string
}) {
  const { href, external } = applyLink(kind)
  const url = query ? `${href}?${query}` : href

  if (!isApplyOpenNow()) {
    return (
      <span className="apply-cta-closed">
        <span className={`${className || ''} is-apply-closed`.trim()} aria-disabled="true">
          {children}
        </span>
        <span className="apply-cta-closed-note">Opens {EVENT.opensOn}</span>
      </span>
    )
  }

  return (
    <a
      href={url}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
