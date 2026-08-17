/**
 * B3 codemod — term/value rows become description lists.
 *
 *   node docs/audit/tools/codemods/stat-rows-to-dl.mjs [--dry]
 *
 * Converts `div[data-role="stat"] > span + span` into `dl > dt + dd`, so a
 * label and its value stop being two anonymous inline boxes reachable only as
 * `div:nth-child(3)`.
 *
 * Strictly conservative: only rows with exactly two element children, both
 * `<span>`. Anything more complex is left for a human — a wrong `dt`/`dd`
 * pairing is worse than none.
 *
 * Visually neutral by construction: no class is added or removed, and Tailwind
 * Preflight already zeroes `dl`/`dd` margins, so `dl` lays out exactly as the
 * `div` did and `dt`/`dd` exactly as the spans did inside a flex row.
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DRY = process.argv.includes('--dry');
const ROOT = process.cwd();
const files = fs
  .readdirSync(path.join(ROOT, 'src/components'))
  .filter((f) => f.endsWith('.tsx') && f !== 'MultilingualSection.tsx')
  .map((f) => path.join('src/components', f));

let total = 0;
for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  /** @type {{start:number,end:number,text:string}[]} */
  const edits = [];

  const visit = (node) => {
    if (ts.isJsxElement(node)) {
      const open = node.openingElement;
      const isStat = open.attributes.properties.some(
        (a) => ts.isJsxAttribute(a) && a.name?.getText() === 'data-role' &&
               a.initializer && ts.isStringLiteral(a.initializer) && a.initializer.text === 'stat'
      );
      const kids = node.children.filter((c) => ts.isJsxElement(c) || ts.isJsxSelfClosingElement(c));
      const bothSpans = kids.length === 2 && kids.every(
        (k) => (ts.isJsxElement(k) ? k.openingElement : k).tagName.getText() === 'span'
      );
      if (isStat && bothSpans && open.tagName.getText() === 'div') {
        const close = node.closingElement;
        edits.push({ start: open.tagName.getStart(sf), end: open.tagName.getEnd(), text: 'dl' });
        edits.push({ start: close.tagName.getStart(sf), end: close.tagName.getEnd(), text: 'dl' });
        kids.forEach((k, i) => {
          const tag = i === 0 ? 'dt' : 'dd';
          const o = ts.isJsxElement(k) ? k.openingElement : k;
          edits.push({ start: o.tagName.getStart(sf), end: o.tagName.getEnd(), text: tag });
          if (ts.isJsxElement(k)) {
            edits.push({ start: k.closingElement.tagName.getStart(sf), end: k.closingElement.tagName.getEnd(), text: tag });
          }
        });
        total++;
      }
    }
    node.forEachChild(visit);
  };
  visit(sf);

  if (!edits.length) continue;
  console.log(`${String(edits.length / 6).padStart(3)}  ${rel}`);
  if (!DRY) {
    let out = src;
    for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
    fs.writeFileSync(abs, out);
  }
}
console.log(`\n${DRY ? '[dry run] would convert' : 'converted'} ${total} term/value rows to dl/dt/dd`);
