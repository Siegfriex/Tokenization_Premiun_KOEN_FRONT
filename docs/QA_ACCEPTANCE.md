# QA Acceptance

Checklist applied at the end of every refactor phase (2-5) and again at
the final audit gate.

## Automated checks

| Check | Command | Baseline result |
|---|---|---|
| Install | `npm ci` | PASS |
| Build | `npm run build` | PASS (1 known pre-existing CSS warning, see `BASELINE.md`) |
| Typecheck | `npm run lint` (`tsc --noEmit`) | PASS, 0 errors |
| Lint (ESLint) | NOT_CONFIGURED | no ESLint config in repo |
| Unit tests | NOT_CONFIGURED | no test script/framework |
| Secret scan | manual pattern grep on tracked files + staged diff | CLEAN at baseline |

Every phase PR must re-run all configured checks (install, build,
typecheck) and report NOT_CONFIGURED explicitly for lint/tests rather than
skipping them silently.

## Manual/visual verification (no browser-automation tooling configured in
this environment at time of writing — perform via `npm run dev` + manual
inspection, or the project's `run` skill if available, and record actual
observations rather than assuming pass)

- [ ] Production build (`npm run preview` after `npm run build`) loads
      without console errors.
- [ ] Korean mode (default) renders all 12 sections in order.
- [ ] English mode renders all 12 sections in order (language toggle in
      header).
- [ ] Desktop viewport (~1440px): header/body container alignment is
      visually consistent (validates the 1400px/1360px fix).
- [ ] Mobile viewport (~390px): all sections remain readable, no
      horizontal overflow.
- [ ] Scroll progress bar and active-section nav highlight update
      correctly while scrolling.
- [ ] All four selectable-card interactions still function post-migration:
      sentence-pair selector (`TokenCompareSection`), domain selector
      (`TokenPremiumSection`), preset buttons (`OccupationSection`),
      language buttons + chart bar click (`MultilingualTokenEfficiencySection`).
- [ ] Recharts bar chart in `MultilingualTokenEfficiencySection` renders
      with correct colors after the chart-color token export lands
      (Phase 2/5).
- [ ] Method-section accordion still expands/collapses.
- [ ] Occupation-section slider and preset buttons still update the
      token-receipt figures correctly (values must match pre-refactor
      baseline exactly — this is PROTECTED content).
- [ ] No new console errors introduced by any phase.

## Accessibility smoke checks

- [ ] All interactive controls (buttons, links, slider) are keyboard
      reachable via Tab.
- [ ] `PipelineSection` step cards are keyboard-operable after their
      `<div onClick>` → `<button>` fix (see `INTERACTION_AUDIT.md`).
- [ ] Visible focus treatment exists on shared `Button`/`SelectableCard`
      primitives once introduced.
- [ ] Language-switch buttons expose their pressed/active state
      accessibly (e.g. `aria-pressed` or equivalent), not color alone.

## Content integrity verification (run against `CONTENT_AUDIT.md`'s
protected list before merging Phase 3 and again at final audit)

- [ ] `hero.headline` is either consumed from `articleContent.ts` or
      formally deprecated — not left duplicated.
- [ ] `DOMAIN_DISTRIBUTION_DATA` ratios/token counts are byte-identical to
      baseline after migration.
- [ ] `MULTILINGUAL_COMPARISON_DATA` per-language ratios are byte-identical.
- [ ] `OccupationSection` `24`/`31` baseline constants are byte-identical
      and carry their provenance note into the new location.
- [ ] `WHAT_WE_DO_NOT_CLAIM` / `METHODOLOGY_ITEMS` text is unchanged.
- [ ] `Footer.tsx` source attribution list is unchanged.

---

## Verification rubric — `refactor/shared-ui-consolidation`

This branch retired the legacy recolor hack and moved the palette into
tokens. Most of it is provably value-for-value identical (see the
colour-fidelity map in `docs/design/COLOR_HACK_FINDING.md`), so blanket
"click everything" testing wastes the reviewer's attention. What follows is
ranked by what can actually be wrong.

### What was already proven mechanically — do not re-test by hand

| Claim | How it was proven |
|---|---|
| No utility class silently became a no-op | all 95 distinct colour/width tokens used in `src/` were matched against the compiled CSS |
| The hack is gone and nothing replaced it | 0 `[class*=` rules, 1 `!important` (Tailwind Preflight `[hidden]`) in compiled CSS |
| The hack was dead before deletion | 0 occurrences of any of its 9 matched class strings in rendered source or `index.html` |
| No research figure or Korean sentence changed | whitespace-normalised multiset diff of prose + figures across all 12 touched widgets vs `HEAD` |
| Entities untouched | `git diff src/entities/` empty |
| Types and build | `tsc --noEmit` 0 errors, `vite build` succeeds |

### Tier 1 — the five deliberate visual changes (a human must look)

Each has a stated expected outcome. Failing any of these is a defect in
this branch, not a matter of taste.

1. **Page canvas is light, not cobalt.** Scroll to the very bottom past the
   footer, and overscroll at the very top (trackpad rubber-band). The
   exposed canvas must be `#F7F8FA`, not blue. On mobile, the browser
   chrome tint must not be blue. *This is the fix; if it is still blue, the
   fix did not take.*
2. **Selected card borders.** Select a sentence pair (S1) and a language
   chip (S4.5). The selected card must be a solid cobalt block with **no
   dark ring** around it, matching how the domain cards (S3) and the
   iteration presets (S4) already looked.
3. **Burden-simulator slider.** Its filled track and thumb must be cobalt,
   not black.
4. **Filled cards sit slightly above the surface.** All five selectable
   card groups must carry the same faint shadow when filled. Judge
   consistency across the five, not the shadow in isolation.
5. **Prose is still near-black.** Read one full paragraph in each of S1,
   S3, S6. Body copy must read black/near-black — not slate, not tinted
   toward the accent. If prose looks blue-grey, the reading layer has
   leaked into the accent layer and the branch's core premise is broken.

### Tier 2 — structural changes that could have broken layout

6. Every section's content is horizontally aligned with every other
   section's (all 12 now share one `Container`). Check at ~1440px, where a
   1360px cap is actually reached. The sticky header is intentionally 8px
   narrower in gutter — that is pre-existing, not a regression.
7. The hero (S0) and the conclusion (RESULT) still centre vertically in
   their viewport-height sections.
8. Section headings: eight sections at one size, the conclusion one step
   larger. The accent underline sits under the second line only.
9. Pipeline step cards (S2): the "GAP ORIGIN" step stays cobalt-filled
   regardless of which step is active; the active step is the one with the
   dark outline. Both states must be distinguishable at a glance.
10. No horizontal overflow at ~390px.

### Tier 3 — behaviour that should be unchanged

11. All five selectable groups still switch their exhibit: sentence pair
    (S1), pipeline step (S2), domain (S3), iteration preset (S4), language
    chip **and** chart-bar click (S4.5).
12. Method accordion still expands/collapses.
13. Slider still drives the token receipt, and the receipt numbers still
    match the pre-refactor baseline exactly (PROTECTED content).
14. Scroll progress bar and active-nav highlight still track.
15. No new console errors.

### Accessibility

16. Tab reaches every selectable card, the slider, the accordion headers,
    the nav links and the language switch. The focus ring is now defined
    once in `SelectableCard` — it must be visible on **all five** groups,
    including the small chips.
17. `aria-pressed` still reflects selection on all five groups (it moved
    into the primitive; verify one card per group in devtools).
18. `<button>` content model: buttons no longer contain `<div>` or `<p>`.
    Run an HTML validator over the rendered DOM, or spot-check that card
    internals are `<span>`.

### What later automation should actually prove

Not "the components render". The regressions this codebase can plausibly
suffer are visual and semantic, so automation should target:

- **Computed-colour assertions**, not screenshots: for one element per
  token role, assert `getComputedStyle(el).color/backgroundColor` equals
  the expected token value. This would have caught the `<body>` collision
  years earlier and is cheap and stable.
- **A rendered-DOM HTML validity check**, which catches content-model
  violations like `<div>` in `<button>` without a human.
- **Axe (or equivalent) on the built page**, gated on the interactive
  controls only.
- **A guard test that fails if `[class*=` or a new `bg-[#` appears in
  `src/`** — the debt this branch paid down is the kind that returns.

Screenshot diffing is explicitly *not* recommended first: this page is a
long scroll of charts with hover states, and a pixel baseline would be
noisy enough to be ignored within two PRs.

## Deployment readiness (separate from this refactor's code changes)

- [ ] `.github/workflows/deploy.yml` trigger branch and `vite.config.ts`
      `base` path are reconciled with this repository's actual default
      branch and Pages configuration — flagged in `ARCHITECTURE_AUDIT.md`
      as dormant, not yet corrected. Any change here is a deployment
      configuration change and requires explicit user confirmation before
      merging, per the execution mandate.
