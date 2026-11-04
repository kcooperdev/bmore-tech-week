import { ApplyForm } from "@/components/ApplyForm";
import { speakFields } from "@/lib/involve";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Give a Talk",
  "Apply to give a workshop, panel, or tech talk at Baltimore Tech Week. Deadline February 1, 2027. Decisions March 1.",
);

const formats = new Set(["workshop", "panel", "techtalk"]);

export default async function SpeakPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string }>;
}) {
  const params = await searchParams;
  const format = formats.has(params.format ?? "") ? params.format : undefined;

  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">Deadline February 1, 2027 · Decisions March 1</p>
            <h1>Give a Talk</h1>
            <p className="plain-lede">
              Workshops, panels, and tech talks from people who do the work here. First-time speakers are welcome. You do not need a touring deck.
            </p>
            <ul className="side-notes">
              <li>
                <strong>Workshop · 45–60 minutes</strong>
                Interactive. Teach a practical skill.
              </li>
              <li>
                <strong>Panel · 45–60 minutes</strong>
                Several voices on one question.
              </li>
              <li>
                <strong>Tech talk · 20–30 minutes</strong>
                Something you built, learned, or are arguing for.
              </li>
            </ul>
            <p className="plain-lede">We want a story from the work, a thing people can use, and a point of view. Not a product demo, a sales pitch, or a recruiting session.</p>
          </header>
          <ApplyForm
            endpoint="/api/speakers"
            defaults={format ? { format } : undefined}
            submitLabel="Submit application"
            successTitle="Thanks. We have your session."
            successBody="We read every application. If it fits a night, we will write you. Decisions go out by March 1."
            fields={speakFields}
          />
        </div>
      </div>
    </main>
  );
}
