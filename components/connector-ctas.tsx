import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ComingSoonButton } from '@/components/coming-soon'
import { TicketWaitlist } from '@/components/forms/ticket-waitlist'
import { CTA, EVENT } from '@/lib/data'

const ACTIONS = [
  {
    href: EVENT.venueSubmitPath,
    title: CTA.submitVenue,
    body: 'Bar, office, gallery, studio. If people can get there after 6, that’s enough.',
  },
  {
    href: EVENT.speakerSubmitPath,
    title: CTA.submitTalk,
    body: 'Tell us what you’d say and roughly where. We’ll find the room.',
  },
  {
    href: EVENT.volunteerSubmitPath,
    title: CTA.submitVolunteer,
    body: 'Check-in, set up, or breakdown. One night is enough.',
  },
]

export function ConnectorCtas() {
  return (
    <section id="get-involved" className="section-anchor bg-background py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
            {EVENT.submissionsOpen ? 'The week gets built first' : CTA.comingSoon}
          </p>
          <div className="hairline-gold mt-4" />
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,7vw,3.75rem)] uppercase leading-[0.9] text-cream text-balance">
            Get involved
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/68 text-pretty">
            {EVENT.submissionsOpen
              ? 'Host a room, give a talk, or crew a night. We pair them. Then it goes on the schedule.'
              : 'Host, talk, and crew signups are not open yet. The week still gets built that way when they are.'}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-cream/12 bg-cream/12 lg:grid-cols-3">
          {ACTIONS.map((action, i) => (
            <Reveal key={action.href} delay={80 + i * 70} className="bg-card">
              {EVENT.submissionsOpen ? (
                <Link
                  href={action.href}
                  className="group relative flex h-full flex-col p-5 transition-colors before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-gold before:opacity-0 before:transition-opacity hover:bg-purple/35 hover:before:opacity-100 sm:p-8"
                >
                  <h3 className="text-lg font-semibold text-cream sm:text-xl">{action.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/68 sm:text-base">
                    {action.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold sm:mt-8">
                    {action.title}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <div className="flex h-full flex-col p-5 sm:p-8">
                  <h3 className="text-lg font-semibold text-cream sm:text-xl">{action.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/68 sm:text-base">
                    {action.body}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-gold/70">{CTA.comingSoon}</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {EVENT.submissionsOpen ? <TicketWaitlist /> : null}
      </div>
    </section>
  )
}
