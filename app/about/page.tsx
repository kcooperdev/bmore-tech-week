import Link from "next/link";
import { aboutSections, founderStory, pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "About",
  "Why Bmore Tech Fest exists. Built in Baltimore. Three days at 4MLK, April 26–28, 2027.",
);

export default function AboutPage() {
  return (
    <main className="plain-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap">
          <p className="week-kicker">
            {site.name} · {site.dates}
          </p>
          <h1>About</h1>
          <p className="plain-lede">Why this fest exists, who it’s for, and where it happens.</p>
        </div>
      </header>

      <div className="plain-body">
        <div className="week-wrap narrow-copy">
          <section className="founder-story" aria-labelledby="founder-story">
            <h2 id="founder-story">Why Bmore Tech Fest exists</h2>
            {founderStory.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>

          {aboutSections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}

          <div className="week-actions">
            <Link className="week-btn" href="/tickets">
              Join the list
            </Link>
            <Link className="week-btn week-btn-ghost" href="/#tracks">
              Explore the tracks
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
