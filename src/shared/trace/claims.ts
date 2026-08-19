import type { ClaimStatus } from './types';

/**
 * Catalogue of every numeric claim the site renders.
 *
 * ---------------------------------------------------------------------------
 * WITHDRAWN FROM THE DOM — pending re-approval
 * ---------------------------------------------------------------------------
 * This catalogue is IDENTITY ONLY. It is not attached to any rendered node and
 * exposes no helper for attaching itself.
 *
 * An earlier revision spread `data-claim-*` onto the 22 nodes and then moved
 * their display strings in here. Both are reverted. The reason is not that the
 * idea was wrong — it is that the claim detector in
 * docs/audit/tools/extract-trace.mjs finds claims by reading literal text in
 * JSX, so moving the literals out of the widgets made all 22 claims vanish from
 * the ledger while every check still looked green. The control plane stopped
 * being able to see the thing it exists to watch.
 *
 * Re-attaching claim metadata to nodes, and moving display strings in here,
 * is a future design that requires reviewer re-approval AND a detector that
 * can follow the indirection. Neither exists yet. Do not add
 * `claimAttrs`-style helpers back without both.
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
  /* ---- S3 Token Premium — CLOSED by the D1 ruling, 2026-08-19 ----

     All nine rows below rendered figures that no artifact held. The section
     was rebuilt against entities/rq1-canonical, whose every value pins to an
     artifact path + SHA-256 prefix in the research repo at 925697c. Rows are
     kept, not deleted: the register exists to record that a figure was once
     published, and a deleted row cannot do that.                          */
  'premium.corpus-size-ko': {
    id: 'premium.corpus-size-ko', traceId: 'PREM-002', status: 'resolved',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'COHORT_N',
    note: 'was 69,432 with no entity behind it; now 3,835,988 from NB08_RQ1_RESULTS_v001, worded 문장쌍',
  },
  'premium.corpus-size-en': {
    id: 'premium.corpus-size-en', traceId: 'PREM-003', status: 'resolved',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'COHORT_N',
    note: 'was 69,432 with no entity behind it; now 3,835,988 from NB08_RQ1_RESULTS_v001',
  },
  'premium.headline-range': {
    id: 'premium.headline-range', traceId: 'PREM-011', status: 'resolved',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'MEDIAN_TP',
    note: 'was the range 1.29x ~ 1.83x; replaced by the single canonical median 1.33x = exp(median(log TP))',
  },
  'premium.average-ratio': {
    id: 'premium.average-ratio', traceId: 'PREM-017', status: 'retired',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'rendered 1.68x (+68%); canonical mean log TP is 0.28518, ratio scale 1.33. Node removed, no replacement',
  },
  'premium.baseline-standard': {
    id: 'premium.baseline-standard', traceId: 'PREM-020', status: 'retired',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'English 1.00x baseline row; the ratio is already defined against English, so the row restated its own denominator. Node removed',
  },
  'premium.domain-range': {
    id: 'premium.domain-range', traceId: 'PREM-023', status: 'retired',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'named domains Business/Daily that the research cohort does not contain; per-domain medians are BLOCKED_NO_ARTIFACT at 925697c. Node removed',
  },
  'premium.benchmark-domain-count': {
    id: 'premium.benchmark-domain-count', traceId: 'PREM-032', status: 'resolved',
    widget: 'TokenPremiumSection', directorRef: 'D1', entityRef: 'DOMAIN_COMPOSITION',
    note: 'was a hardcoded 7 against a 6-entry array; the exhibit now renders the 4 cohort domains from the entity itself',
  },
  'premium.baseline-english': {
    id: 'premium.baseline-english', traceId: 'PREM-038', status: 'retired',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'second English 1.00x baseline row under the chart. Node removed',
  },
  'premium.max-observed': {
    id: 'premium.max-observed', traceId: 'PREM-039', status: 'retired',
    widget: 'TokenPremiumSection', directorRef: 'D1',
    note: 'rendered Max Observed 1.83x; canonical max is exp(3.6376) = 38.0, an outlier that misleads as a headline. Node removed',
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
    id: 'method.principle-count', traceId: 'METH-008', status: 'resolved',
    widget: 'MethodSection', entityRef: 'WHAT_WE_DO_NOT_CLAIM',
    note: 'was a hardcoded 6 that matched the array length by coincidence; now read from WHAT_WE_DO_NOT_CLAIM.length, which is 9 after the artifact-derived boundaries were added',
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

/** Status for a claim key. */
export const claimStatus = (id: ClaimId): ClaimStatus => VISIBLE_CLAIMS[id].status;

/** Trace-ledger row for a claim key. */
export const claimTrace = (id: ClaimId): string => VISIBLE_CLAIMS[id].traceId;

