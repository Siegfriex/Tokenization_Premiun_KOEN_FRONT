# Design Audit

> **SUPERSEDED — historical record only.**
>
> This document answered "which design values are applied where" for one phase, at one moment. It is no
> longer maintained and its 638-hex count refers to a palette that no longer exists — there are now zero raw hex classes in rendered code.
>
> **The live answer is [`docs/audit/`](audit/README.md)** — a generated trace
> ledger that registers every content-bearing and structure-bearing node with a
> stable Trace ID, and regenerates from source on demand. Start at
> [`docs/audit/README.md`](audit/README.md).
>
> Kept because the phase PRs reference it and because the reasoning behind
> decisions already taken lives here. Do not use it to decide anything new, and
> do not update it — update the ledger instead.

Quantified findings ahead of `refactor/foundation-tokens-layout`.

## Arbitrary hex color classes (Tailwind `[#RRGGBB]` arbitrary values)

**638 total occurrences** across `src/components/*.tsx` and `src/App.tsx`.

| File | Count |
|---|---:|
| `OccupationSection.tsx` | 100 |
| `TokenCompareSection.tsx` | 68 |
| `ImpactSection.tsx` | 64 |
| `TokenPremiumSection.tsx` | 62 |
| `NewsHeroSection.tsx` | 59 |
| `MultilingualTokenEfficiencySection.tsx` | 57 |
| `KoreaAIContextSection.tsx` | 51 |
| `MethodSection.tsx` | 35 |
| `PipelineSection.tsx` | 32 |
| `StoryProgress.tsx` | 24 |
| `Footer.tsx` | 24 |
| `ArticleElements.tsx` | 22 |
| `EditorialConclusionSection.tsx` | 21 |
| `MultilingualSection.tsx` (dead file) | 5 |

### Unique hex values in use (candidates for semantic tokens)

| Hex | Occurrences | Apparent role |
|---|---:|---|
| `#111111` | 201 | primary ink / near-black text, borders, active bg |
| `#DADAD6` | 132 | default rule/border, muted divider |
| `#777773` | 113 | muted/secondary text |
| `#FFFFFF` | 65 | surface / inverse text |
| `#4A4A47` | 46 | body copy gray |
| `#8A8A85` | 36 | subtle/tertiary text |
| `#F7F7F5` | 26 | alternate section surface (off-white) |
| `#F1F2F2` | 9 | alternate section surface (light gray) |
| `#161616` | 6 | chart "active" fill / near-black variant |
| `#F7F8FA` | 5 | `body` background override (from a later reskin pass, see below) |
| `#0B1F3A` | 5 | only in the dead file `MultilingualSection.tsx` (a different, older visual style — `rounded-2xl`, `shadow-md`, `amber`/`slate` accents — inconsistent with the rest of the codebase's flat editorial style); resolved automatically once the dead file is removed |
| `#E8E8E4` | 4 | progress-bar track background |
| `#333333` | 4 | article-paragraph text (`ArticleElements.tsx`) |
| `#353535` | 3 | dark-card inner border variant |
| `#111827` | 3 | reskin override text color |
| `#EFF6FF`, `#DCE7F7`, `#C2C2BD`, `#2563EB`, `#64748B`, `#475569` | 1-2 each | reskin overrides / chart "other language" gray |

~10-11 semantic roles cover effectively all real usage. This is the target
size for the semantic token set (see `DESIGN_SYSTEM_CONTRACT.md`).

## The `!important` recoloring hack (`src/index.css`)

11 `!important` declarations and 9 `[class*="..."]` attribute-selector
rules exist specifically to re-skin arbitrary Tailwind hex classes after
the fact, e.g.:

```css
[class*="bg-[#FFFFFF]"] { background-color: #F7F8FA !important; }
[class*="text-[#111111]"] { color: #111827 !important; }
[class*="bg-[#111111]"]  { background-color: #2563EB !important; }
```

This is direct evidence that the codebase has no real token layer: the
only way to change a color globally was to string-match the class name
Tailwind generated and force-override it. This pattern must be fully
retired (not layered on top of) once semantic tokens replace the raw hex
classes it targets — replacing tokens without removing this file section
would leave two competing color systems active simultaneously.

## Known CSS defect

`src/index.css:33` — malformed declaration
(`background: #DADAD6;#F7F8FA border-radius: 2px;`), confirmed to trigger
a Vite/lightningcss build warning (see `BASELINE.md`). Fix as part of the
token migration since the surrounding rule (`::-webkit-scrollbar-thumb`)
is being retokenized anyway.

## Container width inconsistency

| Location | Value |
|---|---|
| `StoryProgress.tsx:54` (sticky header) | `max-w-[1400px]` |
| 13 other section-level containers (all `ArticleFullWidthBreak` consumers + section wrappers) | `max-w-[1360px]` |
| `ArticleElements.tsx:12` `ArticleReadingColumn` | `max-w-[720px]` |
| `ArticleElements.tsx:140` `ArticleBigFinding` paragraph | `max-w-[640px]` |
| `NewsHeroSection.tsx:79` lead paragraph | `max-w-[620px]` |

The header/body mismatch (1400px vs. 1360px) is the direct cause of the
left/right alignment drift between the sticky header and section content
observed during manual review. **Decision needed:** standardize on one
wide-container value (1360px is used in 13/14 places and is the natural
default) and one reading-column value (currently three near-identical
values — 720/640/620 — with no documented reason for the difference).

## Section vertical rhythm (padding) — no shared scale

| Pattern | Occurrences |
|---|---:|
| `py-20 sm:py-28` | 8 (the de facto standard section padding) |
| `py-16 sm:py-...` | 2 |
| `py-24 sm:py-...` | 1 (hero) |
| `py-12 sm:py-...` | 1 |
| `py-10 sm:py-...` | 1 |
| `py-6 sm:py-...` | 1 |

## Card/box internal padding — no shared scale

`p-3`, `p-3.5`, `p-4`, `p-5`, `p-6`, `p-8`, `p-10`, plus `p-1`, `p-0.5`,
`p-2.5` all appear across widgets with no documented relationship (16, 11,
10, 10, 8, 2, 2, 1, 1, 1 occurrences respectively). A 4-6 step spacing
scale (e.g. `xs/sm/md/lg/xl` mapped to fixed rem values) should replace
this ad hoc set.

## Raw (non-Tailwind) color literals passed to JS props

`MultilingualTokenEfficiencySection.tsx` passes raw hex strings directly
into Recharts props, which cannot consume Tailwind classes:

- `stroke="#DADAD6"` (lines 211, 218)
- `stroke="#777773"` (line 251)
- `fill={entry.isTargetHangul ? '#161616' : entry.isBaseline ? '#777773' : '#C2C2BD'}` (lines 270-274)

**Implication for the token contract:** semantic tokens defined only as
Tailwind/CSS classes will not reach this chart. The design-token contract
must also export a plain JS/TS constants object (or resolve CSS custom
properties at runtime) so chart color mapping stays in sync with the rest
of the palette instead of drifting as a fourth, chart-only color source.

## Inline `style={{ }}` usage (bypasses Tailwind/tokens entirely)

8 occurrences across `TokenPremiumSection.tsx`, `MultilingualSection.tsx`
(dead file), `StoryProgress.tsx`. Legitimate cases (dynamic width/percent
for progress bars and proportional bars) — these are computed values, not
static design decisions, and are expected to remain inline `style` even
after tokenization; flagged here only so they are not mistaken for
migratable static values during the Phase 2 sweep.

## Typography — already reasonably centralized

`ArticleElements.tsx` (`ArticleLead`, `ArticleParagraph`, `ArticleSubheading`,
`ArticlePullQuote`, `ArticleFinding`, `ArticleBigFinding`,
`ArticleFigureCaption`, `ArticleSource`, `ArticleFootnotes`,
`ArticleFullWidthBreak`, `ArticleReadingColumn`) is the one part of this
codebase that already behaves like a design-system layer. It should be
**preserved and extended**, not replaced — its remaining defect is that it
hardcodes the same raw hex values as everything else (22 occurrences),
so it does not yet consume semantic tokens.

## Proposed semantic token roles (for `DESIGN_SYSTEM_CONTRACT.md`)

```text
--color-canvas        (page background)
--color-surface        (card/box background, default)
--color-surface-alt    (alternating section background)
--color-surface-inverse (dark card / active-state background, e.g. #111111)
--color-ink            (primary text)
--color-ink-muted      (secondary text)
--color-ink-subtle     (tertiary/caption text)
--color-ink-inverse     (text on inverse surface)
--color-rule           (default border/divider)
--color-rule-strong    (emphasis border, e.g. active card outline)
--color-emphasis       (underline/accent decoration color)

--container-wide: 1360px
--container-reading: <one value, TBD 620–720px>

--space-{xs,sm,md,lg,xl}  (replacing the p-3/3.5/4/5/6/8/10 spread)
--section-padding-{default,compact,hero}  (replacing py-20/16/24/12/10/6 spread)
```
