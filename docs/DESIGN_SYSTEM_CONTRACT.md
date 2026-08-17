# Design System Contract

## Design ownership

- Color, spacing, container width, typography, radius, and border values
  are governed by semantic tokens defined in one place (`src/shared/config/
  tokens.css`, a Tailwind v4 `@theme` block), plus `src/shared/config/
  chart-tokens.ts` for consumers that need literal values rather than
  classes (Recharts `fill`/`stroke`).
- Shared UI components (`shared/ui`) consume semantic tokens only, never
  raw hex values or ad hoc pixel widths.
- Widgets must not introduce arbitrary hexadecimal colors or one-off
  layout widths without an approved token or documented variant.

## The palette is three layers, and they must not collapse into one

This is an editorial research document, not an application UI. The palette
is split by *role*, and a value's layer is what decides where it may be
used — not how it looks.

**1 — Reading layer.** The surfaces you read on and the prose you read.
Near-black ink on a light, low-chroma canvas. Long-form KO/EN prose stays
black/near-black so the research reads as a document.

```text
--color-canvas       #F7F8FA   page/app background
--color-surface      #F7F8FA   card & panel background
--color-surface-alt  #EFF6FF   alternating section background
--color-ink          #111827   headings, primary text
--color-ink-strong   #333333   article body copy (ArticleParagraph)
--color-ink-body     #475569   supporting copy, resting card text
--color-ink-muted    #64748B   eyebrows, labels, meta
--color-ink-subtle   #8A8A85   tertiary / figure-source text
```

**2 — Accent layer.** Cobalt. Reserved for *state and navigation*: the
selected card, the active nav entry, the emphasis underline in a section
heading, the scroll-progress fill. Never a reading surface, never body copy.

```text
--color-accent           #2563EB
--color-on-accent        #FFFFFF   text on an accent fill
--color-on-accent-muted  #DADAD6   secondary text on an accent fill
--color-rule-on-accent   #353535   hairline inside an accent fill
```

**3 — Data-mark layer.** Chart bars, proportional bars, legend swatches,
token chips. Near-black/gray *on purpose*: accent-colored bars would
compete with the selection state and make the research's own emphasis
illegible. Mirrored in `chart-tokens.ts` for Recharts.

```text
--color-mark           #161616   primary/highlighted mark (Hangul series)
--color-mark-track     #E8E8E4   empty track behind a proportional bar
--color-mark-baseline  #777773   English-baseline series
--color-mark-other     #C2C2BD   remaining comparison series
```

**Rules and layout.**

```text
--color-rule          #DCE7F7   default divider/border
--color-rule-strong   #111111   focus ring, emphasis outline
--color-rule-neutral  #DADAD6   untinted hairline: separator glyphs, native
                                range track, chart axes
--container-wide      1360px
--container-reading   720px
--spacing-section-{compact,default,spacious}
```

Adding a colour means deciding which of the three layers it belongs to. If
it doesn't belong to one, it probably shouldn't exist.

## Forbidden patterns

- New `bg-[#…]`, `text-[#…]`, `border-[#…]` classes anywhere under `src/`.
  As of `refactor/shared-ui-consolidation` there are **zero** in rendered
  code; `src/components/MultilingualSection.tsx` still has some but is dead
  code pending an explicit deletion decision.
- Attribute-selector recoloring hacks (`[class*="…"]`). The legacy
  nine-rule pass in `src/index.css` was **removed** in
  `refactor/shared-ui-consolidation`, once every rendered element had moved
  onto tokens and it matched nothing. It was not removed in Phase 2 — an
  earlier revision of this document claimed otherwise, incorrectly.
  See `docs/design/COLOR_HACK_FINDING.md`.
- New `!important` overrides for ordinary component styling. The compiled
  CSS currently contains exactly one `!important`, from Tailwind
  Preflight's `[hidden]` rule.
- Colour utilities on `<body>` in `index.html`. That element's class
  attribute *is* the page canvas; its colours come from the `body` rule in
  `src/index.css`, which reads the tokens.
- New ad hoc `max-w-[Npx]` values in widget JSX — use `Container`.
- Duplicating a selectable-card, chip, or section-heading pattern instead
  of using the shared primitive.
- Raw hex strings passed to chart libraries instead of `chart-tokens.ts`.

## `shared/ui` primitives

| Primitive | Owns | Deliberately does not own |
|---|---|---|
| `Container` | the two measures (`wide` 1360px, `reading` 720px) and the standard gutter | vertical rhythm |
| `SelectableCard` | `<button>` semantics, `aria-pressed`, the focus-visible ring, the accent-fill / rule-border state machine | padding, grid behavior, internal composition — those stay at the call site via `className` |
| `TokenChip` | a single tokenizer output token, as a data-mark-layer chip | — |
| `SectionEyebrow` | the mono/uppercase/tracked label above a section or callout | — |
| `SectionHeading` | a section's opening block: eyebrow + `<h2>`, with the measure and type scale moving as one unit (`default`, `display`) | the heading's own content |
| `HeadingAccent` | the accent-underlined phrase inside a heading — the one place the accent layer touches editorial typography | — |
| `Stack`, `Cluster`, `Divider` | spacing/rule primitives | — |
| `ArticleElements.*` | editorial typography (lead, paragraph, subheading, pull quote, finding, caption, footnotes) | — |

`ArticleElements.tsx` is the editorial typography source of truth. It still
physically lives in `src/components/`; treat it as `shared/ui` until the
`components/` → `widgets/` move happens.

No speculative `Modal`, generic `Card`, or component-framework abstraction
is approved. A primitive earns its place by replacing real, counted
repetition — `SelectableCard` replaced five hand-rolled copies,
`SectionHeading` nine, `Container` fourteen.

## Exceptions

A deviation from a token or primitive must document in the PR:

1. Why an existing token or variant is insufficient.
2. Whether the value should become a new reusable semantic token.
3. Which viewport and widget require it.

## Known defects still open under this contract

- The sticky header uses a `lg:px-10` gutter while every section body uses
  `lg:px-12`. Pre-existing; preserved deliberately rather than unified,
  because unifying shifts header content 8px at `lg` and up.
- `chartTokens.rule` (`#DADAD6`) and `--color-rule` (`#DCE7F7`) diverge:
  SVG stroke props were never intercepted by the legacy recolor pass, so
  chart axes kept the untinted gray. Reconciling them visibly changes every
  chart axis and is a separate decision.
- `--color-surface` and `--color-canvas` are the same value, so a white
  card is not distinguishable from the page. Inherited from the legacy
  recolor pass; now explicit in the token file rather than emergent, but
  still unresolved as a design question.
