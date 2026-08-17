/**
 * Chart color tokens for libraries that require literal resolved color
 * values rather than CSS classes (Recharts `fill`/`stroke` props cannot
 * consume Tailwind utility classes or CSS custom properties reliably
 * across SVG contexts).
 *
 * These values are NOT touched by the legacy recolor hack in
 * src/index.css (see docs/design/COLOR_HACK_FINDING.md) — that hack only
 * intercepts Tailwind *class name* strings in the DOM, not raw hex
 * literals passed through JS/SVG props. They are kept here, separate
 * from src/shared/config/tokens.css, specifically so chart color changes
 * are made in one place instead of drifting as a fourth, chart-only color
 * source (see docs/DESIGN_AUDIT.md).
 */
export const chartTokens = {
  rule: '#DADAD6',
  ruleMuted: '#777773',
  seriesHighlight: '#161616',
  seriesBaseline: '#777773',
  seriesOther: '#C2C2BD',
  selectedOutline: '#111111',
} as const;

export type ChartTokenName = keyof typeof chartTokens;
