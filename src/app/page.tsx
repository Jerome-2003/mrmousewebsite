import React from "react";
import Link from "next/link";
import { HeroPlayer } from "@/components/HeroPlayer";
import { ContactForm } from "@/components/ContactForm";
import { WaitlistForm } from "@/components/WaitlistForm";
import { CONTACT, PIECES, SERVICES } from "@/data/horde";

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="border-b border-steel">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pt-20">
          <div className="measure flex flex-col gap-6">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)]">
              An arsenal,
              <br />
              not an agency.
            </h1>
            <p className="text-lg text-ash sm:text-xl">
              A small business was never meant to hire four vendors — someone to build the
              site, someone for email, someone for the app, someone else when it breaks.
              Horde-M is one growing collection of tools and hands you pull from instead.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#contact"
                className="rounded-plate bg-brass px-6 py-3.5 font-semibold text-gunmetal transition-colors hover:bg-bone"
              >
                Put us to work
              </Link>
              <Link
                href="#rack"
                className="rounded-plate border border-rail px-6 py-3.5 font-semibold text-bone transition-colors hover:border-brass hover:text-brass"
              >
                See what&rsquo;s in the rack
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <HeroPlayer />
        </div>
      </section>

      {/* ================= THE ARGUMENT ================= */}
      <section className="border-b border-steel bg-plate">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="rail measure pl-6 sm:pl-8">
            <h2 className="text-[clamp(1.6rem,4vw,2.5rem)]">
              The little guys were priced out of having a team.
            </h2>
            <p className="mt-5 text-lg text-ash">
              Not out of software — out of the <em className="not-italic text-bone">people</em>. A shop
              owner in Festac needs a booking site, the system that runs behind it, an email address
              that is not a free one, and someone who answers when something breaks at 9pm. Four
              problems, four quotes, four people who each know one piece and none of whom talk to
              each other. A horde solves it the other way round: one set of tools, already built,
              already working together, that you pull from as you need them.
            </p>
          </div>
        </div>
      </section>

      {/* ================= THE ARMORY ================= */}
      <section id="armory" className="scroll-mt-20 border-b border-steel">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="measure flex flex-col gap-4">
            <h2 className="text-[clamp(1.9rem,5vw,3.2rem)]">The Armory</h2>
            <p className="text-lg text-ash">
              Three things you can pull down. Take one, or take all three and stop
              co-ordinating between vendors who have never met.
            </p>
          </div>

          {/* A rack, not floating cards: shared borders, one continuous unit. */}
          <div className="mt-12 grid gap-px border border-steel bg-steel md:grid-cols-3">
            {SERVICES.map((service) => (
              <article key={service.id} className="flex flex-col gap-5 bg-gunmetal p-7">
                <div className="flex flex-col gap-2">
                  <div className="h-1 w-10 bg-brass" aria-hidden="true" />
                  <h3 className="pt-3 text-2xl">{service.name}</h3>
                  <p className="font-display text-sm font-semibold uppercase tracking-[-0.01em] text-brass">
                    {service.line}
                  </p>
                </div>
                <p className="text-[0.95rem] text-ash">{service.body}</p>
                <ul className="mt-auto flex flex-col gap-2 border-t border-steel pt-5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ash">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-oxide" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE RACK ================= */}
      <section id="rack" className="scroll-mt-20 border-b border-steel bg-plate">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="measure flex flex-col gap-4">
            <h2 className="text-[clamp(1.9rem,5vw,3.2rem)]">The Rack</h2>
            <p className="text-lg text-ash">
              Everything currently in the horde. Each piece is live work for a real business —
              two of them run the same hotel group from opposite ends.
            </p>
          </div>

          <ol className="mt-12 flex flex-col">
            {PIECES.map((piece) => (
              <li key={piece.slug}>
                <Link
                  href={`/work/${piece.slug}`}
                  className="group grid grid-cols-[auto_1fr] gap-x-5 border-t border-steel py-7 transition-colors hover:bg-gunmetal sm:gap-x-8 sm:px-4"
                >
                  <span
                    className="tnum font-display text-2xl font-black text-brass"
                    style={{ borderLeft: `3px solid ${piece.accent}`, paddingLeft: "0.9rem" }}
                  >
                    {piece.rack}
                  </span>

                  <div className="flex min-w-0 flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <h3 className="text-xl transition-colors group-hover:text-brass sm:text-2xl">
                        {piece.name}
                      </h3>
                      <span
                        className="rounded-plate border px-2.5 py-1 text-xs font-semibold"
                        style={{
                          color: piece.status === "In build" ? "#d4a02a" : "#1f8e77",
                          borderColor:
                            piece.status === "In build"
                              ? "rgba(212,160,42,0.45)"
                              : "rgba(31,142,119,0.45)",
                        }}
                      >
                        {piece.status}
                      </span>
                    </div>
                    <p className="text-sm text-ash-dim">
                      {piece.kind} &middot; {piece.client}
                    </p>
                    <p className="measure pt-1 text-[0.95rem] text-ash">{piece.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          {/* ---- the next piece: CMS ---- */}
          <div className="mt-12 border-t border-steel pt-10">
            <div className="tag tag-brass flex flex-col gap-3 p-7">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl">In the forge</h3>
                <span className="rounded-plate border border-brass/45 px-2.5 py-1 text-xs font-semibold text-brass">
                  Coming soon
                </span>
              </div>
              <p className="measure text-[0.95rem] text-ash">
                A content management system is in build — the next piece into the rack, so the
                businesses we build sites for can run their own words and images without coming
                back to us for every change. More on it when it is ready to be used rather than
                announced.
              </p>
              <div className="max-w-md pt-2">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-5">
              <h2 className="text-[clamp(1.9rem,5vw,3.2rem)]">Put us to work</h2>
              <p className="text-lg text-ash">
                Tell us what the business does and what is currently breaking or missing. You
                will get a straight answer on whether we are the right people, what it would
                take, and roughly what it costs — not a discovery call.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-display text-[clamp(1.3rem,3.6vw,2rem)] font-black uppercase tracking-[-0.03em] text-brass underline decoration-brass/40 underline-offset-8 transition-colors hover:text-bone hover:decoration-bone/40"
                >
                  {CONTACT.emailDisplay}
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="font-display text-[clamp(1.3rem,3.6vw,2rem)] font-black uppercase tracking-[-0.03em] text-brass underline decoration-brass/40 underline-offset-8 transition-colors hover:text-bone hover:decoration-bone/40"
                >
                  {CONTACT.phoneDisplay}
                </a>
                <p className="text-sm text-ash-dim">
                  Call or message on WhatsApp — whichever is easier.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
