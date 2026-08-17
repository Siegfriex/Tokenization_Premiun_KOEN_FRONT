/**
 * Guard — every Trace ID cited in prose must exist in the ledger.
 *
 *   node docs/audit/tools/check-citations.mjs
 *
 * DIRECTOR_DECISIONS.md cited fifteen Trace IDs that had never matched the
 * committed ledger: the doc was written from one tool run, the tools were re-run
 * with a corrected rule, ids moved, and nobody re-read the doc. A decision queue
 * that points at the wrong rows is worse than no queue, so this runs as part of
 * the pipeline and exits non-zero on any dangling citation.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs/audit');
const { items } = JSON.parse(fs.readFileSync(path.join(DOCS, 'data/trace-ledger.json'), 'utf8'));
const known = new Set(items.map((i) => i.traceId));

const PROSE = ['DIRECTOR_DECISIONS.md', 'REMEDIATION_BATCHES.md', 'README.md'];
let bad = 0;
for (const f of PROSE) {
  const p = path.join(DOCS, f);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');
  const cited = [...text.matchAll(/`([A-Z]{2,6}-\d{3})`/g)].map((m) => m[1]);
  for (const id of [...new Set(cited)]) {
    if (!known.has(id)) { console.error(`DANGLING  ${f}  ${id}`); bad++; }
  }
  console.log(`${String(new Set(cited).size).padStart(3)} citations checked in ${f}`);
}
if (bad) { console.error(`\n${bad} dangling Trace ID citation(s) — the ledger and the prose disagree.`); process.exit(1); }
console.log('\nall prose citations resolve to real ledger rows');
