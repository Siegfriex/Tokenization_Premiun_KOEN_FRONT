/**
 * Chart color tokens for libraries that require literal resolved color
 * values rather than CSS classes (Recharts `fill`/`stroke` props cannot
 * consume Tailwind utility classes or CSS custom properties reliably
 * across SVG contexts).
 *
 * They are kept here, separate from src/shared/config/tokens.css,
 * specifically so chart color changes are made in one place instead of
 * drifting as a fourth, chart-only color source (see docs/DESIGN_AUDIT.md).
 *
 * These are the JS half of the DATA-MARK layer described in
 * src/shared/config/tokens.css. The series values below are intentionally the
 * same near-black/gray family as `--color-mark*` there, so a chart bar and the
 * HTML legend swatch that labels it render the same color. Data marks are
 * deliberately not cobalt: the accent layer is reserved for selection and
 * navigation state, and accent-colored bars would compete with it.
 *
 * `rule`/`ruleMuted` are the chart's own axis/gridline grays and are NOT the
 * same value as `--color-rule` (#DCE7F7). That divergence is inherited: the
 * legacy recolor pass that once ran in src/index.css intercepted Tailwind
 * class names in the DOM but never SVG stroke props, so HTML borders picked
 * up the blue tint and chart axes kept the untinted gray. That pass is gone
 * (see docs/design/COLOR_HACK_FINDING.md §RESOLUTION), but the two values it
 * split apart are still split. Reconciling them would visibly change every
 * chart axis, so it is left as a separate, explicit decision rather than
 * folded into a consolidation pass.
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
