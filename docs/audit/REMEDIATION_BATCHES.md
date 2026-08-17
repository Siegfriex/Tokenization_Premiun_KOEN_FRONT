# Remediation Batch Plan

Six batches. The order is not a preference — each one exists to make the next
one mechanical, and running them out of order forces re-work.

**None of them are performed in this phase.** This file designs them.

| Batch | Items | Visible change | Blocked by |
|---|---|---|---|
| **B1** numeric freeze & provenance | 22 | possibly — that is the decision | Director (D1-D4) |
| **B2** stable hooks | 345 nodes touched | none | nothing |
| **B3** semantic DOM | 159 | none if done correctly | B2 |
| **B4** content migration to entities | 152 | none | B1 for the 22 numeric nodes |
| **B5** design-role formalisation | 10 primary, 51 signatures | possibly | B2, B3 |
| **B6** dead code | 57 | none | Director |

---

## Why this order

The instinct is to start with B4 — "just move the hardcoded strings into
entities." That is the wrong first move, three times over:

1. **22 of those strings contain frozen numbers.** Migrating them means
   choosing a value, which is exactly what the Director queue forbids.
2. **Moving a literal into an entity destroys the only address it had.** Right
   now `PREM-016` is findable because the string `1.68× (+68%)` is grep-able in
   `TokenPremiumSection.tsx`. After migration it is `{data.averagePremium}` in
   the widget and a value in a data file — and if no hook was added first,
   nothing in the DOM says which node renders it.
3. **Semantic restructuring rewrites the same lines.** Doing B4 then B3 edits
   every one of those nodes twice, and the second diff hides the first.

So: give everything an address (B2), give the DOM its structure (B3), *then*
move content (B4). B1 runs in parallel because it is a decision, not an edit.

---

## B1 — Numeric freeze & provenance

**22 items · CRITICAL/HIGH · gated on [`DIRECTOR_DECISIONS.md`](DIRECTOR_DECISIONS.md) D1-D4**

Not an engineering batch. Its output is a ruling per row: the figure is
correct and gets an entity with recorded provenance, or it is derived from
existing entity data (accepting a visible change), or it is removed.

Only after a row is answered may B4 touch that node.

**Definition of done:** every row in `NUMERIC_CLAIMS.md` is `ENTITY_OWNED`, and
zero rows are `CONTRADICTED`, `UNLINKED`, or `DUPLICATED`.

**Do not:** derive a replacement value to "unblock" the batch. A wrong number
shipped confidently is worse than a number nobody can trace.

---

## B2 — Stable hooks

**Every tracked node · no visible change · not blocked by anything**

Add `data-*` attributes so nodes have addresses that survive restyling. This is
the enabling batch — everything downstream gets cheaper once it lands.

Proposed vocabulary (per [`STABLE_HOOKS.md`](STABLE_HOOKS.md)):

| Hook | On | Purpose |
|---|---|---|
| `data-section="hero\|compare\|pipeline\|…"` | each `<section>` | already have `id`; makes the pair explicit |
| `data-role="eyebrow\|section-heading\|figure-caption\|token-chip\|selectable\|section-nav\|stat\|legend"` | labelled/structural nodes | names what a node *is*, not how it looks |
| `data-collection="pipeline-steps\|domain-distribution\|…"` + `data-item-id="{item.id}"` | every `.map()` render site | 54 collections become individually addressable |
| `data-metric="average-premium\|max-observed\|corpus-size\|…"` | every numeric claim node | the QA assertion this project already recommended becomes writable |
| `data-source="entity\|widget"` | every content node | makes B4 progress measurable from the DOM alone |

`data-source` is the important one. It makes the migration self-reporting:
count `[data-source="widget"]` in the rendered page and you have the remaining
B4 backlog, without reading a single file.

**Definition of done:** `STABLE_HOOKS.md` shows 0 `STYLE_SIGNATURE` and 0
`NTH_CHILD_ONLY` for tracked nodes. Guard test: fail CI if a tracked node loses
its hook.

**Risk:** low. Attributes only; no class, element, or text changes. Verify by
asset-hash comparison of the CSS bundle (it must not change at all).

---

## B3 — Semantic DOM

**159 items · no visible change if done correctly · after B2**

Four coherent groups, each doable independently:

**B3a — collections → `<ul>`/`<li>` (54 sites, 24 distinct collections).**
Every `.map()` render site: pipeline steps, domain rows, policy slots, impact
levels, methodology items, paragraphs, token chips, nav links. Needs
`list-style:none` + `margin:0` to stay visually identical — verify the reset
before starting.

**B3b — term/value pairs → `<dl>`/`<dt>`/`<dd>` (72 sites).**
The hero stat ribbon, selectable-card meta rows, the language-focus metric
table, the token receipt, footer meta. These are the nodes currently reachable
only as `div:nth-child(3)`.

**B3c — charts → `<figure>`/`<figcaption>` (7 sites).**
`ArticleFigureCaption` is used 7 times to caption a chart it has no
relationship to. Wrap chart + caption in `<figure>`; the caption becomes the
accessible name of the figure.

**B3d — navigation and labels (1 nav, 9 orphan labels, 16 headings).**
`<nav aria-label>`, links in a list, eyebrows tied to what they label via
`id`/`aria-labelledby`, and one document-wide heading-outline pass (`h1` → `h2`
per section → `h3`/`h4` within).

**Definition of done:** `SEMANTIC_DOM.md` empty; rendered DOM passes an HTML
validity check; heading outline matches the document structure; axe clean on
interactive controls.

**Risk:** medium. Changing element types can change layout. Every group needs
the CSS bundle compared before/after and a manual pass at 1440px and 390px.

---

## B4 — Content migration to entities

**152 items · no visible change · after B2/B3, gated per-node on B1**

182 human-readable literals live in widget JSX. Move them to `entities/`,
keeping the exact strings. Group by widget so each PR is one section's worth.

Ordering within the batch: widgets with no frozen numbers first
(`KoreaAIContextSection`, `ImpactSection`, `MethodSection`,
`EditorialConclusionSection`, `Footer`, `PipelineSection`,
`TokenCompareSection`, `StoryProgress`), then `OccupationSection`,
`MultilingualTokenEfficiencySection`, `NewsHeroSection`, `TokenPremiumSection`
as their D1-D4 rows are answered.

**Definition of done:** zero human-readable literals in `src/components/`.
Guard test: fail if a widget file contains a Korean sentence or a multi-word
English sentence outside a comment.

**Do not:** rewrite, normalise, retranslate, or "improve" any string while
moving it. Byte-identical, verified by multiset diff — the same check used on
the palette branch.

---

## B5 — Design-role formalisation

**10 primary items, 51 typography signatures · after B2/B3**

[`DESIGN_APPLICATION.md`](DESIGN_APPLICATION.md) counts **51 distinct
typography signatures**, **29 colour utilities**, **90 layout/shape
utilities** in live use. The colour layer is already consolidated (three named
layers, one token file). Typography is not: 51 signatures is an unnamed type
scale, and the ones used once are either a role nobody named or an accident.

This batch names the recurring signatures as roles in `shared/ui`, and puts the
single-use ones in front of a designer to keep or delete. It is last because
you cannot see which signatures are real roles until content and structure have
stopped moving.

**Definition of done:** signature count reduced to a named set; every remaining
one-off documented as a deliberate exception per `DESIGN_SYSTEM_CONTRACT.md`.

**Risk:** this is the batch that can cause visual drift. Any signature merge is
a design decision, not a refactor.

---

## B6 — Dead code

**57 tracked nodes · gated on Director**

`src/components/MultilingualSection.tsx` — 417 lines, not imported anywhere.
Tracked so it is not silently forgotten; excluded from every live count (57 nodes). Also
the 4 unused dependencies (`HANDOFF.md` §6.8).

Deliberately not bundled into any other batch: deleting is not a consequence of
tracing, and a detached deletion campaign is how genuinely-used code gets
removed by accident.

---

## Progress measurement

After every batch, re-run all three tools. A batch succeeded when **its**
numbers moved and nothing else did.

| Metric | Now | Target |
|---|---|---|
| nodes addressable only by style signature | 231 | 0 |
| nodes addressable only by sibling position | 103 | 0 |
| `data-*` attributes in the codebase | 0 | one per tracked node |
| numeric claims not owned by an entity | 22 | 0 |
| semantic-structure gaps | 159 | 0 |
| human-readable literals in widget JSX | 182 | 0 |
| distinct typography signatures | 51 | a named set |
| tracked nodes in dead files | 57 | 0 |
