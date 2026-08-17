/**
 * B2b codemod — give every structurally significant node a role hook.
 *
 *   node docs/audit/tools/codemods/add-structural-roles.mjs [--dry]
 *
 * Ledger-driven: reads docs/audit/data/trace-ledger.json, finds live nodes that
 * still have no stable address, and attaches the hook their detected semantic
 * gap implies. A stat row becomes addressable as `[data-role="stat"]` instead
 * of `div:nth-child(3)`, and carries `data-semantic-target` so the B3 backlog
 * is queryable in the browser.
 *
 * Attribute insertion only — no class, element or text change. Regenerate the
 * ledger first so line numbers are current.
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DRY = process.argv.includes('--dry');
const ROOT = process.cwd();
const { items } = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/audit/data/trace-ledger.json'), 'utf8'));

/** What each detected gap implies about the node's role. */
const HOOKS = {
  DL_PAIR:       { role: 'stat', target: 'dl' },
  LIST:          { role: 'collection-item', target: 'ul' },
  FIGURE:        { role: 'figure-caption', target: 'figure' },
  NAV_LIST:      { role: 'section-nav', target: 'nav-list' },
  LABEL_ORPHAN:  { role: 'label', target: null },
  HEADING_LEVEL: { role: 'heading', target: 'heading' },
};

const targets = new Map(); // file -> Map(line -> attrs)
for (const i of items) {
  if (i.deadFile || i.addressing.startsWith('STABLE')) continue;
  const hook = HOOKS[i.semanticGap];
  if (!hook) continue;
  const line = Number(String(i.lines).split('-')[0]);
  if (!targets.has(i.file)) targets.set(i.file, new Map());
  targets.get(i.file).set(line, hook);
}

let total = 0;
for (const [rel, lines] of targets) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const inserts = [];

  const visit = (node) => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const open = ts.isJsxElement(node) ? node.openingElement : node;
      const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
      const hook = lines.get(line);
      const has = (n) => open.attributes.properties.some((a) => ts.isJsxAttribute(a) && a.name?.getText() === n);
      if (hook && /^[a-z]/.test(open.tagName.getText()) && !has('data-role')) {
        let attrs = ` data-role="${hook.role}"`;
        if (hook.target && !has('data-semantic-target')) attrs += ` data-semantic-target="${hook.target}"`;
        inserts.push({ pos: open.tagName.getEnd(), attrs });
      }
    }
    node.forEachChild(visit);
  };
  visit(sf);

  if (!inserts.length) continue;
  total += inserts.length;
  console.log(`${String(inserts.length).padStart(3)}  ${rel}`);
  if (!DRY) {
    let out = src;
    for (const { pos, attrs } of inserts.sort((a, b) => b.pos - a.pos)) out = out.slice(0, pos) + attrs + out.slice(pos);
    fs.writeFileSync(abs, out);
  }
}
console.log(`\n${DRY ? '[dry run] would hook' : 'hooked'} ${total} structural nodes`);
