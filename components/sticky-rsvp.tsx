'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CTA } from '@/lib/data'

export function StickyRsvp() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-rsvp')
    if (!hero) {
      setShow(true)
      return
    }

    const update = (visible: boolean) => {
      setShow(!visible && window.scrollY > 120)
    }

    const observer = new IntersectionObserver(
      ([entry]) => update(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(hero)

    const onScroll = () => {
      const rect = hero.getBoundingClientRect()
      const visible = rect.top < window.innerHeight && rect.bottom > 0
      update(visible)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('sticky-cta-on', show)
    return () => document.documentElement.classList.remove('sticky-cta-on')
  }, [show])

  if (!show) return null

  return (
    <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-background/92 p-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Link href="/#get-involved" className="btn-cta-primary group w-full">
        {CTA.getInvolved}
        <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
