import { ArrowRight } from 'lucide-react'
import { CTA, EARLY_ACCESS, EVENT } from '@/lib/data'

export function EarlyAccessHero() {
  return (
    <section id="top" className="grain relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-mural.png"
          alt=""
          className="h-full w-full object-cover object-[center_28%] animate-hero-zoom sm:object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/45 to-transparent max-md:via-background/70" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary/30 to-transparent sm:h-40 sm:from-secondary/25" />
      </div>

      {/* Mobile: shorter stage; desktop: full viewport */}
      <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-4 pb-[7.5rem] pt-24 sm:min-h-[100svh] sm:justify-center sm:pb-20 sm:pt-32 md:px-8">
        <div className="animate-fade-up flex flex-wrap items-center gap-2">
          <span className="inline-flex rotate-sticker items-center rounded-sm bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground sm:text-xs">
            Aug 27 sold out
          </span>
          <span className="font-playful text-sm font-bold text-primary sm:text-base">
            {EARLY_ACCESS.heroEyebrow}
          </span>
        </div>

        <h1 className="mt-3 max-w-4xl animate-fade-up font-display text-[2.35rem] uppercase leading-[0.95] tracking-wide text-cream text-shadow-pop [animation-delay:80ms] sm:mt-5 sm:text-6xl md:text-7xl lg:text-8xl text-balance">
          <span className="sm:hidden">Curated community, culture, and tech.</span>
          <span className="hidden sm:inline">{EARLY_ACCESS.heroTitle}</span>
        </h1>
        <p className="mt-4 max-w-xl animate-fade-up text-base leading-relaxed text-cream/85 [animation-delay:140ms] text-pretty sm:mt-6 sm:text-lg">
          {EARLY_ACCESS.heroSupport}
        </p>

        <div id="ea-hero-cta" className="mt-7 animate-fade-up [animation-delay:220ms] sm:mt-10">
          <a
            href="#early-access-form"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-secondary-foreground shadow-[4px_4px_0_var(--primary)] transition-transform active:translate-y-0.5 sm:w-auto sm:px-7 sm:py-4 sm:text-base sm:hover:-translate-y-1"
          >
            {CTA.earlyAccess}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
          </a>
        </div>

        <p className="mt-6 animate-fade-up text-sm font-semibold text-muted-foreground [animation-delay:280ms] sm:mt-8">
          {EVENT.dates} · {EVENT.city}
        </p>
      </div>
    </section>
  )
}
