import Link from "next/link";
import { StoryReveal } from "@/components/StoryReveal";
import { founderStory, pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "About",
  `${site.idea} Why Bmore Tech Week exists. Three days of tech in Baltimore, ${site.dates}.`,
);

export default function AboutPage() {
  return (
    <main className="plain-page story-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap">
          <p className="week-kicker">Why this exists · {site.dates}</p>
          <StoryReveal as="h1" className="story-hero-display">
            {site.idea}
          </StoryReveal>
        </div>
      </header>

      <div className="plain-body">
        <article className="week-wrap story-essay" aria-labelledby="founder-story">
          <StoryReveal as="h2" id="founder-story" className="story-essay-title">
            {founderStory.title}
          </StoryReveal>

          {founderStory.paragraphs.map((paragraph, index) => (
            <StoryReveal as="p" key={paragraph.slice(0, 48)} delay={Math.min(index * 35, 140)}>
              {paragraph}
            </StoryReveal>
          ))}
        </article>

        <div className="week-wrap story-rest">
          <StoryReveal className="week-actions" delay={100}>
            <Link className="week-btn" href="/tickets#pass-list">
              Join the list
            </Link>
            <Link className="week-btn week-btn-ghost" href="/#summit">
              Bmore Build Summit
            </Link>
          </StoryReveal>
        </div>
      </div>
    </main>
  );
}
