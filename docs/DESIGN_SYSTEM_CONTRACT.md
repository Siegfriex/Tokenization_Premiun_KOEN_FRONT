# Design System Contract

## Design ownership

- Color, spacing, container width, typography, radius, and border values
  are governed by semantic tokens defined in one place (Tailwind v4
  `@theme` block, plus a parallel plain-JS/TS export for non-Tailwind
  consumers such as Recharts — see `DESIGN_AUDIT.md`).
- Shared UI components (`shared/ui`) consume semantic tokens only, never
  raw hex values or ad hoc pixel widths.
- Widgets must not introduce arbitrary hexadecimal colors or one-off
  layout widths without an approved token or documented variant.

## Semantic token set (baseline proposal — see `DESIGN_AUDIT.md` §"Proposed
semantic token roles" for the full rationale)

```text
Color:
  --color-canvas
  --color-surface
  --color-surface-alt
  --color-surface-inverse
  --color-ink
  --color-ink-muted
  --color-ink-subtle
  --color-ink-inverse
  --color-rule
  --color-rule-strong
  --color-emphasis

Layout:
  --container-wide: 1360px      (replaces 1400px / 1360px split)
  --container-reading: <TBD>    (replaces 720px / 640px / 620px split)

Spacing:
  --space-{xs,sm,md,lg,xl}
  --section-padding-{default,compact,hero}
```

This set is deliberately small (~11 color roles, 2 container widths, one
spacing scale) because the audit found the *actual* distinct visual
intents in use number about 10-11, not 638 — the token set should match
real design intent, not preserve incidental variation.

## Forbidden patterns (post-Phase-2)

- New `bg-[#...]`, `text-[#...]`, `border-[#...]` classes anywhere under
  `src/widgets/` or `src/shared/ui/`.
- Attribute-selector recoloring hacks (`[class*="..."]`) — the exact
  pattern found and retired in `src/index.css` during Phase 2.
- New `!important` overrides for ordinary component styling.
- New ad hoc `max-w-[Npx]` values in widget JSX — use `--container-wide` /
  `--container-reading` or an explicit, reviewed new token.
- Duplicating a selectable-card, button, or chip state pattern instead of
  using the shared primitive (see `INTERACTION_AUDIT.md` for the four
  existing duplicates being consolidated).
- Raw hex strings passed to chart libraries (Recharts `fill`/`stroke`)
  instead of the shared JS token export.

## Approved future primitives (`shared/ui`)

- `Container`, `Section`, `ReadingColumn`, `Stack`, `Cluster`, `Divider`
- `Button`
- `SelectableCard`
- `TokenChip`
- `StatCard`
- `SectionEyebrow` / `SectionHeading`
- Existing `ArticleElements.tsx` typography set (kept, retokenized in place)

No speculative `Modal`, generic `Card`, or component-framework abstraction
is approved — none of the current 12 widgets require an overlay/dialog
pattern; do not build one speculatively (see `REFACTOR_PLAN.md` Phase 5
non-goals).

## Exceptions

A deviation from a token or primitive must document in the PR:

1. Why an existing token or variant is insufficient.
2. Whether the value should become a new reusable semantic token (and if
   so, add it to the token set rather than leaving a one-off literal).
3. Which viewport and widget require it.

## Known defects to close under this contract

- `src/index.css:33` malformed `::-webkit-scrollbar-thumb` declaration
  (see `DESIGN_AUDIT.md`).
- Header container width (`1400px`) vs. body container width (`1360px`)
  mismatch (see `DESIGN_AUDIT.md`).
- `PipelineSection.tsx` step cards using non-interactive `<div onClick>`
  instead of `<button>` (accessibility defect, see `INTERACTION_AUDIT.md`;
  closed when that widget adopts the shared selectable primitive).
