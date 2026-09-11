import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { DOWNLOADS, FAQS, FEATURE_GROUPS, STEPS } from "@/data/mrmouse";

export const metadata: Metadata = {
  title: "Download Mr. Mouse",
  description:
    "Download Mr. Mouse for Android and Windows — Cash Book, Sales and Purchases Journals, Inventory, Trial Balance and P&L that keep themselves, built for Nigerian businesses.",
};

export default function DownloadPage() {
  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="border-b border-steel">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Link href="/work/mr-mouse" className="text-sm text-ash transition-colors hover:text-brass">
            &larr; Mr. Mouse in the rack
          </Link>

          <div className="mt-8 flex flex-col gap-5">
            <h1 className="text-[clamp(2.2rem,6.5vw,4.2rem)]">
              Everything you need to run your books, in one place.
            </h1>
            <p className="measure text-lg text-ash sm:text-xl">
              Mr. Mouse keeps your Cash Book, Sales &amp; Purchases Journals, Inventory, Trial
              Balance and P&amp;L in sync — across every device your team uses, and through
              WhatsApp or Telegram if you&rsquo;d rather work from chat.
            </p>
            <p className="text-sm text-ash-dim">Free trial available — no card needed to start.</p>
          </div>
        </div>
      </header>

      {/* ================= DOWNLOADS ================= */}
      <section id="get" className="scroll-mt-20 border-b border-steel bg-plate">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="measure flex flex-col gap-4">
            <h2 className="text-[clamp(1.7rem,4.5vw,2.6rem)]">Get it on your devices</h2>
            <p className="text-lg text-ash">
              Install it where you run the business — on the shop floor with Android, or at the
              back office on desktop. Both stay in sync with each other automatically.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-steel bg-steel md:grid-cols-2">
            {DOWNLOADS.map((dl) => (
              <article key={dl.id} className="flex flex-col gap-5 bg-gunmetal p-7">
                <div className="flex flex-col gap-2">
                  <div className="h-1 w-10 bg-brass" aria-hidden="true" />
                  <h3 className="pt-3 text-2xl">{dl.platform}</h3>
                  <p className="text-sm text-ash-dim">{dl.meta}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {dl.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-ash">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-oxide" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={dl.href}
                  className="mt-auto self-start rounded-plate bg-brass px-5 py-3 font-semibold text-gunmetal transition-colors hover:bg-bone"
                >
                  {dl.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="border-b border-steel">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="measure flex flex-col gap-4">
            <h2 className="text-[clamp(1.7rem,4.5vw,2.6rem)]">
              From install to your first balanced book
            </h2>
            <p className="text-lg text-ash">
              Exactly what happens after you download it, start to finish.
            </p>
          </div>

          {/* Genuinely a sequence, so it is genuinely numbered. */}
          <ol className="mt-10 flex flex-col">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-t border-steel py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8"
              >
                <span className="tnum font-display text-xl font-black text-brass sm:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="measure text-[0.95rem] text-ash">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-b border-steel bg-plate">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="measure flex flex-col gap-4">
            <h2 className="text-[clamp(1.7rem,4.5vw,2.6rem)]">Everything it does, in detail</h2>
            <p className="text-lg text-ash">
              Every book, sync mechanism, integration and safeguard built into the app.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-14">
            {FEATURE_GROUPS.map((group) => (
              <div key={group.name} className="flex flex-col gap-5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-brass pb-3">
                  <h3 className="text-2xl">{group.name}</h3>
                  <span className="text-sm text-ash-dim">{group.note}</span>
                </div>
                <dl className="flex flex-col">
                  {group.rows.map(([term, desc]) => (
                    <div
                      key={term}
                      className="grid gap-1 border-t border-steel py-4 sm:grid-cols-[16rem_1fr] sm:gap-6"
                    >
                      <dt className="font-display font-bold uppercase tracking-[-0.01em] text-bone">
                        {term}
                      </dt>
                      <dd className="measure text-[0.95rem] text-ash">{desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-b border-steel">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-[clamp(1.7rem,4.5vw,2.6rem)]">Common questions</h2>
          <div className="mt-8 flex flex-col">
            {FAQS.map((faq) => (
              <div key={faq.q} className="flex flex-col gap-2 border-t border-steel py-6">
                <h3 className="text-lg">{faq.q}</h3>
                <p className="measure text-[0.95rem] text-ash">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="tag tag-brass flex flex-col gap-5 p-8 sm:p-10">
            <h2 className="text-[clamp(1.6rem,4vw,2.4rem)]">
              Get your books off paper and spreadsheets today.
            </h2>
            <p className="text-ash">No card required to start.</p>
            <div className="flex flex-wrap gap-3">
              {DOWNLOADS.map((dl) => (
                <a
                  key={dl.id}
                  href={dl.href}
                  className="rounded-plate border border-rail px-5 py-3 font-semibold text-bone transition-colors hover:border-brass hover:text-brass"
                >
                  {dl.cta}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
