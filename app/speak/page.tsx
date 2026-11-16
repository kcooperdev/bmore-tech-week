import { ApplyForm } from "@/components/ApplyForm";
import { speakFields } from "@/lib/involve";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Give a Talk",
  "Apply to speak at Bmore Tech Fest. Pitch a workshop or tech talk. Deadline February 1, 2027.",
);

const formats = new Set(["workshop", "techtalk"]);

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
            <p className="plain-lede">Pitch a workshop or tech talk.</p>
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
