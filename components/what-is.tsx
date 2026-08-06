import { Reveal } from '@/components/reveal'
import { VISION } from '@/lib/data'

export function WhatIs() {
  return (
    <section
      id="what-is"
      className="section-anchor relative overflow-hidden bg-background py-16 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-primary md:w-2"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/4 size-[22rem] rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="font-playful text-sm font-bold text-primary">The short version</p>
          <h2 className="mt-3 max-w-md font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl text-balance">
            What is Baltimore Tech Week?
          </h2>
        </Reveal>

        <ol className="lg:col-span-7">
          {VISION.map((item, i) => (
            <Reveal key={item} delay={70 + i * 60}>
              <li className="group grid grid-cols-[auto_1fr] gap-4 border-t border-primary/25 py-5 first:border-t-0 first:pt-0 sm:gap-6 sm:py-6">
                <span className="font-display text-3xl leading-none text-primary/50 transition-colors group-hover:text-primary sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="max-w-xl text-base leading-relaxed text-cream/85 text-pretty sm:text-lg">
                  {item}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
