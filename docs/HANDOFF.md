# Handoff — Frontend Refactor Orchestrator

> Read this file first, before any other doc, when picking up this work
> in a new session. It exists so a new agent (or a human) can resume
> without re-deriving context from scratch.

**Written:** 2026-08-17, after Phase 4 merge.
**Updated:** 2026-08-17, during `refactor/shared-ui-consolidation` (Phase 5).
**Current canonical `main` SHA:** `758c791e22d4a9d8214a0dda20eb0fffe5983e6b`
(PR #8, `fix/active-section-resize`). The `06d9fb0` recorded in the first
revision of this file was PR #6 and is one merge stale — do not trust a SHA
in this file without checking `git rev-parse koen-front-origin/main`.
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

(PR #7 `docs/phase4-handoff` and PR #8 `fix/active-section-resize` merged
after the table below was written; #8 is current `main`.)

| # | Branch | Title | Merge SHA |
|---|---|---|---|
| 1 | `integration/canonical-baseline` | chore: establish canonical frontend baseline | `148a282f07c86a3dde072d19fcc79e2e3e252d42` |
| 2 | `docs/contracts` | docs: establish frontend refactor contracts and baseline record | `95cd861d7081f9a2007f5aadacf97788ad9b8438` |
| 3 | `chore/deployment-and-tooling-alignment` | chore: align deployment target to Vercel, resolve package-manager and layout-width decisions | `e559400c119e2195ee790fc35bdc82f7ecf09538` |
| 4 | `refactor/foundation-tokens-layout` | refactor(ui): establish semantic tokens and layout primitives | `b89651a26ffc1b497fb64af99f33bc4e8cecb74e` |
| 5 | `refactor/content-contract-i18n` | refactor(content): centralize typed bilingual editorial content | `60509b8fd8be91710d9f65afb898f4c335ae0ab8` |
| 6 | `refactor/interaction-features` | refactor(features): unify scroll behavior and accessible selection interactions | `06d9fb0807b49bfdf94583be4ded102a7681eb76` (**current `main`**) |

Full detail for each phase is in the docs listed in §7. Don't re-derive
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
6. **The header nav has no entry for `KoreaAIContextSection`**
   (`id="infrastructure"`). `entities/navigation`'s `NAV_SECTIONS` has 9
   entries for what is actually 10 rendered sections. Confirmed
   pre-existing (same gap existed in the original `SECTIONS` array
   before any migration). Do not silently add it.
7. **`src/components/MultilingualSection.tsx` is dead code** (417 lines,
   not imported anywhere, superseded by `MultilingualTokenEfficiencySection`).
   Its single import was fixed during Phase 3's `src/data/` removal so it
   wouldn't break the build, but it is otherwise untouched and still
   unused. Scheduled for actual deletion in Phase 5 / a cleanup pass —
   **confirm with the user before deleting**, per the standing "no
   false-positive unused-code removal" rule.
8. **4 unused dependencies remain in `package.json`:** `@google/genai`,
   `express`, `dotenv`, `motion` (+ `@types/express`). Confirmed zero
   imports anywhere in `src/`. Scaffold leftovers from the project's
   original Google AI Studio origin. Not removed yet — planned for the
   Phase 5 / `chore/verified-cleanup` pass.

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
- No browser-automation tool has ever been available in this
  environment. Never claim visual/keyboard verification that wasn't
  actually possible — say `BROWSER_AUTOMATION_NOT_CONFIGURED` and provide
  a manual checklist instead, exactly as every prior PR has done.
- This is a content-operability + design-consistency refactor, not a
  visual redesign. If a fix requires a visible design change beyond
  "looks identical to before," that's a decision point to raise, not
  something to decide unilaterally.
