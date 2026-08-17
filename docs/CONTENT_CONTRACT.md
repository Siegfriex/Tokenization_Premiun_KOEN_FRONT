# Content Contract

## Single source of truth

All user-visible editorial copy must originate from typed content modules
under `src/entities/`. JSX in `src/widgets/` may compose, format, emphasize,
and lay out copy, but must not own article prose, section titles,
navigation labels, chart explanations, or bilingual editorial strings as
inline literals.

## Localized text shape

```ts
type LocalizedText = {
  ko: string;
  en: string;
};
```

Existing `BilingualText` in `types.ts` already matches this shape and
should be reused/renamed rather than duplicated.

## Rules

1. Do not introduce new `isKo ? "..." : "..."` literals in widget JSX.
   Use the `t()` accessor from `shared/i18n` against a typed content
   object instead.
2. Give repeatable content items stable, explicit `id` fields (already the
   convention in `storyData.ts`; extend it to newly-migrated arrays such
   as `PIPELINE_STEPS`, `DOMAIN_DISTRIBUTION_DATA`, `SECTIONS`).
3. Keep numeric values separate from explanatory prose where practical, so
   a numeric correction never risks an accidental prose edit and vice versa.
4. Preserve source labels, method notes, and uncertainty language exactly
   as written — these are part of the research communication, not
   incidental UI copy.
5. Research claims must preserve the approved research interpretation (see
   "Protected research content" below). A content-location refactor must
   never become a content-meaning edit.
6. A UI copy relocation must not silently change measured values, sample
   sizes, tokenizer names, formulas, or source citations. If a value's
   correctness is in doubt while migrating, flag it in the PR rather than
   "fixing" it silently.
7. When a component currently owns content with no bilingual pair (e.g.
   `KoreaAIContextSection`'s Korean-only phase-card copy, see
   `CONTENT_AUDIT.md`), migration must add the missing language variant
   using directly adjacent existing phrasing/terminology from
   `articleContent.ts`, not freely authored new copy — and must call this
   out explicitly in the PR for review, since it is new user-visible text.

## Protected research content

```text
TP = T_KO / T_EN
```

Where `T_KO` and `T_EN` are the fixed-tokenizer (`o200k_base`) token counts
for the Korean and English members of a semantically paired KO–EN item.

Do not add or imply unsupported claims such as:

- Korean is inherently inefficient for AI.
- UTF-8 byte count alone causes token count linearly.
- Morphology alone explains Tokenization Premium.
- Larger models necessarily reduce Tokenization Premium.
- Output-token differences prove reasoning-quality differences.

If copy reorganization requires wording changes, preserve exact research
meaning and record the move in a content migration map (a simple table in
the relevant PR description: old location → new location, unchanged /
reworded-for-clarity-only).

### Specific protected values (see `CONTENT_AUDIT.md` for full detail)

- `TP` range `1.29×–1.83×`, average `1.68× (+68%)`, `69,432` verified pairs
  (`TokenPremiumSection.tsx` / `DOMAIN_DISTRIBUTION_DATA`).
- Per-language relative ratios and tokenizer/corpus identifiers
  (`o200k_base`, `Flores-200`) in `MULTILINGUAL_COMPARISON_DATA`.
- The six "What We Do NOT Claim" boundary statements
  (`WHAT_WE_DO_NOT_CLAIM`) and methodology pillar text (`METHODOLOGY_ITEMS`).
- The `24` / `31` token baseline constants in `OccupationSection.tsx`
  (flagged PROTECTED in `CONTENT_AUDIT.md` — currently hardcoded outside
  `data/`, must be migrated with explicit provenance, not silently altered).
- `Footer.tsx` source attribution list.

## Scope note

This contract governs *where content lives and how it is accessed*. It
does not itself authorize any visual redesign, interaction change, or
dependency change — those are governed by `DESIGN_SYSTEM_CONTRACT.md` and
`REFACTOR_PLAN.md` respectively.
