export function HarborTopbar({
  current,
  inert = false,
}: {
  current: 'home' | 'week' | 'speakers'
  inert?: boolean
}) {
  const onHome = current === 'home'

  return (
    <header className="topbar" inert={inert || undefined}>
      <nav className="topbar-links" aria-label="Site">
        <a
          className={`topbar-home${onHome ? ' is-current' : ''}`}
          href="/"
          aria-label="Home"
          aria-current={onHome ? 'page' : undefined}
        >
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
    </header>
  )
}
