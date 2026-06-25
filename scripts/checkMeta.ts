/// <reference types="node" />
/* Guard against a stale committed meta.json. The data-split (S10c) generates
   src/data/meta.json from concepts.ts (the content SSOT) via `gen:meta`, wired as
   prebuild/predev. But a typecheck-only path (editor, CI lint stage) never runs
   those hooks — so this check asserts the committed meta.json still matches
   concepts.ts. It is wired into `npm run typecheck` so nav/search/content divergence
   can't ship. If it fails: run `npm run gen:meta` and commit meta.json.

   Run: node --experimental-strip-types --disable-warning=ExperimentalWarning scripts/checkMeta.ts */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SECTIONS, MODULES, SIGNATURE_SIMS } from "../src/data/concepts.ts";

const here = dirname(fileURLToPath(import.meta.url));
const meta = JSON.parse(readFileSync(join(here, "..", "src", "data", "meta.json"), "utf8"));

const errs: string[] = [];
const eq = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

if (!eq(meta.sections, SECTIONS)) errs.push("sections drift");
if (!eq(meta.signatureSims, [...SIGNATURE_SIMS].sort())) {
  errs.push(`signatureSims drift: meta=${JSON.stringify(meta.signatureSims)} vs src=${JSON.stringify([...SIGNATURE_SIMS].sort())}`);
}
if (meta.modules.length !== MODULES.length) errs.push(`module count ${meta.modules.length} vs ${MODULES.length}`);

for (const m of MODULES) {
  const mm = meta.modules.find((x: { id: string }) => x.id === m.id);
  if (!mm) {
    errs.push(`missing in meta: ${m.id}`);
    continue;
  }
  const fields: [string, unknown, unknown][] = [
    ["section", mm.section, m.section],
    ["order", mm.order, m.order],
    ["level", mm.level, m.level],
    ["title", mm.title, m.title],
    ["tagline", mm.tagline, m.tagline],
    ["mentalModel", mm.mentalModel, m.mentalModel],
    ["readMins", mm.readMins, m.readMins],
    ["seeAlso", mm.seeAlso, m.seeAlso],
    ["topics", mm.topics, m.topics.map((t) => ({ id: t.id, title: t.title }))],
    ["authored", mm.authored, m.topics.some((t) => t.blocks.length > 0)],
  ];
  for (const [name, a, b] of fields) if (!eq(a, b)) errs.push(`${m.id}.${name} drift`);
}

if (errs.length) {
  console.error("META-SYNC FAIL (run `npm run gen:meta` and commit meta.json):\n - " + errs.join("\n - "));
  process.exit(1);
}
console.log(`META-SYNC OK · ${MODULES.length} modules · ${meta.signatureSims.length} signature sims · sections ${SECTIONS.length}`);
