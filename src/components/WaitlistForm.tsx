"use client";

import React, { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export const WaitlistForm: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
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
    return <p className="text-sm text-oxide">You&rsquo;re on the list — check your inbox for confirmation.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label htmlFor="wl-email" className="sr-only">
        Email address
      </label>
      <input
        id="wl-email"
        name="email"
        type="email"
        required
        placeholder="you@yourbusiness.com"
        className="min-w-0 flex-1 rounded-plate border border-brass/45 bg-gunmetal px-3.5 py-2.5 text-sm text-bone outline-none placeholder:text-ash-dim focus:border-brass"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="shrink-0 rounded-plate bg-brass px-5 py-2.5 text-sm font-semibold text-gunmetal transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Join the waitlist"}
      </button>
      {status === "error" && error ? (
        <p className="basis-full text-sm text-[#e07a5f]">{error}</p>
      ) : null}
    </form>
  );
};
