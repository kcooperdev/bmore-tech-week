'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { HarborTopbar } from '@/components/harbor-topbar'
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

const DOMINO = { right: 1018 / 1280, midY: 438 / 720 }
const SIGN_GAP = 32

function objectFraction(value: string) {
  if (value.endsWith('%')) return Number.parseFloat(value) / 100
  if (value === 'left' || value === 'top') return 0
  if (value === 'right' || value === 'bottom') return 1
  return 0.5
}

function placeNightButton(root: HTMLElement) {
  const night = root.querySelector<HTMLElement>('.plate-night')
  const day = root.querySelector<HTMLElement>('.plate-day')
  const button = root.querySelector<HTMLElement>('.night-title > .harbor-btn')
  if (!night || !button) return

  const wide = window.matchMedia('(min-width: 861px)').matches
  if (!wide) {
    button.style.left = ''
    button.style.top = ''
    button.style.right = ''
    night.style.objectPosition = ''
    if (day) day.style.objectPosition = ''
    return
  }

  night.style.objectPosition = ''
  if (day) day.style.objectPosition = ''

  const box = night.getBoundingClientRect()
  const parent = button.offsetParent as HTMLElement | null
  const parentBox = parent?.getBoundingClientRect() ?? box
  const scale = Math.max(box.width / 1280, box.height / 720)
  const drawnWidth = 1280 * scale
  const drawnHeight = 720 * scale
  const [xPos, yPos] = getComputedStyle(night).objectPosition.trim().split(/\s+/)
  const fractionX = objectFraction(xPos || 'center')
  const fractionY = objectFraction(yPos || '58%')
  const offsetX = (box.width - drawnWidth) * fractionX
  const offsetY = (box.height - drawnHeight) * fractionY
  const signRight = offsetX + DOMINO.right * drawnWidth
  const signMid = offsetY + DOMINO.midY * drawnHeight
  const left = signRight + SIGN_GAP
  const top = Math.min(
    Math.max(12, signMid - button.offsetHeight / 2),
    Math.max(12, box.height - button.offsetHeight - 12),
  )

  button.style.left = `${box.left - parentBox.left + left}px`
  button.style.top = `${box.top - parentBox.top + top}px`
  button.style.right = 'auto'
}

export function CycleScene() {
  const pinRef = useRef<HTMLElement>(null)
  const announced = useRef(false)
  const [reduce, setReduce] = useState(false)
  const [mode, setMode] = useState<'sunset' | 'night'>('night')
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
      const { title } = applyCycle(pin, t)
      setHintOn(t < 0.22)
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
      placeNightButton(pin)
      return
    }

    const update = () => {
      const total = pinViewport(pin)
      const p = total <= 0 ? 0 : clamp(-pin.getBoundingClientRect().top / total)
      goTo(p)
      placeNightButton(pin)
    }

    const onSkip = (event: Event) => {
      if (event instanceof MouseEvent) event.preventDefault()
      goToEnd()
    }

    update()
    document.fonts?.ready.then(() => placeNightButton(pin))
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
    <section ref={pinRef} className="harbor-pin" aria-label="Baltimore Tech Week. Charm City CoWeek by day, the conference at night">
      <HarborTopbar current="home" />
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

        <div className={`day-title${hintOn ? ' is-on' : ''}`}>
          <p className="day-kicker">CoWeek</p>
          <p className="day-name">
            <span>Baltimore</span>
            <span>Tech Week</span>
          </p>
          <p className="day-line">Coworking by day</p>
          <p className="day-date">
            <time dateTime="2027-04-26/2027-04-30">April 26–30, 2027</time>
          </p>
          <a className="harbor-btn" href={EVENT.ticketsPath}>
            Come for the week
          </a>
          <button
            className="day-scroll"
            type="button"
            aria-label="Baltimore Tech Week. Scroll into night"
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
        </div>

        <main className="night-title" id="main" tabIndex={-1}>
          <p className="night-kicker">Conference</p>
          <h1>
            <span>Baltimore</span>
            <span>Tech Week</span>
          </h1>
          <p className="night-line">Tech conference by night</p>
          <p className="night-meta">
            <time dateTime="2027-04-26/2027-04-30">April 26–30, 2027</time>
          </p>
          <a className="harbor-btn" href={EVENT.ticketsPath}>
            Come for the week
          </a>
          <div className="night-foot">
            {EVENT.speakerCallOpen ? null : EVENT.submissionsOpen ? (
              <a className="night-cta" href={EVENT.eventsPath}>
                {CTA.viewEvents}
              </a>
            ) : (
              <p id="register" className="coming-soon coming-soon-hero">
                {CTA.comingSoon}
              </p>
            )}
          </div>
        </main>

      </div>
    </section>
  )
}
