import { Reveal } from '@/components/reveal'
import { AUDIENCES } from '@/lib/data'

export function WhoShouldAttend() {
  return (
    <section id="who" className="section-anchor relative overflow-hidden border-y border-border bg-card py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-secondary/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl uppercase leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl text-balance">
            Who should attend?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            If any of this sounds like you, come. If it doesn’t, come anyway and tell us what we
            missed.
          </p>
        </Reveal>

        <ul className="mt-10 max-w-2xl space-y-4">
          {AUDIENCES.map((item, i) => (
            <Reveal key={item} delay={60 + i * 60}>
              <li className="group flex items-start gap-3 text-lg text-cream transition-transform duration-300 hover:translate-x-1">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-secondary transition-transform duration-300 group-hover:scale-125" aria-hidden />
                <span className="text-pretty">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
