/**
 * PROTECTED research-adjacent content.
 *
 * Source: previously hardcoded directly inside
 * src/components/OccupationSection.tsx (lines 25-27, pre-Phase-3):
 *
 *   const baseEnPerPrompt = 24; // baseline tokens
 *   const baseKoPerPrompt = 31; // 1.29x~1.70x baseline
 *   const tokenGapPerPrompt = baseKoPerPrompt - baseEnPerPrompt; // 7 tokens gap
 *
 * These per-prompt token baselines drive the "Workflow Repetition
 * Simulator" (OccupationSection). They are ILLUSTRATIVE, not a measured
 * corpus statistic: 31/24 = 1.29x, close to but not equal to the canonical
 * median of 1.33x, and the gap the simulator compounds is a flat 7 tokens
 * per prompt.
 *
 * The two references this comment used to carry are gone as of the D1
 * ruling (2026-08-19): the 1.29x-1.83x range was replaced by the canonical
 * median, and DOMAIN_DISTRIBUTION_DATA was deleted. Whether the baseline
 * should be re-derived against entities/rq1-canonical is a separate
 * decision — it is a per-prompt simulation input, not a corpus statistic,
 * so it is left as-is rather than silently re-anchored.
 */
export const TOKEN_BASELINE_SIMULATION = {
  baseEnPerPrompt: 24,
  baseKoPerPrompt: 31,
} as const;
