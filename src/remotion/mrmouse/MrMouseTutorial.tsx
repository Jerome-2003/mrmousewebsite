import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mouse } from "./MouseArt";
import { C, DISPLAY, BODY, MONO, EASE, CLAMP, useFonts } from "./theme";

/**
 * "Mr. Mouse in a minute" — the walkthrough.
 *
 * Six steps in the order a shop owner actually meets them, taken from a screen
 * recording of the app in use rather than from a wishlist: record an entry,
 * watch it file itself, follow the cash, read the statement, check the morning
 * dashboard, bill a customer.
 *
 * The screens are real captures of the running app, not mockups, so what the
 * video shows is what installs. They are shot at phone size because that is
 * how this app is used — the source recording is a phone.
 */

export const MRMOUSE_TUTORIAL = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 1740, // 58s
  portrait: { width: 1080, height: 1920 },
} as const;

type Step = {
  shot: string;
  n: string;
  title: string;
  body: string;
  /** Fraction of the screenshot's height to rest on, so long pages show the
   *  part the step is actually talking about instead of always the top. */
  focus?: number;
};

const STEPS: Step[] = [
  {
    shot: "addentry.png",
    n: "01",
    title: "Record it",
    body: "Tap Add entry and say what kind of transaction it is — paid on the spot, on credit, a running cost, or petty cash.",
  },
  {
    shot: "books.png",
    n: "02",
    title: "It files itself",
    body: "Mr. Mouse routes the entry into the right book for you, so you never have to decide where something belongs.",
  },
  {
    shot: "cashbook.png",
    n: "03",
    title: "Follow the money",
    body: "The cash book shows every naira in and out, with a running balance that recalculates after each entry.",
    focus: 0.28,
  },
  {
    shot: "pnl.png",
    n: "04",
    title: "The books add themselves up",
    body: "Trial balance and profit & loss recalculate the moment an entry lands. No month-end scramble.",
    focus: 0.3,
  },
  {
    shot: "dashboard.png",
    n: "05",
    title: "Your morning read",
    body: "Cash available, what you are owed, what you owe, and how the week is going — on one screen.",
    focus: 0.12,
  },
  {
    shot: "invoice.png",
    n: "06",
    title: "Bill a customer",
    body: "Build an invoice from the same books and send it straight to WhatsApp.",
  },
];

const STEP_FRAMES = 255;
const OPEN_FRAMES = 120;

/* ------------------------------------------------------------------ parts */

/** The phone the app actually runs on. */
const Phone: React.FC<{ shot: string; local: number; focus?: number; h: number }> = ({
  shot, local, focus = 0, h,
}) => {
  const w = h * (430 / 932);
  // A slow drift down the page: enough to show the screen is a real scrolling
  // thing, not so much that it reads as a moving background.
  const pan = interpolate(local, [0, STEP_FRAMES], [0, focus * 100], CLAMP);
  const rise = interpolate(local, [0, 22], [34, 0], EASE);
  const fade = interpolate(local, [0, 16], [0, 1], CLAMP);

  return (
    <div
      style={{
        width: w, height: h, borderRadius: 34, padding: 9, background: C.ink,
        boxShadow: "0 50px 110px rgba(28,33,24,0.28)",
        transform: `translateY(${rise}px)`, opacity: fade, flexShrink: 0,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 26, overflow: "hidden", background: "#fff", position: "relative" }}>
        <Img
          src={staticFile(`shots/${shot}`)}
          style={{
            width: "100%", display: "block", position: "absolute",
            top: `${-pan}%`,
          }}
        />
      </div>
    </div>
  );
};

const StepCaption: React.FC<{ step: Step; local: number; portrait: boolean }> = ({
  step, local, portrait,
}) => {
  const fade = interpolate(local, [6, 22], [0, 1], CLAMP);
  const rise = interpolate(local, [6, 26], [22, 0], EASE);
  return (
    <div style={{ opacity: fade, transform: `translateY(${rise}px)`, maxWidth: portrait ? 900 : 700 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <span style={{ font: `400 24px ${MONO}`, color: C.moss }}>{step.n}</span>
        <span style={{ width: 46, height: 2, background: C.rule, display: "inline-block" }} />
      </div>
      <h2 style={{
        font: `700 ${portrait ? 62 : 70}px ${DISPLAY}`, color: C.ink, margin: 0,
        letterSpacing: "-0.02em", lineHeight: 1.06, textWrap: "balance",
      }}>
        {step.title}
      </h2>
      <p style={{ font: `400 ${portrait ? 30 : 29}px ${BODY}`, color: C.inkSoft, margin: "22px 0 0", lineHeight: 1.5 }}>
        {step.body}
      </p>
    </div>
  );
};

/** How far through the six steps we are. Six rules that fill in turn — the
 *  app's own device doing the job a progress bar would otherwise do. */
const Progress: React.FC<{ index: number; local: number; portrait: boolean }> = ({
  index, local, portrait,
}) => (
  <div style={{
    position: "absolute", bottom: portrait ? 110 : 74, left: 0, right: 0,
    display: "flex", justifyContent: "center", gap: 12,
  }}>
    {STEPS.map((_, i) => {
      const done = i < index;
      const active = i === index;
      const grow = active ? interpolate(local, [0, STEP_FRAMES], [0, 1], CLAMP) : done ? 1 : 0;
      return (
        <span key={i} style={{ width: 62, height: 3, background: C.rule, position: "relative", borderRadius: 2 }}>
          <span style={{
            position: "absolute", inset: 0, width: `${grow * 100}%`,
            background: C.action, borderRadius: 2,
          }} />
        </span>
      );
    })}
  </div>
);

/* ----------------------------------------------------------------- scenes */

const Open: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const fade = interpolate(f, [8, 26], [0, 1], CLAMP);
  const rise = interpolate(f, [8, 30], [24, 0], EASE);

  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", opacity: fade, transform: `translateY(${rise}px)` }}>
        <svg width={300} height={92} style={{ display: "block", margin: "0 auto 26px" }}>
          <g transform="translate(126 62)">
            <Mouse scale={2.6} step={f * 0.55} />
          </g>
          <line x1={40} y1={68} x2={260} y2={68} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
        </svg>
        <h1 style={{
          font: `800 ${portrait ? 82 : 100}px ${DISPLAY}`, color: C.ink, margin: 0,
          letterSpacing: "-0.035em",
        }}>
          Mr Mouse in a minute
        </h1>
        <p style={{ font: `400 ${portrait ? 30 : 34}px ${BODY}`, color: C.inkSoft, margin: "18px 0 0" }}>
          Six steps, start to finish.
        </p>
      </div>
    </AbsoluteFill>
  );
};

const StepScene: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
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
        gap: portrait ? 52 : 110,
        padding: portrait ? "0 80px" : "0 130px",
      }}
    >
      {portrait ? (
        <>
          <StepCaption step={step} local={f} portrait />
          <Phone shot={step.shot} local={f} focus={step.focus} h={760} />
        </>
      ) : (
        <>
          <Phone shot={step.shot} local={f} focus={step.focus} h={880} />
          <StepCaption step={step} local={f} portrait={false} />
        </>
      )}
      <Progress index={index} local={f} portrait={portrait} />
    </AbsoluteFill>
  );
};

const Close: React.FC = () => {
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
        font: `700 ${portrait ? 60 : 76}px ${DISPLAY}`, color: "#fff", margin: 0,
        letterSpacing: "-0.02em", textAlign: "center", padding: "0 60px",
        opacity: interpolate(f, [0, 16], [0, 1], CLAMP),
        transform: `translateY(${interpolate(f, [0, 20], [22, 0], EASE)}px)`,
      }}>
        That is the whole app
      </h2>
      <p style={{
        font: `400 ${portrait ? 28 : 31}px ${BODY}`, color: "rgba(255,255,255,0.6)",
        margin: "18px 0 0", textAlign: "center", padding: "0 60px",
        opacity: interpolate(f, [12, 28], [0, 1], CLAMP),
      }}>
        Start free on your own books.
      </p>

      <div style={{ display: "flex", flexDirection: portrait ? "column" : "row", gap: 26, marginTop: 50 }}>
        {cards.map((c, i) => {
          const at = 26 + i * 12;
          return (
            <div key={c.name} style={{
              width: portrait ? 620 : 400, border: `2px solid rgba(255,255,255,0.18)`,
              borderRadius: 12, padding: "26px 30px",
              opacity: interpolate(f, [at, at + 14], [0, 1], CLAMP),
              transform: `translateY(${interpolate(f, [at, at + 18], [20, 0], EASE)}px)`,
            }}>
              <p style={{ font: `600 31px ${DISPLAY}`, color: "#fff", margin: 0 }}>{c.name}</p>
              <p style={{ font: `400 20px ${MONO}`, color: C.mossLift, margin: "10px 0 0" }}>{c.meta}</p>
              <p style={{ font: `400 19px ${BODY}`, color: "rgba(255,255,255,0.55)", margin: "10px 0 0" }}>{c.note}</p>
            </div>
          );
        })}
      </div>

      <svg width={460} height={76} style={{ marginTop: 50, opacity: interpolate(f, [56, 72], [0, 1], CLAMP) }}>
        <g transform="translate(172 54)">
          <Mouse scale={2.2} ink="#fff" paper={C.ink} step={f * 0.55} />
        </g>
        <line x1={0} y1={58} x2={460} y2={58} stroke="rgba(255,255,255,0.25)" strokeWidth={3} />
      </svg>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------- film */

export const MrMouseTutorial: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <Sequence durationInFrames={OPEN_FRAMES}>
        <Open />
      </Sequence>
      {STEPS.map((step, i) => (
        <Sequence key={step.shot} from={OPEN_FRAMES + i * STEP_FRAMES} durationInFrames={STEP_FRAMES}>
          <StepScene step={step} index={i} />
        </Sequence>
      ))}
      <Sequence from={OPEN_FRAMES + STEPS.length * STEP_FRAMES}>
        <Close />
      </Sequence>
    </AbsoluteFill>
  );
};
