/**
 * Frontend trace extractor.
 *
 * Walks the JSX AST of every rendering file and emits one record per JSX
 * element, with the literals it directly renders, the design roles encoded in
 * its class string, how it can currently be addressed, and what it would take
 * to address it stably.
 *
 * This is deliberately an *observation* tool. It changes nothing. Re-run it
 * after any remediation batch to see the ledger move.
 *
 *   node docs/audit/tools/extract-trace.mjs
 *
 * Outputs:
 *   docs/audit/data/trace-ledger.json   full records
 *   docs/audit/data/trace-ledger.csv    same, flattened for spreadsheets
 *   docs/audit/data/entity-values.json  every numeric/string value entities own
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs/audit/data');

/* ------------------------------------------------------------------ *
 * 1. Which files render DOM
 * ------------------------------------------------------------------ */
function walkDir(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(p, acc);
    else if (/\.tsx$/.test(e.name)) acc.push(p);
  }
  return acc;
}
const RENDER_FILES = walkDir(path.join(ROOT, 'src')).sort();

/* ------------------------------------------------------------------ *
 * 2. Project primitives -> the DOM they actually emit
 *    Without this the locator chain would say "<Container>", but the browser
 *    (and anyone pasting a selector from devtools) sees "div.w-full.mx-auto…".
 * ------------------------------------------------------------------ */
const PRIMITIVE_DOM = {
  Container: { role: 'container', tag: 'div', base: 'w-full mx-auto max-w-{variant}', note: '+ px-4 sm:px-6 lg:px-12 when gutter' },
  Section: { tag: 'section', base: 'py-* bg-* border-b border-rule scroll-mt-12' },
  Stack: { tag: 'div', base: 'space-y-*' },
  Cluster: { tag: 'div', base: 'flex flex-wrap items-* gap-*' },
  Divider: { role: 'divider', tag: 'hr', base: 'border-t border-rule' },
  SelectableCard: { role: 'selectable', tag: 'button', base: 'rounded-xs border transition-all cursor-pointer focus-visible:*' },
  TokenChip: { role: 'token-chip', tag: 'span', base: 'inline-flex items-center px-2.5 py-1 rounded-xs bg-surface-alt …' },
  SectionEyebrow: { role: 'eyebrow', tag: 'div', base: 'text-xs font-mono text-ink-muted font-bold uppercase tracking-widest' },
  SectionHeading: { role: 'section-heading', tag: 'div', base: 'space-y-4 max-w-4xl', note: 'wraps SectionEyebrow div + h2' },
  HeadingAccent: { role: 'heading-accent', tag: 'span', base: 'underline decoration-accent underline-offset-8 decoration-2' },
  ArticleReadingColumn: { role: 'reading-column', tag: 'div', base: 'w-full mx-auto max-w-reading text-left' },
  ArticleFullWidthBreak: { role: 'full-width-break', tag: 'div', base: 'w-full mx-auto max-w-wide my-12 sm:my-16' },
  ArticleLead: { role: 'article-lead', tag: 'p', base: 'text-xl sm:text-2xl text-ink font-medium leading-[1.6]' },
  ArticleParagraph: { role: 'article-paragraph', tag: 'p', base: 'text-[17px] sm:text-[18px] text-ink-strong leading-[1.85]' },
  ArticleSubheading: { role: 'article-subheading', tag: 'h3', base: 'text-2xl sm:text-3xl lg:text-[32px] font-bold text-ink' },
  ArticlePullQuote: { role: 'article-pullquote', tag: 'div', base: 'py-10 border-y border-rule', note: 'wraps blockquote' },
  ArticleFinding: { role: 'article-finding', tag: 'div', base: 'border-y border-rule py-6', note: 'wraps SectionEyebrow div' },
  ArticleBigFinding: { role: 'article-big-finding', tag: 'div', base: 'py-12 border-y border-rule', note: 'wraps SectionEyebrow div' },
  ArticleFigureCaption: { role: 'figure-caption', tag: 'div', base: 'pt-3 space-y-1 text-xs font-mono', note: 'CAPTIONS A CHART — should be <figcaption>' },
  ArticleSource: { role: 'article-source', tag: 'div', base: 'text-xs font-mono text-ink-muted pt-2' },
  ArticleFootnotes: { role: 'article-footnotes', tag: 'div', base: 'border-t border-rule pt-5', note: 'wraps ul>li' },
  LanguageSwitch: { tag: 'div', base: '(feature component)' },
  UILanguageProvider: { tag: null, base: '(context provider, renders no DOM of its own)' },
};

const HTML_TAGS = new Set(['a','abbr','article','aside','blockquote','br','button','caption','code','dd','div','dl','dt','em','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','header','hr','img','input','label','li','main','nav','ol','p','pre','section','select','span','strong','sub','sup','svg','table','tbody','td','textarea','tfoot','th','thead','tr','ul']);

/* ------------------------------------------------------------------ *
 * 3. Class-string -> design roles
 * ------------------------------------------------------------------ */
const TEXT_SIZE = /^text-(xs|sm|base|lg|xl|[2-9]xl|\[[^\]]+\])$/;
const TYPO = /^(font-|tracking-|leading-|uppercase$|lowercase$|capitalize$|italic$|antialiased$|break-|line-clamp-|whitespace-|truncate$|underline$|decoration-\d|underline-offset-)/;
const COLOUR = /^(bg-|text-|border-|decoration-|accent-|outline-|ring-|fill-|stroke-|divide-|placeholder-|selection:)/;
const LAYOUT = /^(p[trblxy]?-|m[trblxy]?-|gap-|space-[xy]-|grid|col-|row-|flex|items-|justify-|self-|place-|w-|h-|min-|max-|inline|block$|hidden$|sticky$|fixed$|absolute$|relative$|z-|overflow-|order-|shrink|grow|basis-|aspect-|object-|top-|bottom-|left-|right-|inset-)/;
const SHAPE = /^(rounded|border$|border-[trblxy]?$|border-\d|shadow|opacity-|transition|duration-|ease-|cursor-|scroll-|backdrop-)/;

function classify(cls) {
  const typography = [], colour = [], layout = [], shape = [], other = [];
  for (const raw of cls) {
    const t = raw.replace(/^(sm|md|lg|xl|2xl|hover|focus|focus-visible|active|group-hover|first|last|odd|even|disabled|aria-\w+|data-\w+|print|motion-safe|motion-reduce):/, '');
    if (TEXT_SIZE.test(t)) typography.push(raw);
    else if (TYPO.test(t)) typography.push(raw);
    else if (COLOUR.test(t)) colour.push(raw);
    else if (SHAPE.test(t)) shape.push(raw);
    else if (LAYOUT.test(t)) layout.push(raw);
    else other.push(raw);
  }
  return { typography, colour, layout, shape, other };
}

/* ------------------------------------------------------------------ *
 * 4. Numeric-claim detection
 *    A "numeric claim" is a rendered number that asserts something about the
 *    research: a ratio, a token count, a percentage, a sample/benchmark count.
 *    Bare years and list indices are excluded.
 * ------------------------------------------------------------------ */
const CLAIM_PATTERNS = [
  [/\b\d+(?:\.\d+)?\s*[×x]\b/g, 'ratio'],
  [/[+-]?\d+(?:\.\d+)?\s*%/g, 'percentage'],
  [/\b\d{1,3}(?:,\d{3})+\b/g, 'large-count'],
  [/\b\d+\s*(?:tok|tokens|TOKENS|토큰)\b/g, 'token-count'],
  [/\b\d+\s*(?:개|회|건|배)\b/g, 'counted-quantity'],
  [/\b\d+\s+(?:Benchmark|Key|Domains?|Principles?)\b/gi, 'benchmark-count'],
  [/\b\d+(?:\.\d+)?\s*(?:~|-)\s*\d+(?:\.\d+)?\s*[×x]?/g, 'range'],
];
const IDENTIFIER_TOKENS = [/o200k_base/gi, /Flores-\d+/gi, /GPT-\d\S*/gi, /cl100k\w*/gi, /utf-?8/gi];
const ORDINAL_LABELS = [/\b(?:FIG|STEP|STAGE|PAIR|S)\s*\.?\s*\d+(?:\.\d+)?\.?/gi];
function numericClaims(text) {
  if (!/\d/.test(text)) return [];
  let masked = text;
  const asides = [];
  for (const re of IDENTIFIER_TOKENS) { masked = masked.replace(re, (m) => { asides.push({ kind: 'identifier', value: m }); return '\u0000'.repeat(m.length); }); }
  for (const re of ORDINAL_LABELS) { masked = masked.replace(re, (m) => { asides.push({ kind: 'label-ordinal', value: m.trim() }); return '\u0000'.repeat(m.length); }); }
  text = masked;
  const found = [];
  for (const [re, kind] of CLAIM_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) found.push({ kind, value: m[0].trim() });
  }
  if (!found.length) {
    // still contains a digit: capture it as an unclassified candidate rather
    // than dropping it. Omissions are defects; over-capture is reviewable.
    for (const m of text.matchAll(/\d[\d,.]*/g)) {
      const v = m[0];
      const kind = /^(19|20)\d{2}$/.test(v) ? 'year' : 'bare-number';
      found.push({ kind, value: v });
    }
  }
  const seen = new Set();
  return [...found, ...asides].filter((f) => (seen.has(f.value) ? false : (seen.add(f.value), true)));
}

/* ------------------------------------------------------------------ *
 * 5. Parse
 * ------------------------------------------------------------------ */
const records = [];
let seq = 0;
const nextId = (prefix) => `${prefix}-${String(++seq).padStart(4, '0')}`;

function tagNameOf(node) {
  const n = node.tagName ?? node.openingElement?.tagName;
  return n ? n.getText() : '(fragment)';
}

function attrsOf(open) {
  const out = {};
  for (const a of open.attributes?.properties ?? []) {
    if (ts.isJsxSpreadAttribute(a)) {
      const t = a.expression.getText();
      const m = /claimAttrs\(\s*['"]([^'"]+)['"]\s*\)/.exec(t);
      if (m) {
        out['data-claim-id'] = { dynamic: false, text: m[1] };
        out['data-claim-status'] = { dynamic: true, text: 'from claim registry' };
        out['data-trace-id'] = { dynamic: true, text: 'from claim registry' };
        out['data-source'] = { dynamic: false, text: 'widget' };
      }
      continue;
    }
    if (!ts.isJsxAttribute(a) || !a.name) continue;
    const k = a.name.getText();
    if (!a.initializer) { out[k] = true; continue; }
    if (ts.isStringLiteral(a.initializer)) out[k] = { dynamic: false, text: a.initializer.text };
    else out[k] = { dynamic: true, text: a.initializer.getText().replace(/\s+/g, ' ') };
  }
  return out;
}

function classTokens(attrs) {
  const v = attrs.className;
  if (!v || v === true) return { tokens: [], dynamic: false, raw: '' };
  if (v.dynamic) {
    const s = v.text;
    // dynamic className: pull every bare utility-looking token out of the expression
    const tokens = (s.match(/[a-z0-9][\w:./[\]#%-]*/gi) ?? []).filter((t) =>
      /^(sm|md|lg|xl|2xl|hover|focus|focus-visible|active|group-hover|selection|aria-\w+):/.test(t) ||
      /^(bg|text|border|decoration|accent|outline|ring|fill|stroke|divide|font|tracking|leading|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space|grid|col|row|flex|items|justify|self|w|h|min|max|rounded|shadow|opacity|transition|duration|cursor|scroll|z|overflow|inline|block|hidden|sticky|absolute|relative|uppercase|italic|antialiased|break|line|whitespace|truncate|underline|aspect|object|top|bottom|left|right|inset|backdrop|shrink|grow|basis|order|place)(-|$|:)/.test(t)
    );
    return { tokens: [...new Set(tokens)], dynamic: true, raw: s };
  }
  return { tokens: v.text.split(/\s+/).filter(Boolean), dynamic: false, raw: v.text };
}

function domFor(tag, attrs) {
  if (HTML_TAGS.has(tag)) return { tag, kind: 'html', primitiveNote: '' };
  const p = PRIMITIVE_DOM[tag];
  if (p) return { tag: p.tag ?? '(none)', kind: 'primitive', role: p.role ?? null, primitiveNote: [p.base, p.note].filter(Boolean).join(' — ') };
  return { tag: '(component)', kind: 'component', role: null, primitiveNote: '' };
}

for (const file of RENDER_FILES) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const rel = path.relative(ROOT, file);
  const stack = [];

  const lineOf = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
  const endLineOf = (n) => sf.getLineAndCharacterOfPosition(n.getEnd()).line + 1;

  function mapContext(node) {
    let n = node.parent;
    while (n) {
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) &&
          ['map', 'flatMap'].includes(n.expression.name.getText())) {
        return n.expression.expression.getText().replace(/\s+/g, ' ').slice(0, 90);
      }
      n = n.parent;
    }
    return null;
  }

  function visit(node) {
    let pushed = false;

    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const open = ts.isJsxElement(node) ? node.openingElement : node;
      const tag = tagNameOf(node);
      const attrs = attrsOf(open);
      const { tokens, dynamic, raw } = classTokens(attrs);
      const roles = classify(tokens);
      const dom = domFor(tag, attrs);

      const hasId = 'id' in attrs;
      const dataAttrs = Object.keys(attrs).filter((k) => k.startsWith('data-'));
      if (dom.role && !dataAttrs.includes('data-role')) dataAttrs.push('data-role(primitive)');
      if (attrs.claim && !dataAttrs.includes('data-claim-id')) dataAttrs.push('data-claim-id(primitive)');
      const ariaAttrs = Object.keys(attrs).filter((k) => k.startsWith('aria-'));

      // direct literal children
      const literals = [];
      if (ts.isJsxElement(node)) {
        for (const c of node.children) {
          if (ts.isJsxText(c)) {
            const t = c.text.replace(/\s+/g, ' ').trim();
            if (t) literals.push({ kind: 'jsx-text', text: t, line: lineOf(c) });
          } else if (ts.isJsxExpression(c) && c.expression) {
            const collect = (e) => {
              if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) {
                const t = e.text.replace(/\s+/g, ' ').trim();
                if (t) literals.push({ kind: 'string-literal', text: t, line: lineOf(e) });
              } else if (ts.isConditionalExpression(e)) { collect(e.whenTrue); collect(e.whenFalse); }
              else if (ts.isJsxElement(e) || ts.isJsxSelfClosingElement(e) || ts.isJsxFragment(e)) { /* handled by walk */ }
              else e.forEachChild?.(collect);
            };
            collect(c.expression);
          }
        }
      }

      const ancestors = stack.map((s) => s.locator);
      const cls = tokens.length ? '.' + tokens.map((t) => t.replace(/([:./[\]#%])/g, '\\$1')).join('.') : '';
      const locator = hasId && attrs.id && attrs.id.text && !attrs.id.dynamic ? `#${attrs.id.text}` : `${dom.tag}${cls}`;

      const literalText = literals.map((l) => l.text).join(' ⏎ ');
      const subtree = [];
      const gather = (n) => {
        if (ts.isJsxText(n)) { const t = n.text.replace(/\s+/g, ' ').trim(); if (t) subtree.push(t); }
        else if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
          // A literal inside ANY ancestor attribute is styling/config, not
          // content. Two levels of parent are not enough: className={cond ? 'a'
          // : 'b'} nests the literal under a ConditionalExpression first, which
          // is how Tailwind class strings were leaking in as rendered text.
          let inAttr = false;
          for (let a = n.parent; a; a = a.parent) {
            if (ts.isJsxAttribute(a)) { inAttr = true; break; }
            if (ts.isJsxElement(a) || ts.isJsxSelfClosingElement(a)) break;
          }
          if (!inAttr) { const t = n.text.replace(/\s+/g, ' ').trim(); if (t) subtree.push(t); }
        }
        n.forEachChild(gather);
      };
      gather(node);
      const subtreeText = subtree.join(' ');
      const claims = numericClaims(literalText || '');
      const subtreeClaims = numericClaims(subtreeText);

      records.push({
        file: rel,
        line: lineOf(node),
        endLine: endLineOf(node),
        depth: stack.length,
        jsxTag: tag,
        domTag: dom.tag,
        tagKind: dom.kind,
        primitiveNote: dom.primitiveNote,
        classRaw: dynamic ? `(dynamic) ${String(raw).replace(/\s+/g, ' ').slice(0, 240)}` : raw,
        classTokens: tokens,
        roles,
        hasId,
        idValue: attrs.id && attrs.id.text ? attrs.id.text : null,
        dataAttrs,
        ariaAttrs,
        literals,
        literalText,
        numericClaims: claims,
        subtreeText: subtreeText.slice(0, 400),
        subtreeClaims,
        locator,
        locatorPath: [...ancestors, locator].join(' > '),
        mapOver: mapContext(node),
        isDeadFile: rel.includes('MultilingualSection.tsx'),
      });

      stack.push({ locator, tag: dom.tag });
      pushed = true;
    }

    node.forEachChild(visit);
    if (pushed) stack.pop();
  }
  visit(sf);
}

/* ------------------------------------------------------------------ *
 * 6. Entity value index — what content the contract already owns
 * ------------------------------------------------------------------ */
function walkTs(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkTs(p, acc);
    else if (/\.ts$/.test(e.name)) acc.push(p);
  }
  return acc;
}
const entityValues = { numbers: {}, strings: {} };
for (const file of walkTs(path.join(ROOT, 'src/entities'))) {
  const rel = path.relative(ROOT, file);
  const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const visit = (n) => {
    if (ts.isNumericLiteral(n)) {
      const k = n.text;
      (entityValues.numbers[k] ??= []).push(`${rel}:${sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1}`);
    }
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      const t = n.text.trim();
      if (t.length > 2) (entityValues.strings[t] ??= []).push(`${rel}:${sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1}`);
    }
    n.forEachChild(visit);
  };
  visit(sf);
}

/* ------------------------------------------------------------------ *
 * 7. Emit
 * ------------------------------------------------------------------ */
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'raw-nodes.json'), JSON.stringify(records, null, 1));
fs.writeFileSync(path.join(OUT, 'entity-values.json'), JSON.stringify(entityValues, null, 1));
console.log(`parsed ${RENDER_FILES.length} render files`);
console.log(`nodes: ${records.length}`);
console.log(`nodes with direct literals: ${records.filter((r) => r.literals.length).length}`);
console.log(`nodes with numeric claims : ${records.filter((r) => r.numericClaims.length).length}`);
console.log(`entity numeric values     : ${Object.keys(entityValues.numbers).length}`);
console.log(`entity string values      : ${Object.keys(entityValues.strings).length}`);
