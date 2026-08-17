# Architecture Audit

Snapshot taken at canonical baseline `148a282f...` (see `docs/BASELINE.md`).

## Package manager / scripts

- Dual lockfiles present: `package-lock.json` (npm) and `bun.lock` (bun).
  Only one should be canonical; `npm ci` was used for baseline verification
  since `package.json` scripts assume npm. **Decision needed in Phase 1
  follow-up: pick one package manager and remove the other lockfile.**
- `package.json` scripts: `dev`, `build`, `preview`, `clean`, `lint`
  (`tsc --noEmit` — this is the project's typecheck, not a linter in the
  ESLint sense; no ESLint/Prettier config exists in the repository).
- No `test` script. No test framework dependency present.

## Entry points / config

- `src/main.tsx` — mounts `<App />` into `#root`.
- `src/App.tsx` — composes 12 section components in a fixed vertical order,
  holds the single piece of app-wide state (`uiLang`) and passes it as a
  prop to every section (see `INTERACTION_AUDIT.md`).
- `vite.config.ts` — `base: '/dsja_5_front/'` (GitHub Pages sub-path;
  **must be updated to match this repository's Pages path** when
  deployment is reconfigured), `@` alias to project root (not a layered
  alias), manual chunk split for `recharts`.
- `tsconfig.json` — `"paths": { "@/*": ["./*"] }`. Generic root alias;
  no per-layer aliases (`@shared/*`, `@entities/*`, etc.) exist yet.
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages,
  triggered only on push to `fornt_refine`. **This branch does not exist
  in the new repository; the workflow is currently dormant.** Updating
  its trigger branch and the Pages target is an explicit, separate,
  user-reviewed decision (deployment config changes are flagged as
  destructive-adjacent per the execution mandate) — not performed in this
  audit.

## Routing / backend

- No router library, no route table, no server framework in `dependencies`
  actually used by `src/`. Confirmed: `express` and `@google/genai` are
  listed in `package.json` but **not imported anywhere under `src/`**
  (see Dead dependencies below). This confirms the product requirement
  that no backend/routing work is needed.

## Full source map (all files under `src/`)

| File | Lines | Role | Imported by App.tsx? |
|---|---:|---|---|
| `App.tsx` | 61 | composition root | — |
| `main.tsx` | 10 | entry | — |
| `index.css` | 99 | global styles (see DESIGN_AUDIT.md) | — |
| `types.ts` | 68 | shared domain types | — |
| `data/articleContent.ts` | 623 | bilingual editorial copy, keyed by section | indirectly (all sections) |
| `data/storyData.ts` | 336 | structured content: sentence pairs, occupation/multilingual/policy/methodology data | indirectly |
| `components/ArticleElements.tsx` | 219 | shared typography (Lead/Paragraph/Finding/etc.) | indirectly |
| `components/StoryProgress.tsx` | 123 | header, nav, language switch, scroll progress | **yes** |
| `components/NewsHeroSection.tsx` | 212 | hero (S0) | **yes** |
| `components/TokenCompareSection.tsx` | 256 | sentence-pair compare lab (S1) | **yes** |
| `components/PipelineSection.tsx` | 216 | pipeline steps (S2) | **yes** |
| `components/TokenPremiumSection.tsx` | 226 | corpus/domain analysis (S3) | **yes** |
| `components/OccupationSection.tsx` | 351 | accumulated burden simulator (S4) | **yes** |
| `components/MultilingualTokenEfficiencySection.tsx` | 333 | global language chart (S4.5) | **yes** |
| `components/KoreaAIContextSection.tsx` | 216 | infra context (S5) | **yes** |
| `components/ImpactSection.tsx` | 218 | socioeconomic impact (S5.2) | **yes** |
| `components/MethodSection.tsx` | 174 | methodology accordion (S6) | **yes** |
| `components/EditorialConclusionSection.tsx` | 102 | conclusion | **yes** |
| `components/Footer.tsx` | 86 | footer | **yes** |
| `components/MultilingualSection.tsx` | 417 | **not imported anywhere** | **no — dead file** |

## Dead code

### `src/components/MultilingualSection.tsx` (417 lines)

Not referenced by `App.tsx` or any other file (`grep -rn "MultilingualSection"`
matches only its own filename and unrelated substring hits). Superseded by
`MultilingualTokenEfficiencySection.tsx`, which *is* wired into `App.tsx`
and covers the same subject (per-language token efficiency) with a Recharts
bar chart instead of this file's custom table/hover UI.

**Recommendation:** remove in `chore/verified-cleanup` after confirming
with the user that no in-progress design intent from this file (e.g. its
table layout or hover-detail card) should be ported into the shared UI
library first. Do not delete silently — flag for explicit confirmation
per the execution mandate's "no false-positive unused code removal" rule.

## Dead dependencies

Verified via `grep -rn` across `src/` for import/require statements —
apparent text matches for these package names in prose strings ("Gemini",
"tokens") were manually excluded as false positives.

| Dependency | package.json | Imported in `src/`? | Recommendation |
|---|---|---|---|
| `@google/genai` | `^2.4.0` | No | Remove |
| `express` | `^4.21.2` | No | Remove |
| `dotenv` | `^17.2.3` | No | Remove |
| `motion` | `^12.23.24` | No | Remove |
| `@types/express` | `^4.17.21` (dev) | No (matches unused `express`) | Remove |

These are scaffold remnants from the original Google AI Studio project
template (see `.env.example`, `metadata.json` referencing `GEMINI_API_KEY`
/ `APP_URL` / Cloud Run — none of which this static site uses). Removing
them is a pure dependency-surface reduction; no source file references
them, so removal carries no functional risk. Verified in
`chore/verified-cleanup` with a fresh `npm ci && npm run build && npm run lint`
after removal.

`recharts`, `lucide-react` are actively used (see below) and must be kept.

## Actually-used third-party dependencies

| Dependency | Used in |
|---|---|
| `react`, `react-dom` | everywhere |
| `recharts` | `MultilingualTokenEfficiencySection.tsx` only |
| `lucide-react` | `NewsHeroSection`, `TokenCompareSection`, `PipelineSection` (icons imported, see below), `Footer`, `MethodSection`, `OccupationSection`, `EditorialConclusionSection`, `MultilingualSection` (dead file) |
| `@tailwindcss/vite`, `tailwindcss` | build-time |

Note: `PipelineSection.tsx` does not actually import any `lucide-react`
icon despite being visually similar to sibling sections — verify per-file
icon usage during the shared-UI consolidation pass rather than assuming
uniformity.

## Component graph (high level)

```text
App
├── StoryProgress        (language switch, scroll progress, section nav)
├── NewsHeroSection       (uses ArticleElements: ReadingColumn/Lead/Paragraph/PullQuote/BigFinding)
├── TokenCompareSection   (uses ArticleElements: ReadingColumn/Lead/Paragraph/FigureCaption/Finding/FullWidthBreak)
├── PipelineSection       (same ArticleElements subset + Subheading)
├── TokenPremiumSection   (same)
├── OccupationSection     (same)
├── MultilingualTokenEfficiencySection (same + recharts)
├── KoreaAIContextSection (same)
├── ImpactSection         (same)
├── MethodSection         (ArticleElements subset, no FigureCaption/Finding)
├── EditorialConclusionSection (ArticleElements: ReadingColumn/Lead/Paragraph only)
└── Footer                (no ArticleElements — its own markup)
```

Every section widget independently imports `ARTICLE_CONTENT` (and
sometimes `storyData` exports) and repeats the same
`isKo ? x.ko : x.en` branching per string (122 occurrences across the
codebase — see `CONTENT_AUDIT.md` and `INTERACTION_AUDIT.md`).

## Routes / backend — explicit statement

- Routes: **none exist**. Section navigation is anchor-link (`#hero`,
  `#compare`, ...) scroll, not client-side routing.
- Backend/API: **none exist and none are required.** This confirms the
  project constraint that architecture work must stay entirely in the
  presentation layer.
