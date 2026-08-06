import { Reveal } from '@/components/reveal'
import { AUDIENCES } from '@/lib/data'

export function WhoShouldAttend() {
  return (
    <section
      id="who"
      className="section-anchor relative overflow-hidden bg-secondary py-16 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-12deg, transparent, transparent 18px, #fdf0d5 18px, #fdf0d5 19px)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="font-playful text-sm font-bold text-cream/80">Pull up a seat</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl text-balance">
              Who should attend?
            </h2>
            <p className="mt-4 max-w-sm font-playful text-base leading-relaxed text-cream/90 text-pretty sm:mt-5 sm:text-lg">
              If any of this sounds like you, come. If it doesn’t, come anyway and tell us what we
              missed.
            </p>
          </Reveal>

          <ul className="flex flex-col gap-5 sm:gap-6 lg:col-span-8 lg:pt-2">
            {AUDIENCES.map((item, i) => (
              <Reveal key={item} delay={50 + i * 70}>
                <li
                  className={`flex items-baseline gap-3 sm:gap-5 ${
                    i % 2 === 0 ? 'lg:translate-x-0' : 'lg:translate-x-8'
                  }`}
                >
                  <span
                    className="shrink-0 font-display text-2xl uppercase leading-none text-cream/35 sm:text-3xl"
                    aria-hidden
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <p className="border-b-2 border-cream/40 pb-3 font-playful text-lg font-bold leading-snug text-cream text-pretty transition-colors hover:border-cream sm:text-xl md:text-2xl">
                    {item}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
