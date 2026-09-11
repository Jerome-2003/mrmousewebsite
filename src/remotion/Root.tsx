import React from "react";
import { Composition } from "remotion";
import { HordeAssembly, HORDE_ASSEMBLY } from "./HordeAssembly";
import { HordePromo, HORDE_PROMO } from "./HordePromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* The site's hero sequence. */}
      <Composition
        id="HordeAssembly"
        component={HordeAssembly}
        durationInFrames={HORDE_ASSEMBLY.durationInFrames}
        fps={HORDE_ASSEMBLY.fps}
        width={HORDE_ASSEMBLY.width}
        height={HORDE_ASSEMBLY.height}
      />

      {/* Promo, 15s. Portrait for Status, Stories and Reels. */}
      <Composition
        id="PromoPortrait"
        component={HordePromo}
        durationInFrames={HORDE_PROMO.durationInFrames}
        fps={HORDE_PROMO.fps}
        width={HORDE_PROMO.portrait.width}
        height={HORDE_PROMO.portrait.height}
      />

      {/* Same film, square, for LinkedIn and Instagram feed. */}
      <Composition
        id="PromoSquare"
        component={HordePromo}
        durationInFrames={HORDE_PROMO.durationInFrames}
        fps={HORDE_PROMO.fps}
        width={HORDE_PROMO.square.width}
        height={HORDE_PROMO.square.height}
      />
    </>
  );
};
