import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { AMBASSADOR_MOVES, AMBASSADOR_PITCH } from '@/lib/involve'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { InvolveClose, InvolvePitch } from '@/components/involve-pitch'
import '../../styles.css'

const title = 'Be an Ambassador'
const description =
  'Baltimore hears this week from someone they trust. Get the word out for Baltimore Tech Week. April 26–30.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.ambassadorsPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.ambassadorsPath,
  },
}

export default function AmbassadorsPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="ambassadors" />
      <PageBanner title="Be an Ambassador" kicker="Get Involved" />

      <main id="main" tabIndex={-1}>
        <InvolvePitch copy={AMBASSADOR_PITCH} />

        <section className="ed-dark-showcase">
          <div className="ed-container">
            <h2 className="ed-section-title">How you get the word out</h2>
            <div className="ed-steps-grid ed-three-col-grid ed-dark-steps">
              {AMBASSADOR_MOVES.map((item, index) => (
                <div key={item.title} className="ed-step-card">
                  <span className="ed-step-num">0{index + 1}</span>
                  <h3 className="ed-step-title">{item.title}</h3>
                  <p className="ed-step-body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InvolveClose title="Tell Baltimore about the five nights." kind="ambassador" cta={AMBASSADOR_PITCH.cta} />
      </main>

      <HarborFooter />
    </div>
  )
}
