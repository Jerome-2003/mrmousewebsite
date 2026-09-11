import React from "react";
import { MARK_PIECES, MARK_SHELF, MARK_VIEWBOX } from "@/components/markGeometry";

/**
 * The Horde-M mark: four tools standing in a rack, reading as an M, inside a
 * stamped tag. The tag frame is the identity's reusable unit.
 */
export const Mark: React.FC<{ size?: number; className?: string; title?: string }> = ({
  size = 34,
  className,
  title = "Horde-M",
}) => (
  <svg
    width={size}
    height={size}
    viewBox={MARK_VIEWBOX}
    className={className}
    role="img"
    aria-label={title}
    focusable="false"
  >
    <rect x="1" y="1" width="62" height="62" rx="2" fill="#14181c" stroke="#d4a02a" strokeWidth="2" />
    {MARK_PIECES.map((piece, i) =>
      piece.kind === "rect" ? (
        <rect
          key={i}
          x={piece.x}
          y={piece.y}
          width={piece.width}
          height={piece.height}
          fill={piece.color}
        />
      ) : (
        <polygon key={i} points={piece.points} fill={piece.color} />
      )
    )}
    <rect
      x={MARK_SHELF.x}
      y={MARK_SHELF.y}
      width={MARK_SHELF.width}
      height={MARK_SHELF.height}
      fill={MARK_SHELF.color}
    />
  </svg>
);

export const Wordmark: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <span className="flex items-center gap-3">
    <Mark size={size} />
    <span
      className="font-display font-black uppercase tracking-[-0.03em] text-bone"
      style={{ fontSize: size * 0.62, lineHeight: 1 }}
    >
      Horde&#8209;M
    </span>
  </span>
);
