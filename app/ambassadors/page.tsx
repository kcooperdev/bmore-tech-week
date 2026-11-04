import { ApplyForm } from "@/components/ApplyForm";
import { ambassadorFields } from "@/lib/involve";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Be an Ambassador",
  "Help Baltimore Tech Week get the word out. Share the nights with people who already listen to you.",
);

export default function AmbassadorsPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">Get the word out</p>
            <h1>Ambassador</h1>
            <p className="plain-lede">
              Help bring people out. Share events with your network and introduce more people to the community. You do not need a big following.
            </p>
            <ul className="side-notes">
              <li>Start with the circle you already have. A campus Slack, a Sunday dinner, the group chat that answers.</li>
              <li>Share the night, not a pile of graphics. Who it is for, when it is, and the ticket link.</li>
              <li>Bring one person with you. A roommate, a classmate, someone from work.</li>
            </ul>
          </header>
          <ApplyForm
            endpoint="/api/apply"
            extra={{ kind: "ambassador" }}
            submitLabel="Submit"
            successTitle="Thanks. You are on the ambassador list."
            successBody="You can start telling people now. Share the night, the time, and the ticket link. We will write if we need anything else."
            fields={ambassadorFields}
          />
        </div>
      </div>
    </main>
  );
}
