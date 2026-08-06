import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { WhatIs } from '@/components/what-is'
import { WhoShouldAttend } from '@/components/who-should-attend'
import { Partners } from '@/components/partners'
import { JoinCommunity } from '@/components/join-community'
import { SiteFooter } from '@/components/site-footer'
import { StickyRsvp } from '@/components/sticky-rsvp'
import { PaintCursor } from '@/components/paint-cursor'
import { PaintStudio } from '@/components/paint-studio'
import { PaintProvider } from '@/components/paint-context'
import { JsonLd } from '@/components/json-ld'

export default function Page() {
  return (
    <PaintProvider>
      <JsonLd />
      <PaintCursor />
      <PaintStudio />
      <SiteNav />
      <main>
        <Hero />
        <WhatIs />
        <WhoShouldAttend />
        <Partners />
        <JoinCommunity />
      </main>
      <SiteFooter />
      <StickyRsvp />
    </PaintProvider>
  )
}
