import { NextResponse } from "next/server";
import { MAIL_TO, escapeHtml, sendMail } from "@/lib/mail";

export const runtime = "nodejs";

type WaitlistBody = {
  email?: string;
  /** Honeypot — real visitors never fill this in. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  try {
    // Receive: log the signup to the horde.
    await sendMail({
      to: MAIL_TO,
      subject: "New CMS waitlist signup",
      html: `<p><strong>${escapeHtml(email)}</strong> joined the CMS waitlist.</p>`,
    });

    // Send: confirm to the person who signed up.
    await sendMail({
      to: email,
      subject: "You're on the list — Horde-M CMS",
      html: `
        <p>You're on the waitlist for the Horde-M CMS — the next piece into
        the rack.</p>
        <p>We'll email this address the moment it's ready to try. No spam,
        no other lists — just this one thing.</p>
        <p>— Horde-M</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist signup send failed:", err);
    return NextResponse.json(
      { error: "Couldn't sign you up right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
