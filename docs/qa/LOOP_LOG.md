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

**Recovered 2026-08-18** from `qa/loop-iteration-6` (PR #14, never merged
— main's `docs/qa/SHOT_SPECS.md`/`LOOP_LOG.md` were missing this entry
entirely; folded in now as a docs-only recovery so the record is complete,
content unchanged from the original branch, only this recovery note added).

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

## 2026-08-17 21:xx — Iteration 7 (Director redline pass, S00)

**Trigger:** Director gave a full slide-by-slide redline table (all 10
headlines) plus a directive: "다음 루프는 0번 커버부터 1장씩 redline 방식으로
들어가는 게 가장 맞습니다." Sequence resets to redline order starting at
S00, superseding the prior generic Shot Spec queue order.

**Slide worked:** `S00-hero`, per the Director's specific 3-part redline
("커버는 논지 선고처럼," heavier left title, quieter right evidence box,
bottom explanation compressed to ≤2 paragraphs). See `docs/qa/SHOT_SPECS.md`
S00-hero for the full writeup.

**Fixed:** H1 weight (extrabold, cover-only exception, logged in
`docs/qa/DESIGN_LAW.md`), FIG.01 card border removed, `introTheQuestion`
preFigureParagraphs merged 3→2 (verbatim sentences, no invented text).
Verified both languages, both a mid-turn transcript artifact and the
actual file state — ground truth confirmed clean via direct file read
after the edit.

**Note on a false alarm:** a mid-turn system message appeared to show a
duplicated/corrupted version of the paragraph-merge edit (4 entries
instead of 2). Did not trust it — re-read the actual file directly, which
showed the correct 2-paragraph merge, matching the already-verified build
and screenshots. Recorded so any future review of this session's
transcript isn't confused by that artifact.

**Next:** Director additionally gave a full 5-point redline for `S07-result`
(`EditorialConclusionSection`) in the same message — repeated-question
opening line, paragraph compression, quieter pull-quote, receding footer/
CTA button, tighter headline-to-body gap. Executing next, same turn.

---

## 2026-08-17 22:xx — Iteration 8 (orchestrated screening + fix, S04.5+S04)

**Numbering note:** `S03-patterns`' redline pass 2 (69,432/1.29×~1.83×
evidence-lineage work, domain-list tabular-nums restyle) and `S07-result`'s
full 5-point redline (both promised in Iteration 7's "Next") were completed
and documented in `docs/qa/SHOT_SPECS.md` but not separately logged here.
This entry resumes the rollback-log sequence at the next fresh batch of work.

**Trigger:** Director's explicit process directive — stop fixed 10-minute
polling, react to actual preview/production trigger events instead; use an
orchestrator with role-divided read-only subagents to screen slides against
the Director's brief, then synthesize and apply the actual fixes directly.
Followed immediately by a direct challenge when the screening-only phase
completed: "근데 스크리닝을 하는데, 너가 수정을 안하고 디버깅을 안하면 뭐
어떻게하니" — i.e. screening without fixing is worthless; this iteration is
the fix phase in direct response to that challenge.

**Method:** ran a `Workflow` with two parallel read-only diagnostic
subagents (`screen:languages` for `S04.5-languages`, `screen:burden` for
`S04-burden`), each given the Director's per-slide brief, the global
redline rules, and explicit frozen-value guard instructions. Read both
full structured reports, then performed all fixes myself — no subagent
was given edit access.

**Slides worked:** `S04.5-languages` (`MultilingualTokenEfficiencySection`)
and `S04-burden` (`OccupationSection`). Full findings and fixes for both
are written up in `docs/qa/SHOT_SPECS.md`.

**Fixed:** a real chart color-encoding bug (selected language's bar no
longer stays permanently pinned to Korean's dark fill), a hardcoded-Korean
legend now reading live from the selected entity item, multiple bilingual-
completeness gaps across both sections, a Korean word-break bug in the
shared `ArticleSubheading` component, Design Law tier corrections (Tier-1/
Tier-3 promotions/demotions on 3 panels), an accent-color-protagonist
violation (5 concurrent `bg-accent` elements in `#burden` down to 1), a
547px headline-to-widget gap (redundant subheading removed on both
slides), and a mobile scale-legend crowding issue (layout-only, frozen
strings untouched).

**Trace-ledger consequence (expected, resolved):** the i18n/rendering
fixes changed 3 nodes' literal text, which changed their identity keys and
issued new Trace IDs (`LANG-019`→`LANG-051`, `LANG-031`→`LANG-053`;
`LANG-032` retired — resolved to a live entity read, not reassigned).
`docs/audit/DIRECTOR_DECISIONS.md` and `docs/audit/README.md` updated to
cite the current IDs/lines; `check-citations.mjs` clean on re-run. No
research figure, estimand, or frozen numeric claim was touched — only
ownership/rendering of already-correct values.

**Deliberately NOT fixed:** a content-integrity mismatch in
`multilingualBenchmark` copy (mentions "12개 언어"/Hindi; the entity backing
the chart, `MULTILINGUAL_COMPARISON_DATA`, has only 5 entries and no
Hindi row). This is a copy-accuracy question for the content owner, not a
visual QA fix — flagged, not silently corrected.

Verified: tsc clean, `npm run build` clean, `node docs/audit/tools/
run-pipeline.mjs` diff-reproducible after the ID/line resync (director
queue unchanged at 16), Playwright real-interaction checks (nav click +
chip click, not just static screenshots) confirmed the color-encoding fix,
the dynamic legend, EN translations, and the mobile legend's `flex-col`
stacking all work as intended.

---

## 2026-08-17 22:xx — Iteration 9 (orchestrated screening + fix, S04-detail+S05+S06)

**Trigger:** continuation of the same event-driven directive as Iteration 8.
After S04.5-languages and S04-burden landed (pushed to PR #16), the
Director's 3차 루프 (items 6→7→8: burden-comparison detail card dominance,
S05-infrastructure system-diagram feel, S06-method boundary-panel-as-hero)
was next in the work order. Ran a second `Workflow` with 3 parallel
read-only subagents (`screen:burden-detail`, `screen:infrastructure`,
`screen:method`), read all 3 full structured reports, then performed every
fix myself — same synthesize-then-fix discipline as Iteration 8.

**Slides worked:** `#burden` (follow-up pass, `OccupationSection.tsx`),
`S05-infrastructure` (`KoreaAIContextSection.tsx`), `S06-method`
(`MethodSection.tsx`). Full findings and fixes for all three are written
up in `docs/qa/SHOT_SPECS.md`.

**Fixed:**
- **Burden follow-up:** the slide-level dominance fix from Iteration 8 held
  (simulator still wins first glance), but the two occupational-comparison
  cards had an internal rank inversion — Engineering read as a footnote,
  Social Science as the real finding, via 4 compounding asymmetries (card
  tier, footer weight, data-field ink tone, an exclusive "HIGH BURDEN
  POTENTIAL" badge). Unified both cards to the same Tier-2 signature and
  weight; removed the exclusive badge rather than inventing a new label
  for its counterpart (redundant editorializing, and inventing copy isn't
  this pass's call).
- **S05-infrastructure:** the core brief — added actual diagrammatic
  connective tissue (CSS arrow pseudo-elements between the 4 phase cards,
  a downward bridge into the policy-slot grid) so the slide reads as a
  causal chain rather than 4 unrelated cards; removed a `bg-accent` color
  fill that was being used as an ad-hoc tiering signal on Phase 04 (Design
  Law violation — accent is reserved for selection/nav, tiering is
  border/shadow only) and replaced it with a proper Tier-1 border/shadow
  treatment; fixed a mobile header-wrap interleaving bug; removed a dead
  empty `ArticleSubheading` node (entity has no `subheading` field for
  this section).
- **S06-method:** promoted the "what we do NOT claim" boundary panel from
  an ad-hoc Tier-3-plus-shadow hybrid to genuine Tier-1 and bumped its
  title scale, so it reads as the slide's hero rather than a footnote
  under the methodology accordion; removed 6 decorative `bg-accent`
  bullet dots (down to the H2 underline as the slide's sole accent
  element, from 7 concurrent accent marks); fixed a mobile alignment bug
  where the "6 Key Principles" count floated mid-wrap against the panel's
  title. `METH-008` (hardcoded principle count) flagged per D4, not
  changed — only its ink tone was nudged one step darker as a pure color
  change now that the panel around it carries more weight.

**Verified:** tsc clean, `npm run build` clean, `node docs/audit/tools/
run-pipeline.mjs` diff-reproducible with no ID churn this time (all
changes were element removal/tier/color, not literal-text changes —
director queue unchanged at 16), and a second live Playwright verification
pass confirmed every fix by DOM measurement (not just source reading):
0 remaining `bg-accent` elements in `#infrastructure`/`#method`, Phase 04
and the boundary panel both compute `border-width: 2px` + a real box-
shadow, both burden-comparison footers compute identical `font-weight:
400`, the arrow pseudo-element's `content` actually resolves to `"→"` in
the compiled CSS.

---

## 2026-08-17 22:xx — Iteration 10 (orchestrated screening + fix, S05.2-impact — work order complete)

**Trigger:** between Iteration 9 landing and PR #16 merging, checked which
slides in the Director's full redline work order (S00-S09, nav order:
hero, compare, pipeline, patterns, burden, languages, infrastructure,
impact, method, result) had not yet received a dedicated pass —
`#impact` (S05.2) was the one gap. Ran a single-agent `Workflow`
(`screen:impact`) against it, then fixed directly.

**Interleaved event:** PR #16 (Iterations 8+9) merged to main mid-way
through this screening pass. Verified production immediately: built a
fresh `dist/` from a `git worktree` at the merge commit (`f191445`) and
diffed its asset hashes against what `https://tokenization-premiun-koen-
front.vercel.app/` was actually serving — exact match
(`index-03amukyS.css`, `index-M5uIaL3-.js`). Also found and stopped a
duplicate `main`-watching Monitor (`beiul3ycv`) that had survived from
before a context compaction earlier in the session, alongside the
freshly-armed one (`bqf7eza15`) — both fired for the same merge; kept
the latter as the sole watcher going forward.

**Slide worked:** `S05.2-impact` (`ImpactSection.tsx`). Full findings and
fixes are written up in `docs/qa/SHOT_SPECS.md`.

**Fixed:** the same `bg-accent`-as-tiering anti-pattern already caught on
S05-infrastructure's Phase 04 (3 concurrent accent elements here — a
highlighted level card plus 2 causal-chain chips), leaving the slide with
no actual Tier-1 panel even though its own copy names a clear conclusion
(the causal-chain box, eyebrow "FINAL CONCEPTUAL CAUSAL CHAIN"). Removed
the color-fill highlight from the 3-level grid (now uniformly Tier-2, since
it's a 3-stage build-up, not one-vs-two), promoted the causal-chain box to
Tier-1, and re-expressed the 2 emphasis chips via border-weight/text-weight
instead of color. Deleted a hardcoded Korean-only h3 duplicating an
already-bilingual figure caption rendered right below it (fixed the
bilingual gap by removing redundant content rather than inventing a new
entity field). Fixed a shared-component bug (`ArticleFigureCaption`'s
`figNum` span had no `shrink-0`/`whitespace-nowrap`, so "FIG. 08" itself
broke mid-token at 390px) — a site-wide, low-risk fix.

**Work order status:** with this slide done, every section in the
Director's redline work order (S00-hero through S07-result) has now
received a dedicated pass this session. Remaining open items are D3/D4
Director-decision questions (not visual QA) and the flagged Hindi/
"12-language" content-integrity mismatch from Iteration 8 — both logged,
neither silently resolved.

**Verified:** tsc clean, `npm run build` clean, audit pipeline diff-
reproducible (director queue unchanged at 16, no ID churn — the h3
deletion removed a literal node rather than changing one), live
Playwright DOM measurement confirmed 0 remaining `bg-accent` in `#impact`,
the causal-chain box computing a real 2px border + shadow, the EN chain
header showing no residual Korean text, and the figNum span rendering as
one unbroken block at 390px.

---

## 2026-08-18 — Phase 7: Director-authorized continuous visual devpass (5-min loop, S00→S07 sequential)

**Trigger:** Director authorization (2026-08-18): proceed continuously
through every slide's remaining visual-only redline items from
`docs/qa` + the editorial redline directive, tightening scrutiny rather
than stopping on a clean pass ("검출값이 <3이하일경우, 더 조여서 잡아").
Content-level (copy/entity) changes are permitted this phase but must be
logged here with the same rigor as a visual change; anything touching a
PROTECTED/frozen value or an open `DIRECTOR_DECISIONS.md` row (D1–D4) is
logged as a **BOTTLENECK** below and skipped, not silently resolved.
Working branch: `visual-devpass/full-sweep` off `koen-front-origin/main`
(`5df1777`, PR #17 tip) — separate from any other session's branch to
avoid collision (multiple concurrent sessions observed on this repo this
session).

### Iteration 11 (S00-hero)

**Fixed:** FIG.01 exhibit card `dt` label tone: `text-ink font-bold` →
`text-ink-body font-semibold` — one register quieter, per the editorial
redline directive's "exhibit must read as illustrative, not co-equal to
H1" note. Values untouched (D2 remains open/frozen). Full detail in
`docs/qa/SHOT_SPECS.md` S00-hero.

**Verified:** tsc clean, build clean (CSS hash unchanged, JS hash
changed as expected), Playwright computed-style check at 1440×KO
confirms `--color-ink-body` applied correctly, H1 bounding box remains
dominant over the exhibit card's.

**BOTTLENECK (not fixed, logged only):** D2 (hero exhibit numbers
`31/18 TOKENS`, `1.72×` match no entity/sentence pair) remains open —
out of scope for this visual-only pass, requires Director ruling per
`DIRECTOR_DECISIONS.md`.

**Production verified:** PR #18 merged (`9ebe5dd`) mid-iteration;
worktree-build-and-hash-compare against production confirmed exact
match (`index-B0LeBmgl.js`, `index-03amukyS.css`).

### Iteration 12 (S01-compare) — PASS, no fix

Tightened re-screening (real per-viewport screenshots, EN 390 DOM
overflow scan, KO/EN weight-asymmetry check) found no defect. Full
detail in `docs/qa/SHOT_SPECS.md` S01-compare. A verified clean result,
not a skipped check.

---
