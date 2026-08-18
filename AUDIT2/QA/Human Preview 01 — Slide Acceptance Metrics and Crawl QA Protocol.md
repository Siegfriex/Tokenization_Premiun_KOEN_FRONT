# Human Preview 01 — Slide Acceptance Metrics and Crawl QA Protocol

**Document ID:** `KOEN-FRONT-HP01-ACCEPTANCE-v1.0`

**Status:** ACTIVE — local-agent completion metrics and Director crawl-verification protocol

**Prepared:** 2026-08-18 KST

**Applies to:** [`Siegfriex/Tokenization_Premiun_KOEN_FRONT`](https://github.com/Siegfriex/Tokenization_Premiun_KOEN_FRONT), beginning at approved baseline `8d0a64c` or an approved descendant
**Companion directive:** [`HUMAN_PREVIEW_01_TARGETING_MASTER_v1.0.md`](./HUMAN_PREVIEW_01_TARGETING_MASTER_v1.0.md)

> **Rule of use.** A local agent does not “complete a slide” because it changed JSX, received a build exit code, or produced an attractive screenshot. A slide is accepted only when its **mandatory DOM/behavior/evidence gates** pass and its post-deploy crawl meets the applicable Korean-first editorial rubric. A blocked research or evidence item is never scored as completed; it is explicitly reported as `BLOCKED_CONTENT_AUTHORITY` or `BLOCKED_EVIDENCE`.

This document measures **front-end editorial execution** only. It neither validates the underlying Tokenization Premium research nor changes the project’s research gates. In particular, D1/S3 and D2/S0 remain protected content decisions rather than layout defects.[1]

---

## A. Measurement Model

### A.1 Four evidence levels

| Level | Name | Minimum proof | Does it establish acceptance? |
|---:|---|---|---|
| E0 | Assertion only | Agent says work is done | **No.** |
| E1 | Local implementation | Source diff exists | **No.** |
| E2 | Local verification | Lint/build plus named local DOM/behavior test output | **No; provisional only.** |
| E3 | Deployed DOM verification | Named production/preview URL, root and child selector evidence, observed rendered text/controls | **No; needs editorial review.** |
| E4 | Crawl acceptance | E3 plus interaction results, negative checks, preserved controls, visual rubric, trace artifact and commit SHA | **Yes, subject to blocked-state wording.** |

A claimed full completion without E4 is rejected. A correct `BLOCKED_*` result may achieve **editorial conditional acceptance** for the work actually permitted, but can never be labelled full directive closure.

### A.2 Gate-first rule

A score is diagnostic; it cannot override a failed hard gate. Each slide has the following gates.

| Gate | Requirement | Failure example |
|---|---|---|
| G-ROOT | Exactly one verified section root and only allowed files/component boundary changed | A S4 redline edits `App.tsx` or S5.2 instead of `OccupationSection.tsx`. |
| G-RED | Every in-scope RED removal/rewrite has a positive check and a negative absence check | The struck-out phrase remains in hidden desktop/mobile markup. |
| G-PRESERVE | Required controls, source captions, and protected nodes remain present and usable | S4 removes occupation cards but also removes the slider; S7 deletes the back-to-top button. |
| G-DEPTH | KO 1DEPTH is article-first; technical detail is hidden in approved 2DEPTH only when directed | S2 restores Transformer terminology as a prominent card heading. |
| G-EVIDENCE | No protected numeric, source, tokenizer, or causal claim is invented, altered, or falsely “resolved” | S3 changes `1.68×` to a computed number without a Director ruling. |
| G-TRACE | Agent provides commit SHA, exact selectors, test output, diff scope, and remaining blocks | “Fixed S4” with a screenshot but no reproducible evidence. |

**Slide verdicts** use the following strict rule:

| Verdict | Rule |
|---|---|
| `PASS` | All applicable gates pass; visual rubric is at least 7/8; no critical blocker is silently omitted. |
| `CONDITIONAL PASS` | All permitted editorial gates pass, but a clearly recorded `BLOCKED_*` item remains. |
| `FAIL` | Any mandatory gate fails, any preserved control breaks, a protected value changes, or prohibited content remains. |
| `NOT VERIFIABLE` | URL, commit, selector evidence, local test artifact, or required interaction surface is unavailable. |

### A.3 Visual editorial rubric — browser-crawl assessment

After hard gates pass, the reviewer scores the anchored section in Korean mode. Each dimension is **0, 1, or 2**. A score below 7/8 or a zero on V1/V3 is a failure.

| ID | Dimension | 0 | 1 | 2 |
|---|---|---|---|---|
| V1 | One main claim | Multiple competing headings/cards; no clear Korean thesis | Thesis exists but competes with dashboard chrome | One Korean headline/lead clearly frames the section |
| V2 | One main visual | No visual hierarchy or a blank shell | Main visual exists but competes with unrelated panels | One central visual/interaction directly supports the claim |
| V3 | Article-first depth | Technical English/dashboard language dominates first read | Mixed 1DEPTH/2DEPTH treatment | Korean article flow dominates; technical detail is disclosure/glossary/source depth |
| V4 | Editorial restraint | Card proliferation, causal overclaim, or AI-generated prose remains prominent | Some reduction but residual friction | Plain Korean, restrained claims, no distracting speculative extension |

The visual rubric is intentionally **not** a pixel-match score. It checks the Director’s stated goal: a Korean-first data-journalism article, not a redesigned dashboard that happens to resemble a screenshot.

---

## B. Slide-Level Acceptance Metrics

The selector column is the fixed crawl entry point. “Count” means the deployed DOM count from the specified root. “Absent” means a text/selector search must return zero visible or hidden rendered matches inside that root unless the row is explicitly blocked/protected.

### S0 — Cover / Intro (`#hero`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S0-M01 | Root integrity | `section#hero[data-widget="NewsHeroSection"]` | Count = 1 | Mandatory |
| S0-M02 | Historic dashboard-ribbon removal persists | Search hero for `ANALYSIS TARGET`, `CORE METRIC`, `OBSERVED GAP`, and `COVER & CORE THESIS` | All absent | Mandatory regression gate |
| S0-M03 | Koreanized evidence-card header persists | Read FIG.01 card header | `실제 토큰 분절 비교` and `문장쌍 비교` present; `REAL TOKEN SPLIT EXHIBIT` absent in KO mode | Mandatory regression gate |
| S0-M04 | Big finding remains visually subordinate to H1 | Anchor screenshot/rubric | No oversized stacked numeric block competing with H1; V1/V2 ≥ 1 | Crawl rubric |
| S0-M05 | Deferred S0-R05 is handled only with S7 | Check named hooks or hero lower FIG.01/context blocks after S7 work | No unapproved copy move; no new conclusion claim | Conditional until cross-slide work |
| S0-M06 | D2 protection | Read hero exhibit values/sentences and compare against approved baseline | `31`, `18`, `1.72×` and exhibit sentence treatment unchanged unless a dated D2 ruling is supplied | Hard evidence gate |

**S0 verdict now:** regression may be `PASS`; full HP01 closure remains `CONDITIONAL PASS` until the explicitly deferred S0-R05/S7 handoff is verified.

### S1 — Paired Sentence Comparison (`#compare`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S1-M01 | Root and pair-selector integrity | `#compare`, `[data-collection="curated-paired-sentences"] button` | Root = 1; selectable pair controls = 4 | Mandatory |
| S1-M02 | Pair interaction works | Activate Pair 01 and Pair 04; compare displayed sentence/tokens | Selected state and both language panels update; no exception/blank state | Mandatory preserve gate |
| S1-M03 | Korean column headers are editorial, not script-dashboard labels | KO root text search | `HANGUL SCRIPT` and `LATIN SCRIPT` absent; `한국어` and `영어` present | Mandatory regression gate |
| S1-M04 | Observation line retains approved Korean wording | Root text after any pair change | `토큰 비율` appears; imperative/AI-slogan wording does not reappear | Mandatory regression gate |
| S1-M05 | Figure source preserved | `[data-role="figure-caption"]` | Non-empty figure caption and source line | Mandatory preserve gate |

**S1 verdict now:** `PASS` only after the four-control interaction and caption checks are re-run on the cited deployment; a static screenshot alone is insufficient.

### S2 — Token Pipeline (`#pipeline`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S2-M01 | Five-step interaction remains intact | `[data-collection="pipeline-steps"] button` | Count = 5; every step can be selected | Mandatory |
| S2-M02 | Removed decorative chrome stays absent | Search root for `TRANSFORMER PIPELINE SEQUENCING`, `THE BOTTLENECK`, `GAP ORIGIN` | All absent | Mandatory regression gate |
| S2-M03 | Technical detail is 2DEPTH | `#pipeline details`, then inspect initial/open state | Exactly 1 disclosure, closed at initial render; opening it reveals technical process detail | Mandatory depth gate |
| S2-M04 | Figure caption/source treatment | `[data-role="figure-caption"]` | Caption includes `문장이 토큰으로 바뀌는 과정`; source is non-empty | Mandatory |
| S2-M05 | One central visual wins first read | Screenshot/rubric | V1–V3 ≥ 1 and V2 = 2; no restored competing technical badge | Mandatory visual gate |
| S2-M06 | Four-stage/five-step conflict remains honest | Read headline/copy and step count | No unilateral claim that the five controls are “four stages”; report `BLOCKED_CONTENT_AUTHORITY` until ruling | Conditional blocker |

**S2 verdict now:** `CONDITIONAL PASS` while S2-M06 remains blocked; the implemented editorial work can pass independently.

### S3 — Core Token Premium Result (`#patterns`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S3-M01 | Root/figure/distribution scope | Root, `[data-role="figure"]`, `[data-collection="domain-distribution"]` | Root = 1; figure = 1; visible distribution rows = 6 | Mandatory |
| S3-M02 | Korean-first label regression | Search the three core label locations | `핵심 실측 지표`, `관측된 토큰 프리미엄 비율`, `산출 공식`, `도메인별 분포` present in KO mode; historical all-caps English labels absent | Mandatory |
| S3-M03 | Definition precedes/backs the result | Inspect formula panel and figure order | Formula is visible in the section without requiring a new research explanation | Mandatory depth gate |
| S3-M04 | Domain selection behavior | Activate at least two domain rows | Selected row changes without loss of ratio/bar display | Mandatory preserve gate |
| S3-M05 | D1 frozen-value integrity | Record visible range, average, benchmark-domain label, baseline/max display and 69,432 heading | No change from approved current rendering unless an explicit D1 resolution is included in the evidence packet | Hard evidence gate |
| S3-M06 | No synthetic provenance | Read source/caption and new explanatory text | No new source, explanation, or number presented as proof for D1 mismatch | Mandatory |

**S3 verdict now:** `CONDITIONAL PASS`; its language work is complete, but D1 cannot be closed by front-end work.

### S4 — Accumulated Burden (`#burden`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S4-M01 | Root and simulator control count | Root; `[data-collection="iteration-presets"] button`; `input[type="range"]` | Root = 1; preset buttons = 5; range inputs = 1 | Mandatory |
| S4-M02 | Simulator remains functional | Select 10×, 100×, 1,000×; move range once where supported | Active state/value and Korean/English totals/receipt update coherently; never blank or stale | Mandatory preserve gate |
| S4-M03 | Occupation-comparison removal is precise | Add/use `data-hp01-id="occupation-comparison"`; search root text/collections | Wrapper count = 0 after removal; `engineering-occupations` and `socialscience-occupations` absent; simulator remains | Mandatory RED gate |
| S4-M04 | Unsourced workload labels removed | Search root for `팀 일간 워크플로우`, `전사 에이전트 루틴` | Both absent | Mandatory RED gate |
| S4-M05 | Linear, not exponential, framing | Search root for `기하급수` and inspect closing copy | `기하급수` absent; copy describes accumulation without causal/exponential overstatement | Mandatory claim gate |
| S4-M06 | Korean-first simulator labels | Inspect first viewport and receipt | Primary title/labels are Korean; `TOKEN GAP`, `ACCUMULATED BURDEN GAP`, `WORKFLOW REPETITION SIMULATOR` do not dominate KO 1DEPTH | Mandatory depth gate |
| S4-M07 | Pricing expansion does not fabricate evidence | Inspect controls/text and agent artifact | No price/unit-cost numeric input or total is presented without a cited data source and Director approval | Conditional blocker, not a failure when correctly absent |
| S4-M08 | Single-interaction focus | Screenshot/rubric | Simulator is the section’s one central visual/interaction; V2 = 2 | Mandatory visual gate |

**S4 completion condition:** S4-M01–M06 and M08 must pass. S4-M07 must be reported as `BLOCKED_EVIDENCE` unless its separate evidence/approval package exists.

### S4.5 — Multilingual Comparison (`#languages`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S45-M01 | Root and future visual hook integrity | Root; `data-hp01-id="language-focus"`, `language-comparison-chart`, `language-closing-claim` when added | Root = 1; each required replacement hook = 1 | Mandatory instrumentation/structure gate |
| S45-M02 | No unsupported scale claim | Search root for `12개 언어`, `12 languages`, `힌디어`, `Hindi` | All absent unless entity/source evidence is added and approved | Mandatory RED gate |
| S45-M03 | No conclusion beyond current comparison | Search root for `다국어 AI 거버넌스`, `소버린 파운데이션 모델`, `Custom Tokenizer` | All absent from conclusion/1DEPTH | Mandatory RED gate |
| S45-M04 | Korean-first comparative reading | Screenshot/rubric | Korean’s position is readable at first glance; V1–V3 ≥ 1 and V2 = 2; raw dashboard framing is gone | Mandatory redesign gate |
| S45-M05 | Chart/focus interaction has a defined status | If a selectable comparison remains, activate two selections | State updates correctly; otherwise collection/control intentionally removed and documented | Mandatory preserve-or-remove decision gate |
| S45-M06 | Sentence register consistency | Read all KO closing paragraphs | One consistent declarative register; no mixed `~다`/`~습니다` prose in the same section | Mandatory editorial gate |
| S45-M07 | Flores source status is honest | Inspect caption/source and agent artifact | A changed/strengthened source requires URL/DOI + evidence record; otherwise retain the item as `BLOCKED_EVIDENCE`, never invent a citation | Conditional blocker |

**S4.5 completion condition:** This is a redesign. It cannot pass with only label replacements; S45-M02–M06 must pass, and S45-M07 must be explicitly resolved or blocked.

### S5 — Korea AI Infrastructure Context (`#infrastructure`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S5-M01 | Root/macro-flow count | Root; `[data-collection="macro-adoption-phases"]` | Root = 1; macro flow = 1; phase items = 4 unless approved redesign changes the model | Mandatory |
| S5-M02 | Causal-chain chrome removed | Search root for `MACRO ADOPTION CAUSAL CHAIN`, `causal chain`, `인과 사슬` | All absent | Mandatory RED gate |
| S5-M03 | Phase labels Koreanized | Search KO root for `AI Investment`, `Infrastructure`, `AI Adoption`, `Token Usage` | All absent as primary labels; Korean flow labels visible | Mandatory RED gate |
| S5-M04 | Placeholder cards removed | `[data-collection="verified-policy-slots"]`, plus `[VERIFIED`, `REQUIRED`, `SAMSUNG`, `SK` search | Collection/card count = 0; placeholder strings absent | Mandatory RED gate |
| S5-M05 | Macro context remains non-causal | Read headline/lead/flow connections | No statement that infrastructure investment causes Token Premium or that Token Premium causes national power demand | Mandatory claim gate |
| S5-M06 | Evidence replacement is controlled | Inspect any added source strips | Either zero new strips with `BLOCKED_EVIDENCE`, or 2–3 real cited strips with date/outlet/one-line fact and evidence record | Conditional evidence gate |
| S5-M07 | One context visual, not a policy dashboard | Screenshot/rubric | V1–V4 ≥ 1; main flow supports context rather than competing business detail | Mandatory visual gate |

### S5.2 — Social Impact / Conceptual Pathway (`#impact`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S52-M01 | Root and legacy/replacement isolation | Root; legacy `impact-scale-levels`; replacement `data-hp01-id="impact-pathway"` | Root = 1; legacy 3-card group absent or fully replaced; exactly one pathway wrapper present | Mandatory structure gate |
| S52-M02 | Legacy card-dashboard text removed | Search root for `LEVEL 01`, `LEVEL 02`, `LEVEL 03`, `PROMPT LEVEL`, `WORKFLOW LEVEL`, `INFRASTRUCTURE` | Legacy dashboard labels absent in KO 1DEPTH | Mandatory RED gate |
| S52-M03 | Causal-chain wording removed | Search root for `FINAL CONCEPTUAL CAUSAL CHAIN`, `Complete Causal Chain`, `causal chain` | All absent | Mandatory RED gate |
| S52-M04 | Replacement is explicitly conceptual | Inspect pathway heading/caption | Uses Korean framing equivalent to “conceptual pathway/possible expansion,” never causal proof | Mandatory claim gate |
| S52-M05 | Technical terms are 2DEPTH if retained | Inspect `details`, glossary links, or hover mechanism | GPT/Transformer/context-window/sovereign-AI explanation is not primary-card chrome; any remaining `소버린 AI` has one-line definition/link | Mandatory depth gate |
| S52-M06 | One diagram and one claim | Screenshot/rubric | V1–V4 ≥ 1; V2 = 2; no residual three-card dashboard competes | Mandatory visual gate |

### S6 — Method and Boundaries (`#method`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S6-M01 | Root/list/accordion integrity | Root; `[data-collection="what-we-do-not-claim"]`; `[data-collection="methodology-items"]` | Root = 1; non-claim items = 6; methodology disclosure items = 6 | Mandatory preserve gate |
| S6-M02 | English dashboard labels removed | Search root for `CRITICAL BOUNDARY`, `WHAT WE DO NOT CLAIM`, `6 KEY PRINCIPLES` | All absent from KO 1DEPTH | Mandatory RED gate |
| S6-M03 | Six claims preserved exactly in substance | Compare six rendered rows with approved baseline artifact | All six remain; no weakened/strengthened claim, deletion, or invented addition | Hard evidence gate |
| S6-M04 | Accordion works | Open and close at least two methodology items | One opens/closes predictably; text is visible and controls remain accessible | Mandatory behavior gate |
| S6-M05 | BPE receives a plain-Korean first-use gloss | Inspect BPE occurrence context | First visible BPE reference includes an intelligible Korean explanation or adjacent 2DEPTH affordance | Mandatory depth gate |
| S6-M06 | Reader-explanation tone | Screenshot/rubric | V1/V3/V4 ≥ 1; boundaries read as an article explanation rather than research dashboard chrome | Mandatory visual gate |

### S7 — Editorial Conclusion (`#result`)

| Metric ID | Observable requirement | Crawl check | Expected result | Status rule |
|---|---|---|---|---|
| S7-M01 | Root/H2/protected opening integrity | Root; H2; first range paragraph | Root = 1; approved H2/lead retained; first conclusion paragraph still contains the protected `1.29×`–`1.83×` range unless a ruling exists | Hard preserve gate |
| S7-M02 | Duplicate quote removal | `#result blockquote` or `data-hp01-id="conclusion-pullquote"` | Count = 0 | Mandatory RED gate |
| S7-M03 | Footer microcopy removal | Search root for `TOKEN PREMIUM INTERACTIVE DATA STORY`, `/ 2026` footer combination | Historic footer microcopy absent | Mandatory RED gate |
| S7-M04 | Back-to-top control remains | `button` with `처음부터 다시 보기` / `data-hp01-id="back-to-top"` | Count = 1; activation returns browser to top/hero | Mandatory preserve gate |
| S7-M05 | Korean conclusion tone | Search paragraph text for `representation efficiency` and inspect rhetorical body | Struck English rhetorical phrase absent; Korean final appeal avoids new causal claim | Mandatory editorial/claim gate |
| S7-M06 | Controlled S0-R05 handoff | Compare hero lower context and conclusion text | No duplicated claim and no raw copy transfer; new conclusion wording, if any, contains no unsupported evidence | Conditional cross-slide gate |
| S7-M07 | Conclusion clarity | Screenshot/rubric | V1–V4 ≥ 1; no quote/footer card competes; one final Korean reader-facing takeaway | Mandatory visual gate |

---

## C. Local-Agent Evidence Packet — Required Before a Crawl Signal

For one slide/work package, the local agent must submit this exact packet. Without it, the Director-side crawl result is `NOT VERIFIABLE`, not “probably acceptable.”

| Field | Required content |
|---|---|
| Work identity | HP01 directive IDs, slide ID, branch, commit SHA, parent SHA, deployment/preview URL |
| Scope proof | Root selector, child selectors, source file(s), changed-file list, and explicit non-changed shared files |
| Before/after DOM contract | Element counts and negative-string checks for the slide metrics above |
| Local commands | Full exit results for lint, build, and any DOM/interaction tests |
| Behavior log | Every preserved control interacted with, selected inputs, before/after observable state |
| Evidence safety | Protected content checks; unresolved D1/D2/D4 or evidence blocks named verbatim |
| Trace artifact | Updated `HUMAN_PREVIEW_01_MASTER.md`, `SHOT_SPECS.md`, and `LOOP_LOG.md` plus artifact paths/hashes |
| Agent verdict | Proposed `PASS`, `CONDITIONAL PASS`, `FAIL`, or `BLOCKED`; no “done” shorthand |

A local test may use application-level selectors, but the reported selector must resolve to the same rendered node that the deployment crawl will inspect.

---

## D. Director Crawl-Verification Protocol

When the Director sends a verification signal, the reviewer will use the specified deployment or preview URL and verify the corresponding section directly. No posting, merging, deployment promotion, or destructive action is part of this protocol.

### D.1 Recommended signal format

```text
HP01 VERIFY
slide: S4
hp01_ids: HP01-S4-R01,R02,R03,R04,B01,B03
url: https://<preview-or-production-url>/
commit: <full-sha>
agent_packet: <PR URL, commit URL, or pasted evidence packet>
```

The short form `S4 검증해` is sufficient only if the current target URL and commit are already unambiguous. A preview URL and SHA are strongly preferred because production may lag or contain another agent’s work.

### D.2 Reviewer sequence

| Step | What is checked | Output recorded |
|---:|---|---|
| 1 | URL resolves; asset/deployment state and supplied SHA are consistent enough to identify the reviewed build | Review baseline and lineage status |
| 2 | Open in KO mode; navigate via the exact root hash/selector mapping | Root/anchor resolution and current scroll context |
| 3 | Inspect DOM/text for every slide metric’s positive count and required absence check | Metric-by-metric PASS/FAIL/NOT VERIFIABLE table |
| 4 | Exercise retained controls and `details`/back-to-top behavior where applicable | Behavior evidence with initial/final state |
| 5 | Inspect the anchored section’s rendered first-reading sequence | V1–V4 rubric scores with specific reason |
| 6 | Compare rendered research/provenance text against protected-content baseline and agent packet | Evidence-safety result and blocks |
| 7 | Issue one verdict: `PASS`, `CONDITIONAL PASS`, `FAIL`, or `NOT VERIFIABLE` | Director-facing QA report, not an automatic merge instruction |

### D.3 What a crawl cannot certify alone

A browser crawl can certify rendered DOM, visible copy, client interaction, and obvious protected-value drift. It cannot independently certify that an external paper, policy fact, source, pricing input, or research computation is correct merely because a URL/number is present. Those claims require the supporting evidence packet and, where relevant, a Director ruling.

---

## E. Standard QA Report Card

Every Director-side verification will use this table, avoiding vague “looks good” judgments.

| Metric group | Result | Evidence | Severity if failed |
|---|---|---|---|
| G-ROOT / scope | PASS / FAIL / NV | Root selector + changed-file packet | Critical |
| RED closure | PASS / FAIL / NV | Presence/absence checks | Critical |
| Preserve/behavior | PASS / FAIL / NV | Interaction transcript | Critical for active controls |
| Korean-first depth | PASS / FAIL / NV | V1–V4 rubric + text evidence | High |
| Evidence safety | PASS / BLOCKED / FAIL / NV | Protected baseline and evidence packet | Critical |
| Traceability | PASS / FAIL / NV | SHA, artifact, test log | High |
| Overall | PASS / CONDITIONAL PASS / FAIL / NOT VERIFIABLE | Gate-first rule | — |

> **No averaging loophole:** a high visual score cannot offset a hidden placeholder card, broken control, missing source caption, or changed protected number.

---

## F. References

[1] [`HUMAN_PREVIEW_01_TARGETING_MASTER_v1.0.md`](./HUMAN_PREVIEW_01_TARGETING_MASTER_v1.0.md) — DOM roots, selectors, target boundaries, protected-content handling, and current status.

[2] [`HUMAN_PREVIEW_01_MASTER.md`](./HUMAN_PREVIEW_01_MASTER.md) — Human Preview authority, HP01 directive ledger, and outstanding blocks.

[3] [`DIRECTOR_DECISIONS.md`](../audit/DIRECTOR_DECISIONS.md) — D1/D2/D4 provenance and protected-content decision queue.

[4] [`runtime-crawl-notes.md`](../audit/runtime-crawl-notes.md) — production crawl observations and diagnostic anchors.

---

## Appendix — One-Line Local Agent Instruction

> For the assigned slide, meet every mandatory `S*-M*` metric in this document, report all blocker metrics as `BLOCKED_*` rather than completing them by assumption, and do not request acceptance until you provide the complete evidence packet for a deployable URL and commit SHA. On `HP01 VERIFY`, the Director-side reviewer will crawl the named build against these exact gates.
