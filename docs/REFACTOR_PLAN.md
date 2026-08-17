# Refactor Plan

Derived from `ARCHITECTURE_AUDIT.md`, `CONTENT_AUDIT.md`, `DESIGN_AUDIT.md`,
and `INTERACTION_AUDIT.md`. Governs Phases 2-5.

## Objective (restated)

Make editorial content replaceable, layout and visual tone globally
controllable, and interactions consistent — without backend, routing,
caching, CMS, or database work. "Light FSD" — `app / widgets / features /
entities / shared` — no `pages/` or `processes/` layer, since there is no
routing and no multi-step process to model.

## Target layer mapping

```text
src/
├── app/                      App.tsx, main.tsx, global CSS entry, providers
├── widgets/                  today's src/components/*Section.tsx (12 files)
├── features/
│   └── observe-scroll-section/   extracted from StoryProgress
├── entities/
│   ├── article-content/      today's data/articleContent.ts
│   ├── paired-sentence/      CURATED_PAIRED_SENTENCES
│   ├── occupation/           OCCUPATION_COMPARISON_DATA
│   ├── multilingual-token/   MULTILINGUAL_COMPARISON_DATA
│   ├── policy-slot/          VERIFIED_POLICY_SLOTS
│   ├── methodology/          METHODOLOGY_ITEMS, WHAT_WE_DO_NOT_CLAIM
│   ├── pipeline-step/        PIPELINE_STEPS (currently inline, see CONTENT_AUDIT P0 #3)
│   ├── domain-distribution/  DOMAIN_DISTRIBUTION_DATA (PROTECTED, see CONTENT_AUDIT P0 #4)
│   └── nav-section/          SECTIONS (currently inline, see CONTENT_AUDIT P0 #2)
└── shared/
    ├── ui/                   ArticleElements.tsx + Button, SelectableCard,
    │                         TokenChip, StatCard, Container, ReadingColumn,
    │                         Stack, Cluster, Divider
    ├── config/tokens.css     semantic design tokens (Tailwind v4 @theme)
    ├── i18n/                 UiLanguageProvider, useUiLanguage, t()
    └── lib/                  small pure utilities (none identified yet beyond i18n)
```

Widget internal `id="..."` anchors, section ordering in `App.tsx`, and all
observable behavior are preserved during the move — this is a structural
relocation, not a rewrite.

## Phase sequence and scope boundaries

Each phase branches from the latest merged `main`, opens one PR, and does
not begin the next phase until that PR merges (per the approved merge
policy — avoids the "everyone edits the same files" conflict problem).

### Phase 2 — `refactor/foundation-tokens-layout`

- Define semantic tokens (`DESIGN_SYSTEM_CONTRACT.md`) as Tailwind v4
  `@theme` entries plus a parallel plain-JS token export for Recharts
  color props (see `DESIGN_AUDIT.md` "raw color literals passed to JS").
- Introduce `Container`, `Section`, `ReadingColumn`, `Stack`, `Cluster`,
  `Divider` primitives in `shared/ui`.
- Fix the header/body container-width mismatch (1400px vs. 1360px) —
  standardize on 1360px.
- Consolidate the three reading-column widths (720/640/620px) to one,
  pending an explicit decision recorded in the PR.
- Fix the malformed `index.css:33` scrollbar declaration.
- Remove `!important`/attribute-selector hacks **only** where a semantic
  token now replaces the literal they targeted (do not leave orphaned
  hacks half-replaced).
- Do **not** touch content, interaction state, or dead code in this phase.

### Phase 3 — `refactor/content-contract-i18n`

- Create the `entities/` modules listed above.
- Migrate P0 content items from `CONTENT_AUDIT.md` first, in this order:
  `hero.headline` reconnect → `nav-section` (`SECTIONS`) → `pipeline-step`
  (`PIPELINE_STEPS`) → `domain-distribution` (`DOMAIN_DISTRIBUTION_DATA`,
  PROTECTED — call out explicitly in the PR) → the two `KoreaAIContextSection`
  / `ImpactSection` inline card sets.
- Introduce `shared/i18n` (`UiLanguageProvider`, `useUiLanguage`, `t()`)
  and replace the 122 `isKo ? x.ko : x.en` call sites in migrated modules.
  Widgets not yet migrated may keep their local `isKo` derivation until
  their content is moved — do not force a partial widget into a broken
  intermediate state.
- Flag the `OccupationSection.tsx` PROTECTED numeric baseline (24/31) for
  research-content sign-off in the PR description; migrate its provenance
  comment along with the values.

### Phase 4 — `refactor/interaction-features`

- Extract `features/observe-scroll-section` from `StoryProgress.tsx`.
- Fix the `PipelineSection.tsx` keyboard-accessibility defect (div→button)
  found in `INTERACTION_AUDIT.md` as part of consolidating that widget's
  card markup onto the shared primitive introduced in Phase 5 — or earlier
  if the shared primitive lands first; sequence at implementation time,
  but the defect must be fixed no later than Phase 5.
- Do not build a global selection store; the four selectable-card
  instances keep independent local state (see `INTERACTION_AUDIT.md`
  summary table).

### Phase 5 — `refactor/shared-ui-consolidation` (+ optional `chore/verified-cleanup`)

- Extract `Button`, `SelectableCard`, `TokenChip`, `StatCard`,
  `SectionEyebrow`/`SectionHeading` into `shared/ui`, consuming semantic
  tokens only.
- Migrate the 4 duplicated selectable-card implementations onto the new
  primitive.
- Remove `MultilingualSection.tsx` (dead file) and the 4 confirmed-unused
  dependencies (`@google/genai`, `express`, `dotenv`, `motion`,
  `@types/express`) — after a repo-wide reference re-scan and a passing
  build, per `ARCHITECTURE_AUDIT.md`. (The dual-lockfile situation this
  plan originally listed here is already resolved — there is no `bun.lock`
  in the repository; `package-lock.json` is canonical.)

## Explicit non-goals across all phases

No backend/API/router/CMS/database. No new visual redesign beyond what
tokenization and consolidation require. No change to research values,
tokenizer identity, sample sizes, or methodology claims (see
`CONTENT_CONTRACT.md`). No `!important` as a styling solution. No `any`/
`@ts-ignore` to silence type errors.
