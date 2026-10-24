import { EVENT } from '@/lib/data'

export function HarborFooter() {
  return (
    <footer className="harbor-footer" aria-label="Site footer">
      <div className="harbor-footer-inner">
        <div className="harbor-footer-meta">
          <div>
            <p className="harbor-footer-meta-title">When &amp; Where</p>
            <p>{EVENT.dates}</p>
            <p>{EVENT.city} · Inner Harbor &amp; Neighborhoods</p>
          </div>

          <div>
            <p className="harbor-footer-meta-title">The Conference</p>
            <p>Five nights · {EVENT.nightWindow}</p>
            <p>Rooms across neighborhoods</p>
          </div>

          <div>
            <p className="harbor-footer-meta-title">Connect</p>
            <p>
              <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>
            </p>
            <p className="harbor-footer-socials">
              <a href={EVENT.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <span aria-hidden="true"> · </span>
              <a href={EVENT.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
