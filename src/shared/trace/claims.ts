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
 * Full observations: docs/audit/NUMERIC_CLAIMS.md. Rulings:
 * docs/audit/DIRECTOR_DECISIONS.md. Do not add an explanation to a `note`
 * below — they record what was observed, not why.
 */
export interface VisibleClaim {
  /** Stable key. Also the `data-claim-id` on the node that renders it. */
  readonly id: string;
  /** Row in docs/audit/TRACE_LEDGER.md. */
  readonly traceId: string;
  readonly status: ClaimStatus;
  /** Which widget renders it. */
  readonly widget: string;
  /** Entity holding the same value, where one does. */
  readonly entityRef?: string;
  /** Verbatim observation. Never an explanation. */
  readonly note: string;
  /** Director queue item blocking this claim. */
  readonly directorRef?: string;
}

export const VISIBLE_CLAIMS = {
  /* ---- S3 Token Premium — summary panel vs. its own chart (D1) ---- */
  'premium.corpus-size-ko': {
    id: 'premium.corpus-size-ko', traceId: 'PREM-002', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'no entity holds a corpus size',
  },
  'premium.corpus-size-en': {
    id: 'premium.corpus-size-en', traceId: 'PREM-003', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'no entity holds a corpus size',
  },
  'premium.headline-range': {
    id: 'premium.headline-range', traceId: 'PREM-011', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup renders 1.29x ~ 1.83x; entity ratio range is 1.13 - 1.75',
  },
  'premium.average-ratio': {
    id: 'premium.average-ratio', traceId: 'PREM-017', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup renders 1.68x (+68%); mean of the 6 entity ratios is 1.513, and no entity holds 1.68',
  },
  'premium.baseline-standard': {
    id: 'premium.baseline-standard', traceId: 'PREM-020', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup renders an English baseline row; no baseline row exists in the array',
  },
  'premium.domain-range': {
    id: 'premium.domain-range', traceId: 'PREM-023', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup names a "Business" domain that does not exist, and gives "Daily" as 1.83x where the entity holds 1.38',
  },
  'premium.benchmark-domain-count': {
    id: 'premium.benchmark-domain-count', traceId: 'PREM-032', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup renders 7 Benchmark Domains; the array has 6 entries, countable on screen',
  },
  'premium.baseline-english': {
    id: 'premium.baseline-english', traceId: 'PREM-038', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup renders an English baseline row; no baseline row exists in the array',
  },
  'premium.max-observed': {
    id: 'premium.max-observed', traceId: 'PREM-039', status: 'decision-required',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    note: 'markup renders Max Observed 1.83x directly under the chart; highest entity ratio is 1.75',
  },

  /* ---- S0 Hero — exhibit numbers match no sentence pair (D2) ---- */
  'hero.exhibit-hangul-tokens': {
    id: 'hero.exhibit-hangul-tokens', traceId: 'HERO-025', status: 'decision-required',
    widget: 'NewsHeroSection', directorRef: 'D2', entityRef: 'CURATED_PAIRED_SENTENCES',
    note: 'no paired-sentence entry has hangulCount 31; TOKEN_BASELINE_SIMULATION.baseKoPerPrompt is 31, a different quantity',
  },
  'hero.exhibit-english-tokens': {
    id: 'hero.exhibit-english-tokens', traceId: 'HERO-029', status: 'decision-required',
    widget: 'NewsHeroSection', directorRef: 'D2', entityRef: 'CURATED_PAIRED_SENTENCES',
    note: 'no entry pairs 31 with 18; TOKEN_BASELINE_SIMULATION.baseEnPerPrompt is 24',
  },
  'hero.exhibit-ratio': {
    id: 'hero.exhibit-ratio', traceId: 'HERO-033', status: 'decision-required',
    widget: 'NewsHeroSection', directorRef: 'D2',
    note: 'internally consistent with 31/18, which is itself unsourced',
  },

  /* ---- Values that agree today but are copied, not read (D3) ---- */
  'hero.observed-gap': {
    id: 'hero.observed-gap', traceId: 'HERO-019', status: 'frozen',
    widget: 'NewsHeroSection', directorRef: 'D3', entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    note: 'ko.differencePercent is 78 — value agrees, ownership does not',
  },
  'lang.hangul-ratio-callout': {
    id: 'lang.hangul-ratio-callout', traceId: 'LANG-019', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection', directorRef: 'D3', entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    note: 'ko.relativeRatio is 1.78 — value agrees, ownership does not',
  },
  'lang.legend-hangul-ratio': {
    id: 'lang.legend-hangul-ratio', traceId: 'LANG-032', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection', directorRef: 'D3', entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    note: 'ko.relativeRatio is 1.78 — value agrees, ownership does not',
  },

  /* ---- Unsourced quantities in supporting copy (D4) ---- */
  'lang.legend-latin-baseline': {
    id: 'lang.legend-latin-baseline', traceId: 'LANG-031', status: 'decision-required',
    widget: 'MultilingualTokenEfficiencySection', directorRef: 'D4',
    note: 'no baseline row exists in MULTILINGUAL_COMPARISON_DATA',
  },
  'burden.preset-team-label': {
    id: 'burden.preset-team-label', traceId: 'BURD-017', status: 'decision-required',
    widget: 'OccupationSection', directorRef: 'D4',
    note: 'characterises a workload; no entity holds it',
  },
  'burden.preset-org-label': {
    id: 'burden.preset-org-label', traceId: 'BURD-018', status: 'decision-required',
    widget: 'OccupationSection', directorRef: 'D4',
    note: 'characterises a workload; no entity holds it. Also the slider max',
  },
  'method.principle-count': {
    id: 'method.principle-count', traceId: 'METH-008', status: 'decision-required',
    widget: 'MethodSection', directorRef: 'D4', entityRef: 'WHAT_WE_DO_NOT_CLAIM',
    note: 'equals WHAT_WE_DO_NOT_CLAIM.length (6) today, but is hardcoded rather than read, so the agreement is a coincidence',
  },

  /* ---- Values an entity holds, hardcoded anyway ---- */
  'lang.baseline-difference-label': {
    id: 'lang.baseline-difference-label', traceId: 'LANG-018', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection', entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    note: 'the 0% baseline label is derived in the widget rather than read',
  },
  'lang.normalization-base': {
    id: 'lang.normalization-base', traceId: 'LANG-025', status: 'frozen',
    widget: 'MultilingualTokenEfficiencySection', entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    note: 'the 100-token normalisation base is stated in copy, not read from the data',
  },
  'burden.preset-min-label': {
    id: 'burden.preset-min-label', traceId: 'BURD-016', status: 'frozen',
    widget: 'OccupationSection',
    note: 'slider minimum, stated in copy',
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
  'data-source': 'widget' as const,
});
