const DEV_INTAKE_URLS = [
  "http://127.0.0.1:3000/api/webhook/intake",
  "http://localhost:3000/api/webhook/intake",
];

function configuredUrl() {
  return process.env.EVENT_OPS_INTAKE_URL?.trim() || "";
}

function eventId() {
  return process.env.EVENT_OPS_EVENT_ID?.trim() || "evt-bmore-2027";
}

function urlsToTry() {
  const configured = configuredUrl();
  if (configured) return [configured];
  if (process.env.NODE_ENV === "development") return DEV_INTAKE_URLS;
  return [];
}

export async function syncToEventOps(payload: Record<string, unknown>) {
  const urls = urlsToTry();
  if (urls.length === 0) {
    console.error(
      "[ops-sync] EVENT_OPS_INTAKE_URL is not set, so this speaker was not sent to Runsheet."
    );
    return;
  }

  const body = JSON.stringify({
    eventId: eventId(),
    source: "bmoretechweek.com",
    ...payload,
  });

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Event-Id": eventId(),
        },
        body,
        cache: "no-store",
      });
      if (res.ok) return;
      const text = await res.text().catch(() => "");
      console.error("[ops-sync] intake failed", url, res.status, text);
    } catch (err) {
      console.error("[ops-sync] intake error", url, err);
    }
  }
}
