'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { HarborTopbar } from '@/components/harbor-topbar'
import { EVENT } from '@/lib/data'

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function applyCycle(root: HTMLElement, progress: number) {
  const t = clamp(progress)
  const night = clamp((t - 0.16) / 0.52)
  const title = clamp((t - 0.42) / 0.34)
  const hint = clamp(1 - t / 0.22)
  const copy = night > 0.45 ? '#f3ead7' : '#16120c'

  root.style.setProperty('--day', String(1 - night))
  root.style.setProperty('--night', String(night))
  root.style.setProperty('--title', String(title))
  root.style.setProperty('--hint', String(hint))
  root.style.setProperty('--progress', String(t))
  root.style.setProperty('--copy', copy)
  document.documentElement.style.setProperty('--copy', copy)
  root.classList.toggle('is-night', night > 0.5)
  root.querySelector('.scroll-hint')?.classList.toggle('is-on', hint > 0.2)
  document.documentElement.style.background = night > 0.5 ? '#070b16' : '#1a4d6a'

  const theme = document.querySelector('meta[name="theme-color"]')
  if (theme) theme.setAttribute('content', night > 0.5 ? '#070b16' : '#2f7fa8')

  return { night, title, hint }
}

function pinViewport(pin: HTMLElement) {
  return pin.offsetHeight / 2
}

function navToneAt(y: number) {
  const bands = [
    ['.ed-cream-section', 'light'],
    ['.ed-dark-showcase', 'dark'],
    ['.ed-nights-strip', 'dark'],
    ['.ed-sky-band', 'sky'],
    ['.harbor-footer', 'sunset'],
  ] as const

  for (const [selector, tone] of bands) {
    const el = document.querySelector(selector)
    if (!el) continue
    const box = el.getBoundingClientRect()
    if (box.top <= y && box.bottom > y) return tone
  }

  return 'dark'
}

export function CycleScene() {
  const pinRef = useRef<HTMLElement>(null)
  const announced = useRef(false)
  const [reduce, setReduce] = useState(false)
  const [mode, setMode] = useState<'sunset' | 'night'>('night')
  const [navVisible, setNavVisible] = useState(false)
  const [hintOn, setHintOn] = useState(true)
  const [live, setLive] = useState('')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduce(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const pin = pinRef.current
    if (!pin) return

    const goTo = (t: number) => {
      const { title, hint } = applyCycle(pin, t)
      const pastPin = pin.getBoundingClientRect().bottom <= 48
      pin.classList.toggle('is-past', pastPin)
      pin.dataset.navTone = pastPin ? navToneAt(56) : 'night'
      setNavVisible(title > 0.25 || pastPin)
      setHintOn(hint > 0.2 && !pastPin)
      if (title > 0.8 && !announced.current) {
        announced.current = true
        setLive('Baltimore Tech Week, the conference')
      }
      if (title < 0.2) {
        announced.current = false
        setLive('')
      }
    }

    const goToEnd = () => {
      window.scrollTo({ top: pin.offsetTop + pinViewport(pin) })
      goTo(1)
      document.getElementById('main')?.focus()
    }

    const reduced = reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      goTo(mode === 'night' ? 1 : 0)
      return
    }

    const update = () => {
      const total = pinViewport(pin)
      const p = total <= 0 ? 0 : clamp(-pin.getBoundingClientRect().top / total)
      goTo(p)
    }

    const onSkip = (event: Event) => {
      if (event instanceof MouseEvent) event.preventDefault()
      goToEnd()
    }

    update()
    if (window.location.hash === '#main') goToEnd()

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('hashchange', goToEnd)
    document.querySelector('a[href="#main"]')?.addEventListener('click', onSkip)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('hashchange', goToEnd)
      document.querySelector('a[href="#main"]')?.removeEventListener('click', onSkip)
    }
  }, [reduce, mode])

  return (
    <section
      ref={pinRef}
      className="harbor-pin"
      aria-label="Baltimore Tech Week. Five nights of conference programming across the city."
    >
      <HarborTopbar current="home" inert={!navVisible} />
      <div className="cycle-progress" aria-hidden="true" />
      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      {reduce ? (
        <div className="mode-toggle">
          <button type="button" aria-pressed={mode === 'sunset'} onClick={() => setMode('sunset')}>
            Sunset
          </button>
          <button type="button" aria-pressed={mode === 'night'} onClick={() => setMode('night')}>
            Night
          </button>
        </div>
      ) : null}

      <div className="harbor-fixed">
        <Image
          className="plate plate-day"
          src="/images/harbor-sunset.png"
          alt="Painted Baltimore harbor at sunset, with the World Trade Center, National Aquarium, and Domino Sugars."
          fill
          sizes="100vw"
          priority
          quality={78}
        />
        <Image
          className="plate plate-night"
          src="/images/harbor-night.png"
          alt=""
          fill
          sizes="100vw"
          quality={78}
          aria-hidden
        />
        <div className="plate-veil" />

        <button
          className={`day-scroll day-scroll-cue${hintOn ? ' is-on' : ''}`}
          type="button"
          aria-label="Scroll into Baltimore Tech Week"
          tabIndex={hintOn ? 0 : -1}
          onClick={() => {
            const pin = pinRef.current
            if (!pin) return
            window.scrollTo({
              top: pin.offsetTop + pinViewport(pin),
              behavior: 'smooth',
            })
          }}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              d="M6 8.5 16 17.5 26 8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 17 16 26 26 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <main className="night-title" id="main" tabIndex={-1}>
          <h1>
            <span>Baltimore</span>
            <span>
              <span className="night-title-accent">Tech</span> Week
            </span>
          </h1>
          <p className="night-meta">
            <time dateTime="2027-04-26/2027-04-30">April 26–30, 2027</time>
          </p>
        </main>
      </div>
    </section>
  )
}
