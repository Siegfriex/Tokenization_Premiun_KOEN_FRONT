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

**Findings (redline pass, 2026-08-17):** Director redline applied — 3
concrete changes. (1) H1 `font-bold`→`font-extrabold`, `leading-[1.15]`→
`leading-[1.1]` (cover-only exception, documented in `docs/qa/DESIGN_LAW.md`
so it doesn't propagate to other slides' `SectionHeading`) — "heavier"
left title block via weight, not size, staying inside the typography law.
(2) Right FIG.01 exhibit card: removed `border border-rule`, kept
`bg-surface-alt` — reads as a soft supporting zone, not a competing
bordered panel. (3) `introTheQuestion.preFigureParagraphs` (`ko`/`en`):
merged former paragraphs 1+2 into one (identical sentences, zero wording
change), paragraph 3 stands alone as the second — 3→2 paragraphs.
Screenshotted 1440×KO/EN: title reads heavier, evidence box recedes,
"제목→부제→첫 증거" order reads immediately in both languages. tsc clean,
build passes, audit pipeline diff-reproducible, director queue still 16
(no frozen claim touched — only container chrome + paragraph grouping of
already-approved sentences).

**Findings (visual devpass, 2026-08-18, Iteration 11):** One change,
label tone only. FIG.01 exhibit card's `dt` label ("FIG. 01 / REAL TOKEN
SPLIT EXHIBIT") `text-ink font-bold` → `text-ink-body font-semibold` —
one register quieter, so the exhibit reads more explicitly as a
supporting illustration rather than a co-equal headline claim (D2's
values remain untouched — this is the layout/spacing-only intervention
the risk-zone note above already scopes this pass to). Verified via
Playwright: computed `color: rgb(71, 85, 105)` (`--color-ink-body`)
resolves correctly; H1 bounding box remains larger/higher than the
exhibit card's at 1440×KO. tsc clean, build clean (CSS hash unchanged —
no new utility introduced, only reused tokens).

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 1):** Director's
first Human Preview annotated screenshots (`AUDIT2/S0.png`) against the
production-promoted state (see `docs/editorial/HUMAN_PREVIEW_01_MASTER.md`
§B). 4 directives closed: (1) `HP01-S0-R01` — removed "COVER & CORE
THESIS" all-caps English metadata, Koreanized "Data Journalism
Investigation" → "데이터 저널리즘". (2) `HP01-S0-R02` — FIG.01 exhibit
header "REAL TOKEN SPLIT EXHIBIT" → Korean "실제 토큰 분절 비교", "Pair
Benchmark" → "문장쌍 비교" (KO mode only; EN mode keeps English by
design, dual-canonical). (3) `HP01-S0-R03`/`R04` — removed the
`ANALYSIS TARGET`/`CORE METRIC`/`OBSERVED GAP` stat-ribbon table
entirely (RED "표제거요망"). (4) `HP01-S0-B01` — `ArticleBigFinding`'s
number display (only consumer: this slide's "약 1.2×~1.8×") reduced
`text-6xl…text-9xl` → `text-5xl…text-7xl`, added `whitespace-nowrap`,
so it reads as one compact inline figure instead of a sprawling
multi-line block. Verified 1440/390 × KO/EN: 0 overflow, all 4 changes
visually confirmed. tsc clean, build clean.
**Deferred, not closed:** `HP01-S0-R05` (FIG.01 exhibit's takeaway/
news-note content "belongs in the conclusion, remove or rewrite at
intro") — needs coordinated decision against S7's own directives before
patching; tracked in MASTER, not silently dropped.

---

## S02-pipeline

**Recovered 2026-08-18** from `qa/loop-iteration-6` (PR #14, never
merged into `main` — this section was entirely missing from `main`'s
copy of this file, only the slide-ID list at the top of this document
mentioned `S02-pipeline` by name). Folded in verbatim, content unchanged
from the original branch; only this recovery note and the newer
iteration-13 finding below are new.

| Field | Content |
|---|---|
| Intent | Show token generation as a 5-step pipeline and name exactly one step — Tokenization — as where the KO/EN gap originates. |
| Primary focal point | Step 2 (`TOKENIZATION`, `item.highlight: true`, permanently accent-filled regardless of click state) — the "★ STEP 02: THE BOTTLENECK" meta-label above the row states this explicitly in words, so the visual must agree with the text. |
| Secondary focal points | The other 4 steps, outline-variant, equal weight to each other. |
| Forbidden competition | No second step should carry accent fill or bold weight strong enough to rival step 2. |
| Layout skeleton | 5-column horizontal row of `SelectableCard` (`variant="outline"`), one row, equal-width. Not a tiered-panel layout (unlike S03) — the hierarchy signal here is emphasis-within-a-collection, not panel-vs-panel. |
| Risk zones | 5 equal-width columns at 390px will stack — check the stack order still reads step 1→5 top-to-bottom without step 2 visually floating away from its numeric sequence; KO step descriptions vary in length per step. |
| Required states | default (step 2 pre-emphasized) / clicked (user selects a different step, e.g. step 4) — does clicking step 4 dilute step 2's "this is the bottleneck" claim, or do both signals coexist legibly? |
| Required screenshots | 1440×KO×default, 1440×KO×step4-clicked, 390×KO×default. |
| Accept/reject rule | Reject if step 2 doesn't win first look at 1440px default, or if clicking another step leaves two steps both reading as "important" at once (accent-fill + outline-selected both present with no clear rank between them). |

**Findings: PASS, no fix applied.** All 3 required shots clean. Step 2
("GAP ORIGIN" badge + solid accent fill) unambiguously wins first look at
1440×default, matching the "★ STEP 02: THE BOTTLENECK" meta-label's claim
— text and visual agree. Clicked step 4: gains a distinct *outline*
treatment (border-ink, no fill) that reads as "currently inspecting,"
categorically different from step 2's permanent accent fill ("this is
where the finding says the gap originates") — the two signals coexist
without competing because they use different visual languages
(`emphasized` content-flag vs. `selected` interaction-flag, per
`SelectableCard`'s own design rationale). This is the slide's answer to
the Director's Priority 2 (declare one focal point) already correctly
implemented before this pass — not every slide needs a fix; this one is
the counter-example that the tier/focal-point system is a real bar, not
busywork applied uniformly. 390px stack: order preserved 01→05, step 2
still reads distinctly. C1/C8/C12 all pass. 0 overflow.

**Findings (visual devpass, 2026-08-18, Iteration 13): PASS reconfirmed,
no visual fix — one content-integrity flag logged, not resolved.**
Re-verified the 2026-08-17 PASS with fresh Playwright: `aria-pressed`
+ class inspection after clicking step 4 confirms step 2 keeps
`bg-accent` fill permanently (never `aria-pressed`, never loses fill)
while step 4 gets `aria-pressed="true"` + outline-only (`border-ink`,
no `bg-accent`) — the fill-vs-outline distinction holds exactly as
documented. Zero horizontal overflow at 390px, DOM-scanned.
**Content-integrity flag (not fixed, not a visual-QA item):** the
pre-figure subheading reads "AI 입력 파이프라인의 **4단계**" and the
post-figure paragraph enumerates exactly 4 named stages ([원본 문자열
입력]→[UTF-8 인코딩]→[BPE 어휘집 대조]→[토큰 ID 벡터 생성]), while the
figure directly between them visualizes **5** numbered steps (adds
`03 PAYLOAD` / `04 PROCESSING` / `05 OUTPUT` beyond the 4 named stages).
This may be intentional — the "4단계" prose could be describing only the
narrower text→token-ID *encoding* sub-pipeline (steps 1-2 of the 5),
with steps 3-5 covering separate post-tokenization inference stages — but
a general-public reader hits "4단계" then a 5-card row immediately below
it with no bridging sentence. This is a copy/entity-structure question
for the content owner (same category as the LOOP_LOG Iteration 8
"12-language"/Hindi flag), not something a visual-only pass should
silently rename or recount. Logged in `docs/qa/LOOP_LOG.md` Phase 7.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 3):** 7
directives closed (`HP01-S2-R01`, `R02`, `R04`, `B01`, `B02`, `B03`) —
`R03` ("4단계" vs 5-step mismatch) stays `BLOCKED_CONTENT_AUTHORITY`,
untouched, per the pre-existing flag above.

Exact changes, `PipelineSection.tsx`:
- **Removed entirely** (R01/R02, RED "제거"): the `<dl>` header row
  reading `TRANSFORMER PIPELINE SEQUENCING` (left) /
  `★ STEP 02: THE BOTTLENECK` (right) — the whole row is gone, not
  translated, since the annotation explicitly wants it gone, not
  Koreanized.
- **Removed** (R02): the `GAP ORIGIN` pill badge on step 2's card.
  Step 2's `bg-accent` fill (the actual visual "this is the bottleneck"
  signal, driven by `item.highlight` — a style property, not a text
  label) is untouched — only the redundant text badge is gone.
- **Rewrote** (R04), `entities/article-content.ts` `tokenUnit.figureCaption.ko`:
  `'생성형 AI 텍스트 처리 파이프라인: 원본 문자열에서 토큰 ID 벡터로의 변환'`
  → `'문장이 토큰으로 바뀌는 과정'`. `figureSource` (`'출처: BPE
  (Byte-Pair Encoding) 표준 아키텍처 및 LLM 입력 전처리 명세'`) is
  **unchanged** — G06 requires keeping real provenance, only the caption
  prose above it was rewritten.
- **New shared component** (B01/B02/B03), `ArticleElements.tsx`: added
  `ArticleDisclosure`, a `<details>`/`<summary>`-based 2DEPTH reveal
  (no JS state, `group-open:rotate-90` chevron, `border-l-2 border-rule`
  indent for the revealed content) — this is the project's first
  from-scratch 2DEPTH primitive (S6's accordion is a bespoke
  `useState`-driven pattern; this one is simpler and reusable for
  future 2DEPTH needs across other slides).
- **Restructured** the post-figure reading column: previously
  `postFigureParagraphs` (the two technical paragraphs, including the
  Self-Attention/Context Window explanation) rendered directly at
  1DEPTH, followed by `ArticleFinding`. Now `ArticleFinding` (the short
  "토큰 분절이 늘어날수록 입력 시퀀스가 길어져…" takeaway) renders
  first, and `postFigureParagraphs` moved inside
  `<ArticleDisclosure summary="토큰화 처리 과정 자세히 보기">` — 1DEPTH
  now shows the visual + one-sentence finding; the two detailed
  paragraphs (BPE steps, Self-Attention scaling) sit behind the toggle.
  No paragraph text itself was reworded, only relocated.

Research-content impact: NONE — the figure caption rewrite is editorial
prose, not a research value; `PIPELINE_STEPS` entity data and the two
relocated paragraphs are byte-identical to before, just moved in the DOM.

Verified 1440×KO: 0 overflow, step 2 accent-fill still wins first look
(confirmed via screenshot, not just source reading), disclosure opens/
closes correctly, FIG.02 caption reads naturally. tsc clean, build
clean. 390/EN regression pending the pre-acceptance sweep.

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

**Findings (visual devpass, 2026-08-18, Iteration 14): frozen, no
change — verified only.** Per the editorial redline directive, this
slide's Tier-1 headline visual weight is frozen pending
`docs/audit/DIRECTOR_DECISIONS.md` D1. Checked for any non-D1-adjacent
layout defect at 390px: zero DOM overflow; the "Domain Range: Business
(1.44×) ~ Daily (1.83×)" `dl` row wraps to two lines at 390px, but this
is ordinary label wrap (no clipping, no overlap), not a layout defect —
left as-is rather than restructured, since restructuring around this
specific frozen row invites scope creep into D1 territory. **Supplementary
observation for D1 (not a new separate flag — logged as evidence toward
the existing row):** the pre-figure prose itself contains a third number
for the same claim — "일상적인 표현이나 구어체에서는 상대적 차이가 더
크게 나타났고(**1.38×**~1.83×)" — differing from the Tier-1 headline's
`1.29×~1.83×` lower bound. Not added as a new `DIRECTOR_DECISIONS.md` row
(that's the audit pipeline's trace-extraction job, not a visual-pass
edit); noted here so whoever resolves D1 has this additional data point.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 4):** 6
directives closed (`R01`, `R02`/`B01` combined, `R05` combined into R01,
`R06`, `R07`); `R04` stays `BLOCKED_CONTENT_AUTHORITY` (D1, unchanged).

Exact changes, `TokenPremiumSection.tsx` (all `isKo`-gated, EN mode
unaffected):
- `CORE EMPIRICAL METRIC` → `핵심 실측 지표`
- `OBSERVED TOKEN PREMIUM RATIO` → `관측된 토큰 프리미엄 비율` — **the
  number itself (`1.29×~1.83×`) was not touched**, confirmed via
  post-edit DOM text-scan (`1.29`/`1.83`/`1.68`/`1.44` all still present,
  byte-identical)
- `MATHEMATICAL FORMULA` → `산출 공식`
- `Token Premium = Tokens(Hangul) / Tokens(English)` →
  `Token Premium = 한국어 토큰 수 ÷ 영어 토큰 수` (KO mode) — the
  relationship expressed is unchanged, only the variable names were
  translated; "Token Premium" itself kept per G02 (established term).
  This also closes `R02`/`B01` — the Director's requested "term +
  worked example" format was already the Tier-3 box's own structure,
  translating it in place satisfies the directive without inventing new
  copy.
- `DOMAIN DISTRIBUTION EXHIBIT` → `도메인별 분포`
- `entities/article-content.ts` `corpusAnalysis.postFigureParagraphs.ko`
  (`R07`, the "어렵게 설명" flag): `"특히 장문의 고유명사와 정형화된
  서식 비중이 높은 지식집약적 도메인일수록, 토큰 수의 절대적 격차가
  누적되어 컨텍스트 윈도우 점유율에 실질적인 제약을 가져옵니다."` →
  `"특히 전문 용어와 격식체 표현이 많은 지식집약적 문서일수록 토큰 수
  격차가 쌓여, AI가 한 번에 처리할 수 있는 분량(컨텍스트 윈도우)에
  실질적인 제약이 생깁니다."` — same meaning, shorter noun clauses,
  "컨텍스트 윈도우" gets an inline plain-language gloss instead of
  assuming the reader already knows it (G02/G09).
- `R05` (data before English UI terms) — resolved as a byproduct of
  `R01`: the Tier-1 panel's own header label is now Korean, so the
  headline number no longer sits directly under an English label.

Research-content impact: NONE on any numeric/methodology value — the
formula's mathematical meaning and every ratio/percentage is
byte-identical; only label/prose language changed. `R04` (D1) remains
untouched and blocked.

Verified 1440×KO: 0 overflow; DOM text-scan confirms all protected
numbers (`1.29`, `1.83`, `1.68`, `1.44`) present and unchanged; `7
Benchmark Domains` (part of the still-open D1 block) correctly left
untouched. tsc clean, build clean.

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

**Findings (visual devpass, 2026-08-18, Iteration 12): PASS, no fix
applied.** Tightened re-screening per Director instruction (do not accept
a clean pass at face value). Checked: (1) real per-viewport screenshots
(not `elementHandle.screenshot()` — confirmed the sticky-header
mid-capture artifact this file's own iteration-4 note warns about
reproduces exactly as described when that method is used; avoided this
time) at 390×KO across 3 scroll positions — header, 4-card selector
(all 4 pairs render, correctly ordered), KO/EN exhibit. (2) EN 390:
switched language, DOM-scanned every descendant of `#compare` for
`scrollWidth > clientWidth` — zero overflow candidates; 4-card context
tags ("General Description" / "Corporate Operations" / "Scientific
Literature" / "Public Administration", the risk zone this file already
flagged as uneven-length) do not wrap awkwardly at either language.
(3) KO/EN token-count banner weight asymmetry (`font-black` KO vs
`font-bold` EN) — confirmed intentional, mirrors the `bg-accent` (KO,
emphasized subject) vs `bg-mark-baseline` (EN, comparison baseline) dot
distinction already in the accent-dot markup; not a defect. No code
change this iteration — a real clean state, not an unexamined one.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 2):** 4
directives closed, 1 already satisfied. (1) `HP01-S1-R01` — CTA sentence
ending changed from imperative "…직접 비교해보십시오." to declarative
"…직접 비교한다." (register interpretation of ambiguous handwritten
annotation "1. "확인" 2. "비교" 명사 종결…" — chosen reading: remove the
formal-command tone, not necessarily a literal noun-ending; flagged for
Director re-confirmation if the intent was stricter). Entity-content
change (`entities/article-content`), not a protected research value —
editorial microcopy only. (2) `HP01-S1-R02`/`R03` — `한국어 (Hangul
Script)` / `ENGLISH (Latin Script)` column headers → `한국어` / `영어`
in KO mode (EN mode keeps the fuller English label, dual-canonical). (3)
`HP01-S1-R05`/`R06` — bottom "Token Ratio: N× (+M additional tokens)"
→ Korean "토큰 비율 N× (+M개 토큰)" in KO mode. **`HP01-S1-R04`
(replace FIG.01 position with "검증된 대역 문장쌍 선택" heading) —
already satisfied structurally**: the selector's own heading already is
"검증된 대역 문장쌍 선택:" and `FIG. 01` only appears at the bottom
`ArticleFigureCaption`, not competing with the top heading — no change
needed, verified by re-reading the current DOM order. Verified 1440×KO/EN:
0 overflow, all changes render correctly, EN mode fully unaffected
(all edits `isKo`-gated). tsc clean, build clean.

---

## S07-result

| Field | Content |
|---|---|
| Intent | Seal the entire research into one closing question — a judgment scene, not a summary slide. |
| Primary focal point | The `display`-scale H2 question ("우리는 같은 의미를, 같은 비용으로 표현하고 있는가?") — the Director's own read: "이미 전 장면의 감정과 논지를 먹고 있다," keep entirely as-is. |
| Secondary focal points | The lead line immediately below (was a repeated quote of the H2 — redlined, see Findings); the 2-paragraph synthesis; a quiet pull-quote. |
| Forbidden competition | The pull-quote box and the "Back to Top" button must read as epilogue devices, not co-equal statements or a CTA rivaling the question. |
| Layout skeleton | Centered `my-auto` column: display heading → reading column (lead, 2 paragraphs, pull-quote) → bottom rule + footer/exit-button row. |
| Risk zones | `preFigureParagraphs[0]` carries the PROTECTED `1.29× ~ 1.83×` range verbatim — any paragraph-merge must preserve it byte-for-byte. The pull-quote box duplicates paragraph 2's content almost verbatim (pre-existing, not introduced by this pass) — visual-only fix applied, wording not touched (out of this pass's scope). |
| Required states | default only — no interactive element besides the exit button (no distinct "active" state to test). |
| Required screenshots | 1440×KO, 1440×EN, 390×KO. |
| Accept/reject rule | Reject if the lead line still reads as a repeated question rather than a conclusive statement, if the pull-quote box still visually rivals the body paragraphs, or if the bottom button still reads as a primary CTA (accent fill on hover). |

**Findings (Director redline pass, 2026-08-17):** 5 concrete changes applied.
(1) `lead` replaced — was a verbatim quote of the H2 question (repetition,
not reinforcement); now reuses the previously-unused `headline` field
("같은 의미는, 같은 길이가 아니었다" — reformatted into one declarative
sentence) rather than inventing new copy, per Director's explicit direction
to swap the opening line for "결론적 문장." (2) `preFigureParagraphs`
3→2, former paragraphs 1+2 merged verbatim (PROTECTED `1.29×~1.83×` range
preserved byte-for-byte — confirmed via diff), paragraph 3 stands alone.
(3) Pull-quote box: `border-l-2 border-rule-strong` → `border-l
border-rule`, text color `text-ink` → `text-ink-body` — one visible step
quieter. (4) Bottom "Back to Top" button: dropped `hover:bg-accent
hover:text-on-accent hover:border-accent` + `font-bold` + `shadow-2xs`;
now a neutral `hover:bg-surface-alt hover:border-ink` + `font-semibold`,
no shadow — reads as exit navigation, not a CTA. Footer date-stamp text
`text-ink-muted` → `text-ink-subtle`, one step quieter. (5) `Container`
`space-y-12` → `space-y-10`, tightening the headline-to-body gap.
Screenshotted 1440×KO/EN + 390×KO: 0 overflow, all 5 changes visually
confirmed, PROTECTED numeric range unchanged. tsc clean, build passes,
audit pipeline diff-reproducible, director queue unchanged at 16.

**Findings (visual devpass, 2026-08-18, Iteration 20): 1 fix, Korean
word-break only — H2/lead/protected range untouched.** The pull-quote
`<p>` (a raw element, not routed through the shared Article components)
was breaking two words mid-syllable at 390px: "다국어" (multilingual)
as "다국"/"어", and "형평성과" as "형평"/"성과". Added `break-keep`.
Re-verified via screenshot: both words now intact, break points fall at
real spaces. **Explicitly did not touch:** the display H2 (kept as a
question, per the Director's own prior ruling — this pass has no
authority to change that), the lead line, or the protected `1.29×~1.83×`
range (confirmed byte-identical). This closes out the last slide in the
S00→S07 work order — every slide has now received a visual devpass this
phase (2026-08-18).

**Findings (Director redline pass, 2026-08-17):** 2 concrete changes,
superseding iteration 6's "PASS, no fix" — the earlier pass checked C1/C8/
C12 (does the highlighted step win, does it break), which it did; the
redline goes further ("didactic, not editorial" density + relative
recession of the other 4 steps). (1) `tokenUnit.preFigureParagraphs`
merged 2→1 (identical sentences, no wording change) — top explanation now
reads as one instructional block. (2) Non-highlighted steps' title color
`text-ink` → `text-ink-body` and description color `text-ink-muted` →
`text-ink-muted` (border-adjacent description already muted; title was
the one still at full ink strength) — steps 01/03/04/05 now recede one
further step relative to step 02's accent fill, so "the bottleneck" reads
as a discovery, not merely the loudest of five equals. Screenshotted
1440×KO: 0 overflow, step 02 unambiguous focal point, others visibly
quieter. tsc clean, build passes, audit pipeline diff-reproducible.

**Findings (Director redline pass 2, 2026-08-17 — full work-order spec):**
Director's formal work order gave S03 a sharper, more specific brief than
the earlier tier-system pass: "69,432와 1.29×~1.83×가 같은 증거 계보로 묶여야
하고... 아래 카드들은 예쁜 데이터 카드보다 검증 패널처럼." Two decisions:

- **Deliberately NOT done:** duplicating "69,432" into the tier-1 card to
  visually pair it with "1.29×~1.83×". `69,432` is Director-frozen
  (`DIRECTOR_DECISIONS.md` D4, `PREM-002`/`PREM-003`, status UNLINKED —
  "no entity holds this value"). Creating a second on-screen occurrence of
  a disputed, untracked figure — even without changing its text — expands
  a frozen claim's footprint in a way this pass isn't authorized to do
  unilaterally. The H2 headline already carries `69,432건` as an
  accent-underlined evidence object (pre-existing); left as the sole
  occurrence pending D1/D4 resolution.
- **Done:** domain-distribution list restyled toward ledger/audit-panel
  rigor rather than decorative cards — row rhythm tightened (`space-y-4`
  → `space-y-3`), token-count and ratio figures set to `tabular-nums` for
  consistent digit-column alignment (a pure typographic add, zero content
  change). `font-mono` on the tier-1 stat rows already provides
  fixed-width digits, so no change needed there.

Screenshotted 1440×KO: 0 overflow, rows read denser/more tabular. tsc
clean, build passes, audit pipeline diff-reproducible, director queue
unchanged at 16.

---

## S04.5-languages

| Field | Content |
|---|---|
| Intent | One chart, one selectable protagonist — clicking a language should make *that* bar (and its legend/callout copy) the dark evidence, not a permanently-pinned Korean row. |
| Primary focal point | The right-column horizontal bar chart; the selected language's bar carries `seriesHighlight` fill and the outline ring. |
| Secondary focal points | Left-column "LANGUAGE FOCUS" stat card (kept Tier-2, unchanged); quick-switch chip row. |
| Forbidden competition | The Korean-only callout ("★ 한국어는...") must never assert a permanent visual claim independent of the selection state — it is conditional on `selectedItem.isTargetHangul`, not decorative. |
| Layout skeleton | `ArticleReadingColumn` (lead only) → full-width breakout: left 4-col stat card + chip switcher, right 8-col chart panel. |
| Risk zones | `LANG-019`/`LANG-032`/`LANG-031` (frozen-adjacent duplicated/unsourced values, `DIRECTOR_DECISIONS.md` D3/D4) — must not change the underlying `1.78×`/`1.00×` figures, only ownership/rendering. |
| Required states | default (Korean selected) and a non-Korean selection (tested: English). |
| Required screenshots | 1440×KO (default + English-selected), 1440×EN, 390×KO. |
| Accept/reject rule | Reject if any non-selected bar renders in the highlight color, if the legend's bold entry doesn't match the current selection, or if any Korean-only string survives untranslated in EN mode. |

**Findings (orchestrated screening + fix, 2026-08-17):** a `screen:languages`
read-only subagent (via `Workflow`) diagnosed this slide against the
Director brief and VISUAL_QA_CRITERIA; findings below were synthesized and
fixed directly (not left as diagnosis-only, per Director's explicit
challenge: "스크리닝을 하는데 너가 수정을 안하고 디버깅을 안하면 뭐 어떻게하니").

1. **Chart color-encoding bug (real defect).** `Cell` fill was keyed on
   `entry.isTargetHangul` — Korean's bar was permanently dark regardless of
   `selectedLangId`; selecting any other language left Korean highlighted
   and the actual selection nearly invisible (only a thin stroke ring).
   Fixed: fill now keys on `entry.id === selectedLangId` (falling back to
   `seriesBaseline`/`seriesOther`). Verified live via Playwright — clicking
   the English chip now turns the English bar dark (`#161616`) and all
   others (including Korean) grey (`#C2C2BD`).
2. **Legend hardcoded to Korean.** The bold legend entry read `한국어 한글
   (1.78×)` unconditionally. Fixed: now renders `selectedItem.name` /
   `selectedItem.relativeRatio` — i.e. reads live from
   `MULTILINGUAL_COMPARISON_DATA` — so it always names whichever language is
   actually selected. This also resolved `DIRECTOR_DECISIONS.md` D3's
   `LANG-032` row as a byproduct (no more hardcoded copy at that node); see
   the D3 update for detail. Not a Director ruling — a rendering-logic fix.
3. **Bilingual completeness gaps.** The callout, the chip labels (was
   `item.name.ko.split(' ')[0]` even in EN mode), the chart's sub-label
   ("기준 영문 100 토큰 대비..."), and all four legend/source strings had no
   `isKo`/`isEn` branch. All four now translate. `LANG-019`→`LANG-051` and
   `LANG-031`→`LANG-053` in the trace ledger (new bilingual literal changed
   their identity keys; `DIRECTOR_DECISIONS.md` updated to the new IDs —
   the underlying figures and D3/D4 open questions are untouched).
4. **Korean word-break bug.** `ArticleSubheading` lacked `break-keep`,
   causing mid-word splits (e.g. `언어` breaking across lines) at narrow
   widths. Fixed in the shared component (`ArticleElements.tsx`) — applies
   site-wide, low risk.
5. **Tier violations.** Callout downgraded Tier-3 proper (`border-rule-
   strong` → `border-rule`, no shadow — it's an annotation, not primary
   evidence). Right chart panel upgraded to Tier-1 (`border-2 border-rule-
   strong shadow-sm`) since it carries the slide's central visual claim.
6. **Redundant heading weight.** Removed the `ArticleSubheading` render
   (entity field kept, unused) — was a second bold H3-weight element
   between the lead and the chart with no distinct information.
7. **Content-integrity flag, not fixed:** `preFigureParagraphs` mentions
   "12개 언어"/Hindi, but `MULTILINGUAL_COMPARISON_DATA` has only 5 entries
   and no Hindi row. Flagged as a candidate new Director-decisions item
   (content accuracy, not visual QA) — deliberately not silently corrected.

Screenshotted 1440×KO (default + English-selected via real click), 1440×EN,
390×KO: 0 overflow. tsc clean, build passes. Audit pipeline required a
documented ID/line resync in `DIRECTOR_DECISIONS.md`/`README.md` (see D3/D4
updates) — now diff-reproducible again, director queue unchanged at 16.

**Findings (visual devpass, 2026-08-18, Iteration 16): 1 fix (Korean
word-break), content-integrity item #7 above reconfirmed still open.**
The Hangul-callout box ("★ 한국어는 라틴 알파벳(영어/스페인어) 대비
1.78배의 토큰이 소비됩니다.") was breaking the number-plus-counter unit
"1.78배" across two lines at 390px ("1.78" / "배의…") — same root cause
as S04-burden's fixes, a raw `<div>` not routed through the shared
`ArticleSubheading`/`ArticleParagraph` components that already carry
`break-keep`. Added `break-keep`; re-screenshotted 390×KO, "1.78배"
now stays intact, break now falls at a real word boundary ("대비" /
"1.78배의"). All other prose on this slide already routes through the
shared Article components (0 other break issues found). **Did not touch**
the "12개 언어"/Hindi content-integrity item — still open, still a
content-owner decision, not re-litigated here.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 6): 5/6
directives closed at the label/prose level** (`R01` partial — see note
below, `R02`, `R04`, `R05`); `R03` (12개 언어/Hindi) correctly stays
untouched (pre-existing content-integrity flag, reconfirmed not
resolved); `B02` (Flores paper) stays `BLOCKED_EVIDENCE`.

**`HP01-S45-R01` note — this was NOT a full visual redesign.** The
annotation's own text asks for "대규모 재디자인" and shows the entire
section double-X-struck, the strongest rejection mark in the whole
Human Preview. What this pass actually did is the full set of concrete,
individually-annotated sub-directives (`R02`/`R04`/`R05` below) — label
Koreanization, removing the front-running conclusion sentence, fixing
the register mismatch. It did **not** invent a new visual composition
(new chart type, new card layout) — that would be original design work
beyond an editorial-redline pass's authority, and no specific
replacement composition was given to implement against. Marking `R01`
`TODO` (partial) in the MASTER rather than `DONE`, flagged for Director
follow-up: confirm whether the concrete sub-fixes satisfy the intent, or
whether an actual layout redesign is still wanted.

Exact changes, `MultilingualTokenEfficiencySection.tsx` (all
`isKo`-gated, EN mode unaffected):
- `LANGUAGE FOCUS` / `Selected Metric` → `선택된 언어` (the redundant
  second label removed rather than translated — one label carries the
  same meaning)
- `Normalized Tokens:` → `정규화 토큰 수:`; `Relative Ratio:` → `상대
  비율:`; `Difference vs. English:` → `영어 대비 차이:`; `Baseline
  (0%)` → `기준값 (0%)`
- `NORMALIZED TOKEN CONSUMPTION BY LANGUAGE` → `언어별 정규화 토큰
  소비량`
- Recharts `ReferenceLine` label: `English Baseline (100 tok)` →
  `영어 기준선 (100)` — verified via SVG DOM text-content inspection
  (`영어 기준선 (100)`, no transform, positioned identically to the
  axis tick labels) rather than trusting the screenshot alone, since
  small SVG text can look garbled in a raster screenshot even when the
  underlying markup is correct
- Tooltip content: `"{n} Tokens (x×)"` → `"토큰 {n}개 (x×)"`;
  `"+{n}% vs English"` → `"영어 대비 +{n}%"`; `"Baseline"` → `"기준값"`

Entity text, `entities/article-content.ts` `multilingualBenchmark`
(`R02`/`R04`/`R05`):
- `postFigureParagraphs.ko`: was 2 sentences, now 1. **Removed
  entirely** (not reworded): `"향후 다국어 AI 거버넌스와 소버린
  파운데이션 모델 개발 시, 독자적인 고효율 어휘집(Custom Tokenizer)
  구축이 왜 핵심 인프라 과제인지를 명확히 보여줍니다."` — per the
  annotation's own words, "논지는 안맞으므로 제거" (the argument
  doesn't fit, remove it). The remaining sentence also had "token
  representation efficiency" Koreanized → "토큰 표현 효율".
  **This also resolves `R05` (sentence-ending register mix)** as a
  byproduct: the removed sentence was the one ending in `~습니다`
  against the rest of the paragraph's `~다`; with it gone there's no
  mixed register left in this paragraph set.
- `keyFinding.statement.ko`: `"...이는 다국어 AI 거버넌스의 구조적
  과제입니다."` trailing clause removed (stops at `"...보편적으로
  관측됩니다."`) — this exact "구조적 과제" phrase is one of G09's own
  named ban-list items (not a MASTER inference), and it repeated the
  same front-running-conclusion pattern R04 already flagged elsewhere
  on this slide.

Research-content impact: NONE on any ratio/percentage (1.00×, 1.18×,
1.78×, 2.05×, 2.30×, 1.5×~2.3× all byte-identical, confirmed via
re-read). The two sentence removals are editorial-conclusion framing,
not measured values — and one of them is the exact sentence the
Director's own annotation named for removal.

Verified 1440×KO/EN: 0 overflow both languages, chart renders
correctly, tooltip/reference-line text confirmed via DOM inspection.
tsc clean, build clean.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 8 — REDESIGN
CLOSURE for `HP01-S45-R01`, previously logged PARTIAL in Iteration 6):**
A Director-side acceptance-metrics protocol
(`AUDIT2/QA/Human Preview 01 — Slide Acceptance Metrics and Crawl QA
Protocol.md`, `S45-M04`) explicitly warned that label translation alone
does not close R01 — the composition itself had to stop being two
competing panels. Verified this by direct metric check against
production before touching code: `S45-M04` genuinely failed (two
separately-bordered panels — a stat card and a chart — read as
competing visuals, confirmed by counting `.border-2.border-rule-strong`
matches = 2 inside `#languages`).

**Redesign, `MultilingualTokenEfficiencySection.tsx`:** merged the
"선택된 언어" stat card and the chart panel into **one** bordered
exhibit. The selected language's stats (name · token count · ratio ·
%) now render as a single inline line in the panel's own header,
directly above the chart, instead of a separate side card. Chart,
language-switcher chips, the conditional Hangul callout, and the
legend all now live inside that one panel, in that reading order. Zero
new language, ratio, source, or citation — `MULTILINGUAL_COMPARISON_DATA`
(5 entries) is read exactly as before, just laid out differently.

Metric re-verification after the redesign (local build):
- `S45-M01`: root count = 1; **main bordered panel count = 1** (was 2)
- `S45-M02`: `BLOCKED_CONTENT_AUTHORITY`, unchanged — "12개 언어"/
  Hindi mentions remain in the pre-figure prose (pre-existing flag,
  not resolved by this visual pass)
- `S45-M03`: PASS — governance/sovereign/Custom-Tokenizer conclusion
  text confirmed absent (closed in Iteration 6, reconfirmed here)
- `S45-M04`: now genuinely addressable — one visual, Korean's bar
  (black, labeled `한국어`) immediately legible at first glance, no
  competing panel
- `S45-M05`: PASS — clicked English chip then Arabic chip, DOM text
  changed both times, selection state updates correctly
- `S45-M06`: PASS (closed in Iteration 6 — sentence-register fix)
- `S45-M07`: `BLOCKED_EVIDENCE`, unchanged — no Flores paper located

**Slide verdict: `CONDITIONAL PASS`** — all mandatory gates pass; two
items remain correctly `BLOCKED_*`, not silently resolved.

Verified 1440×KO: 0 document-level overflow. 390×KO: 0 document-level
overflow, single panel renders cleanly stacked. tsc clean, build clean,
bundle shrank slightly further (one fewer wrapping `div`).

---

## S04-burden

| Field | Content |
|---|---|
| Intent | Escalation — the question ("그래서 이 차이는 얼마나 누적될까?") should land on the repetition simulator within the first viewport, not after a long scroll of restated prose. |
| Primary focal point | The simulator panel's "ACCUMULATED BURDEN GAP +N tokens" number. |
| Secondary focal points | The Engineering/Social-Science occupational comparison cards (supporting evidence, one step quieter than the simulator). |
| Forbidden competition | Only one accent-color element on the slide: the simulator's active preset pill. Status badges and card borders must not compete with it. |
| Layout skeleton | `SectionHeading` → reading column (lead + paragraphs, no subheading) → full-width breakout: simulator panel, then 2-col occupational comparison. |
| Risk zones | `BURD-016`/`017`/`018` (Director-frozen scale-legend strings, `DIRECTOR_DECISIONS.md` D4) — layout-only changes permitted, no wording. |
| Required states | default; simulator with a non-default preset selected. |
| Required screenshots | 1440×KO (viewport-after-nav-click + full), 1440×EN, 390×KO (full + legend-row crop). |
| Accept/reject rule | Reject if the simulator's eyebrow is still off-screen immediately after a real nav click, if more than one accent-filled element is visible at once, or if the mobile scale-legend row still wraps into a jumbled block. |

**Findings (orchestrated screening + fix, 2026-08-17):** a `screen:burden`
read-only subagent diagnosed this slide in the same `Workflow` run as
S04.5-languages; findings synthesized and fixed directly, same as above.

1. **Headline-to-simulator distance (547px measured).** A real nav click to
   `#burden` at 1440×1000 left the simulator's eyebrow barely visible at
   the very bottom edge of the viewport — functionally off-screen on
   landing, the exact "dangling widget" failure mode the brief forbids.
   Fixed the highest-leverage contributor: removed the `ArticleSubheading`
   render (entity field kept) — it was a second bold heading-weight element
   adding ~90px+ of pure vertical mass with no new information, and its
   content substantively restated the lead paragraph (flagged to content
   owner as a copy-consolidation candidate, not edited by this pass).
2. **Tier mismatch — simulator vs. comparison card.** The simulator panel
   (holding the slide's actual hero number) used an ad hoc hybrid
   (`bg-surface-alt border border-rule shadow-xs`) matching neither Tier-1
   nor clean Tier-3, while the Social Science card below it carried genuine
   Tier-1 styling despite being supporting/comparative evidence — the
   comparison card visually outweighed the slide's central number. Fixed:
   simulator promoted to Tier-1 (`bg-surface border-2 border-rule-strong
   shadow-sm`); Social Science card stepped down to Tier-2 (`border`,
   `shadow-xs`), matching the Engineering card's existing Tier-2 treatment.
3. **Multiple concurrent accent elements.** At 1440×KO, 5 `bg-accent`
   elements were visible simultaneously: the selected preset pill (the one
   legitimate accent use) plus the "HIGH BURDEN POTENTIAL" badge and all
   three Social Science status badges — applied unconditionally regardless
   of `DATA_AVAILABLE` status, while the structurally identical Engineering
   badges used neutral styling for the same field. Fixed: both the
   "HIGH BURDEN POTENTIAL" badge and the status badges now use the same
   neutral `bg-surface-alt text-ink-body border border-rule` treatment as
   Engineering's — confirmed 0 remaining `bg-accent` elements in `#burden`
   outside the preset selector. Class/color-only; no text/value change.
4. **Mobile scale-legend crowding.** At 390px, the 3-column `flex
   justify-between` scale-legend row (`BURD-016`/`017`/`018`, frozen
   strings) wrapped each label into cramped ~76–116px columns — a jumbled
   block competing with the slider. Fixed: `flex-col sm:flex-row` so the
   three labels stack vertically on mobile and stay horizontal at `sm+` —
   layout-only, strings untouched. Verified via computed style:
   `flexDirection: column` at 390px.

Screenshotted 1440×KO (real-nav-click viewport + full), 1440×EN, 390×KO:
0 overflow. tsc clean, build passes, audit pipeline diff-reproducible
(shared resync with S04.5-languages), director queue unchanged at 16.

**Findings (follow-up pass, orchestrated screening + fix, 2026-08-17):** a
`screen:burden-detail` subagent re-screened the *already-fixed* state above
specifically for "burden-comparison detail card dominance" — macro
slide-level dominance passed clean (the prior fix worked), but the two
comparison cards had an internal rank inversion between each other.

1. **Macro dominance: PASS.** Confirmed via real nav-click + measured rects
   that the simulator's `+700` hero number remains the unambiguous
   first-glance winner; the comparison grid begins 110px below it and never
   approaches the hero number's size or isolation. No action needed.
2. **Asymmetric card tier (root cause of the rest).** Engineering's wrapper
   used `bg-surface-alt border border-rule` (mechanically a Tier-3
   "recede" signature) while Social Science used genuine Tier-2
   (`bg-surface border border-rule shadow-xs`) — despite both cards playing
   an identical parallel-comparison role. Fixed: Engineering promoted to
   the same Tier-2 signature (`bg-surface ... shadow-xs`).
3. **Asymmetric footer weight.** The "평가: ..." verdict blurb was
   `bg-surface text-ink-muted` (quiet) on Engineering vs. `bg-surface-alt
   text-ink font-semibold` (bold, full-ink) on Social Science — same
   component pattern, two different treatments, reproduced identically in
   EN. Fixed: unified both to the quieter Engineering treatment (neither
   card is this slide's Tier-1 point). Verified: both now compute
   `font-weight: 400`.
4. **Asymmetric data-field weight.** Social Science's sub-occupation name
   spans (`text-ink`) and Language Intensity value (`text-ink font-bold`)
   were a full step darker/bolder than Engineering's (`text-ink-body`) for
   the same field, with no data-driven justification — AI Exposure Level
   was already correctly symmetric on both sides, proving the asymmetry
   was an oversight, not intentional encoding. Fixed: matched Social
   Science's classes to Engineering's on both fields.
5. **Exclusive "HIGH BURDEN POTENTIAL" badge.** Existed only on the Social
   Science card, no Engineering counterpart, stacking a fourth asymmetric
   emphasis device onto findings 2-4. Its information (exposure/intensity)
   was already redundantly carried by the two data rows above it.
   **Decision: removed the badge** rather than inventing a parallel
   "LOWER BURDEN POTENTIAL" label for Engineering — adding new editorial
   copy not backed by an entity field would be a content decision this
   pass isn't authorized to make; removing a redundant, exclusive label is
   layout-only. Confirmed 0 remaining "HIGH BURDEN" badges after the fix.

Net effect: the two comparison cards now read as one coherent
secondary-evidence unit (parallel entries) rather than "Engineering =
footnote, Social Science = the real finding." Verified live via Playwright
DOM queries (not just source reading): both footers `font-weight: 400`,
Engineering wrapper now has a shadow, 0 remaining "HIGH BURDEN" badges.
tsc clean, build passes, audit pipeline diff-reproducible, director queue
unchanged at 16.

**Findings (visual devpass, 2026-08-18, Iteration 15): 4 fixes, Korean
word-break only.** Screened for the interaction-density-reduction
candidate the editorial redline directive raised (5 presets → 3 +
custom); found no rendering evidence to justify it — at 390px the 5
preset pills stay on one row with no overflow, and the 3-stat result
grid stacks cleanly (`grid-cols-1 md:grid-cols-3`). Left the presets as-is
rather than cutting functionality without a concrete defect. Instead
found 4 real instances of the site's known Korean mid-word-break bug
(the same class already fixed once in the shared `ArticleSubheading`
component, per `HANDOFF.md` §9 — these 4 are raw `<dt>`/`<p>`/`<div>`
elements in this widget that never went through that shared component,
so never inherited the fix): `TOKEN RECEIPT (토큰 사용 명세서)` was
breaking as "명" / "세서)"; `ABSOLUTE GAP (순수 격차)` as "격" / "차)";
both occupation-cluster assessment paragraphs mid-word ("반복" → "반"/
"복" in the Social Science card). Added `break-keep` to all 4 elements
— zero content change, pure `word-break: keep-all`. Verified: computed
`word-break: keep-all` on the receipt `dt`; re-screenshotted 390×KO,
all 4 previously-broken words now stay intact; 0 DOM overflow;
`build`/`lint` clean, CSS hash unchanged (utility already existed
site-wide from the earlier `ArticleSubheading` fix).

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 5): 6/7
directives closed** (`R01`, `R02`, `R03`, `R04`, `B01`, `B03`); `B02`
(pricing-multiplier interaction) stays `BLOCKED_EVIDENCE`.

Exact changes:
- **`HP01-S4-R01` (RED, "삭제" — the biggest single removal in this
  Human Preview so far):** removed the entire "Occupational Cluster
  Analysis" block from `OccupationSection.tsx` — the
  `OCCUPATIONAL SENSITIVITY COMPARISON` header, both the Engineering/
  Technical and Social Science/Knowledge-intensive comparison cards
  (each with its AI-exposure/language-intensity stat rows, assessment
  paragraph, and sub-occupation list), gone entirely — not translated,
  removed, per the annotation's own rationale ("데이터 미확정, 없어도
  됨"). `OCCUPATION_COMPARISON_DATA`, `getLocalizedText`, and the
  `Code`/`BookOpen` icon imports removed as now-dead code (JS bundle
  dropped ~9KB, 311.62KB → 302.52KB). The `ArticleFigureCaption` (FIG.05)
  that used to sit at the end of this block now sits directly after the
  simulator, since the simulator is the only remaining exhibit.
- **`HP01-S4-B01`:** with the comparison section gone, the simulator is
  now the entire breakout's content — structurally promoted to the
  slide's sole interaction, as directed (no code change needed beyond
  the removal above; this was the removal's natural consequence).
- **`HP01-S4-R02` (label Koreanization, all `isKo`-gated):**
  `WORKFLOW REPETITION SIMULATOR` → `반복 사용 시뮬레이터`;
  `English Baseline Tokens` → `영어 기준 토큰`; `Hangul Cumulative
  Tokens` → `한글 누적 토큰`; `ACCUMULATED BURDEN GAP` → `누적 토큰
  격차`; `TOKEN RECEIPT` → `토큰 사용 명세서`; `... ITERATIONS` →
  `...회 반복`; `KOREAN (N회)`/`ENGLISH (N회)` → `한국어 (N회)`/`영어
  (N회)`; `... TOKENS` → `...개 토큰`; `ABSOLUTE GAP` → `순수 격차`.
- **`HP01-S4-R03` (remove unsourced workload characterization):**
  scale-legend `1회 (단일 프롬프트)` / `1,000회 (팀 일간 워크플로우)` /
  `2,000회 (전사 에이전트 루틴)` → plain `1회` / `1,000회` / `2,000회`
  — the parenthetical scenario labels ("team daily workflow",
  "enterprise-wide agent routine") were never backed by any entity
  value, so removed rather than kept as unsourced framing.
- **`HP01-S4-R04` (no "기하급수적으로" for linear accumulation),
  `entities/article-content.ts` `accumulatedBurden`:**
  `lead.ko`: `"...같은 종류의 AI 사용이 반복될수록 절대 token gap은
  누적된다."` → `"...같은 종류의 AI 사용이 반복될수록 토큰 격차는
  그대로 누적된다."` (also resolves the "token gap" English-phrase
  half of `R02`). `keyFinding.statement.ko`: `"...워크플로우가
  반복될수록 기하급수적으로 누적되어..."` → `"...워크플로우가
  반복될수록 그대로 누적되어..."` — the underlying math is `totalGap =
  tokenGapPerPrompt × promptCount`, i.e. genuinely linear, so
  "기하급수적으로" (exponentially) was factually wrong, not just
  stylistically flagged.
- **`HP01-S4-B02` (pricing/unit-cost multiplier interaction):**
  `BLOCKED_EVIDENCE`, unchanged — no entity holds a "TP(4Q)" figure or
  a pricing-policy unit rate to multiply against; not fabricated.
- **`HP01-S4-B03` (KO/EN number typography):** `toLocaleString()` was
  already locale-safe for both digit grouping and now for the
  Korean/English unit suffixes (handled via the same `isKo` ternary
  pattern as the labels above) — no separate fix needed beyond R02.

Research-content impact: `TOKEN_BASELINE_SIMULATION` (the per-prompt
token baseline the simulator multiplies) is untouched — only the prose
around it (lead, keyFinding, labels, scale-legend) changed, and only in
ways that correct an actual math mismatch (linear vs. "exponential") or
remove unsourced framing, not to alter what's measured.

Verified 1440×KO/EN: 0 overflow both languages; occupation section
confirmed fully absent (not just hidden); simulator renders as the
sole breakout content; FIG.05 caption still present, correctly
repositioned. tsc clean, build clean, bundle size dropped ~9KB from the
dead-code removal.

---

## S05-infrastructure

| Field | Content |
|---|---|
| Intent | Show AI adoption as one causal chain scaling into national infrastructure — the slide should read as a system diagram the reader can trace, not a row of explanatory cards. |
| Primary focal point | The 4-phase "Macro Adoption Causal Chain," terminating at Phase 04 (Token Usage), bridging into the verified policy/investment data slots below it. |
| Secondary focal points | The 3 verified-policy-slot cards (already correctly Tier-2, dashed-border evidence-gap framing). |
| Forbidden competition | Exactly one accent-color element on the slide; tiering must be border-weight/shadow-depth, never a color fill. |
| Layout skeleton | `SectionHeading` → reading column (lead + paragraphs, no subheading — entity has none) → full-width breakout: phase-chain grid, diagram bridge, policy-slot grid. |
| Risk zones | None frozen/numeric in this slide's structural elements — `MACRO_ADOPTION_PHASES`/`VERIFIED_POLICY_SLOTS` entity copy untouched by this pass. |
| Required states | default only. |
| Required screenshots | 1440×KO, 1440×EN, 390×KO. |
| Accept/reject rule | Reject if the phase grid still reads as 4 independently-styled cards with no directional/flow cue, if any card uses `bg-accent` as a tiering signal, or if the mobile data-slots header row still produces an interleaved 2-line wrap. |

**Findings (orchestrated screening + fix, 2026-08-17):** a `screen:infrastructure`
subagent screened this slide against the Director's short brief ("system-diagram
feel, not a stacked list of explanatory cards") plus the standing global
rules; findings synthesized and fixed directly.

1. **No diagrammatic connective tissue (the core brief).** The phase grid
   was a plain 4-column CSS grid with uniform gaps — zero arrows, lines, or
   spatial logic connecting the phases; the only per-card directional
   signal was a `↑` baked into each card's own title text, which reads as
   a per-card stat icon, not a diagram edge. The phase chain and the
   policy-slot grid below it were separated only by ordinary section
   spacing, with no visual bridge showing the chain terminating in (and
   being anchored by) those data slots. Fixed: added a CSS
   `content-['→']` pseudo-element between phase cards at the `lg` (single
   row) breakpoint, widened `lg:gap-8` to make room for it, and added a
   small `↓` connector between the phase grid and the policy-slot grid —
   all decorative (`aria-hidden`), no copy/data changed, no existing
   `ul`/`li` semantic structure altered. Verified the arrow glyph actually
   compiles into the CSS and renders (confirmed via
   `getComputedStyle(el, '::after').content`).
2. **`bg-accent` used as a tiering signal (Design Law violation).** Phase
   04 used a solid accent-blue fill (`bg-accent text-on-accent
   border-accent`) purely to mark "this phase is the important one" — an
   ad hoc fourth treatment matching none of the three defined tiers, and
   exactly the usage DESIGN_LAW.md forbids ("accent is never used for
   tiering"). It also meant the slide had no Tier-1 panel at all (Phase
   01-03 were Tier-3, policy slots were Tier-2). Fixed: Phase 04 now uses
   the Tier-1 signature (`bg-surface border-2 border-rule-strong
   shadow-sm`) instead of a color fill — border weight and shadow now
   carry the "this is the terminus" meaning, not color; text colors
   simplified to the same ink scale across all 4 cards. Verified live:
   `bg-accent` count in `#infrastructure` is now 0; Phase 04 computes
   `border-width: 2px` + a real box-shadow.
3. **Mobile data-slots header wrap.** The `flex items-center
   justify-between` dl (Korean label + "Strict Data Verification Rule")
   wrapped both children into an interleaved two-column mess at 390px.
   Fixed: `flex-col items-start` below `sm`, `flex-row items-center
   justify-between` at `sm+` — layout only, strings untouched.
4. **Empty `ArticleSubheading` node.** `koreaInfrastructure` has no
   `subheading` field (unlike its sibling entities), so the component was
   rendering a real but empty `<h3>` (0 height, no text) — a stray
   semantic node, not visually detectable but dead markup. Fixed:
   removed the render (consistent with the same fix already applied to
   the languages and burden sections this session), removed the now-unused
   `ArticleSubheading` import.
5. **Editorial framing / card-language parity, global accent-count rule,
   body-vs-headline hierarchy, no header overlap, no horizontal scroll:**
   all passed clean independently (confirmed via real-nav-click rect
   measurements and computed styles, not screenshot-only) — no action
   needed on those axes. The editorial-framing gap (phase cards read as a
   generic "How It Works" SaaS block vs. the policy slots' evidence-gap
   framing) is substantially addressed by fixes 1-2 above (diagram
   connectors + tier correction); left as-is beyond that rather than
   redesigning the card component further this pass.

Screenshotted 1440×KO, 1440×EN, 390×KO: 0 overflow. tsc clean, build
passes, audit pipeline diff-reproducible, director queue unchanged at 16.

**Findings (visual devpass, 2026-08-18, Iteration 17): PASS, no fix.**
Specifically checked for the word-break bug class found on S04/S04.5
(raw `<p>`/`<div>` Korean text not routed through the shared Article
components — this slide has two candidates, `phase.description` and
the policy-slot placeholder note). Neither actually breaks mid-word at
390px — both entity strings happen to fit their container width without
triggering a break inside a compound word. 0 DOM overflow. Interaction
count reconfirmed at 0, matching this slide's own "default only"
required-states spec — no interactivity added.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 7): 5/5
directives closed** (`R01`–`R04`; `B01` correctly stays
`BLOCKED_EVIDENCE`). This also **resolves a long-standing pre-existing
bug**, not just an HP01 item — see below.

Target proof: root `section#infrastructure[data-widget="KoreaAIContextSection"]`
(1 match), children `[data-collection="macro-adoption-phases"]` (4 items,
unchanged count) and the now-removed `[data-collection="verified-policy-slots"]`
(3→0 items).

Exact changes:
- **`HP01-S5-R01`:** `MACRO ADOPTION CAUSAL CHAIN` → `AI 확산의 흐름`
  (KO) / `AI ADOPTION TIMELINE` (EN); `Scale Dynamics` → `규모 변화`
  (KO). Non-causal framing per the annotation's own suggested phrasing.
- **`HP01-S5-R02`, and independently resolves `HANDOFF.md` §6.5 /
  `DIRECTOR_DECISIONS.md` D6:** `entities/article-content/content/macro-adoption-phases.ts`
  — `MACRO_ADOPTION_PHASES[].name`/`.description`/`.phaseLabel` were
  **not** `isKo`-gated in the legacy source (`name` always English,
  `description` always Korean, regardless of UI language — a known,
  deliberately-unresolved gap per the file's own header comment,
  waiting on an editorial decision). Converted all three fields to
  proper `{ ko, en }` objects; component now reads them via `isKo ?`.
  English descriptions were newly written (not present in the legacy
  source) to complete the bilingual pair — kept factually equivalent to
  the existing Korean wording, no new claims. Example: `name`:
  `'AI Investment ↑'` (was shown in both languages) → `{ ko: 'AI 투자
  확대', en: 'AI Investment' }`.
- **`HP01-S5-R03`:** removed the entire "Verified Policy & Investment
  Slots" block — the 3 `[VERIFIED ... REQUIRED]` placeholder cards, the
  now-orphaned diagram-bridge arrow that pointed at them, and the
  section header above them. `VERIFIED_POLICY_SLOTS`/`getLocalizedText`
  imports removed as dead code.
- **`HP01-S5-R04`:** removed causal/exaggeration language —
  `preFigureParagraphs[0].ko`: `"...기하급수적으로 끌어올릴
  것입니다."` → `"...지속적으로 끌어올릴 것으로 보입니다."`;
  `postFigureParagraphs[0].ko`: `"...국가 전체 컴퓨팅 전력 소모와
  데이터센터 대역폭에 측정 가능한 영향을 미치게 됩니다."` → `"...국가
  전체 컴퓨팅 자원 배분에서 함께 고려해야 할 변수가 됩니다."` (drops
  the direct "measurable impact on power consumption" causal claim per
  G08/R04, reframes as "a factor to weigh"). `figureCaption.ko`:
  `"매크로 AI 도입 인과 사슬 및 검증된 정책·투자 데이터 슬롯"` (contains
  "인과 사슬" — causal chain — directly) → `"한국 AI 인프라 확산의
  4단계 흐름"`. EN equivalents updated in parallel (`"exponential
  surges"` → `"keep driving up"`; `"translate into measurable
  differences"` → `"a factor worth weighing"`).
- **`HP01-S5-B01`:** `BLOCKED_EVIDENCE`, unchanged — no real citable
  source strips available to replace the removed placeholders with.

Research-content impact: NONE — `figureSource` (government policy
disclosure citation) kept untouched (G06); no ratio/number in this
slide was ever a research value (it has none), only prose framing and
the previously-hardcoded phase names/descriptions changed.

Behavior proof: 0 interactive controls before, 0 after (unchanged,
matches "default only" spec). Placeholder text (`REQUIRED`) confirmed
absent via `innerText` scan.

Verified 1440×KO/EN: 0 document-level horizontal scroll
(`document.documentElement.scrollWidth === clientWidth` at both 1440
and 390) — 3 phase-card `LI` elements individually reported
`scrollWidth > clientWidth` in a naive per-element scan, traced to the
intentional off-box `lg:after:content-['→']` connector-arrow
pseudo-element (`-right-6` positioning), confirmed pre-existing via
`git diff` (this pass never touched that className) and confirmed
harmless via document-level measurement — not a regression, logged so
a future pass doesn't re-flag it. tsc clean, build clean, bundle
shrank further (removed dead policy-slot code).

---

## S06-method

| Field | Content |
|---|---|
| Intent | The "boundary panel" (what this research does NOT claim) should read as this slide's hero element, not a footnote beneath the methodology accordion. |
| Primary focal point | The `WHAT_WE_DO_NOT_CLAIM` boundary panel. |
| Secondary focal points | The Methodology Pillars accordion (6 expandable items) — must read as supporting detail, not co-equal or louder than the boundary panel. |
| Forbidden competition | Exactly one accent-color element on the slide (the accordion's 6 bullet dots were an out-of-role repeated use). |
| Layout skeleton | `SectionHeading` → reading column (lead + paragraphs) → full-width breakout: boundary panel, methodology accordion → reading column (post-figure prose + footnotes). |
| Risk zones | `METH-008` ("6 Key Principles," `DIRECTOR_DECISIONS.md` D4, UNLINKED — coincidentally matches `WHAT_WE_DO_NOT_CLAIM.length` today but is hardcoded, not read) — flag only, never change the number. |
| Required states | default; at least one accordion item expanded (pre-existing default state). |
| Required screenshots | 1440×KO, 1440×EN, 390×KO. |
| Accept/reject rule | Reject if the boundary panel is not visibly the heaviest panel on the slide, or if more than one accent-color element remains. |

**Findings (orchestrated screening + fix, 2026-08-17):** a `screen:method`
subagent screened this slide against the Director's short brief ("boundary
panel as hero, not footnote") plus the standing global rules; findings
synthesized and fixed directly.

1. **Boundary panel was Tier-3, not Tier-1 (the core brief).** The panel
   holding the slide's actual central claim used `bg-surface-alt border
   border-rule shadow-xs` — the Tier-3 "must recede, never compete"
   signature (confirmed against `tokens.css`'s own comment: `--color-
   surface-alt` is documented as an "alternating section background," a
   recede role) with an extra shadow bolted on, matching none of the three
   canonical tiers cleanly. Meanwhile its own title label used the same
   small `text-xs font-mono` scale as every other secondary widget on the
   page — nothing about it signalled hero status. Fixed: promoted to the
   Tier-1 signature (`bg-surface border-2 border-rule-strong shadow-sm`);
   bumped the title label to `text-sm sm:text-base` (from `text-xs`) so
   the panel's own heading, not just its border, reads heavier.
2. **Boundary panel didn't outrank the accordion below it.** The
   accordion's item titles (`font-bold text-sm sm:text-base`) plus an
   accent-blue bullet dot per row were visually bolder/more saturated than
   the boundary panel's uniformly small mono/sans text, and the accordion
   occupied more on-page height. Substantially addressed by fix 1 (the
   panel is now the slide's only Tier-1, border-2, shadow-sm element,
   giving it clear top billing without reordering — it was already first
   in DOM order).
3. **7 concurrent accent-color marks (global rule violation).** The H2
   underline (the Design-Law-sanctioned one legitimate use) plus all 6
   methodology-accordion bullet dots (`bg-accent`, decorative list
   markers, not a selection/nav state) meant 7 accent marks contending for
   "protagonist" on one slide. Fixed: accordion bullets changed from
   `bg-accent` to `bg-ink-muted` (a neutral, already-tokenized color with
   existing precedent elsewhere in the codebase) — confirmed 0 remaining
   `bg-accent` elements in `#method` after the fix.
4. **Mobile header-row misalignment.** At 390px the boundary panel's own
   `dt`/`dd` header row used `items-center`, so when the long KO/EN title
   wrapped to 3 lines, the "6 Key Principles" count floated vertically
   centered against the wrapped block instead of anchoring to the title's
   first line. Fixed: `items-center` → `items-start` (with a small `gap-4`
   added so the two no longer touch when both are short).
5. **METH-008 flagged, not changed.** "6 Key Principles" is confirmed
   still present, still hardcoded (UNLINKED per D4), rendered inside the
   panel's own header — per instruction, no numeric or text change
   proposed. Per the finding's own recommendation, its ink tone was
   nudged from `text-ink-muted` to `text-ink-body` (one step more present)
   now that the panel around it carries more visual weight — a pure color
   token change, not a wording or number change.

Screenshotted 1440×KO, 1440×EN, 390×KO: 0 overflow. tsc clean, build
passes, audit pipeline diff-reproducible, director queue unchanged at 16.

**Findings (visual devpass, 2026-08-18, Iteration 19): 4 fixes, Korean
word-break only.** Most instances found in one pass this session: (1)
the 6-claim boundary-box `<span>` — 3 of 6 items broke mid-word/mid-
particle at 390px ("떨어진다고"→"떨어"/"진다고", "비용을"→"비용"/"을",
"토큰을"→"토"/"큰을"); one `break-keep` on the shared claim-list
className fixes all 6. (2) The methodology-accordion panel body
(`item.content`) — "의도를" was splitting as "의"/"도를". (3) The
footnotes `<p>` — footnote #3 split "일상" as "일"/"상". All raw
elements, none routed through the shared Article components. Fixed all
4 with `break-keep`; re-screenshotted 390×KO through the full boundary-
box list, one expanded accordion panel, and all 3 footnotes — every
previously-broken word now intact, 0 overflow, tsc/build clean, zero
content change.

---

## S05.2-impact

| Field | Content |
|---|---|
| Intent | Build a 3-level (personal → organization → society) scale-up argument, then land on one causal-chain synthesis. |
| Primary focal point | The "FINAL CONCEPTUAL CAUSAL CHAIN" box — the slide's actual synthesis, per its own eyebrow. |
| Secondary focal points | The 3-level scale-up grid (uniform build-up, not individually competing). |
| Forbidden competition | Exactly one accent-color element per slide; card tiers must reflect evidentiary role, not DOM position. |
| Layout skeleton | `SectionHeading` → reading column (lead, subheading, paragraphs) → full-width breakout: 3-level grid, causal-chain box → reading column (post-figure prose + key finding). |
| Risk zones | None frozen/numeric in the elements touched by this pass. |
| Required states | default only. |
| Required screenshots | 1440×KO, 1440×EN, 390×KO (+ figure-caption crop). |
| Accept/reject rule | Reject if more than one `bg-accent` element remains, if no single panel reads as this slide's Tier-1 point, if any Korean-only string survives untranslated in EN mode, or if the figure-number label still breaks mid-token at 390px. |

**Findings (orchestrated screening + fix, 2026-08-17):** this was the one
slide in the Director's full work order with no dedicated redline pass yet
this session — a `screen:impact` subagent screened it against the same
ruleset every sibling slide was held to; findings synthesized and fixed
directly.

1. **3 concurrent `bg-accent` elements (the core violation).** The
   highlighted Level-03 card, plus 2 causal-chain chips ("Token Premium,"
   "Potential Digital Friction") — 3 disconnected, fully-saturated blue
   blocks competing with the H2 for first glance, and none of them was
   actually this slide's Tier-1 point (see next finding). The identical
   anti-pattern already found and fixed in S05-infrastructure's Phase 04
   card, present here too and not yet applied. Fixed: Level-03 card's
   highlight conditional removed entirely — all 3 level cards now render
   identically (uniform Tier-2, `bg-surface border-rule shadow-xs`), since
   they're a 3-stage build-up, not one-vs-two. The 2 causal-chain chips
   keep their distinctness but via border-weight/text-weight instead of
   color: `border-2 border-rule-strong text-ink font-bold` vs. the other
   4 steps' `bg-surface-alt border-rule text-ink-body`. Verified 0
   remaining `bg-accent` elements in `#impact`.
2. **No Tier-1 panel on the slide.** Neither the level grid nor the
   causal-chain box used the Tier-1 signature — the causal-chain box
   (arguably the slide's actual conclusion, per its own "FINAL CONCEPTUAL
   CAUSAL CHAIN" eyebrow) sat at the same Tier-2 rank as the merely-
   explanatory level cards, while the Level-03 card won first-glance
   purely by color, not evidentiary role. Fixed: causal-chain box promoted
   to Tier-1 (`border-2 border-rule-strong shadow-sm`); level grid stays
   uniformly Tier-2 — the "3-stage build-up, then synthesis" structure the
   copy already implies now has a matching visual structure. Verified
   live: chain box computes `border-width: 2px` + a real box-shadow.
3. **Hardcoded Korean-only h3 inside the causal-chain box.** A raw string
   ("언어 구조에서 사회적 파급 효과까지의 인과 사슬") rendered with no
   `isKo`/`isEn` branch — confirmed identical text at both KO and EN.
   The entity already carries a fuller, properly bilingual near-duplicate
   of this exact sentence one field over (`figureCaption.ko/en`, rendered
   immediately below via `ArticleFigureCaption`). **Fixed by deletion**
   rather than adding a new bilingual field: the h3 was redundant with the
   caption already on screen, so removing it fixes the bilingual gap
   without inventing new entity copy. Verified: EN render's chain-box
   header now reads only "FINAL CONCEPTUAL CAUSAL CHAIN," no residual
   Korean text.
4. **Figure-number label breaking mid-token at 390px.** `ArticleFigureCaption`
   (a shared component used by every section with a captioned figure) had
   no `shrink-0`/`whitespace-nowrap` on its `figNum` span, so "FIG. 08"
   itself wrapped across two lines at narrow widths — a rendering defect,
   not an authored break. Fixed in the shared component (low risk, only
   removes an unwanted break point) — applies site-wide. Verified: the
   figNum span now measures as one unbroken 62.7px-wide block at 390px.
5. **Dead-node check, typographic hierarchy, C1/C6/C14: all passed clean.**
   Unlike 3 other sections this session, `socioeconomicScale`'s
   `subheading` field has real bilingual content, so no empty
   `ArticleSubheading` bug here. Body-vs-headline hierarchy, horizontal
   scroll, sticky-header clearance, and box/child overflow all confirmed
   clean via live DOM measurement — no action needed on those axes.

Screenshotted 1440×KO, 1440×EN, 390×KO (+ figcaption crop): 0 overflow.
tsc clean, build passes, audit pipeline diff-reproducible, director queue
unchanged at 16. With this slide done, every section in the Director's
full redline work order (S00 through S07, in nav order) has now received
a dedicated pass this session.

**Findings (visual devpass, 2026-08-18, Iteration 18): 3 fixes — 2
local, 1 shared-component (site-wide effect).** Found 3 real Korean
mid-word breaks at 390px: (1) Level 02's description — "장문" (long-form)
split as "장"/"문"; (2) Level 03's description — "표현" (expression)
split as "표"/"현"; both fixed with one `break-keep` on the shared `<p>`
className in the `IMPACT_SCALE_LEVELS.map()` loop (covers all 3 level
cards, not just the 2 that happened to break at this viewport width).
(3) **`ArticleFigureCaption`'s own caption/source spans had no
`break-keep`** — this slide's FIG. 08 caption split "사슬" (chain) as
"사"/"슬". Since this is the shared component used by `ArticleFigureCaption`
across **7 widgets** (S01, S02, S03, S04, S04.5, S05, S05.2 — every
slide with a captioned exhibit), this one fix retroactively protects
every already-passed slide's figure caption too, not just this one.
Not re-verified per-slide (the fix is structural, not content-dependent);
flagged here so a future pass knows why captions weren't individually
re-screenshotted. All 3 fixes verified: `word-break: keep-all` computed
correctly, re-screenshot confirms all 3 words intact, 0 overflow, tsc/build
clean.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 9): `S52-M01`–`M05`
closed.** Structural redesign, not label-only — this slide's directives
(`HP01-S52-R01`–`R04`, `B01`, `B02`) required both the 3-card grid and
the causal-chain box to change.

Exact changes:
- **`entities/article-content/content/impact-scale-levels.ts`
  (`IMPACT_SCALE_LEVELS`):** removed the `levelBadge` field entirely
  (`PROMPT LEVEL` / `WORKFLOW LEVEL` / `INFRASTRUCTURE` — pure
  decorative English chrome, redundant with the title already on each
  card). `levelLabelKo` simplified: `'LEVEL 01 / 개인'` → `'1단계 ·
  개인'` (same for levels 2/3). Card `title`/`description` text
  unchanged.
- **`IMPACT_CAUSAL_CHAIN`:** was a flat English-only string array
  (`'Language Structure'`, `'Tokenization'`, …) rendered under the
  label `FINAL CONCEPTUAL CAUSAL CHAIN`. Converted to `{ ko, en }`
  bilingual steps (`'언어 구조'`, `'토큰화'`, `'Token Premium'`
  kept as the established term, `'업무 부담'`, `'AI 확산 규모'`,
  `'잠재적 디지털 마찰'`); the enclosing box's eyebrow → `가능한 확장
  경로` (possible expansion pathway) with a new sub-line explicitly
  disclaiming causality: `"실증된 인과관계가 아니라, 개념적으로 연결될
  수 있는 경로입니다."` Same 6 steps, same order — no step added,
  removed, or reordered.
- **`figureCaption.ko`** (`socioeconomicScale`): `"언어 구조에서
  사회적 파급 효과까지의 3단계 인과 사슬 (Complete Causal Chain)"` →
  `"언어 구조에서 사회적 파급 효과까지, 가능한 확장 경로"` — matches
  the box's new framing; `figureSource` untouched (G06).
- **`keyFinding.statement.ko`:** `"...언어별 representation
  efficiency를 측정하고..."` → `"...언어별 표현 효율성을 측정하고..."`
  (Koreanized embedded English term).
- **`소버린 AI` gloss (`S52-M05`):** Level 3's `unitNote` — `'단위:
  국가 인프라 / 소버린 AI'` → `'단위: 국가 인프라 / 소버린 AI(자국
  데이터·인프라로 운용되는 자체 AI 체계)'` — this is the term's first
  appearance in reading order (the card grid renders before the
  post-figure paragraph's second, unglossed mention), satisfying the
  "one-line definition on first use" requirement without needing a
  separate 2DEPTH mechanism for a single short phrase.
- **`ImpactSection.tsx`:** removed the now-deleted `levelBadge` `dd`
  render; chain-step rendering reads `isKo ? step.ko : step.en` (was a
  bare string); `isEmphasis` check updated to compare `step.en` against
  the two emphasized English keys (data identity unchanged, only the
  comparison target adjusted for the new object shape).

Research-content impact: NONE — the 3-level cards' actual claims and
the 6-step sequence are unchanged; only decorative labels, the causal-
sounding framing, and one embedded English phrase were edited.

Metric verification (local build): `S52-M01` root=1, legacy `LEVEL
0N`/`PROMPT LEVEL`/`WORKFLOW LEVEL`/`INFRASTRUCTURE` strings all absent
(DOM text scan). `S52-M02` PASS (same scan). `S52-M03` PASS (`FINAL
CONCEPTUAL CAUSAL CHAIN`/`Complete Causal Chain`/`causal chain`/`인과
사슬` all absent). `S52-M04` PASS (`가능한 확장 경로` present with
explicit non-causal disclaimer line). `S52-M05` PASS (`소버린 AI` gloss
text present). `S52-M06` (visual rubric) — one bordered pathway box,
no residual 3-card competition, confirmed via screenshot.

Verified 1440×KO/EN: 0 overflow both languages. tsc clean, build
clean.

**Findings (Human Preview 01, 2026-08-18, HP01 Iteration 10): `S6-M01`–`M06`
closed.** `MethodSection.tsx` — UI chrome only, `METHODOLOGY_ITEMS`/
`WHAT_WE_DO_NOT_CLAIM` entity content (PROTECTED, per the file's own
header comment) untouched byte-for-byte.

Before → after (exact strings):
- Boundary-box `<dt>`: `"CRITICAL BOUNDARY / 본 분석이 주장하지 않는 것
  (What We Do NOT Claim)"` → KO `"이 분석으로 말할 수 없는 것"` / EN
  `"What This Analysis Does Not Claim"`.
- Boundary-box `<dd>`: `"6 Key Principles"` (was hardcoded English for
  both languages) → real ternary, KO `"6가지 경계"` / EN unchanged.
- Accordion header `<dt>`: `"세부 분석 방법론 (Methodological
  Pillars):"` → `"세부 분석 방법론"` — dropped the English
  parenthetical from the Korean string (EN string untouched).
- Accordion header `<dd>`: `"Click to expand"` (English-only) → KO
  `"클릭하여 펼치기"` / EN unchanged.
- Footnotes header: `"연구 주석 (Research Footnotes):"` → `"연구
  주석:"` (EN untouched).
- `article-content.ts`, `methodologyBoundaries.preFigureParagraphs.ko[0]`:
  `"...표준화된 BPE 토큰화 알고리즘이..."` → `"...표준화된 BPE(Byte
  Pair Encoding, 자주 등장하는 글자 조합을 하나의 토큰으로 묶어나가는
  하위 단어 분절 방식) 토큰화 알고리즘이..."` — inline gloss inserted
  at the term's first use; no claim added, removed, or reworded.

Metric verification (Playwright, `localhost:3000`, KO, 1280×900):
`S6-M01` PASS (root=1, claim items=6, methodology items=6). `S6-M02`
PASS (0 leftover `CRITICAL BOUNDARY`/`WHAT WE DO NOT CLAIM`/`6 KEY
PRINCIPLES`, case-insensitive scan). `S6-M03` PASS (diffed all 6
`WHAT_WE_DO_NOT_CLAIM` strings — byte-identical). `S6-M04` PASS
(clicked methodology item 3: `aria-expanded` false → true → false,
content visible while open). `S6-M05` PASS (BPE gloss text present in
rendered DOM). `S6-M06` (visual rubric) PASS — boundary box and
accordion header now read as plain label pairs, no residual
`<dl>`/`<dt>`/`<dd>` research-dashboard chrome outside the two
PROTECTED accordion item titles (`의미론적 동등성 (Semantic
Equivalence)` etc.), which are in-scope content, not UI chrome, and
were intentionally left untouched.

Research-content impact: NONE.

Verified: `npx tsc --noEmit` clean, `npm run build` clean.
