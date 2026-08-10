'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CTA, EVENT } from '@/lib/data'

const LINKS = [
  { href: '#what-is', label: 'About' },
  { href: '#who', label: 'Who' },
  { href: '#partners', label: 'Venue' },
  { href: '#community', label: 'Community' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-border/50 bg-background/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-3.5">
        <a href="#top" className="shrink-0" aria-label="Baltimore Tech Week home">
          <img
            src="/images/btw-mark.svg"
            alt=""
            className="size-9 sm:size-10"
            width={40}
            height={40}
          />
        </a>

        <div className="flex shrink-0 items-center gap-3 md:gap-5 lg:gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary lg:inline"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={EVENT.earlyAccessPath}
            title={CTA.earlyAccessNav}
            className="hidden text-sm font-bold uppercase tracking-wide text-secondary transition-colors hover:text-cream lg:inline"
          >
            {CTA.earlyAccessShort}
          </Link>
          <Link
            href={EVENT.earlyAccessPath}
            title={CTA.earlyAccessNav}
            className="inline-flex items-center rounded-sm bg-secondary px-3 py-2 text-xs font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm lg:hidden"
          >
            {CTA.earlyAccessShort}
          </Link>
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-outline hidden px-4 py-2 text-xs sm:inline-flex sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {CTA.short}
          </a>
        </div>
      </nav>
    </header>
  )
}
