import { ApplyForm } from "@/components/ApplyForm";
import { exhibitors, hq, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Expo",
  "The Baltimore Tech Week Expo is at 4MLK on Wednesday and Thursday, April 28–29, 2027. Exhibitor names will be listed after they confirm.",
);

export default function ExpoPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">{hq.venue}</p>
            <h1>Expo</h1>
            <p className="plain-lede">The floor is open Wednesday and Thursday. Ask for a table if you have something people should stop and see.</p>
            {exhibitors.length > 0 ? (
              <ul className="hold-list">
                {exhibitors.map((exhibitor) => (
                  <li key={exhibitor.name}>{exhibitor.url ? <a href={exhibitor.url}>{exhibitor.name}</a> : exhibitor.name}</li>
                ))}
              </ul>
            ) : null}
          </header>
          <ApplyForm
            id="exhibit"
            closed
            endpoint="/api/apply"
            extra={{ kind: "exhibitor" }}
            submitLabel="Ask for a table"
            successTitle="Thanks. We have your table request."
            successBody="We confirm the space before your name goes on the floor."
            fields={[
              { name: "organization", label: "Organization", required: true, autoComplete: "organization" },
              { name: "name", label: "Your name", required: true, autoComplete: "name" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              { name: "website", label: "Website", type: "url" },
              { name: "showing", label: "What will you show?", type: "textarea", required: true },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
