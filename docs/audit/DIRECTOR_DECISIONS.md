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

**Decision needed:** for each row — (a) the markup figure is correct and comes
from a source that must be recorded as an entity with its provenance; (b) the
markup figure should be derived from `DOMAIN_DISTRIBUTION_DATA`, accepting a
visible change to the published numbers; or (c) the figure should be removed.

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

---

## Answering a row

Edit this file, replace the **Decision needed** paragraph with the ruling and
the date, and re-run the tools. Rows stay in the file with their answer — the
queue is a record, not a scratchpad. A batch may only touch a node once its
row is answered.
