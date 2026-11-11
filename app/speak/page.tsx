import { ApplyForm } from "@/components/ApplyForm";
import { speakFields } from "@/lib/involve";
import { pageMeta, speakExamples } from "@/lib/site";

export const metadata = pageMeta(
  "Give a Talk",
  "Share what you’ve learned at Bmore Tech Fest. Pitch a talk, panel, or workshop. First-time speakers welcome. Deadline February 1, 2027.",
);

const formats = new Set(["workshop", "techtalk", "panel"]);

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
            <h1>Share what you’ve learned</h1>
            <p className="plain-lede">
              Built something, changed careers, led a team through a tough decision, or learned something you wish someone
              had told you sooner? Pitch a talk, panel, or workshop for Bmore Tech Fest.
            </p>
            <h2 className="side-title">Example sessions</h2>
            <ul className="side-notes">
              {speakExamples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            <h2 className="side-title">First-time speakers are welcome</h2>
            <p className="plain-lede">
              We care more about practical experience than professional speaking experience. We’re looking for builders,
              founders, engineers, researchers, creators, and operators who have something useful to teach. Start with
              one thing you know from experience, and tell us who it helps.
            </p>
          </header>
          <ApplyForm
            endpoint="/api/speakers"
            defaults={format ? { format } : undefined}
            submitLabel="Submit a session proposal"
            successTitle="Thanks. We have your session."
            successBody="We read every application. If it fits a day, we will write you. Decisions go out by March 1."
            fields={speakFields}
          />
        </div>
      </div>
    </main>
  );
}
