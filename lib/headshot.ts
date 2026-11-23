import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { SubmitError } from "@/lib/submissions";

const BUCKET = "speaker-headshots";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

function extensionFor(type: string, name: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/heic" || type === "image/heif") return "heic";
  const fromName = name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  return "jpg";
}

export async function uploadSpeakerHeadshot(file: File) {
  if (!isSupabaseConfigured()) {
    throw new SubmitError("Photo upload is not configured yet.", 503);
  }
  if (!file.size) throw new SubmitError("Headshot is required");
  if (file.size > MAX_BYTES) throw new SubmitError("Headshot must be 5 MB or smaller");
  const type = (file.type || "").toLowerCase();
  if (type && !ALLOWED.has(type)) {
    throw new SubmitError("Headshot must be a JPG, PNG, WEBP, or HEIC photo");
  }

  const ext = extensionFor(type, file.name || "headshot.jpg");
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const supabase = getSupabase();
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType: type || "image/jpeg",
    upsert: false,
  });
  if (error) {
    throw new SubmitError("Could not upload headshot.", 502);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data.publicUrl) throw new SubmitError("Could not upload headshot.", 502);
  return data.publicUrl;
}
