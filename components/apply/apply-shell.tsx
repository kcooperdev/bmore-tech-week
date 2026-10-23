import Link from 'next/link'
import { EVENT } from '@/lib/data'

export function ApplyShell({
  kicker,
  title,
  lead,
  demo = false,
  children,
}: {
  kicker: string
  title: string
  lead: string
  demo?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="bmore apply-page">
      <div className="apply-glow" aria-hidden="true" />
      <header className="apply-top">
        <Link href="/" className="apply-brand">
          Baltimore <span>Tech Week</span>
        </Link>
        <Link href="/" className="apply-home">
          Back to site
        </Link>
      </header>

      <main className="apply-main" id="main" tabIndex={-1}>
        {demo ? (
          <p className="apply-demo-banner" role="status">
            Demo fill is ready. Click through each step and submit. Then check the run sheet.
          </p>
        ) : null}
        <p className="apply-kicker">{kicker}</p>
        <h1 className="apply-title">{title}</h1>
        <p className="apply-lead">{lead}</p>
        {children}
        <p className="apply-note">
          We read every submission.{' '}
          <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>
        </p>
      </main>
    </div>
  )
}

export function ApplyClosed() {
  return (
    <div className="apply-closed" role="status">
      <p className="apply-closed-kicker">Opens {EVENT.opensOn}</p>
      <p className="apply-closed-copy">
        Applications open {EVENT.opensOn}. Leave your email on the site and we will write you that day, or write{' '}
        <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a> if you need us sooner.
      </p>
      <Link href="/" className="apply-home">
        Back to the week
      </Link>
    </div>
  )
}
