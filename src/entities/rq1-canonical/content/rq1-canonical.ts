/**
 * The single source for every primary-result number S3 renders.
 *
 * Authority chain:
 *   research repo Siegfriex/Tokenization_Premiun_KOEN @ 925697c
 *   -> RESEARCH_CANONICAL_VALUES_LEDGER_v1.0 (KOEN-FRONT-CANON-LEDGER-v1.0)
 *   -> S3 Canonical Implementation Directive (KOEN-FRONT-S3-CANON-IMPL-v1.0)
 *   -> D1 ruling, 2026-08-19 (docs/audit/DIRECTOR_DECISIONS.md)
 *
 * Every field carries `provenance`. That is enforced by the type, not by
 * convention: `CanonicalScalar.provenance` is non-optional, so a value cannot
 * be added here without naming its artifact.
 *
 * WHAT IS DELIBERATELY ABSENT
 * ---------------------------------------------------------------------------
 * - Per-domain median TP. No artifact holds one at 925697c. The manuscript
 *   figures 1.29x / 1.35x / 1.41x and the 99.2% technical-document figure are
 *   unsourced. Rendering any domain-level ratio is BLOCKED_NO_ARTIFACT until a
 *   new notebook cell produces one. That is a research request, not a
 *   front-end task.
 * - sentence_type breakdowns. Zero variance, 0.000000 bits of entropy, one
 *   level out of a designed seven. Arithmetically impossible, permanently out.
 * - Absolute token-difference percentiles (+5 / +10 / +20 / +28). The desk
 *   manuscript states them; neither the ledger nor the EDA report holds them.
 *   BLOCKED_NO_ARTIFACT.
 * - "200만" as a bootstrap count. The canonical field is B = 2000.
 */
import type {
  CanonicalScalar,
  DecompositionComponent,
  DomainComposition,
  LatticeMode,
  SourceStratum,
} from '../model/types';

/** Artifact ids, reused as the `provenance` string on every value below. */
export const PROVENANCE = {
  rq1: 'NB08_RQ1_RESULTS_v001 @ 768a3bccc7d5d081',
  lattice: 'NB08_RQ1_CI_DEGENERACY_NOTE @ 6ff51aaa167ad59e',
  closeout: 'NB08_RQ1_CANONICAL_CLOSEOUT @ 2bee295841ad95d3',
  identifiability: 'G5_IDENTIFIABILITY_v001 @ 1069b46ed032ed28',
  edaReport: 'KOEN EDA·분석 보고서 (Team EDGE, 2026-08-19)',
  preG5: 'KOEN_EDA_V2_PRE_G5 @ 236b979b5900fd4a [NON-CANONICAL]',
} as const;

/** The measurement conditions every figure below is conditional on. */
export const MEASUREMENT_FRAME = {
  tokenizer: 'o200k_base',
  track: { ko: 'Track A · 원문 텍스트 직접 측정', en: 'Track A · raw-text intrinsic' },
  provenance: PROVENANCE.rq1,
} as const;

// ---------------------------------------------------------------------------
// Tier 1 — canonical primary result
// ---------------------------------------------------------------------------

/**
 * Cohort size. The ONLY corpus size the deck may render, and it is counted in
 * 문장쌍 (pairs), never 건 or 문장 — 3,835,988 pairs are 7.67 million sentences,
 * and the desk review flags the subhead as the most-quoted line on the page.
 */
export const COHORT_N: CanonicalScalar = {
  value: 3835988,
  display: { ko: '3,835,988', en: '3,835,988' },
  provenance: PROVENANCE.rq1,
  tier: 'CANONICAL',
};

/**
 * The one primary metric. exp(median(log TP)).
 *
 * The RQ1 artifact states explicitly that this is a MEDIAN-SCALE quantity and
 * is not the aggregate token ratio. Never phrase it as "Korean uses 1.33 times
 * the tokens overall" — it is the midpoint of the pair-level distribution.
 */
export const MEDIAN_TP: CanonicalScalar = {
  value: 1.3333333333333333,
  display: { ko: '1.33배', en: '1.33x' },
  provenance: PROVENANCE.rq1,
  tier: 'CANONICAL',
};

/** median(log TP) = ln(4/3) exactly. */
export const MEDIAN_LOG_TP: CanonicalScalar = {
  value: 0.28768207245178085,
  display: { ko: '0.2877', en: '0.2877' },
  provenance: PROVENANCE.rq1,
  tier: 'CANONICAL',
};

/** Share of pairs where Korean used more tokens. */
export const SHARE_KO_MORE: CanonicalScalar = {
  value: 0.8798502497922308,
  display: { ko: '87.99%', en: '87.99%' },
  provenance: PROVENANCE.rq1,
  tier: 'CANONICAL',
};

/** Direction split. The three counts sum to COHORT_N exactly. */
export const DIRECTION_SPLIT = {
  koMore: {
    value: 3375095,
    display: { ko: '3,375,095', en: '3,375,095' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  } satisfies CanonicalScalar,
  koFewer: {
    value: 264175,
    display: { ko: '264,175', en: '264,175' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  } satisfies CanonicalScalar,
  tie: {
    value: 196718,
    display: { ko: '196,718', en: '196,718' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  } satisfies CanonicalScalar,
} as const;

/** Percentiles of TP on the ratio scale. p95 is NOT here — see PRE_G5_P95. */
export const TP_PERCENTILES: Array<CanonicalScalar & { id: string; label: BilingualLabel }> = [
  {
    id: 'p01',
    label: { ko: '1백분위', en: '1st pct' },
    value: 0.75,
    display: { ko: '0.75배', en: '0.75x' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  },
  {
    id: 'p25',
    label: { ko: '25백분위', en: '25th pct' },
    value: 1.1666666666666667,
    display: { ko: '1.17배', en: '1.17x' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  },
  {
    id: 'p50',
    label: { ko: '중앙값', en: 'Median' },
    value: 1.3333333333333333,
    display: { ko: '1.33배', en: '1.33x' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  },
  {
    id: 'p75',
    label: { ko: '75백분위', en: '75th pct' },
    value: 1.5333333333333334,
    display: { ko: '1.53배', en: '1.53x' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  },
  {
    id: 'p99',
    label: { ko: '99백분위', en: '99th pct' },
    value: 2.25,
    display: { ko: '2.25배', en: '2.25x' },
    provenance: PROVENANCE.rq1,
    tier: 'CANONICAL',
  },
];

type BilingualLabel = { ko: string; en: string };

/**
 * The 95th percentile the desk manuscript leans on.
 *
 * Absent from canonical RQ1 `descriptive`, which holds p01/p25/p75/p99 and no
 * p95. It derives from the pre-G5 document's +0.6360, which exponentiates to
 * 1.8889. It may render ONLY with a visible pre-G5 qualifier, never inside the
 * canonical percentile ladder above.
 */
export const PRE_G5_P95: CanonicalScalar = {
  value: 1.888910042185583,
  display: { ko: '1.89배', en: '1.89x' },
  provenance: PROVENANCE.preG5,
  tier: 'PRE_G5_DESCRIPTIVE',
};

/** Largest observed ratio, exp(3.6376). Descriptive tail, not a headline. */
export const MAX_OBSERVED_TP: CanonicalScalar = {
  value: 38.000526,
  display: { ko: '38.0배', en: '38.0x' },
  provenance: PROVENANCE.rq1,
  tier: 'CANONICAL',
};

// ---------------------------------------------------------------------------
// Tier 1 — the zero-width interval
// ---------------------------------------------------------------------------

/**
 * The 95% bootstrap CI for median log TP, which collapses to a single point.
 *
 * MANDATORY DISCLOSURE. The degeneracy note prohibits reporting this interval
 * without its explanation: the interval is a point NOT because precision is
 * high, but because the outcome lies on a lattice of small-integer ratios.
 * `LATTICE_FACTS` below carries that explanation and must render with it.
 */
export const BOOTSTRAP_CI = {
  lower: 0.28768207245178085,
  upper: 0.28768207245178085,
  widthIsZero: true,
  /** Replicates. The canonical field is 2000; "200만" has no artifact. */
  replicates: 2000,
  seed: 969634713,
  /** The source-stratified sensitivity reused B = 2000 with a different seed. */
  stratifiedSeed: 2856958648,
  provenance: PROVENANCE.rq1,
  tier: 'CANONICAL' as const,
};

/**
 * Three independent procedures agree, not two.
 *
 * The closeout records that the percentile bootstrap, an exact order-statistic
 * interval, and a source-stratified bootstrap all collapse to the same point.
 * The manuscripts claim two; the record is stronger than they say.
 */
export const CONFIRMING_PROCEDURES: Array<{ id: string; label: BilingualLabel }> = [
  { id: 'percentile-bootstrap', label: { ko: '백분위 부트스트랩', en: 'Percentile bootstrap' } },
  { id: 'order-statistic', label: { ko: '정확 순서통계량 구간', en: 'Exact order-statistic interval' } },
  { id: 'source-stratified', label: { ko: '출처 층화 부트스트랩', en: 'Source-stratified bootstrap' } },
];

// ---------------------------------------------------------------------------
// Tier 1 — the lattice
// ---------------------------------------------------------------------------

/**
 * Why the interval has no width: the ratio of two integers can only land on a
 * lattice of small fractions, and the cohort piles up on a handful of them.
 */
export const LATTICE_FACTS = {
  /** Distinct log TP values across all 3,835,988 pairs. */
  distinctValues: 3725,
  /** Pairs sitting exactly on the median, 4/3. */
  medianMassRows: 123040,
  medianMassShare: 0.032075,
  /** Pairs held by the eight most common values. */
  top8Rows: 813707,
  top8Share: 0.212124,
  /** Order statistics on each side of the median. */
  rowsBelowMedian: 1841884,
  rowsAboveMedian: 1871064,
  provenance: PROVENANCE.lattice,
  tier: 'CANONICAL' as const,
};

/**
 * The eight most common token ratios.
 *
 * The honest headline is that these hold 813,707 pairs — about one in five.
 * The manuscript's "3.83 million pairs get sucked into a few cells" is false
 * and must not ship.
 */
export const LATTICE_MODES: LatticeMode[] = [
  { fraction: '1/1', tp: 1.0, logTp: 0.0, rows: 196718, share: 0.05128 },
  { fraction: '3/2', tp: 1.5, logTp: 0.4054651081, rows: 147699, share: 0.0385 },
  { fraction: '4/3', tp: 1.333333, logTp: 0.2876820725, rows: 123040, share: 0.03208 },
  { fraction: '5/4', tp: 1.25, logTp: 0.2231435513, rows: 91499, share: 0.02385 },
  { fraction: '7/5', tp: 1.4, logTp: 0.3364722366, rows: 68013, share: 0.01773 },
  { fraction: '6/5', tp: 1.2, logTp: 0.1823215568, rows: 67478, share: 0.01759 },
  { fraction: '5/3', tp: 1.666667, logTp: 0.5108256238, rows: 63954, share: 0.01667 },
  { fraction: '2/1', tp: 2.0, logTp: 0.6931471806, rows: 55306, share: 0.01442 },
];

// ---------------------------------------------------------------------------
// Tier 1 — source strata
// ---------------------------------------------------------------------------

/**
 * The two AI-Hub corpora the cohort is built from, with real labels — not
 * "A" and "B".
 *
 * The pooled median matches NEITHER stratum, which is the honest heterogeneity
 * observation. It must be balanced with what the closeout also records: the
 * source-stratified interval is identical to the primary interval, and the
 * conclusion does not reverse.
 */
export const SOURCE_STRATA: SourceStratum[] = [
  {
    id: 'aihub-025',
    label: { ko: 'AI허브 025', en: 'AI-Hub 025' },
    n: 2485963,
    share: 0.648063,
    medianTp: 1.315789,
    shareTpGt1: 0.8336,
    shareTie: 0.0734,
  },
  {
    id: 'aihub-026',
    label: { ko: 'AI허브 026', en: 'AI-Hub 026' },
    n: 1350025,
    share: 0.351937,
    medianTp: 1.361702,
    shareTpGt1: 0.965,
    shareTie: 0.0106,
  },
];

export const SOURCE_STRATA_PROVENANCE = PROVENANCE.closeout;

// ---------------------------------------------------------------------------
// Tier 2 — domain composition, counts only
// ---------------------------------------------------------------------------

/**
 * Domain composition by source. COUNTS ONLY.
 *
 * dialogue and general exist only in 025; technology only in 026; `other` is
 * the sole shared domain. A domain effect therefore cannot be separated from a
 * source effect, and the artifact's verdict is COMPOSITE_CELL_CONTROL_ONLY.
 *
 * The confounding warning belongs in the main article flow (1DEPTH), not
 * behind a disclosure — that is the desk review's explicit finding.
 */
export const DOMAIN_COMPOSITION: DomainComposition[] = [
  {
    id: 'other',
    label: { ko: '기타', en: 'Other' },
    from025: 1165510,
    from026: 990120,
    total: 2155630,
  },
  {
    id: 'general',
    label: { ko: '일반', en: 'General' },
    from025: 804291,
    from026: 0,
    total: 804291,
  },
  {
    id: 'dialogue',
    label: { ko: '대화', en: 'Dialogue' },
    from025: 516162,
    from026: 0,
    total: 516162,
  },
  {
    id: 'technology',
    label: { ko: '기술', en: 'Technology' },
    from025: 0,
    from026: 359905,
    total: 359905,
  },
];

export const IDENTIFIABILITY = {
  verdict: 'COMPOSITE_CELL_CONTROL_ONLY',
  sourceDomainSeparable: false,
  sharedDomains: ['other'],
  sourceLevels: 2,
  domainLevels: 4,
  /** technology is additionally fixed on direction: 359,905 KO->EN, zero EN->KO. */
  technologyDirectionLocked: true,
  /** Zero variance, 0.000000 bits, one level out of a designed seven. */
  sentenceTypeUsable: false,
  provenance: PROVENANCE.identifiability,
  tier: 'CANONICAL' as const,
};

/** Per-domain ratios do not exist. Named so the absence is greppable. */
export const DOMAIN_MEDIANS = 'BLOCKED_NO_ARTIFACT' as const;

// ---------------------------------------------------------------------------
// Tier 3 — exact decomposition (pre-G5 descriptive)
// ---------------------------------------------------------------------------

/**
 * TP = CodePointRatio x ByteDensityRatio x CompressionPenalty, exactly.
 *
 * This is an accounting identity, not an explanatory model: multiply the three
 * per-pair factors and you recover that pair's TP exactly. But the medians
 * below are each a separate median, so they must NOT be multiplied together —
 * the median is not linear under multiplication.
 *
 * Component percentiles live only in the pre-G5 document, hence the tier. The
 * log TP percentiles in that same table agree exactly with the canonical JSON,
 * which is a useful cross-check on the document even at its lower tier.
 */
export const DECOMPOSITION: DecompositionComponent[] = [
  {
    id: 'codepoint-ratio',
    label: { ko: '글자 수 비율', en: 'Code point ratio' },
    plain: {
      ko: '같은 뜻을 적는 데 쓴 글자 수. 한국어가 영어의 절반 이하다.',
      en: 'Characters used to write the same meaning. Korean uses under half of English.',
    },
    medianLog: -0.7605,
    medianRatio: 0.467433,
    sharePositive: 0.00193,
  },
  {
    id: 'byte-density-ratio',
    label: { ko: '글자당 저장 용량 비율', en: 'Byte density ratio' },
    plain: {
      ko: '글자 하나를 저장하는 데 드는 용량. 한글 한 글자가 영문자보다 무겁다.',
      en: 'Storage each character takes. One Hangul character weighs more than one Latin letter.',
    },
    medianLog: 0.8961,
    medianRatio: 2.450029,
    sharePositive: 0.99965,
  },
  {
    id: 'compression-penalty',
    label: { ko: '같은 용량당 분절 비율', en: 'Compression penalty' },
    plain: {
      ko: '용량이 같아도 토크나이저가 한국어를 더 잘게 나누는 정도.',
      en: 'How much more the tokenizer splits Korean even at equal storage size.',
    },
    medianLog: 0.1752,
    medianRatio: 1.191484,
    sharePositive: 0.80536,
  },
];

export const DECOMPOSITION_PROVENANCE = PROVENANCE.preG5;

/**
 * The pair-level offset of the first two factors, as one number.
 *
 * Reading it this way is what lets the article say "measured in storage size,
 * Korean flips to 1.13x" without multiplying two separate medians.
 */
export const REPRESENTATION_OFFSET: CanonicalScalar = {
  value: 1.126708,
  display: { ko: '1.13배', en: '1.13x' },
  provenance: PROVENANCE.preG5,
  tier: 'PRE_G5_DESCRIPTIVE',
};

// ---------------------------------------------------------------------------
// Tier 2 — the representation reversal (EDA report)
// ---------------------------------------------------------------------------

/**
 * The single most counter-intuitive fact in the study: Korean is SHORTER in
 * characters almost always, and still ends up with more tokens.
 */
export const REVERSAL_FACTS = [
  {
    id: 'ko-shorter',
    n: 3823296,
    share: 0.996691,
    label: {
      ko: '한국어 글자 수가 영어보다 적은 문장쌍',
      en: 'Pairs where Korean has fewer characters',
    },
  },
  {
    id: 'ko-shorter-heavier',
    n: 2725550,
    share: 0.710521,
    label: {
      ko: '글자는 적은데 저장 용량은 더 큰 문장쌍',
      en: 'Fewer characters, yet more bytes',
    },
  },
  {
    id: 'ko-shorter-more-tokens',
    n: 3363717,
    share: 0.876884,
    label: {
      ko: '글자는 적은데 토큰은 더 많은 문장쌍',
      en: 'Fewer characters, yet more tokens',
    },
  },
];

export const REVERSAL_PROVENANCE = PROVENANCE.edaReport;

/**
 * The staged reversal inside the tokenizer itself.
 *
 * Korean produces FEWER first-pass chunks than English, and still more final
 * tokens — because each Korean chunk splits into roughly twice as many
 * subwords. This directly refutes the intuition that Korean "starts out
 * shredded", which the article previously implied.
 */
export const CHUNK_REVERSAL = {
  ko: { medianChunks: 11, medianTokens: 21, tokensPerChunk: 2.0186 },
  en: { medianChunks: 15, medianTokens: 16, tokensPerChunk: 1.0365 },
  provenance: PROVENANCE.edaReport,
  tier: 'EDA_REPORT' as const,
};

/**
 * Byte burden and tokenizer compression are not the same force.
 * Spearman rho between log BDR and log CP is about -0.05.
 */
export const BDR_CP_SPEARMAN = {
  rho: -0.0507,
  provenance: PROVENANCE.edaReport,
  tier: 'EDA_REPORT' as const,
};

// ---------------------------------------------------------------------------
// Claim boundary, carried verbatim from the artifact
// ---------------------------------------------------------------------------

/**
 * The one statement the RQ1 artifact permits. The site tracks it rather than
 * paraphrasing it freely.
 */
export const PERMITTED_CLAIM = {
  ko: '고정된 o200k_base 원문 텍스트 측정(Track A)과 정의된 한·영 문장쌍 코호트에서, 문장쌍 단위 로그 토큰 프리미엄의 중앙값이 0보다 크다는 통계적 증거가 관측되었다.',
  en: 'Under the fixed o200k_base raw-text Track A measurement and the defined final paired KO-EN cohort, statistical evidence was observed that the pair-level median log token premium is greater than zero.',
  provenance: PROVENANCE.rq1,
};
