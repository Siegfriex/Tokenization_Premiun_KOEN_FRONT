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
| `PREM-010` | 72-76 | headline `1.29× ~ 1.83×` | ratio range is `1.13 – 1.75` |
| `PREM-016` | 82 | `Average Token Premium: 1.68× (+68%)` | mean of the 6 ratios is `1.513`; no entity holds `1.68` |
| `PREM-022` | 90 | `Domain Range: Business (1.44×) ~ Daily (1.83×)` | no domain named "Business" exists; `Colloquial / Daily` has ratio `1.38` |
| `PREM-028` | 121 | `7 Benchmark Domains` | the array has **6** entries |
| `PREM-041` | 179 | `Max Observed: 1.83×` | highest ratio is `1.75` (`public-municipal-web`) |
| `PREM-019` | 86 | `1.00× (Standard)` as an English baseline row | no baseline row exists in the array |
| `PREM-040` | 178 | `Baseline: 1.00× (English)` | as above |
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
| `HERO-020` | 113 | `31 TOKENS` (Korean row) | no `CURATED_PAIRED_SENTENCES` entry has `hangulCount: 31`. `TOKEN_BASELINE_SIMULATION.baseKoPerPrompt` is `31` — a different quantity (per-prompt simulation baseline, not a sentence) |
| `HERO-024` | 130 | `18 TOKENS` (English row) | no entry pairs 31 with 18. `TOKEN_BASELINE_SIMULATION.baseEnPerPrompt` is `24` |
| `HERO-028` | 143 | `1.72× (+72% Difference)` | internally consistent with 31/18, but 31/18 is itself unsourced |

The exhibit also renders two truncated Korean/English sentences
(`HERO-021`, `HERO-025`) that appear in no entity.

**Decision needed:** is this exhibit a real measured pair that must be added to
`CURATED_PAIRED_SENTENCES` with its provenance, or an illustrative mock that
must be labelled as such?

---

## D3 — Values that agree today but are copied, not read

**3 items · HIGH · no visible change either way; ownership only**

| Trace ID | Widget | Line | Markup hardcodes | Entity that also holds it |
|---|---|---|---|---|
| `HERO-014` | NewsHeroSection | 90 | `+78% Hangul Token Burden` | `MULTILINGUAL_COMPARISON_DATA` `ko.differencePercent = 78` |
| `LANG-019` | MultilingualTokenEfficiencySection | 139-141 | `…대비 1.78배의 토큰이 소비됩니다.` | `ko.relativeRatio = 1.78` |
| `LANG-029` | MultilingualTokenEfficiencySection | 275 | `한국어 한글 (1.78×)` | `ko.relativeRatio = 1.78` |

These are correct **right now**. They are in this queue because the markup owns
its own copy: if the entity is ever corrected, these three do not move, and the
page will contradict itself silently.

**Decision needed:** confirm these may be rewired to read from the entity in
B4. This is the one queue item that is probably a simple yes — but rewiring
research figures is not a call this role makes unilaterally.

---

## D4 — Unsourced quantities in supporting copy

**4 items · HIGH**

| Trace ID | Widget | Line | Markup renders | Note |
|---|---|---|---|---|
| `BURD-014` | OccupationSection | 121 | `1,000회 (팀 일간 워크플로우)` | slider tick label; characterises a workload, no entity holds it |
| `BURD-015` | OccupationSection | 122 | `2,000회 (전사 에이전트 루틴)` | as above; also the slider `max` |
| `LANG-028` | MultilingualTokenEfficiencySection | 271 | `라틴 알파벳 기준 (1.00×)` | chart legend; no baseline row exists in `MULTILINGUAL_COMPARISON_DATA` |
| `PREM-002/003` | TokenPremiumSection | 31, 37 | `69,432` | see D1 |
| `METH-008` | MethodSection | 72 | `6 Key Principles` | equals `WHAT_WE_DO_NOT_CLAIM.length` (6) **today**, but is hardcoded, not read. Reclassified from COUNT_VERIFIED to UNLINKED: a coincidence is not a link, and it will drift silently the moment the array changes |

**Decision needed:** are these editorial characterisations (fine to keep, but
should be entity-owned copy) or research quantities (need provenance)?

---

## D5 — Structural claim: the header advertises 9 sections, the page has 10

**1 item · MEDIUM · pre-existing, previously logged in `HANDOFF.md` §6.6**

`NAV_SECTIONS` has 9 entries; `App.tsx` mounts 10 anchored sections.
`id="infrastructure"` (S5 Korea AI Infrastructure) has no nav entry and cannot
be reached from the header.

**Decision needed:** add the entry, or confirm the omission is intentional.
Not actioned here — it changes what the site tells a reader exists.

---

## D6 — Deferred, non-numeric, previously logged

Carried forward unchanged so this file is the single queue:

| Item | Source |
|---|---|
| 12 stale `headline` fields in `entities/article-content` that differ from what widgets render | `HANDOFF.md` §6.4 |
| Macro Adoption's 4 cards are not bilingual — `name` hardcoded EN, `description` hardcoded KO | `HANDOFF.md` §6.5 · `INFRA-*` |
| `MultilingualSection.tsx` — 417 lines, not imported, 57 tracked nodes | `HANDOFF.md` §6.7 · batch B6 |
| 4 unused dependencies | `HANDOFF.md` §6.8 |
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

## Answering a row

Edit this file, replace the **Decision needed** paragraph with the ruling and
the date, and re-run the tools. Rows stay in the file with their answer — the
queue is a record, not a scratchpad. A batch may only touch a node once its
row is answered.
