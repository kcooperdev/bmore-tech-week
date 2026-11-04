"use client";

import { useMemo, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export type InquiryField = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  autoComplete?: string;
};

export function InquiryForm({
  fields,
  subject,
  submitLabel,
  id,
}: {
  fields: InquiryField[];
  subject: string;
  submitLabel: string;
  id?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openedMail, setOpenedMail] = useState(false);

  const mailto = useMemo(() => {
    if (!preview) return "";
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preview)}`;
  }, [preview, subject]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = fields.map((field) => {
      const value = String(data.get(field.name) ?? "").trim();
      return `${field.label}: ${value || "—"}`;
    });
    const message = lines.join("\n");
    setPreview(message);
    setCopied(false);
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    const canOpen = href.length < 1800;
    setOpenedMail(canOpen);
    if (canOpen) window.location.href = href;
  }

  async function copyMessage() {
    if (!preview) return;
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${subject}\n\n${preview}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (preview) {
    return (
      <div id={id} className="sheet-form">
        <h3 className="week-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Ready to send.
        </h3>
        <p className="sheet-note">
          {openedMail
            ? "Your email app should open with this note. Send it from there. If nothing opens, copy the note instead."
            : "This note is long enough that an email link may drop it. Copy it and send it yourself."}{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <pre className="sheet-preview">{preview}</pre>
        <div className="sheet-actions">
          {openedMail ? (
            <a className="week-btn" href={mailto}>
              Open email
            </a>
          ) : null}
          <button type="button" className="week-btn week-btn-ghost" onClick={copyMessage}>
            {copied ? "Copied" : "Copy note"}
          </button>
          <button type="button" className="week-btn week-btn-ghost" onClick={() => setPreview(null)}>
            Edit answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="sheet-form">
      {fields.map((field) => (
        <label key={field.name} className="sheet-label">
          {field.label}
          {field.required ? " *" : ""}
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="field"
            />
          ) : field.type === "select" ? (
            <select name={field.name} required={field.required} className="field" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              className="field"
            />
          )}
        </label>
      ))}
      <p className="sheet-note">This opens an email to {site.email}. The site does not store the form.</p>
      <div>
        <button type="submit" className="week-btn">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
