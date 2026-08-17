# Content Audit

> **SUPERSEDED — historical record only.**
>
> This document answered "which content is hardcoded and where" for one phase, at one moment. It is no
> longer maintained and its counts predate three migrations and the P0/P1/P2 priorities have been superseded by the batch plan.
>
> **The live answer is [`docs/audit/`](audit/README.md)** — a generated trace
> ledger that registers every content-bearing and structure-bearing node with a
> stable Trace ID, and regenerates from source on demand. Start at
> [`docs/audit/README.md`](audit/README.md).
>
> Kept because the phase PRs reference it and because the reasoning behind
> decisions already taken lives here. Do not use it to decide anything new, and
> do not update it — update the ledger instead.

Goal: locate every user-visible hard-coded text/content source, classify it,
and assign a migration priority ahead of `refactor/content-contract-i18n`.

## Aggregate counts

- `isKo ? ... : ...` JSX conditionals: **122** occurrences across 13 files
  (see per-file breakdown below). Each is a place where bilingual branching
  is re-implemented locally instead of going through a shared accessor.
- Component-local content arrays/objects (data that should live in
  `entities/` but currently lives inside a widget file): **7 confirmed
  instances** (P0 list below).
- Confirmed dead/unused content field: **1** (`hero.headline` in
  `articleContent.ts`).
- Numeric research-adjacent values hardcoded directly in a widget
  (not sourced from `data/`): **1 file** (`OccupationSection.tsx`) —
  flagged `PROTECTED`, see below.

### `isKo ?` occurrences by file

| File | Count |
|---|---:|
| `OccupationSection.tsx` | 15 |
| `MultilingualSection.tsx` (dead) | 14 |
| `MultilingualTokenEfficiencySection.tsx` | 14 |
| `ImpactSection.tsx` | 11 |
| `NewsHeroSection.tsx` | 12 |
| `KoreaAIContextSection.tsx` | 10 |
| `PipelineSection.tsx` | 10 |
| `MethodSection.tsx` | 9 |
| `TokenCompareSection.tsx` | 9 |
| `TokenPremiumSection.tsx` | 8 |
| `EditorialConclusionSection.tsx` | 5 |
| `StoryProgress.tsx` | 4 |
| `Footer.tsx` | 1 |

## P0 — component-local content that must move to `entities/`

| # | File : lines | Content | Sensitivity | Note |
|---|---|---|---|---|
| 1 | `NewsHeroSection.tsx:55-71` | Hero headline JSX (`같은 질문, 다른 청구서` / `Same Question, Different Bill`) | NORMAL | **Duplicate of unused `articleContent.ts` field `hero.headline` (lines 50-53).** Reconnect instead of re-authoring. |
| 2 | `StoryProgress.tsx:9-19` | `SECTIONS` nav array (id + KO/EN label per section) | NORMAL | Only data source for header nav and active-section highlighting; must move with its consumer logic intact. |
| 3 | `PipelineSection.tsx:18-64` | `PIPELINE_STEPS` array (5 steps, KO/EN title+desc, `highlight` flag) | NORMAL | Currently defined inside the widget file, outside `data/`. |
| 4 | `TokenPremiumSection.tsx:17-24` | `DOMAIN_DISTRIBUTION_DATA` array (6 domains, ratio/token counts/labels) | **PROTECTED (numeric)** | Ratios (1.38–1.75×) and token counts are research-derived figures; must be migrated verbatim, not retyped. |
| 5 | `KoreaAIContextSection.tsx:83-135` | "Macro Adoption Chain" 4 phase cards, KO copy hardcoded, no `articleContent` field backing it | NORMAL | No bilingual pair exists for the Korean paragraphs in these cards — English is only implied by phase names. Needs an EN string added during migration, not invented free-form. |
| 6 | `ImpactSection.tsx:74-152` | 3-level "scale-up" cards (PERSON/WORKFLOW/SOCIETY) | NORMAL | Bilingual, but content lives in JSX, not `data/`. |
| 7 | `ImpactSection.tsx:165-189` | Causal-chain chip list ("Language Structure → Tokenization → Token Premium → ...") | NORMAL | English-only labels, no KO variant; decide during migration whether this stays EN-only by design (it reads as a diagram, not prose) or needs localization. |

## PROTECTED — research-adjacent value hardcoded in presentation logic

`OccupationSection.tsx:25-31`:

```ts
const baseEnPerPrompt = 24; // baseline tokens
const baseKoPerPrompt = 31; // 1.29x~1.70x baseline
const tokenGapPerPrompt = baseKoPerPrompt - baseEnPerPrompt; // 7 tokens gap
```

These constants drive the "Workflow Repetition Simulator" (the slider that
multiplies token counts by prompt iterations). They are **not** sourced
from `data/storyData.ts` or `data/articleContent.ts` — they exist only as
inline numeric literals inside a widget. Per the research-copy protection
rule, this value must not be silently "cleaned up," rounded, or replaced
during refactor. It must be migrated as-is into a typed content/entity
module with clear provenance (comment or field noting it is illustrative
of the 1.29×–1.83× observed range, matching `TokenPremiumSection`'s
corpus figures), and the migration must be called out explicitly in the
Phase 3 PR description for research-content sign-off.

## Reconnect — dead content field

`articleContent.ts` — `hero.headline: { ko: '같은 질문,\n다른 청구서', en: 'Same Question,\nDifferent Bill' }`
(lines ~50-53) is defined but never read by any component. `NewsHeroSection.tsx`
independently hardcodes the same text with manual `<br/>` and `<span>`
styling. Migration must either (a) consume `hero.headline` directly with a
small JSX line-break helper, or (b) formally deprecate the field. Do not
leave both a used inline copy and an unused duplicate field after
migration.

## P1 — normal editorial copy already in `data/`

The majority of section lead/body/finding copy already lives in
`ARTICLE_CONTENT` (`data/articleContent.ts`, 623 lines, 13 section keys)
and is consumed correctly via `isKo ? articleData.x?.ko : articleData.x?.en`.
This is the **pattern to standardize on**, not replace — the problem is
its 122 manual repetitions of the same ternary, not the data location
itself (see `INTERACTION_AUDIT.md` for the proposed `t()` accessor that
collapses this pattern without moving already-correctly-placed content).

Structured content already correctly externalized in `data/storyData.ts`:
`CURATED_PAIRED_SENTENCES`, `OCCUPATION_COMPARISON_DATA`,
`MULTILINGUAL_COMPARISON_DATA`, `VERIFIED_POLICY_SLOTS`,
`METHODOLOGY_ITEMS`, `WHAT_WE_DO_NOT_CLAIM`.

## P2 — low-priority / defer

- Chart tooltip/legend microcopy inside `MultilingualTokenEfficiencySection.tsx`
  (e.g. `"기준 영문 100 토큰 대비 정규화 소모량"`) — small, chart-adjacent,
  low duplication risk. Migrate opportunistically, not as a blocking item.
- `Footer.tsx` three-column notes (lines 44-71) — bilingual-asymmetric
  (Korean-only in source, no English variant currently rendered since
  `isKo` is not even branched on for these three paragraphs — confirm
  during migration whether English footer copy is simply missing by
  design or an oversight).

## Protected research copy — do not alter meaning

The following are explicitly protected under `CONTENT_CONTRACT.md` and
must be migrated verbatim (relocated, never reworded) unless a future,
separately-approved research update changes them:

- `TokenPremiumSection.tsx` — `1.29× ~ 1.83×` range, `1.68× (+68%)` average,
  `69,432` verified pairs, domain ratio table.
- `data/articleContent.ts` `methodologyBoundaries` and
  `data/storyData.ts` `WHAT_WE_DO_NOT_CLAIM` / `METHODOLOGY_ITEMS` —
  the six "what we do not claim" boundary statements.
- `MultilingualTokenEfficiencySection.tsx` / `data/storyData.ts`
  `MULTILINGUAL_COMPARISON_DATA` — per-language relative ratios
  (Korean 1.78×, Arabic 2.05×, Hindi 2.30×, etc.), tokenizer id
  (`o200k_base`), corpus (`Flores-200`).
- `OccupationSection.tsx` hardcoded `24` / `31` token baseline (see
  PROTECTED item above).
- `Footer.tsx` source list (OpenAI Tiktoken, Flores-200, 한국노동연구원/
  고용정보원, 과학기술정보통신부).
