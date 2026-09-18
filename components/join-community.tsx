import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { CTA, EVENT } from '@/lib/data'

export function JoinCommunity() {
  return (
    <section
      id="community"
      className="section-anchor grain relative isolate overflow-hidden bg-purple py-16 md:py-28"
    >
      <div className="night-glow left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 opacity-50" />
      <div className="relative mx-auto max-w-2xl px-4 text-center md:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Tickets coming soon
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,8vw,3.75rem)] uppercase leading-[0.9] text-cream text-balance">
            Come through later
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/80 text-pretty sm:text-lg">
            Nights and tickets land when the rooms lock. Until then, help build it.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/#get-involved" className="btn-cta-primary group w-full sm:w-auto">
              {CTA.getInvolved}
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-cream/70 sm:flex-row sm:gap-8">
            <a
              href={EVENT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              Instagram {EVENT.instagramHandle}
            </a>
            <a
              href={EVENT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              LinkedIn
            </a>
            <a href={`mailto:${EVENT.contactEmail}`} className="transition-colors hover:text-cream">
              {EVENT.contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
