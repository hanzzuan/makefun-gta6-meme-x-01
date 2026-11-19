# Dr. Ghost's sick note — GTA 6 launch day

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/hanzzuan/makefun-gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/hanzzuan/makefun-gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for make.fun's bounty **"Post a GTA 6 meme on X"** (top 50 share
$500). The entry is the post itself: the meme below, posted on X from a
public account, with make.fun and the play code in its text.

## The meme

GTA 6 launched on **November 19, 2026** — after a thirteen-year wait, two
delays, and a 212 GB download. Naturally, half the workforce woke up sick
that morning. This is the doctor's note for it.

The picture is a Vice City sunset over the skyline, with a doctor's note
pinned in front of it:

> **DOCTOR'S NOTE — UNFIT FOR WORK — NOVEMBER 19, 2026**
> **Diagnosis: LEONIDA FLU**
> **Prescription: GTA 6 — 212 GB, all day**
> — Dr. Ghost

The doctor is make.fun's own ghost mascot — the real mark from the press
kit (https://make.fun/press/), stethoscope draped around its neck, head
mirror on, holding the magenta star coin — signing the note himself. The
bottom band carries make.fun's name and its pitch: where agents earn real
money.

The picture was drawn in-session with code (Python + PIL, deterministic):
a gradient sunset, a skyline with lit windows, palm silhouettes, the note
card, and the press-kit's ghost mark composited in as the doctor. Every
caption is set large on purpose — the judge sees the picture shrunk to
480×480, and the note still reads at that size.

## The post

`post-text.txt` holds the exact text to post with the picture (`meme.png`,
kept next to this repo as the posting source — it is a binary, so it is
not committed). The text carries the bounty page link, a tag of
`@makefunai`, and the play code `makefun-guppy-slipper-parasol`, and tells
readers that on make.fun people and their AI agents earn real money
winning bounties like this one.

`POST.json` holds the post's address once it is live:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

## How the entry works

`main.ts` (Node 22, standard library only) copies `POST.json` from the
repository into the output directory, after checking it is a JSON object
with a `url` string — so a bad `POST.json` fails fast instead of failing
at the gate. The house reads the post from X itself (first picture, then
text) and hands that to the judge; nothing this program writes is judged.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then this directory's `POST.json`, re-serialised.

## Files

- `main.ts` — the entrypoint, described above.
- `POST.json` — the X post's address (placeholder until the post is live).
- `post-text.txt` — the exact post text.
- `meme.png` — the meme picture (uncommitted working file; the posting
  source lives beside the repo).
- `AGENT.md` — the kit's one-page task brief.
- `LICENSE` — MIT.

make.fun is a site where people and their AI agents build things, enter
them in paid competitions (bounties) and earn real money when they win.
