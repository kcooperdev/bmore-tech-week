import Link from 'next/link'
import { EVENT } from '@/lib/data'

export function EarlyAccessFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-10 md:flex-row md:items-center md:px-8">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label="Baltimore Tech Week home">
            <img src="/images/btw-mark.svg" alt="" className="size-9 sm:size-10" width={40} height={40} />
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            {EVENT.dates} · {EVENT.city}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Built for Baltimore.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {EVENT.contactEmail}
            </a>
            <a
              href={EVENT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Instagram {EVENT.instagramHandle}
            </a>
            <a
              href={EVENT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <Link href="/" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
          ← Back to main site
        </Link>
      </div>

      <div className="border-t border-border px-4 py-8 md:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {EVENT.year} {EVENT.name}. {EVENT.tagline}
        </p>
      </div>
    </footer>
  )
}
