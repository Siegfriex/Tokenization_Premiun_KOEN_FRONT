# Visual QA Criteria — Research-Reading Protocol

This is not a marketing landing page. It is a static editorial surface
carrying a research finding (`TP = T_KO / T_EN`) whose numbers are still
disputed and frozen pending Director rulings (`docs/audit/DIRECTOR_DECISIONS.md`).
The question this document answers is not "is it broken" — it is **does the
page let the research be read without distortion.**

Everything the audit pipeline in `docs/audit/` verifies (traceability,
numeric-claim governance, semantic DOM, CSS-hash neutrality) is **static
analysis**. It proves "nothing changed vs a known-good state," not "the
rendered page is actually correct," and it cannot see clipped text, a
1–4px misalignment, a hierarchy inversion, or an active state that exists
in source but reads as an accident on screen. Two real bugs shipped through
that pipeline clean and were only caught by rendering the page and looking
— see `2d08285`, `ab514e1`. This document is what closes that gap, and it
is judged by **rendered evidence**, never by source declarations.

## The four layers

1. **Render Truth** — does the box contain what it claims to contain
2. **Geometric Integrity** — is the arrangement exact, not approximate
3. **Typographic Hierarchy** — does rank survive content, length, language
4. **Interaction & Narrative** — do states and slide sequence feel designed

A criterion belongs to the layer that best explains *why* it matters, not
just what it measures. Read top to bottom for severity — Layer 1 failures
are almost always P0/P1; Layer 4 failures are frequently P2/P3, but not
always (a broken active state that hides the selected data series is P0
by way of hierarchy, not polish).

---

## Layer 1 — Render Truth

### C1 — No component may visually betray its container

`scrollWidth === clientWidth` and `scrollHeight === clientHeight` for every
card/box-role element (`data-role="stat"`, any `bg-surface`/`bg-surface-alt`
wrapper, `SelectableCard` instances). A child's `getBoundingClientRect()`
must never exceed its parent's on any axis.

*Caught by this rule: the `text-8xl` headline-range clip (`2d08285`).*

### C2 — Single-line affordances must remain single-line at every supported viewport and language state

Any element inside an explicit fixed-height container (`h-14` header, a
button, a badge/pill — matched by `/(^|\s)h-\d/`, not `h-full`/`min-h-*`)
must render its content within that height at 1440px **and** 390px, in
**both** KO and EN. Content whose length legitimately varies by language is
exactly where this fails silently.

*Caught by this rule: the nav's 10-item wrap inside `header`'s `h-14`
(`ab514e1`).*

**Detection note:** only flag elements with a *declared* fixed-height
class. `getComputedStyle(el).height` on a plain text leaf equals its
natural content height by definition — comparing that to `scrollHeight`
flags ordinary line-height/glyph-metric rounding (3–6px) on every
large-type element as a false "overflow." Eleven false positives, zero
real bugs, on the first unrefined pass. Real constraint, not incidental
height, is the bar.

### C3 — Active state must fully cover its content

Wherever a `bg-accent`/`bg-on-accent` "selected" background exists, the
background box must contain 100% of that element's rendered text — not
just the first line if text wraps. Screenshot resting AND
selected/active; a class name existing in source is not evidence the state
renders correctly.

### C6 — No horizontal document scroll at 390px or 1440px

`document.documentElement.scrollWidth === document.documentElement.clientWidth`.
Cheapest global smoke check; runs first, every iteration, before anything
targeted.

---

## Layer 2 — Geometric Integrity

*People register a 1–4px misalignment as "cheap" faster than they register
an overflow. This layer is measured in pixels, not impressions.*

### C4 — Structural roles may not drift into visually near-identical but mechanically divergent variants

`bg-surface border border-rule rounded-xs p-* shadow-xs`-style card
wrappers are hand-assembled per call site rather than drawn from one
primitive (34+ near-identical signatures — `docs/audit/DESIGN_APPLICATION.md`).
This is *why* C1/C9/C10 defects are invisible to `grep`: a padding or
alignment mismatch in one has no mechanical point of comparison against
the others. Track new instances in the generated ledger; do not hand-roll
a new card shape without checking whether an existing signature already
covers the need.

### C9 — Alignment geometry must be exact, not approximate

Measured, not eyeballed:

- **Top-edge alignment** — same-row cards in a grid: top offset ≤ 2px or fail.
- **Baseline alignment** — a number sequence (a stat row, a chart's axis
  labels) sharing a visual line: no baseline wobble.
- **Left-edge alignment** — eyebrow / heading / body within one semantic
  group: left edge deviation ≤ 2px or fail.
- **Chart annotation optical alignment** — title / legend / annotation
  relative to the plot area and to each other.
- **Icon+label vertical centering** — icon optical center vs. label
  x-height/cap-height center, not bounding-box center (an icon's bounding
  box is rarely visually centered on its own glyph).

### C10 — Spacing rhythm must be token-consistent, not merely "looks right"

The grammar of gaps must repeat, not just resemble itself:

- Vertical gap ladder inside a section moves one step at a time, not
  arbitrarily.
- Heading-to-body gap is the same across cards of the same role.
- Card padding is identical within the same structural role (see C4).
- A dense slide vs. an airy slide differ *because the narrative role
  differs* (see C17), never by accident.

**Fail conditions:** ≥2 distinct padding values for the same structural
role; ≥3 distinct gap values between visually-equivalent components on one
slide; any spacing value present that cannot be explained by a stated
design reason.

### C13 — Optical balance, not just box balance

A correct bounding box does not guarantee visual balance. Headlines,
numbers, pills, and chart blocks must be judged by visual weight — where
the eye reads the center of mass — not by the geometric center of their
box. An asymmetric glyph set (`1.29× ~ 1.83×`, heavier on one side) or an
icon+text pairing can pass every box measurement and still read as
lopsided.

### C14 — Edge discipline

Every major element's relationship to its viewport or container edge must
be explainable. An "almost touching" 6–12px residual gap is almost always
an unresolved design decision, not an intentional one — either commit to
the edge (0 residual, explicit border/padding) or commit to a named
spacing token. Ambiguous leftover space fails.

---

## Layer 3 — Typographic Hierarchy

### C5 — Typography scale must resolve, not just fit

A `text-{n}xl` step chosen for a full-viewport-width element must be
re-verified at the narrowest column it actually renders in — `lg:text-8xl`
inside `lg:col-span-5` is not the same available width as `lg:text-8xl` in
a full-bleed section. Any oversized display number must be checked at
every breakpoint where its *container*, not the viewport, changes width.

### C8 — Visual hierarchy must be unambiguous

The three-second-look test: for each slide, exactly one element must win
the first glance, one to two elements may win the second, everything else
is legibly secondary. Record which element wins first look — don't assume
it, verify it against the rendered screenshot.

- First focal point is singular.
- No competing hero elements.
- Secondary text must not visually challenge the primary insight (weight,
  size, or color proximity to the hero element counts as challenging it).
- Two elements competing for first read is a fail, not a judgment call.

### C11 — Typography must preserve semantic rank under stress

Fitting is not the bar — rank surviving content is. Check:

- Headline vs. section-title grade difference reads instantly.
- Number / label / annotation roles stay visually distinct from each other
  everywhere they co-occur.
- KO↔EN switching does not invert hierarchy via line-height or weight
  differences (KO frequently wraps to more lines than EN at the same
  width — verify the *shorter* render doesn't suddenly look like the
  *lesser* one).
- Emphasis is applied to exactly what needs it — not "a lot of things are
  bold," but "the one thing that must win is bold."

**Fail examples:** body text reading as heading weight; a caption reading
stronger than its parent stat; four or more distinct bold "systems" on one
slide; a KO-only two-line wrap that silently demotes what was a one-line
EN hero number.

### C15 — Chart annotation integrity

Labels, legends, and annotations break more often than the chart geometry
itself. Check independently of the chart's own render correctness:

- Legend line-wrap at narrow widths.
- Axis-label clipping.
- Annotation collision with data marks or other annotations.
- Selecting/highlighting one series does not shove adjacent labels out of
  position.

### C16 — Bilingual stress test is mandatory, not optional

KO and EN are not the same component at different word counts — they
differ in length, glyph width, and line-break rhythm. Every headline,
pill, nav item, chart label, and stat card requires a canonical shot in
**both** languages before it is considered checked. A pass that only
screenshots the default (KO) language state has not checked C2, C3, C8,
C9, or C11 — it has checked half of each.

---

## Layer 4 — Interaction & Narrative

### C7 — State quality is judged from rendered evidence, never inferred from source declarations

For every interactive element with `aria-pressed`/`data-active`/
`aria-expanded`/`aria-current`: click it (or set the state), screenshot,
confirm C1–C3 and C9–C14 still hold in the *changed* state. A pass that
only screenshots the default render misses exactly the class of bug both
fixes in `2d08285`/`ab514e1` belonged to — the nav bug only existed in the
*active* pill.

### C12 — Active state must feel designed, not merely present

Beyond coverage (C3) and structural survival (C7), the state must read as
authored:

- Does the selected background *embrace* the text (intentional inset, not
  a bounding-box accident)?
- Does the active pill's radius/padding produce an optical center, or does
  it look like default browser styling with a color swapped in?
- Do hover / focus / active share one design language, or does only hover
  look considered?
- Does pressing a control reflow surrounding layout it shouldn't (a
  content shift on click is a fail even if nothing technically overflows)?

**Fail examples:** active state alone uses a different radius system than
resting; active background wraps only the first line of multi-line
content; a selected state's weight increase triggers a new line-wrap that
resting state didn't have; hover is polished and active is not.

### C17 — Density must match narrative role, not just fit its content

More information on a slide is not inherently wrong — but density is a
narrative decision, not an accident of how much copy a widget happened to
receive. Expected shape across this site's ten sections:

| Role | Density |
|---|---|
| Hero / cover | sparse |
| Explanation | moderate |
| Evidence (chart, data table, comparison) | dense, but ordered |
| Closing | sparse again |

A dense slide in a role that should be sparse (or vice versa) is a
narrative-hierarchy failure even if every individual element passes C1–C16.

### C18 — Slide-to-slide continuity must hold

Reading the site section by section in order, in one language, at one
viewport, should never produce a jarring reset — of type scale, of card
shape, of spacing rhythm, of accent usage — that isn't justified by a
narrative beat (e.g. the closing slide's `display` heading scale is a
deliberate, singular exception; a mid-sequence section quietly using a
different card radius is not). Checked by scrolling the full page in one
continuous pass per language, not by screenshotting sections in isolation.

---

## Shot Spec — required before touching a slide

One loop iteration works on **one slide**, and at most **one problem
class** (spacing-only, or hierarchy-only, or state-only — not several at
once; a fix that touches two axes in one commit makes the next iteration's
"what regressed" undecidable). Before editing, fill this table — it is
what keeps the loop from drifting slide to slide without finishing one:

| Field | Content |
|---|---|
| Slide ID | e.g. `S03-TokenPremiumHero` |
| Intent | one sentence: what must this slide say |
| Primary focal point | the one element that must win first look |
| Secondary focal points | 1–2 elements, explicitly ranked below primary |
| Forbidden competition | elements that must never rival the primary |
| Layout skeleton | hero / two-column / chart-left / stat-grid / … |
| Risk zones | wrap-prone KO strings, legend width, number baselines, anything already bitten once |
| Required states | default / selected / active / focus — whichever exist |
| Required screenshots | 1440×KO×default, 1440×KO×active, 1440×EN×default, 390×KO×default, 390×KO×active, 390×EN×default (drop combinations that don't apply — e.g. a slide with no interactive element has no "active" row) |
| Accept/reject rule | one line, written before looking at the shots, so the criterion isn't rationalized after the fact |

Completed specs live in `docs/qa/SHOT_SPECS.md`, one per slide, append-only
— same discipline as `docs/audit/DIRECTOR_DECISIONS.md`.

## Severity

- **P0** — meaning distortion, text clipping, a state that misrepresents
  what's selected/true. Fix immediately, blocks the slide.
- **P1** — hierarchy collapse, an active state that reads as broken,
  wrap-induced rank inversion.
- **P2** — 2–4px alignment drift, spacing inconsistency (C10's 2–3 rule).
- **P3** — polish deficit, optical imbalance (C13) that doesn't mislead,
  just under-delivers.

A loop iteration fixes P0/P1 it finds. P2/P3 are logged and queued, not
skipped silently — but do not let a P3 chase block moving to the next
slide once the slide's P0/P1 are clear.

## What this checklist does NOT cover

- Colour contrast / accessibility computed-style checks (`axe-core` not
  wired into the Playwright driver yet — a real gap, not silently assumed
  clean; candidate for a future criterion).
- Cross-browser (Chromium only — no Firefox/Safari engine available here).
- Real device / real network conditions.

## Known-clean baseline (do not re-flag without new rendered evidence)

- Domain-distribution `SelectableCard` list (`#patterns` right column) —
  resting + selected screenshotted at 1440px, C1/C3 clean.
- Mobile (390px) document-level horizontal scroll (C6) — clean as of
  `2d08285`.
- C3 (active-state containment), all 9 live active/selected/expanded
  elements, both viewports — clean as of iteration 2.
- C2 (fixed-height overflow, refined detector) — 0 findings as of
  iteration 2.

## Log

Every loop iteration appends one entry to `docs/qa/LOOP_LOG.md` — commit
SHA, Slide ID worked, Shot Spec reference, findings by severity, what was
fixed, what was queued. That log plus `docs/qa/SHOT_SPECS.md` together are
the rollback index: `git revert <sha>` or `git reset --hard <sha before the
iteration you want to undo>` on the working branch.
