import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'

export default function Page() {
  return (
    <>
      <JsonLd />
      <SiteNav />
      <main>
        <Hero />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
