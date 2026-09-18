import { Reveal } from '@/components/reveal'
import { HOW_IT_WORKS } from '@/lib/data'

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-anchor relative overflow-hidden bg-background py-16 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
            The short version
          </p>
          <div className="hairline-gold mt-4" />
          <h2 className="mt-5 max-w-md font-display text-[clamp(2rem,8vw,3.75rem)] uppercase leading-[0.9] text-cream text-balance">
            How the week gets built
          </h2>
        </Reveal>

        <ol className="lg:col-span-7">
          {HOW_IT_WORKS.map((item, i) => (
            <Reveal key={item.step} delay={70 + i * 60}>
              <li className="group grid grid-cols-[auto_1fr] gap-4 border-t border-cream/10 py-6 first:border-t-0 first:pt-0 sm:gap-6 sm:py-7">
                <span
                  className="font-display text-3xl leading-none text-gold/35 transition-colors group-hover:text-gold sm:text-4xl"
                  aria-hidden
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-cream sm:text-xl">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-cream/72 text-pretty sm:text-[1.05rem]">
                    {item.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
