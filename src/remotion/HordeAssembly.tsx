import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { PIECES } from "../data/horde";
import { MARK_PIECES, MARK_SHELF, MARK_VIEWBOX } from "../components/markGeometry";

/**
 * "The rack fills."
 *
 * The hero motion moment for Horde-M. Four real pieces of work rack in one at a
 * time; each one that lands raises one tool of the Horde-M mark. When all four
 * are standing, the shelf seats under them and the tag stamps shut.
 *
 * The idea is literal on purpose: the mark is not a logo that happens to
 * animate, it is four separate tools that only read as an M once every one of
 * them is in the rack.
 */

const COLORS = {
  gunmetal: "#14181c",
  plate: "#1e252b",
  steel: "#2c353c",
  bone: "#efebe2",
  ash: "#8d9aa4",
  brass: "#d4a02a",
} as const;

const DISPLAY = 'var(--font-archivo), "Archivo", system-ui, sans-serif';
const BODY = 'var(--font-spline), "Spline Sans", ui-sans-serif, system-ui, sans-serif';

const EASE = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
} as const;

/** Frame at which piece `i` seats into the rack. */
const seatFrame = (i: number) => 26 + i * 34;
const SHELF = 168;
const FRAME_IN = 178;
const WORDMARK = 208;

export const HORDE_ASSEMBLY = {
  width: 1280,
  height: 720,
  fps: 30,
  durationInFrames: 300,
} as const;

/** One tool of the mark. Rises from its own foot as its piece seats. */
const MarkTool: React.FC<{ index: number; frame: number }> = ({ index, frame }) => {
  const piece = MARK_PIECES[index];
  const seat = seatFrame(index);

  const style: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "bottom",
    scale: interpolate(frame, [seat, seat + 22], ["1 0", "1 1"], EASE),
  };

  return piece.kind === "rect" ? (
    <rect
      x={piece.x}
      y={piece.y}
      width={piece.width}
      height={piece.height}
      fill={piece.color}
      style={style}
    />
  ) : (
    <polygon points={piece.points} fill={piece.color} style={style} />
  );
};

/** A tool plate sliding into the rack — one piece of real work. */
const RackPlate: React.FC<{
  index: number;
  rack: string;
  name: string;
  kind: string;
  accent: string;
  frame: number;
}> = ({ index, rack, name, kind, accent, frame }) => {
  const seat = seatFrame(index);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "16px 24px",
        background: COLORS.plate,
        border: `1px solid ${COLORS.steel}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 2,
        opacity: interpolate(frame, [seat - 8, seat + 8], [0, 1], EASE),
        translate: interpolate(frame, [seat - 8, seat + 14], ["56px 0px", "0px 0px"], EASE),
      }}
    >
      <span
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: 22,
          color: COLORS.brass,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {rack}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 20,
            color: COLORS.bone,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
        <span style={{ fontFamily: BODY, fontSize: 14, color: COLORS.ash, whiteSpace: "nowrap" }}>
          {kind}
        </span>
      </span>
    </div>
  );
};

export const HordeAssembly: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.gunmetal, fontFamily: BODY }}>
      {/* The rack's own upright, down the left edge. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: COLORS.brass,
          transformOrigin: "top",
          scale: interpolate(frame, [0, 34], ["1 0", "1 1"], EASE),
        }}
      />

      <AbsoluteFill
        style={{ flexDirection: "row", alignItems: "center", gap: 64, padding: "0 80px" }}
      >
        {/* ---- left: the mark assembling inside its tag ---- */}
        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <svg width={300} height={300} viewBox={MARK_VIEWBOX}>
            {/* the tag frame strokes itself shut once every tool is standing */}
            <rect
              x={1}
              y={1}
              width={62}
              height={62}
              rx={2}
              fill="none"
              stroke={COLORS.brass}
              strokeWidth={2}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [FRAME_IN, FRAME_IN + 32], [1, 0], EASE)}
            />

            {MARK_PIECES.map((_, i) => (
              <MarkTool key={i} index={i} frame={frame} />
            ))}

            {/* the shelf seats under all four */}
            <rect
              x={MARK_SHELF.x}
              y={MARK_SHELF.y}
              width={MARK_SHELF.width}
              height={MARK_SHELF.height}
              fill={MARK_SHELF.color}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                scale: interpolate(frame, [SHELF, SHELF + 16], ["0 1", "1 1"], EASE),
              }}
            />
          </svg>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: interpolate(frame, [WORDMARK, WORDMARK + 18], [0, 1], EASE),
              translate: interpolate(frame, [WORDMARK, WORDMARK + 18], ["0px 12px", "0px 0px"], EASE),
            }}
          >
            <span
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: 48,
                letterSpacing: "-0.04em",
                color: COLORS.bone,
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Horde&#8209;M
            </span>
            <span style={{ fontFamily: BODY, fontSize: 18, color: COLORS.ash }}>
              Four pieces in the rack. One horde.
            </span>
          </div>
        </div>

        {/* ---- right: the work racking in ---- */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
          {PIECES.map((p, i) => (
            <RackPlate
              key={p.slug}
              index={i}
              rack={p.rack}
              name={p.name}
              kind={p.kind}
              accent={p.accent}
              frame={frame}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
