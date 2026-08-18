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

**BOTTLENECK resolved:** PR #14 (`qa/loop-iteration-6`, the only source
for S02-pipeline's QA record) closed as superseded by #20 — its content
recovered and folded into this file + `SHOT_SPECS.md` at the correct
historical position (see the recovered Iteration 6 entry above).

### Iteration 13 (S02-pipeline) — PASS reconfirmed, no fix

Fresh Playwright re-verification of the 2026-08-17 PASS: `aria-pressed`
+ class inspection confirms the fill(step2)-vs-outline(clicked-step)
distinction holds exactly as designed. Zero overflow at 390px.

**Content-integrity flag (logged, not fixed):** pre-figure copy says
"AI 입력 파이프라인의 4단계" and names exactly 4 stages, but the figure
directly below shows 5 numbered steps. Possibly intentional (4단계 =
narrower encoding-only sub-pipeline), possibly a stale count — needs
content-owner confirmation, not a visual-pass judgment call. Full detail
in `docs/qa/SHOT_SPECS.md` S02-pipeline.

### Iteration 14 (S03-patterns) — frozen, no change

Per the editorial redline directive, Tier-1 headline visual weight stays
frozen pending D1. Checked 390px for non-D1-adjacent defects: none (the
"Domain Range" row's 2-line wrap is ordinary, not a defect). Logged a
supplementary numeric observation for D1 (prose contains a third figure,
`1.38×`, for the same claim the headline states as `1.29×~1.83×`) —
not filed as a new ledger row, just noted for whoever resolves D1. Full
detail in `docs/qa/SHOT_SPECS.md` S03-patterns.

### Iteration 15 (S04-burden) — 4 fixes, Korean word-break only

Screened the redline directive's "reduce preset count" candidate; no
rendering evidence found to justify cutting functionality (5 presets fit
one row cleanly at 390px), left as-is. Instead found and fixed 4 Korean
mid-word-break instances (`break-keep` missing on elements this widget
never routed through the shared `ArticleSubheading` fix): the
token-receipt label, the absolute-gap label, and both occupation-card
assessment paragraphs. Zero content change. Full detail in
`docs/qa/SHOT_SPECS.md` S04-burden.

### Iteration 16 (S04.5-languages) — 1 fix, Korean word-break

Same bug class as Iteration 15: the Hangul-callout box's "1.78배" was
splitting across lines at 390px. Fixed with `break-keep`. The "12개
언어"/Hindi content-integrity flag (LOOP_LOG Iteration 8, `SHOT_SPECS.md`
S04.5 finding #7) remains open and untouched — not a visual-pass call.

### Iteration 17 (S05-infrastructure) — PASS, no fix

Specifically screened for the S04/S04.5 word-break bug class (raw
Korean `<p>`/`<div>` text) — this slide's two candidates both fit their
container without breaking mid-word. 0 overflow. Interaction count
reconfirmed at 0 (static, matches spec). A genuine clean result.

### Iteration 18 (S05.2-impact) — 3 fixes, 1 of them shared-component

Two local Korean word-break fixes (Level 02 "장문", Level 03 "표현").
**Third fix has site-wide reach:** `ArticleFigureCaption` itself (used
by 7 widgets) had no `break-keep` — its FIG. 08 caption was splitting
"사슬". Fixing the shared component retroactively protects every
already-passed slide's figure caption; not individually re-verified
per slide since the fix is structural. Full detail in
`docs/qa/SHOT_SPECS.md` S05.2-impact.

### Iteration 19 (S06-method) — 4 fixes, Korean word-break only

Most instances in one pass this session: 3 of the 6 boundary-box claims
broke mid-word/mid-particle ("떨어진다고", "비용을", "토큰을"), one
`break-keep` on the shared claim className fixes all 6; the accordion
panel body ("의도를"); footnote #3 ("일상"). All raw elements outside
the shared Article components. Zero content change. Full detail in
`docs/qa/SHOT_SPECS.md` S06-method.

With this iteration, every slide S00–S06 has been screened this phase;
S07-result remains.

### Iteration 20 (S07-result) — 1 fix, Korean word-break only

The pull-quote `<p>` was splitting "다국어" and "형평성과" mid-word at
390px. Fixed with `break-keep`. **H2, lead, and the protected
`1.29×~1.83×` range explicitly untouched** — confirmed byte-identical,
no authority in this pass to alter them (see `docs/qa/SHOT_SPECS.md`
S07-result's own note on this). Full detail there.

**Phase 7 status: every slide in the Director's work order (S00-hero
through S07-result, 10 slides) has now received a visual devpass this
session (2026-08-18).** Summary across iterations 11-20: 6 slides got
real fixes (S00, S04, S04.5, S05.2, S06, S07 — mostly the Korean
`break-keep` bug class, 12 instances total across the site, plus one
structural fix in the shared `ArticleFigureCaption` component covering
7 widgets retroactively); 3 slides verified clean with tightened
re-screening (S01, S05, and S02's re-verification); S03 stays frozen
pending D1. One git bottleneck resolved (PR #14 recovered and
superseded by #20). Two content-integrity flags remain open and
untouched (S02's "4단계"/5-step mismatch, S04.5's "12개 언어"/Hindi
mismatch) — both logged for the content owner, neither silently
resolved. No PROTECTED research content, numeric claim, or H2/conclusion
strength was altered anywhere in this phase.

---

## Phase 8: Human Preview 01 (Director annotated-screenshot review, long-run loop)

**Trigger:** Director conducted a first Human Preview 2026-08-18 against
the production-promoted state (`894dcd8`, PR #21 tip — not `main`),
producing 10 annotated screenshots (`AUDIT2/S0.png`–`S9 _ 결론.png`) plus
verbal directive intent. Full reconciliation SSOT:
`docs/editorial/HUMAN_PREVIEW_01_MASTER.md`. Working branch:
`editorial/human-preview-01` (forked from `894dcd8`), PR #22.

### HP01 Iteration 1

Timestamp: 2026-08-18
Branch: `editorial/human-preview-01`
HEAD (before): `894dcd8`
origin/main: `ceb7b4e`
Production SHA: `894dcd8` (== this branch's fork point)
PR: #22

Image: `S0.png`
Nav: S0
DOM: `hero`
Trace prefix: `HERO`
Component: `NewsHeroSection.tsx` (+ `ArticleElements.tsx` for the
`ArticleBigFinding` shared component)

Directive IDs: `HP01-S0-R01`, `HP01-S0-R02`, `HP01-S0-R03`, `HP01-S0-R04`,
`HP01-S0-B01`

Before: top metadata bar carried "Data Journalism Investigation" and
"COVER & CORE THESIS" as decorative English; FIG.01 exhibit header read
"REAL TOKEN SPLIT EXHIBIT" (English); a 3-item `ANALYSIS TARGET`/
`CORE METRIC`/`OBSERVED GAP` stat-ribbon table sat under the deck
paragraph; the intro's `ArticleBigFinding` number ("약 1.2×~1.8×")
rendered at `text-6xl…text-9xl`, sprawling across the block.

Director intent: RED (R01-R04) — remove dashboard-y English micro-copy
and the stat-ribbon table entirely; BLUE (B01) — shrink and compact the
big-number display ("글씨줄여서 병렬로").

Patch:
- `NewsHeroSection.tsx`: removed the `COVER & CORE THESIS` div; Koreanized
  "Data Journalism Investigation" → "데이터 저널리즘"; removed the
  3-item stat ribbon; FIG.01 header → "FIG. 01 · 실제 토큰 분절 비교"
  (KO) / kept English in EN mode; "Pair Benchmark" → "문장쌍 비교" (KO).
- `ArticleElements.tsx`: `ArticleBigFinding`'s number display
  `text-6xl sm:text-8xl lg:text-9xl` → `text-5xl sm:text-6xl lg:text-7xl`
  + `whitespace-nowrap`, `leading-none` → `leading-tight`.

Research-content impact: NONE. All changes are hardcoded JSX label text
or pure CSS sizing — no `entities/*` value touched.

Verification:
- lint: PASS (`tsc --noEmit`)
- build: PASS
- 1440 KO: PASS (screenshot)
- 1440 EN: PASS (screenshot, 0 overflow)
- 390 KO: PASS (0 overflow)
- 390 EN: not separately shot this iteration (1440 EN + 390 KO both
  clean; low risk given no new wrapping-sensitive text introduced) — will
  confirm in a later regression pass before whole-Human-Preview
  acceptance
- interaction: n/a (no interactive elements touched)

Result: ACCEPTED (4 of 5 directives; `HP01-S0-R05` deferred, see below)

Commit: (this commit)
Preview URL: pending Vercel build on push

Next: `HP01-S1-R01` (S1/compare — text-CTA phrasing) or continue S0 with
`HP01-S0-R05` once S7 coordination is resolved, per priority order (S0
before S1). Choosing to move to S1 now and return to `HP01-S0-R05`
alongside the S7 pass, since it's explicitly a cross-slide dependency
not a blocker for the rest of S0/S1.

**Deferred:** `HP01-S0-R05` — FIG.01 exhibit's takeaway/news-note content
flagged as belonging in the conclusion. Not `BLOCKED_*` (no missing
evidence or authority question) — just sequenced after S7's own
directives are read, since moving content requires knowing the target
shape first. Tracked in MASTER §F, not silently dropped.

### HP01 Iteration 2

Image: `S1.png` · Nav: S1 · DOM: `compare` · Trace: `CMP` ·
Component: `TokenCompareSection.tsx` (+ `entities/article-content` for
one CTA sentence)

Directive IDs: `HP01-S1-R01`, `HP01-S1-R02`, `HP01-S1-R03`,
`HP01-S1-R04` (already satisfied), `HP01-S1-R05`, `HP01-S1-R06`

Patch:
- `entities/article-content/content/article-content.ts` (`realSentences`):
  CTA sentence ending "…직접 비교해보십시오." → "…직접 비교한다."
- `TokenCompareSection.tsx`: KO-mode column headers `한국어 (Hangul
  Script)` → `한국어`, `ENGLISH (Latin Script)` → `영어` (both now
  `isKo`-gated; previously hardcoded regardless of language). Bottom
  observation line → Korean "토큰 비율 N× (+M개 토큰)" in KO mode.

Research-content impact: the CTA sentence edit touches
`entities/article-content`, but is pure editorial microcopy (a CTA verb
ending), not a numeric/methodology/protected value — logged per the
project's standing rule that content edits need traceability, not that
they're forbidden.

Verification: lint PASS, build PASS, 1440×KO PASS (0 overflow), 1440×EN
PASS (0 overflow, confirmed unaffected by `isKo` gating). 390 not yet
shot this iteration — will confirm in the pre-acceptance regression pass.

Result: ACCEPTED (5 of 6 directives; R04 was already satisfied, not a
new change)

Next: S2/pipeline — directives already exist in the original prompt
text (`HP01-S2-R01`–`R04`, `B01`–`B03`); apply directly.

### HP01 Iteration 3

Image: `S2.png` (+ `S0.png` clusters 3-4, corroborating) · Nav: S2 ·
DOM: `pipeline` · Trace: `PIPE` · Component: `PipelineSection.tsx`
(+ `ArticleElements.tsx` new shared component, +
`entities/article-content` for one figure caption)

Directive IDs: `HP01-S2-R01`, `R02`, `R04`, `B01`, `B02`, `B03` closed;
`R03` stays `BLOCKED_CONTENT_AUTHORITY`

Before → After (exact):
- Removed `<dl>` row: `TRANSFORMER PIPELINE SEQUENCING` /
  `★ STEP 02: THE BOTTLENECK` — deleted, not translated.
- Removed the `GAP ORIGIN` badge on step 2's card. Step 2's `bg-accent`
  fill (`item.highlight`-driven) untouched.
- `tokenUnit.figureCaption.ko`: `"생성형 AI 텍스트 처리 파이프라인:
  원본 문자열에서 토큰 ID 벡터로의 변환"` → `"문장이 토큰으로 바뀌는
  과정"`. `figureSource` unchanged (G06 — keep real provenance).
- Added `ArticleDisclosure` (new shared `<details>`-based 2DEPTH
  component, `ArticleElements.tsx`) — the project's first reusable
  2DEPTH primitive.
- Reordered post-figure column: `ArticleFinding` now renders first
  (1DEPTH takeaway), `postFigureParagraphs` (BPE-step list +
  Self-Attention/Context-Window paragraph) moved inside
  `<ArticleDisclosure summary="토큰화 처리 과정 자세히 보기">` — text
  itself unchanged, only relocated behind a reveal.

Research-content impact: NONE. `PIPELINE_STEPS` entity data and the
relocated paragraph text are byte-identical; only the figure caption
(editorial prose, not a research value) was reworded.

Verification: lint PASS, build PASS, 1440×KO PASS (0 overflow, step 2
still wins first look, disclosure opens/closes correctly). 390/EN
regression deferred to the pre-acceptance sweep.

Result: ACCEPTED (6 of 7; R03 correctly stays blocked)

Next: S3/patterns — apply `HP01-S3-R01/R02/R03/R05/R06/R07`, `B01`;
`R04` stays blocked (D1).

### HP01 Iteration 4

Image: `S3.png` · Nav: S3 · DOM: `patterns` · Trace: `PREM` ·
Component: `TokenPremiumSection.tsx` (+ `entities/article-content` for
one paragraph)

Directive IDs: `R01`, `R02`/`B01`, `R05`, `R06`, `R07` closed; `R04`
stays `BLOCKED_CONTENT_AUTHORITY` (D1)

Before → After (exact, all `isKo`-gated):
- `CORE EMPIRICAL METRIC` → `핵심 실측 지표`
- `OBSERVED TOKEN PREMIUM RATIO` → `관측된 토큰 프리미엄 비율` (number
  `1.29×~1.83×` untouched)
- `MATHEMATICAL FORMULA` → `산출 공식`
- `Token Premium = Tokens(Hangul) / Tokens(English)` → `Token Premium =
  한국어 토큰 수 ÷ 영어 토큰 수`
- `DOMAIN DISTRIBUTION EXHIBIT` → `도메인별 분포`
- `corpusAnalysis.postFigureParagraphs.ko`: "특히 장문의 고유명사와
  정형화된 서식 비중이 높은 지식집약적 도메인일수록, 토큰 수의 절대적
  격차가 누적되어 컨텍스트 윈도우 점유율에 실질적인 제약을 가져옵니다."
  → "특히 전문 용어와 격식체 표현이 많은 지식집약적 문서일수록 토큰 수
  격차가 쌓여, AI가 한 번에 처리할 수 있는 분량(컨텍스트 윈도우)에
  실질적인 제약이 생깁니다."

Research-content impact: NONE — every ratio/percentage byte-identical,
confirmed via DOM text-scan post-edit. D1 (`R04`) untouched.

Verification: lint PASS, build PASS, 1440×KO PASS (0 overflow, all
protected numbers present and unchanged).

Result: ACCEPTED (6 of 7; R04 correctly stays blocked)

Next: S4/burden — apply `HP01-S4-R01/R02/R03/R04`; `B01` (simulator
promotion) and `B03` (typography); `B02` (pricing multiplier) stays
`BLOCKED_EVIDENCE`.

---
