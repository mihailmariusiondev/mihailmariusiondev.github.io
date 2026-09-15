/**
 * One parametric generator for the whole Mudéjar star system used across the
 * site: hero cluster, portrait frame, case-study motifs, timeline markers and
 * the background lattice. Every star on the page comes from this function —
 * never a hand-drawn/traced shape — so the geometry reads as a system, not
 * clip-art.
 *
 * The default inner/outer ratio (sqrt(2) - 1) is the classic proportion of an
 * eight-point Mudéjar star ("lazo de ocho"): the point where two squares,
 * offset 45 degrees, intersect.
 */

export const LAZO_RATIO = Math.SQRT2 - 1; // ~0.41421

export interface StarOptions {
  /** Number of outer spikes. 8 = the canonical lazo de ocho, 6 a related variant. */
  spikes?: number;
  /** inner radius / outer radius. */
  innerRatio?: number;
  /** Rotation in degrees, applied before sampling points. */
  rotation?: number;
}

/** Points of a star polygon on a unit circle (radius 1, centered at 0,0). */
function unitStarPoints({
  spikes = 8,
  innerRatio = LAZO_RATIO,
  rotation = 0,
}: StarOptions = {}): Array<[number, number]> {
  const steps = spikes * 2;
  const rot = (rotation * Math.PI) / 180;
  const points: Array<[number, number]> = [];
  for (let i = 0; i < steps; i++) {
    const r = i % 2 === 0 ? 1 : innerRatio;
    const theta = rot + (i * Math.PI * 2) / steps - Math.PI / 2;
    points.push([Math.cos(theta) * r, Math.sin(theta) * r]);
  }
  return points;
}

/**
 * A CSS clip-path polygon() string, in percentage space, for framing an
 * element (the portrait, a card corner chip) with a star silhouette.
 */
export function starClipPath(options: StarOptions = {}): string {
  const pts = unitStarPoints(options);
  const coords = pts
    .map(([x, y]) => `${(50 + x * 50).toFixed(2)}% ${(50 + y * 50).toFixed(2)}%`)
    .join(", ");
  return `polygon(${coords})`;
}

/**
 * SVG <polygon points="..."> string, in a viewBox of the given size centered
 * at its own middle, for the hero cluster, card motifs and timeline chips.
 */
export function starSvgPoints(size: number, options: StarOptions = {}): string {
  const pts = unitStarPoints(options);
  const r = size / 2;
  return pts.map(([x, y]) => `${(r + x * r).toFixed(2)},${(r + y * r).toFixed(2)}`).join(" ");
}

/** Tone tokens cycled across case studies / timeline rows, in order. */
export const TILE_TONES = ["cobalt", "green", "ochre"] as const;
export type TileTone = (typeof TILE_TONES)[number];

export function toneForIndex(index: number): TileTone {
  return TILE_TONES[index % TILE_TONES.length];
}

/** Spike count alternates 8/6 across an index, for family variety without new shapes. */
export function spikesForIndex(index: number): number {
  return index % 2 === 0 ? 8 : 6;
}
