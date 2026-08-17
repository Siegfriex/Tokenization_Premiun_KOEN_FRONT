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

## Deployment readiness (separate from this refactor's code changes)

- [ ] `.github/workflows/deploy.yml` trigger branch and `vite.config.ts`
      `base` path are reconciled with this repository's actual default
      branch and Pages configuration — flagged in `ARCHITECTURE_AUDIT.md`
      as dormant, not yet corrected. Any change here is a deployment
      configuration change and requires explicit user confirmation before
      merging, per the execution mandate.
