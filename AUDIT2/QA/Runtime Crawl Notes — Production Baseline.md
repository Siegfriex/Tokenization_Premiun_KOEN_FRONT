# Runtime Crawl Notes — Production Baseline

- Crawled URL: https://tokenization-premiun-koen-front.vercel.app/
- Browser: My Browser
- Crawl date: 2026-08-18 (KST)
- Deployment title: `Tokenization Bottleneck & Language Token Efficiency Gap`
- Raw production HTML snapshot: `/home/ubuntu/upload/tokenization-premiun-koen-front.vercel.app__1787034074897.html`
- Initial viewport: top of document; total off-screen continuation reported: 18,130 px below viewport.

## Confirmed top navigation order

| Render order | Nav code | Link hint | Expected DOM anchor |
|---:|---|---|---|
| 1 | S0 | 커버 | `#hero` |
| 2 | S1 | 분절 비교 | `#compare` |
| 3 | S2 | 파이프라인 | `#pipeline` |
| 4 | S3 | Token Premium | `#patterns` |
| 5 | S4 | 누적 부담 | `#burden` |
| 6 | S4.5 | 글로벌 다국어 | `#languages` |
| 7 | S5 | AI 인프라 | `#infrastructure` |
| 8 | S5.2 | 사회적 확장 | `#impact` |
| 9 | S6 | 방법론·한계 | `#method` |
| 10 | S7 | 결론 | `#result` |

## Immediate runtime observations

1. Production navigation exposes all ten anchors and KO/EN language toggles at the top viewport.
2. Hero currently renders a `FIG. 01 · 실제 토큰 분절 비교` evidence panel, a `보도 및 인프라 동향 아카이브` block, an extended reading column, a pull quote, and the numeric range `약 1.2× ~ 1.8×` before S1.
3. This confirms the S0 redlines must be applied to `#hero` / `NewsHeroSection.tsx`; they must not be duplicated in S2 merely because the attached S0 composite image also includes a pipeline screenshot.
4. Runtime text for S2 presently contains technical terms and full five-stage pipeline copy in the reading flow; the selector-level change surface must be constrained to `#pipeline` / `PipelineSection.tsx`.

This note is a runtime observation log only. It makes no claim that text, numerical values, sources, or research conclusions are validated.

## Anchor coordinate observations — desktop browser session

Coordinates are runtime scroll positions from the production navigation in the same browser session. They are **diagnostic anchors**, not immutable layout specifications: copy, viewport width, font loading, language selection, and content changes may move them.

| Nav / DOM id | URL fragment | Observed `pixels above viewport` | Visible functional surface |
|---|---|---:|---|
| S1 / `compare` | `#compare` | 2,030 px | Four paired-sentence selection buttons; default PAIR 01 selected. |
| S2 / `pipeline` | `#pipeline` | 3,799 px | Five pipeline-step buttons; STEP 02 highlighted by default. |

The S1 anchor resolves directly to the section heading; the visual body contains an explanatory reading column, a selectable-pair toolbar, and the bilateral Korean/English comparison panel. The S2 anchor resolves directly to the pipeline section heading; the visual body contains an explanatory reading column and five selectable pipeline cards. Screenshot redlines that mention individual pair chips or pipeline cards must modify those child controls only; they must not be treated as instructions to restructure the global navigation or adjacent sections.

## Current selector implication

The saved production HTML and current `main` source both expose stable runtime hooks at the section root: `section#<id>[data-widget="<Component>"][data-section="<id>"]`. They also expose descendant `data-role` and `data-collection` attributes. This contradicts the header claim in the checked-out `docs/audit/STABLE_HOOKS.md` that the codebase has zero `data-*` attributes. The ledger header is therefore **stale as a baseline statement** and must not be used to deny the existence of current hooks.

A local agent should target, in order: (1) the root selector `section#<id>[data-widget="…"]`; (2) a verified descendant `data-collection` or `data-role`; and only then (3) a narrowly scoped class selector. It must not use global text search, bare `:nth-child()`, or a selector that crosses a section boundary.

| S3 / `patterns` | `#patterns` | 5,491 px | Numeric summary panel plus selectable domain-distribution rows. |
| S4 / `burden` | `#burden` | 7,441 px | Five preset buttons and one range input form the simulator; occupation comparison follows in the same section. |

The S3 screenshot’s crossed dashboard labels and the S4 screenshot’s lower occupational-comparison deletion are therefore **intra-section edits**. They do not justify changing `App.tsx`, `NAV_SECTIONS`, or moving the S4 simulator to another route. For S4 specifically, the preserved simulator control surface is the preset-button group and range input; the lower occupation comparisons are a sibling sub-block and may be deleted independently when the directive is approved for execution.

| S4.5 / `languages` | `#languages` | 9,940 px | Static language-focus panel and Recharts SVG bar chart; chart bars are interactive alongside language chips. |
| S5 / `infrastructure` | `#infrastructure` | 11,766 px | Static four-phase macro-flow plus the three policy/investment placeholder cards below it. |

S4.5 is the correct location for all `Flores-200`, language-chip, and bar-chart redlines. S5 is the correct location for the non-causal macro-flow wording and the removal of the placeholder cards. The three S5 cards are descendants of the S5 section only; no source data should be synthesized to replace them unless real evidence is supplied and approved.

| S5.2 / `impact` | `#impact` | 13,647 px | Static three-level impact cards followed by conceptual-chain content; no active controls. |
| S6 / `method` | `#method` | 15,595 px | Static boundary list followed by six expandable methodology items; the accordion is the established 2DEPTH interaction surface. |

S5.2's redlines apply to its three-card dashboard and causal wording, not to S5 infrastructure. S6's redlines remove English dashboard labels while preserving the six boundary statements and the accordion implementation. No code change should delete those six statements or replace the accordion with a flat panel merely because the top labels are to be Koreanized.

| S7 / `result` | `#result` | 17,842 px | Conclusion copy, a separate pull-quote block, footer microcopy, and one back-to-top button. |

The S7 image's pull-quote and footer-microcopy redlines target sibling content blocks inside `#result`. The `처음부터 다시 보기` button is a distinct interactive element and must remain operational after the quote/footer deletion. The observed full-story scroll span from first viewport to the result anchor is approximately 17.8 kpx in this desktop session; that number is a regression reference only, not an acceptance target.

## Deployment lineage update — 2026-08-18 KST

A first crawl rendered assets `index-Bm1hS9NK.js` and `index-DcSxfIQ6.css`, which exactly reproduced the initial checkout at merge commit `de058bd` (PR #22). While the audit was running, PR #23 merged and `origin/main` advanced to `8d0a64ce4d6a41119ff23727c0c2c5e74c9abf58`.

A second live crawl after the merge confirms deployment has advanced: S2 no longer renders `TRANSFORMER PIPELINE SEQUENCING`, `★ STEP 02: THE BOTTLENECK`, or `GAP ORIGIN`; it renders the simplified FIG.02 caption and the closed `토큰화 처리 과정 자세히 보기` disclosure. S3 now renders Koreanized 1DEPTH labels such as `핵심 실측 지표`, `관측된 토큰 프리미엄 비율`, `산출 공식`, and `도메인별 분포`. This is runtime confirmation of the S2/S3 Human Preview implementation, not resolution of the frozen D1/D2 numeric-provenance queue.

The latest browser view saved a fresh raw HTML snapshot at `/home/ubuntu/upload/tokenization-premiun-koen-front.vercel.app__1787034574624.html`. A reproducible build from the new `origin/main` produces `index-Dyfc-zfP.js` / `index-B2HcN5IZ.css`; however the browser evidence, not asset naming alone, is the deployment confirmation used in this audit because build system versions can affect output filenames.

## Post-PR #23 coordinate refresh

| Nav / DOM id | Latest observed `pixels above viewport` | Change from initial crawl | Interpretation |
|---|---:|---:|---|
| S3 / `patterns` | 5,219 px | −272 px | S2's movement of technical prose into the closed 2DEPTH disclosure shortened the preceding main flow. |
| S4 / `burden` | 7,169 px | −272 px | Downstream offset shifted by the same S2 shortening; S4 content itself was unchanged. |

These refreshed figures demonstrate why coordinates are supporting diagnostics only. Local agents must address nodes by stable section/data selectors and use scroll coordinates merely to reproduce the review context.
| S4.5 / `languages` | 9,669 px | −271 px | Latest deployment measurement; dashboard/chart remains the target surface. |
| S5 / `infrastructure` | 11,494 px | −272 px | Latest deployment measurement; macro-flow and placeholder cards remain the target surface. |
| S5.2 / `impact` | 13,376 px | −271 px | Latest deployment measurement; three-card dashboard and conceptual-chain content remain the target surface. |
| S6 / `method` | 15,324 px | −271 px | Latest deployment measurement; boundary panel and accordion remain the target surface. |
| S7 / `result` | 17,570 px | −272 px | Latest deployment measurement; pull-quote and footer microcopy are removable siblings, while the back-to-top button remains a preserved control. |
