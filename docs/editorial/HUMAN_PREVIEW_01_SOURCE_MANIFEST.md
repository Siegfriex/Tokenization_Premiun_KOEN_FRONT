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
