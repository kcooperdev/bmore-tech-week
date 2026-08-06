import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CTA, EVENT } from '@/lib/data'

export function JoinCommunity() {
  return (
    <section id="community" className="section-anchor relative isolate overflow-hidden py-14 md:py-28">
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,175,185,0.14),_transparent_55%)]" />
      <div className="ambient-pulse pointer-events-none absolute bottom-0 left-1/2 -z-10 size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:size-[28rem]" aria-hidden />

      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl uppercase tracking-wide text-cream sm:text-5xl text-balance">
            Join the community
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:mt-5 sm:text-lg">
            Hit the info session first. Then stick around on IG or LinkedIn so you catch dates when
            they drop.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={EVENT.infoSessionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-primary group w-full sm:w-auto"
            >
              <span className="sm:hidden">RSVP Info Session</span>
              <span className="hidden sm:inline">{CTA.label}</span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={EVENT.infoSessionVolunteerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-secondary w-full sm:w-auto"
            >
              <span className="sm:hidden">Volunteer</span>
              <span className="hidden sm:inline">{CTA.volunteer}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-7 flex flex-col gap-3 text-sm sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            <a
              href={EVENT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Instagram {EVENT.instagramHandle}
            </a>
            <a
              href={EVENT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
