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

/**
 * Ids whose node is gone on purpose.
 *
 * A decision record has to be able to name the figure it withdrew, so prose
 * legitimately outlives the node it cites. Without this list every ruling
 * makes the guard fail, and a guard that always fails is a guard nobody
 * reads. An id that is in neither the ledger nor this file is still an error.
 */
const { retired } = JSON.parse(fs.readFileSync(path.join(DOCS, 'data/retired-trace-ids.json'), 'utf8'));
const retiredIds = new Set(Object.keys(retired));

const PROSE = ['DIRECTOR_DECISIONS.md', 'REMEDIATION_BATCHES.md', 'README.md'];
let bad = 0;
for (const f of PROSE) {
  const p = path.join(DOCS, f);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');
  const cited = [...text.matchAll(/`([A-Z]{2,6}-\d{3})`/g)].map((m) => m[1]);
  let retiredHere = 0;
  for (const id of [...new Set(cited)]) {
    if (known.has(id)) continue;
    if (retiredIds.has(id)) { retiredHere++; continue; }
    console.error(`DANGLING  ${f}  ${id}`); bad++;
  }
  const suffix = retiredHere ? ` (${retiredHere} retired)` : '';
  console.log(`${String(new Set(cited).size).padStart(3)} citations checked in ${f}${suffix}`);
}
if (bad) { console.error(`\n${bad} dangling Trace ID citation(s) — the ledger and the prose disagree.`); process.exit(1); }
console.log(`\nall prose citations resolve to a ledger row or a retired id (${retiredIds.size} retired)`);

/* An id can be retired and still live — that means the node came back, or was
   never removed. Either way the register is lying about the page. */
const zombies = [...retiredIds].filter((id) => known.has(id));
if (zombies.length) {
  console.error(`\n${zombies.length} id(s) marked retired but still in the ledger: ${zombies.join(', ')}`);
  process.exit(1);
}
