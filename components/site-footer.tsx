import Link from 'next/link'
import { ComingSoonButton } from '@/components/coming-soon'
import { CTA, EVENT } from '@/lib/data'
import { Wordmark } from '@/components/wordmark'

export function SiteFooter({ hasSchedule = false }: { hasSchedule?: boolean }) {
  const links = [
    ...(hasSchedule ? [{ href: EVENT.eventsPath, label: 'Schedule' }] : []),
    { href: EVENT.speakersPath, label: CTA.callForSpeakers },
    ...(EVENT.submissionsOpen
      ? [
          { href: EVENT.venueSubmitPath, label: 'Host a night' },
          { href: EVENT.volunteerSubmitPath, label: 'Volunteer' },
        ]
      : []),
    { href: '/', label: 'Home' },
  ]

  return (
    <footer className="border-t border-gold/15 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            {EVENT.dates} · {EVENT.nightWindow}
            <br />
            {EVENT.city}
          </p>
          <p className="mt-3 text-sm text-cream/55">Built here, for here.</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">The week</p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/65 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">Reach us</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="break-all text-cream/65 transition-colors hover:text-cream"
            >
              {EVENT.contactEmail}
            </a>
            <a
              href={EVENT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/65 transition-colors hover:text-cream"
            >
              Instagram {EVENT.instagramHandle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={EVENT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/65 transition-colors hover:text-cream"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          {EVENT.speakerCallOpen ? (
            <Link href={EVENT.speakersPath} className="btn-cta-secondary mt-6 w-full sm:w-auto">
              {CTA.submitTalk}
            </Link>
          ) : EVENT.submissionsOpen ? (
            <Link href={EVENT.volunteerSubmitPath} className="btn-cta-outline mt-6 w-full sm:w-auto">
              {CTA.submitVolunteer}
            </Link>
          ) : (
            <ComingSoonButton variant="outline" className="mt-6 w-full sm:w-auto" />
          )}
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-5 text-center text-xs tracking-wide text-cream/45 md:px-8">
        © {EVENT.year} {EVENT.name}. {EVENT.tagline}
      </div>
    </footer>
  )
}
