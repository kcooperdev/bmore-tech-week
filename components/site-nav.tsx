'use client'

import { useState, useEffect } from 'react'
import { EVENT } from '@/lib/data'

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
        scrolled ? 'bg-background/90 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="Baltimore Tech Week home">
          <span className="flex size-9 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-foreground rotate-sticker">
            BTW
          </span>
          <span className="hidden font-display text-lg leading-none text-foreground sm:flex sm:flex-col sm:gap-1">
            <span>Baltimore</span>
            <span>Tech Week</span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          <a
            href="#about"
            className="hidden text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary md:inline"
          >
            About
          </a>
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-secondary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-0.5"
          >
            Info Session
          </a>
        </div>
      </nav>
    </header>
  )
}
