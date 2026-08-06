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
          className="h-full w-full object-cover animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-16 pt-28 md:px-8">
        <span className="mb-6 inline-flex w-fit animate-fade-up rotate-sticker items-center gap-2 rounded-sm bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
          {EVENT.dates}
        </span>

        <PaintableWordmark />

        <p className="mt-6 max-w-xl animate-fade-up font-display text-2xl uppercase tracking-wide text-secondary [animation-delay:140ms] sm:text-3xl">
          he<span className="heartbeat-art text-primary">ART</span>beat of Baltimore
        </p>

        <p className="mt-5 max-w-lg animate-fade-up text-lg leading-relaxed text-muted-foreground [animation-delay:200ms] text-pretty">
          Talks, fireside chats, demos, and mixers across Charm City.
        </p>

        <div id="hero-rsvp" className="mt-8 flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:260ms]">
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-base font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-1"
          >
            RSVP for the Info Session
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={EVENT.infoSessionVolunteerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-secondary px-7 py-4 text-base font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-1"
          >
            Volunteer for the Info Session
          </a>
          <a
            href="#what-is"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-cream px-7 py-4 text-base font-bold uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-charcoal"
          >
            Learn More
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 animate-fade-up text-sm font-semibold text-cream [animation-delay:320ms]">
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
              className="flex flex-col gap-1 px-4 py-6 text-center animate-fade-up md:py-8"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              <dt className="order-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-4xl uppercase text-primary md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
