import { EVENT } from '@/lib/data'
import { listPublishedEvents } from '@/lib/store'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { StickyRsvp } from '@/components/sticky-rsvp'

export async function PublicShell({
  children,
  sticky = true,
}: {
  children: React.ReactNode
  sticky?: boolean
}) {
  const events = await listPublishedEvents()
  const hasSchedule = events.length > 0

  return (
    <>
      <SiteNav hasSchedule={hasSchedule} />
      <main id="main">{children}</main>
      <SiteFooter hasSchedule={hasSchedule} />
      {sticky && EVENT.submissionsOpen ? <StickyRsvp /> : null}
    </>
  )
}

export function PageIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-28 pb-8 md:px-8 md:pt-36 md:pb-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">{eyebrow}</p>
      <div className="hairline-gold mt-4" />
      <h1 className="mt-5 font-display text-[clamp(2rem,8vw,3.75rem)] uppercase leading-[0.9] text-cream text-balance">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 text-pretty sm:text-lg">
        {body}
      </p>
      <p className="mt-4 text-sm text-cream/55">
        {EVENT.dates} · {EVENT.nightWindow} · {EVENT.city}
      </p>
    </header>
  )
}
