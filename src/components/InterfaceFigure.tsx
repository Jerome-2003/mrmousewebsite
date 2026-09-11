import React from "react";

/**
 * Interface figures.
 *
 * Each of these is a faithful reconstruction of a screen from the shipped
 * product, drawn in the client's own interface colours, using the product's real
 * room numbers, rates, states and labels. They are captioned as reconstructions —
 * they are not passed off as screenshots.
 *
 * Guest names and other personal data from the live systems are deliberately not
 * reproduced.
 *
 * To replace one with a real screenshot: drop the image in /public and swap the
 * figure body for an <Image />, keeping the <figcaption>.
 */

const Frame: React.FC<{
  caption: string;
  ground: string;
  children: React.ReactNode;
}> = ({ caption, ground, children }) => (
  <figure className="flex flex-col gap-3">
    <div
      className="overflow-hidden rounded-plate border border-steel"
      style={{ background: ground }}
    >
      {children}
    </div>
    <figcaption className="text-xs text-ash-dim">{caption}</figcaption>
  </figure>
);

/* ------------------------------------------------------------------ */
/* 02 — Divic PMS: the housekeeping board                              */
/* ------------------------------------------------------------------ */

const ROOM_STATES = {
  available: { label: "Available", color: "#1f8e77" },
  occupied: { label: "Occupied", color: "#c8a951" },
} as const;

type Room = { no: string; type: string; rate: string; state: keyof typeof ROOM_STATES };

const GROUND: Room[] = [
  { no: "G01", type: "Standard", rate: "₦40,000", state: "occupied" },
  { no: "G02", type: "Standard", rate: "₦40,000", state: "available" },
  { no: "G03", type: "Standard", rate: "₦40,000", state: "available" },
  { no: "G04", type: "Standard", rate: "₦40,000", state: "available" },
  { no: "G05", type: "Standard", rate: "₦40,000", state: "available" },
  { no: "G06", type: "Standard", rate: "₦40,000", state: "available" },
];

const FIRST: Room[] = [
  { no: "101", type: "Deluxe", rate: "₦45,000", state: "available" },
  { no: "102", type: "Deluxe", rate: "₦45,000", state: "available" },
  { no: "103", type: "Deluxe", rate: "₦45,000", state: "available" },
  { no: "104", type: "Deluxe", rate: "₦45,000", state: "available" },
  { no: "105", type: "Deluxe", rate: "₦45,000", state: "available" },
  { no: "106", type: "Superior", rate: "₦50,000", state: "available" },
  { no: "107", type: "Superior", rate: "₦50,000", state: "available" },
  { no: "108", type: "Superior", rate: "₦50,000", state: "available" },
  { no: "109", type: "Superior", rate: "₦50,000", state: "available" },
];

const RoomTile: React.FC<{ room: Room }> = ({ room }) => {
  const state = ROOM_STATES[room.state];
  return (
    <div
      style={{
        background: room.state === "occupied" ? "#f7f0dd" : "#ffffff",
        borderLeft: `3px solid ${state.color}`,
        border: "1px solid #e6e1d6",
        borderLeftWidth: 3,
        borderLeftColor: state.color,
        padding: "0.6rem 0.7rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.15rem",
      }}
    >
      <span style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#2b2d33" }}>{room.no}</span>
      <span style={{ fontSize: "0.7rem", color: "#6f7480" }}>
        {room.type} · {room.rate}
      </span>
      <span style={{ fontSize: "0.7rem", color: state.color, fontWeight: 600 }}>{state.label}</span>
    </div>
  );
};

const FloorBlock: React.FC<{ name: string; rooms: Room[] }> = ({ name, rooms }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
      <span style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: "#2b2d33" }}>{name}</span>
      <span style={{ fontSize: "0.72rem", color: "#8a8f9a" }}>{rooms.length} rooms</span>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(104px, 1fr))",
        gap: "0.5rem",
      }}
    >
      {rooms.map((r) => (
        <RoomTile key={r.no} room={r} />
      ))}
    </div>
  </div>
);

const PmsFigure: React.FC = () => (
  <Frame
    ground="#fdfcfa"
    caption="Housekeeping board, reconstructed — room states, types and rates as the system carries them. Guest details omitted."
  >
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", paddingBottom: "0.7rem", borderBottom: "1px solid #e6e1d6" }}>
        {["Available", "Occupied", "Needs cleaning", "Being cleaned", "Out of order"].map((s, i) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: "#6f7480" }}>
            <span
              style={{
                width: 9,
                height: 9,
                background: ["#1f8e77", "#c8a951", "#b98b3a", "#7f97a8", "#a93b3b"][i],
                display: "block",
              }}
            />
            {s}
          </span>
        ))}
      </div>
      <FloorBlock name="Ground floor" rooms={GROUND} />
      <FloorBlock name="First floor" rooms={FIRST} />
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* 01 — Divic public site: the room request card                       */
/* ------------------------------------------------------------------ */

const DivicSiteFigure: React.FC = () => (
  <Frame ground="#f7efea" caption="Room detail and request flow, reconstructed — one request button per room, per property.">
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.6rem" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", letterSpacing: "0.08em", color: "#3a2c24" }}>
          DIVIC
        </span>
        <div style={{ display: "flex", border: "1px solid #d9c6b8", borderRadius: 999, overflow: "hidden", fontSize: "0.74rem" }}>
          <span style={{ padding: "0.3rem 0.8rem", color: "#7a685c" }}>Exclusive 1</span>
          <span style={{ padding: "0.3rem 0.8rem", background: "#e8d5c4", color: "#3a2c24", fontWeight: 600 }}>Urban</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "1px solid #e6d8cd", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#2f2620" }}>Classic Room</span>
        <span style={{ width: 34, height: 2, background: "#9a4f1b", display: "block" }} />
        <span style={{ fontSize: "0.82rem", color: "#6b5c52", maxWidth: "44ch" }}>
          King bed, blackout curtains, a work desk and a walk-in shower. Ground and first floor —
          the straightforward choice for a night or two.
        </span>
        <span style={{ fontSize: "0.74rem", color: "#8a7a6e" }}>Floor 1 · Floor 2</span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.7rem",
            borderTop: "1px solid #eadfd6",
            paddingTop: "0.8rem",
          }}
        >
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "1.7rem", color: "#9a4f1b" }}>₦50,000</span>
            <span style={{ fontSize: "0.72rem", color: "#8a7a6e" }}>per night, from</span>
          </span>
          <span style={{ background: "#9a4f1b", color: "#fff", padding: "0.6rem 1rem", fontSize: "0.8rem", fontWeight: 600 }}>
            Request this room
          </span>
        </div>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* 03 — Lamadew storefront                                             */
/* ------------------------------------------------------------------ */

const LamadewFigure: React.FC = () => (
  <Frame ground="#faf7f2" caption="Storefront, reconstructed — the owner's admin sits in the same navigation as the shop.">
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.7rem",
          background: "#fff",
          border: "1px solid #ece5db",
          borderRadius: 999,
          padding: "0.5rem 0.9rem",
        }}
      >
        <span style={{ fontWeight: 600, color: "#1b2430", fontSize: "0.9rem" }}>Luma Dew</span>
        <span style={{ display: "flex", gap: "0.9rem", fontSize: "0.78rem", color: "#5c6572" }}>
          <span style={{ color: "#1b2430", fontWeight: 600, borderBottom: "2px solid #6b4630" }}>Home</span>
          <span>Shop</span>
          <span>Admin</span>
        </span>
        <span
          style={{
            background: "#f3ece4",
            borderRadius: 999,
            padding: "0.3rem 0.7rem",
            fontSize: "0.74rem",
            color: "#3d3128",
            fontWeight: 600,
          }}
        >
          Cart · 2
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", paddingInline: "0.3rem" }}>
        <span style={{ fontSize: "clamp(1.3rem,4vw,1.9rem)", fontWeight: 700, color: "#131a26", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Skin that looks rested,
          <br />
          even when you are not.
        </span>
        <span style={{ fontSize: "0.85rem", color: "#5c6572", maxWidth: "42ch" }}>
          A modern skincare line built around hydration, calm, and glow — no ten-step routine
          required.
        </span>
        <span
          style={{
            alignSelf: "flex-start",
            background: "#6b4630",
            color: "#fff",
            borderRadius: 999,
            padding: "0.6rem 1.2rem",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          Shop now
        </span>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* 04 — Mr. Mouse reminders                                            */
/* ------------------------------------------------------------------ */

const MrMouseFigure: React.FC = () => (
  <Frame ground="#faf8f3" caption="Reminders and deadlines, reconstructed — four positions tracked, delivery configurable per channel and lead time.">
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1e241e", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "#9db09f" }}>MISCHIEF</span>
        <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f2f5f1", letterSpacing: "-0.02em" }}>
          Reminders &amp; Deadlines
        </span>
        <span style={{ fontSize: "0.78rem", color: "#9db09f", maxWidth: "48ch" }}>
          Track payment deadlines, rent and bills due, pending order fulfillment, and outstanding
          balances.
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "0.5rem",
          padding: "0.9rem",
        }}
      >
        {[
          ["NEEDS ATTENTION", "0"],
          ["OWED TO YOU", "₦0.00"],
          ["YOU OWE", "₦0.00"],
          ["PENDING ORDERS", "0"],
        ].map(([label, value]) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e8e3d8", padding: "0.7rem" }}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#8d8b80" }}>{label}</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#22261f", fontVariantNumeric: "tabular-nums" }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 0.9rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#22261f" }}>Reminder delivery</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: "0.5rem" }}>
          {[
            ["Telegram", "Send to your linked Telegram chat", true],
            ["WhatsApp", "Send through your connected WhatsApp", false],
          ].map(([name, detail, on]) => (
            <div
              key={name as string}
              style={{
                background: "#fff",
                border: "1px solid #e8e3d8",
                padding: "0.6rem 0.7rem",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#22261f" }}>{name as string}</span>
                <span style={{ fontSize: "0.68rem", color: "#8d8b80" }}>{detail as string}</span>
              </span>
              <span
                style={{
                  width: 14,
                  height: 14,
                  flex: "none",
                  marginTop: 2,
                  border: `1px solid ${on ? "#2f6b3f" : "#c9c4b6"}`,
                  background: on ? "#2f6b3f" : "#fff",
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {["3 days before", "1 day before", "Due date", "Overdue"].map((t) => (
            <span
              key={t}
              style={{
                background: "#fff",
                border: "1px solid #e8e3d8",
                padding: "0.35rem 0.6rem",
                fontSize: "0.72rem",
                color: "#22261f",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */

export const InterfaceFigure: React.FC<{ slug: string }> = ({ slug }) => {
  switch (slug) {
    case "divic-pms":
      return <PmsFigure />;
    case "divic-exclusive-hotels":
      return <DivicSiteFigure />;
    case "lamadew-cosmetics":
      return <LamadewFigure />;
    case "mr-mouse":
      return <MrMouseFigure />;
    default:
      return null;
  }
};
