# Shot Specs

One entry per slide, append-only — filled *before* looking at screenshots
(the Accept/reject rule is written blind, so it isn't rationalized after
the fact). Criteria referenced (C1–C18): `docs/qa/VISUAL_QA_CRITERIA.md`.

Slide IDs follow the section `id` used in the DOM and in
`docs/audit/TRACE_LEDGER.md`'s widget codes: `S00-hero` (`NAV`/`HERO`),
`S01-compare` (`CMP`), `S02-pipeline` (`PIPE`), `S03-patterns` (`PREM`),
`S04-burden` (`BURD`), `S04.5-languages` (`LANG`), `S05-infrastructure`
(`INFRA`), `S05.2-impact` (`IMPACT`), `S06-method` (`METH`),
`S07-result` (`CONC`).

---

## S00-hero

| Field | Content |
|---|---|
| Intent | State the core finding — Korean costs more tokens than English for the same meaning — and establish the editorial (not marketing) register in one look. |
| Primary focal point | The H1 headline (`headlineLine1` + `HeadingAccent`-underlined `headlineLine2`). |
| Secondary focal points | The right-column "FIG. 01 / REAL TOKEN SPLIT EXHIBIT" card (concrete number backing the headline claim); the deck paragraph below the headline. |
| Forbidden competition | The top metadata row ("Data Journalism Investigation / 2026"), the quick-context stat ribbon (three small stat pairs), and the exhibit card's own internal numbers must all read as *supporting*, not co-equal to, the H1. |
| Layout skeleton | Asymmetric hero: left ~60% (eyebrow → H1 → subtitle → deck → stat ribbon), right ~40% (exhibit card + news-context note). |
| Risk zones | `headlineLine2` is KO/EN-length-asymmetric (Korean compounds vs. English phrase) — line-break point differs by language. The exhibit card's numeric content (`31 TOKENS`/`18 TOKENS`/`1.72×`) is Director-frozen (`DIRECTOR_DECISIONS.md` D2) — **any finding here is layout/spacing only, values are out of scope for this pass.** |
| Required states | default only — no interactive element in this section. |
| Required screenshots | 1440×KO, 1440×EN, 390×KO, 390×EN. |
| Accept/reject rule | Reject if the exhibit card's numbers visually out-weigh the H1 (font-size/color proximity), or if `headlineLine2`'s underline decoration collides with descenders/next-line content in either language, or if the stat ribbon wraps awkwardly at 390px. |

**Findings (iteration 3):**

- **P0 — C11 bilingual hierarchy violation.** `ARTICLE_CONTENT.introTheQuestion.keyFinding.bigNumber` was a flat
  (non-localized) string `'약 1.2× ~ 1.8×'` — every sibling field in the
  same object (`label`, `statement`) is `{ ko, en }`, this one alone
  wasn't. Result: in EN mode, the hero's single largest, most climactic
  display number ("CORE EMPIRICAL FINDING") rendered with an untranslated
  Korean word ("약") sitting directly in front of the numerals — an
  English reader sees a foreign glyph inside the one element the whole
  slide's hierarchy points at. This is exactly what C11 exists to catch:
  fitting was never the issue, rank/legibility was, and it only showed up
  in the language state that wasn't the default screenshot.
  **Fixed:** `bigNumber` is now `{ ko: '약 1.2× ~ 1.8×', en: '~1.2× – 1.8×' }`
  (type updated in `entities/article-content/model/types.ts`); widget reads
  the localized value via `isKo ? … .ko : … .en`. Not a research-value
  change — the number `1.2×–1.8×` is unchanged in both languages, only the
  untranslated qualifier word is now translated. Re-screenshotted EN at
  1440/390: clean.
- C1/C6/C8/C9/C13: pass at all 4 required shots (1440×KO, 1440×EN,
  390×KO, 390×EN). H1 wins first look clearly against the exhibit card and
  stat ribbon; no overflow; eyebrow/H1 left edges align.
- **Not fixed, logged only (frozen, out of scope):** the FIG. 01 exhibit
  card's `31 TOKENS` / `18 TOKENS` / `1.72×` are Director-queued (D2) —
  confirmed still rendering unchanged, not touched by this pass.

---
