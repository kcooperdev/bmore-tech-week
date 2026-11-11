import Link from "next/link";
import { StoryReveal } from "@/components/StoryReveal";
import { aboutSections, founderStory, pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "About",
  "Why Bmore Tech Fest exists. Built in Baltimore. Three days at 4MLK, April 26–28, 2027.",
);

export default function AboutPage() {
  const beforePull = founderStory.paragraphs.slice(0, 5);
  const afterPull = founderStory.paragraphs.slice(5);

  return (
    <main className="plain-page story-page">
      <header className="plain-hero" id="main">
        <div className="week-wrap">
          <p className="week-kicker">
            {site.name} · {site.dates}
          </p>
          <StoryReveal as="h1" className="story-hero-display">
            The full story
          </StoryReveal>
          <StoryReveal as="p" className="plain-lede story-hero-lede" delay={90}>
            How Khalif Cooper got here, and why this fest brings Baltimore’s builders into one room.
          </StoryReveal>
        </div>
      </header>

      <div className="plain-body">
        <article className="week-wrap story-essay" aria-labelledby="founder-story">
          <StoryReveal as="h2" id="founder-story" className="story-essay-title">
            {founderStory.title}
          </StoryReveal>

          {beforePull.map((paragraph, index) => (
            <StoryReveal as="p" key={paragraph.slice(0, 48)} delay={Math.min(index * 35, 140)}>
              {paragraph}
            </StoryReveal>
          ))}

          <StoryReveal as="blockquote" className="story-pull" delay={40}>
            <p>{founderStory.pull}</p>
          </StoryReveal>

          {afterPull.map((paragraph, index) => (
            <StoryReveal as="p" key={paragraph.slice(0, 48)} delay={Math.min(index * 35, 140)}>
              {paragraph}
            </StoryReveal>
          ))}
        </article>

        <div className="week-wrap story-rest">
          <StoryReveal as="p" className="story-rest-kicker">
            About the fest
          </StoryReveal>
          <div className="story-beats">
            {aboutSections.map((section, index) => (
              <StoryReveal
                as="section"
                key={section.id}
                delay={index * 60}
                aria-labelledby={section.id}
              >
                <h2 id={section.id}>{section.title}</h2>
                <p>{section.text}</p>
              </StoryReveal>
            ))}
          </div>

          <StoryReveal className="week-actions" delay={100}>
            <Link className="week-btn" href="/tickets">
              Join the list
            </Link>
            <Link className="week-btn week-btn-ghost" href="/#tracks">
              Explore the tracks
            </Link>
          </StoryReveal>
        </div>
      </div>
    </main>
  );
}
