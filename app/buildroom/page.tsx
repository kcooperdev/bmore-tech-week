import type { Metadata } from 'next'
import Link from 'next/link'
import { EVENT } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Build Room',
  description: 'You found it. You’re early. You’re a builder.',
  robots: { index: false, follow: false },
  alternates: { canonical: EVENT.buildRoomPath },
}

export default function BuildRoomPage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(0,175,185,0.25), transparent 45%), radial-gradient(circle at 70% 70%, rgba(199,21,133,0.2), transparent 40%)',
        }}
        aria-hidden
      />
      <div className="relative max-w-lg text-center">
        <p className="font-playful text-sm font-bold text-primary">Hidden room</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream sm:text-6xl text-balance">
          You found it.
          <br />
          You’re early.
          <br />
          You’re a builder.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Welcome to the Build Room. Keep shipping Charm City energy into Baltimore Tech Week{' '}
          {EVENT.year}.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={EVENT.earlyAccessPath}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground"
          >
            Back to Early Access
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm border-2 border-cream px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-cream"
          >
            Main site
          </Link>
        </div>
      </div>
    </main>
  )
}
