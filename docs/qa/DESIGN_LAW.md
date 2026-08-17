# Design Law

Not a QA checklist — a set of decisions that make "why does this go here"
answerable for every element on the page, per the Director's standing
critique: functionally correct, editorially not yet decided. Where
`docs/qa/VISUAL_QA_CRITERIA.md` (C1–C18) measures whether a rendered page
obeys a rule, this document *is* the rule. A slide that passes C1–C18 but
contradicts this document is still wrong.

Governs alongside — does not replace — `docs/DESIGN_SYSTEM_CONTRACT.md`
(token names/values) and `docs/audit/DESIGN_APPLICATION.md` (measured
signature drift). This document is the target those two are converging
toward.

## Card tiers

Every `bg-surface`/`bg-surface-alt` panel on a slide is exactly one of
three tiers. The tier is a content decision (what role does this panel
play in the slide's argument), not a size decision — a tier-1 panel can be
small, a tier-3 panel can be wide.

| Tier | Role | Treatment | Existing precedent |
|---|---|---|---|
| **1 — Primary evidence** | The one panel carrying the slide's central number/claim — what `docs/qa/SHOT_SPECS.md` calls the primary focal point, made structural | `bg-surface border-2 border-rule-strong rounded-xs shadow-sm` | `OccupationSection`'s "Social Science" emphasis card already used this ad hoc — formalized here, not invented |
| **2 — Secondary contextual** | Supports or elaborates the primary panel; interactive/exploratory detail (a selector list, a chart) | `bg-surface border border-rule rounded-xs shadow-xs` | The current default — most existing cards |
| **3 — Tertiary annotation** | Definitional, procedural, or source-note content; must recede, never compete | `bg-surface-alt border border-rule rounded-xs` (no shadow) | `TokenPremiumSection`'s formula box, `OccupationSection`'s token-receipt block |

**Rule:** a slide with two tier-1 panels has not made a decision about
which one is the point. Every slide's Shot Spec must name exactly one.
`accent`/`bg-accent` is never used for tiering — accent is reserved for
selection/navigation state (`DESIGN_SYSTEM_CONTRACT.md`); tiering is
border-weight and shadow-depth only, so a filled/selected card inside a
tier-2 panel doesn't fight the panel's own tier signal.

## Typography law

The scale, named by role, not by slide. A widget introducing a new
`text-*` combination for one of these roles instead of using the named one
is a C4/C10 violation.

| Role | Treatment | Where defined |
|---|---|---|
| Hero headline (site-level, once) | `text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]` | `NewsHeroSection` H1 — `font-extrabold`/`leading-[1.1]` is a deliberate cover-only exception (Director redline, 2026-08-17: "논지 선고처럼," heavier than every other section's `font-bold`) — do not propagate to `SectionHeading`, which stays `font-bold` for all 10 in-body slides |
| Section lead (`SectionHeading` h2, once per slide) | `text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight` (display variant: `text-4xl sm:text-6xl lg:text-7xl`, closing slide only) | `shared/ui/SectionHeading.tsx` |
| Body lead (`ArticleLead`) | `text-xl sm:text-2xl font-medium leading-[1.6]` | `ArticleElements.tsx` |
| Body paragraph (`ArticleParagraph`) | `text-[17px] sm:text-[18px] font-normal leading-[1.85]` | `ArticleElements.tsx` |
| Card/section eyebrow (`SectionEyebrow`) | `text-xs font-mono font-bold uppercase tracking-widest` | `shared/ui/SectionHeading.tsx` |
| Card label / meta row | `text-xs font-mono uppercase tracking-wider` | ad hoc per widget — candidate for a named primitive, not yet extracted |
| **Tier-1 metric number** (the slide's one hero statistic) | `text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tight` | reserved for exactly one number per slide |
| **Tier-2/3 supporting number** (a stat inside a secondary/tertiary panel) | `text-3xl sm:text-4xl font-black font-mono` — one visual step below tier-1, never the same size | new rule (see S03 fix below) |
| Micro-meta (timestamps, source notes, figure numbers) | `text-[10px]`–`text-[11px] font-mono uppercase tracking-wide` | pervasive, already consistent per `docs/audit/DESIGN_APPLICATION.md` |

**Nav wayfinding (resolved, `a9744da`):** the header nav is not prose — it
carries only a compact step code (`S0`…`S7`) at rest, `text-ink-subtle`
(the ink ramp's most tertiary tone), and reveals the full descriptive name
only for the active step inside the accent pill. A nav item is a location
marker, not a table-of-contents entry competing with the slide it points at.

## Applying the tiers — S03-patterns (`TokenPremiumSection`) worked example

Director's cited case: the left "Oversized Metric" panel (the `1.29×–1.83×`
headline ratio) and the right "Domain Distribution" panel (the 6-row
interactive list) previously used **identical** treatment
(`border border-rule shadow-xs` both), so neither read as the slide's
point — both, plus the active nav item, competed for first look at once.

- Left panel → **Tier 1**. It carries the slide's single central number.
- Right panel → **Tier 2** (unchanged — it was already correctly a
  secondary/exploratory panel; the bug was the left panel not
  outranking it, not the right panel overreaching).
- The "Formula Notation Box" beneath the left panel → **Tier 3**
  (was tier-2 treatment; it's definitional, not evidentiary).

Applied in `<commit sha, see docs/qa/LOOP_LOG.md>`.

## What this document does not yet cover

- Explicit grouping/visual rhythm inside the nav (Director's "단계
  그룹화" — phase clustering) — the code/name split (priority 1, done)
  addresses density; grouping by phase (measurement vs. implication vs.
  closing) is not yet designed. Logged, not done.
- A named `shared/ui` primitive for "card label / meta row" — currently
  ad hoc per widget, functionally consistent but not centrally owned.
- Full-site convergence of every slide onto the tier system — this
  document defines the law and the first worked example; remaining
  slides converge one per loop iteration (`docs/qa/SHOT_SPECS.md`), not
  in one pass.
