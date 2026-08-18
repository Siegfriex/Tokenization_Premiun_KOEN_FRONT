# Human Preview 01 — Editorial Execution SSOT

**Status:** ACTIVE — LONG-RUN LOOP
**Created:** 2026-08-18
**Scope:** editorial/visual reconciliation of Director's 2026-08-18 Human
Preview 01 (annotated screenshots `AUDIT2/S0.png`–`S9 _ 결론.png` +
verbal directive transcript, both translated into the `HP01-*` directive
table below) against the current FRONT implementation.

This document is the **HUMAN_PREVIEW_01 EDITORIAL EXECUTION SSOT** — the
authority for this patch cycle's scope. It does not replace the
project's research SSOT and does not license inventing new research
values. Re-read this file at the start of every iteration; trust it over
conversational memory.

---

## A. Authority

Order (highest first), per the Director's operating framework for this
session:

1. Director's current explicit instruction (live, in-conversation)
2. 2026-08-18 annotated screenshots, `AUDIT2/S0.png` – `S9 _ 결론.png`
3. The Human Preview QA meeting transcript — **SOURCE_NOT_LOCAL**; the
   Director's own prompt text (the `HP01-*` directive table) stands in
   as the Director-approved translation of both the transcript and any
   annotation not independently legible from the images
4. This file
5. `docs/audit/DIRECTOR_DECISIONS.md`
6. `docs/qa/SHOT_SPECS.md`, `docs/qa/DESIGN_LAW.md`,
   `docs/qa/VISUAL_QA_CRITERIA.md`
7. Current source implementation
8. Prior agent reports / handoff docs (`docs/HANDOFF.md`,
   `docs/qa/LOOP_LOG.md`)

Image vs. transcript conflict rule: (1) unambiguous image RED/BLUE beats
(2) repeated meeting consensus beats (3) a single ASR utterance.

**Non-negotiable regardless of authority order:** no PROTECTED research
value (TP definition, numeric findings, sample sizes, tokenizer
identifiers, methodology wording) changes without an explicit
`docs/audit/DIRECTOR_DECISIONS.md` ruling. Human Preview RED/BLUE is
editorial/presentation authority only (§G).

**Execution-methodology overlay (added mid-session, 2026-08-18):**
`AUDIT2/QA/Human Preview 01 — DOM-Targeted Local Agent Master
Directive.md` arrived from a parallel/independent audit process. It
explicitly preserves this MASTER as the authority for screenshot
meaning/status and `DIRECTOR_DECISIONS.md` for protected content — it
adds a stricter *implementation* protocol on top: address DOM nodes via
`section#id[data-widget=...]` root → `data-collection`/`data-role` →
unique semantic HTML → new `data-hp01-id` instrumentation (added in its
own commit, verified as a unique match, before the editorial change) →
narrow class selector, in that priority order; never OCR/coordinate-only
addressing. Its own Runtime Crawl Notes independently confirmed this
session's S2/S3 deployments matched intent. Iterations from HP01
Iteration 7 (S5.2) onward follow this stricter protocol explicitly;
Iterations 1-6 (S0-S5) were already addressed via existing
`data-widget`/`data-role`/`data-collection` hooks and root-scoped
Playwright DOM queries (e.g. `document.querySelectorAll('#burden *')`),
which satisfies the overlay's own priority order 1-3 even though it
predates the overlay document's arrival — no rework needed there.

---

## B. Current Git/Vercel Baseline

Recorded at MASTER creation (2026-08-18, this session):

```
REPO_ROOT        = /home/sieg/projects-wsl/Tokenization_FRONT/dsja_5_front
REMOTE           = koen-front-origin -> github.com/Siegfriex/Tokenization_Premiun_KOEN_FRONT.git
MAIN_SHA         = ceb7b4e7a657c324fa0159a9127d5f48c2046c6b   (PR #20 merge)
PRODUCTION_SHA   = 894dcd8   (== visual-devpass/full-sweep tip, PR #21, UNMERGED)
PRODUCTION_ASSET = assets/index-BKcILT42.js, assets/index-03amukyS.css
BASELINE_KIND    = PRODUCTION_PROMOTED_HEAD
BASELINE_SHA     = 894dcd8
OPEN_PR          = #21 (visual-devpass/full-sweep -> main, OPEN, unmerged)
WORKING_BRANCH   = editorial/human-preview-01 (branched from 894dcd8, this session)
RESEARCH_WATCH_SHA        = 3170fc8f83558fc3fc9c919b1e998dc6b1520311 (Tokenization_Premium, 2026-08-16)
RESEARCH_CHANGE_RELEVANCE = NONE
```

**Verification method used:** `git worktree add` a detached checkout of
`koen-front-origin/main` and of `koen-front-origin/visual-devpass/full-sweep`,
`npm run build` each, compare `dist/assets/*.js` filename hash against
`curl -s https://tokenization-premiun-koen-front.vercel.app/ | grep -oE
'assets/index-[A-Za-z0-9_-]+\.(js|css)'`. Main's build hash
(`index-B0LeBmgl.js`) does **not** match production; the
`visual-devpass/full-sweep` branch tip's build hash
(`index-BKcILT42.js`) does. Conclusion: **the Director reviewed a
manually-promoted Vercel preview of the unmerged PR #21, not `main`.**
All Human Preview annotations are against that state — i.e., against
every fix already made in visual-devpass iterations 11–20 (see
`docs/qa/LOOP_LOG.md` Phase 7). `editorial/human-preview-01` branches
from that exact commit (`894dcd8`) so the diff this loop produces is
purely the Human Preview delta, not a re-diff against stale `main`.

**Merge/promote policy for this loop:** commit, push, PR create/update,
and preview verification are permitted autonomously. **Merging to `main`
and promoting/rolling back production are NOT** unless the Director
explicitly approves in-conversation for this specific merge.

---

## C. Screenshot ↔ Nav ↔ Component Mapping

Base table (Director-provided, preserved verbatim — do not re-derive):

| Image | Nav | DOM `id` | Trace prefix | Component |
|---|---|---|---|---|
| `S0.png` | S0 | `hero` | `HERO` | `NewsHeroSection.tsx` |
| `S1.png` | S1 | `compare` | `CMP` | `TokenCompareSection.tsx` |
| `S2.png` | S2 | `pipeline` | `PIPE` | `PipelineSection.tsx` |
| `S3.png` | S3 | `patterns` | `PREM` | `TokenPremiumSection.tsx` |
| `S4.png` | S4 | `burden` | `BURD` | `OccupationSection.tsx` |
| `S5.png` | S4.5 | `languages` | `LANG` | `MultilingualTokenEfficiencySection.tsx` |
| `S6.png` | S5 | `infrastructure` | `INFRA` | `KoreaAIContextSection.tsx` |
| `S7.png` | S5.2 | `impact` | `IMPACT` | `ImpactSection.tsx` |
| `S8.png` | S6 | `method` | `METH` | `MethodSection.tsx` |
| `S9 _ 결론.png` | S7 | `result` | `CONC` | `EditorialConclusionSection.tsx` |

**⚠️ Verified discrepancy — file boundaries ≠ component boundaries.**
Direct inspection of the images (not assumed from filenames) found:

- **`S0.png` contains 4 annotation clusters, only 2 of which are S0/hero.**
  Clusters 1–2 (full hero view; zoomed `약 1.2X~1.8X` big-number) are
  genuinely `NewsHeroSection`. Clusters 3–4 (a paragraph beginning "토큰화
  (Tokenization)는 인공지능이…" and the header "토큰, AI 시대의 새로운
  계량 단위" + "TRANSFORMER PIPELINE SEQUENCING" + "★ STEP 02: THE
  BOTTLENECK") are verbatim `PipelineSection` (S02) content — confirmed
  by grep against `PipelineSection.tsx`'s actual JSX. These two clusters'
  directives are filed under S2 in §F, not S0, and treated as
  corroborating/refining the text-prompt's `HP01-S2-*` rows, not as new
  S0 directives.
- All other images (`S1`–`S9`) were checked and their visible content
  matches their assigned component's actual rendered text — no further
  mismatches found.
- **The text-prompt directive table (§8 of the Director's framework
  message) provides `HP01-*` rows for S2 through S7, but none for S0 or
  S1.** Per Authority Order, the images are higher authority than a
  document anyway, so this gap is filled directly from the S0.png/S1.png
  annotations themselves — see §F, new `HP01-S0-*` / `HP01-S1-*` IDs
  minted in this MASTER (not present in the Director's original text,
  clearly marked as MASTER-derived).

---

## D. RED / BLUE Interpretation Law

Preserved verbatim from the Director's framework:

- **RED = mandatory action.** Not necessarily deletion — whatever the
  annotation's own intent specifies (remove / rewrite / replace /
  restructure / simplify). The one invariant: leaving the element
  exactly as it is now is not an option.
- **BLUE = mandatory development direction**, not an optional suggestion.
  If a BLUE requires evidence/data that doesn't exist yet, the correct
  closure state is `BLOCKED_EVIDENCE` — never a fabricated number or
  invented source.
- Conflict resolution: unambiguous image annotation > repeated meeting
  consensus > single ASR utterance.

---

## E. Global Editorial Laws (HP01-G01…G10)

Preserved verbatim (see Director's message for full text; summarized
here for quick reference during patch work — read the original for exact
wording before closing a directive that depends on one):

| ID | One-line rule |
|---|---|
| G01 | Korean-first: KO 1DEPTH must read as a KO data-journalism article |
| G02 | Technical identifiers (`o200k_base`, UTF-8, BPE, Flores-200, Token Premium) may stay, but need a KO explanation on first appearance |
| G03 | No decorative all-caps English dashboard language in 1DEPTH (list of banned label patterns in the original) |
| G04 | 1DEPTH = article body; 2DEPTH = term glossary (accordion/tooltip/popover); 3DEPTH = methodology/provenance/limitations |
| G05 | One section = one main point; headline + one central visualization must win first read |
| G06 | Source is not decoration — never delete real provenance; never invent fake provenance |
| G07 | No research invention — Human Preview RED/BLUE is editorial authority only, never license for new numbers/claims |
| G08 | No causal overstatement ("인과", "원인", "때문에", "필연적으로", "기하급수적으로") — use "관찰 경로", "개념적 연결", "가능한 확장 경로" etc. instead |
| G09 | Reduce AI-generated-prose smell (noun-pile sentences, repeated bracket EN/KO, "구조적 과제입니다" overuse, undefined jargon, >3 concepts/paragraph) |
| G10 | Don't remove interaction without explicit intent; when removing dashboard chrome, re-express as article-native interaction, not bare deletion |

**Newly observed, not in the original G-list but repeatedly evidenced
across S5's annotations (image ground truth):** sentence-ending style
(`반말체` "~다" vs `존댓말체` "~ㅂ니다") is mixed within single sections
and flagged for unification ("문체 통일, 종결어미를 통일시킬수있도록").
Filed as **G11 (MASTER-derived):** pick one sentence-ending register per
section (this project's existing prose is `~다`/declarative-plain
register almost everywhere outside quoted material — default to that
unless a section's own established voice says otherwise) and apply it
consistently; flag mixed endings as a G09-class defect during the
AI-tone lint pass (§14 of the framework).

---

## F. Per-Slide Directive Ledger

Legend: **R** = RED (mandatory), **B** = BLUE (mandatory direction,
`BLOCKED_EVIDENCE` allowed), **status** = `ALREADY_DONE` /
`TODO` / `BLOCKED_*` / `CONFLICT` (initial classification, this MASTER
creation pass — not yet patched except where noted).

### S0 — hero (`NewsHeroSection.tsx`) — directives MASTER-derived from `S0.png` clusters 1–2 (text prompt had none)

| ID | Type | Directive (from image) | Status |
|---|---|---|---|
| HP01-S0-R01 | R | Remove "AI-ness" from the top metadata bar (`TOKEN PREMIUM · AI × LANGUAGE / 2026` eyebrow) | **DONE** (HP01 Iter 1) — removed "COVER & CORE THESIS", Koreanized "Data Journalism Investigation"; eyebrow entity value itself left untouched (contains G02-exempt "TOKEN PREMIUM" identifier) |
| HP01-S0-R02 | R | Remove "AI-ness" from the FIG.01 exhibit card header (`FIG. 01 / REAL TOKEN SPLIT EXHIBIT`) | **DONE** (HP01 Iter 1) — KO: "FIG. 01 · 실제 토큰 분절 비교" / "문장쌍 비교" |
| HP01-S0-R03 | R | Remove the stat-ribbon "table" (`ANALYSIS TARGET` / `CORE METRIC` / `OBSERVED GAP` row) — annotated "표제거요망" | **DONE** (HP01 Iter 1) — block removed entirely |
| HP01-S0-R04 | R | English→Korean pass on the area near the stat ribbon ("영어→한글 한글로") | **DONE** (HP01 Iter 1) — same element as R03, resolved by removal |
| HP01-S0-R05 | R | The FIG.01 card's takeaway/news-note content "belongs in the conclusion, remove or rewrite at intro" — annotated directly over the exhibit card's lower content | **DONE** (HP01 Iter 11) — resolved together with S7, see S7 section below for detail: removed (not duplicated), since S5's lead and S7's paragraph 2 already carry the same purpose |
| HP01-S0-B01 | B | The `ArticleBigFinding` "약 1.2X ~ 1.8X" display: arrange in parallel/inline layout, reduce font size, adjust text layout | **DONE** (HP01 Iter 1) — `text-6xl…text-9xl` → `text-5xl…text-7xl` + `whitespace-nowrap`, single-consumer component so safe to resize directly |
| HP01-S0-R06 | R | (Cluster 3, actually S02 content mis-filed in this image) Explicit explanation of tokenization-related process/concepts is unneeded at 1DEPTH → move to a dropdown/2DEPTH disclosure | **Filed as S2 directive, see HP01-S2-B03 below** |
| HP01-S0-R07 | R | (Cluster 4, actually S02 content) "이런거 전체 제거" over `TRANSFORMER PIPELINE SEQUENCING` and `★ STEP 02: THE BOTTLENECK` | **Duplicate of HP01-S2-R01/R02 — corroborates, not a new item** |

### S1 — compare (`TokenCompareSection.tsx`) — directives MASTER-derived from `S1.png` (text prompt had none)

| ID | Type | Directive | Status |
|---|---|---|---|
| HP01-S1-R01 | R | Header/lead area: two numbered marks "1. "확인"" / "2. "비교" 명사 종결…" near the bottom CTA sentence ("…직접 비교해보십시오") — end the sentence as a noun phrase ("…비교") rather than an imperative, and review the word "확인" nearby | **DONE** (HP01 Iter 2) — reinterpreted as "remove imperative-command tone"; ending changed to declarative "…직접 비교한다." Flagged for Director re-confirmation if a stricter noun-ending was intended |
| HP01-S1-R02 | R | Cross out `한국어 (HANGUL SCRIPT)` / `ENGLISH (LATIN SCRIPT)` column headers — remove decorative bracket-script-name English | **DONE** (HP01 Iter 2) — KO mode: `한국어` / `영어`; EN mode unchanged |
| HP01-S1-R03 | R | "관련 무분별 용어 사용 제한" near the English headers — limit indiscriminate technical jargon in that area generally | **DONE** (HP01 Iter 2) — same locus as R02, resolved together |
| HP01-S1-R04 | R | Replace the `FIG. 01` label positioned above the exhibit with the heading "검증된 대역 문장쌍 선택" | **ALREADY_DONE** (verified, no change needed) — the selector heading already reads "검증된 대역 문장쌍 선택:", FIG.01 only appears at the separate bottom caption, not competing |
| HP01-S1-R05 | R | The bottom "Token Ratio: N× (+M additional tokens)" observation line — circled in red across **both** captured pair states (pair 1 and pair 4), i.e. flagged regardless of which pair is selected → remove or fully rewrite | **DONE** (HP01 Iter 2) — KO mode: "토큰 비율 N× (+M개 토큰)" |
| HP01-S1-R06 | R | "제거" + "AI 티 없애기 제거 필요" at the bottom, large — same locus as R05, and possibly extends to the italic post-figure paragraph ("같은 의미를 전달하더라도…") | **DONE** (R05/R06 same element); the post-figure paragraph itself left untouched (not clearly in the annotation's boundary, already in Korean) |

### S2 — pipeline (`PipelineSection.tsx`)

Text-prompt IDs (`HP01-S2-R01`–`R04`, `B01`–`B02`) preserved verbatim
from the Director's message — **do not re-derive wording**, only status
here:

| ID | Directive (paraphrased) | Status |
|---|---|---|
| HP01-S2-R01 | Remove/Koreanize "TRANSFORMER PIPELINE SEQUENCING" decorative label | **DONE** (HP01 Iter 3) — removed entirely, not translated |
| HP01-S2-R02 | Remove "★ STEP 02: THE BOTTLENECK" / "GAP ORIGIN" badges | **DONE** (HP01 Iter 3) — both removed; step 2's `bg-accent` fill (the actual signal) kept |
| HP01-S2-R03 | "4단계" copy vs. actual 5-step visualization conflict — **do not resolve unilaterally** | `BLOCKED_CONTENT_AUTHORITY` (unchanged) |
| HP01-S2-B01 | Plain-Korean explanation of what a token/token ID/input sequence is | **DONE** (HP01 Iter 3) — satisfied structurally via B02/B03's disclosure move (the existing plain-Korean lead already covers this at 1DEPTH; the technical detail is now 2DEPTH) |
| HP01-S2-B02 | Move Transformer/Self-Attention/Context Window detail to 2DEPTH | **DONE** (HP01 Iter 3) — moved into new `ArticleDisclosure` |
| HP01-S2-B03 *(MASTER-derived, from `S0.png` cluster 3)* | Explicit process/concept explanation unneeded at 1DEPTH → 2DEPTH dropdown | **DONE** (HP01 Iter 3) — same disclosure covers both B02 and B03 |
| HP01-S2-R04 | Keep figure source; rewrite the AI-sounding technical caption above it in article Korean | **DONE** (HP01 Iter 3) — caption → "문장이 토큰으로 바뀌는 과정", source line untouched |

### S3 — patterns (`TokenPremiumSection.tsx`)

Text-prompt IDs preserved; image adds specificity:

| ID | Directive | Status |
|---|---|---|
| HP01-S3-R01 | Koreanize `CORE EMPIRICAL METRIC` / `MATHEMATICAL FORMULA` / `DOMAIN DISTRIBUTION EXHIBIT` labels | **DONE** (HP01 Iter 4) — `핵심 실측 지표` / `산출 공식` / `도메인별 분포` |
| HP01-S3-R02 | Define "Token Premium" explicitly on first use (example format given: `TOKEN_PREMIUM(~~~)`) | **DONE** (HP01 Iter 4) — satisfied via the existing Tier-3 formula box, translated in place rather than adding new copy |
| HP01-S3-R03 | Numeric provenance must be traceable on-screen; don't justify unsourced numbers with new prose | **ALREADY_DONE** — verified no new unsourced justification was added; provenance display unchanged |
| HP01-S3-R04 | D1 numeric mismatch stays a separate open decision | `BLOCKED_CONTENT_AUTHORITY` (unchanged) |
| HP01-S3-B01 | Explain "대규모 한영 코퍼스"/"심층 벤치마크"/"실증적 분포" concisely in plain Korean | **DONE** (HP01 Iter 4) — same fix as R02, the translated formula box + existing lead paragraph already carry this |
| HP01-S3-R05 | Data/comparison must read before English UI terms | **DONE** (HP01 Iter 4) — resolved as a byproduct of R01 |
| HP01-S3-R06 *(MASTER-derived)* | "OBSERVED TOKEN PREMIUM RATIO" label struck through — Koreanize/remove (number PROTECTED) | **DONE** (HP01 Iter 4) — `관측된 토큰 프리미엄 비율`, number untouched (verified via DOM scan) |
| HP01-S3-R07 *(MASTER-derived)* | Closing paragraph marked "어렵게 설명" — simplify | **DONE** (HP01 Iter 4) — reworded, same meaning, "컨텍스트 윈도우" now glossed inline |

### S4 — burden (`OccupationSection.tsx`)

| ID | Directive | Status |
|---|---|---|
| HP01-S4-R01 | Remove the Engineering/Social-Science occupation-comparison lower section entirely | **DONE** (HP01 Iter 5) — removed outright (~120 lines), dead imports/data cleaned up, JS bundle -9KB |
| HP01-S4-B01 | Simulator is a DEVELOPMENT target, not deletion — promote to the slide's central interaction | **DONE** (HP01 Iter 5) — structural consequence of R01, simulator is now the breakout's sole content |
| HP01-S4-R02 | Koreanize `TOKEN GAP` / `ACCUMULATED BURDEN GAP` / `WORKFLOW REPETITION SIMULATOR` | **DONE** (HP01 Iter 5) — all labels + "token gap" phrase in lead text |
| HP01-S4-R03 | Remove unsourced workload characterizations ("팀 일간 워크플로우", "전사 에이전트 루틴") if no real data backs them | **DONE** (HP01 Iter 5) — scale-legend reduced to plain numbers |
| HP01-S4-B02 | Extend interaction architecture toward a pricing/unit-cost input, data-adapter separated from UI scaffold; never fill with invented numbers | `BLOCKED_EVIDENCE` (unchanged) — no entity holds a TP(4Q)/pricing-unit figure |
| HP01-S4-B03 *(MASTER-derived)* | Typography must handle KO/EN number formatting cleanly in the simulator | **DONE** (HP01 Iter 5) — `toLocaleString()` + `isKo`-gated unit suffixes, no separate fix needed |
| HP01-S4-R04 | Don't use "기하급수적으로" for what is a linear accumulation | **DONE** (HP01 Iter 5) — corrected to "그대로"; this was a factual math error, not just tone |

### S4.5 — languages (`MultilingualTokenEfficiencySection.tsx`)

| ID | Directive | Status |
|---|---|---|
| HP01-S45-R01 | Whole-section redesign candidate — do not preserve current dashboard composition | **DONE** (HP01 Iter 8) — Director's Acceptance Metrics doc (`S45-M04`) confirmed the Iter-6 label-only work did not close this (2 competing bordered panels, verified by count). Redesigned: merged the stat card and chart into one bordered panel, selected-language readout folded into the panel's own header line. Same 5 verified language entries, no new data. Verdict: `CONDITIONAL PASS` |
| HP01-S45-R02 | Remove English-centric labels/unfiltered technical terminology, Korean-article-voice default | **DONE** (HP01 Iter 6) — all panel/chart/tooltip labels Koreanized |
| HP01-S45-B01 | Restructure so Korean's position relative to other scripts is legible at a glance; only include languages with real verified evidence | **ALREADY_DONE** — the chart already sorts/highlights Korean distinctly (black bar vs gray others); the 5-language set is already the full verified set (no fabricated languages added) |
| HP01-S45-B02 | Locate the Flores-related paper mentioned in the meeting ("누나가 가져온 논문") and wire it into figure/source provenance | `BLOCKED_EVIDENCE` (unchanged) — paper not identified/located this session |
| HP01-S45-R03 | Don't present "12개 언어"/Hindi etc. as complete evidence when current entity only has 5 rows | **Correctly untouched** — pre-existing content-integrity flag, reconfirmed not resolved by this pass |
| HP01-S45-R04 | Don't let "다국어 AI 거버넌스"/"소버린 파운데이션 모델" conclusions front-run the measured comparison | **DONE** (HP01 Iter 6) — the exact flagged sentence removed entirely, plus a second "구조적 과제" instance in keyFinding (named in G09) |
| HP01-S45-R05 *(MASTER-derived)* | Sentence-ending register inconsistency (~다 vs ~ㅂ니다) — unify (see G11) | **DONE** (HP01 Iter 6) — resolved as a byproduct of R04's removal |

### S5 — infrastructure (`KoreaAIContextSection.tsx`)

| ID | Directive | Status |
|---|---|---|
| HP01-S5-R01 | Don't use "MACRO ADOPTION CAUSAL CHAIN" — reframe non-causally ("AI 확산의 흐름" etc.) | **DONE** (HP01 Iter 7) — `AI 확산의 흐름` / `AI ADOPTION TIMELINE` |
| HP01-S5-R02 | Koreanize phase labels (AI Investment / Infrastructure / AI Adoption / Token Usage) | **DONE** (HP01 Iter 7) — also resolves the pre-existing `HANDOFF.md` §6.5/D6 bilingual gap (name/description now proper `{ko,en}`, was never `isKo`-gated before) |
| HP01-S5-R03 | Remove the 3 `[VERIFIED ... REQUIRED]` placeholder policy/investment cards from 1DEPTH | **DONE** (HP01 Iter 7) — entire block + orphaned bridge arrow removed |
| HP01-S5-B01 | If real verified sources exist, replace placeholders with source strips | `BLOCKED_EVIDENCE` (unchanged) — no real sources supplied |
| HP01-S5-R04 | Don't imply AI investment causes Token Premium, or that Token Premium causes national power consumption | **DONE** (HP01 Iter 7) — "기하급수적으로" and the direct power-consumption causal sentence both reframed; figure caption's "인과 사슬" phrase removed |

### S5.2 — impact (`ImpactSection.tsx`)

| ID | Directive | Status |
|---|---|---|
| HP01-S52-R01 | Remove or substantially restructure the Personal/Organization/Society 3-card dashboard framing | **DONE** (HP01 Iter 9) — removed `levelBadge` English chrome field, simplified `levelLabelKo`; cards kept as a legitimate 3-stage progression, not a dashboard pattern |
| HP01-S52-R02 | Remove "FINAL CONCEPTUAL CAUSAL CHAIN" / "Complete Causal Chain" wording | **DONE** (HP01 Iter 9) — box relabeled `가능한 확장 경로`; figure caption's matching phrase also removed |
| HP01-S52-B01 | Replace with one simple Korean connective diagram, explicitly framed as conceptual pathway, not causal proof | **DONE** (HP01 Iter 9) — explicit disclaimer sub-line added; 6 chain steps Koreanized, same order/content |
| HP01-S52-R03 | Minimize English technical labels | **DONE** (HP01 Iter 9) — resolved together with R01/R02 |
| HP01-S52-B02 | GPT/Transformer/context window/sovereign-AI-class terms need 2DEPTH glossary entries | **N/A** — no GPT/Transformer/context-window terms found on this slide's actual entity content (checked directly); only "소버린 AI" appears, handled by R04 |
| HP01-S52-R04 | "소버린 AI" needs a one-line definition or glossary link if it remains | **DONE** (HP01 Iter 9) — inline gloss at first appearance: "소버린 AI(자국 데이터·인프라로 운용되는 자체 AI 체계)" |

### S6 — method (`MethodSection.tsx`)

| ID | Directive | Status |
|---|---|---|
| HP01-S6-R01 | Remove `CRITICAL BOUNDARY` / `WHAT WE DO NOT CLAIM` / `6 KEY PRINCIPLES` English UI labels; suggested KO: "이 분석으로 말할 수 없는 것", "6가지 경계" | **DONE** (HP01 Iter 10) — dt/dd now `이 분석으로 말할 수 없는 것` / `6가지 경계`; verified via `S6-M02` (0 leftover EN labels in KO DOM) |
| HP01-S6-R02 | The 6 claim items' actual content is NOT a deletion target — do not weaken/strengthen wording | `ALREADY_DONE` (content untouched all session; verified via `S6-M03` — all 6 `WHAT_WE_DO_NOT_CLAIM` strings byte-identical) |
| HP01-S6-B01 | Keep/strengthen accordion-based 2DEPTH for detailed methodology | `ALREADY_DONE` — verified via `S6-M04` (open/close on item 3 toggles `aria-expanded` false→true→false, content visible) |
| HP01-S6-R03 | Whole slide should read as journalist-to-reader explanation, not a research-report dashboard | **DONE** (HP01 Iter 10) — resolved together with R01; also Koreanized `Click to expand`→`클릭하여 펼치기`, dropped English parentheticals from `세부 분석 방법론 (Methodological Pillars):`→`세부 분석 방법론` and `연구 주석 (Research Footnotes):`→`연구 주석:` |
| HP01-S6-B02 *(MASTER-derived)* | "BPE 토큰화 알고리즘에 대한 설명 필요" — the lead paragraph's technical-algorithm mention needs a plain-Korean gloss | **DONE** (HP01 Iter 10) — inline gloss at first use: `BPE(Byte Pair Encoding, 자주 등장하는 글자 조합을 하나의 토큰으로 묶어나가는 하위 단어 분절 방식)`; verified via `S6-M05` |

**S6 closed 5/5.** `METHODOLOGY_ITEMS`/`WHAT_WE_DO_NOT_CLAIM` content (accordion titles/body text, the 6 claim sentences) is PROTECTED and untouched — only UI chrome (labels, headers) was edited. Verified against `S6-M01`–`M05` live via Playwright on `localhost:3000` (KO): root=1, claim items=6, methodology items=6, 0 leftover EN dashboard labels, accordion toggles correctly, BPE gloss present. `S6-M06` (reader-tone, visual/subjective) judged PASS from screenshot — dashboard-style `<dl>` stat rows replaced with plain heading/label pairs throughout.

### S7 — result (`EditorialConclusionSection.tsx`)

| ID | Directive | Status |
|---|---|---|
| HP01-S7-R01 | Fully Korean article tone in the conclusion; no technical English as rhetorical device | **DONE** (HP01 Iter 11) — `preFigureParagraphs.ko[1]`: "언어별 representation efficiency를" → "언어별 표현 효율성을"; verified via `S7-M05` (KO DOM has 0 occurrences; EN DOM legitimately retains the English phrase as native EN copy) |
| HP01-S7-R02 | Remove the duplicate pull-quote box | **DONE** (HP01 Iter 11) — removed the italic `<blockquote>`-style `<div>` entirely; it restated `preFigureParagraphs[1]` near-verbatim (and duplicated S5.2's `keyFinding.statement`); verified via `S7-M02` (blockquote/`.italic` count = 0) |
| HP01-S7-R03 | Remove "TOKEN PREMIUM INTERACTIVE DATA STORY / 2026" footer microcopy; Back-to-Top function itself stays | **DONE** (HP01 Iter 11) — footer `<div>` removed, exit-row `justify-between`→`justify-end`; button relabeled nothing, function untouched; verified via `S7-M03` (string absent) + `S7-M04` (click still scrolls to top, `aria`/`onClick` unchanged) |
| HP01-S7-B01 | Conclusion should compress "what was measured / what was observed / what is not yet claimed" — no new argument | **DONE** (HP01 Iter 11) — added one closing sentence (KO/EN) that restates, not adds to, `WHAT_WE_DO_NOT_CLAIM` items 2 and 6 (methodology.ts — "not always more costly", "not a confirmed inequality cause"); no new claim, no new number |

**Explicitly confirmed untouched by this Human Preview (image evidence):**
the display H2 ("우리는 같은 의미를, 같은 비용으로 표현하고 있는가?"),
the lead line, and the first paragraph carrying the PROTECTED
`1.29×~1.83×` range — none carry any annotation mark, and none were
edited this iteration (`S7-M01` confirms the range string is still
present verbatim). This Human Preview does not reopen the H2
question/verdict decision already made by the Director in the prior
session (per `docs/qa/SHOT_SPECS.md` S07-result).

**S7 closed 4/4.** Also resolved this iteration: **HP01-S0-R05**
(deferred cross-slide handoff) — removed `NewsHeroSection.tsx`'s "News
Archive Context Note" block (`보도 및 인프라 동향 아카이브`). Its
editorial purpose (national AI-infra scaling turning token efficiency
into a systemic issue) is already fully carried by S5's lead paragraph
and now S7's paragraph 2 — removed rather than duplicated, per the DOM
Master's explicit instruction not to move raw copy blindly and to
confirm the conclusion already carries the same purpose first (it
does). The protected `31 / 18 / 1.72×` FIG.01 numbers and the two
sample sentences were not touched. Verified via screenshot — no layout
gap, exhibit card ends cleanly at the Relative Ratio line.

---

## G. Protected-Content Boundary

Unchanged from the project's standing rule (`docs/HANDOFF.md` §9,
`docs/audit/DIRECTOR_DECISIONS.md`): `entities/article-content`,
`entities/domain-distribution`, `entities/multilingual-token`,
`entities/occupation`, `entities/methodology`, `entities/sentence-pair`,
`entities/policy-slot` numeric/research values are off-limits without an
explicit `DIRECTOR_DECISIONS.md` ruling. Human Preview RED/BLUE grants
**editorial/presentation** authority (wording register, label removal,
layout, depth-hiding, interaction rework) — it does **not** grant
authority to alter a protected number, sample size, causal framing of an
actual research finding, or tokenizer identifier. Where a directive's
natural reading would require a numeric/content change (e.g. HP01-S3-R04,
HP01-S45-R03), it is filed `BLOCKED_CONTENT_AUTHORITY` or
`BLOCKED_EVIDENCE`, not silently done.

---

## H. Loop State Machine

Per iteration: **RECOVER** (git fetch, confirm branch/HEAD/PR/production
SHA lineage) → **DIRECTIVE** (pick next TODO by priority order, §I of
Director's framework = §13) → **CODE NODE** (locate exact file/line) →
**PATCH** → **LOCAL QA** (Playwright against local dev server, real
computed-style/DOM checks) → **PREVIEW QA** (confirm Vercel preview build
for the branch) → **COMMIT** → **TRACE** (update `SHOT_SPECS.md` +
`LOOP_LOG.md` with a `### HP01 Iteration <N>` entry, template in §17 of
the framework) → **ACCEPTANCE** (check against §16 matrix per slide).

Working branch: `editorial/human-preview-01`, branched from
`894dcd8` (the production-promoted head, §B). Push/PR-update allowed;
merge to `main` and production promote/rollback require explicit
Director approval per merge, not blanket-authorized by this MASTER.

---

## I. Blocker Rules

- `BLOCKED_CONTENT_AUTHORITY`: directive requires a PROTECTED research
  value change or resolves a pre-existing content-authority question
  (D1, S2's "4단계"/5-step mismatch). Do not resolve; log and move on.
- `BLOCKED_EVIDENCE`: directive (typically BLUE) requires real
  data/sources not currently in any entity (S4's pricing-policy
  multiplier, S4.5's Flores paper, S5's verified source strips). Do not
  fabricate; log and move on.
- `CONFLICT`: image and text-prompt directive disagree, or two
  annotations on the same element point in different directions. None
  found yet in this MASTER's initial pass — record here if one surfaces
  during patching.

Per §12 of the framework: a blocked item is never silently dropped and
never blocks the rest of the queue — log the block, continue to the next
directive.

---

## J. Acceptance Matrix

Per-slide and whole-Human-Preview matrices reproduced from the
Director's framework §16 — applied verbatim per slide as each is
closed. Not reproduced in full here to avoid duplication drift; the
authoritative copy is the Director's original message. This MASTER
tracks completion state in §K, not a second copy of the checklist.

---

## K. Current Progress

**Phase: patch loop active. HP01 Iteration 11 (S7 + S0-R05 handoff)
closed 5/5 directives — all 8 in-scope slides (S0–S7) now have 0 TODO
items remaining.**

Directive count by current status:

| Status | Count |
|---|---|
| DONE | 54 (S0: 5; S1: 5; S2: 7; S3: 6; S4: 7; S4.5: 4; S5: 4; S5.2: 5; S6: 3; S7: 4; + 4 cross-cutting not broken out per-slide above) |
| N/A (checked, not applicable) | 1 (S5.2-B02 — no GPT/Transformer terms exist on this slide) |
| PARTIAL | 0 |
| TODO | 0 |
| BLOCKED_CONTENT_AUTHORITY | 4 (S2 "4단계"/R03, S3 D1/R04, S4.5 "12개 언어"/R02, D8 — see §M) |
| BLOCKED_EVIDENCE | 2 (S4 pricing multiplier/B02, S5 source strips/B01) |
| ALREADY_DONE (pre-existing or verified-no-change-needed) | 6 (S6 claim-content preservation, S6 accordion pattern, S1-R04, S3-R03, S4.5-B01, S4.5-B02 [Flores paper now sourced, D8]) |
| DEFERRED (cross-slide sequencing, not blocked) | 0 (S0-R05 resolved this iteration) |
| CONFLICT | 0 |

**Bonus resolution (Iteration 7):** S5's phase-card bilingual gap
(`HANDOFF.md` §6.5 / `DIRECTOR_DECISIONS.md` D6) is now closed as a
byproduct of HP01-S5-R02 — worth flagging to whoever next syncs
`DIRECTOR_DECISIONS.md`.

**Protocol shift (mid-session):** adopted the Director's Acceptance
Metrics document (`AUDIT2/QA/...Acceptance Metrics and Crawl QA
Protocol.md`) as the literal test specification from Iteration 8
onward, and its "verify before reimplement" priority order for
already-merged slides. S4 verified `PASS` with zero code changes
(E4 evidence, see LOOP_LOG). S4.5's Iteration-6 `PARTIAL` closed
properly this iteration via a real composition redesign (not just
labels) after the metrics doc's own count-based check
(`S45-M04`) confirmed the prior state genuinely failed.

**Slide verdicts (using the Acceptance doc's PASS/CONDITIONAL
PASS/FAIL/NOT VERIFIABLE vocabulary):** S0 CONDITIONAL PASS (D2's
`31/18/1.72×` FIG.01 numbers stay blocked, unrelated to S0-R05 which is
now resolved), S1 PASS, S2 CONDITIONAL PASS (S2-M06/"4단계" blocked),
S3 CONDITIONAL PASS (D1 blocked), S4 PASS, S4.5 CONDITIONAL PASS (2
items blocked), S5 PASS (re-verified live this iteration, `S5-M01`–`M05`
+ `M07` pass, `M06` correctly `BLOCKED_EVIDENCE`), S5.2/impact PASS
(HP01 Iter 9), S6/method PASS (HP01 Iter 10), **S7/conclusion PASS**
(HP01 Iter 11, `S7-M01`–`M07` all pass live on `localhost:3000` KO —
see LOOP_LOG).

**Next action:** P6 — final regression sweep across S0–S3 to confirm no
drift from this loop's changes (S4–S7 already individually re-verified
during their own iterations; S0–S3 haven't been re-touched since their
own iterations but should get one clean pass-through check before
calling the full loop closed).

**Still open, unresolved, does not block regression sweep:** `D8` (see
`docs/audit/DIRECTOR_DECISIONS.md`) — `AUDIT2/레퍼런스/기사_최종본.docx`
states corpus/ratio numbers (3,835,988 pairs, 1.33× median, 95th/99th
percentile 1.89×/2.25×, GPT-5/o200k_base) that contradict every value
D1 has frozen on the live site (69,432 pairs, 1.29×~1.83× range). Not
acted on; flagged to the Director as a research-content decision. S7's
conclusion was completed this iteration strictly within the current
D1-frozen numbers (preserved verbatim, `S7-M01` confirms) — if D8 is
later ruled to supersede those numbers, S7's three paragraphs (and
S3/S4/S4.5/S5.2's figures) would need a follow-up pass, tracked as a
new iteration at that point, not reopened speculatively now.

---

## L. Last Verified Commit / Deployment

- **PR #22 merged to `main`** (`de058bd`, Director-initiated merge) —
  contains HP01 Iterations 1-2 (S0 + S1, 9 directives). `main` and
  production are now in sync: build-hash comparison confirms
  `index-Bm1hS9NK.js` / `index-DcSxfIQ6.css` match exactly what
  `https://tokenization-premiun-koen-front.vercel.app/` serves.
  `MAIN_SHA` and `PRODUCTION_SHA` are now both `de058bd` — the
  `BASELINE_KIND=PRODUCTION_PROMOTED_HEAD` divergence noted in §B is
  resolved as of this merge.
- Continuing work: local branch `editorial/human-preview-01`
  fast-forwarded to `de058bd`; subsequent iterations (S2 onward) commit
  to the same branch name, opening a fresh PR once ready (the merged
  PR #22 is closed and cannot receive new commits as an open PR).
- **PR #28 merged to `main`** (`944b8a7`) — HP01 Iteration 9 (S5.2) +
  D8 discovery log. Build-hash comparison confirms `index-BVRpam2v.js`
  / `index-C-Oiiyrg.css` match exactly what
  `https://tokenization-premiun-koen-front.vercel.app/` serves.
  `editorial/human-preview-01` fast-forwarded to `944b8a7` cleanly (no
  divergence). Iteration 10 (S6) continues on the same branch.
