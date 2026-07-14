import { EVENT } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-8">
        <div>
          <p className="font-display text-xl text-foreground">Baltimore Tech Week</p>
          <p className="mt-1 text-sm text-muted-foreground">{EVENT.city}</p>
        </div>
        <a
          href={EVENT.infoSessionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-secondary px-5 py-3 text-sm font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-0.5"
        >
          Info Session
        </a>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-sm text-muted-foreground md:px-8">
        © {EVENT.year} {EVENT.name}. {EVENT.tagline}
      </div>
    </footer>
  )
}
