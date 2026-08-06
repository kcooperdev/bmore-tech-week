'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CTA, EVENT } from '@/lib/data'
import { usePaint } from '@/components/paint-context'

export function StickyRsvp() {
  const { studioOpen } = usePaint()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-rsvp')
    if (!hero) {
      setShow(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!show || studioOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 p-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={EVENT.infoSessionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cta-primary group w-full"
      >
        {CTA.short}
        <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}
