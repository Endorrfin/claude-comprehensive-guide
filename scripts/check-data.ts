/// <reference types="node" />
/* Data-integrity gate (standard §3.8 / §4.6) — committed in S15 (Wave C1), promoted
   from the S11 scratch `scripts/_integrity-s11.ts` with its asserts unchanged.
   Validates the content SSOT before every deploy: 6 sections · 28 modules · unique
   ids/orders · bilingual completeness · registry sim/figure refs · table/compare
   shapes · callout tones · seeAlso · SIGNATURE_SIMS carry a sim · glossary integrity.
   Exits non-zero on any error.

   Run: tsx scripts/check-data.ts  (wired as `npm run check:data`). */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SECTIONS, MODULES, SIGNATURE_SIMS } from "../src/data/concepts";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "../src/data/glossary";

const here = dirname(fileURLToPath(import.meta.url));
const errs: string[] = [];
const E = (c: boolean, m: string): void => { if (!c) errs.push(m); };

// --- registry keys (parsed as text so we don't import the .tsx/JSX) ---
const reg = readFileSync(join(here, "..", "src", "lib", "registry.tsx"), "utf8");
const simKeys = new Set<string>();
const figKeys = new Set<string>();
for (const line of reg.split("\n")) {
  const k = line.match(/^\s*"([\w-]+)":\s*React\.lazy/);
  if (!k) continue;
  if (line.includes("components/sims/")) simKeys.add(k[1]);
  else if (line.includes("components/figures/")) figKeys.add(k[1]);
}

// --- structure ---
E(SECTIONS.length === 6, `sections=${SECTIONS.length} (want 6)`);
E(MODULES.length === 28, `modules=${MODULES.length} (want 28)`);
const ids = new Set(MODULES.map((m) => m.id));
E(ids.size === MODULES.length, "duplicate module ids");
const orders = MODULES.map((m) => m.order).sort((a, b) => a - b);
E(JSON.stringify(orders) === JSON.stringify([...Array(28)].map((_, i) => i + 1)), "orders not 1..28");
const tones = new Set(["tip", "warn", "senior", "security"]);

let blocks = 0, sims = 0, figs = 0, locPairs = 0;
const isLoc = (v: unknown): v is { en: string; uk: string } =>
  !!v && typeof v === "object" && "en" in v && "uk" in v && typeof (v as { en: unknown }).en === "string";
const walkLoc = (v: unknown, ctx: string): void => {
  if (isLoc(v)) {
    locPairs++;
    E(v.en.trim().length > 0, `${ctx}: empty en`);
    E(v.uk.trim().length > 0, `${ctx}: empty uk`);
  } else if (Array.isArray(v)) v.forEach((x, i) => walkLoc(x, `${ctx}[${i}]`));
  else if (v && typeof v === "object") for (const [k, val] of Object.entries(v)) walkLoc(val, `${ctx}.${k}`);
};

for (const m of MODULES) {
  E(m.topics.length > 0, `${m.id}: no topics`);
  for (const s of m.seeAlso) E(ids.has(s), `${m.id}.seeAlso → unknown ${s}`);
  E(m.seeAlso.every((s) => s !== m.id), `${m.id}: seeAlso self-ref`);
  walkLoc({ title: m.title, tagline: m.tagline, mentalModel: m.mentalModel, topics: m.topics, keyPoints: m.keyPoints, pitfalls: m.pitfalls, interview: m.interview ?? [] }, m.id);
  for (const t of m.topics) {
    for (const b of t.blocks) {
      blocks++;
      if (b.kind === "table") for (const r of b.rows) E(r.length === b.head.length, `${m.id}/${t.id}: table row width ${r.length} ≠ head ${b.head.length}`);
      if (b.kind === "compare") for (const r of b.rows) E(r.length === 3, `${m.id}/${t.id}: compare row not a 3-tuple`);
      if (b.kind === "callout") E(tones.has(b.tone), `${m.id}/${t.id}: bad callout tone ${b.tone}`);
      if (b.kind === "figure") { figs++; E(figKeys.has(b.fig), `${m.id}/${t.id}: figure key '${b.fig}' not in registry`); }
      if (b.kind === "sim") { sims++; E(simKeys.has(b.sim), `${m.id}/${t.id}: sim key '${b.sim}' not in registry`); }
    }
  }
}

// every signature module must be a real id AND actually carry a sim block
for (const sid of SIGNATURE_SIMS) {
  E(ids.has(sid), `SIGNATURE_SIMS → unknown ${sid}`);
  const mod = MODULES.find((m) => m.id === sid);
  const hasSim = mod?.topics.some((t) => t.blocks.some((b) => b.kind === "sim"));
  E(!!hasSim, `signature ${sid} has no sim block`);
}

// --- glossary ---
const catIds = new Set(GLOSSARY_CATEGORIES.map((c) => c.id));
const terms = new Set<string>();
for (const g of GLOSSARY) {
  E(g.term.trim().length > 0, "glossary: empty term");
  E(!terms.has(g.term), `glossary: duplicate term ${g.term}`);
  terms.add(g.term);
  E(catIds.has(g.category), `glossary: ${g.term} bad category ${g.category}`);
  E(isLoc(g.def) && g.def.en.trim().length > 0 && g.def.uk.trim().length > 0, `glossary: ${g.term} def not bilingual`);
  for (const mid of g.modules ?? []) E(ids.has(mid), `glossary: ${g.term} → unknown module ${mid}`);
}

if (errs.length) { console.error(`✗ check:data FAIL (${errs.length}):\n - ` + errs.slice(0, 40).join("\n - ")); process.exit(1); }
console.log(`✓ check:data OK · ${SECTIONS.length} sections · ${MODULES.length} modules · ${blocks} blocks · ${sims} sim refs (${simKeys.size} registered) · ${figs} figure refs (${figKeys.size} registered) · ${locPairs} Localized pairs · glossary ${terms.size} terms · signature ${SIGNATURE_SIMS.size}`);
