import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PIECES, CONTACT } from "../data/horde";
import { MARK_PIECES, MARK_SHELF, MARK_VIEWBOX } from "../components/markGeometry";
import { BODY, DISPLAY } from "./fonts";

/**
 * Horde-M promo — 15 seconds, built for WhatsApp Status, Stories and Reels.
 *
 * The argument in five beats: four scattered vendors, the turn, the four real
 * builds that replace them, the mark assembling, the address.
 *
 * The same four slots carry all the way through: the vendors you were going to
 * hire sit exactly where the work we've already shipped then lands.
 */

const C = {
  gunmetal: "#14181c",
  plate: "#1e252b",
  steel: "#2c353c",
  bone: "#efebe2",
  ash: "#8d9aa4",
  brass: "#d4a02a",
  oxide: "#1f8e77",
} as const;

const E = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
} as const;

/* ---------------- timing (30fps) ---------------- */
const T = {
  problemIn: 8,
  cards: [16, 32, 48, 64],
  snap: 96,
  turnLine: 118,
  proofOut: 158,
  proofIn: [168, 186, 204, 222],
  proofCaption: 248,
  markOut: 300,
  markTools: [312, 324, 336, 348],
  markShelf: 362,
  markFrame: 370,
  cta: 396,
  ctaUrl: 408,
  ctaServices: 420,
} as const;

export const HORDE_PROMO = {
  fps: 30,
  durationInFrames: 450,
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;

/** The four things a small business ends up paying four different people for. */
const VENDORS = [
  "Someone for the website",
  "Someone for email",
  "Someone for the app",
  "Someone when it breaks",
];

/** Deliberately untidy resting angles — these four were never a set. */
const SCATTER = [
  { rotate: -2.6, x: -26 },
  { rotate: 1.9, x: 34 },
  { rotate: -1.4, x: -14 },
  { rotate: 2.4, x: 22 },
];

export const HordePromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = width / 1080;
  const tight = height / width < 1.4;

  /* Each beat fades the previous one out, so only one thing is ever on screen. */
  const problemAlpha = interpolate(frame, [T.problemIn, T.problemIn + 10, T.proofOut, T.proofOut + 12], [0, 1, 1, 0], E);
  const proofAlpha = interpolate(frame, [T.proofIn[0] - 8, T.proofIn[0] + 6, T.markOut, T.markOut + 14], [0, 1, 1, 0], E);
  const markAlpha = interpolate(frame, [T.markTools[0] - 10, T.markTools[0] + 6], [0, 1], E);

  const slotGap = (tight ? 14 : 22) * u;
  const cardPad = `${(tight ? 20 : 28) * u}px ${30 * u}px`;

  return (
    <AbsoluteFill style={{ background: C.gunmetal, fontFamily: BODY }}>
      {/* the rack's upright, drawn down the left edge for the whole film */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 8 * u,
          background: C.brass,
          transformOrigin: "top",
          scale: interpolate(frame, [0, 26], ["1 0", "1 1"], E),
        }}
      />

      {/* ============ BEAT 1 + 2 — four vendors, then the turn ============ */}
      <AbsoluteFill
        style={{
          opacity: problemAlpha,
          padding: `${(tight ? 60 : 130) * u}px ${64 * u}px ${(tight ? 60 : 130) * u}px ${96 * u}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: (tight ? 30 : 56) * u,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 * u }}>
          {["Four vendors.", "Four invoices.", "None of them talk."].map((line, i) => (
            <span
              key={line}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                textTransform: "uppercase",
                fontSize: (tight ? 66 : 88) * u,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: i === 2 ? C.brass : C.bone,
                opacity: interpolate(frame, [T.problemIn + i * 14, T.problemIn + i * 14 + 12], [0, 1], E),
                translate: interpolate(
                  frame,
                  [T.problemIn + i * 14, T.problemIn + i * 14 + 14],
                  [`${-30 * u}px 0px`, "0px 0px"],
                  E
                ),
              }}
            >
              {line}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: slotGap }}>
          {VENDORS.map((label, i) => {
            const inAt = T.cards[i];
            return (
              <div
                key={label}
                style={{
                  background: C.plate,
                  border: `${2 * u}px solid ${C.steel}`,
                  borderRadius: 2,
                  padding: cardPad,
                  display: "flex",
                  alignItems: "center",
                  gap: 20 * u,
                  opacity: interpolate(frame, [inAt, inAt + 10], [0, 1], E),
                  /* scattered on arrival, snapped into the rack at the turn */
                  rotate: interpolate(frame, [inAt, inAt + 10, T.snap, T.snap + 16], [`${SCATTER[i].rotate * 2}deg`, `${SCATTER[i].rotate}deg`, `${SCATTER[i].rotate}deg`, "0deg"], E),
                  translate: interpolate(
                    frame,
                    [inAt, inAt + 12, T.snap, T.snap + 16],
                    [`${SCATTER[i].x + 70 * u}px 0px`, `${SCATTER[i].x}px 0px`, `${SCATTER[i].x}px 0px`, "0px 0px"],
                    E
                  ),
                }}
              >
                <span style={{ fontSize: (tight ? 26 : 34) * u, color: C.bone }}>{label}</span>
              </div>
            );
          })}
        </div>

        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: (tight ? 62 : 84) * u,
            letterSpacing: "-0.04em",
            color: C.bone,
            opacity: interpolate(frame, [T.turnLine, T.turnLine + 12], [0, 1], E),
            translate: interpolate(frame, [T.turnLine, T.turnLine + 14], [`0px ${24 * u}px`, "0px 0px"], E),
          }}
        >
          Or one horde.
        </span>
      </AbsoluteFill>

      {/* ============ BEAT 3 — the work that already exists ============ */}
      <AbsoluteFill
        style={{
          opacity: proofAlpha,
          padding: `${(tight ? 60 : 130) * u}px ${64 * u}px ${(tight ? 60 : 130) * u}px ${96 * u}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: (tight ? 26 : 46) * u,
        }}
      >
        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: (tight ? 54 : 72) * u,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: C.bone,
            opacity: interpolate(frame, [T.proofIn[0] - 4, T.proofIn[0] + 10], [0, 1], E),
          }}
        >
          Already built.
          <br />
          Already running.
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: slotGap }}>
          {PIECES.map((p, i) => {
            const inAt = T.proofIn[i];
            return (
              <div
                key={p.slug}
                style={{
                  background: C.plate,
                  border: `${2 * u}px solid ${C.steel}`,
                  borderLeft: `${6 * u}px solid ${p.accent}`,
                  borderRadius: 2,
                  padding: cardPad,
                  display: "flex",
                  alignItems: "center",
                  gap: 26 * u,
                  opacity: interpolate(frame, [inAt, inAt + 12], [0, 1], E),
                  translate: interpolate(frame, [inAt, inAt + 16], [`${80 * u}px 0px`, "0px 0px"], E),
                }}
              >
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 900,
                    fontSize: (tight ? 30 : 38) * u,
                    color: C.brass,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {p.rack}
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 * u, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "-0.025em",
                      fontSize: (tight ? 27 : 34) * u,
                      lineHeight: 1.1,
                      color: C.bone,
                    }}
                  >
                    {p.name}
                  </span>
                  <span style={{ fontSize: (tight ? 21 : 26) * u, color: C.ash }}>{p.kind}</span>
                </span>
              </div>
            );
          })}
        </div>

        <span
          style={{
            fontSize: (tight ? 25 : 31) * u,
            color: C.oxide,
            opacity: interpolate(frame, [T.proofCaption, T.proofCaption + 12], [0, 1], E),
          }}
        >
          Real businesses. Live right now.
        </span>
      </AbsoluteFill>

      {/* ============ BEAT 4 + 5 — the mark, then the address ============ */}
      <AbsoluteFill
        style={{
          opacity: markAlpha,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: (tight ? 28 : 54) * u,
          padding: `0 ${72 * u}px 0 ${96 * u}px`,
        }}
      >
        <svg width={(tight ? 300 : 420) * u} height={(tight ? 300 : 420) * u} viewBox={MARK_VIEWBOX}>
          <rect
            x={1}
            y={1}
            width={62}
            height={62}
            rx={2}
            fill="none"
            stroke={C.brass}
            strokeWidth={2}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [T.markFrame, T.markFrame + 30], [1, 0], E)}
          />
          {MARK_PIECES.map((piece, i) => {
            const style: React.CSSProperties = {
              transformBox: "fill-box",
              transformOrigin: "bottom",
              scale: interpolate(frame, [T.markTools[i], T.markTools[i] + 18], ["1 0", "1 1"], E),
            };
            return piece.kind === "rect" ? (
              <rect key={i} x={piece.x} y={piece.y} width={piece.width} height={piece.height} fill={piece.color} style={style} />
            ) : (
              <polygon key={i} points={piece.points} fill={piece.color} style={style} />
            );
          })}
          <rect
            x={MARK_SHELF.x}
            y={MARK_SHELF.y}
            width={MARK_SHELF.width}
            height={MARK_SHELF.height}
            fill={MARK_SHELF.color}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              scale: interpolate(frame, [T.markShelf, T.markShelf + 14], ["0 1", "1 1"], E),
            }}
          />
        </svg>

        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: (tight ? 76 : 104) * u,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            color: C.bone,
            opacity: interpolate(frame, [T.cta, T.cta + 14], [0, 1], E),
          }}
        >
          Horde&#8209;M
        </span>

        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: (tight ? 42 : 56) * u,
            letterSpacing: "-0.02em",
            color: C.brass,
            opacity: interpolate(frame, [T.ctaUrl, T.ctaUrl + 12], [0, 1], E),
            translate: interpolate(frame, [T.ctaUrl, T.ctaUrl + 14], [`0px ${18 * u}px`, "0px 0px"], E),
          }}
        >
          horde&#8209;m.agency.ng
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10 * u,
            opacity: interpolate(frame, [T.ctaServices, T.ctaServices + 14], [0, 1], E),
          }}
        >
          {["Software builds", "Business email", "Contract engineering"].map((s) => (
            <span key={s} style={{ fontSize: (tight ? 26 : 33) * u, color: C.ash }}>
              {s}
            </span>
          ))}
          <span style={{ fontSize: (tight ? 24 : 30) * u, color: C.oxide, marginTop: 12 * u }}>
            {CONTACT.emailDisplay}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
