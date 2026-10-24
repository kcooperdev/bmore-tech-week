'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { EVENT, involveLink } from '@/lib/data'
import { UpdatesPopup } from '@/components/updates-popup'

const PRIMARY_LINKS = [
  { href: EVENT.weekPath, label: 'The Week', id: 'week' },
  { href: EVENT.whyPath, label: 'Why Baltimore', id: 'why' },
  { href: EVENT.ticketsPath, label: 'Get Tickets', id: 'tickets' },
] as const

const GET_INVOLVED_LINKS = [
  { ...involveLink('speak'), label: 'Give a Talk', id: 'speakers' },
  { ...involveLink('partner'), label: 'Partner', id: 'partners' },
  { ...involveLink('sponsor'), label: 'Sponsor', id: 'sponsors' },
  { ...involveLink('ambassador'), label: 'Ambassador', id: 'ambassadors' },
] as const

type CurrentPage =
  | 'home'
  | 'week'
  | 'events'
  | 'why'
  | 'speakers'
  | 'partners'
  | 'sponsors'
  | 'ambassadors'
  | 'venues'
  | 'volunteers'
  | 'tickets'
  | 'demo'

export function HarborTopbar({
  current,
  inert = false,
}: {
  current: CurrentPage
  inert?: boolean
}) {
  const onHome = current === 'home'
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuId = useId()
  const drawerId = useId()
  const wrapRef = useRef<HTMLSpanElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const involvedActive = GET_INVOLVED_LINKS.some((item) => item.id === current)

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function handleMouseEnter() {
    clearCloseTimer()
    setOpen(true)
  }

  function handleMouseLeave() {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false)
    }, 260)
  }

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  useEffect(() => {
    if (inert) setDrawerOpen(false)
  }, [inert])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  return (
    <>
      <header className="topbar" inert={inert || undefined}>
        <button
          type="button"
          className="topbar-burger"
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          aria-haspopup="dialog"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setDrawerOpen((value) => !value)}
        >
          {drawerOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 7h14M5 12h14M5 17h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        <nav className="topbar-links topbar-links-start topbar-desktop" aria-label="Primary navigation">
          {PRIMARY_LINKS.map((link) => (
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

          <span
            ref={wrapRef}
            className="topbar-corner-item topbar-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`harbor-link topbar-dropdown-btn${involvedActive || open ? ' is-current' : ''}`}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => {
                clearCloseTimer()
                setOpen((prev) => !prev)
              }}
            >
              Get Involved
              <svg className="topbar-caret" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id={menuId}
              className={`topbar-dropdown-menu${open ? ' is-open' : ''}`}
              role="menu"
              aria-label="Get Involved"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {GET_INVOLVED_LINKS.map((item) => (
                <a
                  key={item.id}
                  role="menuitem"
                  href={item.href}
                  className={`topbar-dropdown-item${current === item.id ? ' is-current' : ''}`}
                  aria-current={current === item.id ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </span>
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

      {drawerOpen ? (
        <div className="topbar-drawer-layer">
          <button
            type="button"
            className="topbar-drawer-backdrop"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />
          <nav id={drawerId} className="topbar-drawer" aria-label="Site menu">
            <div className="topbar-drawer-head">
              <p className="topbar-drawer-brand">
                Baltimore <span>Tech Week</span>
              </p>
              <button
                type="button"
                className="topbar-drawer-close"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <p className="topbar-drawer-meta">
              {EVENT.datesShort} · {EVENT.nightWindow}
            </p>
            <div className="topbar-drawer-list">
              {PRIMARY_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`topbar-drawer-link${current === link.id ? ' is-current' : ''}`}
                  aria-current={current === link.id ? 'page' : undefined}
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="topbar-drawer-label">Get Involved</p>
            <div className="topbar-drawer-list">
              {GET_INVOLVED_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`topbar-drawer-link${current === item.id ? ' is-current' : ''}`}
                  aria-current={current === item.id ? 'page' : undefined}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            {onHome ? null : (
              <a className="topbar-drawer-home" href="/" onClick={() => setDrawerOpen(false)}>
                Home
              </a>
            )}
          </nav>
        </div>
      ) : null}

      <UpdatesPopup skipAuto={current === 'demo'} />
    </>
  )
}
