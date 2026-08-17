# Interaction Audit

> **SUPERSEDED — historical record only.**
>
> This document answered "which interaction patterns are duplicated" for one phase, at one moment. It is no
> longer maintained and the four selectable-card duplicates it describes were consolidated into shared/ui/SelectableCard.
>
> **The live answer is [`docs/audit/`](audit/README.md)** — a generated trace
> ledger that registers every content-bearing and structure-bearing node with a
> stable Trace ID, and regenerates from source on demand. Start at
> [`docs/audit/README.md`](audit/README.md).
>
> Kept because the phase PRs reference it and because the reasoning behind
> decisions already taken lives here. Do not use it to decide anything new, and
> do not update it — update the ledger instead.

Maps every piece of interactive state before `refactor/interaction-features`.

## Language state — prop-drilled, single source, 12 consumers

- Owned in `App.tsx:17` — `useState<UILanguage>('ko')`.
- Passed as a `uiLang` prop into all 12 mounted section widgets, each of
  which independently derives `const isKo = uiLang === 'ko'` and then
  repeats `isKo ? x.ko : x.en` locally (122 occurrences total — see
  `CONTENT_AUDIT.md`).
- The only *write* to this state is `StoryProgress.tsx`'s KO/EN toggle
  buttons (lines 92-110).

**Multiple consumers, one owner, no shared accessor.** This is the
canonical case for promoting to a context/provider (`shared/i18n`) with a
`useUiLanguage()` hook and a `t(bilingual)` helper, eliminating the 122
repeated ternaries without changing where the underlying content lives.

## Scroll progress / active-section observation

- Owned in `StoryProgress.tsx:22-47` — `scrollPercent` and `activeSection`
  state, driven by a single `window` `scroll` listener (`{ passive: true }`)
  that also loops over a hardcoded `SECTIONS` array (see `CONTENT_AUDIT.md`
  P0 item #2) calling `getBoundingClientRect()` per section on every
  scroll event.
- Single consumer (the header itself: progress bar fill + active nav
  highlight). No duplication elsewhere, but it is a reasonable extraction
  candidate (`features/observe-scroll-section`) purely because it mixes
  three concerns in one effect: progress %, active-section detection, and
  the content array it iterates over.
- Cleanup is present (`removeEventListener` on unmount) — no leak found.

## Selectable-card / pressed-button pattern — duplicated 4×

The same interaction shape — a horizontal/grid list of clickable
cards/buttons where exactly one is "selected" and receives inverted
(`bg-[#111111] text-[#FFFFFF]`) styling — is independently implemented in:

| File | State name | Lines (state + render) |
|---|---|---|
| `TokenCompareSection.tsx` | `selectedPairId` | 22, 81-108 |
| `TokenPremiumSection.tsx` | `selectedDomain` | 29, 145-189 |
| `OccupationSection.tsx` | `promptCount` (preset buttons subset) | 23, 100-114 |
| `MultilingualTokenEfficiencySection.tsx` | `selectedLangId` | 34, 167-181 (button list) + 260-280 (chart bar click, same state) |

Each instance re-derives its own `isSelected ? '...' : '...'` className
string with its own copy of the same handful of hex literals. None of the
four import from a shared component — this is the concrete evidence
behind the "인터랙션이 통일되지 못하고 개별 분산" complaint that motivated
this refactor.

**Extraction target:** a single `SelectableCard`/`useSelectable` primitive
in `shared/ui` (styling) with each widget supplying only its own data/click
handler — not a shared *feature* module, since each selection is
independent, single-widget state with no cross-widget consumer. Do not
over-centralize into one global "selection" store; only the *visual/interaction
pattern* is duplicated, not the state itself.

## Accordion — single instance, no duplication found

`MethodSection.tsx:20-29` — `openItemIds: string[]`, toggled via
`toggleItem`. Single consumer, self-contained. No extraction required
beyond ensuring it eventually uses the same shared disclosure/accordion
primitive if one is introduced for other reasons — not a priority.

## Slider / numeric input — single instance

`OccupationSection.tsx:23` — `promptCount`, driven by both a `<input type="range">`
and five preset buttons (which reuse the pattern above). Single consumer.
Drives the PROTECTED numeric simulation described in `CONTENT_AUDIT.md`.

## Chart hover/selection — single instance, dual-trigger

`MultilingualTokenEfficiencySection.tsx` — `selectedLangId` is set both by
clicking a button (167-181) and by clicking a Recharts `<Bar>` segment
(`onClick={(data) => setSelectedLangId(data.id)}`, line 263). This is a
legitimate single-state-two-triggers pattern, not duplication — no
extraction needed beyond folding its button list into the shared
`SelectableCard` primitive above.

## `scrollToTop` — trivial, local

`EditorialConclusionSection.tsx:19-21` — `window.scrollTo({ top: 0, behavior: 'smooth' })`.
No state, single consumer, no action needed.

## Keyboard / focus / accessibility observations

- Selectable cards and preset buttons are real `<button>` elements (good —
  keyboard-reachable by default), but none currently show a distinct
  `:focus-visible` treatment beyond the browser default; this should be
  defined once as part of the shared `SelectableCard`/`Button` primitives
  rather than per-instance.
- The section-nav links in `StoryProgress.tsx` are real `<a href="#...">`
  anchors — keyboard-reachable, standard behavior.
- `PipelineSection.tsx:133-186` renders each pipeline step as a `<div
  onClick=...>` rather than a `<button>` — **not currently keyboard-reachable
  or focusable.** This is a genuine, pre-existing accessibility defect to
  fix during the shared-UI consolidation pass (convert to a real
  interactive element), not merely a styling inconsistency.

## Summary: what becomes a `feature/`, what stays widget-local

| Interaction | Consumers | Recommended home |
|---|---|---|
| UI language | 12 widgets | `shared/i18n` provider + `t()` (cross-cutting, promote) |
| Scroll progress / active section | 1 (header) | `features/observe-scroll-section` (extract for separation of concerns, not reuse) |
| Selectable-card visual/interaction pattern | 4 widgets | `shared/ui` component (`SelectableCard`), state stays local to each widget |
| Accordion | 1 (method section) | stays widget-local |
| Slider/simulator | 1 (occupation section) | stays widget-local |
| Chart selection | 1 (multilingual section) | stays widget-local, consumes `SelectableCard` for its button row |
