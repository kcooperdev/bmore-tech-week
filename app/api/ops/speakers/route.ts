import { NextResponse } from "next/server";
import { listSpeakers } from "@/lib/store";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Runsheet-Key",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET() {
  const speakers = await listSpeakers();

  return NextResponse.json(
    {
      speakers: speakers.map((speaker) => ({
        kind: "speak",
        category: "speakers",
        sourceId: speaker.id,
        name: speaker.name,
        email: speaker.email,
        phone: speaker.phone,
        company: speaker.company,
        title: speaker.title,
        cityState: speaker.cityState,
        talkTitle: speaker.talkTitle,
        sessionTitle: speaker.talkTitle,
        talkDescription: speaker.talkDescription,
        sessionDescription: speaker.talkDescription,
        takeaways: speaker.takeaways,
        format: speaker.format,
        sessionType: speaker.format,
        preferredNights: speaker.preferredNights,
        topics: speaker.topics,
        audienceLevel: speaker.audienceLevel,
        spokenBefore: speaker.spokenBefore ? "yes" : "no",
        panelistFallback: speaker.panelistFallback ? "yes" : "no",
        serveAsPanelist: speaker.panelistFallback ? "yes" : "no",
        accessibility: speaker.accessibility,
        notes: speaker.notes,
        previousTalks: speaker.previousTalks,
        linkedinUrl: speaker.linkedinUrl,
        websiteUrl: speaker.websiteUrl,
        createdAt: speaker.createdAt,
      })),
    },
    { headers: CORS }
  );
}
