import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EARLY_ACCESS } from '@/lib/data'

export function MissedSession() {
  return (
    <section
      id="missed-session"
      className="section-anchor relative overflow-hidden bg-background py-14 sm:py-16 md:py-28"
    >
      <div
        className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[4.5rem] uppercase leading-none text-secondary/20 sm:-right-8 sm:top-8 sm:text-[9rem] md:right-4 md:text-[12rem] md:text-secondary/15"
        aria-hidden
      >
        Sold
        <br />
        Out
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-stretch gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="ea-ticket flex h-full flex-col justify-between border-2 border-dashed border-cream/40 bg-secondary p-5 sm:p-8">
              <div>
                <p className="font-playful text-[11px] font-bold uppercase tracking-[0.18em] text-cream/75 sm:text-xs">
                  August 27 is sold out
                </p>
                <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] tracking-wide text-cream sm:mt-4 sm:text-5xl text-balance">
                  {EARLY_ACCESS.missedTitle}
                </h2>
                <p className="mt-3 max-w-md font-playful text-base leading-relaxed text-cream/90 text-pretty sm:mt-4 sm:text-lg">
                  {EARLY_ACCESS.missedLead}
                </p>
              </div>
              <a
                href="#early-access-form"
                className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-cream px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-charcoal shadow-[4px_4px_0_#10131a] transition-transform active:translate-y-0.5 sm:mt-8 sm:w-fit sm:hover:-translate-y-1 sm:text-base"
              >
                {EARLY_ACCESS.missedCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-2 border-cream/20 bg-card p-5 sm:p-8">
              <p className="font-playful text-sm font-bold text-primary">Your early access pack</p>
              <ol className="mt-4 space-y-0 sm:mt-6">
                {EARLY_ACCESS.missedPerks.map((perk, i) => (
                  <li
                    key={perk}
                    className="flex gap-3 border-b border-border py-3.5 last:border-b-0 sm:gap-4 sm:py-4"
                  >
                    <span className="font-display text-xl text-secondary sm:text-2xl" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-0.5 text-sm font-semibold leading-snug text-cream sm:pt-1 sm:text-lg">
                      {perk}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
