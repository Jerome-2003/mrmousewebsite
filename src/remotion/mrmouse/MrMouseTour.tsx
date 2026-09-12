import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mouse } from "./MouseArt";

/**
 * "Mr. Mouse, in thirty seconds."
 *
 * A promo and a walkthrough in one pass: what the app is, then the four things
 * a shop owner actually does with it, then where to get it. Every claim is
 * lifted from the product copy in src/data/mrmouse.ts rather than written fresh
 * for the video, so the film can't drift from what the app does.
 *
 * The visual language is the product's own: paper ground, ink line-work, and
 * the accounting rules it draws everywhere — one line under a column being
 * summed, two under the final total. The mice do the work on screen because
 * that is the app's own metaphor, not because animals are charming.
 */

export const MRMOUSE_TOUR = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 900, // 30s
  /* WhatsApp Status is where this audience actually watches things, so
     portrait is a first-class cut rather than a letterboxed crop — the
     scenes stack instead of sitting side by side. */
  portrait: { width: 1080, height: 1920 },
} as const;

const C = {
  paper: "#F7F5EF",
  paperSunk: "#EFECE2",
  rule: "#DDD8C9",
  ink: "#1C2118",
  inkSoft: "#5A6152",
  action: "#2F5741",
  moss: "#4F7355",
  mossLift: "#8FB49B",
  clay: "#A8483A",
  chartIn: "#2E7D4F",
  chartOut: "#C08A2E",
} as const;

const DISPLAY = '"Syne", system-ui, sans-serif';
const BODY = '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';

const EASE = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
} as const;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* Remotion renders frames headlessly, so a webfont that is merely referenced
   will not be loaded in time and every frame bakes the fallback. Block the
   render until the three faces are actually ready. */
const fontHandle = delayRender("Loading Mr. Mouse typefaces");
if (typeof window !== "undefined") {
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
      continueRender(fontHandle);
    })
    .catch(() => continueRender(fontHandle));
} else {
  continueRender(fontHandle);
}

const naira = (n: number) =>
  `₦${Math.round(n).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------------------------------------------------------------- pieces */

/** A line that draws itself left to right. The film's basic unit. */
const Rule: React.FC<{
  x: number; y: number; w: number; at: number; local: number;
  color?: string; thickness?: number; dur?: number;
}> = ({ x, y, w, at, local, color = C.rule, thickness = 3, dur = 14 }) => {
  const drawn = interpolate(local, [at, at + dur], [0, w], EASE);
  if (drawn <= 0) return null;
  return (
    <line x1={x} y1={y} x2={x + drawn} y2={y} stroke={color} strokeWidth={thickness} strokeLinecap="round" />
  );
};

/** The section caption, set the way the app sets a page title. */
const Caption: React.FC<{ kicker?: string; title: string; body?: string; local: number }> = ({
  kicker, title, body, local,
}) => {
  const rise = interpolate(local, [0, 18], [26, 0], EASE);
  const fade = interpolate(local, [0, 14], [0, 1], CLAMP);
  return (
    <div style={{ opacity: fade, transform: `translateY(${rise}px)`, maxWidth: 760 }}>
      {kicker && (
        <p style={{ font: `500 26px ${BODY}`, color: C.moss, margin: "0 0 14px" }}>{kicker}</p>
      )}
      <h2 style={{ font: `700 74px ${DISPLAY}`, color: C.ink, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
        {title}
      </h2>
      {body && (
        <p style={{ font: `400 30px ${BODY}`, color: C.inkSoft, margin: "22px 0 0", lineHeight: 1.5 }}>{body}</p>
      )}
    </div>
  );
};

/** A figure that counts up, in tabular numerals so it never reflows. */
const Counter: React.FC<{ to: number; at: number; local: number; size?: number; color?: string }> = ({
  to, at, local, size = 68, color = C.ink,
}) => {
  const v = interpolate(local, [at, at + 34], [0, to], EASE);
  return (
    <span style={{ font: `400 ${size}px ${MONO}`, fontVariantNumeric: "tabular-nums", color }}>
      {naira(v)}
    </span>
  );
};

/** The device frame everything in-app is shown inside. */
const Screen: React.FC<{ w: number; h: number; children: React.ReactNode }> = ({ w, h, children }) => (
  <div
    style={{
      width: w, height: h, background: "#FFFFFF", border: `2px solid ${C.rule}`,
      borderRadius: 14, overflow: "hidden", position: "relative",
      boxShadow: "0 40px 90px rgba(28,33,24,0.13)",
    }}
  >
    <div style={{ height: 46, background: C.ink, display: "flex", alignItems: "center", padding: "0 18px", gap: 9 }}>
      <div style={{ width: 13, height: 13, borderRadius: 99, border: `2px solid rgba(255,255,255,0.3)` }} />
      <span style={{ font: `600 17px ${DISPLAY}`, color: "#fff" }}>Mr Mouse</span>
    </div>
    {children}
  </div>
);

/* ---------------------------------------------------------------- scenes */

/** 1 — the mice rule a ledger and the name stamps on. */
const Open: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const markFade = interpolate(f, [46, 66], [0, 1], CLAMP);
  const markRise = interpolate(f, [46, 70], [18, 0], EASE);
  const runX = interpolate(f, [0, 110], [-120, 2040], CLAMP);

  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: "center", justifyContent: "center" }}>
      <svg width={portrait ? 960 : 1180} height={portrait ? 382 : 470} viewBox="0 0 1180 470" style={{ position: "absolute", top: portrait ? 430 : 190 }}>
        <rect x={330} y={10} width={520} height={330} rx={8} fill="#fff" stroke={C.rule} strokeWidth={3} />
        {[0, 1, 2, 3].map((i) => (
          <Rule key={i} x={366} y={72 + i * 46} w={i === 3 ? 250 : 450} at={8 + i * 9} local={f} />
        ))}
        {/* the single rule closes the column; the double rule is the total */}
        <Rule x={616} y={264} w={200} at={50} local={f} color={C.ink} thickness={3} />
        <Rule x={616} y={286} w={200} at={62} local={f} color={C.ink} thickness={3} />
        <Rule x={616} y={296} w={200} at={62} local={f} color={C.ink} thickness={3} />

        {/* the clerk works down the page as it rules */}
        <g transform={`translate(872 ${interpolate(f, [8, 62], [80, 300], EASE)})`}>
          <Mouse scale={2.1} step={f * 0.5} />
        </g>
        {/* a runner crosses the desk below */}
        <g transform={`translate(${runX} 430)`}>
          <Mouse carrying scale={2.1} step={f * 0.62} />
        </g>
        <line x1={0} y1={434} x2={1180} y2={434} stroke={C.rule} strokeWidth={3} />
      </svg>

      <div style={{ position: "absolute", top: portrait ? 960 : 690, textAlign: "center", opacity: markFade, transform: `translateY(${markRise}px)` }}>
        <h1 style={{ font: `800 106px ${DISPLAY}`, color: C.ink, margin: 0, letterSpacing: "-0.035em" }}>
          Mr Mouse
        </h1>
        <p style={{ font: `400 34px ${BODY}`, color: C.inkSoft, margin: "16px 0 0" }}>
          Bookkeeping that files itself.
        </p>
      </div>
    </AbsoluteFill>
  );
};

/** A scene shell: caption on the left, artwork on the right. */
const Split: React.FC<{
  kicker: string; title: string; body: string; children: React.ReactNode;
}> = ({ kicker, title, body, children }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;

  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        display: "flex",
        flexDirection: portrait ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        padding: portrait ? "0 72px" : "0 120px",
        gap: portrait ? 64 : 90,
      }}
    >
      <div style={{ flex: portrait ? "0 0 auto" : "0 0 660px" }}>
        <Caption kicker={kicker} title={title} body={body} local={f} />
      </div>
      <div style={{ flex: portrait ? "0 0 auto" : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** 2 — one entry, filed into the right book automatically. */
const OneEntry: React.FC = () => {
  const f = useCurrentFrame();
  const BOOKS = ["Cash Book", "Sales Journal", "Purchases Journal", "Petty Cash"];
  const CHOSEN = 1;
  const lands = 58;

  // The slip stays put and the routing is what moves: a scan runs down
  // the books and settles on the right one. The earlier version flew the
  // slip downward, which left a hole where it had been and pushed the
  // last book past the bottom of the screen.
  const scan = interpolate(f, [20, lands], [0, BOOKS.length - 1], EASE);

  return (
    <Split
      kicker="Log an entry"
      title="It files itself"
      body="Record a sale or a purchase and Mr. Mouse routes it into the right book for you — so you never have to decide where something belongs."
    >
      <Screen w={620} h={470}>
        <div style={{ padding: "22px 26px" }}>
          <div
            style={{
              border: `2px solid ${C.rule}`,
              borderRadius: 10,
              padding: "14px 20px",
              background: "#fff",
              opacity: interpolate(f, [4, 16], [0, 1], CLAMP),
              transform: `translateY(${interpolate(f, [4, 18], [-14, 0], EASE)}px)`,
            }}
          >
            <p style={{ font: `400 16px ${BODY}`, color: C.inkSoft, margin: "0 0 5px" }}>Sale · Shoprite Ikeja</p>
            <p style={{ font: `400 29px ${MONO}`, color: C.moss, margin: 0, fontVariantNumeric: "tabular-nums" }}>
              {naira(396000)}
            </p>
          </div>

          <div style={{ marginTop: 20, display: "grid", gap: 9 }}>
            {BOOKS.map((b, i) => {
              const settled = f >= lands && i === CHOSEN;
              const scanning = f < lands && Math.round(scan) === i;
              const active = settled || scanning;
              return (
                <div
                  key={b}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    border: `2px solid ${settled ? C.action : active ? C.rule : C.rule}`,
                    background: settled ? "rgba(47,87,65,0.07)" : active ? C.paperSunk : "#fff",
                    borderRadius: 8, padding: "12px 18px", height: 52, boxSizing: "border-box",
                    font: `${settled ? 600 : 400} 20px ${BODY}`, color: C.ink,
                  }}
                >
                  {b}
                  {settled && (
                    <span
                      style={{
                        font: `500 17px ${BODY}`, color: C.action,
                        opacity: interpolate(f, [lands, lands + 8], [0, 1], CLAMP),
                      }}
                    >
                      Filed ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Screen>
    </Split>
  );
};

/** 3 — the statements recompute themselves. */
const BooksUpdate: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Split
      kicker="No month-end scramble"
      title="The books keep themselves"
      body="Your Trial Balance and Profit & Loss recalculate the moment an entry lands. Tracked stock adjusts itself at the same time."
    >
      <Screen w={620} h={470}>
        <div style={{ padding: "30px 34px" }}>
          {[
            ["Sales", 2418000, C.ink],
            ["Less: Purchases", 925000, C.ink],
          ].map(([label, amt], i) => (
            <div key={label as string} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "13px 0" }}>
              <span style={{ font: `400 22px ${BODY}`, color: C.inkSoft }}>{label as string}</span>
              <span style={{ font: `400 26px ${MONO}`, fontVariantNumeric: "tabular-nums", color: C.ink }}>
                {i === 1 ? "(" : ""}
                {naira(interpolate(f, [10 + i * 8, 44 + i * 8], [0, amt as number], EASE))}
                {i === 1 ? ")" : ""}
              </span>
            </div>
          ))}
          <svg height={16} width="100%" style={{ display: "block" }}>
            <Rule x={220} y={6} w={320} at={30} local={f} color={C.ink} thickness={2} />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "13px 0" }}>
            <span style={{ font: `600 22px ${BODY}`, color: C.ink }}>Gross profit</span>
            <Counter to={1493000} at={34} local={f} size={28} />
          </div>

          <div
            style={{
              marginTop: 22, background: C.ink, borderRadius: 8, padding: "20px 24px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              opacity: interpolate(f, [58, 72], [0, 1], CLAMP),
            }}
          >
            <span style={{ font: `600 24px ${DISPLAY}`, color: "#fff" }}>Net profit</span>
            <Counter to={1274600} at={60} local={f} size={34} color={C.mossLift} />
          </div>
        </div>
      </Screen>
    </Split>
  );
};

/** 4 — one set of books across every device. */
const EveryDevice: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = interpolate(f, [26, 46], [0, 1], CLAMP);
  const arrive = interpolate(f, [40, 56], [10, 0], EASE);

  const Row = ({ show }: { show: number }) => (
    <div style={{ padding: 20 }}>
      {["Counter sales", "Invoice 0412"].map((t) => (
        <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: `2px solid ${C.rule}` }}>
          <span style={{ font: `400 17px ${BODY}`, color: C.ink }}>{t}</span>
          <span style={{ font: `400 17px ${MONO}`, color: C.inkSoft }}>{naira(128400)}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", opacity: show, transform: `translateY(${arrive}px)` }}>
        <span style={{ font: `600 17px ${BODY}`, color: C.ink }}>Shoprite Ikeja</span>
        <span style={{ font: `400 17px ${MONO}`, color: C.moss }}>{naira(396000)}</span>
      </div>
    </div>
  );

  return (
    <Split
      kicker="Team & sync"
      title="One set of books, everywhere"
      body="Every device on your business sees the same numbers the instant an entry is made. No refreshing, no emailing spreadsheets around."
    >
      <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
        <Screen w={330} h={300}><Row show={1} /></Screen>
        <svg width={90} height={40}>
          <line x1={6} y1={20} x2={84} y2={20} stroke={C.moss} strokeWidth={3} strokeLinecap="round"
            strokeDasharray="10 9" strokeDashoffset={-f * 1.6} opacity={pulse} />
        </svg>
        <Screen w={330} h={300}><Row show={pulse} /></Screen>
      </div>
    </Split>
  );
};

/** 5 — log it from a chat, nothing to install for whoever's texting. */
const FromChat: React.FC = () => {
  const f = useCurrentFrame();
  const typed = "I sold 20 bags of cement";
  const shown = typed.slice(0, Math.max(0, Math.floor(interpolate(f, [12, 44], [0, typed.length], CLAMP))));
  const reply = interpolate(f, [52, 64], [0, 1], CLAMP);

  return (
    <Split
      kicker="WhatsApp & Telegram"
      title="Or just text it in"
      body="Log entries, check today's totals, or pull a report straight from a chat — with nothing to install for whoever is texting it in."
    >
      <Screen w={560} h={430}>
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ alignSelf: "flex-end", background: C.action, color: "#fff", borderRadius: "14px 14px 4px 14px", padding: "14px 20px", font: `400 22px ${BODY}`, maxWidth: 400 }}>
            {shown}
            {shown.length < typed.length && <span style={{ opacity: f % 16 < 8 ? 1 : 0 }}>|</span>}
          </div>
          <div style={{ alignSelf: "flex-start", background: C.paperSunk, color: C.ink, borderRadius: "14px 14px 14px 4px", padding: "14px 20px", font: `400 22px ${BODY}`, maxWidth: 430, opacity: reply }}>
            Logged to the Sales Journal.
            <br />
            <span style={{ font: `400 21px ${MONO}`, color: C.moss }}>{naira(185000)}</span> · stock updated
          </div>
        </div>
      </Screen>
    </Split>
  );
};

/** 6 — where to get it. */
const GetIt: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const cards = [
    { name: "Android", meta: "Direct APK · ~7 MB", note: "No Play Store account needed" },
    { name: "Desktop", meta: "Windows installer", note: "For the back office or the till" },
  ];
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: "center", justifyContent: "center" }}>
      <h2 style={{
        font: `700 ${portrait ? 62 : 78}px ${DISPLAY}`, textAlign: "center", padding: "0 60px", color: "#fff", margin: 0, letterSpacing: "-0.02em",
        opacity: interpolate(f, [0, 14], [0, 1], CLAMP),
        transform: `translateY(${interpolate(f, [0, 18], [22, 0], EASE)}px)`,
      }}>
        Start free on your own books
      </h2>

      <div style={{ display: "flex", flexDirection: portrait ? "column" : "row", gap: 28, marginTop: 54 }}>
        {cards.map((c, i) => {
          const at = 20 + i * 12;
          return (
            <div key={c.name} style={{
              width: 400, border: `2px solid rgba(255,255,255,0.18)`, borderRadius: 12, padding: "28px 30px",
              opacity: interpolate(f, [at, at + 14], [0, 1], CLAMP),
              transform: `translateY(${interpolate(f, [at, at + 18], [20, 0], EASE)}px)`,
            }}>
              <p style={{ font: `600 32px ${DISPLAY}`, color: "#fff", margin: 0 }}>{c.name}</p>
              <p style={{ font: `400 21px ${MONO}`, color: C.mossLift, margin: "10px 0 0" }}>{c.meta}</p>
              <p style={{ font: `400 20px ${BODY}`, color: "rgba(255,255,255,0.55)", margin: "12px 0 0" }}>{c.note}</p>
            </div>
          );
        })}
      </div>

      <svg width={520} height={80} style={{ marginTop: 58, opacity: interpolate(f, [56, 70], [0, 1], CLAMP) }}>
        <g transform="translate(200 56)">
          <Mouse scale={2.3} ink="#fff" paper={C.ink} step={f * 0.55} />
        </g>
        <line x1={0} y1={60} x2={520} y2={60} stroke="rgba(255,255,255,0.25)" strokeWidth={3} />
      </svg>

      <p style={{
        font: `400 27px ${BODY}`, color: "rgba(255,255,255,0.6)", marginTop: 26,
        opacity: interpolate(f, [64, 78], [0, 1], CLAMP),
      }}>
        mrmouse — bookkeeping that files itself
      </p>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- film */

export const MrMouseTour: React.FC = () => (
  <AbsoluteFill style={{ background: C.paper }}>
    <Sequence durationInFrames={140}><Open /></Sequence>
    <Sequence from={140} durationInFrames={150}><OneEntry /></Sequence>
    <Sequence from={290} durationInFrames={160}><BooksUpdate /></Sequence>
    <Sequence from={450} durationInFrames={150}><EveryDevice /></Sequence>
    <Sequence from={600} durationInFrames={150}><FromChat /></Sequence>
    <Sequence from={750} durationInFrames={150}><GetIt /></Sequence>
  </AbsoluteFill>
);
