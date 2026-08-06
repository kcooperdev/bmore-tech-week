import { Reveal } from '@/components/reveal'
import { PARTNERS } from '@/lib/data'

export function Partners() {
  const venue = PARTNERS[0]

  return (
    <section id="partners" className="section-anchor relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="group overflow-hidden rounded-2xl">
              <img
                src={venue.image}
                alt={`${venue.name} in Baltimore`}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                width={1600}
                height={1000}
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <a
              href={venue.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-cream px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5"
              aria-label={`${venue.name} website`}
            >
              <img
                src={venue.logo}
                alt={venue.name}
                className="h-10 w-auto object-contain"
                width={160}
                height={40}
              />
            </a>
            <p className="mt-5 text-base leading-relaxed text-cream">
              {venue.address}
              <br />
              {venue.city}
            </p>
            <a
              href={venue.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-cream"
            >
              4mlk.com →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
