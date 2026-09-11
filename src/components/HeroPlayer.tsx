"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HORDE_ASSEMBLY, HordeAssembly } from "@/remotion/HordeAssembly";
import { Mark } from "@/components/Mark";

/* The Player is client-only: it measures the DOM and drives frames with rAF. */
const Player = dynamic(() => import("@remotion/player").then((m) => m.Player), {
  ssr: false,
  loading: () => <HeroStill />,
});

/**
 * Static stand-in shown before the player hydrates, and to anyone without JS.
 * It is the sequence's resting state — the rack already full — so the hero never
 * renders as an empty frame.
 */
const HeroStill: React.FC = () => (
  <div className="flex h-full w-full items-center justify-center gap-8 bg-gunmetal px-8">
    <Mark size={128} />
    <span className="font-display text-3xl font-black uppercase tracking-[-0.04em] text-bone sm:text-4xl">
      Four pieces
      <br />
      in the rack.
    </span>
  </div>
);

export const HeroPlayer: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /* Hold the layout until we know which version to show, so the hero never
     animates at someone who asked it not to. */
  if (reducedMotion === null) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden border border-steel bg-gunmetal">
        <HeroStill />
      </div>
    );
  }

  return (
    <div className="aspect-[16/9] w-full overflow-hidden border border-steel bg-gunmetal">
      <Player
        component={HordeAssembly}
        durationInFrames={HORDE_ASSEMBLY.durationInFrames}
        compositionWidth={HORDE_ASSEMBLY.width}
        compositionHeight={HORDE_ASSEMBLY.height}
        fps={HORDE_ASSEMBLY.fps}
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        /* When motion is suppressed, park on the assembled frame. */
        initialFrame={reducedMotion ? HORDE_ASSEMBLY.durationInFrames - 20 : 0}
        style={{ width: "100%", height: "100%" }}
        acknowledgeRemotionLicense
      />
    </div>
  );
};
