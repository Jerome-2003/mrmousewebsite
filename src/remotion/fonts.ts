import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Fonts are vendored into public/fonts rather than fetched from Google at
 * render time: the render browser has no trusted route to fonts.gstatic.com,
 * and a composition that needs the network to look right is a composition that
 * renders differently depending on where you run it.
 *
 * Both files are the Google latin subset. Note that this subset does not carry
 * the naira sign (U+20A6), so avoid ₦ in composition copy — it will render as a
 * missing glyph. Web pages are fine, since browsers fall back per glyph.
 */

export const DISPLAY = "Archivo";
export const BODY = "Spline Sans";

loadFont({
  family: DISPLAY,
  url: staticFile("fonts/archivo.woff2"),
  weight: "600 900",
  display: "block",
});

loadFont({
  family: BODY,
  url: staticFile("fonts/spline-sans.woff2"),
  weight: "400 600",
  display: "block",
});
