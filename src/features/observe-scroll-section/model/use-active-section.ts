import { useEffect, useRef, useState } from 'react';
import { buildTriggerLineRootMargin } from '../lib/observer-options';

/**
 * Reports which of `sectionIds` (a stable array — memoize/derive it once
 * at module scope in the caller, not inline per render, or this effect
 * re-registers on every render) is currently "active" for navigation
 * highlighting.
 *
 * Algorithm (documented per docs/REFACTOR_PLAN.md Phase 4 requirements):
 * - Observation targets: the DOM element with `id === sectionIds[i]` for
 *   each id, resolved once on mount (and whenever `sectionIds` changes).
 * - A single IntersectionObserver watches all of them against a 1px
 *   trigger line 240px from the viewport top (see observer-options.ts).
 * - Tie-break: if more than one section is simultaneously reported as
 *   intersecting the line (can happen only transiently, e.g. very short
 *   adjacent sections during a fast scroll), the section that appears
 *   LATEST in `sectionIds` wins — this reproduces the legacy
 *   last-to-first scan exactly.
 * - No-active-section case: if the trigger line currently intersects no
 *   observed section at all (e.g. before the very first section has
 *   been laid out, or during the instant between two sections), the
 *   previously active id is kept rather than resetting to a default —
 *   deterministic, no flicker.
 * - Top-of-page behavior: the first section (typically the hero) starts
 *   as the initial `activeId` and remains active until the trigger line
 *   first crosses into the next section.
 * - Bottom-of-page behavior: once scrolled past the last section's
 *   start, the trigger line stops intersecting anything further down,
 *   so the last section that did intersect (the final one) remains
 *   active for the rest of the scroll — matching the legacy behavior,
 *   where the final loop iteration (`result`) keeps satisfying
 *   `top <= 240` all the way to the bottom of the page.
 * - Unregistered section ids (not present as a DOM element with that id)
 *   are silently skipped — never observed, never selectable as active.
 * - Cleanup: the observer is disconnected and the intersecting-set ref is
 *   cleared on unmount or whenever `sectionIds` changes.
 * - Viewport resize: `rootMargin` is computed from the current viewport
 *   height, which is tracked in state and updated (rAF-throttled) on
 *   `resize`. The observer effect depends on that height, so resizing
 *   the window (or rotating a device) recreates the observer with a
 *   fresh trigger-line position instead of keeping a stale one from
 *   mount time.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window === 'undefined' ? 0 : window.innerHeight
  );
  const intersectingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    let frame: number | null = null;
    const handleResize = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        setViewportHeight(window.innerHeight);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || sectionIds.length === 0) {
      return;
    }

    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry): entry is { id: string; el: HTMLElement } => entry.el !== null);

    if (elements.length === 0) {
      return;
    }

    const idByElement = new Map<Element, string>(elements.map(({ id, el }) => [el, id]));
    intersectingRef.current = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = idByElement.get(entry.target);
          if (!id) continue;
          if (entry.isIntersecting) {
            intersectingRef.current.add(id);
          } else {
            intersectingRef.current.delete(id);
          }
        }

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          if (intersectingRef.current.has(sectionIds[i])) {
            setActiveId(sectionIds[i]);
            return;
          }
        }
        // Trigger line currently intersects nothing observed — keep the
        // previous activeId (see algorithm note above).
      },
      {
        root: null,
        rootMargin: buildTriggerLineRootMargin(viewportHeight),
        threshold: 0,
      }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => {
      observer.disconnect();
      intersectingRef.current.clear();
    };
  }, [sectionIds, viewportHeight]);

  return activeId;
}
