import React from "react";
import { Composition } from "remotion";
import { HordeAssembly, HORDE_ASSEMBLY } from "./HordeAssembly";
import { MrMouseTour, MRMOUSE_TOUR } from "./mrmouse/MrMouseTour";
import { MrMouseTutorial, MRMOUSE_TUTORIAL } from "./mrmouse/MrMouseTutorial";
import { MrMouseOffline, MRMOUSE_OFFLINE } from "./mrmouse/MrMouseOffline";
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

      {/* Mr. Mouse — promo and walkthrough in one, 30s.
          Landscape master for the site and YouTube. */}
      <Composition
        id="MrMouseTour"
        component={MrMouseTour}
        durationInFrames={MRMOUSE_TOUR.durationInFrames}
        fps={MRMOUSE_TOUR.fps}
        width={MRMOUSE_TOUR.width}
        height={MRMOUSE_TOUR.height}
      />

      {/* Same film, portrait. WhatsApp Status is where this audience
          actually watches things, so it is not an afterthought — the
          layout stacks rather than being letterboxed. */}
      <Composition
        id="MrMouseTourPortrait"
        component={MrMouseTour}
        durationInFrames={MRMOUSE_TOUR.durationInFrames}
        fps={MRMOUSE_TOUR.fps}
        width={MRMOUSE_TOUR.portrait.width}
        height={MRMOUSE_TOUR.portrait.height}
      />

      {/* Mr. Mouse — the walkthrough, 58s. Six steps in the order a shop
          owner meets them, over real captures of the running app. */}
      <Composition
        id="MrMouseTutorial"
        component={MrMouseTutorial}
        durationInFrames={MRMOUSE_TUTORIAL.durationInFrames}
        fps={MRMOUSE_TUTORIAL.fps}
        width={MRMOUSE_TUTORIAL.width}
        height={MRMOUSE_TUTORIAL.height}
      />
      <Composition
        id="MrMouseTutorialPortrait"
        component={MrMouseTutorial}
        durationInFrames={MRMOUSE_TUTORIAL.durationInFrames}
        fps={MRMOUSE_TUTORIAL.fps}
        width={MRMOUSE_TUTORIAL.portrait.width}
        height={MRMOUSE_TUTORIAL.portrait.height}
      />

      {/* Episode 2 — "No network, no wahala." 30s spot on offline-first. */}
      <Composition
        id="MrMouseOffline"
        component={MrMouseOffline}
        durationInFrames={MRMOUSE_OFFLINE.durationInFrames}
        fps={MRMOUSE_OFFLINE.fps}
        width={MRMOUSE_OFFLINE.width}
        height={MRMOUSE_OFFLINE.height}
      />
      <Composition
        id="MrMouseOfflinePortrait"
        component={MrMouseOffline}
        durationInFrames={MRMOUSE_OFFLINE.durationInFrames}
        fps={MRMOUSE_OFFLINE.fps}
        width={MRMOUSE_OFFLINE.portrait.width}
        height={MRMOUSE_OFFLINE.portrait.height}
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
