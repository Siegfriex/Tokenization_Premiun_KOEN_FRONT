# Director Decision Queue

Everything in this file is **frozen**. Until a row is answered, the node it
names must not be edited, re-derived, explained, or migrated — including as a
side effect of an unrelated batch.

No value below has been resolved. No replacement has been derived from entity
data. No explanation for any mismatch has been invented. Each row states only
two things: **what the markup renders**, and **what the repository holds**.

Cross-reference: [`NUMERIC_CLAIMS.md`](NUMERIC_CLAIMS.md) for the full rows,
[`TRACE_LEDGER.md`](TRACE_LEDGER.md) for their position in the document.

---

## D1 — S3 Token Premium: the section's summary figures do not agree with the section's own chart

**8 items · CRITICAL · blocks batches B1 and B4 for `TokenPremiumSection`**

`DOMAIN_DISTRIBUTION_DATA` (`src/entities/domain-distribution/content/domain-distribution.ts:10-53`)
is 6 entries with ratios **1.38, 1.45, 1.72, 1.75, 1.65, 1.13** — range
**1.13 – 1.75**, arithmetic mean **1.513**. It is marked PROTECTED research
content. The same widget renders a summary panel beside the chart that draws
from that array:

| Trace ID | Line | Markup renders | Repository holds |
|---|---|---|---|
| `PREM-011` | 72-76 | headline `1.29× ~ 1.83×` | ratio range is `1.13 – 1.75` |
| `PREM-017` | 82 | `Average Token Premium: 1.68× (+68%)` | mean of the 6 ratios is `1.513`; no entity holds `1.68` |
| `PREM-023` | 90 | `Domain Range: Business (1.44×) ~ Daily (1.83×)` | no domain named "Business" exists; `Colloquial / Daily` has ratio `1.38` |
| `PREM-032` | 121 | `7 Benchmark Domains` | the array has **6** entries |
| `PREM-039` | 179 | `Max Observed: 1.83×` | highest ratio is `1.75` (`public-municipal-web`) |
| `PREM-020` | 86 | `1.00× (Standard)` as an English baseline row | no baseline row exists in the array |
| `PREM-038` | 178 | `Baseline: 1.00× (English)` | as above |
| `PREM-002` `PREM-003` | 31, 37 | `69,432` pairs, in the section heading | no entity holds a corpus size |

**What is not being claimed here.** These figures may be correct and simply
sourced from something the repository does not contain — a full-corpus
statistic over 69,432 pairs is not the same population as six illustrative
domain rows, and `1.68` could be legitimate for the former. The defect being
reported is that **nothing in the codebase can tell a reader which**, and one
row (`7` vs `6`) is falsifiable by counting the cards on screen.

**RULED 2026-08-19 — option (a) for the primary result, option (c) for the
rest.** The Director transmitted KOEN-FRONT-S3-CANON-IMPL-v1.0 together with
KOEN-FRONT-CANON-LEDGER-v1.0 and instructed implementation. The ledger closes
the gap that made this row unanswerable: every primary-result value is now
pinned to an artifact path and SHA-256 prefix in the research repo at `925697c`,
with the arithmetic independently re-derived.

Disposition of the eight rows:

| Trace ID | Ruling |
|---|---|
| `PREM-002` `PREM-003` | (a) — `69,432` replaced by `3,835,988`, worded 문장쌍, from `NB08_RQ1_RESULTS_v001 @ 768a3bccc7d5d081` |
| `PREM-011` | (a) — the range `1.29× ~ 1.83×` replaced by the single canonical median `1.33×` = exp(median(log TP)) |
| `PREM-017` | (c) — `1.68× (+68%)` removed. Canonical mean log TP is `0.28518`, ratio scale `1.33`. No reading of the artifact yields 1.68 |
| `PREM-020` `PREM-038` | (c) — both English `1.00×` baseline rows removed. The ratio is defined against English, so the rows restated their own denominator |
| `PREM-023` | (c) — removed. "Business"/"Daily" name no domain in the research cohort, whose domains are dialogue / general / other / technology. Per-domain medians are BLOCKED_NO_ARTIFACT at `925697c` |
| `PREM-032` | (a) — `7 Benchmark Domains` replaced by the 4 cohort domains, read from `DOMAIN_COMPOSITION` rather than hardcoded |
| `PREM-039` | (c) — `Max Observed: 1.83×` removed. Canonical max is exp(3.6376) = 38.0, an outlier that misleads as a headline |

`DOMAIN_DISTRIBUTION_DATA` was deleted rather than corrected: its six labels and
per-sentence token counts have no counterpart in the research cohort, so there
was nothing to reconcile them against. Option (b) was therefore unavailable.

**Implemented in** `src/entities/rq1-canonical/` (new; every field carries a
non-optional `provenance`), `src/components/TokenPremiumSection.tsx` (rebuilt),
and `src/components/DecompositionSection.tsx` (new S2.5).

**Still open after this ruling.** Per-domain median TP and the 99.2%
technical-document figure remain `BLOCKED_NO_ARTIFACT` — they require a new
notebook cell and artifact, which is a research request, not a front-end task.
Absolute token-difference percentiles (+5 / +10 / +20 / +28), which the desk
manuscript states, are likewise unsourced in both the ledger and the EDA report.

---

## D2 — S0 Hero: the exhibit numbers match no sentence pair

**3 items · CRITICAL · blocks B1 and B4 for `NewsHeroSection`**

The hero's "REAL TOKEN SPLIT EXHIBIT" shows a Korean/English token comparison
with a ratio, presented as a real measurement.

| Trace ID | Line | Markup renders | Repository holds |
|---|---|---|---|
| `HERO-025` | 113 | `31 TOKENS` (Korean row) | no `CURATED_PAIRED_SENTENCES` entry has `hangulCount: 31`. `TOKEN_BASELINE_SIMULATION.baseKoPerPrompt` is `31` — a different quantity (per-prompt simulation baseline, not a sentence) |
| `HERO-029` | 130 | `18 TOKENS` (English row) | no entry pairs 31 with 18. `TOKEN_BASELINE_SIMULATION.baseEnPerPrompt` is `24` |
| `HERO-033` | 143 | `1.72× (+72% Difference)` | internally consistent with 31/18, but 31/18 is itself unsourced |

The exhibit also renders two truncated Korean/English sentences
(`HERO-026`, `HERO-030`) that appear in no entity.

**Decision needed:** is this exhibit a real measured pair that must be added to
`CURATED_PAIRED_SENTENCES` with its provenance, or an illustrative mock that
must be labelled as such?

---

## D3 — Values that agree today but are copied, not read

**2 items · HIGH · no visible change either way; ownership only**

| Trace ID | Widget | Line | Markup hardcodes | Entity that also holds it |
|---|---|---|---|---|
| `HERO-019` | NewsHeroSection | 90 | `+78% Hangul Token Burden` | `MULTILINGUAL_COMPARISON_DATA` `ko.differencePercent = 78` |
| `LANG-051` | MultilingualTokenEfficiencySection | 138-142 | `…대비 1.78배의 토큰이 소비됩니다.` (now bilingual — EN sibling literal added) | `ko.relativeRatio = 1.78` |

These are correct **right now**. They are in this queue because the markup owns
its own copy: if the entity is ever corrected, these do not move, and the
page will contradict itself silently.

**Decision needed:** confirm these may be rewired to read from the entity in
B4. This is the one queue item that is probably a simple yes — but rewiring
research figures is not a call this role makes unilaterally.

**Resolved (visual QA loop, 2026-08-17):** the third item, formerly ID
LANG-032 (legend text hardcoding `한국어 한글 (1.78×)`), was rewired as a
byproduct of fixing the chart's color-encoding bug (the legend's highlighted
entry now tracks `selectedLangId` instead of being permanently pinned to
Korean). Its label and ratio are now read directly from `selectedItem.name` /
`selectedItem.relativeRatio` — i.e. from `MULTILINGUAL_COMPARISON_DATA` — so
no literal copy remains at that node (see `LANG-010`, the now-structural
legend container; the old ID is retired, not reassigned). No entity value or
research figure was touched; this was a rendering-logic fix, not a Director
ruling on D3.

---

## D4 — Unsourced quantities in supporting copy

**4 items · HIGH**

| Trace ID | Widget | Line | Markup renders | Note |
|---|---|---|---|---|
| `BURD-017` | OccupationSection | 121 | `1,000회 (팀 일간 워크플로우)` | slider tick label; characterises a workload, no entity holds it |
| `BURD-018` | OccupationSection | 122 | `2,000회 (전사 에이전트 루틴)` | as above; also the slider `max` |
| `LANG-053` | MultilingualTokenEfficiencySection | 276 | `라틴 알파벳 기준 (1.00×)` (now bilingual — EN sibling literal added) | chart legend; no baseline row exists in `MULTILINGUAL_COMPARISON_DATA` |
| `PREM-002` `PREM-003` | TokenPremiumSection | 31, 37 | `69,432` | see D1 |
| `METH-008` | MethodSection | 72 | `6 Key Principles` | equals `WHAT_WE_DO_NOT_CLAIM.length` (6) **today**, but is hardcoded, not read. Reclassified from COUNT_VERIFIED to UNLINKED: a coincidence is not a link, and it will drift silently the moment the array changes |

**Decision needed:** are these editorial characterisations (fine to keep, but
should be entity-owned copy) or research quantities (need provenance)?

---

### METH-008 — closed 2026-08-19 (partial answer to D4)

`MethodSection` rendered a literal "6가지 경계" beside a `WHAT_WE_DO_NOT_CLAIM`
array that happened to hold six entries. It now reads
`WHAT_WE_DO_NOT_CLAIM.length`, so the two cannot drift apart.

The array is no longer six. KOEN-FRONT-S3-CANON-IMPL-v1.0 §7 directs that the
site's boundary section mirror the RQ1 artifact's own prohibited list rather
than restate it editorially, and three boundaries on that list had no
counterpart on the site: Korean being intrinsically inefficient, morphology as
a cause, and any domain-effect claim. The third was not hypothetical — S3
previously published per-domain ratios, which the cohort's structure cannot
support. All nine now render.

The remaining D4 rows (`LANG-031`, `BURD-017`, `BURD-018`) are untouched.

---

## D5 — Structural claim: the header advertises 9 sections, the page has 10

**1 item · MEDIUM · pre-existing, previously logged in `HANDOFF.md` §6.6**

`NAV_SECTIONS` has 9 entries; `App.tsx` mounts 10 anchored sections.
`id="infrastructure"` (S5 Korea AI Infrastructure) has no nav entry and cannot
be reached from the header.

**RULING (2026-08-17):** add the entry. Inserted `{ id: 'infrastructure',
label: { ko: 'S5. AI 인프라', en: 'S5. Infra' } }` between `languages` and
`impact` in `NAV_SECTIONS`, and relabeled the existing `impact` entry from
`S5.` to `S5.2.` to match the section numbering already established in
`App.tsx`'s own inline comments (`S5. Korea's Expanding AI Infrastructure` /
`S5.2. Socioeconomic Implications`) — not invented, just made consistent with
what the codebase already asserted elsewhere. `NAV_SECTION_IDS` (derived) now
has 10 entries, matching the 10 rendered sections.

---

## D6 — Deferred, non-numeric, previously logged

Carried forward unchanged so this file is the single queue:

| Item | Source |
|---|---|
| 12 stale `headline` fields in `entities/article-content` that differ from what widgets render | `HANDOFF.md` §6.4 |
| Macro Adoption's 4 cards are not bilingual — `name` hardcoded EN, `description` hardcoded KO | `HANDOFF.md` §6.5 · `INFRA-*` |
| `MultilingualSection.tsx` — 417 lines, not imported, 57 tracked nodes | `HANDOFF.md` §6.7 · batch B6 |
| ~~4 unused dependencies~~ **RESOLVED (2026-08-17)** — `@google/genai`, `express`, `dotenv`, `motion`, `@types/express` removed from `package.json`; `npm install` re-run, 125 packages removed, 0 vulnerabilities; `npm run build`/`npm run lint` re-verified clean | `HANDOFF.md` §6.8 |
| `--color-surface` is identical to `--color-canvas`, so cards are indistinguishable from the page | `DESIGN_SYSTEM_CONTRACT.md` |
| `chartTokens.rule` `#DADAD6` vs `--color-rule` `#DCE7F7` | `chart-tokens.ts` |

---

## D7 — New this phase: `docs/` is contributing utilities to the production CSS

**MEDIUM · found while verifying that this audit changed nothing**

Tailwind v4 scans every file it can see as a potential template. The prose docs
quote class strings verbatim (`DESIGN_AUDIT.md`, `COLOR_HACK_FINDING.md`, the
contracts), so the scanner generates real utilities from them and ships them to
users.

Measured: excluding all of `docs/` from the scan drops the production CSS from
**46.32 kB to 44.65 kB** — roughly **1.7 kB of utilities that no rendered
element uses**.

This phase added `@source not "../docs/audit"` to `src/index.css`, scoped
deliberately to the audit output only, so that the trace system cannot inflate
the bundle it is observing. With that scope the build is byte-identical to
`main` (`index-BEroIHAS.css`, `index-CWpbMABb.js`).

**Decision needed:** widen the exclusion to all of `docs/`. It is a one-line
change that removes ~1.7 kB of unused CSS, but it *is* a production artefact
change, and this phase is supposed to be inert — so it is not made here.
Small residual risk to check first: a utility reachable only through a dynamic
class expression that Tailwind cannot see statically, which the docs happened
to be keeping alive.

---

---

## D8 — New reference material (`AUDIT2/레퍼런스/`) states corpus/ratio numbers that contradict every PROTECTED value currently frozen by D1

**CRITICAL · discovered 2026-08-18 while hashing Human Preview 01 source material · blocks nothing yet, resolves nothing yet**

Three files appeared, untracked, in `AUDIT2/레퍼런스/` alongside the annotated
Human Preview screenshots (same acquisition batch per directory mtime).
Extracted via `unzip` + regex on `word/document.xml` (Read tool cannot open
`.docx`/`.xlsx` directly):

| File | SHA-256 |
|---|---|
| `기사_최종본.docx` | `6f5555656dee93a43932fa3be33f76efa008032b935cfea186b84035a01e705e` |
| `기사용_언어별_Token_Premium_선행연구_요약.docx` | `3c83050a493ae2e7a8c3f62394624483135d9279ad88eebd2637c7cf2b77d189` |
| `cl100k_base tokenizer(국가별).xlsx` | `8b08f9552920bcff2358d17ac3b1f6d0f460c74afd9dedc31759ffaa57609d32` |

**`기사_최종본.docx` ("article final draft", 4,493 characters, opens with the
same headline framing as the live S0 hero — "같은 질문, 다른 청구서" — so this
reads as a candidate replacement/successor draft of the live article, not an
unrelated document).** It states, as the analysis's own headline numbers:

| Item | This document states | Repository / live site currently holds (frozen by D1) |
|---|---|---|
| Corpus size | **3,835,988** paired sentences ("전수 분석", i.e. full-corpus, not a sample) | `69,432` (S3 heading, `PREM-002`/`PREM-003`) |
| Central ratio | median **1.33×** | headline range `1.29× ~ 1.83×`; mean `1.68`/`1.513` (disputed, see D1) |
| Majority-share stat | **87.99%** (~88%) of pairs use more Korean tokens | not present in any entity |
| Tail percentiles | 95th percentile **1.89×**, 99th percentile **2.25×** | not present in any entity — current site has no percentile framing at all |
| Tokenizer | **GPT-5 (o200k_base)** | entities/components reference `cl100k_base` in places (see S4.5/D-adjacent material) and no entity names `GPT-5` |
| Framing device | fixed-budget normalization (English=100 → Korean median≈75, p95≈53, p99≈44) | not present anywhere on the live site |

The document also carries explicit epistemic guardrails in its own prose —
"이 숫자가 '한국어 사용자가 실제로 25% 더 적게 쓴다'는 뜻은 아니다", "아직
'한국어 사용자가 사회적으로 AI 접근에서 불이익을 받고 있다'는 결론까지 측정한
것은 아니다" — i.e. it is careful not to overclaim causally, in the same spirit
as this project's existing RED/BLUE and non-causal-framing rules
(`HP01-S52-R02/R03`).

**`기사용_언어별_Token_Premium_선행연구_요약.docx`** was already checked this
session and found to be the Flores/Petrov citation this project had logged as
`BLOCKED_EVIDENCE` under `HP01-S45-B02` (Petrov, La Malfa, Torr & Bibi, 2023,
NeurIPS 2023, cl100k_base, FLORES-200 — English=1.00, Chinese=1.91×,
Korean=2.38×, Russian=2.49×, Arabic=3.04×; no Hindi, no 12-language claim).
That finding stands and now has a locatable, hashed source — it resolves the
sourcing half of `HP01-S45-B02` without changing any number already on the
site.

**`cl100k_base tokenizer(국가별).xlsx`** — opened only far enough to confirm
structure (worksheet + embedded images/drawings), not yet read for data
content.

**What is not being claimed here.** Nothing indicates *which* number is
correct. `기사_최종본.docx` reads as a later, larger-scale re-run (full corpus
vs. a 69,432-pair sample; percentile framing vs. domain-range framing;
GPT-5/o200k_base vs. whatever produced the current site's `1.13–1.75` domain
array) — but that is a plausible read, not a verified one. It is equally
possible this document predates the site, targets a different analysis scope,
or was never meant to ship verbatim.

**Why this is not being acted on unilaterally.** Every protected-content rule
this project operates under — the D1 freeze above, the Human Preview 01
"RESEARCH_CHANGE_RELEVANCE=NONE" / no-auto-sync rule, and this whole session's
standing constraint — exists specifically to stop a newly-appeared document
from silently overwriting frozen numeric claims. A 3,835,988 vs. 69,432 pair
count is not a copyedit; treating this file as authoritative would mean
rewriting the corpus size, the headline ratio, the percentile claims, and
likely the domain-distribution chart across every slide that touches Token
Premium (S3, S4, S4.5, S5.2, S7) — that is a research-content decision, not a
Human Preview visual-redline decision, and it is explicitly out of scope for
what this loop is authorized to do on its own.

**Decision needed:** is `기사_최종본.docx` the new canonical source text/data
for this article (superseding the current `entities/article-content.ts`
figures and unblocking D1 in its favor), a draft to be reconciled with the
current corpus, or unrelated to what should ship? Until ruled, D1 stays frozen
exactly as-is and no code in this loop will be changed to match either set of
numbers.

**Update (2026-08-18, same day, HP01 Iteration 12):** the Director
directly dictated new S4.5 copy in chat that names "우리 연구" (our
study) as "약 384만 한-영 대응쌍" / "1.33배" — i.e., using D8's
`기사_최종본.docx` figures as fact, in the Director's own words, not
as a file discovered by the agent. That text was implemented verbatim
in exactly one new location: `FLORES_CITATION_NOTE.cautionText` in
`entities/flores-citation/content/flores-citation.ts`, a new
supplementary exhibit inside `MultilingualTokenEfficiencySection.tsx`
(S4.5) comparing against the Petrov et al. citation. **This is not
being treated as a ruling on D1.** `TokenPremiumSection.tsx` (S3),
`domain-distribution.ts`, and every other place `69,432` /
`1.29×~1.83×` appear are untouched — D1 remains frozen exactly as
before. The site now visibly states two different corpus sizes in two
different places (S3: 69,432 / S4.5's new paragraph: ~3.84M) until D1
is explicitly ruled one way or the other. Flagged to the Director in
the same turn this was implemented, not silently smoothed over.

---

## D9 — `AUDIT2/data_val/WEBAPP.docx`: a full editorial-content contract, self-described as advisory, effectively proposing to resolve D8 by rewriting most of the site's protected copy

**CRITICAL · discovered 2026-08-18, same session as D8 · a proposal, not a ruling · nothing implemented from it**

A second new untracked file appeared (`AUDIT2/data_val/WEBAPP.docx`,
SHA-256 `e52bc314fb5c792152cbffc163fd6d83c7fabe208370ccb19fb3373d83ca99a5`,
logged in the source manifest), extracted the same way as the other
`.docx` files (unzip + regex on `word/document.xml`, 18,538 characters).
It identifies itself explicitly:

> Document: WEBAPP.md · Status: INDEPENDENT_EDITORIAL_DRAFT /
> READ-ONLY_RESEARCH_AUDIT · Repository write policy: NO GIT WRITE / NO
> BRANCH CHECKOUT / NO MERGE / NO VERCEL ACTION · This document is
> produced outside the working repositories. It is an editorial/content
> contract only... D8 is a FRONT governance decision, not permission
> for this independent artifact to write into the repository.

It appears to originate from whoever runs the **research-side repo**
(`Siegfriex/Tokenization_Premiun_KOEN`, referenced at commit
`6368687c3def9786ad886d3c4886862403e22dd1`) and explicitly cross-checks
against this FRONT repo's own state — it names this session's exact
recent work (the S4.5 redesign, the S5.2 causal-chain reframing, and
**this file's own D8 discovery**) and cites this repo's `main` at
`944b8a73b373ee9122af94e0225bbcfd5e55f910` (the commit produced by PR
#28, before this session's PR #29 merge). It is timestamped the same
day. **This is a document meant to be read by an implementation agent
— it is not, on its own, Director authorization to act.**

**What it contains (summary — full text is 18.5k characters, quoted
selectively):**

1. **A formal evidence-class ledger** distinguishing what can currently
   be published: `CLOSED_PRIMARY` (RQ1 — N=3,835,988 pairs, median TP
   = 1.3333×, TP>1 in 87.985%, TP=1 in 5.128%, TP<1 in 6.887%),
   `PERSISTED_DESCRIPTIVE` (NB07 branch results — exact CR×BDR×CP
   decomposition, 87.6884% "representation reversal" where Korean has
   *fewer* codepoints but *more* tokens, KO/EN regex-chunk and
   token-per-chunk statistics), `EXTERNAL_PRIOR_STUDY` (the Petrov et
   al. citation — same 5 values already used in this session's
   Iteration 12 S4.5 exhibit), `ARITHMETIC_SCENARIO`,
   `BLOCKED_MODEL_RESULT` (NB09/RQ3-RQ5 — explicitly not ready),
   `BLOCKED_SERVICE_EVIDENCE` (real pricing/limits — explicitly not
   ready).
2. **An explicit forbidden-claims list**, regardless of future NB09
   results: "Korean is intrinsically inefficient for AI", "UTF-8 3
   bytes means 3x tokens", "Token Premium causes reasoning
   degradation", "a fixed Token Premium means every API or subscription
   bill increases by the same percentage" — useful guardrails
   independent of whether D8/D9 are ever acted on.
3. **A full slide-by-slide recommended rewrite (§4)** for all of
   S0–S7 — new headlines, new hero numbers (`3.836M / 1.33x / 87.99% /
   87.69%`), and explicit instructions to **stop using the numbers this
   repo currently has frozen**: *"Do not restore old unsourced: 31 / 18
   / 1.72x hero specimen... 69,432... 1.68 average... 1.29-1.83 global
   range."* This directly targets D1 and D2, not just D8.
4. **A claim-replacement table (§8)** mapping specific current-copy
   phrases to proposed replacements (e.g. `"GPT-5(o200k_base)로 계산"`
   → `"o200k_base 토크나이저로 측정"`; `"한국어 형태소 구조 때문에"` →
   `"형태소는 현재 설명 후보이며 NB09 결과 전 원인으로 확정하지
   않음"`), explicitly headed *"these are editorial change requests
   only; this document does not modify Git."*
5. **A comparative evaluation of the two D8 `.docx` files** —
   recommends using `기사_최종본.docx` for narrative architecture but
   NOT as the "fact ledger" (flags it still contains unreconciled
   95th/99th-percentile values and pricing calculations, and says it
   incorrectly implies "GPT-5" is the research instrument rather than
   the tokenizer); recommends using the Petrov summary doc as a
   contextual module only. This is a more granular position than D8's
   binary framing.
6. **Publication gates (§9)**: Gate A ("publishable now" — RQ1 numbers,
   NB07 descriptive results with branch status disclosed, the Petrov
   comparison, the arithmetic scenario), Gate B ("wait for NB09" — any
   morphology/regex-mechanism incremental-effect claim), Gate C ("wait
   for service evidence" — real pricing/limits/latency).

**What was NOT done in response to this file:** no code changed. The
already-in-progress S4.5 Petrov exhibit (Iteration 12, authorized
separately by the Director's own live chat instruction) was completed
and happens to align with what this document independently recommends
for S4.5 — that is corroboration, not this document's authority being
exercised. Nothing else in §4's slide-by-slide rewrite, §8's claim
table, or the hero-number replacement was implemented.

**Why this is not being acted on unilaterally.** The document is
explicit about its own scope — an advisory contract, not a git-write
action, with the actual decision left to "FRONT governance." Even
setting that self-description aside, the scale is the same class of
decision as D8 itself, just far more specific and far larger:
implementing §4/§8 in full would rewrite the hero numbers, S3's entire
primary-result framing, remove/replace the domain-distribution exhibit,
add new NB07-derived exhibits (representation reversal, CR×BDR×CP
decomposition, regex-chunk paradox) that do not exist anywhere in this
repo's current entities, and change the article's central metric from
a range (`1.29×~1.83×`) to a single median (`1.33×`) throughout. That
is a full research-content and information-architecture decision, not
something available to this loop's own authority regardless of how
well-organized the proposal is.

**Decision needed:** does the Director want this WEBAPP.docx contract
implemented — in full, in the "Gate A" subset it itself proposes as
safe, or not at all? If yes, this is large enough to warrant its own
planned, sequenced pass (likely slide-by-slide, same discipline as the
Human Preview 01 loop) rather than an ad hoc autonomous rewrite. Until
ruled, D1 and D2 both stay frozen exactly as-is, and no new NB07/RQ1
exhibit from this document ships.

## Answering a row

Edit this file, replace the **Decision needed** paragraph with the ruling and
the date, and re-run the tools. Rows stay in the file with their answer — the
queue is a record, not a scratchpad. A batch may only touch a node once its
row is answered.
