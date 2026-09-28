import { EVENT } from '@/lib/data'

const CORNER_LINKS = [
  { href: EVENT.partnersPath, label: 'Partners', id: 'partners' },
  { href: EVENT.sponsorsPath, label: 'Sponsors', id: 'sponsors' },
  { href: EVENT.ticketsPath, label: 'Tickets', id: 'tickets' },
] as const

export function HarborTopbar({
  current,
  inert = false,
}: {
  current: 'home' | 'week' | 'speakers' | 'partners' | 'sponsors' | 'tickets'
  inert?: boolean
}) {
  const onHome = current === 'home'

  return (
    <header className="topbar" inert={inert || undefined}>
      <nav className="topbar-links topbar-links-start" aria-label="Partners, sponsors, and tickets">
        {CORNER_LINKS.map((link) => (
          <span key={link.id} className="topbar-corner-item">
            <a
              className={`harbor-link${current === link.id ? ' is-current' : ''}`}
              href={link.href}
              aria-current={current === link.id ? 'page' : undefined}
            >
              {link.label}
            </a>
          </span>
        ))}
      </nav>
      {onHome ? null : (
        <nav className="topbar-links" aria-label="Site">
          <a className="topbar-home" href="/" aria-label="Home">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4.5 10.8 12 4.5l7.5 6.3V19a1.2 1.2 0 0 1-1.2 1.2H15v-5.4h-6V20.2H5.7A1.2 1.2 0 0 1 4.5 19v-8.2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>
      )}
    </header>
  )
}
