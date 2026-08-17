/**
 * B2b codemod — mark who owns the text a node renders.
 *
 *   node docs/audit/tools/codemods/add-content-source.mjs [--dry]
 *
 * Adds `data-source="widget"` to every intrinsic element that renders a
 * human-readable literal directly in the widget rather than reading it from an
 * entity. That single attribute turns the content-migration backlog into a
 * DOM query — `document.querySelectorAll('[data-source="widget"]').length` —
 * so B4 progress is measurable from the running page with no file reading.
 *
 * Rules, deliberately conservative:
 *   - intrinsic elements only (lowercase tags); components carry their own hooks
 *   - only when a DIRECT child is a human-readable literal — an element whose
 *     text comes from `{entity.field}` is not widget-owned and is left alone
 *   - never touches a node that already has data-source, including via a
 *     {...claimAttrs()} spread
 *   - attribute insertion only: no class, element or text change
 *
 * A literal is "human-readable" if it contains a letter or a Hangul syllable.
 * Punctuation-only text nodes (separators like "/" or "|", the "×" suffix) are
 * skipped — they are decoration, not content.
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DRY = process.argv.includes('--dry');
const ROOT = process.cwd();
const DEAD = 'MultilingualSection.tsx'; // not rendered; B6 decides its fate

const files = fs
  .readdirSync(path.join(ROOT, 'src/components'))
  .filter((f) => f.endsWith('.tsx') && f !== DEAD)
  .map((f) => path.join('src/components', f));

const READABLE = /[A-Za-zㄱ-ㆎ가-힣]/;
let totalNodes = 0;
let totalFiles = 0;

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, 'utf8');
  const sf = ts.createSourceFile(abs, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const inserts = [];

  const visit = (node) => {
    if (ts.isJsxElement(node)) {
      const open = node.openingElement;
      const tag = open.tagName.getText();

      const intrinsic = /^[a-z]/.test(tag);
      const alreadyHooked = open.attributes.properties.some((a) =>
        (ts.isJsxAttribute(a) && a.name?.getText() === 'data-source') ||
        (ts.isJsxSpreadAttribute(a) && /claimAttrs\(/.test(a.expression.getText()))
      );

      const rendersLiteral = node.children.some((c) => {
        if (ts.isJsxText(c)) return READABLE.test(c.text);
        if (ts.isJsxExpression(c) && c.expression) {
          let found = false;
          const walk = (e) => {
            if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) {
              if (READABLE.test(e.text)) found = true;
            } else if (ts.isConditionalExpression(e)) { walk(e.whenTrue); walk(e.whenFalse); }
          };
          walk(c.expression);
          return found;
        }
        return false;
      });

      if (intrinsic && !alreadyHooked && rendersLiteral) {
        inserts.push(open.tagName.getEnd());
      }
    }
    node.forEachChild(visit);
  };
  visit(sf);

  if (!inserts.length) continue;
  totalFiles++;
  totalNodes += inserts.length;
  console.log(`${String(inserts.length).padStart(3)}  ${rel}`);

  if (!DRY) {
    let out = src;
    for (const pos of inserts.sort((a, b) => b - a)) {
      out = out.slice(0, pos) + ' data-source="widget"' + out.slice(pos);
    }
    fs.writeFileSync(abs, out);
  }
}

console.log(`\n${DRY ? '[dry run] would mark' : 'marked'} ${totalNodes} widget-owned content nodes across ${totalFiles} files`);
