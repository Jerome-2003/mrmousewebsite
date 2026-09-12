import { Resend } from "resend";
import { CONTACT } from "@/data/horde";

/**
 * Mail sending, centralized.
 *
 * The Resend client is constructed per-call rather than at module scope: a
 * serverless function shouldn't crash at cold-start (or fail the build) just
 * because an env var isn't set yet in a preview deployment — it should fail
 * the one request that needed it, with a message that says why.
 */

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it in your host's environment variables (and .env.local for local dev) — see .env.example."
    );
  }
  return new Resend(key);
}

/** Where submissions land. Falls back to the published contact address. */
export const MAIL_TO = process.env.CONTACT_TO_EMAIL || CONTACT.email;

/**
 * Who mail appears to come from. Resend only allows sending from a domain
 * verified in its dashboard — until horde-m.name.ng is verified there, this
 * falls back to Resend's own onboarding address, which sends immediately with
 * no setup. Switch RESEND_FROM_EMAIL once the domain is verified.
 */
export const MAIL_FROM = process.env.RESEND_FROM_EMAIL || "Horde-M <onboarding@resend.dev>";

export type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail(input: SendMailInput) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: MAIL_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    replyTo: input.replyTo,
  });
  if (error) {
    throw new Error(`Resend rejected the message: ${error.message}`);
  }
  return data;
}

/** Escape user-supplied text before it goes into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
