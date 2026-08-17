# Frontend Baseline

- Repository: `Siegfriex/Tokenization_Premiun_KOEN_FRONT`
- Legacy source: `mhbae0331/dsja_5_front`, branch `fornt_refine`
- Legacy source SHA: `69f573a53206e83d51736572437949591ecdbbf1`
- Remote initialization SHA (this repo's first commit): `95c2129c164510e7068240c85595b42681a2504c`
- Integration SHA (merge of the two, `--allow-unrelated-histories`, no force push): `4cadb6d8a862e786149defc62e4c1a4760edf299`
- Canonical baseline `main` SHA (PR #1 merge commit): `148a282f07c86a3dde072d19fcc79e2e3e252d42`
- Frozen historical branch (identical content to the integration SHA, never modified again): `baseline/legacy-freeze`
- Frozen date: 2026-08-17
- Stack: React 19, Vite 6, TypeScript 5.8, Tailwind CSS v4
- Deployment: static build to Vercel, `main` branch, root-served
  (`vite.config.ts` `base: '/'`). The legacy GitHub Pages workflow
  (`.github/workflows/deploy.yml`, triggered on the nonexistent
  `fornt_refine` branch in this repo) has been removed as part of
  `chore/deployment-and-tooling-alignment`. Vercel project linking
  (repo import + first production deploy) requires a one-time action in
  the Vercel dashboard by the repository owner, or a `VERCEL_TOKEN`
  provided to the orchestrator — the orchestrator does not have and does
  not seek Vercel credentials on its own. `vercel.json` (explicit
  `framework: vite`, `buildCommand`, `outputDirectory: dist`,
  `installCommand: npm ci`) is committed so the import is zero-decision
  once connected.
- Package manager: npm / `package-lock.json` is canonical.
  `bun.lock` has been removed (`chore/deployment-and-tooling-alignment`)
  to resolve the dual-lockfile ambiguity noted in `ARCHITECTURE_AUDIT.md`.
- Reading-column width: consolidated to `720px` everywhere
  (`ArticleReadingColumn`, `ArticleBigFinding`, `NewsHeroSection` lead
  paragraph). Wide-container width consolidated to `1360px` everywhere,
  including the sticky header (`StoryProgress.tsx`), fixing the header/body
  alignment drift documented in `DESIGN_AUDIT.md`.
- Routing: none (single-page scrollytelling article)
- Backend/API: none in scope for this repository

## Non-goals (this refactor)

- No backend, database, API, router, or CMS implementation
- No route architecture
- No changes to the `Tokenization_Premium` research repository or its SSOT
- No changes to tokenizer identity, sample sizes, TP definition, source
  citations, or research claims
- No unreviewed revision of numeric research values

## Baseline acceptance (verified 2026-08-17)

| Check | Result |
|---|---|
| `npm ci` | PASS — 252 packages, 0 vulnerabilities |
| `npm run build` (`vite build`) | PASS — see known defect below |
| `npm run lint` (`tsc --noEmit`) | PASS — 0 errors |
| tests | NOT_CONFIGURED — no test script exists |
| secret scan (tracked files, pattern-based) | CLEAN — no real secrets; `.env.example` holds placeholders only |
| CI checks on PR #1 | none configured (`.github/workflows/deploy.yml` triggers only on push to `fornt_refine`, which does not exist here) |

### Known pre-existing defect (not fixed at baseline)

`src/index.css` line 33 contains a broken CSS declaration:

```css
background: #DADAD6;#F7F8FA border-radius: 2px;
```

Vite's CSS optimizer (`lightningcss`) emits a build warning and silently
drops the malformed rule. This is carried over unmodified from the legacy
prototype and will be corrected as part of the design-token migration
(`refactor/foundation-tokens-layout`), not fixed retroactively on the
frozen `baseline/legacy-freeze` branch.

## Source inventory at baseline

```text
src/
├── App.tsx                                   (61 lines — composition root)
├── main.tsx                                  (10 lines)
├── index.css                                 (99 lines)
├── types.ts                                   (68 lines)
├── components/
│   ├── ArticleElements.tsx                   (219 — shared typography primitives)
│   ├── ArticleConclusionSection... (etc, see ARCHITECTURE_AUDIT.md)
├── data/
│   ├── articleContent.ts                     (623 lines)
│   └── storyData.ts                          (336 lines)
```

Full breakdown, dead-code findings, and dependency audit are in
`docs/ARCHITECTURE_AUDIT.md`.
