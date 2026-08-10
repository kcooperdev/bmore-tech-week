'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CTA } from '@/lib/data'

export function EarlyAccessStickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('ea-hero-cta')
    const form = document.getElementById('early-access-form')
    if (!hero) {
      setShow(true)
      return
    }

    const sync = () => {
      const heroVisible = hero.getBoundingClientRect().bottom > 72
      const formRect = form?.getBoundingClientRect()
      const formInView =
        !!formRect && formRect.top < window.innerHeight * 0.72 && formRect.bottom > 100
      setShow(!heroVisible && !formInView)
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  if (!show) return null

  return (
    <div className="ea-sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-secondary/50 bg-background/95 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 md:px-8">
        <p className="hidden font-playful text-sm font-bold text-cream sm:block">
          Can’t make Aug 27? You’re still early.
        </p>
        <a
          href="#early-access-form"
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-secondary px-5 py-3 text-sm font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          {CTA.earlyAccess}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}
