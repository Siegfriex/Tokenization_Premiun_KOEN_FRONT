import { BilingualText } from '../../../types';

/**
 * How far a number has been adjudicated.
 *
 * `CANONICAL`
 *   Pinned to an artifact path + SHA-256 prefix in the research repository at
 *   `925697c`, and re-derived independently in
 *   KOEN-FRONT-CANON-LEDGER-v1.0 §2-§5. Cleared to render as a primary result.
 *
 * `EDA_REPORT`
 *   Published in the Team EDGE "KO-EN Tokenization Premium · 데이터 탐색·분석
 *   보고서" (2026-08-19). The underlying notebooks (NB08/NB09/NB11) are marked
 *   CLOSED/AUDITED there, but the ledger has not pinned these particular values
 *   to a file hash yet. Usable as supporting structure; NOT usable as a
 *   primary-result number, and must carry a visible qualifier naming the report.
 *
 * `PRE_G5_DESCRIPTIVE`
 *   Exists only in the pre-G5 diagnostics document, which self-declares as
 *   candidate evidence and disclaims G5 adjudication authority. Descriptive
 *   context only. Must carry a visible "pre-G5" qualifier wherever it renders.
 *
 * The tier is what stops a lower-tier figure from being read as canonical
 * inference. Do not widen a value's tier without a new artifact.
 */
export type CanonicalTier = 'CANONICAL' | 'EDA_REPORT' | 'PRE_G5_DESCRIPTIVE';

/**
 * One rendered quantity.
 *
 * `provenance` is REQUIRED, and deliberately so: a value cannot be added to
 * this entity without naming where it came from. That is the whole point of
 * the type — KOEN-FRONT-S3-CANON-IMPL-v1.0 §2.
 */
export type CanonicalScalar = {
  /** Machine value. Full precision as published; round at the render site. */
  value: number;
  /** Reader-facing string, already rounded per the typography contract. */
  display: BilingualText;
  /** Artifact id @ sha16, or the report id for non-canonical tiers. */
  provenance: string;
  tier: CanonicalTier;
};

/** A row of the token-ratio lattice (the mode table). */
export type LatticeMode = {
  /** Exact rational form, e.g. "4/3". */
  fraction: string;
  /** Ratio scale, e.g. 1.333333. */
  tp: number;
  /** log TP as published. */
  logTp: number;
  /** Pairs sitting exactly on this value. */
  rows: number;
  /** Share of the cohort, as a fraction of 1. */
  share: number;
};

/** One of the two AI-Hub source corpora the cohort is built from. */
export type SourceStratum = {
  id: string;
  label: BilingualText;
  n: number;
  /** Share of the cohort, as a fraction of 1. */
  share: number;
  medianTp: number;
  /** P(TP > 1) within this stratum. */
  shareTpGt1: number;
  /** P(TP = 1) within this stratum. */
  shareTie: number;
};

/** Domain composition. Counts only — no per-domain ratio exists at 925697c. */
export type DomainComposition = {
  id: string;
  label: BilingualText;
  /** Pairs contributed by AI-Hub 025. */
  from025: number;
  /** Pairs contributed by AI-Hub 026. */
  from026: number;
  total: number;
};

/** One stage of the exact decomposition TP = CR x BDR x CP. */
export type DecompositionComponent = {
  id: string;
  label: BilingualText;
  /** What the reader should understand this factor to be. */
  plain: BilingualText;
  medianLog: number;
  /** exp(medianLog). */
  medianRatio: number;
  /** Share of pairs where the log component is positive, as a fraction of 1. */
  sharePositive: number;
};
