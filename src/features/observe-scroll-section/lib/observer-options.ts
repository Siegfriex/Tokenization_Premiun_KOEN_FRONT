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
 */
export function buildTriggerLineRootMargin(viewportHeight: number): string {
  const bottomInset = Math.max(viewportHeight - TRIGGER_LINE_PX - 1, 0);
  return `-${TRIGGER_LINE_PX}px 0px -${bottomInset}px 0px`;
}
