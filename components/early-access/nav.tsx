'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#missed-session', label: 'Can’t make it?' },
  { href: '#whats-coming', label: 'About' },
  { href: '#who-for', label: 'Community' },
  { href: '#contact', label: 'Contact' },
]

export function EarlyAccessNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-border/50 bg-background/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-3.5">
        <Link href="/" className="shrink-0" aria-label="Baltimore Tech Week home">
          <img
            src="/images/btw-mark.svg"
            alt=""
            className="size-9 sm:size-10"
            width={40}
            height={40}
          />
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {LINKS.filter((l) => l.label !== 'Can’t make it?').map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#partners"
            className="text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            Partners
          </a>
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            Main site
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-sm border border-border text-cream lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[3.75rem] z-50 flex flex-col bg-background lg:hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <p className="font-playful text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              Menu
            </p>
            <div className="mt-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-sm border-b border-border/60 px-1 py-4 font-display text-2xl uppercase tracking-wide text-cream"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-border px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-center text-sm font-semibold text-muted-foreground"
            >
              ← Back to main site
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
