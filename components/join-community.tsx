import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CTA, EVENT } from '@/lib/data'

export function JoinCommunity() {
  return (
    <section
      id="community"
      className="section-anchor relative isolate overflow-hidden py-16 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-teal-blue" />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #00afb9 0%, transparent 42%), radial-gradient(circle at 85% 70%, #c71585 0%, transparent 40%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-8 hidden rotate-12 font-display text-[7rem] uppercase leading-none text-cream/10 sm:block md:text-[10rem]"
        aria-hidden
      >
        BTW
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
        <Reveal>
          <p className="font-playful text-sm font-bold text-cream/80">Next step</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl text-balance">
            Join the community
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-cream/85 text-pretty sm:mt-5 sm:text-lg">
            Hit the info session first. Want to help run it? Volunteer below. Then stick around on
            IG or LinkedIn so you catch dates when they drop.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <a
              href={EVENT.infoSessionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-cream px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-charcoal transition-transform hover:-translate-y-1 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
            >
              <span className="sm:hidden">RSVP</span>
              <span className="hidden sm:inline">{CTA.label}</span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={EVENT.infoSessionVolunteerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-cream px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-charcoal sm:w-auto sm:px-7 sm:py-4 sm:text-base"
            >
              Volunteer
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 font-playful text-sm font-bold sm:mt-10 sm:flex-row sm:gap-8">
            <a
              href={EVENT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 transition-colors hover:text-cream"
            >
              Instagram {EVENT.instagramHandle}
            </a>
            <a
              href={EVENT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 transition-colors hover:text-cream"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
