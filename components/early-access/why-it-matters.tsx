'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EARLY_ACCESS } from '@/lib/data'

export function WhyItMatters() {
  const [lit, setLit] = useState(false)

  return (
    <section
      id="why-it-matters"
      className="section-anchor relative isolate overflow-hidden bg-background py-14 sm:py-16 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(199,21,133,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 md:px-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="order-1 lg:order-2 lg:col-span-6">
          <div className="domino-plant">
            <button
              type="button"
              className={`domino-plant-stage ${lit ? 'is-on' : 'is-off'}`}
              aria-pressed={lit}
              aria-label={lit ? 'Turn Domino Sugar sign off' : 'Turn Domino Sugar sign on'}
              onClick={() => setLit((v) => !v)}
            >
              <img
                src="/images/domino-sugar.jpg"
                alt="Domino Sugar plant on the Baltimore harbor"
                className="domino-plant-photo"
                width={1280}
                height={827}
                draggable={false}
              />
              <div className="domino-plant-scrim" aria-hidden />
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 sm:mt-5">
              <label className="domino-switch">
                <span className="domino-switch-copy font-playful text-sm font-bold text-cream">
                  {lit ? 'Sign on' : 'Sign off'}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={lit}
                  aria-label={lit ? 'Turn Domino Sugar sign off' : 'Turn Domino Sugar sign on'}
                  className={`domino-toggle ${lit ? 'is-on' : ''}`}
                  onClick={() => setLit((v) => !v)}
                >
                  <span className="domino-toggle-knob" />
                </button>
              </label>
              <p className="text-[11px] text-muted-foreground">
                Photo: David Robert Crews / Wikimedia
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <p className="font-playful text-sm font-bold text-primary">Why it matters</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl text-balance">
            Why Baltimore Tech Week matters
          </h2>
          <div className="mt-6 max-w-xl space-y-4 sm:mt-8 sm:space-y-5">
            {EARLY_ACCESS.whyMatters.map((line) => (
              <p key={line} className="text-base leading-relaxed text-cream/85 text-pretty sm:text-xl">
                {line}
              </p>
            ))}
          </div>
          <a
            href="#whats-coming"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 font-playful text-sm font-bold text-secondary transition-colors hover:text-cream sm:mt-8"
          >
            See the Vision
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
