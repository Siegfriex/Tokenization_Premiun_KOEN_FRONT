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
 * Simulator" (OccupationSection). They are illustrative figures
 * consistent with the 1.29x-1.83x Token Premium range reported in
 * TokenPremiumSection / DOMAIN_DISTRIBUTION_DATA, not a separately
 * measured corpus statistic. Values are unchanged from the legacy
 * source — this is a structural move (widget literal -> typed entity
 * module), not a claim rewrite. See docs/CONTENT_AUDIT.md.
 */
export const TOKEN_BASELINE_SIMULATION = {
  baseEnPerPrompt: 24,
  baseKoPerPrompt: 31,
} as const;
