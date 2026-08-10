import {
  Heart,
  Mic2,
  Moon,
  MonitorPlay,
  MessagesSquare,
  PartyPopper,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EARLY_ACCESS } from '@/lib/data'

const ICONS = [Mic2, MonitorPlay, MessagesSquare, PartyPopper, Moon, Heart] as const

export function WhatsComing() {
  return (
    <section
      id="whats-coming"
      className="section-anchor relative overflow-hidden bg-background py-14 sm:py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="font-playful text-sm font-bold text-primary">Experience, not a schedule dump</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl text-balance">
            What’s coming
          </h2>
        </Reveal>
      </div>

      {/* Mobile: horizontal snap cards */}
      <div className="mt-8 sm:hidden">
        <p className="mb-3 px-4 font-playful text-xs font-bold text-cream/55">Swipe the experiences →</p>
        <ul className="ea-snap-row flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
          {EARLY_ACCESS.whatsComing.map((item, i) => {
            const Icon = ICONS[i] ?? Heart
            return (
              <li
                key={item}
                className="ea-snap-card w-[78vw] max-w-[19rem] shrink-0 snap-center border border-cream/20 bg-card p-5"
              >
                <Icon className="size-7 text-primary" strokeWidth={2} aria-hidden />
                <p className="mt-4 text-base font-semibold leading-snug text-cream text-pretty">{item}</p>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Desktop: marquee + mosaic */}
      <div className="mt-10 hidden md:mt-14 sm:block">
        <div className="ea-marquee" aria-hidden>
          <div className="ea-marquee-track">
            {[...EARLY_ACCESS.whatsComing, ...EARLY_ACCESS.whatsComing].map((item, i) => (
              <span key={`${item}-${i}`} className="ea-marquee-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-8 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 md:mt-10 md:gap-4 md:px-8 lg:grid-cols-3">
          {EARLY_ACCESS.whatsComing.map((item, i) => {
            const Icon = ICONS[i] ?? Heart
            return (
              <Reveal key={item} delay={40 + i * 50}>
                <li className="ea-mosaic-tile group relative min-h-[8.5rem] overflow-hidden border border-cream/15 bg-card/80 p-5 transition-colors hover:border-primary/50 sm:min-h-[9.5rem] sm:p-6">
                  <Icon
                    className="size-8 text-primary/55 transition-colors group-hover:text-primary sm:size-9"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="relative mt-4 text-sm leading-snug text-cream text-pretty sm:text-base">
                    {item}
                  </p>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
