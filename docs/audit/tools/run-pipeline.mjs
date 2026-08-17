/**
 * The audit pipeline, as one command.
 *
 *   node docs/audit/tools/run-pipeline.mjs
 *
 * The four steps must run together and in order. During the control-plane
 * incident the ledger was regenerated without the citation check, and
 * DIRECTOR_DECISIONS.md spent several commits pointing at Trace IDs that no
 * longer existed. Running them as one command is what stops that recurring.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname);
for (const step of ['extract-trace.mjs', 'build-ledger.mjs', 'render-docs.mjs', 'check-citations.mjs']) {
  console.log(`\n── ${step}`);
  execFileSync(process.execPath, [path.join(here, step)], { stdio: 'inherit' });
}
console.log('\npipeline complete');
