import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT, PIECES, getPiece } from "@/data/horde";
import { InterfaceFigure } from "@/components/InterfaceFigure";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PIECES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return {};
  return {
    title: piece.name,
    description: piece.summary,
    openGraph: { title: `${piece.name} — Horde-M`, description: piece.summary },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();

  const paired = piece.pairedWith ? getPiece(piece.pairedWith.slug) : undefined;
  const position = PIECES.findIndex((p) => p.slug === piece.slug);
  const next = PIECES[(position + 1) % PIECES.length];

  return (
    <>
      {/* ================= PLATE HEADER ================= */}
      <header className="border-b border-steel">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Link href="/#rack" className="text-sm text-ash transition-colors hover:text-brass">
            &larr; The Rack
          </Link>

          <div
            className="mt-8 flex flex-col gap-5 pl-5 sm:pl-7"
            style={{ borderLeft: `4px solid ${piece.accent}` }}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="tnum font-display text-3xl font-black text-brass">{piece.rack}</span>
              <span
                className="rounded-plate border px-2.5 py-1 text-xs font-semibold"
                style={{
                  color: piece.status === "In build" ? "#d4a02a" : "#1f8e77",
                  borderColor:
                    piece.status === "In build" ? "rgba(212,160,42,0.45)" : "rgba(31,142,119,0.45)",
                }}
              >
                {piece.status}
              </span>
            </div>

            <h1 className="text-[clamp(2.1rem,6.5vw,4rem)]">{piece.name}</h1>

            {piece.productName ? (
              <p className="text-sm text-ash-dim">
                Ships to customers as <span className="text-bone">{piece.productName}</span>
              </p>
            ) : null}

            <p className="measure text-lg text-ash">{piece.summary}</p>

            <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-steel pt-6">
              <div className="flex flex-col gap-1">
                <dt className="text-xs tracking-[0.14em] text-ash-dim">CLIENT</dt>
                <dd className="text-sm text-bone">{piece.client}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs tracking-[0.14em] text-ash-dim">DISCIPLINE</dt>
                <dd className="text-sm text-bone">{piece.kind}</dd>
              </div>
              {piece.url ? (
                <div className="flex flex-col gap-1">
                  <dt className="text-xs tracking-[0.14em] text-ash-dim">LIVE</dt>
                  <dd>
                    <a
                      href={piece.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brass underline decoration-brass/40 underline-offset-4 hover:text-bone"
                    >
                      {piece.urlLabel}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </header>

      {/* ================= PROBLEM ================= */}
      <section className="border-b border-steel bg-plate">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
            <h2 className="text-2xl sm:text-3xl">What was wrong</h2>
            <div className="flex flex-col gap-5">
              {piece.problem.map((para) => (
                <p key={para.slice(0, 32)} className="measure text-lg text-ash">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="border-b border-steel">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
            <h2 className="text-2xl sm:text-3xl">What we built</h2>
            <div className="flex flex-col gap-5">
              {piece.solution.map((para) => (
                <p key={para.slice(0, 32)} className="measure text-lg text-ash">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <InterfaceFigure slug={piece.slug} />
          </div>
        </div>
      </section>

      {/* ================= SPEC + PROOF ================= */}
      <section className="border-b border-steel bg-plate">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl">Spec plate</h2>
            <dl className="flex flex-col">
              {piece.spec.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[9rem_1fr] gap-4 border-t border-steel py-3.5"
                >
                  <dt className="text-sm text-ash-dim">{row.label}</dt>
                  <dd className="text-sm text-bone">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl">In the shipped product</h2>
            <ul className="flex flex-col gap-3.5">
              {piece.proof.map((item) => (
                <li key={item.slice(0, 32)} className="flex gap-3 text-[0.95rem] text-ash">
                  <span
                    className="mt-[0.5rem] h-1.5 w-1.5 shrink-0"
                    style={{ background: piece.accent }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PAIRED / OWN PAGE ================= */}
      {paired || piece.ownPage ? (
        <section className="border-b border-steel">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            {/* Flex, not a fixed 2-column grid: a piece with only one of these
                should fill the row rather than leave an empty cell. */}
            <div className="flex flex-wrap gap-5">
              {paired && piece.pairedWith ? (
                <Link
                  href={`/work/${paired.slug}`}
                  className="tag group flex min-w-[18rem] flex-1 flex-col gap-2 p-6 transition-colors hover:border-brass"
                >
                  <span className="text-xs tracking-[0.14em] text-ash-dim">PAIRED PIECE</span>
                  <span className="font-display text-xl font-black uppercase tracking-[-0.03em] text-bone transition-colors group-hover:text-brass">
                    {paired.name}
                  </span>
                  <span className="text-sm text-ash">{piece.pairedWith.note}</span>
                </Link>
              ) : null}

              {piece.ownPage ? (
                <Link
                  href={piece.ownPage.href}
                  className="tag tag-brass group flex min-w-[18rem] flex-1 flex-col gap-2 p-6 transition-colors hover:border-brass"
                >
                  <span className="text-xs tracking-[0.14em] text-ash-dim">GET IT</span>
                  <span className="font-display text-xl font-black uppercase tracking-[-0.03em] text-brass">
                    {piece.ownPage.label}
                  </span>
                  <span className="text-sm text-ash">
                    Android and Windows, plus setup and everything the app does in full.
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ================= NEXT ================= */}
      <section>
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-steel pb-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.14em] text-ash-dim">NEXT IN THE RACK</span>
              <Link
                href={`/work/${next.slug}`}
                className="font-display text-[clamp(1.5rem,4vw,2.4rem)] font-black uppercase tracking-[-0.035em] text-bone hover:text-brass"
              >
                {next.name}
              </Link>
            </div>
            <span className="tnum font-display text-4xl font-black text-ash-dim">{next.rack}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-ash">Need something like this for your own business?</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-plate bg-brass px-5 py-3 font-semibold text-gunmetal transition-colors hover:bg-bone"
            >
              {CONTACT.emailDisplay}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="rounded-plate border border-rail px-5 py-3 font-semibold text-bone transition-colors hover:border-brass hover:text-brass"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
