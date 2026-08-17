# Finding: the legacy color-recolor hack determines current production appearance

Discovered during `refactor/foundation-tokens-layout` (Phase 2), while
deciding what values the new semantic color tokens should hold.

## What was found

`src/index.css` (lines ~48-99, pre-existing since the legacy baseline)
contains an attribute-selector, `!important`-based recolor pass:

```css
[class*="bg-[#FFFFFF]"]        { background-color: #F7F8FA !important; }
[class*="bg-[#F7F7F5]"]        { background-color: #EFF6FF !important; }
[class*="bg-[#111111]"]        { background-color: #2563EB !important; }
[class*="text-[#111111]"]      { color: #111827 !important; }
[class*="text-[#777773]"]      { color: #64748B !important; }
[class*="text-[#4A4A47]"]      { color: #475569 !important; }
[class*="border-[#DADAD6]"]    { border-color: #DCE7F7 !important; }
[class*="bg-[#F1F2F2]"]        { background-color: #EFF6FF !important; }
[class*="decoration-[#8A8A85]"]{ text-decoration-color: #2563EB !important; }
```

Because Vite/Tailwind emits the literal utility class name (e.g.
`bg-[#111111]`) into the DOM `class` attribute, an attribute-selector CSS
rule can string-match and override it. This is confirmed to actively
affect the deployed production site
(`https://tokenization-premiun-koen-front.vercel.app/`): every element
using `bg-[#111111]` (buttons, active/selected states, several "dark"
cards across `ImpactSection`, `KoreaAIContextSection`, etc.) currently
renders as **blue (`#2563EB`)**, not black — the site's live appearance
is a blue-accented editorial theme, not the flat black/white/gray theme
the component source's literal Tailwind classes would suggest in
isolation.

## Why this matters for the token migration

The hack's coverage is **partial and inconsistent**:

| Value | Covered as `bg-` | Covered as `text-` | Covered as `border-` | Covered as `decoration-` |
|---|---|---|---|---|
| `#111111` | yes -> `#2563EB` | yes -> `#111827` | **no** (stays `#111111`) | — |
| `#DADAD6` | — | — | yes -> `#DCE7F7` | — |
| `#777773` | — | yes -> `#64748B` | — | — |
| `#4A4A47` | — | yes -> `#475569` | — | — |
| `#8A8A85` | — | **no** (stays `#8A8A85`) | — | yes -> `#2563EB` |
| `#FFFFFF` | yes -> `#F7F8FA` | **no** (stays `#FFFFFF`) | — | — |

The same hex literal renders as a different final color depending on
which Tailwind property prefix carries it — e.g. `border-[#111111]`
(used for an emphasis card outline in `OccupationSection.tsx:264`) stays
true black, while `bg-[#111111]`/`text-[#111111]` elsewhere become blue.
This is consistent with an unfinished, ad hoc reskin pass rather than an
intentional design system.

A second, likely-unintended consequence: `bg-[#FFFFFF]` (card surfaces)
and the page `body` background both resolve to the same `#F7F8FA`, so
white "cards" are not visually distinguishable from the page canvas
under the current hack. This may be an existing, shipped visual defect,
not something introduced by this refactor.

## Decision applied in this phase (Phase 2), pending user confirmation

To avoid a visible split-appearance mid-migration (some widgets flat
black/white, others blue, depending on migration order), the new semantic
tokens in `src/shared/config/tokens.css` are defined to match the
**current rendered (post-hack) colors** for every role the hack covers,
and to match the **current raw literal** for roles it does not cover.
Migrating a widget's classes to the new token classes therefore produces
**zero visible change** versus today's production site, regardless of
migration order. The hack itself is left in place — it remains load-bearing
for every widget not yet migrated — and will only be removed once no
widget references any class it targets (tracked as a Phase 5 exit
condition, not before).

## Additional finding: a substring-match collision likely paints the app root blue

`src/App.tsx:20` (root wrapper div, `min-h-screen` — effectively the whole
viewport) carries this class string:

```
min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col font-sans
selection:bg-[#111111] selection:text-[#FFFFFF] scroll-smooth
```

The hack selectors are plain CSS attribute *substring* matches
(`[class*="..."]`), not Tailwind-aware token matches. The literal string
`selection:bg-[#111111]` **contains** the substring `bg-[#111111]`, so
`[class*="bg-[#111111]"]` matches this div too — not only for its
`::selection` styling, but for the element's own background. Verified in
the compiled CSS output that both colliding rules exist and
`[class*="bg-[#111111]"] { background-color: #2563eb !important; }` is
declared **after** `[class*="bg-[#FFFFFF]"] { background-color: #f7f8fa
!important; }`; with identical selector specificity, source order decides,
so the blue rule wins.

**Likely consequence: the app's root background currently renders `#2563EB`
(blue), not the `#F7F8FA` the component author evidently intended.** This
is inferred from static CSS analysis; it has not been visually confirmed
against the live site because no browser-automation tool is available in
this environment (see the Phase 2 PR's verification section). Only
`App.tsx` exhibits this specific `selection:` + hacked-`bg` combination
(confirmed via repository-wide search); no other file is at risk of the
same collision today.

**Action taken:** `App.tsx` is deliberately **not migrated** to semantic
tokens in Phase 2. Migrating its `bg-[#FFFFFF]`/`selection:bg-[#111111]`
classes to token classes (e.g. `bg-surface`) would remove them from the
hack's substring match entirely, which would change the root background
to whatever `--color-surface` resolves to — a real, highly visible,
site-wide color change that this refactor should not make silently. This
is left for a follow-up decision alongside the broader keep-blue vs.
revert-to-monochrome question above, not fixed opportunistically here.

## Open decision for the Research/Product Director

This finding surfaces a real product/brand question that the orchestrator
is not authorized to decide unilaterally:

1. **Keep the blue accent** (`#2563EB`) as the site's actual, intentional
   design going forward — formalize it as `--color-surface-inverse` /
   `--color-emphasis` (already done, see `tokens.css`), and fix the
   inconsistent partial coverage (e.g. also blue-accent
   `border-[#111111]`, decide `text-[#8A8A85]` / `text-[#FFFFFF]`
   treatment) so it becomes a coherent theme; **or**
2. **Revert to the original flat black/white/gray editorial design** (the
   literal values already present in every component's source) by
   retiring the hack entirely once migration completes, restoring full
   internal consistency the "intended" way.

No further design decision is made in this phase beyond preserving current
appearance. Recommend resolving this before Phase 5 (shared UI
consolidation), since it determines the final palette committed to
`shared/ui` components.

---

# RESOLUTION (branch `refactor/shared-ui-consolidation`)

## The direction that resolved it

The Director's answer was neither of the two options as originally framed.
It was a **two-layer split**:

- **Cobalt (`#2563EB`) is the real accent colour**, formalised — but it is
  the *state and navigation* layer: selected card, active nav entry, the
  emphasis underline in a section heading, the scroll-progress fill.
- **Reading surfaces and prose stay black/near-black on a light canvas.**
  The accent never becomes body copy and never becomes a reading surface.
- A third layer was needed once the first two were named: **data marks**
  (chart bars, proportional bars, their legend swatches, token chips) are
  near-black/gray on purpose, because accent-coloured bars would compete
  with the selection state and make the research's own emphasis illegible.

That vocabulary now lives in `src/shared/config/tokens.css`, which is the
one place the palette is defined.

## What was found in addition, during this branch

`index.html`'s `<body>` carried `class="bg-[#111111] text-[#F5F5F3] …"`.
The hack's `[class*="bg-[#111111]"]` rule matched it directly, so the
**page canvas itself rendered `#2563EB`**, overriding the hack's own
`body { background-color: #F7F8FA !important }` (attribute selector 0,1,0
beats element selector 0,0,1; both `!important`, so specificity decides).
The original finding above only identified the `App.tsx` root-div
collision — the `<body>` element was a second, independent instance of the
same defect, and fixing `App.tsx` alone would not have resolved it.

Both are fixed: `<body>` now carries no colour utilities at all (its
colours come from the `body` rule in `src/index.css`, which reads the
tokens), and `App.tsx`'s root is `bg-canvas text-ink`.

## The hack is retired

The nine `[class*="…"] { … !important }` rules were deleted from
`src/index.css`. This was safe to do — and provably a no-op for everything
except the two collisions above — because every rendered element had first
been migrated off the arbitrary-hex classes the rules matched. Verified
mechanically before deletion:

- 0 occurrences of any of the nine matched class strings in any rendered
  source file or in `index.html`.
- 0 `[class*=` rules in the compiled CSS afterwards.
- The only remaining `!important` in the compiled CSS is Tailwind
  Preflight's `[hidden]` rule.
- All 95 distinct colour/width utility tokens used across `src/` resolve to
  a real compiled rule (a mistyped token class would otherwise have
  silently become a no-op, which `tsc` cannot catch).

`src/components/MultilingualSection.tsx` still contains matched class
strings, but it is dead code — not imported anywhere, never rendered — so
the hack never applied to it.

## Colour-fidelity map (audit this table to review the visual risk)

Every migration below is value-for-value identical to what production
rendered before, unless the last column says otherwise.

| Old class | Rendered before | New class | Value now |
|---|---|---|---|
| `bg-[#FFFFFF]` | `#F7F8FA` (hacked) | `bg-surface` | `#F7F8FA` |
| `bg-[#F7F7F5]`, `bg-[#F1F2F2]` | `#EFF6FF` (hacked) | `bg-surface-alt` | `#EFF6FF` |
| `bg-[#111111]` | `#2563EB` (hacked) | `bg-accent` | `#2563EB` |
| `text-[#111111]` | `#111827` (hacked) | `text-ink` | `#111827` |
| `text-[#777773]` | `#64748B` (hacked) | `text-ink-muted` | `#64748B` |
| `text-[#4A4A47]` | `#475569` (hacked) | `text-ink-body` | `#475569` |
| `border-[#DADAD6]` | `#DCE7F7` (hacked) | `border-rule` | `#DCE7F7` |
| `decoration-[#8A8A85]` | `#2563EB` (hacked) | `decoration-accent` | `#2563EB` |
| `text-[#333333]` | `#333333` | `text-ink-strong` | `#333333` |
| `text-[#8A8A85]` | `#8A8A85` | `text-ink-subtle` | `#8A8A85` |
| `text-[#FFFFFF]` | `#FFFFFF` | `text-on-accent` | `#FFFFFF` |
| `text-[#DADAD6]` on an accent fill | `#DADAD6` | `text-on-accent-muted` | `#DADAD6` |
| `text-[#DADAD6]` on a light surface | `#DADAD6` | `text-rule-neutral` | `#DADAD6` |
| `border-[#353535]` | `#353535` | `border-rule-on-accent` | `#353535` |
| `bg-[#161616]` | `#161616` | `bg-mark` | `#161616` |
| `bg-[#E8E8E4]` | `#E8E8E4` | `bg-mark-track` | `#E8E8E4` |
| `bg-[#777773]` | `#777773` | `bg-mark-baseline` | `#777773` |
| `bg-[#C2C2BD]` | `#C2C2BD` | `bg-mark-other` | `#C2C2BD` |
| `bg-[#DADAD6]` | `#DADAD6` | `bg-rule-neutral` | `#DADAD6` |
| `border-[#111111]` outlining a light card | `#111111` | `border-rule-strong` | `#111111` |

### Deliberate visual changes (five, all stated)

| # | Where | Before | After | Why |
|---|---|---|---|---|
| 1 | App root `<div>` background | `#2563EB` | `#F7F8FA` | The substring collision documented above. The accent layer was painting the reading canvas. |
| 2 | `<body>` background | `#2563EB` | `#F7F8FA` | Same defect, second instance. Visible at scroll extremes / overscroll and as the mobile browser chrome tint. |
| 3 | `border-[#111111]` **outlining an accent fill** (TokenCompare + Multilingual selected cards, Footer status chip, the conclusion button's hover) | black ring on a cobalt fill | `border-accent` → cobalt | An artifact of the hack's partial coverage: it recoloured `bg-` but not `border-`, so a pairing that matched in the original monochrome design was broken. Three other selected-card sites already used a matching border, so this also removes an inconsistency between them. |
| 4 | Range-input `accent-color` in OccupationSection | `#111111` | `#2563EB` | The slider is the burden simulator's primary state control; every other state control is now cobalt. |
| 5 | `shadow-xs` on the filled state of `SelectableCard` | present on 2 of 5 sites | present on all 5 | Uniform in the shared primitive. Tailwind `shadow-xs` is `0 1px 2px rgb(0 0 0 / .05)`. Revertible in one line if unwanted. |

Two further deltas are below perceptual threshold and are recorded only for
completeness: `#111111` → `#111827` on hover borders and the text-selection
highlight, and `transition-colors` → `transition-all` on the Occupation
preset chips (no animated property differs).

**Not verified in a browser.** No browser-automation tool is available in
this environment; everything above is verified against the compiled CSS and
the source, not against rendered pixels. Items 1-3 in particular deserve a
human look — see `QA_ACCEPTANCE.md`.
