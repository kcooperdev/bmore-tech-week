"use client";

import { useState, type FormEvent } from "react";

export function TicketNotify({
  label = "Join the list",
  buttonLabel = "Join the list",
}: {
  label?: string;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass: "Ticket updates" }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not save that email.");
      setStatus("done");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not save that email.");
    }
  }

  if (status === "done") {
    return <p className="notify-done">You’re on the list. We’ll write when tickets open.</p>;
  }

  return (
    <form className="notify-form" onSubmit={submit}>
      <label className="notify-label" htmlFor="ticket-notify-email">
        {label}
      </label>
      <div className="notify-row">
        <input
          id="ticket-notify-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
        />
        <button type="submit" className="week-btn" disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : buttonLabel}
        </button>
      </div>
      {status === "error" ? <p className="notify-error">{error}</p> : null}
    </form>
  );
}
