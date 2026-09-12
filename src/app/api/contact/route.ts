import { NextResponse } from "next/server";
import { MAIL_TO, escapeHtml, sendMail } from "@/lib/mail";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  business?: string;
  message?: string;
  /** Honeypot — real visitors never fill this in. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a bot fills every field it finds; a person never sees this one.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const business = (body.business ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and a message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  try {
    // Receive: notify the horde.
    await sendMail({
      to: MAIL_TO,
      subject: `New inquiry from ${name}${business ? ` (${business})` : ""}`,
      replyTo: email,
      html: `
        <h2>New inquiry via horde-m.name.ng</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${business ? `<p><strong>Business:</strong> ${escapeHtml(business)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    // Send: confirm to the person who wrote in.
    await sendMail({
      to: email,
      subject: "We got your message — Horde-M",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for writing in. We've got your message and will reply from
        this address as soon as we've looked it over — usually within a
        business day or two.</p>
        <p>For reference, here's what you sent us:</p>
        <blockquote style="border-left:3px solid #d4a02a;margin:0;padding-left:12px;color:#444;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
        </blockquote>
        <p>— Horde-M</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please try again shortly, or email us directly." },
      { status: 502 }
    );
  }
}
