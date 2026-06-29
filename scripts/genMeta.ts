/// <reference types="node" />
/* Codegen — derive the lightweight nav/search metadata index (src/data/meta.json)
   from concepts.ts (the content SSOT). The eager shell (TopBar search, Sidebar nav,
   Footer counts) + the landing/gallery/glossary read meta.json; only the lazy
   ModulePage imports the full bodies from concepts.ts. This keeps the ~600 KB of
   module content OUT of the initial bundle.

   Run: `npm run gen:meta` (Node 22, via tsx). Also wired as the `predev`/`prebuild`
   hook so production builds never ship stale metadata. Commit meta.json. */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SECTIONS, MODULES, SIGNATURE_SIMS } from "../src/data/concepts";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "src", "data", "meta.json");

const meta = {
  sections: SECTIONS,
  signatureSims: [...SIGNATURE_SIMS].sort(),
  modules: MODULES.map((m) => ({
    id: m.id,
    section: m.section,
    order: m.order,
    level: m.level,
    title: m.title,
    tagline: m.tagline,
    mentalModel: m.mentalModel,
    readMins: m.readMins,
    topics: m.topics.map((t) => ({ id: t.id, title: t.title })),
    seeAlso: m.seeAlso,
    authored: m.topics.some((t) => t.blocks.length > 0),
  })),
};

writeFileSync(out, JSON.stringify(meta, null, 2) + "\n", "utf8");
console.log(
  `meta.json written → ${meta.modules.length} modules · ${meta.sections.length} sections · ${meta.signatureSims.length} signature sims`,
);
