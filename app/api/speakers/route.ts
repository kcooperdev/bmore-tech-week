import { NextResponse } from "next/server";
import { uploadSpeakerHeadshot } from "@/lib/headshot";
import { saveSpeaker, SubmitError } from "@/lib/submissions";

async function bodyFrom(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return (await request.json()) as Record<string, unknown>;
  }

  const form = await request.formData();
  const body: Record<string, unknown> = {};
  for (const key of new Set(form.keys())) {
    const values = form.getAll(key);
    if (values.length > 1) {
      body[key] = values.map((value) => (typeof value === "string" ? value : "")).filter(Boolean);
      continue;
    }
    const value = values[0];
    if (value instanceof File) body[key] = value;
    else body[key] = String(value ?? "");
  }

  const headshot = body.headshot;
  if (!(headshot instanceof File) || !headshot.size) {
    throw new SubmitError("Headshot is required");
  }
  body.headshotUrl = await uploadSpeakerHeadshot(headshot);
  delete body.headshot;
  return body;
}

export async function POST(request: Request) {
  try {
    const body = await bodyFrom(request);
    const saved = await saveSpeaker(body);
    return NextResponse.json({ ok: true, id: saved?.id });
  } catch (error) {
    if (error instanceof SubmitError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not save talk." }, { status: 400 });
  }
}
