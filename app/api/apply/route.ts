import { NextResponse } from "next/server";
import { saveApplication, SubmitError } from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const saved = await saveApplication(body);
    return NextResponse.json({ ok: true, id: saved?.id });
  } catch (error) {
    if (error instanceof SubmitError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not save application." }, { status: 400 });
  }
}
