# Human Preview 01 — Source Manifest

Status of every source artifact referenced by `HUMAN_PREVIEW_01_MASTER.md`.
Do not invent hashes for files that are not local.

## Screenshots (local, hashed)

Location: `AUDIT2/` (repo-root-relative), acquired 2026-08-18 (file mtime),
provided by Director via local filesystem drop. Not yet committed to git —
untracked at time of this manifest (`git status` showed `?? AUDIT2/`).

| File | SHA-256 | Bytes |
|---|---|---|
| `S0.png` | `ed5fc9b850f24457ab70e06b9655a248338b0dd043a77bbf20b781f98d904109` | 264448 |
| `S1.png` | `f0fa055e439508a1a7a6e31ed137291175dc66895eee561f45cd87030dac301d` | 237565 |
| `S2.png` | `2acbc2781381ccf8683a1f7a5359c677c6b10a00296f7fa9e5ab1715e4a40167` | 138614 |
| `S3.png` | `7e0e1d0a8f41dc24853827a0d9622109a82d65f9d7f58f45322dff6769e8fc34` | 324223 |
| `S4.png` | `d77429df0b420418cd9063838fda4215ebd31fe403555364098fafe7677bafdd` | 325415 |
| `S5.png` | `9071e76a799bb714cee22eec7997d99a42a32ead8d1203b1bdb3d882237d6c4b` | 519777 |
| `S6.png` | `c2304407d09b2610e1e43cd14fd5d2da7e5ea8881df745078654c07cc8c3dc09` | 252385 |
| `S7.png` | `49078a37181f1b383d58e35d4f9c38b82108b1b18130a5eb0161d8212a79e141` | 139743 |
| `S8.png` | `8b7cdac8366a85cb0a2740bcfde8cd6ebfb92c0414f2eb51b1c29fe8008d0796` | 103723 |
| `S9 _ 결론.png` | `190fac395687fb79db62501fa56401de1531c17ecb3ff778fd2dbfa9c379aa04` | 150347 |

Note: SHA256 computed with `sha256sum`, printed above in the tool's default
`<hash>  <filename>` order (hash first) — reproduce with
`sha256sum AUDIT2/*.png` from repo root.

## QA meeting transcript

**STATUS: SOURCE_NOT_LOCAL.**

No transcript file was found under the repo or the wider
`/home/sieg/projects-wsl/` tree (`find ... -iname "*transcript*" -o -iname
"*meeting*"` returned nothing). The Director's prompt for this Human
Preview session (the message containing sections 0-21 of the operating
framework, plus the `HP01-S2-*` through `HP01-S7-*` directive table) is
being used as the **Director-approved translation** of both the
annotated screenshots and the meeting transcript, per the framework's own
fallback rule (§2). That prompt text is not re-hashed here since it is
conversational input, not a filesystem artifact — its content is
reproduced verbatim in `HUMAN_PREVIEW_01_MASTER.md` §F where it supplies
directives not independently re-derivable from the images.

## Local handoff / prior session docs

Not separately hashed — these are git-tracked, version-controlled files
already covered by commit SHAs, not loose artifacts: `docs/HANDOFF.md`,
`docs/audit/DIRECTOR_DECISIONS.md`, `docs/qa/SHOT_SPECS.md`,
`docs/qa/DESIGN_LAW.md`, `docs/qa/VISUAL_QA_CRITERIA.md`,
`docs/qa/LOOP_LOG.md`. Their state as of this manifest = their state at
git commit `894dcd8` (see MASTER §B for baseline SHAs).

## Supplementary directive/audit documents (added 2026-08-18, mid-session)

Location: `AUDIT2/QA/` (repo-root-relative). A parallel/independent audit
process (external to this orchestrator) produced a DOM-addressing
execution overlay plus its own runtime crawl and source-hook evidence.
These do not replace `HUMAN_PREVIEW_01_MASTER.md` as the authority for
screenshot meaning/status (that authority is explicitly preserved in
the overlay document's own §0), but they do govern *how* subsequent
patches should be addressed (selector priority order, when to add a
`data-hp01-id` instrumentation hook) — see MASTER §A for the
reconciliation note.

| File | SHA-256 |
|---|---|
| `QA/Human Preview 01 — DOM-Targeted Local Agent Master Directive.md` | `7807819b31146e5ab4d59bd3fbb89aea650cb2ce1803761ba53ea15f44f8da78` |
| `QA/Runtime Crawl Notes — Production Baseline.md` | `86d2d33f02c4236afae576c909571c84ea5b51c4d8d2ad64bb6bbe82d61788ee` |
| `QA/Current Source Hook Index.md` | `fcf11af573059409b3aed43e3303204c37d43754e1c0692bdfd7e00264f1c959` |

Independent verification value: the Runtime Crawl Notes document
confirms — via a separate crawl of the live production site — that
this session's S2 and S3 edits (PR #22/#23) deployed exactly as
intended (e.g. quotes the live-rendered `핵심 실측 지표`,
`관측된 토큰 프리미엄 비율` labels verbatim). No contradiction found
between that independent audit and this MASTER's own record.

## Reference material (`AUDIT2/레퍼런스/`, discovered 2026-08-18, same batch)

Untracked directory found alongside the annotated screenshots after PR #27
merged. Contents extracted via `unzip` + regex on `word/document.xml`/
`sheet1.xml` (Read tool cannot open `.docx`/`.xlsx` binaries directly).

| File | SHA-256 |
|---|---|
| `레퍼런스/기사_최종본.docx` | `6f5555656dee93a43932fa3be33f76efa008032b935cfea186b84035a01e705e` |
| `레퍼런스/기사용_언어별_Token_Premium_선행연구_요약.docx` | `3c83050a493ae2e7a8c3f62394624483135d9279ad88eebd2637c7cf2b77d189` |
| `레퍼런스/cl100k_base tokenizer(국가별).xlsx` | `8b08f9552920bcff2358d17ac3b1f6d0f460c74afd9dedc31759ffaa57609d32` |

`기사용_언어별_Token_Premium_선행연구_요약.docx` resolves the sourcing half of
`HP01-S45-B02` (locates the Flores/Petrov et al. 2023 NeurIPS citation this
project had flagged as `BLOCKED_EVIDENCE`) without changing any number
already on the site.

`기사_최종본.docx` states corpus/ratio numbers (3,835,988 pairs, 1.33× median,
95th/99th percentiles 1.89×/2.25×, GPT-5/o200k_base) that directly contradict
every value frozen under `docs/audit/DIRECTOR_DECISIONS.md` D1. Logged there
as **D8**, open, not acted on — see that file for the full comparison table
and why this is a Director decision, not something this loop resolves alone.

`cl100k_base tokenizer(국가별).xlsx` structure only confirmed (one worksheet +
embedded images); data contents not yet read.

## Acquisition notes

- Screenshots were annotated by hand (red/blue marker over screen
  captures) and dropped into `AUDIT2/` as flat PNGs, one file per nav
  slide by intended mapping — but **file boundaries do not always match
  component boundaries**: `S0.png` contains crops from both
  `NewsHeroSection` (true S0/hero) and `PipelineSection` (S02) content.
  See MASTER §C for the corrected per-annotation-cluster mapping.
- No EXIF/metadata extraction was performed — mtime is the only acquired
  timestamp evidence (2026-08-18 14:46, uniform across all 10 files,
  consistent with a single batch drop).
