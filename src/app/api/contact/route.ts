import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSettings } from "@/lib/settings";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { name, email, subject, message } = body ?? {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email sending isn't configured yet. Add RESEND_API_KEY in Vercel, then redeploy." },
      { status: 500 }
    );
  }

  const settings = await getSettings();
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: settings.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to send message." },
      { status: 500 }
    );
  }
}
