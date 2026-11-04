"use client";

export function CookieSettings() {
  return (
    <button type="button" className="week-btn" onClick={() => window.dispatchEvent(new Event("btw-cookies"))}>
      Cookie settings
    </button>
  );
}
