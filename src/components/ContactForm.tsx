"use client";

import React, { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="tag flex flex-col gap-3 p-7">
        <h3 className="text-lg text-oxide">Message sent</h3>
        <p className="text-sm text-ash">
          It's in the inbox, and a confirmation is on its way to your own email. We reply within
          a business day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="self-start text-sm text-brass underline decoration-brass/40 underline-offset-4 hover:text-bone"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="tag flex flex-col gap-5 p-7">
      <h3 className="text-lg">Tell us what you need</h3>

      {/* Honeypot: hidden from sighted users and screen readers, present for bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className="text-sm text-ash-dim">
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            className="rounded-plate border border-steel bg-gunmetal px-3.5 py-2.5 text-bone outline-none placeholder:text-ash-dim focus:border-brass"
            placeholder="Chidinma Okafor"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-business" className="text-sm text-ash-dim">
            What the business does <span className="text-ash-dim">(optional)</span>
          </label>
          <input
            id="cf-business"
            name="business"
            type="text"
            className="rounded-plate border border-steel bg-gunmetal px-3.5 py-2.5 text-bone outline-none placeholder:text-ash-dim focus:border-brass"
            placeholder="Runs a shop, a hotel, a small team — one line"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className="text-sm text-ash-dim">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            className="rounded-plate border border-steel bg-gunmetal px-3.5 py-2.5 text-bone outline-none placeholder:text-ash-dim focus:border-brass"
            placeholder="you@yourbusiness.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-message" className="text-sm text-ash-dim">
            What you need, and what's happening now
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={4}
            className="resize-y rounded-plate border border-steel bg-gunmetal px-3.5 py-2.5 text-bone outline-none placeholder:text-ash-dim focus:border-brass"
            placeholder="A site, a system, email, or hands on something that already exists — and whether there's a real deadline."
          />
        </div>
      </div>

      {error ? <p className="text-sm text-[#e07a5f]">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-plate bg-brass px-6 py-3 font-semibold text-gunmetal transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};
