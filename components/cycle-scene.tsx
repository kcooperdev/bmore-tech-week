'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CTA, EVENT } from '@/lib/data'

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function applyCycle(root: HTMLElement, progress: number) {
  const t = clamp(progress)
  const night = clamp((t - 0.16) / 0.52)
  const title = clamp((t - 0.48) / 0.3)
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

  return { night, title }
}

function pinViewport(pin: HTMLElement) {
  return pin.offsetHeight / 2
}

export function CycleScene() {
  const pinRef = useRef<HTMLElement>(null)
  const announced = useRef(false)
  const [reduce, setReduce] = useState(false)
  const [mode, setMode] = useState<'sunset' | 'night'>('night')
  const [isNight, setIsNight] = useState(false)
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
      const { night, title } = applyCycle(pin, t)
      setIsNight(night > 0.5)
      setHintOn(t < 0.22)
      if (title > 0.8 && !announced.current) {
        announced.current = true
        setLive('Baltimore Tech Week, Night Edition')
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

    if (reduce) {
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
    <section ref={pinRef} className="harbor-pin" aria-label="Baltimore harbor from sunset to night">
      <div className="cycle-progress" aria-hidden="true" />
      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      <header className="topbar" inert={isNight}>
        <p className="topbar-mark">Baltimore, MD</p>
        <p className="topbar-dates" id="intro">
          <time dateTime="2027-04-26/2027-04-30">
            <span className="date-full">April 26–30, 2027</span>
            <span className="date-short">Apr 26–30, 2027</span>
          </time>
        </p>
        <p className="coming-soon">
          <span className="soon-full">More details coming soon</span>
          <span className="soon-short">Soon</span>
        </p>
      </header>

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

        <div className="night-title" id="main" tabIndex={-1}>
          <p className="night-kicker">Night Edition</p>
          <h1>
            <span>Baltimore</span>
            <span>Tech Week</span>
          </h1>
          <p className="night-meta">
            <time dateTime="2027-04-26/2027-04-30">April 26 – 30, 2027</time>
            <span className="night-meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{EVENT.nightWindow}</span>
          </p>
          {EVENT.submissionsOpen ? (
            <a className="night-cta" href={EVENT.eventsPath}>
              {CTA.viewEvents}
            </a>
          ) : (
            <p id="register" className="coming-soon coming-soon-hero">
              {CTA.comingSoon}
            </p>
          )}
        </div>

        <button
          className={`scroll-hint${hintOn ? ' is-on' : ''}`}
          type="button"
          aria-label="Scroll into night"
          tabIndex={hintOn ? 0 : -1}
          aria-hidden={!hintOn}
          onClick={() => {
            const pin = pinRef.current
            if (!pin) return
            window.scrollTo({
              top: pin.offsetTop + pinViewport(pin),
              behavior: 'smooth',
            })
          }}
        >
          <span className="scroll-hint-copy">Scroll into night</span>
          <span className="scroll-hint-sub">
            <span className="hint-sub-full">Night Edition · April 26–30, 2027</span>
            <span className="hint-sub-short">Apr 26–30, 2027</span>
          </span>
          <svg className="scroll-hint-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 9.2 12 15l6-5.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
