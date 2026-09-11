import React from "react";
import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-5 py-24 sm:px-8 sm:py-32">
      <Mark size={56} />
      <h1 className="text-[clamp(2rem,6vw,3.5rem)]">Nothing in that slot.</h1>
      <p className="measure text-lg text-ash">
        The page you asked for is not in the rack. It may have been renamed, or never existed.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-plate bg-brass px-5 py-3 font-semibold text-gunmetal transition-colors hover:bg-bone"
        >
          Back to the horde
        </Link>
        <Link
          href="/#rack"
          className="rounded-plate border border-rail px-5 py-3 font-semibold text-bone transition-colors hover:border-brass hover:text-brass"
        >
          See the rack
        </Link>
      </div>
    </section>
  );
}
