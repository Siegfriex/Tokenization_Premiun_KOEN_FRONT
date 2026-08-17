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
