/**
 * The stable hook vocabulary.
 *
 * These `data-*` attributes are **product structure, not test hooks**. They are
 * how a node is named: by what it *is*, not by how it currently looks or where
 * it currently sits among its siblings.
 *
 * Before them, the only way to address a node was its Tailwind class string
 * (which is the styling, so it dies at the next redesign) or `nth-child`
 * (which dies when content is added). See docs/audit/STABLE_HOOKS.md.
 *
 * ---------------------------------------------------------------------------
 * THE VOCABULARY
 * ---------------------------------------------------------------------------
 *
 * `data-widget`        the React unit that rendered this subtree, e.g.
 *                      "TokenPremiumSection". On the section root only.
 *
 * `data-section`       the story section id, matching the DOM anchor and
 *                      entities/navigation, e.g. "patterns". Section root only.
 *
 * `data-role`          what the node IS, in the design system's own words:
 *                      "eyebrow", "section-heading", "heading-accent",
 *                      "selectable", "token-chip", "figure-caption",
 *                      "section-nav", "stat", "legend", "article-lead", …
 *                      This is the workhorse — it replaces class-signature
 *                      addressing for every node that has a named role.
 *
 * `data-collection`    the entity collection a repeated node was rendered from,
 *                      e.g. "domain-distribution". On the list container.
 * `data-item-id`       the item's own id within that collection. On each item.
 *                      Together these make every row of every list addressable
 *                      without counting siblings.
 *
 * `data-claim-id`      the key of a visible research claim in the claim
 *                      catalogue (shared/trace/claims.ts).
 * `data-claim-status`  "resolved" | "frozen" | "decision-required".
 *                      Lets anyone count unresolved claims from the rendered
 *                      page: `document.querySelectorAll('[data-claim-status="decision-required"]')`.
 * `data-trace-id`      cross-reference into docs/audit/TRACE_LEDGER.md, so a
 *                      node in the browser and a row in the ledger are the same
 *                      thing.
 *
 * `data-source`        who owns the rendered text right now:
 *                      "entity"   — read from src/entities
 *                      "registry" — read from the central claim/copy registry
 *                      "widget"   — still hardcoded in JSX
 *                      "unknown"  — provenance not established
 *                      This makes the content-migration backlog countable from
 *                      the DOM alone, with no file reading:
 *                      `document.querySelectorAll('[data-source="widget"]')`.
 *
 * `data-i18n-owner`    which module owns this subtree's bilingual strings.
 *
 * `data-design-role`   the named typography/colour role applied, once those are
 *                      formalised (B5). Absent until then rather than guessed.
 *
 * `data-semantic-target` the semantic element this node should become, recorded
 *                      in the DOM while it is still a div/span, so the B3
 *                      backlog is visible in the browser too.
 */

/** Whether a visible research claim can be changed yet. */
export type ClaimStatus = 'resolved' | 'frozen' | 'decision-required';

/** Who owns the string a node renders, right now. */
export type ContentSource = 'entity' | 'registry' | 'widget' | 'unknown';

/**
 * Semantic elements a node is scheduled to become in B3. Recorded as a hook so
 * the remediation backlog is inspectable in the browser, not only in the docs.
 */
export type SemanticTarget = 'dl' | 'ul' | 'figure' | 'nav-list' | 'heading';
