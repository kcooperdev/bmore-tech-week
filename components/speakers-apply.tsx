import { CFP_NOT_LOOKING, CFP_VALUES, SESSION_TYPES } from '@/lib/cfp'
import { ApplyLink } from '@/components/apply-link'

const TONES = ['gold', 'sky', 'bronze'] as const

export function SpeakersApply() {
  return (
    <div>
      <section className="ed-dark-showcase" id="formats">
        <div className="ed-container">
          <div className="ed-want-row">
            <div>
              <p className="ed-service-kicker">We want</p>
              <ul className="ed-clean-list">
                {CFP_VALUES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="ed-service-kicker">Not this</p>
              <ul className="ed-clean-list">
                {CFP_NOT_LOOKING.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="ed-section-title">Pick a format</h2>

          <div className="ed-card-stack">
            {SESSION_TYPES.map((item, idx) => {
              const tone = TONES[idx % TONES.length]
              return (
                <article key={item.id} className={`ed-service-card ed-tone-${tone}`}>
                  <span className="ed-service-num" aria-hidden="true">
                    0{idx + 1}
                  </span>
                  <div className="ed-service-copy">
                    <span className="ed-service-kicker">{item.length}</span>
                    <h3 className="ed-service-title">{item.label}</h3>
                    <p className="ed-service-lead">{item.body}</p>
                    {item.examples.length > 0 ? (
                      <ul className="ed-service-list">
                        {item.examples.slice(0, 3).map((ex) => (
                          <li key={ex}>
                            <span>{ex}</span>
                            <span className="ed-service-plus" aria-hidden="true">
                              +
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="ed-service-action">
                      <ApplyLink kind="speak" query={`format=${item.id}`} className="ed-card-cta">
                        Apply for {item.label} →
                      </ApplyLink>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
