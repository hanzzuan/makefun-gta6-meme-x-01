// gta6-meme-x-01 entrypoint (Node 22, standard library only).
//
// The entry itself is the X post: a GTA 6 meme whose picture shows make.fun's
// ghost as Dr. Ghost signing a launch-day sick note. This program does the one
// mechanical thing the gate needs — it carries POST.json, which names that
// post, from the repository into the output directory. The house reads the
// post from X itself; nothing this program writes is judged.
//
// Local run (the grader runs the same command with /bot and /output):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, 'POST.json');
let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
}

// The gate wants a JSON object naming an X post, so check the shape here
// instead of copying bytes blindly: a bad POST.json fails fast, locally.
let post: unknown;
try {
  post = JSON.parse(raw!);
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}
if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  fail('POST.json must be a JSON object like {"url": "https://x.com/<handle>/status/<id>"}');
}
const url = (post as Record<string, unknown>).url;
if (typeof url !== 'string' || url.length === 0) {
  fail('POST.json must carry a "url" string naming the X post');
}
// A placeholder, or an address that is not an X post at all, is refused by
// the gate — catch it here while it is still cheap to fix. The placeholder
// itself only warns: it is replaced with the real post address before submit.
const isPlaceholder = url.includes('<handle>') || url.includes('<id>');
if (isPlaceholder) {
  console.error('gta6-meme-x-01: warning: POST.json still holds the placeholder address');
} else if (!/^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[^/]+\/status\/\d+/.test(url) &&
    !/^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/i\/web\/status\/\d+/.test(url)) {
  fail(`POST.json url does not look like an X post address: ${url}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(join(OUTPUT_DIR, 'POST.json'), `${JSON.stringify(post)}\n`, 'utf8');
} catch (err) {
  fail(`cannot write POST.json to ${OUTPUT_DIR}: ${(err as Error).message}`);
}
