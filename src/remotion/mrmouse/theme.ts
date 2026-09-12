import { Easing, continueRender, delayRender, staticFile } from "remotion";

/**
 * Mr. Mouse's own design tokens, shared by every film about it. These are the
 * product's values rather than this site's — a film about Mr. Mouse should look
 * like Mr. Mouse, not like the studio that made it.
 */

export const C = {
  paper: "#F7F5EF",
  paperSunk: "#EFECE2",
  rule: "#DDD8C9",
  ink: "#1C2118",
  inkSoft: "#5A6152",
  /** The single interactive colour. A deeper green than `moss` on purpose:
   *  moss means money in, and a button in moss reads as a credit. */
  action: "#2F5741",
  moss: "#4F7355",
  mossLift: "#8FB49B",
  clay: "#A8483A",
} as const;

export const DISPLAY = '"Syne", system-ui, sans-serif';
export const BODY = '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif';
export const MONO = '"IBM Plex Mono", ui-monospace, monospace';

export const EASE = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
} as const;

export const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * Remotion renders frames headlessly, so a webfont that is merely referenced in
 * CSS is not loaded in time and every frame bakes the fallback. Block the render
 * until the faces are genuinely ready.
 *
 * Idempotent: several compositions call this, but the work happens once.
 */
let fontsStarted = false;

export const useFonts = () => {
  if (fontsStarted || typeof window === "undefined") return;
  fontsStarted = true;

  const handle = delayRender("Loading Mr. Mouse typefaces");
  Promise.all([
    new FontFace("Syne", `url(${staticFile("fonts/syne-var-latin.woff2")}) format("woff2")`, {
      weight: "400 800",
    }).load(),
    new FontFace(
      "IBM Plex Sans",
      `url(${staticFile("fonts/ibm-plex-sans-var-latin.woff2")}) format("woff2")`,
      { weight: "400 600" }
    ).load(),
    new FontFace(
      "IBM Plex Mono",
      `url(${staticFile("fonts/ibm-plex-mono-400-latin.woff2")}) format("woff2")`,
      { weight: "400" }
    ).load(),
  ])
    .then((faces) => {
      faces.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
};
