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
