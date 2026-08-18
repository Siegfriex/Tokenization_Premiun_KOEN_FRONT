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

### HP01 Iteration 5

Image: `S4.png` · Nav: S4 · DOM: `burden` · Trace: `BURD` ·
Component: `OccupationSection.tsx` (+ `entities/article-content`)

Directive IDs: `R01`, `R02`, `R03`, `R04`, `B01`, `B03` closed; `B02`
stays `BLOCKED_EVIDENCE`

Biggest change this iteration: **removed the entire "Occupational
Cluster Analysis" block** (Engineering + Social Science comparison
cards, ~120 lines) — not translated, deleted outright per the RED
"삭제" annotation. `OCCUPATION_COMPARISON_DATA`/`getLocalizedText`/
icon imports removed as dead code; JS bundle 311.62KB → 302.52KB.
Simulator is now the breakout's sole content (B01 satisfied as a
consequence, no separate code change needed).

Before → After (labels, all `isKo`-gated): `WORKFLOW REPETITION
SIMULATOR`→`반복 사용 시뮬레이터`; `ACCUMULATED BURDEN GAP`→`누적 토큰
격차`; `TOKEN RECEIPT`→`토큰 사용 명세서`; full list in SHOT_SPECS.

Scale-legend: `1,000회 (팀 일간 워크플로우)` / `2,000회 (전사 에이전트
루틴)` → plain `1,000회` / `2,000회` (unsourced workload framing
removed).

Entity text, `accumulatedBurden`: `keyFinding.statement.ko`
"...기하급수적으로 누적되어..." → "...그대로 누적되어..." — **this
was a factual correction, not just style**: `totalGap =
tokenGapPerPrompt × promptCount` is linear, "기하급수적으로"
(exponentially) mischaracterized the actual math.

Research-content impact: `TOKEN_BASELINE_SIMULATION` untouched — prose
changes only, and the one entity edit corrects a math mischaracterization
rather than altering what's measured.

Verification: lint PASS, build PASS (bundle shrank), 1440×KO/EN PASS
(0 overflow both), occupation section confirmed fully removed via DOM
query, not just visually hidden.

Result: ACCEPTED (6 of 7; B02 correctly stays blocked)

Next: S4.5/languages — `HP01-S45-R01/R02/R04/R05`; `B01`. `B02` (Flores
paper) stays `BLOCKED_EVIDENCE`; `R03` ("12개 언어"/Hindi) stays a
pre-existing content-integrity flag, reconfirmed not resolved here.

### HP01 Iteration 6

Image: `S4.5.png` (S5.png in the source filename) · Nav: S4.5 · DOM:
`languages` · Trace: `LANG` · Component:
`MultilingualTokenEfficiencySection.tsx` (+ `entities/article-content`)

Directive IDs: `R02`, `R04`, `R05` closed; `R01` **partial** (see note
— label/prose fixes done, no new visual composition); `R03` correctly
untouched; `B02` stays `BLOCKED_EVIDENCE`

**`R01` honesty note:** the annotation shows this whole section
double-X-struck asking for "대규모 재디자인" (major redesign). This
iteration did the concrete sub-directives (labels, sentence removal,
register fix) but did NOT invent a new chart/card composition — no
replacement design was specified to build against, and that's original
design work beyond this pass's editorial-redline authority. Flagging
for Director follow-up rather than claiming full closure.

Before → After (labels, `isKo`-gated): `LANGUAGE FOCUS`/`Selected
Metric` → `선택된 언어` (merged to one label); `Normalized Tokens:` →
`정규화 토큰 수:`; `NORMALIZED TOKEN CONSUMPTION BY LANGUAGE` → `언어별
정규화 토큰 소비량`; chart `ReferenceLine`/tooltip text also
Koreanized — verified via SVG DOM text inspection, not screenshot alone
(small SVG text can look garbled in a raster capture even when correct).

Entity text: `postFigureParagraphs.ko` — **removed** the "다국어 AI
거버넌스와 소버린 파운데이션 모델" sentence entirely per the
annotation's explicit "논지는 안맞으므로 제거". This also fixed the
`~다`/`~습니다` register mix (R05) as a byproduct — the removed
sentence was the one in the mismatched register.
`keyFinding.statement.ko` — dropped the "...다국어 AI 거버넌스의
구조적 과제입니다" trailing clause ("구조적 과제" is a named item in
G09's ban list).

Research-content impact: NONE — every ratio (1.00×–2.30×, 1.5×~2.3×)
confirmed byte-identical. Both text removals are conclusion-framing
sentences, not measured values.

Verification: lint PASS, build PASS, 1440×KO/EN PASS (0 overflow both).

Result: ACCEPTED (5 of 6 fully; R01 partial, flagged for Director
follow-up, not silently claimed done)

Next: S5/infrastructure — `HP01-S5-R01/R02/R03/R04`. `B01` (source
strips) stays `BLOCKED_EVIDENCE` unless real citable sources surface.

### HP01 Iteration 7

**Mid-iteration:** a parallel/independent audit dropped 3 new documents
into `AUDIT2/QA/` (DOM-addressing execution overlay, runtime crawl
notes, source-hook index) — hashed into
`HUMAN_PREVIEW_01_SOURCE_MANIFEST.md`, reconciliation note added to
MASTER §A. No contradiction with this session's S0-S6 work; the
overlay's own independent crawl confirmed S2/S3 deployed correctly.
Stricter selector-based addressing protocol adopted from this iteration
onward.

Image: `S6.png` (source filename; = Nav S5) · Nav: S5 · DOM:
`infrastructure` · Trace: `INFRA` · Component: `KoreaAIContextSection.tsx`
(+ `entities/article-content`, `entities/article-content/content/macro-adoption-phases.ts`)

Directive IDs: `R01`, `R02`, `R03`, `R04` closed; `B01` stays
`BLOCKED_EVIDENCE`

**Also resolves a pre-existing bug, not just an HP01 item:**
`MACRO_ADOPTION_PHASES` was never `isKo`-gated (`name` always English,
`description` always Korean, regardless of UI language) — flagged since
`HANDOFF.md` §6.5 / `DIRECTOR_DECISIONS.md` D6 as waiting on an
editorial decision. HP01-S5-R02's explicit Koreanization directive is
that decision. Converted to `{ ko, en }`, component updated to read via
`isKo ?`. English descriptions newly written (factually equivalent to
existing Korean, no new claims) since none existed before.

Before → After (labels): `MACRO ADOPTION CAUSAL CHAIN` → `AI 확산의
흐름`; `Scale Dynamics` → `규모 변화`; phase names e.g. `AI Investment
↑` (shown both languages) → `{ko: 'AI 투자 확대', en: 'AI Investment'}`.

**Removed entirely:** the 3-card "Verified Policy & Investment Slots"
placeholder block (`[VERIFIED ... REQUIRED]` text), its section header,
and the now-orphaned bridge arrow. Dead imports cleaned up.

**Causal/exaggeration language removed** (both KO and EN):
`"기하급수적으로"` → `"지속적으로"`; the sentence directly implying
token-efficiency differences cause measurable national power-consumption
impact → reframed as "a factor to weigh together"; figure caption's
`"인과 사슬"` (causal chain) phrase → removed, caption rewritten to
match the new content (no more policy slots).

Verification: lint PASS, build PASS. Document-level scroll confirmed
clean (0) at 1440/390 both languages; a naive per-element overflow scan
flagged 3 phase-card `LI`s, traced to a pre-existing, unmodified
decorative connector-arrow pseudo-element — confirmed harmless via
`git diff` (untouched) and document-level measurement, not a
regression.

Result: ACCEPTED (5 of 5; B01 correctly stays blocked)

Next: S5.2/impact — `HP01-S52-R01/R02/R03/R04`, `B01`/`B02`. Following
the new DOM-addressing overlay: add `data-hp01-id="impact-levels"` and
`data-hp01-id="impact-pathway"` hooks first if the 3-card dashboard and
causal-chain box need independent targeting beyond their existing
`data-collection` attributes.

### Mid-loop protocol shift — Director v2.1 directive + Acceptance Metrics document

A second new document, `AUDIT2/QA/Human Preview 01 — Slide Acceptance
Metrics and Crawl QA Protocol.md`, arrived alongside a live Director
instruction ("HUMAN PREVIEW 01 — FIXED-MAP EXECUTION & PLAYWRIGHT QA
LOOP v2.1"). Reprioritized per that instruction: **verify-before-
reimplement** for already-merged slides using the new `S*-M*` metrics
as literal test specifications, not just narrative QA. New priority
order: P0 S4 verification, P1 S4.5 redesign closure, P2 S5
verification, P3-P6 S5.2/S6/S7/regression sweep.

### P0 — S4-burden Evidence Packet (verification only, no code change)

**Current State:** branch `editorial/human-preview-01`, HEAD = `c556279`
(== `origin/main`), HP01 IDs `HP01-S4-R01-R04,B01,B03`.

**Target Proof:** `section#burden[data-widget="OccupationSection"]` = 1
match; `[data-collection="iteration-presets"] button` = 5;
`input[type="range"]` = 1.

**Metric Results (against live production):**
```
S4-M01 PASS  (root=1, presets=5, range=1)
S4-M02 PASS  (10x and 1000x preset clicks both changed rendered totals)
S4-M03 PASS  (OCCUPATIONAL SENSITIVITY COMPARISON wrapper absent;
              engineering-occupations / socialscience-occupations
              collections absent)
S4-M04 PASS  (팀 일간 워크플로우 / 전사 에이전트 루틴 both absent)
S4-M05 PASS  (기하급수 string absent)
S4-M06 PASS  (TOKEN GAP / ACCUMULATED BURDEN GAP / WORKFLOW REPETITION
              SIMULATOR all absent; Korean title 반복 사용 시뮬레이터
              present)
S4-M07 BLOCKED_EVIDENCE (no price/unit-cost input present — correct,
              not a failure per the metric's own conditional rule)
S4-M08 PASS  (visual: simulator is the sole breakout content, already
              confirmed via screenshot in Iteration 5)
```

**Verdict: PASS.** No code change made — implementation already
correct. Evidence level E4 (deployed DOM verification + interaction
results + this record).

### P1 — S4.5-languages Evidence Packet (redesign closure)

**Current State:** same branch/HEAD. HP01 IDs `HP01-S45-R01` (closing
the PARTIAL from Iteration 6), `S45-M01-M07`.

**Target Proof (before):** root = 1; `.border-2.border-rule-strong`
inside `#languages` = **2** (stat card + chart panel — this is the
concrete evidence the composition was still two competing panels, not
one visual).

**Metric Results — before redesign (production):**
```
S45-M01 PASS (root=1) but composition-count=2 (see above)
S45-M02 BLOCKED_CONTENT_AUTHORITY (12개 언어/힌디어 mentions present —
              pre-existing flag, unchanged)
S45-M03 PASS (governance/sovereign conclusion sentence already absent,
              closed in Iteration 6)
S45-M04 FAIL (two competing bordered panels, confirmed by direct count)
S45-M05 PASS (chip count=5, interaction changes state)
```
**→ Per the v2.1 directive's explicit rule, S45-M04 failing on a
count-based composition check means R01 cannot close on label work
alone. Proceeded to a real composition redesign, scoped to
`MultilingualTokenEfficiencySection.tsx` only, using the existing 5
verified `MULTILINGUAL_COMPARISON_DATA` entries — no new language,
ratio, or source.**

**Change Boundary:** `MultilingualTokenEfficiencySection.tsx` only
(merged the 4/8-col two-panel grid into one bordered panel; moved the
selected-language stat readout into the panel's own header line; moved
the chart, language chips, conditional callout, and legend inside the
same panel). No shared component (`ArticleElements.tsx`), no entity
data, no other section touched.

**Metric Results — after redesign (local build):**
```
S45-M01 PASS (root=1, main-panel-count=1)
S45-M02 BLOCKED_CONTENT_AUTHORITY (unchanged, correctly not resolved)
S45-M03 PASS (reconfirmed)
S45-M04 now addressable — one visual, Korean bar immediately legible
S45-M05 PASS (English chip then Arabic chip both changed state)
S45-M06 PASS (reconfirmed, closed Iteration 6)
S45-M07 BLOCKED_EVIDENCE (unchanged, no Flores paper located)
```

**Behavior Proof:** chip click (English) → header readout + legend +
highlighted bar all updated to English; chip click (Arabic) → same,
updated to Arabic. No blank/stale state observed.

**Evidence Safety:** no protected numeric/research value changed; no
new source/language/citation invented; both open blockers (`S45-M02`,
`S45-M07`) explicitly named, not silently resolved.

**Commands:** `npm run lint` PASS; `npm run build` PASS (bundle
297.53KB, down slightly from removing one wrapper `div`); Playwright
metric checks PASS as listed above.

**Gate: `CONDITIONAL PASS`** (all mandatory gates pass; `S45-M02` and
`S45-M07` remain correctly `BLOCKED_*`).

**Decision Required:** none for this slide — both blocks require
external inputs (a content-owner ruling on "12개 언어"/Hindi, and
locating the Flores paper), not a Director judgment call available
right now.

Next: P2 — S5-infrastructure verification (already implemented in
Iteration 7; verify against `S5-M01-M07` before assuming correctness,
per the same protocol).

### P2 — S5-infrastructure Evidence Packet (verification only, no code change)

Against production (`c556279`): `S5-M01` PASS (root=1, phase count=4);
`S5-M02` PASS (no causal-chain wording in any form); `S5-M03` PASS (no
English phase labels); `S5-M04` PASS (placeholder collection count=0,
`REQUIRED`/`SAMSUNG`/`SK` all absent); `S5-M05` PASS (no
investment→TP or TP→power causal phrasing detected). `S5-M06`
correctly `BLOCKED_EVIDENCE` (zero new source strips, as documented).
`S5-M07` visual PASS (confirmed via Iteration 7 screenshot — single
context visual, no competing business detail).

**Verdict: PASS.** No code change. Evidence level E4.

Next: P3 — S5.2/impact, `HP01-S52-R01-R04`, `B01`/`B02` — genuine new
work, following the same metrics-first discipline (`S52-M01-M06`).

### P3 — S5.2-impact Evidence Packet (structural redesign)

**Target Proof:** `section#impact[data-widget="ImpactSection"]` = 1;
`[data-collection="impact-scale-levels"] li` = 3;
`[data-collection="impact-causal-chain"] li` = 6.

**Change Boundary:** `ImpactSection.tsx`,
`entities/article-content/content/impact-scale-levels.ts`, one
`figureCaption`/`keyFinding` string pair in `article-content.ts`. No
shared component touched.

Before → After:
- `IMPACT_SCALE_LEVELS[].levelBadge` field (`PROMPT LEVEL`/`WORKFLOW
  LEVEL`/`INFRASTRUCTURE`) removed entirely; `levelLabelKo` `'LEVEL 01
  / 개인'` → `'1단계 · 개인'` (and 2/3 analogously).
- `IMPACT_CAUSAL_CHAIN`: flat English strings → `{ ko, en }` bilingual;
  box label `FINAL CONCEPTUAL CAUSAL CHAIN` → `가능한 확장 경로` +
  explicit non-causal disclaimer sub-line.
- `figureCaption.ko`: dropped "인과 사슬"/"Complete Causal Chain" →
  matches new pathway framing.
- `keyFinding.statement.ko`: Koreanized embedded "representation
  efficiency".
- Level 3 `unitNote`: added a `소버린 AI` one-line gloss on first
  appearance.

**Metric Results:**
```
S52-M01 PASS (root=1, 3-card group present w/o legacy labels)
S52-M02 PASS (LEVEL 0N/PROMPT LEVEL/WORKFLOW LEVEL/INFRASTRUCTURE absent)
S52-M03 PASS (causal-chain wording absent in all forms checked)
S52-M04 PASS (가능한 확장 경로 + explicit non-causal disclaimer present)
S52-M05 PASS (소버린 AI gloss present at first appearance)
S52-M06 PASS (visual: one pathway box, no card competition — screenshot)
```

**Evidence Safety:** 3-level claims and 6-step sequence unchanged in
substance/order; only labels, causal framing, and one embedded English
phrase edited. No protected numeric value exists on this slide.

**Verdict: PASS.** tsc/build clean, 1440×KO/EN 0 overflow both.

Next: P4 — S6/method, `HP01-S6-R01,R03`, `B02` (`S6-M01-M06`).

---

### Interlude — D8: `AUDIT2/레퍼런스/` discovered, logged, NOT acted on

While cleaning up post-PR #27 merge, `git status` surfaced an untracked
`AUDIT2/레퍼런스/` directory (3 files, same acquisition batch as the
screenshots per mtime). Extracted via `unzip` + regex on
`word/document.xml` (Read tool cannot open `.docx`/`.xlsx`).

- `기사용_언어별_Token_Premium_선행연구_요약.docx` — located and hashed
  the Flores/Petrov et al. (2023, NeurIPS) citation already logged
  `BLOCKED_EVIDENCE` under `HP01-S45-B02`. No number on the site
  changed; that block's sourcing half is now closed, moved to
  ALREADY_DONE.
- `기사_최종본.docx` — states 3,835,988 paired sentences, 1.33× median,
  87.99% majority, 95th/99th percentile 1.89×/2.25×, GPT-5/o200k_base —
  all in direct conflict with D1's frozen 69,432 / 1.29×~1.83×. Logged
  as **D8** in `docs/audit/DIRECTOR_DECISIONS.md` with the full
  comparison table. No code touched as a result. This is a
  research-content decision outside this loop's authority to resolve.
- `cl100k_base tokenizer(국가별).xlsx` — structure confirmed only
  (1 worksheet + embedded images), data not yet read.

**Decision Required:** is `기사_최종본.docx` the new canonical source
(supersedes D1's frozen numbers), a draft to reconcile, or unrelated?
See D8 for detail. Flagging this before S7 (conclusion) work starts,
since S7 is the slide most likely to be affected if D8 is ruled to
supersede — S7 work below proceeds strictly within the current
D1-frozen numbers per `S7-M01`'s explicit preserve gate.

### P4 — S6/method Evidence Packet

**Target Proof:** `section#method[data-widget="MethodSection"]` = 1;
`[data-collection="what-we-do-not-claim"] li` = 6;
`[data-collection="methodology-items"] li` = 6.

**Change Boundary:** `MethodSection.tsx` (UI chrome only),
`entities/article-content/content/article-content.ts` (one inline
gloss inside `methodologyBoundaries.preFigureParagraphs.ko`). No
`METHODOLOGY_ITEMS`/`WHAT_WE_DO_NOT_CLAIM` entity content touched —
that stays PROTECTED per the file's own header comment.

Before → After (exact strings):
- `<dt>` (boundary box header): `"CRITICAL BOUNDARY / 본 분석이
  주장하지 않는 것 (What We Do NOT Claim)"` → KO
  `"이 분석으로 말할 수 없는 것"` / EN `"What This Analysis Does Not
  Claim"`.
- `<dd>` next to it: `"6 Key Principles"` (was English-only) → KO
  `"6가지 경계"` / EN `"6 Key Principles"` (now a real ternary).
- Accordion header `<dt>`: KO `"세부 분석 방법론 (Methodological
  Pillars):"` → `"세부 분석 방법론"` (dropped English parenthetical;
  EN unchanged).
- Accordion header `<dd>`: `"Click to expand"` (English-only) → KO
  `"클릭하여 펼치기"` / EN `"Click to expand"`.
- Footnotes header: KO `"연구 주석 (Research Footnotes):"` →
  `"연구 주석:"` (EN unchanged).
- `preFigureParagraphs.ko[0]`: `"...표준화된 BPE 토큰화 알고리즘이..."`
  → `"...표준화된 BPE(Byte Pair Encoding, 자주 등장하는 글자 조합을
  하나의 토큰으로 묶어나가는 하위 단어 분절 방식) 토큰화 알고리즘
  이..."` — inline gloss only, no claim added/removed/changed.

**Metric Results** (Playwright, `localhost:3000`, KO, 1280×900):
```
S6-M01 PASS { rootCount: 1, claimItems: 6, methodItems: 6 }
S6-M02 PASS — found leftover EN labels: [] (checked CRITICAL BOUNDARY,
  WHAT WE DO NOT CLAIM, 6 KEY PRINCIPLES, case-insensitive)
S6-M03 PASS — WHAT_WE_DO_NOT_CLAIM untouched, diff confirms 0 changes
S6-M04 PASS { btnCount: 6, beforeExpanded: 'false', afterExpanded:
  'true', afterClose: 'false' } — opened/closed methodology item 3
S6-M05 PASS — BPE gloss text present in rendered DOM
S6-M06 PASS (visual, screenshot) — boundary box and accordion now read
  as plain heading/label pairs, no residual <dl>/<dt>/<dd> dashboard
  stat-row chrome outside the two spots (item titles) that are
  PROTECTED content and intentionally untouched
```

**Evidence Safety:** all 6 `WHAT_WE_DO_NOT_CLAIM` claim sentences and
all 6 `METHODOLOGY_ITEMS` titles/bodies byte-identical to before —
diffed directly, not assumed. Only label chrome and one jargon gloss
changed.

**Verdict: PASS.** `npx tsc --noEmit` and `npm run build` both clean.

Next: P5 — S7/conclusion, `HP01-S7-R01-R03`, `B01`, plus the deferred
`HP01-S0-R05` handoff, staying inside D1's frozen numbers per
`S7-M01`'s preserve gate (see Interlude above re: D8).

---

### P2b — S5-infrastructure re-verification (Director-requested, live re-check)

Director asked to re-verify S5 before continuing. Re-ran the full
`S5-M01`–`M07` metric set live against current `localhost:3000` HEAD
(previous verification in P2 was against production commit `c556279`,
now several iterations old) rather than trusting the recorded result.

```
S5-M01 PASS { rootCount: 1, phaseItems: 4 }
S5-M02/M03/M04/M05 PASS — 0 forbidden strings found (MACRO ADOPTION
  CAUSAL CHAIN, causal chain, 인과 사슬, AI Investment, Infrastructure,
  AI Adoption, Token Usage, VERIFIED, REQUIRED, SAMSUNG, SK,
  기하급수적으로 — all absent from KO root)
S5-M04 placeholder collection count: 0
document overflow: false (KO and EN, 1440px)
S5-M06 BLOCKED_EVIDENCE (unchanged, correct — no real source strips
  supplied, per HP01-S5-B01)
S5-M07 PASS (visual) — single 4-phase flow, no policy-dashboard
  competition, screenshot confirms
```

**Verdict: PASS**, re-confirmed on current HEAD (no drift since
Iteration 7). No code change this pass.

### P5 — S7/conclusion + S0-R05 handoff Evidence Packet

**Target Proof:** `section#result[data-widget="EditorialConclusionSection"]`
= 1; protected `1.29×`–`1.83×` string present verbatim; `blockquote`/
pull-quote count = 0; footer microcopy string absent; back-to-top
button count = 1 and functional.

**Change Boundary:** `EditorialConclusionSection.tsx`, one
`preFigureParagraphs` array in `article-content.ts`
(`conclusionSynthesis`), and `NewsHeroSection.tsx` (S0-R05 handoff —
removing, not adding, content). No shared component touched.

Before → After (exact strings):
- `conclusionSynthesis.preFigureParagraphs.ko[1]`: `"AI가 사회의 보편적
  인프라가 될수록, 언어별 representation efficiency를 측정하고
  개선하는 문제는..."` → `"...언어별 표현 효율성을 측정하고 개선하는
  문제는..."` — Koreanized the embedded English phrase, no meaning
  change.
- New `preFigureParagraphs.ko[2]`/`en[2]` (HP01-S7-B01, "not yet
  claimed" compression): KO `"다만 이는 특정 토크나이저와 표본에서
  관측된 구조적 격차이며, 모든 상황에서 더 많은 비용이 든다거나
  확정적인 사회경제적 불평등의 원인이라고 단정하는 것은 아닙니다."` /
  EN `"This reflects a structural gap observed within a specific
  tokenizer and sample—it does not assert that Korean always costs
  more, or confirm this as a settled cause of socioeconomic
  inequality."` — this restates (does not add to) `WHAT_WE_DO_NOT_CLAIM`
  items 2 and 6 in `methodology.ts`, which are themselves PROTECTED and
  were only read, not edited.
- `EditorialConclusionSection.tsx`: removed the italic pull-quote
  `<div>` (was: `"AI가 사회의 보편적 기간 인프라가 될수록, 언어별
  Representation Efficiency를 투명하게 측정하고 다국어 토크나이저
  구조를 개선하는 문제는 디지털 형평성과 직결되는 핵심 과제가 될
  것입니다."`) — this restated `preFigureParagraphs[1]` near-verbatim
  and also duplicated S5.2's `keyFinding.statement` almost word-for-word.
- `EditorialConclusionSection.tsx`: removed the footer `<div>` (was:
  `"TOKEN PREMIUM INTERACTIVE DATA STORY / 2026"`); exit-row class
  `justify-between` → `justify-end` so the back-to-top button now sits
  alone, right-aligned; button's `onClick`/label/icon untouched.
- `NewsHeroSection.tsx`: removed the "News Archive Context Note" block
  (`"보도 및 인프라 동향 아카이브"` / `"국가 AI 인프라 컴퓨팅 센터
  구축 및 기업 전사적 AI 도입이 본격화되면서, 토큰 처리 효율성은
  개인의 문제를 넘어 시스템의 문제로 확장되고 있습니다."`) —
  **removed, not rewritten**: its purpose is already fully carried by
  S5's lead paragraph and now S7's new paragraph 2. The protected
  `31 / 18 / 1.72×` FIG.01 numbers and the two sample sentences directly
  above it were not touched.

**Metric Results** (Playwright, `localhost:3000`, 1440×900, KO then EN):
```
S7-M01 PASS { rootCount: 1, hasRange: true } — 1.29×/1.83× both present
S7-M02 PASS { blockquoteCount: 0, italicQuoteCount: 0 }
S7-M03 PASS — footer microcopy string absent
S7-M04 PASS — button count 1; click scrolls window to top (scrollY≈3
  after settle; smooth-scroll needs >400ms to complete, confirmed with
  a longer wait)
S7-M05 PASS (KO) — "representation efficiency" absent from KO DOM;
  present in EN DOM as expected (native English copy, not code-switching)
overflow: false (KO and EN, 1440px)
S0 news-note removed: true — confirmed absent from NewsHeroSection DOM
```

**Evidence Safety:** the protected `1.29×~1.83×` range, the display H2,
and the lead line are all byte-identical to before (diffed). The S0
FIG.01 `31/18/1.72×` numbers and its two sample sentences are
byte-identical to before. No new number introduced anywhere. The new
closing sentence and the S0 removal were both checked against the DOM
Master's explicit constraints ("do not broaden conclusion claims",
"confirm the conclusion already carries the same purpose" before
touching S0) before implementing.

**Verdict: PASS.** `npx tsc --noEmit` and `npm run build` both clean.
Screenshot review: conclusion now reads as three clean paragraphs
(measured → observed/implication → not-yet-claimed) with no competing
quote box or footer chrome; S0 hero's exhibit card ends cleanly at the
Relative Ratio line with no layout gap from the removed block.

**S0–S7 (all 8 in-scope slides) now have 0 TODO directives remaining.**

Next: P6 — final regression sweep across S0–S3 (not individually
re-touched since their own iterations) to confirm no drift, then this
Human Preview 01 loop is ready to be called complete pending Director
review of the open PRs and D8.

---

### P6 — Final regression sweep, S0–S3 (verification only, no code change)

Live check against `localhost:3000` (current HEAD, KO, 1440×900) for the
4 slides not individually re-touched since their own earlier
iterations, using each slide's own `S*-M*` metrics:

```
S0-M01 PASS (root=1)
S0-M02 PASS (ANALYSIS TARGET/CORE METRIC/OBSERVED GAP/COVER & CORE
  THESIS all still absent)
S0-M03 PASS (실제 토큰 분절 비교 / 문장쌍 비교 present)
S0-M06 PASS — D2 protection: 31/18/1.72× all present, untouched
S1-M01 PASS (root=1, pair selectors=4)
S1-M02 PASS — clicked pair 4, no exception/blank state
S1-M03 PASS (HANGUL SCRIPT/LATIN SCRIPT absent; 한국어/영어 present)
S1-M04 PASS (토큰 비율 present)
S1-M05 PASS (7 figure captions present site-wide, non-empty)
S2-M01 PASS (root=1, step count=5)
S2-M02 PASS (TRANSFORMER PIPELINE SEQUENCING/THE BOTTLENECK/GAP ORIGIN
  all still absent)
S2-M03 PASS (1 disclosure, closed at initial render)
S2-M04 PASS (문장이 토큰으로 바뀌는 과정 present)
S2-M06 correctly still BLOCKED_CONTENT_AUTHORITY — "4단계" headline
  text still present alongside 5 actual pipeline steps; this is the
  known, previously-flagged conflict, unresolved pending Director
  ruling, not a regression
S3-M01 PASS (root=1, domain rows=6 — confirmed via `> li` direct child
  count; a looser selector artifact briefly showed 12 from double-
  counting nested buttons, not a real DOM issue)
S3-M02 PASS (핵심 실측 지표 / 관측된 토큰 프리미엄 비율 / 산출 공식 /
  도메인별 분포 all present)
S3-M05 PASS — D1 frozen values intact: 1.29, 1.83, and 69,432 all
  present verbatim, no drift
document overflow: false (1440px)
```

**Verdict: PASS, 0 regressions.** No code touched this pass — pure
verification. Full-page screenshot (S0 through S7) reviewed top to
bottom: consistent visual rhythm, no oversized competing panels, no
layout breaks.

**Human Preview 01 patch loop: all 8 in-scope slides (S0–S7) closed,
0 TODO remaining, 0 regressions found in the final sweep.** Open and
outstanding, not resolvable by this loop alone: `HP01-S2-R03`
("4단계"), `D1` (S3 numeric mismatch), `HP01-S4.5-R02` ("12개 언어"),
`HP01-S4-B02` (pricing multiplier evidence), `HP01-S5-B01` (source
strips evidence), and `D8` (기사_최종본.docx corpus/ratio discrepancy)
— all logged with full detail in `DIRECTOR_DECISIONS.md` and this
MASTER doc, none silently resolved.

---

### Iteration 12 — S4.5 new exhibit: Petrov et al. (2023) prior-research comparison (Director-dictated content, new work beyond the original 8-slide scope)

Director gave live in-chat instruction to add an interactive graph to
S4.5 (multilingual comparison) resolving the previously
`BLOCKED_EVIDENCE` item `HP01-S45-B02` ("locate the Flores paper"),
dictating the exact prose and citation data to use. This is genuinely
new content, not a redline against an AUDIT2 screenshot — treated with
the same discipline as the rest of the loop: no fabricated numbers, no
protected-content overreach, full before/after documentation.

**New files:**
- `entities/flores-citation/model/types.ts` — `FloresCitationItem` type.
- `entities/flores-citation/content/flores-citation.ts` —
  `FLORES_CITATION_DATA` (5 rows: English/Chinese/Korean/Russian/
  Standard Arabic, `totalTokens` + `ratio` fields, sourced from the
  Director-provided table) and `FLORES_CITATION_NOTE` (all prose,
  quoted from the Director's message, translated to EN for the EN
  locale — not generated).
- `entities/flores-citation/index.ts` — barrel export.

**Change boundary:** `MultilingualTokenEfficiencySection.tsx` (new
exhibit appended after the section's existing content, own state hook
`selectedFloresId`, own `ResponsiveContainer`/`BarChart` reusing
`chartTokens` — no existing chart/data touched). No other file's
protected content edited.

**Exact content, as dictated (KO; EN is a faithful translation, not
generated):**
- Subheading: `"한국어만의 문제인가? 선행연구는 아니라고 말한다"`
- `"이 현상이 한글만의 특수한 예외인지 확인하려면 다른 언어를 같이
  봐야 한다."`
- `"Petrov·La Malfa·Torr·Bibi 연구진은 NeurIPS 2023에서 FLORES-200의
  동일 의미 병렬문장 2,000개를 여러 토크나이저로 비교했다. 연구진이
  공개한 tokenization_lengths.csv의 cl100k_base 열을 영어=1로 다시
  계산하면 다음과 같다."`
- Table (English=52,835/1.00×, Chinese Simplified=101,138/1.91×,
  Korean=125,737/2.38×, Russian=131,496/2.49×, Standard
  Arabic=160,485/3.04×) — rendered as an interactive horizontal bar
  chart, ratio on the x-axis, English-baseline reference line at 1.00×,
  click-to-select bars + language chips (mirrors the section's existing
  chart's interaction pattern for consistency), tooltip on hover.
- `"이 수치는 우리 연구의 1.33배와 직접 비교하면 안 된다. 데이터셋도
  다르고 토크나이저도 다르다. Petrov 연구는 FLORES-200 + cl100k_base,
  본 연구는 약 384만 한-영 대응쌍 + o200k_base다."` — **flagged
  separately below.**
- `"하지만 방향은 중요하다. 높은 tokenization length가 한국어에서만
  나타난 것이 아니다. 중국어, 러시아어, 아랍어에서도 영어보다 큰
  격차가 나타났다. 따라서 기사 프레임은 "한글만 유독 비효율적"이
  아니라 이렇게 잡는 편이 정확하다."`
- Closing callout (rendered via the existing `ArticleFinding`
  component, label `"선행연구와의 정합성"`): `"영어 중심으로 보이지
  않던 '토크나이저의 언어별 격차'가 한국어에서도 다시 관측됐다.
  토크나이저와 데이터셋이 달라지면 격차의 크기는 달라진다. 다만 같은
  의미를 세는 길이가 언어에 따라 달라지는 현상은 여러 토크나이저
  조건에서 반복해서 관찰돼 왔다."`
- Figure caption: `"영어=1로 본 선행연구 언어별 tokenization length"`,
  numbered `FIG. 06-1` (a sub-figure of the section's existing FIG. 06,
  not the literal "그림 3" the Director wrote — the site's numbering is
  sequential FIG. 01–08 across the whole article, so "그림 3" would
  misnumber against every other exhibit; used `06-1` to keep global
  numbering consistent and flagged this substitution explicitly here
  rather than silently reinterpreting it).

**Director's inline instruction "토크나이저가 다른것을 어필하지말고,
적절히 은폐" (don't make the tokenizer difference a chart-level
callout — the prose already discloses it) implemented as:** the chart
itself carries only a small factual attribution tag
(`Petrov et al. 2023 / cl100k_base`), no warning badge — the full
tokenizer/dataset disclosure stays in the `cautionText` paragraph
directly above and below the chart, which is unabridged and unedited
from what the Director dictated. Nothing about the methodology
difference was hidden from the reader; only the chart's own chrome was
kept clean, consistent with how every other exhibit on the site handles
caveats (prose, not badges).

**Flagging, not silently resolving (per this session's standing rule):**
`cautionText` states `"본 연구는 약 384만 한-영 대응쌍 + o200k_base"`
and `"우리 연구의 1.33배"` — these are the exact `D8`
(`기사_최종본.docx`) figures, and they now appear live on the site for
the first time, in the Director's own dictated words. `S3`'s headline
(`69,432` pairs, `1.29×~1.83×` range) was **not** touched — D1 remains
frozen exactly as before. Logged as an update to `D8` in
`DIRECTOR_DECISIONS.md`: the site now visibly shows two different
corpus sizes in two different places until D1 is explicitly ruled.

**Metric verification** (Playwright, `localhost:3000`, 1440×900,
KO+EN, plus 390px mobile):
```
Headline/citation/caution text all present (KO): PASS
Caution text "1.33"/"384만" present: PASS (as dictated)
5 language chips rendered, click-to-select works (tested: Arabic chip
  click updates header detail line and legend to 3.04×): PASS
overflow: false at 1440px (KO/EN) and 390px
EN locale: headline/caution ("3.84 million") render correctly: PASS
```
One bug caught and fixed during verification: chip labels used
`.split(' ')[0]` (copied from the existing chart's pattern) to shorten
long names, which truncated `"표준 아랍어"` to just `"표준"` — not
recognizable as Arabic. Fixed to render the full name instead.

**Verdict: implemented as dictated.** `npx tsc --noEmit` and
`npm run build` both clean. This is new work, not a redline closure —
not counted toward the "S0–S7 all closed" tally above.

---

### Iteration 13 — S4.5 legacy-exhibit removal + register fix + hooks (external crawl verdict, "Manus AI / Vice Director")

A structured crawl verdict arrived (document ID
`KOEN-FRONT-HP01-VERDICT-2026-08-18`, reviewer "Manus AI, Main Vice
Director"), re-verifying the deployed production build
(`74571e7`/PR #31) against `HUMAN_PREVIEW_01_ACCEPTANCE_METRICS_v1.0.md`
via direct HTTPS asset retrieval + bundle-string scan (no browser
channel available to them). Confirmed byte-identical to a local build
of `74571e7` (only the hashed chunk filename differs). Most of the
verdict reconfirmed existing PASS states already logged in this file;
two items were genuine new findings and acted on, two items in the
verdict were independently re-checked and found to be crawl-methodology
false positives — corrected here rather than implemented as reported.

**Genuine findings, fixed:**

1. **`S45-M02` FAIL (real):** Iteration 12 added the new Petrov exhibit
   *alongside* the legacy `MULTILINGUAL_COMPARISON_DATA` chart/card
   instead of replacing it, so the section rendered two different,
   differently-sourced Korean ratios (1.78× unsourced-ish legacy vs.
   2.38× Petrov-cited) on two different axes. This directly
   contradicts the DOM Master directive's own original S4.5 instruction
   ("the entire dashboard is rejected"), which this session had not
   fully carried out. Fixed: removed the entire legacy bordered
   panel — the `언어별 정규화 토큰 소비량` chart, the
   `multilingual-comparison` selector, the `★ 한국어는... 1.78배`
   callout, the `Flores-200 / o200k_base` strip, the
   `라틴 알파벳 기준 (1.00×)` legend, and its `FIG. 06` figure caption
   — from `MultilingualTokenEfficiencySection.tsx`. The Petrov exhibit
   is now the section's single visual. `MULTILINGUAL_COMPARISON_DATA`
   itself (the entity file) is left unused/unconsumed, not deleted —
   consistent with this project's established practice for
   drafted-but-retired content (same pattern as the unused `headline`
   fields, `MultilingualSection.tsx`, etc.).

   **Follow-on defect caught during my own verification, not in the
   original verdict:** removing the chart without also editing
   `multilingualBenchmark.preFigureParagraphs` would have left specific
   per-language numbers (`스페인어는 1.18배`, `한글은 1.78배`,
   `아랍어는 2.05배`, `힌디어는 2.30배`) on the page with no supporting
   visual — an orphaned-claim regression the crawl's bundle-string scan
   didn't catch (it flagged `1.78` as present but attributed it only to
   the callout, not this separate paragraph). Fixed:
   `preFigureParagraphs.ko[0]`/`en[0]` trimmed to the general
   (unnumbered) trend claim — Latin-script languages use fewer tokens,
   non-Latin scripts tend to need more — dropping the specific
   1.18/1.78/2.05/2.30 figures and the "Hindi"/12-language framing
   already flagged `BLOCKED_CONTENT_AUTHORITY` under `HP01-S4.5-R02`.
   No new number was introduced to replace them.

2. **`S45-M06` register mismatch (real):** the legacy card's callout
   used `-습니다` polite-formal endings (`소비됩니다`) while the new
   Petrov prose uses `-다` plain-declarative endings, and the section's
   `keyFinding.statement.ko` also read `...관측됩니다.` Removing the
   legacy card resolved most of this by removing the mismatched text
   entirely; the one remaining formal-register line,
   `multilingualBenchmark.keyFinding.statement.ko`:
   `"비라틴계 문자 체계 전반에서 1.5×~2.3×의 토큰 팽창이 보편적으로
   관측됩니다."` → `"...관측된다."` (ending only, no number/claim
   change).

3. **`S45-M01` (hooks added):** `data-hp01-id="language-focus"`
   (selected-language detail line), `"language-comparison-chart"`
   (the exhibit's bordered panel), `"language-closing-claim"` (the
   closing `ArticleFinding` callout) — verified present in the DOM
   Master directive's own original S4.5 row (`AUDIT2/QA/...Master
   Directive.md`, "The entire dashboard is rejected, but the future
   replacement must retain a precise boundary") before adding, per the
   v2.1 rule against inventing new hook names.

**Findings in the verdict independently re-checked and corrected
(not implemented as reported) — verified via Playwright, something the
reviewer's own report notes they could not do this pass:**

4. **`S7-M05` "representation efficiency still rendered inside
   #result"** — checked directly: `grep` of
   `EditorialConclusionSection.tsx` finds no such string, and a live
   KO-mode DOM query of `[data-widget="EditorialConclusionSection"]`
   confirms it is absent. The string exists in `Footer.tsx`
   (`data-widget="Footer"`), a sibling of `<main>` in `App.tsx`, not
   nested inside `#result` — a bundle-string scan without full DOM-tree
   awareness would miss that these are different sections. **Not
   fixed, because it is not a bug on a second count either:** the
   phrase is gated behind `isKo ? ... : 'An interactive data
   journalism piece investigating the representation efficiency...'`
   — legitimate native English copy for the EN locale, confirmed absent
   from the KO-mode render of both `#result` and `Footer` (`false` in
   both cases, live-checked). Translating or removing legitimate EN-only
   copy to satisfy a KO-scoped metric would be the wrong fix. Logged
   here as a correction, not silently ignored.

**Behavioral/visual metrics the reviewer left `NOT VERIFIABLE`
(no browser channel available to them) — closed this iteration with
live Playwright evidence, `localhost:3000`, 1440×900:**
```
S1-M02 PASS — pair 4 click changes the Hangul-token panel content
  (11 -> 14 rendered token chips)
S2-M01 PASS — all 5 pipeline steps individually selectable
S3-M04 PASS — clicked domain rows 3 and 5, both selected without error
S4-M02 PASS — one range-type input found (the burden simulator slider)
S6-M04 PASS — methodology item 3 aria-expanded false -> true -> false
S7-M04 PASS — back-to-top scrolls window to y=0 (confirmed with a 2s
  settle wait; the page is now taller after S4.5's new content, so a
  short wait undercounts the in-flight smooth-scroll — same false-
  negative shape caught in Iteration 11, not a real regression)
```

**Re-verification after the fix (Playwright, KO+EN, 1440px + 390px
mobile):** `S45-M02` PASS (0 legacy strings found, including the
follow-on `preFigureParagraphs` fix). `S45-M04` PASS (1
`.recharts-wrapper` — single visual). `S45-M05` PASS (0 legacy
selector collections, 1 new one). `S45-M01` PASS (all 3 hooks present).
Register check PASS (`관측됩니다` absent, `관측된다` present). 0
overflow at all 3 checked widths.

**Verdict: fixed as confirmed, corrected as verified-false.** `npx tsc
--noEmit` and `npm run build` both clean (bundle shrank ~8KB from the
removed legacy chart code).

---
