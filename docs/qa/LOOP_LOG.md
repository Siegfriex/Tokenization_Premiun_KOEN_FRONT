# Visual QA Loop — Rollback Log

One entry per iteration, oldest first. Each entry is a rollback point:
`git revert <sha>` undoes just that iteration; `git reset --hard <sha>` on
`repair/control-plane-integrity` returns to that exact state. Never edit a
past entry — append only, same discipline as `docs/audit/DIRECTOR_DECISIONS.md`.

Criteria referenced (C1–C7): `docs/qa/VISUAL_QA_CRITERIA.md`.

---

## 2026-08-17 18:xx — Iteration 0 (manual, not loop-driven)

**Commit:** `2d08285`
**Trigger:** direct user report — pasted selectors + "글씨가 삐져나오잖아" +
nav/interaction complaint.

**Checked:** `#burden`, `#patterns`, `#languages` full sections + the 4
specific selectors pasted by the user, at 1440×1000 and 390×844.

**Found:**
- C1 FAIL — `TokenPremiumSection` headline-range (`PREM-011`'s node):
  546px content in a 487px card, `×` after `1.83` rendered off-card.
- C2 FAIL — `StoryProgress` desktop nav: all 10 links wrapped to 2 lines
  inside the `h-14` header, ~1.5–10px vertical clip depending on label.
- C3 (related to above) — active nav pill background didn't cover the
  wrapped second line.
- Checked, not reproduced: domain-distribution `SelectableCard` font
  pairing — clean at 1440px, both resting and selected states.

**Fixed:** both C1/C2 failures. See `2d08285` commit body for the exact
diffs and re-measurement.

**Not checked this iteration:** C4–C7 systematically (this pass was
targeted at the user's specific reports, not a full sweep). First loop
iteration below is the first full C1–C7 sweep.

---

## 2026-08-17 19:xx — Iteration 1 (loop, full sweep)

**Commit:** (this iteration's commit — see git log)
**Trigger:** `/loop` dynamic mode, first fire.

**Checked:** C1 (card overflow) + C6 (doc-level horizontal scroll) across
all 10 sections × 2 viewports (1440/390), mechanically via
`getBoundingClientRect()` walk — not sampled, every `[data-role="stat"]` /
`bg-surface*` / `bg-accent*` element in every section. C7 (interaction
states): clicked one representative control in `#compare`, `#patterns`,
`#burden`, `#languages`, `#method`, `#pipeline` and re-measured overflow on
each after the click.

**Found:**
- C6 FAIL, desktop only — `document.documentElement`: `scrollWidth: 1596`
  vs `clientWidth: 1440` (156px page-level horizontal overflow). Root
  cause: my own iteration-0 fix (`whitespace-nowrap` on nav links) removed
  the wrap but didn't reserve room for it — at the `xl` breakpoint
  (1280px+, which 1440 falls in) the brand sentence reappeared
  (`xl:inline` from iteration 0) at the same time as the now-non-wrapping
  10-item nav, and together with the KO/EN switch they exceeded the header
  row's width. The switcher was pushed to `right: 1596`, off the 1440px
  viewport — **the language toggle was inaccessible on desktop.**
- C1/C7: clean everywhere else — 0 card overflows across all 10 sections ×
  2 viewports, 0 overflow after any of the 6 tested interactions.

**Fixed:** removed the `xl:inline` re-reveal — brand sentence now stays
`hidden` from `lg` upward permanently (`hidden md:inline lg:hidden`), only
ever visible in the narrow md-only band (768–1023px) where nav itself is
hidden. Re-measured: `find_wide.mjs` (walks every element for
`right > viewport` or `left < 0`) returns `[]`. Full sweep re-run: doc
overflow `[]`, card overflow `[]`, both viewports.

**Lesson for next iteration:** a fix for one criterion (C2, no-wrap) can
create a new violation of another (C6, no-page-overflow) at a *different*
breakpoint than the one being tested. Every iteration re-runs the full
sweep, not just the criterion that motivated it.

---

## 2026-08-17 19:xx — Iteration 2 (loop)

**Trigger:** merged PR #10 in the meantime (user, `56882d3`) — verified
production (`tokenization-premiun-koen-front.vercel.app`) serves that exact
commit by comparing its live asset hashes (`index-BC_KrqaL.js`,
`index-73z017_0.css`) against a fresh local `npm run build` from the same
commit: identical. Continued on a new branch (`qa/loop-iteration-2`) off
the now-current `main`.

**Checked:** C3 (active/selected element content-containment) across all 9
live `aria-pressed`/`data-active`/`aria-current`/`aria-expanded` elements at
1440px and 390px. C2, first pass with a naive "any element, any computed
height" heuristic — 11 elements flagged, all leaf text nodes with 3–6px of
scrollHeight over computed height. Investigated rather than trusting the
flag: this is ordinary line-height/glyph-metric rounding on large type
(`text-6xl`–`text-9xl`), not a container being violated — none of the
flagged elements declare an explicit fixed-height utility. Re-ran with a
heuristic restricted to elements matching `/(^|\s)h-\d/` (excludes
`h-full`/`min-h-*`/`max-h-*`/no height class): **0 findings.**

**Found:** nothing new. C3: 0/9 bad. C2 (refined): 0 findings.

**Fixed:** nothing — no real defect this iteration. Refined the C2
detection method in `docs/qa/VISUAL_QA_CRITERIA.md` itself so the false-
positive chase doesn't repeat next time.

**Not checked this iteration:** C4/C5 (design-signature consolidation — a
B5 scope, not a per-iteration visual-bug sweep) and full C7 interaction
re-verification (ran in iteration 1, not re-run this round since nothing
touched interactive components).

---

## 2026-08-17 20:xx — Iteration 3 (loop, protocol upgrade)

**Trigger:** user upgraded the QA methodology mid-loop — added C8–C18,
the four-layer structure (Render Truth / Geometric Integrity / Typographic
Hierarchy / Interaction & Narrative), the Shot Spec format, and severity
tiers (P0–P3). `docs/qa/VISUAL_QA_CRITERIA.md` rewritten in full.
Operating rule from here: **one loop iteration = one slide, at most one
problem class.**

**Slide worked:** `S00-hero` (first slide, per `docs/qa/SHOT_SPECS.md`).
4 required shots captured (1440×KO, 1440×EN, 390×KO, 390×EN) via
`/tmp/qa-tools/shot_hero.mjs`.

**Found:** P0 — `keyFinding.bigNumber` not localized; EN mode leaked the
Korean qualifier "약" into the hero's single biggest display number. See
`docs/qa/SHOT_SPECS.md` S00-hero for full writeup. This is a new finding
class the earlier DOM-measurement-only sweeps (iterations 1–2) structurally
could not have caught — it only exists when comparing rendered KO vs EN
screenshots side by side, which C1/C2/C6's automated overflow checks don't
do.

**Fixed:** localized `bigNumber` to `{ ko, en }` (type + content + widget
read-site). Not a numeric-claim change — value identical in both
languages, only the untranslated word was translated. Re-verified: tsc
clean, `npm run build` passes, audit pipeline diff-reproducible, director
queue still 16 (confirms this node isn't one of the 22 frozen claims),
EN re-screenshot clean at both viewports.

**Queued, not fixed (P2/P3, out of this iteration's one-problem-class
scope):** none found this round beyond the P0 above — S00-hero otherwise
passed C1/C6/C8/C9/C13 clean at all 4 shots.

**Next slide:** `S01-compare` (`TokenCompareSection`) — not started.

---

## 2026-08-17 20:xx — Iteration 4 (loop)

**Trigger:** scheduled fallback (10-minute cadence). PR #11 checked, still
open/unmerged — continued on the same branch.

**Slide worked:** `S01-compare`. 5 shots (1440×KO×pair1, 1440×KO×pair3,
1440×EN×pair1, 390×KO×pair1, 390×KO×pair3) via `/tmp/qa-tools/shot_compare.mjs`.

**Found:** P1, site-wide (not S01-local) — `scroll-mt-12` on 8/10 sections
is 10px short of the sticky header's real height. A real anchor-nav click
clips the first ~1.5 lines of every section's lead paragraph. See
`docs/qa/SHOT_SPECS.md` S01-compare for the full writeup, including the
methodology correction: `elementHandle.screenshot()` on an
oversized section is not a trustworthy header-overlap test — a scripted
Chromium capture-viewport resize makes the sticky header "stick" at a
scroll position no real user reaches. Ground truth is a real nav click +
`getBoundingClientRect()`.

**Fixed:** `scroll-mt-12` → `scroll-mt-16` across `PipelineSection`,
`MethodSection`, `MultilingualTokenEfficiencySection`, `ImpactSection`,
`KoreaAIContextSection`, `TokenCompareSection`, `TokenPremiumSection`,
`OccupationSection`. Verified via real nav-link click: section top lands
63.6px below viewport top post-click (was computed to land at -10px, i.e.
under the header, with the old value). tsc clean, build passes, audit
pipeline diff-reproducible.

**S01-compare's own criteria:** C1/C3/C6/C10/C13 clean at all 5 shots —
pair-switching grows the token-chip card height with content, no jump/
break.

**Next slide:** `S02-pipeline` (`PipelineSection`) — not started.

---

## 2026-08-17 21:xx — Iteration 5 (Director-directed, out-of-band)

**Trigger:** Director design critique — the C1–C18 measurement layer was
never going to catch "which panel is the point," "why is the nav this
loud," or "why do all cards look equally important." Four priorities
given, ranked: (1) nav decompression, (2) per-slide single focal point,
(3) three-tier card system, (4) typography law. Interrupted the slide-by-
slide sequence to do the cross-cutting groundwork first — `docs/qa/DESIGN_LAW.md`
authored (card tiers + typography scale, formalizing what already existed
ad hoc rather than inventing new tokens).

**Priority 1 — nav decompression, applied globally (not slide-scoped):**
`NAV_SECTIONS`' `label` split into `code` (S0–S7, always visible,
`text-ink-subtle`) and `name` (full descriptive text, shown only inside
the active pill). Resting items now read as location markers, not a table
of contents competing with slide content. Screenshotted before/after —
dramatic reduction in header noise. `aria-label` preserves the full name
for screen readers regardless of active state, so nothing was lost for
accessibility despite the code-only resting display.

**Priority 3 — worked example, S03-patterns:** applied the 3-tier system
to the Director's own cited case. See `docs/qa/SHOT_SPECS.md` S03-patterns.

**Priority 2/4 — not done this iteration:** per-slide focal-point
declarations exist for S00/S01/S03 (filled Shot Specs) but not yet for
S02/S04–S07. Typography law is documented but not yet audited against the
51 measured signatures in `docs/audit/DESIGN_APPLICATION.md` for
convergence — logged as explicit follow-up, not silently deferred.

tsc clean, build passes, audit pipeline diff-reproducible (only line-number
shifts in `NUMERIC_CLAIMS.md` from an added comment — all 22 claim IDs/
statuses/values diffed and confirmed unchanged).

**Next slide:** resume sequence at `S02-pipeline`, now informed by
`docs/qa/DESIGN_LAW.md` (declare tier + focal point in its Shot Spec before
touching it).

---

## 2026-08-17 21:xx — Iteration 6 (loop)

**Trigger:** scheduled fallback. PR #13 (nav decompression + S03 tiers)
merged mid-wait — verified production CSS hash matches a fresh local
build from `main` exactly before starting new work.

**Slide worked:** `S02-pipeline`. 3 shots (1440×default, 1440×step4-
clicked, 390×default).

**Found:** nothing to fix — first genuine pass in this whole exercise.
Step 2 already wins first look unambiguously (permanent accent fill +
"GAP ORIGIN" badge, text label agrees), and the click-vs-content-flag
dual-signal design (outline for "currently inspecting" vs. fill for
"this is where the finding says the gap is") already resolves what could
have been a Priority-2 focal-point conflict. Logged as a positive result,
not skipped — see `docs/qa/SHOT_SPECS.md` S02-pipeline for the full
reasoning, including why this is useful evidence that the tier/focal
system is a real bar (something can pass it) rather than a rule that
always finds something to change.

**Fixed:** nothing. No commit this iteration — docs-only update
(Shot Spec + this log entry).

**Next slide:** `S04-burden` (`OccupationSection`) — the section whose
"Social Science" card was the original precedent for the tier-1 border
treatment; worth checking whether *its* two-column layout has the same
dual-focal-point risk S03 had before the tier system existed.

---
