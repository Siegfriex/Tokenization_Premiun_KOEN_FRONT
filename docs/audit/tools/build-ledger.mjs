/**
 * Trace ledger builder.
 *
 * Turns the raw AST observation (raw-nodes.json) into the trace system:
 * stable IDs, categories, mismatch status, semantic-gap findings, design-role
 * mapping, risk, and remediation batch assignment.
 *
 *   node docs/audit/tools/build-ledger.mjs
 *
 * Trace IDs are STABLE: on re-run, an existing id is reused for any node that
 * still matches on (file, jsxTag, literalText, mapOver). Only genuinely new
 * nodes get new ids. The committed trace-ledger.json is the registry.
 *
 * This tool RESOLVES NOTHING. Every numeric mismatch it finds is recorded as
 * frozen, pending Director decision.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA = path.join(ROOT, 'docs/audit/data');
const raw = JSON.parse(fs.readFileSync(path.join(DATA, 'raw-nodes.json'), 'utf8'));
const entityValues = JSON.parse(fs.readFileSync(path.join(DATA, 'entity-values.json'), 'utf8'));

const WIDGET_CODE = {
  'NewsHeroSection': 'HERO', 'StoryProgress': 'NAV', 'TokenCompareSection': 'CMP',
  'PipelineSection': 'PIPE', 'TokenPremiumSection': 'PREM', 'OccupationSection': 'BURD',
  'MultilingualTokenEfficiencySection': 'LANG', 'KoreaAIContextSection': 'INFRA',
  'ImpactSection': 'IMPACT', 'MethodSection': 'METH', 'EditorialConclusionSection': 'CONC',
  'Footer': 'FOOT', 'ArticleElements': 'ART', 'App': 'APP', 'MultilingualSection': 'DEAD',
  'SelectableCard': 'UI', 'TokenChip': 'UI', 'SectionHeading': 'UI', 'Container': 'UI',
  'Section': 'UI', 'Stack': 'UI', 'Cluster': 'UI', 'Divider': 'UI', 'LanguageSwitch': 'LSW',
};
const SECTION_OF = {
  HERO: 'S0 Cover / Thesis', NAV: 'Global header', CMP: 'S1 Quick Compare Lab',
  PIPE: 'S2 Processing Pipeline', PREM: 'S3 Token Premium & Domains',
  BURD: 'S4 Occupations & Accumulated Burden', LANG: 'S4.5 Global Multilingual Efficiency',
  INFRA: 'S5 Korea AI Infrastructure', IMPACT: 'S5.2 Socioeconomic Implications',
  METH: 'S6 Methodology & Limits', CONC: 'RESULT Editorial Conclusion', FOOT: 'Footer',
  ART: 'Editorial typography layer', APP: 'Composition shell', DEAD: '(dead file, not rendered)',
  UI: 'shared/ui primitives', LSW: 'Language switch feature',
};
const widgetOf = (file) => path.basename(file, '.tsx');
const codeOf = (file) => WIDGET_CODE[widgetOf(file)] ?? 'MISC';

/* ---------------------------------------------------------------- *
 * Observed contradictions between rendered markup and entity data.
 * OBSERVATION ONLY — no value is resolved, explained, or replaced here.
 * ---------------------------------------------------------------- */
const OBSERVED_CONTRADICTIONS = [
  { severity: 'CONTRADICTS', match: '7 Benchmark', file: 'TokenPremiumSection',
    observed: 'markup renders "7 Benchmark Domains"',
    entity: 'DOMAIN_DISTRIBUTION_DATA has 6 entries (domain-distribution.ts:10-53)' },
  { severity: 'CONTRADICTS', match: 'Max Observed: 1.83', file: 'TokenPremiumSection',
    observed: 'markup renders "Max Observed: 1.83×" directly under the chart',
    entity: 'highest ratio in DOMAIN_DISTRIBUTION_DATA is 1.75 (public-municipal-web)' },
  { severity: 'CONTRADICTS', match: 'Business (1.44', file: 'TokenPremiumSection',
    observed: 'markup renders "Domain Range: Business (1.44×) ~ Daily (1.83×)"',
    entity: 'no domain with id/label "Business" exists; "Colloquial / Daily" has ratio 1.38' },
  { severity: 'CONTRADICTS', match: '1.68', file: 'TokenPremiumSection',
    observed: 'markup renders "Average Token Premium: 1.68× (+68%)"',
    entity: 'arithmetic mean of the 6 entity ratios is 1.513; no entity holds 1.68' },
  { severity: 'CONTRADICTS', match: '1.29', file: 'TokenPremiumSection',
    observed: 'markup renders the headline range "1.29× ~ 1.83×"',
    entity: 'entity ratio range is 1.13 – 1.75' },
  { severity: 'CONTRADICTS', match: '31 TOKENS', file: 'NewsHeroSection',
    observed: 'markup renders "31 TOKENS" for the Korean exhibit row',
    entity: 'no CURATED_PAIRED_SENTENCES entry has hangulCount 31; TOKEN_BASELINE_SIMULATION.baseKoPerPrompt is 31' },
  { severity: 'CONTRADICTS', match: '18 TOKENS', file: 'NewsHeroSection',
    observed: 'markup renders "18 TOKENS" for the English exhibit row',
    entity: 'no paired-sentence entry pairs 31 with 18; TOKEN_BASELINE_SIMULATION.baseEnPerPrompt is 24' },
  { severity: 'CONTRADICTS', match: '+72%', file: 'NewsHeroSection',
    observed: 'markup renders "1.72× (+72% Difference)" as the hero exhibit ratio',
    entity: 'derived from the 31/18 pair above, which is itself unlinked' },
  { severity: 'DUPLICATED', match: '+78%', file: 'NewsHeroSection',
    observed: 'markup renders "+78% Hangul Token Burden" in the stat ribbon',
    entity: 'MULTILINGUAL_COMPARISON_DATA ko.differencePercent is 78 — value agrees, ownership does not' },
  { severity: 'DUPLICATED', match: '1.78', file: 'MultilingualTokenEfficiencySection',
    observed: 'markup hardcodes "1.78배" and "한국어 한글 (1.78×)"',
    entity: 'MULTILINGUAL_COMPARISON_DATA ko.relativeRatio is 1.78 — value agrees, ownership does not' },
  { severity: 'CONTRADICTS', match: 'NAV_SECTIONS', file: 'StoryProgress',
    observed: 'header nav renders one entry per NAV_SECTIONS item (9)',
    entity: 'App.tsx mounts 10 anchored sections; id="infrastructure" has no nav entry' },
  { severity: 'CONTRADICTS', match: '1.00×', file: 'TokenPremiumSection',
    observed: 'markup renders "Baseline: 1.00× (English)" and "1.00× (Standard)"',
    entity: 'no baseline row exists in DOMAIN_DISTRIBUTION_DATA' },
];

const NOISE_KINDS = new Set(['year', 'identifier', 'label-ordinal']);

/**
 * Rendered counts checked against the length of the entity array they describe.
 *
 * A MATCH here is NOT verification. The markup still hardcodes the number and
 * does not read the array, so the two agree today by coincidence and will
 * diverge silently the moment the array changes. A coincidence is exactly the
 * failure mode this ledger exists to catch, so a matching count is recorded as
 * UNLINKED with the coincidence noted — never as "verified".
 */
const COUNT_CHECKS = [
  { match: '6 Key Principles', file: 'MethodSection', entity: 'WHAT_WE_DO_NOT_CLAIM', length: 6, rendered: 6 },
  { match: '7 Benchmark Domains', file: 'TokenPremiumSection', entity: 'DOMAIN_DISTRIBUTION_DATA', length: 6, rendered: 7 },
];

/* ---------------------------------------------------------------- *
 * Parent/child reconstruction from document order
 * ---------------------------------------------------------------- */
const byFile = new Map();
for (const r of raw) {
  if (!byFile.has(r.file)) byFile.set(r.file, []);
  byFile.get(r.file).push(r);
}
for (const rows of byFile.values()) {
  for (let i = 0; i < rows.length; i++) {
    const a = rows[i];
    a._children = [];
    for (let j = i + 1; j < rows.length && rows[j].line <= a.endLine; j++) {
      if (rows[j].depth === a.depth + 1) a._children.push(rows[j]);
    }
  }
  // nearest enclosing element = the parent
  for (const a of rows) {
    a._parent = null;
    for (const b of rows) {
      if (b === a) continue;
      if (b.depth === a.depth - 1 && b.line <= a.line && a.endLine <= b.endLine) a._parent = b;
    }
  }
}

/* ---------------------------------------------------------------- *
 * Semantic-gap rules
 * ---------------------------------------------------------------- */
function semanticGap(r) {
  const cls = new Set(r.classTokens);
  const kids = r._children ?? [];
  const litKids = kids.filter((k) => k.literalText);

  // Already the right element -> no gap. Without these the ledger cannot show
  // B3 progress: a converted <li> would keep reporting the LIST gap forever.
  if (['li', 'ul', 'ol', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'table', 'tr', 'th', 'td'].includes(r.domTag)) return null;
  if (r.domTag === 'nav') {
    const named = r.ariaAttrs?.includes('aria-label');
    const hasList = (r._children ?? []).some((k) => k.domTag === 'ul' || k.domTag === 'ol');
    if (named && hasList) return null;
  }
  if (r._parent && ['ul', 'ol', 'dl'].includes(r._parent.domTag)) return null;

  // chart / figure caption — only if it is not already a <figcaption>
  if (r.jsxTag === 'ArticleFigureCaption' && r.domTag !== 'figcaption')
    return { gap: 'FIGURE', want: '<figure> wrapping the chart + <figcaption> for this caption',
             why: 'a caption is currently a sibling <div>, with no programmatic tie to the chart it describes' };

  // navigation
  if (r.domTag === 'nav')
    return { gap: 'NAV_LIST', want: '<nav aria-label="…"><ul><li><a>',
             why: 'nav has no accessible name and its links are not marked up as a list' };

  // repeated collection rendered as anonymous siblings.
  // Only the OUTERMOST node of the .map() callback is the list item; its
  // descendants inherit the problem but are not separately actionable.
  //
  // Prose is not a list. A sequence of <p> rendered from a paragraph array is
  // correct semantics already — wrapping article body copy in <ul>/<li> would
  // be actively wrong, and an earlier revision of this rule reported 36 such
  // false positives. Chart primitives are excluded for the same reason: a
  // Recharts <Cell> is SVG, not a list item.
  const PROSE = ['ArticleParagraph', 'ArticleLead', 'ArticleSubheading', 'ArticlePullQuote'];
  const CHART = ['Cell', 'Bar', 'XAxis', 'YAxis', 'ReferenceLine', 'Tooltip'];
  const isProse = PROSE.includes(r.jsxTag) || r.domTag === 'p';
  const isChart = CHART.includes(r.jsxTag);
  const isListRoot = r.mapOver && r._parent?.mapOver !== r.mapOver;
  if (isListRoot && !isProse && !isChart && !['li', 'tr', 'option'].includes(r.domTag))
    return { gap: 'LIST', want: `<ul>/<li> (or <ol>) around the ${r.mapOver} collection`,
             why: `renders one item of a collection (${r.mapOver}) but neither it nor its parent is a list` };

  // label : value pair.
  // Deliberately NOT conditioned on a class string: the worst instances are
  // wrappers with no className at all, reachable only as div:nth-child(n) —
  // e.g. the hero stat ribbon's three items. Requiring `flex` hid exactly the
  // nodes this ledger exists to surface.
  if (litKids.length >= 2) {
    const first = litKids[0].literalText.trim();
    const looksLikeLabel =
      /[:：]$/.test(first) ||                          // "Relative Ratio:"
      (/^[A-Z0-9 &/.\-]+$/.test(first) && first.length <= 40) || // "OBSERVED GAP"
      cls.has('justify-between');
    if (looksLikeLabel && litKids.length <= 4)
      return { gap: 'DL_PAIR', want: '<dl><dt>label</dt><dd>value</dd></dl>',
               why: 'a term/value pair rendered as anonymous boxes, addressable only by sibling position' };
  }

  // Same pattern one level up: a justify-between row whose two halves are
  // themselves wrappers, so neither has a *direct* literal. The selectable-card
  // meta rows are all of this shape.
  if (cls.has('justify-between')) {
    // Children may render entity-driven expressions rather than literals, so
    // the presence of text is NOT the test — the two-column term/value shape is.
    if (kids.length >= 2 && kids.length <= 4)
      return { gap: 'DL_PAIR', want: '<dl><dt>label</dt><dd>value</dd></dl>',
               why: 'a term/value row whose halves are nested wrappers — no node in the chain carries an address' };
  }

  // eyebrow with no relationship to what it labels
  if (r.jsxTag === 'SectionEyebrow' || (cls.has('uppercase') && cls.has('tracking-widest') && r.literalText))
    return { gap: 'LABEL_ORPHAN', want: 'id + aria-labelledby, or move inside the labelled region',
             why: 'a label with no programmatic relationship to the content it labels' };

  // headings
  if (/^h[1-6]$/.test(r.domTag))
    return { gap: 'HEADING_LEVEL', want: 'verify level continuity within its section',
             why: 'heading level is set per widget with no document-wide outline check' };

  return null;
}

/* ---------------------------------------------------------------- *
 * Hook recommendation
 * ---------------------------------------------------------------- */
function recommendHook(r, claims) {
  if (r.hasId) return null;
  if (claims.length) return `data-metric="…"  (+ data-source="entity|widget")`;
  if (r.mapOver) {
    const src = r.mapOver.replace(/\W+/g, '-').toLowerCase().replace(/^-|-$/g, '');
    return `data-collection="${src}" data-item-id="{item.id}"`;
  }
  if (r.domTag === 'nav') return 'data-role="section-nav"';
  if (r.jsxTag === 'SelectableCard') return 'data-role="selectable" data-selected="{selected}"';
  if (r.jsxTag === 'TokenChip') return 'data-role="token-chip" data-lang="ko|en"';
  if (r.jsxTag === 'ArticleFigureCaption') return 'data-role="figure-caption" data-figure="{figNum}"';
  if (r.jsxTag === 'SectionEyebrow') return 'data-role="eyebrow"';
  if (r.jsxTag === 'SectionHeading' || /^h[1-6]$/.test(r.domTag)) return 'data-role="section-heading"';
  if (r.literalText) return 'data-role="…"';
  return null;
}

/* ---------------------------------------------------------------- *
 * Build items
 * ---------------------------------------------------------------- */
const prevPath = path.join(DATA, 'trace-ledger.json');
const prev = fs.existsSync(prevPath) ? JSON.parse(fs.readFileSync(prevPath, 'utf8')) : { items: [] };
/**
 * IDENTITY KEY — element-agnostic for content nodes.
 *
 * The key used to include jsxTag. That made every semantic refactor remint the
 * ids of the nodes it touched: B3 changed <span> to <dd> on six claim rows and
 * six Trace IDs silently moved, which is the opposite of what a trace id is
 * for. A content node's identity is its text, not the box it sits in.
 *
 * So: a node that renders a literal is keyed by that literal. A node that does
 * not is keyed by its tag, because it has nothing else. The trailing ordinal
 * disambiguates genuinely identical siblings (Footer's three headings).
 */
const identityOf = (r) => {
  const base = r.literalText
    ? `${r.file}|LIT|${r.literalText}|${r.mapOver ?? ''}`
    : `${r.file}|TAG|${r.jsxTag}|${r.mapOver ?? ''}`;
  return base;
};

/**
 * The pinned id registry. docs/audit/data/id-registry.json is authoritative:
 * it maps identity -> Trace ID and is what keeps ids stable across refactors.
 * The previous ledger is only a fallback for a fresh checkout.
 */
const regPath = path.join(DATA, 'id-registry.json');
const registry = fs.existsSync(regPath) ? JSON.parse(fs.readFileSync(regPath, 'utf8')) : {};
const prevById = new Map(Object.entries(registry));
for (const i of prev.items) if (i.identityKey && !prevById.has(i.identityKey)) prevById.set(i.identityKey, i.traceId);
const counters = {};
const keySeen = {};
const usedIds = new Set(prevById.values());

const items = [];
for (const r of raw) {
  const claims = r.numericClaims.filter((c) => !NOISE_KINDS.has(c.kind));
  const notes = r.numericClaims.filter((c) => NOISE_KINDS.has(c.kind));
  const gap = semanticGap(r);
  const hook = recommendHook(r, claims);
  const hasContent = !!r.literalText;
  const structural = !!gap;
  const designed = r.roles.typography.length || r.roles.colour.length;

  // Meaningful content-bearing or structure-bearing nodes enter the ledger —
  // and so does anything carrying a stable hook, even once its gap is closed.
  // Without that last clause a node DROPS OUT of the ledger the moment it is
  // fixed: the nav and the hero stat rows vanished after B3, so there was no
  // way to confirm from the ledger that they had been repaired rather than
  // deleted. A control plane must be able to show its own successes.
  const hooked = r.dataAttrs.length > 0;
  if (!hasContent && !structural && !claims.length && !hooked && !(r.hasId && r.domTag === 'section')) continue;

  const code = codeOf(r.file);
  const baseKey = identityOf(r);
  const ord = (keySeen[baseKey] = (keySeen[baseKey] ?? -1) + 1);
  const key = `${baseKey}|${ord}`;
  let traceId = prevById.get(key);
  if (!traceId) {
    // A new id must never reuse one the registry already pinned, even for a
    // node that has since disappeared — a recycled Trace ID is worse than a
    // missing one, because every doc citing it silently retargets.
    counters[code] = (counters[code] ?? 0) + 1;
    traceId = `${code}-${String(counters[code]).padStart(3, '0')}`;
    while (usedIds.has(traceId) || items.some((i) => i.traceId === traceId)) {
      counters[code]++; traceId = `${code}-${String(counters[code]).padStart(3, '0')}`;
    }
  }
  usedIds.add(traceId);

  // primary category
  let primary = 'DESIGN_APPLICATION';
  if (claims.length) primary = 'NUMERIC_CLAIM';
  else if (hasContent) primary = 'CONTENT';
  else if (structural) primary = 'DOM_STRUCTURE';

  const categories = new Set([primary]);
  if (hasContent) categories.add('CONTENT');
  if (claims.length) categories.add('NUMERIC_CLAIM');
  if (gap) categories.add('DOM_STRUCTURE');
  if (hook) categories.add('STABLE_HOOK');
  if (designed) categories.add('DESIGN_APPLICATION');

  // entity linkage
  const entityHits = [];
  for (const c of claims) {
    const bare = c.value.replace(/[^\d.]/g, '');
    if (bare && entityValues.numbers[bare]) entityHits.push({ value: c.value, at: entityValues.numbers[bare].slice(0, 3) });
  }
  const literalOwned = r.literalText && entityValues.strings[r.literalText] ? entityValues.strings[r.literalText].slice(0, 2) : null;

  const contradiction = OBSERVED_CONTRADICTIONS.find(
    (c) => r.file.includes(c.file) && r.literalText.includes(c.match)
  );

  const countCheck = COUNT_CHECKS.find((c) => r.file.includes(c.file) && r.literalText.includes(c.match));

  let mismatch = 'N/A';
  if (countCheck && countCheck.rendered === countCheck.length) {
    mismatch = `UNLINKED — count coincides with ${countCheck.entity}.length (${countCheck.length}) but is not read from it`;
  } else if (claims.length) {
    if (contradiction) mismatch = contradiction.severity === 'DUPLICATED'
      ? 'DUPLICATED — value agrees, ownership is widget-side'
      : 'CONTRADICTED — FROZEN';
    else if (entityHits.length) mismatch = 'VALUE_PRESENT_IN_ENTITY (ownership still widget-side)';
    else mismatch = 'UNLINKED — no entity holds this value';
  }

  const decisionRequired = mismatch.startsWith('CONTRADICTED') || mismatch.startsWith('UNLINKED');
  const countNote = countCheck
    ? `rendered ${countCheck.rendered} vs ${countCheck.entity}.length ${countCheck.length}`
    : null;

  let risk = 'LOW';
  if (r.unresolvedSpread) risk = 'UNTRUSTED (unresolved spread)';
  else if (mismatch.startsWith('CONTRADICTED')) risk = 'CRITICAL';
  else if (mismatch.startsWith('DUPLICATED')) risk = 'HIGH';
  else if (mismatch.startsWith('UNLINKED')) risk = 'HIGH';
  else if (claims.length) risk = 'HIGH';
  else if (hasContent && !literalOwned && !r.isDeadFile) risk = 'MEDIUM';
  else if (gap && ['NAV_LIST', 'FIGURE', 'LIST'].includes(gap.gap)) risk = 'MEDIUM';
  if (r.isDeadFile) risk = 'DEFERRED (dead file)';

  let batch = 'B5-design-roles';
  if (decisionRequired) batch = 'B1-numeric-freeze';
  else if (claims.length) batch = 'B1-numeric-freeze';
  else if (gap) batch = 'B3-semantic-dom';
  else if (hasContent && !literalOwned) batch = 'B4-content-migration';
  else if (hook) batch = 'B2-stable-hooks';
  if (r.isDeadFile) batch = 'B6-dead-code';

  items.push({
    traceId,
    identityKey: key,
    primaryCategory: primary,
    categories: [...categories],
    widget: widgetOf(r.file),
    section: SECTION_OF[code] ?? '(unclassified)',
    file: r.file,
    lines: r.line === r.endLine ? `${r.line}` : `${r.line}-${r.endLine}`,
    jsxTag: r.jsxTag,
    domTag: r.domTag,
    locator: r.locator,
    locatorPath: r.locatorPath,
    // An unresolvable spread outranks every other signal. The node may or may
    // not carry hooks; the tool cannot see, and saying "STABLE" here would be
    // the same guess that caused the incident.
    addressing: r.unresolvedSpread ? 'UNRESOLVED_SPREAD'
      : r.hasId ? 'STABLE (id)'
      : r.dataAttrs.length ? 'STABLE (data-*)'
      : r.classTokens.length ? 'STYLE_SIGNATURE'
      : 'NTH_CHILD_ONLY',
    unresolvedSpread: r.unresolvedSpread ?? null,
    literal: r.literalText,
    mapOver: r.mapOver,
    numericClaims: claims,
    numericNotes: notes,
    entityLinkedValues: entityHits,
    entityOwnedLiteral: literalOwned,
    mismatchStatus: mismatch,
    contradiction: contradiction ? { severity: contradiction.severity, observed: contradiction.observed, entity: contradiction.entity } : null,
    countCheck: countNote,
    directorDecisionRequired: decisionRequired,
    semanticGap: gap?.gap ?? null,
    recommendedSemantics: gap?.want ?? null,
    semanticWhy: gap?.why ?? null,
    recommendedHook: hook,
    typographyRole: r.roles.typography,
    colorRole: r.roles.colour,
    layoutRole: [...r.roles.layout, ...r.roles.shape],
    relatedPrimitive: r.tagKind === 'primitive' ? r.jsxTag : null,
    risk,
    batch,
    deadFile: r.isDeadFile,
  });
}

/* ---------------------------------------------------------------- *
 * Emit
 * ---------------------------------------------------------------- */
const out = { generatedFrom: 'docs/audit/tools/extract-trace.mjs + build-ledger.mjs', itemCount: items.length, items };
fs.writeFileSync(prevPath, JSON.stringify(out, null, 1));

// Persist the pin. Every id ever issued stays in the registry, including for
// nodes that no longer exist, so it can never be handed to a different node.
const nextRegistry = { ...registry };
for (const i of items) nextRegistry[i.identityKey] = i.traceId;
fs.writeFileSync(regPath, JSON.stringify(Object.fromEntries(Object.entries(nextRegistry).sort()), null, 1));

const CSV_COLS = ['traceId','primaryCategory','categories','widget','section','file','lines','jsxTag','domTag','addressing','locator','literal','mapOver','numericClaims','mismatchStatus','directorDecisionRequired','semanticGap','recommendedSemantics','recommendedHook','typographyRole','colorRole','layoutRole','relatedPrimitive','risk','batch'];
const esc = (v) => {
  const s = Array.isArray(v) ? v.map((x) => (typeof x === 'object' ? `${x.kind}:${x.value}` : x)).join(' ') : v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
fs.writeFileSync(path.join(DATA, 'trace-ledger.csv'),
  [CSV_COLS.join(','), ...items.map((i) => CSV_COLS.map((c) => esc(i[c])).join(','))].join('\n'));

const by = (fn) => items.reduce((m, i) => ((m[fn(i)] ??= []).push(i), m), {});
console.log('ledger items:', items.length);
console.log('by primary  :', Object.entries(by((i) => i.primaryCategory)).map(([k, v]) => `${k}=${v.length}`).join('  '));
console.log('by risk     :', Object.entries(by((i) => i.risk)).map(([k, v]) => `${k}=${v.length}`).join('  '));
console.log('by batch    :', Object.entries(by((i) => i.batch)).map(([k, v]) => `${k}=${v.length}`).join('  '));
console.log('by addressing:', Object.entries(by((i) => i.addressing)).map(([k, v]) => `${k}=${v.length}`).join('  '));
console.log('semantic gaps:', Object.entries(by((i) => i.semanticGap ?? '-')).map(([k, v]) => `${k}=${v.length}`).join('  '));
console.log('director queue:', items.filter((i) => i.directorDecisionRequired && !i.deadFile).length);
const unresolved = items.filter((i) => i.unresolvedSpread && !i.deadFile);
console.log('UNRESOLVED_SPREAD:', unresolved.length, unresolved.length ? '<-- ledger cannot be trusted for these nodes' : '(clean)');
