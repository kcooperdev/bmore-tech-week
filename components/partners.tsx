import { Reveal } from '@/components/reveal'
import { PARTNERS } from '@/lib/data'

export function Partners() {
  const venue = PARTNERS[0]

  return (
    <section id="partners" className="section-anchor relative overflow-hidden bg-background">
      <div className="relative min-h-[70svh] md:min-h-[78svh]">
        <img
          src={venue.image}
          alt={`${venue.name} in Baltimore`}
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-4 py-14 md:min-h-[78svh] md:px-8 md:py-20">
          <Reveal>
            <p className="font-playful text-sm font-bold text-primary">Info session host</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl">
              Meet at 4MLK
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-end sm:gap-8">
              <a
                href={venue.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-sm bg-cream px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5"
                aria-label={`${venue.name} website`}
              >
                <img
                  src={venue.logo}
                  alt={venue.name}
                  className="h-9 w-auto object-contain sm:h-10"
                  width={160}
                  height={40}
                />
              </a>
              <div>
                <p className="text-sm leading-relaxed text-cream/90 sm:text-base">
                  {venue.address}
                  <br />
                  {venue.city}
                </p>
                <a
                  href={venue.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center font-playful text-sm font-bold text-primary transition-colors hover:text-cream"
                >
                  4mlk.com →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
