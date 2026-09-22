// The "th" swash from the Aithello wordmark as a single stroke: where the
// h flows out of the t. Traced from logo-primary-wordmark-2026-09-18.svg
// (the swash's centerline, fitted to one cubic curve, within 1.6 viewBox
// units on average), and normalized to a 108 x 100.9 box, rising from the
// lower left to the upper right.
//
// Provisional answer to spec section 10, item 11 (arc motif artwork).
const ARC = {
  width: 108,
  height: 100.9,
  // Start, two control points, end
  points: [
    [0, 100.9],
    [57.7, 101.92],
    [54.58, 7.71],
    [108, 0],
  ],
};

export const TH_ARC_PATH = "M 0 100.9 C 57.7 101.92 54.58 7.71 108 0";

type ThArcProps = {
  // Width-to-height ratio of the box the arc is drawn in. The curve is
  // stretched to it here, so the SVG scales almost uniformly and the
  // stroke stays even (no vector-effect, which breaks dash-based drawing).
  aspect?: number;
  className?: string;
};

/**
 * Decorative. pathLength="1" lets CSS draw it in with stroke-dasharray: 1
 * and stroke-dashoffset from 1 to 0.
 */
export default function ThArc({ aspect = ARC.width / ARC.height, className = "" }: ThArcProps) {
  const height = 100;
  const width = height * aspect;
  const sx = width / ARC.width;
  const sy = height / ARC.height;
  const [p0, p1, p2, p3] = ARC.points.map(([x, y]) => [
    +(x * sx).toFixed(2),
    +(y * sy).toFixed(2),
  ]);
  const d = `M ${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
    >
      <path d={d} pathLength={1} fill="none" strokeLinecap="round" />
    </svg>
  );
}
