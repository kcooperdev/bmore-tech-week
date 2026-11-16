import Link from "next/link";
import { hq, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="harbor-footer">
      <div className="harbor-footer-inner">
        <div className="harbor-footer-top">
          <Link href="/" className="harbor-footer-brand">
            <span className="btw-mark" />
            <span>
              Bmore
              <span>Tech Fest</span>
            </span>
          </Link>
          <p className="harbor-footer-lede">
            {site.dates}
            <span aria-hidden="true"> · </span>
            {hq.venue}, Baltimore
          </p>
          <p className="harbor-footer-promise">{site.promise}</p>
        </div>

        <div className="harbor-footer-meta">
          <div>
            <p className="harbor-footer-label">Venue</p>
            <p>
              {hq.venue}
              <br />
              {hq.street}
              <br />
              {hq.cityLine}
            </p>
            <p>
              <a href={hq.mapsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </p>
          </div>

          <div>
            <p className="harbor-footer-label">Contact</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="harbor-footer-social">
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <span aria-hidden="true"> · </span>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
          </div>

          <div>
            <p className="harbor-footer-label">Info</p>
            <nav className="harbor-footer-nav" aria-label="Footer">
              <Link className="harbor-footer-link" href="/about">
                About
              </Link>
              <Link className="harbor-footer-link" href="/privacy">
                Privacy
              </Link>
              <Link className="harbor-footer-link" href="/conduct">
                Code of Conduct
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
