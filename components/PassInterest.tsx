"use client";

import { useState, type FormEvent } from "react";
import { ticketsSoonHint } from "@/lib/site";

export function PassInterest({
  id = "pass-list",
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass: "All-access waitlist" }),
    })
      .then(async (response) => {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        if (!response.ok) throw new Error(body.error || "Could not save that email.");
        setDone(true);
      })
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Could not save that email.");
      })
      .finally(() => setPending(false));
  }

  if (done) {
    return (
      <p className="pass-interest-done" role="status">
        You’re on the list. We’ll write when passes open.
      </p>
    );
  }

  return (
    <form id={id} className={compact ? "pass-interest is-compact" : "pass-interest"} onSubmit={onSubmit}>
      {!compact ? <p className="pass-interest-hint">{ticketsSoonHint}</p> : null}
      <div className="pass-interest-row">
        <label className="sr-only" htmlFor={`${id}-email`}>
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="pass-interest-input"
        />
        <button type="submit" className="week-btn" disabled={pending}>
          {pending ? "Saving…" : "Join the list"}
        </button>
      </div>
      {compact ? <p className="pass-interest-hint">{ticketsSoonHint}</p> : null}
      {error ? (
        <p className="pass-interest-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
