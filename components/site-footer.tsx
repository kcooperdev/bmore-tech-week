import { CTA, EVENT } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background pb-20 md:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-10 md:flex-row md:items-center md:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5">
            <img src="/images/btw-mark.svg" alt="" className="size-8 sm:size-9" width={36} height={36} />
            <span className="font-display text-lg uppercase tracking-wide text-foreground sm:text-xl">
              Baltimore Tech Week
            </span>
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            {EVENT.dates} · {EVENT.city}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Baltimore Tech Week {EVENT.year}. Built here, for here.
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
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={EVENT.infoSessionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-secondary w-full justify-center sm:w-auto"
          >
            {CTA.short}
          </a>
          <a
            href={EVENT.infoSessionVolunteerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-outline w-full justify-center sm:w-auto"
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
