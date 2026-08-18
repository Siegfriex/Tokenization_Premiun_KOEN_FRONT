# Human Preview 01 — DOM-Targeted Local Agent Master Directive

**Document ID:** `KOEN-FRONT-HP01-DOM-MASTER-v1.0`  
**Status:** ACTIVE — implementation directive overlay  
**Prepared:** 2026-08-18 KST  
**Target repository:** [`Siegfriex/Tokenization_Premiun_KOEN_FRONT`](https://github.com/Siegfriex/Tokenization_Premiun_KOEN_FRONT)  
**Target baseline:** `origin/main` at `8d0a64ce4d6a41119ff23727c0c2c5e74c9abf58` (PR #23)  
**Production surface:** <https://tokenization-premiun-koen-front.vercel.app/>  
**Research gate:** **G0 Design Freeze — PASS; G1–G6 not evaluated by this editorial task.** This directive changes neither research data nor research claims.

> **Purpose.** This document prevents a local agent from using screenshot OCR, visual guesswork, broad text replacement, or a flat image-coordinate interpretation to choose code paths. Each Human Preview redline must first resolve to one verified runtime root, then to a verified DOM hook or an explicitly added local hook, and then to one named source component.

This is an **editorial execution overlay**. The authority for screenshot meaning and status remains [`HUMAN_PREVIEW_01_MASTER.md`](./HUMAN_PREVIEW_01_MASTER.md). The authority for protected numeric/research decisions remains [`DIRECTOR_DECISIONS.md`](../audit/DIRECTOR_DECISIONS.md). If a redline appears to conflict with either protected-content rule, stop the local patch and report `BLOCKED_CONTENT_AUTHORITY` or `BLOCKED_EVIDENCE`; do not invent a replacement value, source, or causal explanation.

---

## A. Current State

The live production crawl was refreshed after PR #23 was merged. The current production page visibly includes the S2 disclosure `토큰화 처리 과정 자세히 보기` and Koreanized S3 labels, which verifies that the S2/S3 editorial changes are deployed. The current local source baseline is therefore PR #23, not the earlier PR #22 baseline.

| Item | Verified state | Operational implication |
|---|---|---|
| Git baseline | `origin/main` = `8d0a64c` (PR #23) | Start every patch by fetching and comparing `HEAD` to this SHA or its approved descendant. |
| Deployed S2 | Decorative English label/badges removed; technical prose is inside a closed `details` disclosure | Do **not** re-open or duplicate the S0 composite-image pipeline comments inside hero. |
| Deployed S3 | 1DEPTH label Koreanization deployed | D1 numerical provenance conflict remains frozen. |
| Navigation | Ten rendered anchors, from `#hero` through `#result` | Do not change `App.tsx`, section order, or header navigation for a per-slide redline. |
| Runtime hooks | Every section root has `id`, `data-widget`, and `data-section`; child hooks use `data-role`/`data-collection` | Use these hooks before considering a class selector. |
| Historic audit ledger | `STABLE_HOOKS.md` header says no `data-*` hooks exist | That header is stale; runtime HTML and current source demonstrably contain the hooks listed here. |

The page uses shared editorial wrappers. `ArticleReadingColumn` renders a `Container` with `variant="reading"`; its documented reading measure is **720 px**. `ArticleFullWidthBreak` renders the wide editorial measure, documented as **1360 px** for figure breakouts. Therefore, an image region is not an independent component merely because it looks like a card: it may inherit its measure, typography, margins, and borders from shared wrappers.[1]

---

## B. Evidence — Runtime Map, Root Selectors, and Coordinates

The coordinate column is a **desktop-session diagnostic**, not a pixel contract. Coordinates change with viewport, font timing, language mode, and upstream copy. They are supplied only to recreate the review context. A selector is the binding implementation address.

| Image | Nav | Root selector — use exactly one match | Source component | Latest observed scroll Y | Human-review surface |
|---|---|---|---|---:|---|
| `S0.png` | S0 | `section#hero[data-widget="NewsHeroSection"][data-section="hero"]` | `src/components/NewsHeroSection.tsx` | 0 px | Cover, FIG.01 evidence card, intro reading flow |
| `S1.png` | S1 | `section#compare[data-widget="TokenCompareSection"][data-section="compare"]` | `src/components/TokenCompareSection.tsx` | 2,030 px | Paired-sentence selector and KO/EN token comparison |
| `S2.png` | S2 | `section#pipeline[data-widget="PipelineSection"][data-section="pipeline"]` | `src/components/PipelineSection.tsx` | 3,799 px | Five-step pipeline and its figure/disclosure |
| `S3.png` | S3 | `section#patterns[data-widget="TokenPremiumSection"][data-section="patterns"]` | `src/components/TokenPremiumSection.tsx` | 5,219 px | Core-metric panel and domain-distribution exhibit |
| `S4.png` | S4 | `section#burden[data-widget="OccupationSection"][data-section="burden"]` | `src/components/OccupationSection.tsx` | 7,169 px | Repetition simulator; lower occupation comparison |
| `S5.png` | S4.5 | `section#languages[data-widget="MultilingualTokenEfficiencySection"][data-section="languages"]` | `src/components/MultilingualTokenEfficiencySection.tsx` | 9,669 px | Language comparison focus/card/chart |
| `S6.png` | S5 | `section#infrastructure[data-widget="KoreaAIContextSection"][data-section="infrastructure"]` | `src/components/KoreaAIContextSection.tsx` | 11,494 px | Macro flow and policy/investment placeholders |
| `S7.png` | S5.2 | `section#impact[data-widget="ImpactSection"][data-section="impact"]` | `src/components/ImpactSection.tsx` | 13,376 px | Impact dashboard and conceptual-pathway content |
| `S8.png` | S6 | `section#method[data-widget="MethodSection"][data-section="method"]` | `src/components/MethodSection.tsx` | 15,324 px | Boundary list and methodology disclosure/accordion |
| `S9_결론.png` | S7 | `section#result[data-widget="EditorialConclusionSection"][data-section="result"]` | `src/components/EditorialConclusionSection.tsx` | 17,570 px | Conclusion prose, quote, footer microcopy, reset button |

### B.1 Image-boundary exception — mandatory routing rule

`S0.png` is a **composite capture**. Only its cover/hero clusters route to `#hero`. Its lower cluster containing `토큰, AI 시대의 새로운 계량 단위`, pipeline steps, or the removed `TRANSFORMER PIPELINE SEQUENCING`/`STEP 02` chrome routes **only** to `#pipeline` / `PipelineSection.tsx`.

> **Forbidden interpretation:** “The comment appeared in `S0.png`, therefore modify `NewsHeroSection.tsx`.”
>
> **Required interpretation:** Match the captured copy to a current root selector first. Pipeline copy is S2 even when the image filename is S0.

---

## C. DOM Addressing and Inheritance Protocol

Every agent must use the following priority order. It is intentionally stricter than normal CSS work because the Human Preview captures a long, continuous editorial page.

| Priority | Allowed address | Example | Use case |
|---:|---|---|---|
| 1 | Section root | `section#burden[data-widget="OccupationSection"]` | Establish the only permitted component boundary. |
| 2 | Named collection | `#burden [data-collection="iteration-presets"]` | Repeated controls, cards, chart rows, or list groups. |
| 3 | Semantic role | `#pipeline [data-role="figure"]`, `#method [data-role="article-paragraph"]` | Shared editorial blocks within an already-scoped root. |
| 4 | Semantic HTML within root | `#result blockquote`, `#pipeline details` | Only where the element is unique inside the verified root. |
| 5 | New local hook, added first | `data-hp01-id="conclusion-footer"` | Use when existing hooks cannot isolate a redline safely. |
| 6 | Narrow class selector | Scoped to one root and one immediate visual block | Last resort; record why no semantic hook existed. |

**Never use** a global text replacement, an unscoped `.text-ink`, `.bg-surface`, `:nth-child()`, a raw pixel coordinate, or a selector crossing into another `section`. Never choose a code path by OCR of the screenshot. The screenshot determines **what editorial result is desired**; runtime/source selectors determine **where code is changed**.

### C.1 Required instrumentation rule

If the target cannot be isolated by the existing section root plus an existing `data-collection`, `data-role`, or unique semantic element, the first commit must be **instrumentation-only**. Add a stable `data-hp01-id` to the smallest parent that corresponds to the review object; verify exactly one runtime match; only then make the editorial change in a second commit.

The required hook names for ambiguous surfaces are below.

| Section | Add only if absent | Reason |
|---|---|---|
| S0 | `hero-token-exhibit`, `hero-token-exhibit-takeaway`, `hero-news-context` | The FIG.01 exhibit lower takeaway and adjacent news note have no dedicated current hook. |
| S4 | `occupation-comparison` | The simulator must survive while the sibling occupation comparison is removed. |
| S4.5 | `language-focus`, `language-comparison-chart`, `language-closing-claim` | The entire dashboard is rejected, but the future replacement must retain a precise boundary. |
| S5 | `macro-flow`, `verified-policy-slots-wrapper` | The macro flow is rewritten while placeholder cards are removed independently. |
| S5.2 | `impact-levels`, `impact-pathway` | The three-card dashboard and pathway need separate treatment. |
| S7 | `conclusion-prose`, `conclusion-pullquote`, `conclusion-footer`, `back-to-top` | The quote/footer are deleted while the button remains operational. |

### C.2 Shared-component inheritance — do not over-edit

| Shared component / contract | Runtime signature | Edit constraint |
|---|---|---|
| `ArticleReadingColumn` | `Container variant="reading"` | Its measure/typography affects every consumer. Do not edit it for one slide. Pass a local `className` only if a section-specific adjustment is truly required. |
| `ArticleLead` | `[data-role="article-lead"]` | Shared lead style; content changes belong to the owning section/entity, not the global component. |
| `ArticleParagraph` | `[data-role="article-paragraph"]` | Shared body style, including `break-keep`; do not globally change for one Korean line break. |
| `ArticleFinding` | `[data-role="article-finding"]` | A section-level finding. Do not use it to introduce new research values. |
| `ArticlePullQuote` | `[data-role="article-pullquote"]` | S7 deletion must be scoped to `#result`; do not delete the shared component. |
| `ArticleDisclosure` | `details > summary` | Existing 2DEPTH mechanism. Reuse it rather than adding arbitrary custom accordions. |
| `ArticleFullWidthBreak` | `[data-role="figure"]` or wide container | Provides shared wide layout/caption semantics. Do not replace with a generic `div`. |
| `ArticleFigureCaption` | `[data-role="figure-caption"]` | Preserve real sources; an editorial reduction never authorizes source deletion or fabrication. |

---

## D. Per-Slide Execution Matrix

The following matrix is the execution route for every attached image. **Closed** rows are protected from regression; do not reopen them merely because the original screenshot contains the historical wording. **Blocked** rows are not skipped; they are reported and left unchanged.

| Slide | Exact local target(s) | Directive status and allowed action | Preserve / block |
|---|---|---|---|
| S0 | Root; add `hero-token-exhibit*` hooks if acting on the lower FIG.01 content | `HP01-S0-R01`–`R04`, `B01` are **DONE**. `HP01-S0-R05` is deferred and must be resolved together with S7, not by moving raw copy blindly. Remove or rewrite the introductory takeaway/news-context only after confirming the conclusion can carry the same editorial purpose without a new claim. | **D2 blocked:** `31 / 18 / 1.72×` and the two sample sentences cannot be altered, derived, or recast as measured evidence without Director ruling. |
| S1 | `[data-collection="curated-paired-sentences"]`; existing comparison controls inside root | `HP01-S1-R01`–`R06` are **DONE**. Regression review only: keep Korean headers, declarative tone, and token ratio wording. | Keep all four pair controls and selected-state behavior. Do not affect S2. |
| S2 | `[data-collection="pipeline-steps"]`, `#pipeline details`, `[data-role="figure-caption"]`, `[data-role="article-finding"]` | S2 visual/text work is **DONE**. The current 1DEPTH has one central process visual; technical detail is in the disclosure. | **Blocked:** wording says four stages while the interactive visualization has five. No unilateral deletion, renumbering, or research/process redesign. |
| S3 | `[data-role="figure"]`, `[data-collection="domain-distribution"]`, scoped stat panels | Koreanization and explanation work are **DONE**. Do not re-add English dashboard chrome or invent explanatory provenance text. | **D1 blocked:** `1.29–1.83×`, `1.68×`, 7-vs-6 domains, range/max/baseline, and 69,432 must not change until Director rules. |
| S4 | `[data-collection="iteration-presets"]`, `input[type="range"]`, `[data-collection="engineering-occupations"]`, `[data-collection="socialscience-occupations"]` | **Next active patch.** Delete only the occupation-comparison wrapper/card group; retain and promote simulator as the section’s single central interaction. Koreanize UI labels, remove unsourced workload characterizations, correct linear-accumulation language, and check KO/EN numeric typography. | Keep five presets, range input, computed receipt, and result updates. **Blocked evidence:** pricing/unit-cost multiplier may only be scaffolded behind a data adapter; no values, prices, or example totals. |
| S4.5 | `[data-collection="multilingual-comparison"]`, chart SVG/container inside root; add named hooks first | **Whole-section redesign candidate.** Replace the dashboard composition with one Korean-first comparison whose first read is Korean’s relative position. Remove the unsupported governance/custom-tokenizer conclusion and unverified language-count framing. | **Blocked evidence:** no Flores paper/source is currently available for a replacement evidence display. Use no new language values and do not claim a 12-language result from five rows. |
| S5 | `[data-collection="macro-adoption-phases"]`, `[data-collection="verified-policy-slots"]` | Rewrite macro-flow title/phase labels in non-causal Korean. Remove the three placeholder cards as a discrete descendant operation. | No verified source strips until real cited sources are supplied. Do not imply that national AI investment causes Token Premium or vice versa. |
| S5.2 | `[data-collection="impact-scale-levels"]`, `[data-collection="impact-causal-chain"]` | Remove or substantially restructure the three-card dashboard. Replace with a single simple Korean **conceptual pathway**, explicitly non-causal. Move GPT/Transformer/context-window/sovreign-AI technical explanation to 2DEPTH only if it remains. | Never turn predictive/illustrative text into a causal claim. Add a one-line definition or glossary link before retaining “소버린 AI.” |
| S6 | `[data-collection="what-we-do-not-claim"]`, `[data-collection="methodology-items"]`, existing accordion buttons | Koreanize/remove dashboard-style English labels and add a plain-Korean BPE gloss. Make it read as a reader explanation, not a dashboard. | Preserve all six non-claim statements verbatim and retain the accordion as the established 2DEPTH mechanism. |
| S7 | `#result blockquote`, footer stat block, `button` back-to-top; add named hooks first if more than one candidate | Koreanize conclusion rhetoric, delete duplicate quote, delete footer microcopy, and compact the conclusion to “measured / observed / not yet claimed.” Resolve S0-R05 only as a controlled cross-slide editorial handoff. | Preserve H2, lead, first `1.29×–1.83×` paragraph, and the `처음부터 다시 보기` control. Do not broaden conclusion claims. |

---

## E. Current Priority Queue

The agent may not claim the long loop is “complete.” Current source and live production show **S0–S3 editorial iterations deployed**, while the following work remains. Execute in this order unless the Director explicitly changes scope.

| Priority | Work package | Allowed code boundary | Completion evidence |
|---:|---|---|---|
| 1 | S4 `R01`, `R02`, `R03`, `R04`, `B01`, `B03` | `OccupationSection.tsx` plus a local UI/data-adapter boundary only | Removed occupation wrapper absent; simulator controls work at each preset and range change; no “기하급수” claim remains. |
| 2 | S4.5 `R01`–`R05`, `B01` | `MultilingualTokenEfficiencySection.tsx`; local hooks before visual restructure | One Korean-first visual; no unsupported 12-language or governance claim; citation state explicitly retained as blocked if unresolved. |
| 3 | S5 `R01`–`R04` | `KoreaAIContextSection.tsx` | Placeholder group absent; macro flow uses non-causal Korean; no fabricated source strip. |
| 4 | S5.2 `R01`–`R04`, `B01`, `B02` | `ImpactSection.tsx` | Old three-card dashboard absent/reworked; one conceptual pathway; 2DEPTH terms isolated. |
| 5 | S6 `R01`, `R03`, `B02` | `MethodSection.tsx` | Six claim nodes unchanged and accordion operational; labels/lead are Korean-first. |
| 6 | S7 `R01`–`R03`, `B01` plus deferred S0-R05 | `EditorialConclusionSection.tsx` and explicitly hooked S0 local content | Quote/footer removed only in S7; reset button works; no protected numerical/claim modification. |

---

## F. Local Agent Execution Contract

### F.1 Mandatory preflight

1. Fetch the specified repository and record `git rev-parse HEAD`, `git status --short`, and `git log -1 --oneline`.
2. Confirm `HEAD` is `8d0a64c` or an approved descendant. If not, diff the named component before acting; do not assume lines or status are unchanged.
3. Read this document, `HUMAN_PREVIEW_01_MASTER.md`, and `DIRECTOR_DECISIONS.md` before touching code.
4. For the chosen slide, assert the root selector returns exactly one element in the local running app and the named child selector returns the expected control/list count.
5. State the patch scope in one sentence: **one slide, one component, one redline set**. A cross-slide edit requires an explicit dependency note.

### F.2 Patch rules

The following pseudo-procedure is normative:

```text
resolve image/redline → root selector → existing child hook
    ├─ one unique match → patch only owning component
    └─ ambiguous/no match → instrumentation-only commit with data-hp01-id
                               → runtime uniqueness check → editorial patch
```

Do not edit `App.tsx`, header navigation, a shared article component, protected entity data, or a neighboring section as a side effect of a slide patch. If a proposed visual adjustment appears to require one of these paths, produce a `CHANGE_REQUEST` containing the rationale, affected roots, alternative local solution, validation impact, and Director decision required.

### F.3 Required verification per work package

| Verification layer | Required artifact |
|---|---|
| Source scope | `git diff --check` plus changed-file list; must show only permitted component/local dependency files. |
| Build | Passing `npm run lint` and `npm run build` output. |
| DOM | Root selector count = 1; named control/list count before/after reported; removed selector count = 0; preserved selector/control count as expected. |
| Behavior | S1 pair change, S2 step change, S4 preset/range update, S4.5 retained interaction (if retained), S6 disclosure open/close, S7 back-to-top all tested when their section is touched. |
| Editorial | Korean 1DEPTH remains first-read dominant; technical detail is disclosure/glossary; source/figure caption remains when real. |
| Evidence safety | Explicit statement that no protected value, sample size, tokenizer ID, source, or causal claim changed. |
| Trace | Update `HUMAN_PREVIEW_01_MASTER.md`, `docs/qa/SHOT_SPECS.md`, and `docs/qa/LOOP_LOG.md` with commit SHA, selectors, test result, and remaining blocker. |

A screenshot alone is **not** acceptance evidence. A local agent must attach DOM/query observations and command results, then identify the commit hash. A visually attractive but untraceable patch is Level 1 (code exists), not Level 3/4 validation evidence.

---

## G. Research and Claim Guardrails

The front-end editorial loop must not cross the research boundary. In particular, it must not change `Token Premium`, `o200k_base`, a displayed numerical value, sample size, entity source, or an asserted causal relationship merely to make a card look cleaner. It must also not fill an empty pricing, policy, investment, Flores, or multilingual slot with plausible text.

| Trigger | Required disposition |
|---|---|
| A redline requires correcting a value, number of domains, or exact pair count | `BLOCKED_CONTENT_AUTHORITY` → cite D1/D2/D4 as applicable. |
| A blue direction requires external policy, price, or multilingual research data | `BLOCKED_EVIDENCE` → retain no placeholder in 1DEPTH if the RED directive says remove it. |
| A section wants to explain an unmeasured macro/social outcome | Frame as a conceptual/possible pathway or move explanatory technical detail to 2DEPTH; do not claim causality. |
| Existing closure removes a UI label | Do not reintroduce it through translations, comments, or secondary badges. |
| A shared component seems convenient to modify | Prefer a local section wrapper. Escalate a shared change through `CHANGE_REQUEST`. |

---

## H. Acceptance Conditions for the Next Agent Report

A report is accepted only if it contains the following fields in this order. This format is mandatory so the Research Director can distinguish an implementation claim from validated evidence.

| Field | Required content |
|---|---|
| `Current State` | Branch, exact commit, chosen HP01 IDs, deployment/preview URL if available. |
| `Target Proof` | Root selector, child selector(s), local source file/line range, and selector match count. |
| `Change Boundary` | Files changed and an explicit statement of files deliberately not changed. |
| `Behavior Proof` | Tests for every preserved control in the section. |
| `Evidence Safety` | Protected-content check; any blocked item and why. |
| `Artifact` | Diff summary, build/lint output, DOM assertion output, screenshot only as supplemental evidence, and commit SHA. |
| `Gate` | `EDITORIAL QA: PASS / FAIL / BLOCKED`; research gate remains unchanged unless a separate research artifact exists. |
| `Decision Required` | Only genuine Director choices; no disguised request to let the agent guess a number/source. |

The report must never say “all done” when a `BLOCKED_*`, `TODO`, or deferred cross-slide item remains.

---

## I. References and Audit Inputs

[1] Shared editorial component implementation: [`src/components/ArticleElements.tsx`](https://github.com/Siegfriex/Tokenization_Premiun_KOEN_FRONT/blob/main/src/components/ArticleElements.tsx).

[2] Screenshot directive/status authority: [`docs/editorial/HUMAN_PREVIEW_01_MASTER.md`](./HUMAN_PREVIEW_01_MASTER.md).

[3] Protected numeric and provenance decision queue: [`docs/audit/DIRECTOR_DECISIONS.md`](../audit/DIRECTOR_DECISIONS.md).

[4] Runtime-crawl evidence, root order, raw HTML locations, and desktop diagnostic coordinates: [`docs/audit/runtime-crawl-notes.md`](../audit/runtime-crawl-notes.md).

[5] Current source hook inventory generated from the audited checkout: [`docs/audit/source-hook-index.md`](../audit/source-hook-index.md).

[6] Live front-end used only for runtime/DOM confirmation: <https://tokenization-premiun-koen-front.vercel.app/>.

---

## Appendix — Directive to Paste to a Local Agent

> Work on **one HP01 work package only**. Do not OCR screenshots to choose code. Start from `KOEN-FRONT-HP01-DOM-MASTER-v1.0.md`, verify the exact `section#…[data-widget=…]` root and its named child hook in the running page, then patch only the owning component. If no safe child hook exists, make an instrumentation-only commit adding the prescribed `data-hp01-id`, verify one runtime match, and then make the editorial change. Preserve all named controls and real source captions. Do not modify protected numerical/research content or resolve `BLOCKED_*` items. Finish with lint, build, scoped DOM assertions, interaction tests, trace-document updates, and a report containing selectors, artifacts, SHA, gate, and any decision required.
