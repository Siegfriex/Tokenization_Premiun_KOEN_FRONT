/**
 * Moved unchanged from src/components/StoryProgress.tsx's local SECTIONS
 * array. `id` values are the anchor targets every widget's `<section id>`
 * matches (see docs/CONTENT_AUDIT.md P0 item #2) — must stay in sync with
 * each widget's `id` prop.
 */
import { NavSection } from '../model/types';

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: { ko: 'S0. 커버', en: 'S0. Cover' } },
  { id: 'compare', label: { ko: 'S1. 분절 비교', en: 'S1. Compare' } },
  { id: 'pipeline', label: { ko: 'S2. 파이프라인', en: 'S2. Pipeline' } },
  { id: 'patterns', label: { ko: 'S3. Token Premium', en: 'S3. Premium' } },
  { id: 'burden', label: { ko: 'S4. 누적 부담', en: 'S4. Burden' } },
  { id: 'languages', label: { ko: 'S4.5. 글로벌 다국어', en: 'S4.5. Global' } },
  { id: 'impact', label: { ko: 'S5. 사회적 확장', en: 'S5. Society' } },
  { id: 'method', label: { ko: 'S6. 방법론·한계', en: 'S6. Method' } },
  { id: 'result', label: { ko: '결론', en: 'Result' } },
];

/**
 * Stable id-only array, module-scoped so its reference never changes
 * across renders — required by `useActiveSection` (see
 * features/observe-scroll-section), which re-registers its
 * IntersectionObserver whenever this array's identity changes.
 */
export const NAV_SECTION_IDS: readonly string[] = NAV_SECTIONS.map((s) => s.id);
