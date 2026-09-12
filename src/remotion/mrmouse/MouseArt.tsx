import React from "react";

/**
 * The Mr. Mouse house character, drawn from SVG primitives rather than traced
 * path data so it stays sharp at 1080p and costs nothing to ship. Same geometry
 * as the one in the product itself, so the video and the app agree on what a
 * Mr. Mouse mouse looks like.
 *
 * Drawn facing right with its feet on y=0 — callers only translate it.
 */
export const Mouse: React.FC<{
  carrying?: boolean;
  scale?: number;
  ink?: string;
  paper?: string;
  /** Vertical bob and leg swing, in the caller's own time base. */
  step?: number;
}> = ({ carrying = false, scale = 1, ink = "#1C2118", paper = "#F7F5EF", step = 0 }) => {
  const bob = Math.sin(step) * 1.4;
  const legA = Math.sin(step) * 1.3;
  const legB = -legA;

  return (
    <g transform={`scale(${scale})`}>
      <g transform={`translate(0 ${bob})`}>
        <path d="M -1 -3 q -9 0 -11 -7" fill="none" stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={3} y1={-1} x2={3} y2={2.5 + legA} stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={10} y1={-1} x2={10} y2={2.5 + legB} stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
        <ellipse cx={7} cy={-5} rx={8} ry={5.2} fill={ink} />
        <circle cx={15.5} cy={-6.5} r={4.1} fill={ink} />
        <circle cx={14} cy={-11} r={2.6} fill={ink} />
        <circle cx={14} cy={-11} r={1.1} fill={paper} />
        <path d="M 19 -6 l 3.4 1.2" fill="none" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
        <circle cx={16.6} cy={-7.6} r={0.7} fill={paper} />
        {carrying && (
          <g transform={`rotate(${Math.sin(step * 0.5) * 4} 8 -16)`}>
            <rect x={2} y={-21} width={13} height={9} rx={1} fill={paper} stroke={ink} strokeWidth={1} />
            <line x1={4.5} y1={-18} x2={12.5} y2={-18} stroke={ink} strokeWidth={0.8} opacity={0.5} />
            <line x1={4.5} y1={-15.5} x2={10} y2={-15.5} stroke={ink} strokeWidth={0.8} opacity={0.5} />
          </g>
        )}
      </g>
    </g>
  );
};
