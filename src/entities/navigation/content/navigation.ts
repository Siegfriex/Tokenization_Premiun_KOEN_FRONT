/**
 * Moved unchanged from src/components/StoryProgress.tsx's local SECTIONS
 * array. `id` values are the anchor targets every widget's `<section id>`
 * matches (see docs/CONTENT_AUDIT.md P0 item #2) — must stay in sync with
 * each widget's `id` prop.
 */
import { NavSection } from '../model/types';

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', code: { ko: 'S0', en: 'S0' }, name: { ko: '커버', en: 'Cover' } },
  { id: 'compare', code: { ko: 'S1', en: 'S1' }, name: { ko: '분절 비교', en: 'Compare' } },
  { id: 'pipeline', code: { ko: 'S2', en: 'S2' }, name: { ko: '파이프라인', en: 'Pipeline' } },
  { id: 'mechanism', code: { ko: 'S2.5', en: 'S2.5' }, name: { ko: '원인 분해', en: 'Mechanism' } },
  { id: 'patterns', code: { ko: 'S3', en: 'S3' }, name: { ko: 'Token Premium', en: 'Premium' } },
  { id: 'burden', code: { ko: 'S4', en: 'S4' }, name: { ko: '누적 부담', en: 'Burden' } },
  { id: 'languages', code: { ko: 'S4.5', en: 'S4.5' }, name: { ko: '글로벌 다국어', en: 'Global' } },
  { id: 'infrastructure', code: { ko: 'S5', en: 'S5' }, name: { ko: 'AI 인프라', en: 'Infra' } },
  { id: 'impact', code: { ko: 'S5.2', en: 'S5.2' }, name: { ko: '사회적 확장', en: 'Society' } },
  { id: 'method', code: { ko: 'S6', en: 'S6' }, name: { ko: '방법론·한계', en: 'Method' } },
  { id: 'result', code: { ko: 'S7', en: 'S7' }, name: { ko: '결론', en: 'Result' } },
];

/**
 * Stable id-only array, module-scoped so its reference never changes
 * across renders — required by `useActiveSection` (see
 * features/observe-scroll-section), which re-registers its
 * IntersectionObserver whenever this array's identity changes.
 */
export const NAV_SECTION_IDS: readonly string[] = NAV_SECTIONS.map((s) => s.id);

/**
 * Accessible name for the section-nav landmark. Introduced when the nav became
 * `<nav aria-label> > <ul> > <li>` in B3 — a screen reader announces it, so it
 * is editorial content and belongs here rather than inline in StoryProgress.
 */
export const NAV_LANDMARK_LABEL = {
  ko: '섹션 바로가기',
  en: 'Story sections',
} as const;
