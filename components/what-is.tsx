import { Reveal } from '@/components/reveal'
import { VISION } from '@/lib/data'

export function WhatIs() {
  return (
    <section id="what-is" className="section-anchor relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl uppercase leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl text-balance">
            What is Baltimore Tech Week?
          </h2>
        </Reveal>

        <ul className="mt-10 max-w-2xl space-y-5">
          {VISION.map((item, i) => (
            <Reveal key={item} delay={80 + i * 70}>
              <li className="flex items-start gap-4 text-lg leading-relaxed text-muted-foreground">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-pretty">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
