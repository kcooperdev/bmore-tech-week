import { EVENT } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-10 md:flex-row md:items-center md:px-8">
        <div>
          <p className="font-display text-xl text-foreground">Baltimore Tech Week</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {EVENT.dates} · {EVENT.city}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            The official home of Baltimore Tech Week {EVENT.year} — Charm City&apos;s week of
            technology, art, and community.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a
              href={EVENT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Follow us on Instagram{' '}
              <span className="font-semibold text-foreground">{EVENT.instagramHandle}</span>
            </a>
            <a
              href={EVENT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Follow us on LinkedIn
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-secondary px-5 py-3 text-sm font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-0.5"
          >
            Info Session
          </a>
          <a
            href={EVENT.infoSessionVolunteerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border-2 border-secondary px-5 py-3 text-sm font-bold uppercase tracking-wide text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            Volunteer
          </a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-sm text-muted-foreground md:px-8">
        © {EVENT.year} {EVENT.name}. {EVENT.tagline}
      </div>
    </footer>
  )
}
