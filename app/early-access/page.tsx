import type { Metadata } from 'next'
import { EarlyAccessNav } from '@/components/early-access/nav'
import { EarlyAccessHero } from '@/components/early-access/hero'
import { WhatsComing } from '@/components/early-access/whats-coming'
import { ProgrammingDrops } from '@/components/early-access/programming-drops'
import { MissedSession } from '@/components/early-access/missed-session'
import { WhyItMatters } from '@/components/early-access/why-it-matters'
import { WhoItsFor } from '@/components/early-access/who-its-for'
import { EarlyAccessForm } from '@/components/early-access/form'
import { EarlyAccessFooter } from '@/components/early-access/footer'
import { EarlyAccessStickyCta } from '@/components/early-access/sticky-cta'
import { EVENT } from '@/lib/data'

const title = 'Early Access | Can’t Make the Info Session?'
const description =
  'August 27 is sold out. You’re still early. Join Baltimore Tech Week Early Access for the recap, first programming drop, host onboarding, and more.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.earlyAccessPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: `${EVENT.earlyAccessPath}`,
  },
}

export default function EarlyAccessPage() {
  return (
    <>
      <EarlyAccessNav />
      {/* Mobile story order differs: empathy (missed) right after hero */}
      <main className="flex flex-col pb-[6.75rem] sm:pb-20">
        <div className="order-1">
          <EarlyAccessHero />
        </div>
        <div className="order-2 md:order-4">
          <MissedSession />
        </div>
        <div className="order-3 md:order-2">
          <WhatsComing />
        </div>
        <div className="order-4 md:order-3">
          <ProgrammingDrops />
        </div>
        <div className="order-5 md:order-6">
          <WhoItsFor />
        </div>
        <div className="order-6 md:order-5">
          <WhyItMatters />
        </div>
        <div className="order-7">
          <EarlyAccessForm />
        </div>
      </main>
      <EarlyAccessFooter />
      <EarlyAccessStickyCta />
    </>
  )
}
