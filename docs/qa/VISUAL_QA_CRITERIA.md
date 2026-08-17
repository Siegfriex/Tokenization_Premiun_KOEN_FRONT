# Visual QA Criteria

Everything the audit pipeline in `docs/audit/` verifies (traceability,
numeric-claim governance, semantic DOM, CSS-hash neutrality) is **static
analysis** — it proves "nothing changed vs a known-good state," not "the
rendered page is actually correct." It cannot see clipped text, an
overlapping element, a broken interaction state, or a layout that only
breaks at one specific viewport. Two real bugs of exactly that kind
(`TokenPremiumSection`'s headline-range overflow, `StoryProgress`'s nav
wrapping) shipped through that pipeline clean and were only caught by
actually rendering the page — see `2d08285`.

This document is the checklist that closes that gap. It is checked by
**rendering the page and measuring it**, not by reading source.

## How every criterion below is actually checked

```js
// per-element: no child may render outside its own box
const overflow = await el.evaluate((node) => {
  const r = node.getBoundingClientRect();
  for (const child of node.querySelectorAll('*')) {
    const cr = child.getBoundingClientRect();
    if (cr.right > r.right + 1 || cr.bottom > r.bottom + 1) return { tag: child.tagName, text: child.textContent?.slice(0,40) };
  }
  return null;
});
```

Full driver: `/tmp/qa-tools/qa_shot.mjs` (session-local, not committed —
`npx playwright` + the cached Chromium at `~/.cache/ms-playwright`). Every
loop iteration re-launches `npm run dev`, drives headless Chromium at
**1440×1000** (desktop / lg breakpoint, where both prior bugs lived) and
**390×844** (mobile), and screenshots + measures against the rules below.

## C1 — No element may overflow its own container

`scrollWidth === clientWidth` and `scrollHeight === clientHeight` for every
card/box-role element (`data-role="stat"`, any `bg-surface`/`bg-surface-alt`
card wrapper, `SelectableCard` instances). A child's `getBoundingClientRect()`
must never exceed its parent's on any axis.

*Caught by this rule: the `text-8xl` headline-range clip.*

## C2 — No text may wrap where a fixed-height container assumes one line

Any element inside a `h-*`-constrained container (the `h-14` header, a
button, a badge/pill) must render its content within that height at 1440px
**and** 390px. If content can legitimately vary in length (bilingual labels,
KO vs EN), test both languages.

*Caught by this rule: the nav's 10-item wrap inside `header`'s `h-14`.*

**Detection note (learned iteration 2):** check only elements whose class
list matches an *explicit* Tailwind fixed-height utility (`/(^|\s)h-\d/` —
`h-14`, `h-2`, not `h-full`/`min-h-*`/`max-h-*`/no height class at all).
`getComputedStyle(el).height` on a plain text leaf equals its natural
content height almost by definition, so comparing that against
`scrollHeight` flags 3–6px of ordinary line-height/glyph-metric rounding as
"overflow" on nearly every large-type element (`text-6xl`, `text-8xl`,
etc.) — eleven false positives on the first pass, zero real bugs. Only a
*declared* fixed height is a real constraint the content can violate.

## C3 — An active/selected visual state must fully cover its content

Wherever a `bg-accent`/`bg-on-accent`-class "selected" background exists
(`SelectableCard`, nav active pill, chart legend), the background box must
contain 100% of that element's rendered text — not just the first line if
the text wraps. Screenshot the resting AND selected/active state of every
interactive element that has one; a class name existing in source is not
evidence the state renders correctly.

## C4 — One card/container shape per structural role

Per `docs/DESIGN_AUDIT.md`'s original finding (still true — see
`docs/audit/DESIGN_APPLICATION.md`'s signature count), `bg-surface border
border-rule rounded-xs p-* shadow-xs`-style wrappers are hand-assembled per
call site rather than drawn from one primitive. This is not itself a visible
bug, but it is *why* C1/C2 bugs are invisible to grep: 34+ near-identical
card class strings mean a padding/font-size mismatch in one has no
mechanical way to be compared against the others. Track new instances in
`docs/audit/DESIGN_APPLICATION.md` (already generated); do not hand-roll a
new card shape without checking whether an existing signature already
covers the need.

## C5 — Typography scale must resolve, not just fit

A `text-{n}xl` step chosen for a full-viewport-width element must be
re-verified at the narrowest column it actually renders in — `lg:text-8xl`
inside a `lg:col-span-5` is not the same available width as `lg:text-8xl`
inside a full-bleed section. Any oversized display number (`font-black`,
`text-5xl` or larger) must be checked at every breakpoint where its
*container* — not the viewport — changes width.

## C6 — Responsive: no horizontal document scroll at 390px or 1440px

`document.documentElement.scrollWidth === document.documentElement.clientWidth`
at both viewports. This is the single cheapest global smoke check and runs
every loop iteration before anything targeted.

## C7 — Interaction states are screenshotted, not inferred from class names

For every `SelectableCard`/button-role element with `aria-pressed` or
`data-active`: click it (or set the state), screenshot, confirm C1–C3 still
hold in the *changed* state. A structural pass that only screenshots the
default render misses exactly the class of bug both fixes in `2d08285`
belonged to (the nav bug only appears in the *active* pill).

## Known-clean baseline (do not re-flag without new evidence)

- Domain-distribution `SelectableCard` list (`#patterns` right column) —
  screenshotted resting + selected at 1440px, no overflow, font-weight
  pairing reads correctly. If a future pass disagrees, screenshot first,
  don't trust the earlier note over new evidence — but don't re-litigate
  without one.
- Mobile (390px) document-level horizontal scroll — clean as of `2d08285`.

## What this checklist does NOT cover

- Colour contrast / accessibility computed-style checks (would need
  `axe-core` injected into the Playwright page — not wired up yet, candidate
  for a future criterion, not silently assumed clean).
- Cross-browser (Chromium only — no Firefox/Safari engine available here).
- Real device / real network conditions.

## Log

Every loop iteration appends one entry to `docs/qa/LOOP_LOG.md` — commit SHA,
what was checked, what was found, what was fixed, pass/fail per criterion.
That log is the rollback index: `git revert <sha>` or `git reset --hard
<sha before the iteration you want to undo>` on `repair/control-plane-integrity`.
