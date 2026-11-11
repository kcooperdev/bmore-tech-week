import Link from "next/link";
import { hq, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="harbor-footer">
      <div className="harbor-footer-inner">
        <Link href="/" className="harbor-footer-brand">
          <span className="btw-mark" />
          <span>
            Bmore
            <span>Tech Fest</span>
          </span>
        </Link>
        <div className="harbor-footer-meta">
          <div>
            <p>{site.idea}</p>
            <p>{site.dates}</p>
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
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </p>
            <p>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
            <p>
              <Link href="/about">About</Link>
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
