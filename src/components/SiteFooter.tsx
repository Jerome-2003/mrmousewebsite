import React from "react";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CONTACT, PIECES } from "@/data/horde";

export const SiteFooter: React.FC = () => (
  <footer className="border-t border-steel bg-plate">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
      <div className="flex flex-col gap-4">
        <Mark size={40} />
        <p className="measure-tight text-sm text-ash">
          Horde-M builds and runs software for small businesses and independent operators —
          the ones who were never going to hire four vendors to get one job done.
        </p>
        <div className="flex flex-col gap-1">
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-display text-lg font-bold uppercase tracking-[-0.02em] text-brass hover:text-bone"
          >
            {CONTACT.emailDisplay}
          </a>
          <a
            href={CONTACT.phoneHref}
            className="font-display text-lg font-bold uppercase tracking-[-0.02em] text-brass hover:text-bone"
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs tracking-[0.14em] text-ash-dim">IN THE RACK</h2>
        <ul className="flex flex-col gap-2">
          {PIECES.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="text-sm text-ash hover:text-bone">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs tracking-[0.14em] text-ash-dim">THE ARMORY</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/#armory" className="text-sm text-ash hover:text-bone">
              Software builds
            </Link>
          </li>
          <li>
            <Link href="/#armory" className="text-sm text-ash hover:text-bone">
              Business email
            </Link>
          </li>
          <li>
            <Link href="/#armory" className="text-sm text-ash hover:text-bone">
              Contract engineering
            </Link>
          </li>
          <li>
            <Link href="/download" className="text-sm text-ash hover:text-bone">
              Download Mr. Mouse
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-steel">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-ash-dim sm:px-8">
        <span>&copy; {new Date().getFullYear()} Horde-M. Built in Nigeria.</span>
        <span>A growing collection of tools for the little guys.</span>
      </div>
    </div>
  </footer>
);
