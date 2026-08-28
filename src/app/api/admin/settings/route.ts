import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings, SiteSettings } from "@/lib/settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.settings !== "object") {
    return NextResponse.json({ error: "Expected { settings: SiteSettings }" }, { status: 400 });
  }

  const settings = body.settings as SiteSettings;
  await saveSettings(settings);
  return NextResponse.json({ ok: true });
}
