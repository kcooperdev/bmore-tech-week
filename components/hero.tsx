import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ComingSoonButton } from '@/components/coming-soon'
import { CTA, EVENT, STATS } from '@/lib/data'

export function Hero() {
  return (
    <section id="top" className="grain relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-background">
        <img
          src="/images/hero-inner-harbor.jpg"
          alt=""
          className="hidden h-full w-full object-cover object-[80%_50%] brightness-110 sm:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background/70 via-background/10 to-transparent sm:block" />
      </div>

      <div className="mx-auto flex min-h-[min(100svh,54rem)] max-w-7xl flex-col justify-center px-4 pb-28 pt-24 sm:pb-20 sm:pt-32 md:px-8">
        <p className="inline-flex w-fit max-w-full flex-wrap items-center gap-2 border border-gold/35 bg-background/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold backdrop-blur-sm">
          {EVENT.datesShort}
          <span className="text-cream/35" aria-hidden>
            /
          </span>
          {EVENT.nightWindow}
        </p>

        <h1 className="mt-5 max-w-5xl animate-fade-up font-display text-[clamp(2.45rem,12vw,7.5rem)] uppercase leading-[0.88] text-cream text-balance sm:mt-6">
          <span className="block">Baltimore</span>
          <span className="block">
            <span className="text-gold">Tech</span> Week
          </span>
        </h1>

        <div className="mt-6 h-px w-16 bg-gold/80 animate-fade-up [animation-delay:80ms] sm:mt-7" />

        <p className="mt-5 max-w-md animate-fade-up text-base leading-relaxed text-cream/78 [animation-delay:140ms] text-pretty sm:text-lg">
          Five nights in Baltimore, after 6. Tickets, rooms, talks, and crew signups are coming
          soon.
        </p>

        <div id="hero-rsvp" className="mt-8 animate-fade-up [animation-delay:200ms] sm:mt-9">
          {EVENT.submissionsOpen ? (
            <Link href="/#get-involved" className="btn-cta-primary group w-full sm:w-auto">
              {CTA.getInvolved}
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <ComingSoonButton className="w-full sm:w-auto" />
          )}
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-cream/70 [animation-delay:320ms] animate-fade-up sm:mt-10">
          <MapPin className="size-4 text-gold" /> {EVENT.city}
        </p>
      </div>

      <div className="relative border-y border-gold/20 bg-background/70 backdrop-blur-md">
        <dl className="mx-auto grid max-w-7xl grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 px-3 py-5 text-center animate-fade-up sm:px-6 sm:py-7 md:py-8"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <dt className="order-2 text-[10px] font-medium uppercase leading-tight tracking-[0.1em] text-cream/55 sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-[1.65rem] uppercase text-gold sm:text-4xl md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
