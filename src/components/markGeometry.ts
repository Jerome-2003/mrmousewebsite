/**
 * The Horde-M mark, as geometry.
 *
 * Four separate tools standing in a rack that only read as an M once all four
 * are seated: two brass uprights and a bone V between them. Shared by the static
 * logo and the hero animation so the two can never drift apart.
 *
 * viewBox is 0 0 64 64. Tools stand between y=14 and the rack shelf at y=48.
 */

export const MARK_VIEWBOX = "0 0 64 64";

export const TOP = 14;
export const SHELF_Y = 48;

export type MarkPiece =
  | { kind: "rect"; x: number; y: number; width: number; height: number; color: string }
  | { kind: "poly"; points: string; color: string };

const BRASS = "#d4a02a";
const BONE = "#efebe2";

/** In rack order — index i corresponds to piece i of the horde. */
export const MARK_PIECES: MarkPiece[] = [
  // 01 — left upright
  { kind: "rect", x: 13, y: TOP, width: 8, height: SHELF_Y - TOP, color: BRASS },
  // 02 — left arm of the V, falling in toward the centre
  { kind: "poly", points: "21,14 28,14 36,46 29,46", color: BONE },
  // 03 — right arm of the V, falling in from the other side
  { kind: "poly", points: "36,14 43,14 35,46 28,46", color: BONE },
  // 04 — right upright
  { kind: "rect", x: 43, y: TOP, width: 8, height: SHELF_Y - TOP, color: BRASS },
];

/** The rack shelf the tools seat on — drawn last, as the stamp. */
export const MARK_SHELF = {
  x: 13,
  y: SHELF_Y,
  width: 38,
  height: 3,
  color: "#1f8e77",
};
