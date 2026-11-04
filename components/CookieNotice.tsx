"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Laptop } from "lucide-react";

const KEY = "btw-privacy";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  doNotSell: boolean;
};

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      doNotSell: parsed.doNotSell !== false,
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  localStorage.setItem(KEY, JSON.stringify(consent));
}

const acceptAll: Consent = { necessary: true, analytics: true, marketing: true, doNotSell: true };
const essentialOnly: Consent = { necessary: true, analytics: false, marketing: false, doNotSell: true };

export function CookieNotice() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>(essentialOnly);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    if (saved) setDraft(saved);
    setReady(true);
    const reopen = () => {
      setDraft(readConsent() ?? essentialOnly);
      setOpen(true);
    };
    window.addEventListener("btw-cookies", reopen);
    return () => window.removeEventListener("btw-cookies", reopen);
  }, []);

  function save(next: Consent) {
    writeConsent(next);
    setConsent(next);
    setDraft(next);
    setOpen(false);
  }

  if (!ready) return null;
  if (consent && !open) return null;

  return (
    <div className={open ? "cookie-layer is-open" : "cookie-layer"}>
      {open ? <button type="button" className="cookie-backdrop" aria-label="Close preferences" onClick={() => setOpen(false)} /> : null}
      <aside className="cookie-notice" role="dialog" aria-labelledby="cookie-title" aria-modal={open || undefined}>
        <Laptop size={28} strokeWidth={1.75} aria-hidden="true" />
        <div>
          <h2 id="cookie-title">{open ? "Cookie preferences" : "Cookie Notice"}</h2>
          {open ? (
            <p>Essential cookies remember this choice. Analytics and marketing stay off until you turn them on. We do not sell personal information.</p>
          ) : (
            <p>
              We use a cookie to remember this choice. We do not sell personal information.{" "}
              <Link href="/privacy">Read the privacy policy.</Link>
            </p>
          )}
        </div>
        {open ? (
          <fieldset className="cookie-prefs">
            <label>
              <input type="checkbox" checked disabled />
              Essential
              <span>Required to remember your choice.</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(event) => setDraft((value) => ({ ...value, analytics: event.target.checked }))}
              />
              Analytics
              <span>Helps us see which pages are used.</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={draft.marketing}
                onChange={(event) => setDraft((value) => ({ ...value, marketing: event.target.checked }))}
              />
              Marketing
              <span>Used only if we add campaign measurement.</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={draft.doNotSell}
                onChange={(event) => setDraft((value) => ({ ...value, doNotSell: event.target.checked }))}
              />
              Do not sell or share
              <span>CCPA opt-out. This stays on unless you turn it off.</span>
            </label>
          </fieldset>
        ) : null}
        <div className="cookie-actions">
          {open ? (
            <button type="button" className="week-btn week-btn-ghost" onClick={() => save(draft)}>
              Save preferences
            </button>
          ) : (
            <button type="button" className="week-btn week-btn-ghost" onClick={() => setOpen(true)}>
              Manage your preferences
            </button>
          )}
          <button type="button" className="week-btn week-btn-ghost" onClick={() => save(essentialOnly)}>
            Essential only
          </button>
          <button type="button" className="week-btn" onClick={() => save(acceptAll)}>
            Accept
          </button>
        </div>
      </aside>
    </div>
  );
}
