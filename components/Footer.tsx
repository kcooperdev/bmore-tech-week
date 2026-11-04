import Link from "next/link";
import { hq, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="harbor-footer">
      <div className="harbor-footer-inner">
        <Link href="/" className="harbor-footer-brand">
          <span className="btw-mark" />
          <span>
            Baltimore
            <span>Tech Week</span>
          </span>
        </Link>
        <div className="harbor-footer-meta">
          <div>
            <p>{site.idea}</p>
            <p>
              {site.dates}
              <br />
              {site.when}
            </p>
          </div>
          <div>
            <p>
              {hq.name}
              <br />
              {hq.venue}
              <br />
              {hq.street}
              <br />
              {hq.cityLine}
            </p>
            <p>
              <a href={hq.mapsUrl} target="_blank" rel="noreferrer">
                Directions to 4MLK
              </a>
            </p>
          </div>
          <div>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <a href="https://www.instagram.com/baltimoretechweekhq">Instagram</a>
            </p>
            <p>
              <a href="https://www.linkedin.com/company/baltimore-tech-week-2027">LinkedIn</a>
            </p>
            <p>
              <Link href="/privacy">Privacy</Link>
            </p>
            <p>
              <Link href="/conduct">Code of Conduct</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
