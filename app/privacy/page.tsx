import { CookieSettings } from "@/components/CookieSettings";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy",
  "How Baltimore Tech Week uses form answers and cookies, including GDPR and CCPA choices.",
);

export default function PrivacyPage() {
  return (
    <main className="plain-page">
      <PageHeader
        eyebrow="Privacy"
        title="Your data"
        lede="We collect only what a form asks for, and a cookie that remembers your choice."
      />
      <div className="plain-body">
        <div className="week-wrap narrow-copy">
          <p>
            Essential storage remembers whether you accepted cookies. Analytics and marketing stay off until you turn them on. We do not sell personal information, and we do not share it for cross-context advertising.
          </p>
          <p>
            If you are in the EU or UK, you can accept, refuse, or change optional cookies, and you can ask us to access, correct, or delete information you sent in a form. If you are in California, you can opt out of sale or sharing, and you can ask what we hold. Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p>
            <CookieSettings />
          </p>
        </div>
      </div>
    </main>
  );
}
