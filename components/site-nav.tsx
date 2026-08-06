'use client'

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Baltimore Tech Week home">
          <img
            src="/images/btw-mark.svg"
            alt=""
            className="size-9"
            width={36}
            height={36}
          />
          <span className="hidden font-display text-lg uppercase leading-none tracking-wide text-foreground sm:flex sm:flex-col sm:gap-0.5">
            <span>Baltimore</span>
            <span>Tech Week</span>
          </span>
        </a>

        <div className="flex items-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary lg:inline"
            >
              {link.label}
            </a>
          ))}
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-secondary px-5 py-2.5 text-sm"
          >
            {CTA.short}
          </a>
        </div>
      </nav>
    </header>
  )
}
