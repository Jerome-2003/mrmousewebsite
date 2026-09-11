"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Mark";

const NAV = [
  { href: "/#armory", label: "The Armory" },
  { href: "/#rack", label: "The Rack" },
  { href: "/download", label: "Mr. Mouse" },
  { href: "/#contact", label: "Contact" },
];

export const SiteHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-brass bg-gunmetal/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Horde-M, home">
          <Wordmark size={30} />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ash transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-plate bg-brass px-4 py-2 text-sm font-semibold text-gunmetal transition-colors hover:bg-bone"
          >
            Put us to work
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-plate border border-steel px-3 py-2 text-sm text-bone md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-steel px-5 pb-5 pt-3 md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-ash transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-plate bg-brass px-4 py-2.5 text-center font-semibold text-gunmetal"
          >
            Put us to work
          </Link>
        </nav>
      ) : null}
    </header>
  );
};
