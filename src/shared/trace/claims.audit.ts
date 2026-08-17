import type { ClaimId } from './claims';

/**
 * Audit metadata for the visible claims — deliberately separate from
 * `claims.ts`.
 *
 * These are observations recorded during the frontend audit: what the markup
 * renders versus what the repository holds. They are internal working notes,
 * not published copy, so they must not ship in the production bundle. Nothing
 * at runtime imports this file; only tooling and tests do.
 *
 * Never add an explanation here. A note records what was observed, not why.
 */
export interface ClaimAudit {
  readonly note: string;
  readonly entityRef?: string;
  readonly directorRef?: string;
}

export const CLAIM_AUDIT: Record<ClaimId, ClaimAudit> = {
  'premium.corpus-size-ko': {
    note: 'no entity holds a corpus size',
    directorRef: 'D1',
  },
  'premium.corpus-size-en': {
    note: 'no entity holds a corpus size',
    directorRef: 'D1',
  },
  'premium.headline-range': {
    note: 'markup renders 1.29x ~ 1.83x; entity ratio range is 1.13 - 1.75',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'premium.average-ratio': {
    note: 'markup renders 1.68x (+68%); mean of the 6 entity ratios is 1.513, and no entity holds 1.68',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'premium.baseline-standard': {
    note: 'markup renders an English baseline row; no baseline row exists in the array',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'premium.domain-range': {
    note: 'markup names a "Business" domain that does not exist, and gives "Daily" as 1.83x where the entity holds 1.38',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'premium.benchmark-domain-count': {
    note: 'markup renders 7 Benchmark Domains; the array has 6 entries, countable on screen',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'premium.baseline-english': {
    note: 'markup renders an English baseline row; no baseline row exists in the array',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'premium.max-observed': {
    note: 'markup renders Max Observed 1.83x directly under the chart; highest entity ratio is 1.75',
    entityRef: 'DOMAIN_DISTRIBUTION_DATA',
    directorRef: 'D1',
  },
  'hero.exhibit-hangul-tokens': {
    note: 'no paired-sentence entry has hangulCount 31; TOKEN_BASELINE_SIMULATION.baseKoPerPrompt is 31, a different quantity',
    entityRef: 'CURATED_PAIRED_SENTENCES',
    directorRef: 'D2',
  },
  'hero.exhibit-english-tokens': {
    note: 'no entry pairs 31 with 18; TOKEN_BASELINE_SIMULATION.baseEnPerPrompt is 24',
    entityRef: 'CURATED_PAIRED_SENTENCES',
    directorRef: 'D2',
  },
  'hero.exhibit-ratio': {
    note: 'internally consistent with 31/18, which is itself unsourced',
    directorRef: 'D2',
  },
  'hero.observed-gap': {
    note: 'ko.differencePercent is 78 — value agrees, ownership does not',
    entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    directorRef: 'D3',
  },
  'lang.hangul-ratio-callout': {
    note: 'ko.relativeRatio is 1.78 — value agrees, ownership does not',
    entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    directorRef: 'D3',
  },
  'lang.legend-hangul-ratio': {
    note: 'ko.relativeRatio is 1.78 — value agrees, ownership does not',
    entityRef: 'MULTILINGUAL_COMPARISON_DATA',
    directorRef: 'D3',
  },
  'lang.legend-latin-baseline': {
    note: 'no baseline row exists in MULTILINGUAL_COMPARISON_DATA',
    directorRef: 'D4',
  },
  'burden.preset-team-label': {
    note: 'characterises a workload; no entity holds it',
    directorRef: 'D4',
  },
  'burden.preset-org-label': {
    note: 'characterises a workload; no entity holds it. Also the slider max',
    directorRef: 'D4',
  },
  'method.principle-count': {
    note: 'equals WHAT_WE_DO_NOT_CLAIM.length (6) today, but is hardcoded rather than read, so the agreement is a coincidence',
    entityRef: 'WHAT_WE_DO_NOT_CLAIM',
    directorRef: 'D4',
  },
  'lang.baseline-difference-label': {
    note: 'the 0% baseline label is derived in the widget rather than read',
    entityRef: 'MULTILINGUAL_COMPARISON_DATA',
  },
  'lang.normalization-base': {
    note: 'the 100-token normalisation base is stated in copy, not read from the data',
    entityRef: 'MULTILINGUAL_COMPARISON_DATA',
  },
  'burden.preset-min-label': {
    note: 'slider minimum, stated in copy',
  },
};
