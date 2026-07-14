import { Code2, Palette, Users } from 'lucide-react'

const PILLARS = [
  {
    icon: Code2,
    title: 'Build',
    body: 'Hands-on workshops, hackathons, and demo days where Baltimore ships real software.',
    accent: 'text-primary',
  },
  {
    icon: Palette,
    title: 'Create',
    body: 'Mural jams, generative art, and live paint sessions that treat the city like one giant canvas.',
    accent: 'text-secondary',
  },
  {
    icon: Users,
    title: 'Connect',
    body: 'Mixers, night markets, and rooftop sessions that stitch the whole scene together.',
    accent: 'text-[color:var(--teal-blue)]',
  },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-display text-sm uppercase tracking-widest text-secondary">
              // The Art of Baltimore
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              Art is the <span className="text-primary">heartbeat</span> of this city
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              From Graffiti Alley&apos;s ever-changing walls to Open Walls murals that lit up Station
              North, Baltimore doesn&apos;t hide its creativity — it paints it across whole
              neighborhoods. This is a city that turns alleys into galleries, festivals into
              block parties, and every blank brick into a dare.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              That pulse — DIY, loud, and unmistakably Charm City — is what powers Tech Week.
              For seven days we plug builders, founders, and artists into the same electric
              current that runs through Artscape crowds, Motor House studios, and Fells Point
              stoops. No velvet ropes. Just the city&apos;s creative heart, turned all the way up.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-sm border-2 border-border">
              <img
                src="/images/art-block.png"
                alt="Colorful abstract graffiti mural detail"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 rotate-sticker rounded-sm bg-primary px-5 py-3 font-display text-xl text-primary-foreground shadow-lg md:-left-6">
              Est. Charm City
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-sm border border-border bg-card p-7 transition-colors hover:border-primary"
            >
              <pillar.icon className={`size-9 ${pillar.accent}`} />
              <h3 className="mt-5 font-display text-2xl text-card-foreground">{pillar.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
