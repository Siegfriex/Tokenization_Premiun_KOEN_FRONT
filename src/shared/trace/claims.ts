import type { ClaimStatus } from './types';

/**
 * Catalogue of every numeric claim the site renders.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS IS, AND WHAT IT IS NOT
 * ---------------------------------------------------------------------------
 * This is the central register of visible research claims. It exists so that a
 * claim can be *owned* before it is *resolved* — the two are different, and
 * conflating them is how the current situation arose.
 *
 * It does NOT contain values. No number here has been corrected, derived,
 * chosen between, or explained. Ten of the twenty-two entries render figures
 * that disagree with the entity data the same widget draws its chart from; six
 * more render figures no entity holds at all. Every one of them still renders
 * exactly what it rendered before this file existed.
 *
 * What the register adds today is *identity*: each claim has a stable key, a
 * status, a cross-reference into the audit ledger, and a `data-claim-id` on the
 * node that renders it. That is what makes a later one-shot correction safe —
 * when the Director rules, the value moves in one place and every rendering
 * site follows, instead of someone grepping for `1.68` and hoping.
 *
 * ---------------------------------------------------------------------------
 * STATUS
 * ---------------------------------------------------------------------------
 * `decision-required` — the figure contradicts the repository, or nothing in
 *                       the repository holds it. Frozen until docs/audit/
 *                       DIRECTOR_DECISIONS.md answers. Do not touch.
 * `frozen`            — the figure agrees with an entity today, but the markup
 *                       owns its own copy and can drift. Safe to rewire once
 *                       D3 is confirmed; not safe to change.
 * `resolved`          — owned by an entity, read not copied. None yet.
 *
 * The audit metadata for each claim — the observation, the entity that holds
 * the same value, the Director queue item blocking it — lives in
 * `claims.audit.ts`, which nothing at runtime imports. Keeping it out of this
 * file keeps internal observations out of the production bundle while leaving
 * them one import away for tooling.
 *
 * Full observations: docs/audit/NUMERIC_CLAIMS.md. Rulings:
 * docs/audit/DIRECTOR_DECISIONS.md.
 */
export interface VisibleClaim {
  /** Stable key. Also the `data-claim-id` on the node that renders it. */
  readonly id: string;
  /** Row in docs/audit/TRACE_LEDGER.md. */
  readonly traceId: string;
  readonly status: ClaimStatus;
  /** Which widget renders it. */
  readonly widget: string;
  /**
   * The string this claim renders, character for character as it rendered
   * before the registry existed. FROZEN: this field is a copy, not a decision.
   * Nothing here has been corrected, rounded, reformatted or recomputed — a
   * value that contradicts the entity data still says exactly what it said.
   * When the Director rules, this is the one place the value changes.
   */
  readonly display: string;
  /**
   * Set only where the claim is rendered as several sibling elements rather
   * than one string, so the markup can be preserved without inventing a
   * concatenation. Each part is verbatim.
   */
  readonly displayParts?: readonly string[];
}

export const VISIBLE_CLAIMS = {
  /* ---- S3 Token Premium — summary panel vs. its own chart (D1) ---- */
  'premium.corpus-size-ko': {
    id: 'premium.corpus-size-ko',
    display: '69,432건 정밀 분석', traceId: 'PREM-002', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.corpus-size-en': {
    id: 'premium.corpus-size-en',
    display: '69,432 Verified KO-EN Pairs', traceId: 'PREM-003', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.headline-range': {
    id: 'premium.headline-range',
    display: '1.29× ~ 1.83×', displayParts: ['1.29', '1.83'], traceId: 'PREM-011', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.average-ratio': {
    id: 'premium.average-ratio',
    display: '1.68× (+68%)', traceId: 'PREM-017', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.baseline-standard': {
    id: 'premium.baseline-standard',
    display: '1.00× (Standard)', traceId: 'PREM-020', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.domain-range': {
    id: 'premium.domain-range',
    display: 'Business (1.44×) ~ Daily (1.83×)', traceId: 'PREM-023', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.benchmark-domain-count': {
    id: 'premium.benchmark-domain-count',
    display: '7 Benchmark Domains', traceId: 'PREM-032', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.baseline-english': {
    id: 'premium.baseline-english',
    display: 'Baseline: 1.00× (English)', traceId: 'PREM-038', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },
  'premium.max-observed': {
    id: 'premium.max-observed',
    display: 'Max Observed: 1.83×', traceId: 'PREM-039', status: 'decision-required',
    widget: 'TokenPremiumSection',
  },

  /* ---- S0 Hero — exhibit numbers match no sentence pair (D2) ---- */
  'hero.exhibit-hangul-tokens': {
    id: 'hero.exhibit-hangul-tokens',
    display: '31 TOKENS', traceId: 'HERO-025', status: 'decision-required',
    widget: 'NewsHeroSection',
  },
  'hero.exhibit-english-tokens': {
    id: 'hero.exhibit-english-tokens',
    display: '18 TOKENS', traceId: 'HERO-029', status: 'decision-required',
    widget: 'NewsHeroSection',
  },
  'hero.exhibit-ratio': {
    id: 'hero.exhibit-ratio',
    display: '1.72× (+72% Difference)', traceId: 'HERO-033', status: 'decision-required',
    widget: 'NewsHeroSection',
  },

  /* ---- Values that agree today but are copied, not read (D3) ---- */
  'hero.observed-gap': {
    id: 'hero.observed-gap',
    display: '+78% Hangul Token Burden', traceId: 'HERO-019', status: 'frozen',
    widget: 'NewsHeroSection',
  },
  'lang.hangul-ratio-callout': {
    id: 'lang.hangul-ratio-callout',
    display: '★ 한국어는 라틴 알파벳(영어/스페인어) 대비 1.78배의 토큰이 소비됩니다.', traceId: 'LANG-019', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection',
  },
  'lang.legend-hangul-ratio': {
    id: 'lang.legend-hangul-ratio',
    display: '한국어 한글 (1.78×)', traceId: 'LANG-032', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection',
  },

  /* ---- Unsourced quantities in supporting copy (D4) ---- */
  'lang.legend-latin-baseline': {
    id: 'lang.legend-latin-baseline',
    display: '라틴 알파벳 기준 (1.00×)', traceId: 'LANG-031', status: 'decision-required',
    widget: 'MultilingualTokenEfficiencySection',
  },
  'burden.preset-team-label': {
    id: 'burden.preset-team-label',
    display: '1,000회 (팀 일간 워크플로우)', traceId: 'BURD-017', status: 'decision-required',
    widget: 'OccupationSection',
  },
  'burden.preset-org-label': {
    id: 'burden.preset-org-label',
    display: '2,000회 (전사 에이전트 루틴)', traceId: 'BURD-018', status: 'decision-required',
    widget: 'OccupationSection',
  },
  'method.principle-count': {
    id: 'method.principle-count',
    display: '6 Key Principles', traceId: 'METH-008', status: 'decision-required',
    widget: 'MethodSection',
  },

  /* ---- Values an entity holds, hardcoded anyway ---- */
  'lang.baseline-difference-label': {
    id: 'lang.baseline-difference-label',
    display: 'Baseline (0%)', traceId: 'LANG-018', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection',
  },
  'lang.normalization-base': {
    id: 'lang.normalization-base',
    display: '기준 영문 100 토큰 대비 정규화 소모량', traceId: 'LANG-025', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection',
  },
  'burden.preset-min-label': {
    id: 'burden.preset-min-label',
    display: '1회 (단일 프롬프트)', traceId: 'BURD-016', status: 'frozen',
    widget: 'OccupationSection',
  },
} as const satisfies Record<string, VisibleClaim>;

export type ClaimId = keyof typeof VISIBLE_CLAIMS;

/** Status for a claim key — the value of `data-claim-status` in the DOM. */
export const claimStatus = (id: ClaimId): ClaimStatus => VISIBLE_CLAIMS[id].status;

/** Trace-ledger row for a claim key — the value of `data-trace-id`. */
export const claimTrace = (id: ClaimId): string => VISIBLE_CLAIMS[id].traceId;

/**
 * The `data-*` bundle every claim-bearing node spreads. One call keeps the
 * three attributes in step and makes an unregistered claim a type error.
 */
export const claimAttrs = (id: ClaimId) => ({
  'data-claim-id': id,
  'data-claim-status': VISIBLE_CLAIMS[id].status,
  'data-trace-id': VISIBLE_CLAIMS[id].traceId,
  'data-source': 'registry' as const,
});

/**
 * The frozen display string for a claim. Widgets render this instead of a
 * literal, so the value has exactly one owner. Reading it changes nothing
 * about what appears on screen — that is the point.
 */
export const claimText = (id: ClaimId): string => (VISIBLE_CLAIMS[id] as VisibleClaim).display;

/** Verbatim parts for claims rendered across sibling elements. */
export const claimParts = (id: ClaimId): readonly string[] => {
  const c: VisibleClaim = VISIBLE_CLAIMS[id];
  return c.displayParts ?? [c.display];
};
