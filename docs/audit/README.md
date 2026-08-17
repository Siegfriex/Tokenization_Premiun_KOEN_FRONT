# Frontend Trace System

This directory is the traceability layer for the KO/EN Tokenization Premium
frontend. It exists so that content, structure, and design can later be
debugged, redesigned, migrated and validated as **one coordinated operation**
instead of a series of unrelated edits.

It changes nothing. It observes, registers, and freezes.

## Why this exists

Ask anyone to point at a bug on this site today and they have to write this:

```
#hero > div.w-full.mx-auto.max-w-wide.space-y-16.sm\:space-y-20.my-auto
      > div.grid.grid-cols-1.lg\:grid-cols-12.gap-12.lg\:gap-16.items-start
      > div.lg\:col-span-7.space-y-8
      > div.pt-4.border-t.border-rule.flex.flex-wrap.items-center.gap-8.text-xs.font-mono.text-ink-body
      > div:nth-child(3)
```

That selector is made entirely of **styling** and **sibling position**. It
breaks the next time the design changes and it breaks the next time content is
added. It is not an address; it is a description of how something currently
looks and where it currently sits.

The same node in this system is **`HERO-044`**.

The four selectors that prompted this work all resolve, and each one names a
different failure:

| Pasted selector | Trace ID | Fault it exposed | State now |
|---|---|---|---|
| `…div.text-xs.font-mono.text-ink-muted.font-bold.uppercase.tracking-widest.mb-4` | `HERO-036` | `LABEL_ORPHAN` — a label with no tie to what it labels | hooked; label association still open |
| `header > div… > nav` | `NAV-006` | nav with no accessible name, links not a list | resolved — `nav[aria-label] > ul > li` |
| `…gap-8.text-xs.font-mono.text-ink-body > div:nth-child(3)` | `HERO-044` | a term/value pair with no class at all, reachable only by sibling index | resolved — `dl > dt + dd` |
| `button:nth-child(4) > span.flex.items-center.justify-between.text-xs.font-mono` | `PREM-034` | a term/value row whose halves are nested wrappers | hooked; `dl` conversion still open |

Measured across the rendered frontend:

| | |
|---|---|
| tracked content/structure nodes | **345** live (+ 57 in one dead file) |
| addressable only by their style signature | **231** |
| addressable only by sibling position | **103** |
| addressable stably | **11** — the section anchors, and nothing below them |
| `data-*` attributes in the entire codebase | **0** |
| numeric claims not owned by any entity | **22** (10 CRITICAL) |
| human-readable literals in widget JSX | **182** |
| semantic-structure gaps | **159** |

## The five ledgers

| File | Answers |
|---|---|
| [`TRACE_LEDGER.md`](TRACE_LEDGER.md) | Which exact node renders this? Everything, grouped by widget, with a Trace ID. |
| [`NUMERIC_CLAIMS.md`](NUMERIC_CLAIMS.md) | Which visible numbers are disputed, duplicated, or unlinked to any entity? |
| [`SEMANTIC_DOM.md`](SEMANTIC_DOM.md) | Which nodes need `dl/dt/dd`, `nav/ul/li`, `figure/figcaption`, heading continuity? |
| [`STABLE_HOOKS.md`](STABLE_HOOKS.md) | Which nodes depend on style-signature selectors, and what hook does each need? |
| [`DESIGN_APPLICATION.md`](DESIGN_APPLICATION.md) | Which typography, colour and layout roles are actually applied, and how many distinct signatures exist? |

Plus two authored plans:

| File | Purpose |
|---|---|
| [`REMEDIATION_BATCHES.md`](REMEDIATION_BATCHES.md) | The six batches, their order, and why that order. |
| [`DIRECTOR_DECISIONS.md`](DIRECTOR_DECISIONS.md) | The frozen queue. Nothing in it may be touched until it is answered. |

Machine-readable equivalents live in [`data/`](data/):

| File | Committed | Purpose |
|---|---|---|
| `trace-ledger.json` | yes | full records **and the Trace ID registry** — committing it is what keeps IDs stable |
| `trace-ledger.csv` | yes | flattened, for spreadsheets and `grep` |
| `entity-values.json` | yes | every value the content contract already owns |
| `raw-nodes.json` | no (gitignored) | unfiltered AST observation, ~1 MB; regenerate with step 1 |

## Trace IDs

`<WIDGET>-<NNN>` — e.g. `PREM-032`, `HERO-025`, `LANG-019`.

| Code | Rendering unit | Code | Rendering unit |
|---|---|---|---|
| `NAV` | StoryProgress (global header) | `INFRA` | KoreaAIContextSection |
| `HERO` | NewsHeroSection | `IMPACT` | ImpactSection |
| `CMP` | TokenCompareSection | `METH` | MethodSection |
| `PIPE` | PipelineSection | `CONC` | EditorialConclusionSection |
| `PREM` | TokenPremiumSection | `FOOT` | Footer |
| `BURD` | OccupationSection | `ART` | ArticleElements |
| `LANG` | MultilingualTokenEfficiencySection | `UI` | shared/ui primitives |
| `APP` | App shell | `DEAD` | MultilingualSection (not rendered) |

**IDs are stable and unique.** The identity key is deliberately
**element-agnostic** for content nodes: a node that renders text is keyed by
`(file, literal, collection, occurrence-ordinal)`, and only a node with no text
is keyed by its tag. An earlier scheme included the tag, and the B3 semantic
migration — `<span>` to `<dd>` — silently reminted six claim Trace IDs. A
content node's identity is its text, not the box it sits in.

`data/id-registry.json` is the pin: identity to Trace ID, append-only. An id
that has ever been issued is never handed to a different node, even after the
original disappears, because a recycled id silently retargets every document
citing it.

`tools/check-citations.mjs` runs as part of the pipeline and fails on any Trace
ID cited in prose that no longer exists. It was added after
`DIRECTOR_DECISIONS.md` was found citing fifteen ids that had never matched the
committed ledger.

## Hook values must not collide with Tailwind utilities

Tailwind v4 treats every source file as a template, including comments and
`data-*` attribute values. A hook value spelled like a real utility makes the
compiler emit a rule for it and moves the production CSS hash — which destroys
the one proof the hook phases rest on, that an attribute-only change cannot
alter a style.

Names that must never be used as a `data-role` or `data-semantic-target`
value (they are all real bare utilities): `list-item`, `block`, `inline`,
`flex`, `grid`, `table`, `hidden`, `contents`, `flow-root`, `inline-block`,
`inline-flex`, `inline-grid`, `inline-table`, `table-cell`, `table-row`.

This file is safe to list them in — `src/index.css` excludes `docs/audit` from
the scanner. A source comment is not safe: writing the list in
`src/shared/trace/types.ts` reintroduced the collision it was warning about.

After changing the vocabulary, rebuild and confirm the CSS hash is unchanged.

## Categories

Every item has exactly one **primary** category and may carry several others.

| Category | Meaning |
|---|---|
| `CONTENT` | renders human-readable text that lives in the widget rather than an entity |
| `NUMERIC_CLAIM` | renders a number that asserts something about the research |
| `DOM_STRUCTURE` | the markup does not express the structure of the data it shows |
| `STABLE_HOOK` | needs a style-independent address |
| `DESIGN_APPLICATION` | carries typography / colour / layout roles worth tracking |
| `DECISION_REQUIRED` | cannot be changed until the Director rules |

## How to use it

**"Which exact node renders this sentence?"**
Search the sentence in `TRACE_LEDGER.md`, or
`grep -i "…" docs/audit/data/trace-ledger.csv`. You get a Trace ID, file, and
line range.

**"Is this number safe to touch?"**
Look it up in `NUMERIC_CLAIMS.md`. If it is `CONTRADICTED — FROZEN` or
`UNLINKED`, it is in the Director queue and must not be changed, derived, or
explained.

**"What breaks if I restyle this?"**
`STABLE_HOOKS.md`, column *Addressing today*. Anything marked
`STYLE_SIGNATURE` has selectors, tests, or bug reports pointing at its class
string.

**"Where do I start?"**
`REMEDIATION_BATCHES.md`. Do not start anywhere else — the batches are ordered
so that each one makes the next one mechanical.

## Regenerating

```bash
node docs/audit/tools/extract-trace.mjs   # AST -> data/raw-nodes.json
node docs/audit/tools/build-ledger.mjs    # -> data/trace-ledger.{json,csv}
node docs/audit/tools/render-docs.mjs     # -> the five .md ledgers
```

Run all three after any remediation batch. The counts in this README and in
each ledger header are the progress metric: a batch is done when its numbers
move and nothing else does.

## What this system deliberately does NOT do

- It does not resolve any numeric mismatch, or derive a replacement value.
- It does not invent an explanation for any mismatch.
- It does not rewrite, normalise, or translate editorial copy.
- It does not delete content.
- It does not change DOM structure.
- It does not create a source of truth. Where the repository cannot answer a
  question, the ledger records that it cannot, and the question goes to the
  Director.

## Known limits of the observation

Stated so nobody over-trusts the numbers:

- **Static AST only.** No page was rendered and no browser was available, so
  `nth-child` indices are marked as *dependencies*, not computed. Computed
  colours, actual heading outline, and real focus order are unverified.
- **Primitive resolution is a lookup table.** `docs/audit/tools/extract-trace.mjs`
  maps each project primitive (`Container`, `SelectableCard`, …) to the DOM it
  emits. If a primitive's internals change, update that table or locator paths
  will drift.
- **`DL_PAIR` and `LIST` detection are heuristics** over shape, not intent.
  Each row is a candidate for a human to confirm, not a verdict.
- **Numeric-claim detection over-captures on purpose.** A bare digit is
  registered rather than dropped; tokenizer names, corpus names, figure
  numbers and years are separated out as identifiers. Omissions would be
  defects; over-capture is reviewable.
- **Entity linkage is value matching, not provenance.** "This number also
  appears in an entity" is not the same as "this number came from that
  entity." That distinction is exactly what the Director queue is for.
