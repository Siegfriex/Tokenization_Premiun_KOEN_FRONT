/**
 * The legacy implementation (pre-Phase-4, in StoryProgress.tsx) tracked
 * the active section with a `scroll` listener that, on every event,
 * scanned NAV_SECTIONS from last to first and picked the first section
 * whose `getBoundingClientRect().top <= 240`.
 *
 * TRIGGER_LINE_PX reproduces that same 240px threshold, but as an
 * IntersectionObserver trigger line instead of a per-scroll-event
 * getBoundingClientRect scan (fewer forced layout reads, no scroll-jank
 * risk). See `model/use-active-section.ts` for the tie-break logic that
 * replicates the legacy "scan from last to first" behavior.
 */
export const TRIGGER_LINE_PX = 240;

/**
 * Builds a `rootMargin` that collapses the viewport to a 1px-tall
 * horizontal band positioned `TRIGGER_LINE_PX` down from the top —
 * an element "intersects" exactly when it visually spans that line.
 *
 * `topInset` is clamped to `viewportHeight - 1` so a viewport shorter
 * than `TRIGGER_LINE_PX` (e.g. a landscape-orientation phone) still gets
 * a valid single-pixel line near its bottom edge, instead of a degenerate
 * zero-height bottom inset that would turn the whole 240px-to-bottom
 * region into the observed area (every visible section would then
 * "intersect" at once).
 */
export function buildTriggerLineRootMargin(viewportHeight: number): string {
  const topInset = Math.min(TRIGGER_LINE_PX, Math.max(viewportHeight - 1, 0));
  const bottomInset = Math.max(viewportHeight - topInset - 1, 0);
  return `-${topInset}px 0px -${bottomInset}px 0px`;
}
