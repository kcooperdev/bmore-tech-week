import { NextResponse } from "next/server";
import { saveTicket, SubmitError } from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    await saveTicket(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SubmitError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not save email." }, { status: 400 });
  }
}
