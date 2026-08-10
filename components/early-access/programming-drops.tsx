import { Lock } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { EARLY_ACCESS, EVENT } from '@/lib/data'

export function ProgrammingDrops() {
  return (
    <section
      id="programming"
      className="section-anchor relative overflow-hidden bg-charcoal py-14 sm:py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(199,21,133,0.18),_transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-4 md:px-8">
        <Reveal>
          <div className="ea-vault border-2 border-secondary/60 bg-background/80 px-5 py-8 text-center shadow-[6px_6px_0_var(--secondary)] backdrop-blur-sm sm:px-10 sm:py-14 sm:shadow-[8px_8px_0_var(--secondary)]">
            <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full border-2 border-secondary bg-secondary/20 text-secondary sm:size-14">
              <Lock className="size-5 sm:size-6" strokeWidth={2.5} />
            </div>
            <p className="mt-4 font-playful text-xs font-bold uppercase tracking-[0.2em] text-secondary sm:mt-5 sm:text-sm">
              Vault sealed
            </p>
            <h2 className="mt-3 font-display text-[1.85rem] uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl text-balance">
              Programming drops after {EVENT.infoSessionDate}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:mt-5 sm:text-lg">
              {EARLY_ACCESS.programmingNote}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cream/85 text-pretty sm:text-lg">
              {EARLY_ACCESS.programmingSupport}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
