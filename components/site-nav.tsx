'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ComingSoonButton } from '@/components/coming-soon'
import { CTA, EVENT } from '@/lib/data'
import { Wordmark } from '@/components/wordmark'

const BASE_LINKS = [
  { href: '/#how-it-works', label: 'How it works' },
  ...(EVENT.submissionsOpen
    ? [
        { href: EVENT.volunteerSubmitPath, label: 'Volunteer' },
        { href: EVENT.venueSubmitPath, label: 'Host a night' },
      ]
    : []),
]

const MENU_BASE = [
  ...BASE_LINKS,
  ...(EVENT.submissionsOpen ? [{ href: EVENT.speakerSubmitPath, label: 'Give a talk' }] : []),
]

function scrollToHash(href: string) {
  const hash = href.includes('#') ? href.slice(href.indexOf('#')) : ''
  if (!hash) return false
  const target = document.getElementById(hash.slice(1))
  if (!target) return false
  const header = document.querySelector('header')
  const offset = (header instanceof HTMLElement ? header.offsetHeight : 80) + 12
  const top = window.scrollY + target.getBoundingClientRect().top - offset
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  return true
}

export function SiteNav({ hasSchedule = false }: { hasSchedule?: boolean }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const solid = !isHome || scrolled || open

  const links = hasSchedule
    ? [BASE_LINKS[0], { href: EVENT.eventsPath, label: 'Schedule' }, ...BASE_LINKS.slice(1)]
    : BASE_LINKS
  const menuLinks = hasSchedule
    ? [MENU_BASE[0], { href: EVENT.eventsPath, label: 'Schedule' }, ...MENU_BASE.slice(1)]
    : MENU_BASE

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }

    const update = () => setScrolled(window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('hashchange', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('hashchange', update)
    }
  }, [isHome])

  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.classList.remove('nav-open')
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusable = () => {
      const nodes = [
        buttonRef.current,
        ...(panel?.querySelectorAll<HTMLElement>('a, button') ?? []),
      ].filter((node): node is HTMLElement => Boolean(node))
      return nodes
    }

    const items = focusable()
    items[1]?.focus()

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const list = focusable()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement
      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? 'border-b border-gold/20 bg-background'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-3.5">
          <Wordmark onClick={() => setOpen(false)} compact />

          <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {links.map((link) => {
              const active =
                link.href.startsWith('/') &&
                !link.href.includes('#') &&
                (pathname === link.href || pathname.startsWith(`${link.href}/`))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (scrollToHash(link.href)) setScrolled(true)
                  }}
                  className={`relative whitespace-nowrap text-sm font-medium transition-colors ${
                    active ? 'text-cream' : 'text-cream/65 hover:text-cream'
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-gold" aria-hidden />
                  ) : null}
                </Link>
              )
            })}
            {EVENT.submissionsOpen ? (
              <Link href={EVENT.speakerSubmitPath} className="btn-cta-secondary px-4 py-2 text-sm">
                {CTA.submitTalk}
              </Link>
            ) : (
              <ComingSoonButton variant="secondary" className="px-4 py-2 text-sm" />
            )}
          </div>

          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-cream/20 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-[4.25rem] z-[60] flex flex-col bg-background lg:hidden"
        >
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
              {EVENT.datesShort} · {EVENT.nightWindow}
            </p>
            <div className="mt-5 flex flex-col">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setOpen(false)
                    window.setTimeout(() => {
                      if (scrollToHash(link.href)) setScrolled(true)
                    }, 0)
                  }}
                  className="border-b border-cream/10 py-3.5 font-display text-[1.7rem] uppercase leading-none text-cream sm:text-[2rem]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-cream/10 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {EVENT.submissionsOpen ? (
              <>
                <Link
                  href={EVENT.volunteerSubmitPath}
                  onClick={() => setOpen(false)}
                  className="btn-cta-outline"
                >
                  {CTA.submitVolunteer}
                </Link>
                <Link
                  href={EVENT.speakerSubmitPath}
                  onClick={() => setOpen(false)}
                  className="btn-cta-secondary"
                >
                  {CTA.submitTalk}
                </Link>
              </>
            ) : (
              <ComingSoonButton className="col-span-2" />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
