# Handoff — Frontend Refactor Orchestrator

> Read this file first, before any other doc, when picking up this work
> in a new session. It exists so a new agent (or a human) can resume
> without re-deriving context from scratch.

**Written:** 2026-08-17, after Phase 4 merge.
**Updated:** 2026-08-17, during `refactor/shared-ui-consolidation` (Phase 5).
**Updated again:** 2026-08-17 (same calendar day, later session), after the
traceability system (PR #10) and a full Director-directed visual QA/redline
loop (PR #11-13, #15-16, #17 pending) — see **§10** for what that phase was
and where it left off. Read §10 first if you're resuming a QA/redline loop
specifically; read §1-9 for the underlying architecture.
**Current canonical `main` SHA:** `f191445ab8b2f5152352530b804cfecc16d673d9`
(PR #16 merge commit). Historical SHAs recorded elsewhere in this file
(`758c791e...` for PR #8, `06d9fb0...` for PR #6) are stale — do not trust
any SHA in this file without checking `git rev-parse koen-front-origin/main`.
**PR #17 (`redline/loop3-impact`) is open, unmerged, as of this update** —
see §10.5.
**Live production URL:** https://tokenization-premiun-koen-front.vercel.app/
**Repository:** `Siegfriex/Tokenization_Premiun_KOEN_FRONT` (public)

---

## 1. What this project is

A bilingual (KO/EN) data-journalism scrollytelling site presenting
**Token Premium** research: the empirically observed gap in subword
token counts between semantically equivalent Korean and English text
under a fixed tokenizer (`o200k_base`). It is a static single-page React
app — no backend, no router, no CMS, no database, and none is planned.
It visualizes findings from a separate research project
(`Tokenization_Premium`, a different repository) but does not compute
anything itself; all figures are pre-baked content/data.

Stack: React 19, TypeScript, Vite 6, Tailwind CSS v4. Deployed to Vercel,
auto-deploying on every push to `main`.

## 2. Who "the orchestrator" is and how this work has been run

This repo has been worked on by an autonomous execution agent operating
under a series of explicit, written mandates from the repository owner
(referred to as "Research/Product Director" in some docs). The working
pattern established across every phase so far:

1. Sync to latest canonical `main`, branch from it.
2. Do the phase's work in small, coherent commits.
3. Run every available validation (`npm ci`, `npm run build`,
   `npm run lint` — this project's `lint` script IS its typecheck,
   `tsc --noEmit`; there is no separate typecheck/test/ESLint script,
   report those as `NOT_CONFIGURED` rather than inventing them).
4. Run a pattern-based secret scan on the diff before every PR.
5. Open a PR with a heavy, structured body: scope, non-goals, before/after
   metrics, an ownership/behavior table, a verification section that
   honestly distinguishes static/build-verified vs. Vercel-verified vs.
   manually-browser-verified vs. `BROWSER_AUTOMATION_NOT_CONFIGURED`
   (**no browser-automation tool has been available in this environment
   at any point — never claim visual/interaction testing that wasn't
   actually possible**).
6. Wait for the Vercel Preview GitHub check on the PR (it exists and
   works — every PR gets one automatically), confirm it's green.
7. Merge (non-force, standard merge commit — never squash/rebase-merge
   was required so far, never force push, never touch `origin`).
8. Sync local `main`, rebuild, and verify the production URL serves the
   exact new commit (compare built asset hashes against what the live
   site actually serves — this has caught nothing wrong yet, but it's
   the check that matters).
9. Report status precisely, then stop and wait for explicit authorization
   before starting the next phase — **do not assume continuation is
   wanted just because a plan describes a "next phase."**

If you are picking this up fresh: assume this same operating discipline
unless the user tells you otherwise. The user has been explicit and
detailed in every phase-authorization message; when in doubt, that level
of rigor (branch → small commits → full validation → detailed PR →
Preview → merge → production verification → report → stop) is the
expected bar, not an exception.

## 3. Git topology — what every branch/remote means

```text
origin              -> https://github.com/mhbae0331/dsja_5_front.git
                        legacy template repo. NEVER push here. NEVER
                        touch it. It is only present because the local
                        clone originated from it.

koen-front-origin    -> https://github.com/Siegfriex/Tokenization_Premiun_KOEN_FRONT.git
                        THE canonical remote. All work happens here.

main                  canonical, deployable branch. Never commit directly
                        to it — always via a merged PR. Auto-deploys to
                        the production Vercel URL above.

baseline/legacy-freeze
                        Immutable snapshot of the pre-refactor legacy
                        prototype merged with this repo's initial commit.
                        SHA 4cadb6d8a862e786149defc62e4c1a4760edf299.
                        NEVER modify or delete this branch. It is the
                        rollback reference of last resort.
```

Historical/merged feature branches (kept on the remote, not deleted,
each fully merged into `main` already — do not resurrect or branch from
these, always branch from current `main`):

`integration/canonical-baseline`, `docs/contracts`,
`chore/deployment-and-tooling-alignment`,
`refactor/foundation-tokens-layout`, `refactor/content-contract-i18n`,
`refactor/interaction-features`.

## 4. PR / merge ledger so far

(Table extended through PR #16, the current `main` tip. PR #17 is open,
not yet in this table's "merged" sense — see §10.5.)

| # | Branch | Title | Merge SHA |
|---|---|---|---|
| 1 | `integration/canonical-baseline` | chore: establish canonical frontend baseline | `148a282f07c86a3dde072d19fcc79e2e3e252d42` |
| 2 | `docs/contracts` | docs: establish frontend refactor contracts and baseline record | `95cd861d7081f9a2007f5aadacf97788ad9b8438` |
| 3 | `chore/deployment-and-tooling-alignment` | chore: align deployment target to Vercel, resolve package-manager and layout-width decisions | `e559400c119e2195ee790fc35bdc82f7ecf09538` |
| 4 | `refactor/foundation-tokens-layout` | refactor(ui): establish semantic tokens and layout primitives | `b89651a26ffc1b497fb64af99f33bc4e8cecb74e` |
| 5 | `refactor/content-contract-i18n` | refactor(content): centralize typed bilingual editorial content | `60509b8fd8be91710d9f65afb898f4c335ae0ab8` |
| 6 | `refactor/interaction-features` | refactor(features): unify scroll behavior and accessible selection interactions | `06d9fb0807b49bfdf94583be4ded102a7681eb76` |
| 7 | `docs/phase4-handoff` | docs: add session-to-session handoff summary | `dbc8de9aa3052ea0adca878ef099372af2f0cd8d` |
| 8 | `fix/active-section-resize` | fix(a11y): recreate active-section observer on viewport resize | `758c791e22d4a9d8214a0dda20eb0fffe5983e6b` |
| 9 | `refactor/shared-ui-consolidation` | refactor(design-system): formalize colour roles, consolidate shared UI, retire the recolor hack | `c0987885b5f88fdf068d744aed4e4fb1f9701faa` |
| 10 | `repair/control-plane-integrity` | feat(trace): frontend traceability system — hooks, semantic DOM, numeric-claim governance | `56882d3342f71931263b6a8f92abc183d1f412d9` |
| 11 | `qa/loop-iteration-2` | docs(qa): loop iteration 2 — clean sweep, C2 detection refined | `d40e1ad6e461359ac2014dfb0a969cc7a98b7f96` |
| 12 | `qa/loop-iteration-2` | fix(design): scroll-margin deficit clips lead paragraph on real nav clicks | `059c4504eb888e7602b19c75d5d68ec4a6ef8eaf` |
| 13 | `qa/loop-iteration-2` | fix(design): header nav decompression + 3-tier card system (S03 worked example) | `5bcca7cdd198c9e6a0845eef5399e3723ff44452` |
| 14 | `qa/loop-iteration-6` | docs(qa): S02-pipeline passes clean (loop iteration 6) | **OPEN, never merged — see §10.6** |
| 15 | `redline/s00-hero` | fix(design): Director redline pass — S00 cover, S02 pipeline, S07 closing | `4e5d20ee03031a5afa4679e4d3d1e6ea9ecf0135` |
| 16 | `redline/loop2-slides345` | fix(S03): ledger rigor pass 2 (title stale — actually carries the S04.5/S04/S05/S06 redline batches too, see §10.4) | `f191445ab8b2f5152352530b804cfecc16d673d9` (**current `main`**) |
| 17 | `redline/loop3-impact` | fix(S05.2): impact-section redline — work order complete | **OPEN as of this update** — see §10.5 |

Full detail for each phase is in the docs listed in §7 (Phases 1-5) and
§10 (the traceability system + visual QA/redline loop). Don't re-derive
what's already written there.

## 5. Current codebase shape

```text
src/
├── App.tsx              composition root, wraps tree in UILanguageProvider
├── main.tsx
├── index.css             imports Tailwind + shared/config/tokens.css;
│                         the legacy recolor hack was REMOVED here during
│                         Phase 5 — see §6
├── types.ts              BilingualText, UILanguage, and per-domain
│                         interfaces (PairedSentenceItem, etc.)
├── components/           the 12 page-section "widgets" (not yet renamed
│                         to src/widgets/ — see §8, that rename is
│                         deliberately deferred to Phase 5)
├── entities/             typed content/data modules (article-content,
│                         sentence-pair, occupation, multilingual-token,
│                         policy-slot, methodology, pipeline-step,
│                         domain-distribution, navigation)
├── features/
│   ├── change-language/   UILanguageProvider, useUILanguage(), LanguageSwitch
│   └── observe-scroll-section/  useScrollProgress, useActiveSection
└── shared/
    ├── config/            tokens.css (Tailwind v4 @theme), chart-tokens.ts
    ├── i18n/               LocalizedText type, getLocalizedText()
    └── ui/                 Container, Section, Stack, Cluster, Divider
```

`src/components/ArticleElements.tsx` is the shared typography layer
(`ArticleLead`, `ArticleParagraph`, `ArticleFinding`, etc.) — fully
retokenized, used by every widget. Treat it as part of `shared/ui`
conceptually even though it hasn't been physically moved there yet.

### Widgets and their migration status

Phase 5 update: the "Tokenized" column is now ✅ for every widget — zero
raw hex classes remain in rendered code — and every widget now composes
`Container` + `SectionHeading`, with the five selectable-card groups on the
shared `SelectableCard`.

| Widget | Content in entities? | Tokenized? | Accessibility pass |
|---|---|---|---|
| `NewsHeroSection` | ✅ full | ✅ | n/a (no selectable cards) |
| `StoryProgress` | ✅ (`entities/navigation`) | ✅ | ✅ (scroll/observer extracted, `aria-current`) |
| `PipelineSection` | ✅ (`entities/pipeline-step`) | ✅ | ✅ (button + `aria-pressed`) |
| `TokenPremiumSection` | ✅ (`entities/domain-distribution`, PROTECTED) | ✅ | ✅ (button + `aria-pressed`) |
| `OccupationSection` | ✅ (`entities/occupation`, incl. PROTECTED `TOKEN_BASELINE_SIMULATION`) | ✅ | ✅ (`aria-pressed` on presets) |
| `KoreaAIContextSection` | ✅ (`entities/article-content/macro-adoption-phases.ts`) | ✅ | not touched (no selectable cards) |
| `ImpactSection` | ✅ (`entities/article-content/impact-scale-levels.ts`) | ✅ | not touched |
| `TokenCompareSection` | ✅ (`entities/sentence-pair`) | ✅ (Phase 5) | ✅ (`aria-pressed` added) |
| `MethodSection` | ✅ (`entities/methodology`) | ✅ (Phase 5) | ✅ (`aria-expanded`+`aria-controls` added) |
| `EditorialConclusionSection` | ✅ (`entities/article-content`) | ✅ (Phase 5) | not touched |
| `MultilingualTokenEfficiencySection` | ✅ (`entities/multilingual-token`), Recharts colors via `shared/config/chart-tokens.ts` | ✅ (Phase 5) | ✅ (`aria-pressed` on language buttons) |
| `Footer` | n/a (static copy, never had a data array) | ✅ (Phase 5) | not touched |
| `MultilingualSection` | **dead file, not imported anywhere, do not delete without explicit instruction** | n/a | n/a |

## 6. Known, deliberately-unresolved issues (do not silently fix these)

Items 1-3 were **resolved during Phase 5**; they are kept, marked, because
the reasoning matters when reading the older PRs. Items 4-8 are still open.
Re-read the source doc before touching any of them — several require a
Director decision, not an engineering judgment call.

1. ~~The `index.css` recolor hack determines the site's actual live
   colors.~~ **RESOLVED (Phase 5).** The nine `[class*="…"] !important`
   rules were deleted once every rendered element had moved onto semantic
   tokens, at which point they matched nothing (proven: zero occurrences of
   any matched class string in rendered source). The palette now lives in
   `src/shared/config/tokens.css` as three explicit layers — reading /
   accent / data-mark. Do not reintroduce attribute-selector recoloring.
   Full detail and the value-for-value migration table:
   `docs/design/COLOR_HACK_FINDING.md` (§RESOLUTION).
2. ~~`App.tsx`'s root background may be rendering wrong.~~
   **RESOLVED (Phase 5) — and it was worse than recorded here:**
   `index.html`'s `<body class="bg-[#111111] …">` was a *second*,
   independent instance of the same substring collision, so the page canvas
   itself rendered `#2563EB`. Fixing `App.tsx` alone would not have fixed
   it. Both are now clean. Never put a colour utility on `<body>` — that
   element's class attribute is the whole page canvas.
3. ~~Open Director decision: blue accent vs. flat monochrome?~~
   **ANSWERED — neither, as originally framed.** The direction is a
   two-layer split: cobalt is the real accent but owns *state and
   navigation only* (selected card, active nav, heading underline, progress
   fill), while reading surfaces and prose stay black/near-black. A third
   data-mark layer (near-black chart marks, token chips) exists so bars
   never compete with selection state. Encoded in `tokens.css` and
   `docs/DESIGN_SYSTEM_CONTRACT.md`.
4. **13 `headline` fields in `entities/article-content` are mostly dead.**
   Only `hero.headline` was a genuine duplicate of what's rendered (now
   reconnected). The other 12 differ in actual wording from what each
   widget really shows — they're stale drafts, not usable duplicates. Do
   not "clean these up" by either deleting them or making a widget
   consume them — that requires an editorial decision about which text
   is correct.
5. **`KoreaAIContextSection`'s 4 "Macro Adoption Chain" cards are not
   actually bilingual.** `name` is hardcoded English, `description` is
   hardcoded Korean, with no `isKo` branch — pre-existing, not introduced
   by any refactor phase. English-mode readers currently see raw Korean
   prose here. Documented in `entities/article-content/content/macro-adoption-phases.ts`'s
   header comment. Do not invent new English copy to "fix" this.
6. ~~The header nav has no entry for `KoreaAIContextSection`~~
   **RESOLVED (2026-08-17, `DIRECTOR_DECISIONS.md` D5).** Added
   `{ id: 'infrastructure', label: { ko: 'S5. AI 인프라', en: 'S5. Infra' } }`
   to `NAV_SECTIONS`, relabeled the existing `impact` entry `S5.` → `S5.2.`
   to match `App.tsx`'s own section-numbering comments. `NAV_SECTION_IDS`
   now has 10 entries, matching the 10 rendered sections.
7. **`src/components/MultilingualSection.tsx` is dead code** (417 lines,
   not imported anywhere, superseded by `MultilingualTokenEfficiencySection`).
   Its single import was fixed during Phase 3's `src/data/` removal so it
   wouldn't break the build, but it is otherwise untouched and still
   unused. Scheduled for actual deletion in Phase 5 / a cleanup pass —
   **confirm with the user before deleting**, per the standing "no
   false-positive unused-code removal" rule.
8. ~~4 unused dependencies remain in `package.json`~~ **RESOLVED
   (2026-08-17).** `@google/genai`, `express`, `dotenv`, `motion` (+
   `@types/express`) removed. `npm install` re-run — 125 packages removed,
   0 vulnerabilities. `npm run build`/`npm run lint` re-verified clean.

## 7. Where the detailed history actually lives — read before re-deriving anything

```text
docs/audit/                      THE TRACE SYSTEM — read docs/audit/README.md
                                 first if you are about to change any rendered
                                 content, DOM structure, or numeric claim. It
                                 registers every content/structure-bearing node
                                 with a stable Trace ID and freezes 22 numeric
                                 claims pending Director decision.
docs/BASELINE.md                 baseline SHAs, verification results, deployment record
docs/ARCHITECTURE_AUDIT.md        full source inventory, dead code/deps
docs/CONTENT_AUDIT.md             every hardcoded content item cataloged, P0/P1/P2 priority
docs/DESIGN_AUDIT.md              638-hardcoded-color audit, container-width audit
docs/INTERACTION_AUDIT.md         every interaction pattern mapped pre-Phase-4
docs/REFACTOR_PLAN.md             the "light FSD" target layout and Phase 2-5 scope boundaries
docs/CONTENT_CONTRACT.md          rules for where content lives, protected-content list
docs/DESIGN_SYSTEM_CONTRACT.md    token/primitive rules, forbidden patterns
docs/QA_ACCEPTANCE.md             the checklist every phase (and final audit) must satisfy
docs/design/COLOR_HACK_FINDING.md the full color-hack + App.tsx-background investigation
docs/qa/                          VISUAL QA / DIRECTOR REDLINE — read §10 above first,
                                 then VISUAL_QA_CRITERIA.md (C1-C18 ruleset),
                                 DESIGN_LAW.md (3-tier card system), SHOT_SPECS.md
                                 (per-slide findings, authoritative), LOOP_LOG.md
                                 (append-only rollback log)
```

Each PR body (see the merge ledger in §4, on GitHub) contains that
phase's exact before/after metrics, verification commands and results,
and content-migration tables. Those are not duplicated here — go read
the actual PR if you need e.g. exact grep counts for a specific phase.

## 8. Phase 5 — what `refactor/shared-ui-consolidation` did, and what is left

### Done on this branch

- `shared/ui` gained `SelectableCard` (replacing five hand-rolled copies of
  the same state machine), `TokenChip` (two), and `SectionEyebrow` /
  `SectionHeading` / `HeadingAccent` (nine section headers).
- `Container` — built in Phase 2 but used by exactly one file — is now
  adopted by all twelve widgets, removing fourteen hand-written
  `max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12` strings.
- Every widget retokenized. **Zero raw hex classes remain in rendered
  code.** The legacy recolor hack is deleted (§6.1-6.3).
- The palette is now three named layers in `tokens.css` — reading, accent,
  data-mark — rather than an emergent property of a string-matching hack.
- `<div>`/`<p>` inside `<button>` (an HTML content-model violation) fixed
  everywhere the shared card touched: TokenPremium 5, Pipeline 4,
  TokenCompare 2.
- Two real user-visible defects fixed: the app root and the `<body>`
  canvas were both being painted cobalt by the hack's substring collision.

Net −78 lines across 21 files while adding three primitives.

### Deliberately NOT done, still open

- **`Button` and `StatCard` were not extracted.** The contract lists them
  as approved candidates, but the audit does not support them: there is one
  free-standing button (the conclusion's "back to top") and the "stat"
  blocks differ enough per widget that a shared component would need more
  variants than it removes. Extract them when a second real instance
  appears, not before.
- **`SectionEyebrow` covers only the section-opener role.** The other
  uppercase-mono labels differ on three axes (`tracking-wider` vs
  `-widest`, three weights, three sizes); forcing them into one component
  would have meant either visual drift or a variant explosion.
- **`src/components/` → `src/widgets/` and `src/app/` not done.** Still the
  right move; kept out of this branch so the structural rename is a
  reviewable diff of its own rather than noise on top of a palette change.
- **`MultilingualSection.tsx` (dead, 417 lines) and the 4 dead deps still
  present** (§6.7-6.8). Deleting them is not a consequence of this work and
  remains a separate `chore/verified-cleanup` decision.
- **Nothing editorial was touched** (§6.4-6.6): stale `headline` fields,
  the Macro Adoption EN translation gap, and the missing `infrastructure`
  nav entry are all untouched and still need a Director decision.

Do not start the remaining items without a fresh authorization message —
this project has consistently required explicit sign-off before each
phase, not inferred continuation.

## 9. Constraints that apply to every future phase, restated plainly

- Never force-push, never touch `origin`, never commit directly to
  `main`, never modify `baseline/legacy-freeze`.
- Never change the TP formula, research values/ratios, chart data,
  tokenizer identifiers, sample sizes, source citations, methodology
  wording, or caveats — anything in `entities/article-content`,
  `entities/domain-distribution`, `entities/multilingual-token`,
  `entities/occupation`, `entities/methodology`, `entities/sentence-pair`,
  `entities/policy-slot` is protected research content by default.
- Never add a backend/router/CMS/API/database/auth/new state library.
- Never add new raw hex classes, new `!important`, or new
  attribute-selector hacks (existing ones documented in §6 are debt to
  retire deliberately, not a precedent to extend).
- **UPDATE (later session, see §10): Playwright browser automation IS now
  available** — installed ad hoc into scratch dirs (`/tmp/qa-screen-agent`,
  `npm install playwright@1.62.1`, Chromium already cached at
  `~/.cache/ms-playwright`), used extensively for real visual QA (nav
  clicks, `getBoundingClientRect()`, computed-style assertions,
  screenshots). The blanket "never available" claim below predates that —
  if you have it available, use it and say so plainly; if you don't,
  fall back to the original rule: say `BROWSER_AUTOMATION_NOT_CONFIGURED`
  and provide a manual checklist instead of claiming untested things
  work. **Critical methodology note carried forward from §10:**
  `elementHandle.screenshot()` on a section taller than the viewport
  produces a misleading sticky-header-overlap artifact (Chromium
  temporarily resizes its capture viewport) — never treat a full-element
  screenshot alone as ground truth for scroll-position/overlap claims;
  always cross-check with a real `page.click('nav a[href="#id"]')` +
  `getBoundingClientRect()`.
- This is a content-operability + design-consistency refactor, not a
  visual redesign. If a fix requires a visible design change beyond
  "looks identical to before," that's a decision point to raise, not
  something to decide unilaterally.

## 10. Phase 6+ — the traceability system and the Director visual-QA/redline loop

This section covers everything after §1-9 (which describe Phases 1-5, the
"looks identical to before" content-operability refactor). Phase 6 changed
that constraint deliberately: the Director explicitly authorized *visual*
redesign work — not a new colour system, but a systematic pass tightening
hierarchy, tiering, and evidentiary presentation across every slide. If
you are resuming this specific thread, read this section fully before
touching anything.

### 10.1 What changed and why

Two distinct systems were built and then run, back to back:

1. **The traceability system** (PR #10, `repair/control-plane-integrity`).
   Every content/structure-bearing rendered node gets a stable Trace ID
   (`<WIDGET>-<NNN>`) pinned in `docs/audit/data/id-registry.json`, keyed
   by an identity derived from its literal text or JSX tag + map-source.
   It exists so numeric claims and content changes are auditable and
   diff-reproducible run over run. **Read `docs/audit/README.md` first
   if you're about to change any rendered content, DOM structure, or
   numeric claim** — this is a hard rule now, not a suggestion.
   - Run it: `node docs/audit/tools/run-pipeline.mjs` (extract → build
     ledger → render docs → check citations). It must exit 0. Watch the
     `director queue: N` line — it must not change unless you've recorded
     a new Director ruling in `docs/audit/DIRECTOR_DECISIONS.md`.
   - **If a text/content change alters a node's literal text, its Trace
     ID changes** (the identity key is derived from literal text) — this
     is expected, not a bug. When it happens, `check-citations.mjs` will
     report the old ID as `DANGLING` in any prose file that still cites
     it (`DIRECTOR_DECISIONS.md`, `README.md`). Fix by updating the
     citing prose to the new ID, not by reverting the content change.
     Happened twice this session (`LANG-019`→`LANG-051`,
     `LANG-031`→`LANG-053`; `LANG-032` retired outright when a hardcoded
     literal became a live entity read) — see `DIRECTOR_DECISIONS.md`
     D3 for the worked example.
   - 22 numeric claims were frozen at the time this system was built
     (`docs/audit/NUMERIC_CLAIMS.md`). **Never alter a frozen claim's
     value or wording; layout-only changes around it are fine.**

2. **The visual QA / Director redline loop** (PR #11-13, #15, #16, #17).
   The Director gave an explicit, formal, per-slide work order (10
   slides, S00 through S07/S09 in nav order — see the ID list at the top
   of `docs/qa/SHOT_SPECS.md`) demanding "Apple-tier senior UX/UI
   designer" rigor: exactly one accent-color protagonist per slide, body
   text one register quieter than headline/data, cards read as edited
   investigative exhibits (not decorative product UI), numbers as
   independent evidence objects. Three docs formalize the ruleset:
   - `docs/qa/VISUAL_QA_CRITERIA.md` — C1-C18 across 4 layers (Render
     Truth, Geometric Integrity, Typographic Hierarchy, Interaction &
     Narrative).
   - `docs/qa/DESIGN_LAW.md` — the 3-tier card system (Tier-1 `bg-surface
     border-2 border-rule-strong rounded-xs shadow-sm` = primary
     evidence; Tier-2 `bg-surface border border-rule rounded-xs
     shadow-xs` = secondary; Tier-3 `bg-surface-alt border border-rule
     rounded-xs` no shadow = tertiary annotation) plus the typography
     scale. **`bg-accent` is never a tiering signal** — it's reserved for
     selection/nav state only. This exact anti-pattern (accent-as-tier)
     was found and fixed independently on 3 different slides this
     session (S05-infrastructure, S05.2-impact, and implicitly guarded
     against everywhere else) — if you see a colour-filled "highlighted"
     card anywhere else in this codebase, it's very likely the same bug.
   - `docs/qa/SHOT_SPECS.md` — one entry per slide, written *before*
     looking at screenshots (the accept/reject rule is blind), findings
     appended after. **This is the authoritative record of what was
     screened, found, and fixed per slide — read the entry for a slide
     before re-screening it.**
   - `docs/qa/LOOP_LOG.md` — append-only, one entry per loop iteration,
     doubles as a rollback log (`git revert <sha>` per entry).

### 10.2 Working method established this phase (carry forward)

- **Event-driven, not fixed-interval.** A persistent `Monitor` polls
  `git ls-remote` on `main` every 30s and fires immediately on a merge —
  do not fall back to polling on a timer once a Monitor is armed. Verify
  production immediately on that event (see 10.3).
- **Orchestrator + read-only screening subagents + centralized fixing.**
  Screening was parallelized via the `Workflow` tool: multiple read-only
  subagents (one per slide or concern, explicitly forbidden from editing
  files) each screen against the ruleset above and return structured
  findings (`{directive, status, evidence, recommendation}`). **The
  orchestrator (you) then synthesizes and performs every actual edit
  itself** — screening-only agents that never lead to a fix are
  pointless; this was an explicit correction mid-session after the
  Director asked "스크리닝을 하는데 수정을 안 하면 뭐 어떻게하니."
- **Real interaction, not screenshot-only evidence.** For any claim about
  scroll position, header overlap, or first-viewport visibility, use a
  real `page.click('nav a[href="#id"]')` + `getBoundingClientRect()` —
  `elementHandle.screenshot()` on a section taller than the viewport
  produces a misleading sticky-header-overlap artifact (documented in
  `docs/qa/SHOT_SPECS.md` S01-compare). For colour/tier claims, read
  `getComputedStyle()`, don't eyeball a screenshot.
- **Push and open a PR immediately after each meaningful commit — do not
  batch.** The user merges PRs mid-session; a branch with unpushed
  commits behind a just-merged PR orphans those commits. This happened
  three separate times this session (recovered via `git cherry-pick` onto
  a fresh branch off updated `main`, or — the cleaner pattern used later —
  `git checkout -b <new-branch> koen-front-origin/main` *before*
  committing, when the working tree still has uncommitted changes). Check
  `git merge-base --is-ancestor koen-front-origin/<branch> HEAD` before
  every push.
- **Never invent new editorial copy to fix an asymmetry.** Several
  findings this session ("add a parallel badge to the other card," "give
  this element bilingual text") were resolved by *removing* the
  asymmetric/orphaned element instead of inventing new text/labels not
  backed by an entity field — e.g. the burden section's exclusive "HIGH
  BURDEN POTENTIAL" badge was deleted rather than duplicated onto its
  sibling card; the impact section's hardcoded Korean h3 was deleted
  (its content was already covered by an existing bilingual caption)
  rather than given an invented English translation. Prefer removal over
  invention every time the asymmetry is genuinely redundant.

### 10.3 Production verification method

Vercel Preview URLs require account login and are not reachable headlessly
(confirmed: redirects to a Vercel login page). Two working verification
surfaces instead:
1. **Localhost dev server** during active work: `nohup npx vite
   --port=3000 --host=0.0.0.0 > /tmp/vite-dev.log 2>&1 &`, then drive it
   with Playwright.
2. **Post-merge production check**: `git worktree add /tmp/verify-main-build
   koen-front-origin/main`, `npm install && npm run build` in that
   worktree, then `curl -s https://tokenization-premiun-koen-front.vercel.app/
   | grep -oE 'assets/index-[A-Za-z0-9_-]+\.(js|css)'` and diff against
   the worktree's `dist/assets/` filenames. Exact hash match = confirmed
   deployed. Remove the worktree after (`git worktree remove
   /tmp/verify-main-build --force`).

### 10.4 What actually got fixed (summary — full detail in `docs/qa/SHOT_SPECS.md`)

Every slide in the Director's work order (hero, compare, pipeline,
patterns, burden, languages, infrastructure, impact, method, result) has
now received at least one dedicated redline pass. Highlights, not
exhaustive:
- A real chart bug in `MultilingualTokenEfficiencySection`: the selected
  language's bar was supposed to be the highlighted one but was hardcoded
  to always highlight Korean regardless of `selectedLangId`.
- The `bg-accent`-as-tiering anti-pattern, found and fixed independently
  on `KoreaAIContextSection` (Phase 04 card) and `ImpactSection`
  (Level-03 card + 2 causal-chain chips) — 3 slides, same root cause.
- Multiple Design Law tier corrections (Tier-1/Tier-2/Tier-3 promotions
  and demotions) across `OccupationSection`, `MultilingualTokenEfficiencySection`,
  `KoreaAIContextSection`, `MethodSection`, `ImpactSection`.
- Several bilingual-completeness gaps (hardcoded-Korean strings with no
  `isKo`/`isEn` branch) fixed in `MultilingualTokenEfficiencySection` and
  `ImpactSection` — but see §10.6, at least one known gap
  (`KoreaAIContextSection`'s phase-card `name`/`description`, §6.5) is
  still open and was *not* touched this phase.
- A Korean word-break bug (`break-keep` missing) fixed once in the shared
  `ArticleSubheading` component; a figure-caption mobile-wrap bug fixed
  once in the shared `ArticleFigureCaption` component — both apply
  site-wide.
- Removed 4 separate dead/empty `ArticleSubheading` renders (entities
  with no `subheading` field were still rendering the wrapper).

### 10.5 Current state — read this before doing anything else

- `main` is at `f191445` (PR #16 merged, verified against production —
  hashes matched exactly).
- **PR #17 (`redline/loop3-impact`) is open, not yet merged**, containing
  the `S05.2-impact` fixes (the last slide in the work order) plus the
  `ArticleFigureCaption` shared-component fix. It is fully verified
  locally (tsc, build, audit pipeline, live Playwright DOM checks) but
  **production has not been re-verified against it yet** — do that first
  if you're resuming: wait for/confirm the merge, then run the §10.3
  worktree-build-and-hash-compare check.
- A persistent `Monitor` watching `main` for the next merge may or may not
  still be running depending on whether the session that armed it is
  still alive — check `TaskList`/`/workflows` and re-arm if needed rather
  than assuming it's there.

### 10.6 Loose ends — do not silently resolve, but do not forget either

- **PR #14 (`qa/loop-iteration-6`) was never merged and still isn't in
  `main`.** It's docs-only (a "S02-pipeline passes clean, no fix needed"
  entry for `SHOT_SPECS.md`/`LOOP_LOG.md`) — low risk, but genuinely
  missing from the current `main`'s `docs/qa/SHOT_SPECS.md` (there is no
  `## S02-pipeline` entry there today). Either merge it as-is or fold its
  content into a future docs commit; don't just delete/ignore it.
- **Content-integrity flag, not fixed:** `MultilingualTokenEfficiencySection`'s
  `multilingualBenchmark` copy mentions "12개 언어"/Hindi, but
  `MULTILINGUAL_COMPARISON_DATA` has only 5 entries and no Hindi row.
  This is a copy-accuracy question for the content owner, not something
  a visual QA pass should silently correct — flagged in `docs/qa/LOOP_LOG.md`
  Iteration 8.
- **`DIRECTOR_DECISIONS.md` D3/D4 are still open** (values that are
  correct today but hardcoded rather than entity-read; unsourced
  supporting quantities like `BURD-017`/`018`, `LANG-053`, `METH-008`).
  D3's `LANG-032` row resolved itself as a byproduct of the chart
  color-encoding bug fix (see §10.1) — that was a rendering-logic
  consequence, not a Director ruling on the broader D3 question, which
  remains open for the other two items.
- **§6.5 above (`KoreaAIContextSection` phase-card bilingual gap) is
  still open and unrelated to anything fixed this phase** — don't assume
  it was incidentally fixed just because this session touched that same
  component's tiering/color.
