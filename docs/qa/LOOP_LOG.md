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
