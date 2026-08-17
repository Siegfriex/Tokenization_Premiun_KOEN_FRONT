# Tokenization Premium — KO/EN Frontend

Interactive, bilingual (KO/EN) data-journalism scrollytelling site presenting
the Token Premium research findings: the empirically observed gap in subword
token counts between semantically equivalent Korean and English text under a
fixed tokenizer (`o200k_base`).

## Stack

- React 19, TypeScript, Vite 6, Tailwind CSS v4
- Static single-page site — no backend, no API, no router, no database
- Deployed as a static build to Vercel (`main` branch), root-served
  (`vite.config.ts` `base: '/'`). See `docs/BASELINE.md` for deployment
  status and the retired legacy GitHub Pages setup.

## Status

This repository holds the canonical frontend baseline established from the
legacy prototype (previously developed at `mhbae0331/dsja_5_front`,
`fornt_refine` branch). The frozen, unmodified legacy state is preserved on
the `baseline/legacy-freeze` branch. Ongoing refactor work (design tokens,
layout primitives, content-contract migration, shared UI consolidation)
proceeds on dedicated branches and merges into `main` via reviewed PRs.

See `docs/BASELINE.md` for the canonical baseline record once published.

## Research content notice

This project visualizes research findings. Numerical results, the Token
Premium definition (`TP = T_KO / T_EN` under a fixed tokenizer on paired
sentences), tokenizer identity, sample sizes, and methodology notes are
protected research content and must not be altered by frontend/UI work.
