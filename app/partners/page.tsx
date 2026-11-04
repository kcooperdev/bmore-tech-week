import { ApplyForm } from "@/components/ApplyForm";
import { partnerFields } from "@/lib/involve";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Community Partners",
  "Free for meetups, schools, accelerators, nonprofits, and student groups that already gather people in Baltimore.",
);

export default function PartnersPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap split">
          <header id="main">
            <p className="week-kicker">Community partner · Free</p>
            <h1>Partner</h1>
            <p className="plain-lede">Free for meetups, schools, accelerators, nonprofits, and student groups.</p>
            <ul className="side-notes">
              <li>Your logo on this page.</li>
              <li>Your name when the week starts, and when it ends.</li>
              <li>A thank-you next to the other groups.</li>
            </ul>
          </header>
          <ApplyForm
            endpoint="/api/apply"
            extra={{ kind: "partner" }}
            submitLabel="Submit partnership"
            successTitle="Thanks. We have your partner application."
            successBody="If we list you, we will write you. It is free."
            fields={partnerFields}
          />
        </div>
      </div>
    </main>
  );
}
