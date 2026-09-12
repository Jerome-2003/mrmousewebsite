import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mouse } from "./MouseArt";
import { C, DISPLAY, BODY, MONO, EASE, CLAMP, useFonts } from "./theme";

/**
 * Episode 2 — "No network, no wahala."
 *
 * A 30-second spot about the thing Mr. Mouse actually does that competitors
 * mostly don't: it writes to the phone first, so the app keeps working when
 * the signal doesn't, and catches every device up when it returns.
 *
 * NOTE ON THE CLAIMS. An earlier draft of this episode sold "peer-to-peer, no
 * cloud middleman, zero snooping." That is not what this build does: sync is
 * relayed by the Socket.io server, every mutation is persisted to Mongo in
 * SyncEvent and EntitySnapshot, and useCompanySync emits the payload in
 * plaintext. So the film sells offline-first instead, which is true:
 *
 *   - reads and writes hit Dexie locally, with no network in the path
 *   - a mutation made offline is queued in the outbox and flushed on reconnect
 *   - every device on the business converges on the same books
 *
 * Nothing on screen claims privacy, encryption, or peer-to-peer.
 */

export const MRMOUSE_OFFLINE = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 900, // 30s
  portrait: { width: 1080, height: 1920 },
} as const;

const naira = (n: number) =>
  `₦${Math.round(n).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const TOTAL = 396000;

/* ------------------------------------------------------------------ parts */

/** Four bars. `strength` 0–4; a slash crosses them at zero. */
const Signal: React.FC<{ strength: number; color?: string }> = ({ strength, color = C.ink }) => (
  <svg width={86} height={64} viewBox="0 0 86 64" fill="none">
    {[0, 1, 2, 3].map((i) => {
      const h = 14 + i * 11;
      const on = strength > i;
      return (
        <rect
          key={i}
          x={4 + i * 20}
          y={56 - h}
          width={13}
          height={h}
          rx={2}
          fill={on ? color : "none"}
          stroke={color}
          strokeWidth={2.4}
          opacity={on ? 1 : 0.3}
        />
      );
    })}
    {strength === 0 && (
      <line x1={6} y1={56} x2={80} y2={6} stroke={C.clay} strokeWidth={5} strokeLinecap="round" />
    )}
  </svg>
);

/** A ledger sheet — the thing that queues up and then flies. */
const Slip: React.FC<{ x: number; y: number; scale?: number; opacity?: number; rotate?: number }> = ({
  x, y, scale = 1, opacity = 1, rotate = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotate})`} opacity={opacity}>
    <rect x={-26} y={-18} width={52} height={36} rx={3} fill="#fff" stroke={C.ink} strokeWidth={2.4} />
    <line x1={-17} y1={-7} x2={17} y2={-7} stroke={C.rule} strokeWidth={2.6} strokeLinecap="round" />
    <line x1={-17} y1={1} x2={7} y2={1} stroke={C.rule} strokeWidth={2.6} strokeLinecap="round" />
    <line x1={1} y1={10} x2={17} y2={10} stroke={C.moss} strokeWidth={2.6} strokeLinecap="round" />
  </g>
);

/** A phone, drawn rather than photographed, holding a running total. */
const Phone: React.FC<{
  x: number; y: number; total: number; label: string; airplane?: boolean; scale?: number;
  /** The bezel has to contrast with the ground it sits on — ink-on-ink in the
   *  closing scene turned the phones into floating white rectangles. */
  bezel?: string;
}> = ({ x, y, total, label, airplane = false, scale = 1, bezel = C.ink }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-86} y={-150} width={172} height={300} rx={20} fill={bezel} />
    <rect x={-76} y={-140} width={152} height={280} rx={13} fill="#fff" />
    {airplane && (
      <g transform="translate(0 -118)">
        <path d="M -11 0 L 11 -6 L 11 6 Z" fill={C.inkSoft} />
      </g>
    )}
    <text x={0} y={-74} textAnchor="middle" style={{ font: `400 16px ${BODY}`, fill: C.inkSoft }}>
      {label}
    </text>
    <text
      x={0} y={-36} textAnchor="middle"
      style={{ font: `400 20px ${MONO}`, fill: C.ink, fontVariantNumeric: "tabular-nums" }}
    >
      {naira(total)}
    </text>
    {/* the single rule closes the column, the double rule sits under the total */}
    <line x1={-58} y1={-22} x2={58} y2={-22} stroke={C.ink} strokeWidth={2.2} />
    <line x1={-58} y1={-15} x2={58} y2={-15} stroke={C.ink} strokeWidth={2.2} />
    {[0, 1, 2].map((i) => (
      <line
        key={i} x1={-58} y1={16 + i * 24} x2={i === 2 ? 8 : 58} y2={16 + i * 24}
        stroke={C.rule} strokeWidth={3} strokeLinecap="round"
      />
    ))}
  </g>
);

const Caption: React.FC<{ title: string; body?: string; local: number; portrait: boolean }> = ({
  title, body, local, portrait,
}) => (
  <div
    style={{
      opacity: interpolate(local, [4, 20], [0, 1], CLAMP),
      transform: `translateY(${interpolate(local, [4, 24], [22, 0], EASE)}px)`,
      maxWidth: portrait ? 880 : 660,
      textAlign: portrait ? "center" : "left",
    }}
  >
    <h2 style={{
      font: `700 ${portrait ? 60 : 66}px ${DISPLAY}`, color: C.ink, margin: 0,
      letterSpacing: "-0.02em", lineHeight: 1.07, textWrap: "balance",
    }}>
      {title}
    </h2>
    {body && (
      <p style={{ font: `400 ${portrait ? 29 : 28}px ${BODY}`, color: C.inkSoft, margin: "20px 0 0", lineHeight: 1.5 }}>
        {body}
      </p>
    )}
  </div>
);

/** Caption one side, stage the other — stacks in portrait. */
const Stage: React.FC<{ title: string; body?: string; children: React.ReactNode }> = ({
  title, body, children,
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return (
    <AbsoluteFill style={{
      background: C.paper, display: "flex",
      flexDirection: portrait ? "column" : "row",
      alignItems: "center", justifyContent: "center",
      gap: portrait ? 60 : 96, padding: portrait ? "0 76px" : "0 120px",
    }}>
      <div style={{ flex: portrait ? "0 0 auto" : "0 0 620px" }}>
        <Caption title={title} body={body} local={f} portrait={portrait} />
      </div>
      <div style={{ flex: portrait ? "0 0 auto" : 1, display: "flex", justifyContent: "center" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- scenes */

/** 1 — Emeka climbs the ledgers hunting for bars. There aren't any. */
const NoSignal: React.FC = () => {
  const f = useCurrentFrame();
  // He hops, hopefully, and it changes nothing.
  const hop = Math.max(0, Math.sin(f * 0.22)) * 16;
  const reach = interpolate(f, [0, 60], [0, -10], CLAMP);

  return (
    <Stage
      title="No network at the suya spot"
      body="The one place a signal never reaches is the one place the sales happen."
    >
      <svg width={700} height={560} viewBox="0 0 520 470" fill="none">
        <g opacity={interpolate(f, [10, 26], [0, 1], CLAMP)}>
          <g transform="translate(210 34)">
            <Signal strength={0} />
          </g>
        </g>

        {/* a stack of books to stand on */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={186 - i * 6} y={362 + i * 26} width={{ 0: 128, 1: 140, 2: 152 }[i] as number}
            height={24} rx={3} fill="#fff" stroke={C.rule} strokeWidth={2.6}
          />
        ))}

        {/* Emeka, arm up, phone held at the sky */}
        <g transform={`translate(216 ${356 - hop})`}>
          <g transform={`translate(0 ${reach})`}>
            <rect x={14} y={-92} width={26} height={46} rx={5} fill={C.ink} />
            <rect x={18} y={-88} width={18} height={34} rx={3} fill="#fff" />
            <line x1={18} y1={-50} x2={24} y2={-26} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          </g>
          <Mouse scale={2.5} step={f * 0.4} />
        </g>

        <line x1={20} y1={436} x2={500} y2={436} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      </svg>
    </Stage>
  );
};

/** 2 — Chidi logs it anyway. No signal in the path at all. */
const LogAnyway: React.FC = () => {
  const f = useCurrentFrame();
  const tap = f > 30 && f < 42;
  // The slip is written straight to the phone: no round trip, no spinner.
  const slipY = interpolate(f, [42, 74], [-150, -18], EASE);
  const slipFade = interpolate(f, [42, 54], [0, 1], CLAMP);
  const saved = interpolate(f, [78, 92], [0, 1], CLAMP);

  return (
    <Stage
      title="He logs the sale anyway"
      body="Mr. Mouse writes to the phone first, so an entry lands whether or not there is a network. The signal is optional."
    >
      <svg width={700} height={560} viewBox="0 0 520 470" fill="none">
        <g transform="translate(150 40)" opacity={0.55}>
          <Signal strength={0} />
        </g>

        <g transform="translate(300 210)">
          <Phone x={0} y={0} total={TOTAL} label="Sales journal" airplane scale={0.92} />
        </g>

        <g opacity={slipFade}>
          <Slip x={300} y={slipY + 210} scale={1.15} rotate={-4} />
        </g>

        <g transform="translate(300 360)" opacity={saved}>
          <circle cx={0} cy={0} r={22} fill={C.action} />
          <path d="M -9 0 L -3 7 L 10 -7" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x={0} y={46} textAnchor="middle" style={{ font: `500 20px ${BODY}`, fill: C.action }}>
            Saved
          </text>
        </g>

        {/* Chidi, calm, at the desk */}
        <g transform={`translate(96 ${404 + (tap ? 3 : 0)})`}>
          <Mouse scale={2.5} step={f * 0.3} />
        </g>
        <line x1={20} y1={436} x2={500} y2={436} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      </svg>
    </Stage>
  );
};

/** 3 — the signal returns and the queue drains to every device. */
const CatchUp: React.FC = () => {
  const f = useCurrentFrame();
  const strength = f < 24 ? 0 : Math.min(4, Math.floor((f - 24) / 7) + 1);
  const flying = (i: number) => {
    const start = 52 + i * 16;
    return {
      t: interpolate(f, [start, start + 44], [0, 1], CLAMP),
      shown: f > start,
    };
  };
  // Emeka's total only rises as the slips actually land.
  const landed = [0, 1, 2].filter((i) => flying(i).t >= 1).length;
  const theirTotal = (TOTAL / 3) * landed;

  return (
    <Stage
      title="When the signal comes back, everyone catches up"
      body="Entries made offline are queued and sent the moment there is a connection, so every device on the business lands on the same books."
    >
      <svg width={820} height={560} viewBox="0 0 620 470" fill="none">
        <g transform="translate(266 18)">
          <Signal strength={strength} color={strength > 0 ? C.action : C.ink} />
        </g>

        <Phone x={140} y={252} total={TOTAL} label="Chidi" scale={0.8} />
        <Phone x={480} y={252} total={theirTotal} label="Emeka" scale={0.8} />

        {[0, 1, 2].map((i) => {
          const { t, shown } = flying(i);
          if (!shown || t >= 1) return null;
          const x = interpolate(t, [0, 1], [214, 406]);
          // a shallow arc, so they travel rather than slide
          const y = 252 - Math.sin(t * Math.PI) * 104;
          return <Slip key={i} x={x} y={y} scale={0.8} opacity={interpolate(t, [0, 0.12, 0.9, 1], [0, 1, 1, 0])} rotate={t * 20 - 10} />;
        })}

        <line x1={20} y1={436} x2={600} y2={436} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
      </svg>
    </Stage>
  );
};

/** 4 — both sets of books agree. */
const Close: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;

  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: "center", justifyContent: "center" }}>
      <svg width={portrait ? 700 : 760} height={360} viewBox="0 0 560 300" fill="none"
        style={{ opacity: interpolate(f, [0, 16], [0, 1], CLAMP) }}>
        <g style={{ transform: `translateY(${interpolate(f, [0, 22], [18, 0], EASE)}px)` }}>
          <g transform="translate(0 26)">
            <Phone x={162} y={140} total={TOTAL} label="Chidi" scale={0.86} bezel="rgba(255,255,255,0.28)" />
            <Phone x={398} y={140} total={TOTAL} label="Emeka" scale={0.86} bezel="rgba(255,255,255,0.28)" />
          </g>
        </g>
      </svg>

      <h2 style={{
        font: `700 ${portrait ? 54 : 66}px ${DISPLAY}`, color: "#fff", margin: "34px 0 0",
        letterSpacing: "-0.02em", textAlign: "center", padding: "0 60px", textWrap: "balance",
        opacity: interpolate(f, [18, 34], [0, 1], CLAMP),
        transform: `translateY(${interpolate(f, [18, 38], [20, 0], EASE)}px)`,
      }}>
        Works with no network. Syncs when there is one.
      </h2>

      <p style={{
        font: `400 ${portrait ? 27 : 30}px ${BODY}`, color: "rgba(255,255,255,0.6)",
        margin: "20px 0 0", textAlign: "center",
        opacity: interpolate(f, [34, 50], [0, 1], CLAMP),
      }}>
        Mr Mouse — bookkeeping that files itself.
      </p>

      <p style={{
        font: `400 ${portrait ? 21 : 23}px ${MONO}`, color: C.mossLift, margin: "26px 0 0",
        opacity: interpolate(f, [46, 62], [0, 1], CLAMP),
      }}>
        Android APK · Windows desktop
      </p>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------- film */

export const MrMouseOffline: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <Sequence durationInFrames={200}><NoSignal /></Sequence>
      <Sequence from={200} durationInFrames={240}><LogAnyway /></Sequence>
      <Sequence from={440} durationInFrames={240}><CatchUp /></Sequence>
      <Sequence from={680}><Close /></Sequence>
    </AbsoluteFill>
  );
};
