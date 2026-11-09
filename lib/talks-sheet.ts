const HEADERS = [
  "Submitted",
  "Name",
  "Email",
  "Company Name",
  "Linkedin",
  "Session Type",
  "Day",
  "Session title",
  "Session Description",
  "Track",
  "Open to a panel",
  "Notes",
];

export function talksSheetUrl() {
  return process.env.GOOGLE_SHEETS_TALKS_URL?.trim() ?? "";
}

export async function appendTalksRow(values: string[]) {
  const url = talksSheetUrl();
  if (!url) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    redirect: "follow",
    body: JSON.stringify({ headers: HEADERS, values }),
  });

  const body = await response.text();
  if (!response.ok || (body && !body.includes("ok"))) {
    throw new Error("Talks sheet did not accept the row.");
  }

  return true;
}
