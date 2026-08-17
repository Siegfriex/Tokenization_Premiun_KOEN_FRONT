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

---

## S03-patterns

| Field | Content |
|---|---|
| Intent | Prove the core `1.29×–1.83×` Token Premium range empirically, then let the reader explore *where* it comes from by domain. |
| Primary focal point | The tier-1 left panel's `1.29×~1.83×` headline number — this is the slide's one central claim. |
| Secondary focal points | The tier-2 right panel (6-row interactive domain-distribution list) — supports/explores the claim, does not restate it. |
| Forbidden competition | Before this pass: the two panels used identical `border border-rule shadow-xs` treatment and genuinely competed for first look (Director's cited example) — see `docs/qa/DESIGN_LAW.md`. |
| Layout skeleton | Two-column breakout: tier-1 metric card + tier-3 formula box (left, 5/12), tier-2 domain list (right, 7/12). |
| Risk zones | The Director-frozen `PREM-*` numeric claims (D1) live in this exact panel — tier styling (border/shadow) only, no text/value touched. |
| Required states | default (no interactive element in the left panel itself; the right panel's `SelectableCard` rows have their own default/selected states, already covered in earlier iterations' domain-list check). |
| Required screenshots | 1440×KO (tiered). |
| Accept/reject rule | Reject if both panels still read as equal weight, or if the tier-1 border/shadow bleeds into overflow/misalignment on the frozen numeric content. |

**Findings:** applied `docs/qa/DESIGN_LAW.md`'s 3-tier card system — left
panel → tier 1 (`border-2 border-rule-strong shadow-sm`, was identical to
right panel), right panel → tier 2 (unchanged, already correct), formula
box → tier 3 (`bg-surface-alt`, no shadow, was tier-2 treatment).
Screenshot confirms clear first-look precedence: left panel's border
weight and shadow depth now unambiguously outrank the right panel and the
formula note. 0 overflow (all `bg-surface*` panels checked). `NUMERIC_CLAIMS.md`
line numbers shifted (+1, a new comment line) but all 22 claims'
Trace IDs, statuses, and values unchanged — verified via diff.

---

## S01-compare

| Field | Content |
|---|---|
| Intent | Make the abstract "Korean uses more tokens" claim concrete and falsifiable — let the reader pick a real sentence pair and watch it split into subword tokens. |
| Primary focal point | The selected pair's split-column exhibit (KO token chips vs. EN token chips) — the visual proof, not the selector row that produces it. |
| Secondary focal points | The 4-card pair selector row (drives the exhibit); the two big token-count numbers under each column. |
| Forbidden competition | The `SectionHeading` ("통계보다 직관적인, 실제 문장으로 알아보자") must not compete with the exhibit once scrolled to — it's an entry, not a persistent focal point. |
| Layout skeleton | Section header → reading-column lead/paragraphs → full-width breakout (4-card selector row, then 2-column KO/EN split exhibit with token chips + count banners) → bottom observation strip. |
| Risk zones | Token-chip `flex-wrap` rows (`min-h-[90px]`, per earlier audit finding) — long tokenized sentences could wrap to many rows; KO sentence display (`selectedPair.hangulText`) at `text-xl sm:text-2xl` could wrap differently per pair; 4-card selector labels are KO/EN context tags of uneven length. |
| Required states | default (pair 1 selected) / selected (click pair 2, 3, 4 in turn) / focus. |
| Required screenshots | 1440×KO×pair1, 1440×KO×pair3(clicked), 1440×EN×pair1, 390×KO×pair1, 390×KO×pair3(clicked). |
| Accept/reject rule | Reject if switching pairs causes any token-chip row or the KO sentence display to overflow/reflow the card height unevenly across pairs (a visibly "jumping" card height on selection is a hierarchy/rhythm defect, C10/C13), or if the 4-card selector's active state fails C3/C12. |

**Findings (iteration 4):**

- **P1 — C14/C18 scroll-anchor deficit, site-wide, not slide-local.** While
  testing the pair-selector state at S01, found `scroll-mt-12` (48px) on 8
  of 10 sections' root `<section>` is less than the sticky header's real
  height (`h-14` 56px + 2px progress bar = 58px) — a 10px deficit. A real
  anchor-nav click (`href="#compare"`, not a scripted scroll) lands the
  section's top **10px under the header**, clipping the first ~1.5 lines
  of the lead paragraph for every reader who clicks a nav link, every
  section except hero/result. This is edge discipline (C14) failing
  site-wide, not a single-slide defect, so fixed globally rather than
  deferred to each section's own iteration. **Fixed:** `scroll-mt-12` →
  `scroll-mt-16` (64px, 6px clearance) across all 8 sections. Verified with
  a **real nav-link click** (not a scripted `scrollIntoViewIfNeeded`):
  section top lands 63.6px from viewport top post-click, clean.
- **Methodology correction:** `elementHandle.screenshot()` on a section
  taller than the viewport produced a misleading artifact — Chromium
  temporarily resizes its capture viewport to fit the whole element, and
  the `position: sticky` header renders "stuck" mid-capture at a scroll
  offset that doesn't correspond to any real user scroll position. This
  looked exactly like a header-overlap bug on first read (both desktop and
  390px captures) and would have been a false P1 if trusted. Ground truth
  is a **real nav-link click** + `window.scrollY` / `getBoundingClientRect()`
  read, not a full-element screenshot of an oversized section. Recorded so
  the next iteration doesn't re-chase this artifact (same discipline as
  iteration 2's C2 false-positive note).
- Pair-switching (C1/C10/C13): clicked pair 1→3, card height/token-chip
  wrap grows with content (11→18 KO tokens) without any visual jump —
  acceptable, expected behavior, not a rhythm defect. C3 active-state
  coverage on the pair-selector: clean.
- C6/C1: clean at all 5 captured shots.

---

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
