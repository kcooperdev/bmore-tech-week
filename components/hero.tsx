import { MapPin, ArrowRight } from 'lucide-react'
import { EVENT, STATS } from '@/lib/data'
import { PaintableWordmark } from '@/components/paintable-wordmark'

export function Hero() {
  return (
    <section id="top" className="grain relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-mural.png"
          alt="Baltimore Tech Week Charm City skyline backdrop"
          className="h-full w-full object-cover object-[center_30%] animate-hero-zoom sm:object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-28 pt-24 sm:pb-16 sm:pt-28 md:px-8">
        <span className="mb-4 inline-flex w-fit max-w-full animate-fade-up rotate-sticker items-center gap-2 rounded-sm bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground sm:mb-6 sm:px-4 sm:py-2 sm:text-xs">
          {EVENT.dates}
        </span>

        <PaintableWordmark />

        <p className="mt-5 max-w-xl animate-fade-up font-display text-xl uppercase tracking-wide text-secondary [animation-delay:140ms] sm:mt-6 sm:text-2xl md:text-3xl">
          he<span className="heartbeat-art text-primary">ART</span>beat of Baltimore
        </p>

        <p className="mt-4 max-w-lg animate-fade-up text-base leading-relaxed text-muted-foreground [animation-delay:200ms] text-pretty sm:mt-5 sm:text-lg">
          Talks, fireside chats, demos, and mixers across Charm City.
        </p>

        <div
          id="hero-rsvp"
          className="mt-7 flex w-full flex-col gap-3 animate-fade-up [animation-delay:260ms] sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-1 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
          >
            <span className="sm:hidden">RSVP Info Session</span>
            <span className="hidden sm:inline">RSVP for the Info Session</span>
            <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 sm:size-5" />
          </a>
          <a
            href={EVENT.infoSessionVolunteerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-1 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
          >
            <span className="sm:hidden">Volunteer</span>
            <span className="hidden sm:inline">Volunteer for the Info Session</span>
          </a>
          <a
            href="#what-is"
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-cream px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-charcoal sm:w-auto sm:px-7 sm:py-4 sm:text-base"
          >
            Learn More
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 animate-fade-up text-sm font-semibold text-cream [animation-delay:320ms] sm:mt-10">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-secondary" /> {EVENT.city}
          </span>
        </div>
      </div>

      <div className="relative border-y border-border bg-charcoal/80 backdrop-blur">
        <dl className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 px-2 py-5 text-center animate-fade-up sm:px-4 sm:py-6 md:py-8"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <dt className="order-2 text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-3xl uppercase text-primary sm:text-4xl md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
