import { ApplyLink } from '@/components/apply-link'
import type { InvolvePitchCopy } from '@/lib/involve'

export function InvolvePitch({
  copy,
  children,
}: {
  copy: InvolvePitchCopy
  children?: React.ReactNode
}) {
  return (
    <section className="ed-cream-section">
      <div className="ed-container">
        <p className="ed-eyebrow">{copy.kicker}</p>
        <h2 className="ed-manifesto-title">
          {copy.title} <span className="ed-highlight">{copy.highlight}</span>
        </h2>
        <p className="ed-manifesto-sub">{copy.lead}</p>

        <div className="ed-steps-grid ed-three-col-grid">
          {copy.why.map((item) => (
            <div key={item.label} className="ed-step-card">
              <span className="ed-step-num">{item.label}</span>
              <h3 className="ed-step-title">{item.title}</h3>
              <p className="ed-step-body">{item.body}</p>
            </div>
          ))}
        </div>

        {children}

        <div className="ed-close-deal">
          <p className="ed-close-deal-copy">{copy.close}</p>
          <ApplyLink kind={copy.kind} className="ed-pill-btn">
            {copy.cta} →
          </ApplyLink>
        </div>
      </div>
    </section>
  )
}

export function InvolveClose({
  title,
  kind,
  cta,
}: {
  title: string
  kind: InvolvePitchCopy['kind']
  cta: string
}) {
  return (
    <section className="ed-sky-band" aria-label="Close">
      <div className="ed-container">
        <div className="ed-sky-close">
          <h2 className="ed-sky-title">{title}</h2>
          <div className="ed-manifesto-cta ed-sky-cta">
            <ApplyLink kind={kind} className="ed-pill-btn">
              {cta}
            </ApplyLink>
          </div>
        </div>
      </div>
    </section>
  )
}
