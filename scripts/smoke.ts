/*
 * smoke.ts — full SSR/render smoke (run via `npm run smoke`, also in CI before build).
 * Added in S16 (Wave C2, test parity); ports the database guide's scripts/smoke.ts pattern.
 *
 * Why this exists: the app lazy-loads every sim, figure and route page, so a component that
 * throws on render — or a registry key pointing at a broken module — is invisible until someone
 * manually navigates to it. `check:data` proves every referenced key *exists* in the registry,
 * but never *renders* anything. This smoke renders, on the server with `react-dom/server`, in
 * BOTH languages:
 *   A. every sim + figure component (auto-discovered from the file tree, 1 component per file),
 *   B. every route page's server-renderable shell (EcosystemMap, MentalModels, Glossary, Decide),
 *   C. the ModulePage header/TOC/nav for all 28 modules,
 *   D. the eager app shell (<App/>) across representative + bogus hashes — exercises the hash
 *      router + TopBar/Sidebar/Footer (lazy routes render as their Suspense fallback).
 *
 * Claude-guide specifics vs the database guide: the sims `import "./x.css"`, which Node can't
 * load as a module — so we register scripts/css-stub-hooks.mjs (a .css → empty-module hook)
 * BEFORE importing any component. JSX is avoided on purpose (createElement only) so this stays a
 * plain `.ts` that tsconfig.node.json typechecks and `tsx` runs directly.
 */
import { register } from "node:module";
// CHANGED (S16): stub `.css` imports so the SSR smoke can import CSS-co-located sims under tsx.
register("./css-stub-hooks.mjs", import.meta.url);

import { createElement as h } from "react";
import type { ReactNode } from "react";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";

// ── Minimal browser shim (SSR has no DOM; the provider reads localStorage at render) ────────────
let currentLang: "en" | "uk" = "en";
const g = globalThis as Record<string, unknown>;
const def = (k: string, v: unknown): void => {
  try {
    g[k] = v;
  } catch {
    Object.defineProperty(g, k, { value: v, configurable: true, writable: true });
  }
};
def("window", globalThis);
// Key-agnostic: LangContext's STORAGE_KEY is module-private, so return the target lang for any
// getItem — robust to a key rename, and the EN/UK sanity check below proves the switch took.
def("localStorage", {
  getItem: () => currentLang,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
});
def("matchMedia", (q: string) => ({
  matches: false,
  media: q,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}));
def("document", {
  documentElement: { lang: "", style: {}, setAttribute: () => {}, getAttribute: () => null },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
});
def("location", { hash: "" });

// React's legacy server APIs warn about Suspense/deprecation when the lazy app shell suspends;
// that noise is expected here. Drop only those messages — real errors still surface.
const NOISE = ["renderToStaticMarkup", "renderToString", "Suspense", "hydrat", "renderToPipeableStream"];
const origError = console.error.bind(console);
console.error = (...args: unknown[]): void => {
  if (NOISE.some((n) => String(args[0] ?? "").includes(n))) return;
  origError(...(args as Parameters<typeof origError>));
};

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

let checks = 0;
let failures = 0;
function ok(cond: boolean, msg: string): void {
  checks++;
  if (!cond) {
    failures++;
    console.error("  ✖ " + msg);
  }
}

/** Technical terms stay English in both languages, so these canaries apply to EN and UK alike. */
const SIM_CANARIES: Record<string, string[]> = {
  TokenBudgetSim: ["MTok"],
  PermissionResolverSim: ["bypassPermissions", ".claude/settings.json"],
  ToolPickerSim: ["Cowork"],
  TwoGateSim: ["READ", "ACT"],
  HooksSim: ["PreToolUse"],
  ActingTiersSim: ["Slack"],
  McpFlowSim: ["MCP"],
};
const FIG_CANARIES: Record<string, string[]> = {
  EcosystemLayers: ["Orchestration"],
  McpArchitecture: ["MCP"],
};

async function main(): Promise<void> {
  const { LangProvider } = await import("../src/i18n/LangContext");
  const { MODULES } = await import("../src/data/concepts");
  const { SIMS, FIGURES } = await import("../src/lib/registry");

  const langs = ["en", "uk"] as const;

  /** Render an element under the LangProvider in a given language. */
  function ssr(el: ReactNode, lang: "en" | "uk"): string {
    currentLang = lang;
    return renderToStaticMarkup(h(LangProvider, null, el));
  }

  /** Render + assert non-trivial length and that each canary substring is present. */
  function check(label: string, el: ReactNode, lang: "en" | "uk", min: number, includes: string[] = []): void {
    let html: string;
    try {
      html = ssr(el, lang);
    } catch (e) {
      ok(false, `${label} [${lang}] threw: ${(e as Error).message}`);
      return;
    }
    ok(html.length >= min, `${label} [${lang}] renders (${html.length} ≥ ${min} chars)`);
    for (const s of includes) ok(html.includes(s), `${label} [${lang}] contains "${s}"`);
  }

  // ── Layer A: every sim + figure component, auto-discovered (1 component per .tsx file) ──────────
  async function renderComponentDir(
    sub: "sims" | "figures",
    registryCount: number,
    canaries: Record<string, string[]>,
  ): Promise<number> {
    const dir = join(root, "src/components", sub);
    const files = readdirSync(dir).filter((f) => f.endsWith(".tsx"));
    // Drift guard: file count must match the registry (every component is registered & vice versa).
    ok(files.length === registryCount, `${sub}: ${files.length} component files == ${registryCount} registry keys`);
    let rendered = 0;
    for (const file of files) {
      const mod: Record<string, unknown> = await import(pathToFileURL(join(dir, file)).href);
      const entry = Object.entries(mod).find(([n, v]) => /^[A-Z]/.test(n) && typeof v === "function");
      if (!entry) {
        ok(false, `${sub}/${file}: no exported component`);
        continue;
      }
      const [name, Comp] = entry;
      for (const lang of langs) check(name, h(Comp as () => ReactNode), lang, 200, canaries[name] ?? []);
      rendered++;
    }
    return rendered;
  }

  const simCount = await renderComponentDir("sims", Object.keys(SIMS).length, SIM_CANARIES);
  const figCount = await renderComponentDir("figures", Object.keys(FIGURES).length, FIG_CANARIES);

  // ── Sanity: the language switch actually took (EN render differs from UK) ───────────────────────
  const { TwoGateSim } = await import("../src/components/sims/TwoGateSim");
  ok(ssr(h(TwoGateSim), "en") !== ssr(h(TwoGateSim), "uk"), "EN and UK renders differ (lang toggle works)");

  // ── Layer B: route pages (server-renderable shells) ────────────────────────────────────────────
  const { EcosystemMap } = await import("../src/components/map/EcosystemMap");
  const { MentalModelsPage } = await import("../src/components/pages/MentalModelsPage");
  const { GlossaryPage } = await import("../src/components/pages/GlossaryPage");
  const { DecidePage } = await import("../src/components/pages/DecidePage");

  for (const lang of langs) {
    check("EcosystemMap", h(EcosystemMap, { level: "all" }), lang, 1500);
    check("MentalModelsPage", h(MentalModelsPage, { level: "all" }), lang, 1000);
    check("GlossaryPage", h(GlossaryPage), lang, 1000);
    check("DecidePage", h(DecidePage), lang, 500, ["Cowork"]);
  }

  // ── Layer C: ModulePage header/TOC/nav for all 28 modules (lazy body blocks → Suspense fallback) ─
  const { ModulePage } = await import("../src/components/chapter/ModulePage");
  /** Longest run of latin/digit/space chars in a title (entity-safe substring to assert on). */
  function plainCanary(s: string): string {
    const runs = s.match(/[A-Za-z0-9][A-Za-z0-9 ]{3,}/g);
    if (!runs) return "";
    return runs.reduce((a, b) => (b.length > a.length ? b : a), "").trim();
  }
  for (const m of MODULES) {
    for (const lang of langs) {
      const canary = plainCanary(m.title[lang]);
      check(`ModulePage:${m.id}`, h(ModulePage, { id: m.id }), lang, 300, canary ? [canary] : []);
    }
  }

  // ── Layer D: eager app shell + hash router (lazy routes render as the Suspense fallback) ─────────
  const App = (await import("../src/App")).default;
  const hashes = ["", "#/map", "#/m/m15", "#/m/m26/tool-picker", "#/mental-models", "#/glossary", "#/decide", "#/m/does-not-exist", "#/total-garbage"];
  for (const hash of hashes) {
    (g.location as { hash: string }).hash = hash;
    check(`App ${hash || "(empty)"}`, h(App), "en", 3000);
  }

  // ── Report ──────────────────────────────────────────────────────────────────────────────────────
  console.log("— SSR / render smoke —");
  console.log(`  components:  ${simCount} sims + ${figCount} figures, each rendered EN + UK`);
  console.log(`  pages:       EcosystemMap · MentalModels · Glossary · Decide (EN + UK)`);
  console.log(`  modules:     ${MODULES.length} ModulePage headers (EN + UK)`);
  console.log(`  app shell:   ${hashes.length} hash routes (incl. unknown/garbage)`);
  console.log(`  ${checks} checks total`);

  if (failures > 0) {
    console.error(`\n✖ ${failures} smoke failure(s).`);
    process.exit(1);
  }
  console.log("\n✓ All SSR/render smoke checks passed.");
}

main().catch((e) => {
  console.error("smoke crashed:", e);
  process.exit(1);
});
