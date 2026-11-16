"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const KEY = "btw-updates-modal";

export function UpdatesModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => {
      const node = dialog.current;
      if (!node || node.open) return;
      node.showModal();
      input.current?.focus();
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(KEY, "dismissed");
    } catch {
      /* ignore */
    }
    dialog.current?.close();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass: "Updates list" }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not save that email.");
      setStatus("done");
      setEmail("");
      try {
        localStorage.setItem(KEY, "joined");
      } catch {
        /* ignore */
      }
      window.setTimeout(() => dialog.current?.close(), 1600);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not save that email.");
    }
  }

  return (
    <dialog
      ref={dialog}
      className="updates-dialog"
      aria-labelledby="updates-title"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) dismiss();
      }}
    >
      <div className="updates-dialog-card">
        <button type="button" className="updates-dialog-close" aria-label="Close" onClick={dismiss}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <p className="updates-dialog-kicker">{site.name} · {site.year}</p>
        <h2 id="updates-title">Stay in the loop</h2>
        <p className="updates-dialog-copy">
          Get updates, announcements, and a note when tickets go on sale. No spam, just what matters for{" "}
          {site.dates}.
        </p>

        {status === "done" ? (
          <p className="updates-dialog-done" role="status">
            You’re on the list. We’ll write when there’s news.
          </p>
        ) : (
          <form className="updates-dialog-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="updates-email">
              Email
            </label>
            <input
              ref={input}
              id="updates-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
            />
            <button type="submit" className="week-btn" disabled={status === "saving"}>
              {status === "saving" ? "Saving…" : "Get updates"}
            </button>
            {status === "error" ? <p className="updates-dialog-error">{error}</p> : null}
          </form>
        )}

        <button type="button" className="updates-dialog-skip" onClick={dismiss}>
          Not now
        </button>
      </div>
    </dialog>
  );
}
