/*
 * test-decide.ts — golden invariants for the Tool-Picker scoring engine (src/lib/decide),
 * run via `npm run test:decide`. Proves the ★ Tool Picker / #/decide ranking reproduces the
 * documented spot-checks (files→Cowork, code→Code, web→Chrome [gated on Free], app→Connector,
 * expertise→Skill) from a real score, and that `where` dominates, gating is exact, and the
 * data/decide `recommend()` wrapper matches the engine.
 */
import { GATED_FACTOR, WHERE_WEIGHT, rankSurfaces, scoreSurface, type Answers } from "../src/lib/decide";
import { SURFACES, recommend } from "../src/data/decide";

let failures = 0;
let checks = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) {
    failures++;
    console.error("  ✖ " + msg);
  }
}

const topId = (a: Answers): string => rankSurfaces(SURFACES, a)[0].surface.id;
const surf = (id: string) => SURFACES.find((s) => s.id === id)!;

// 1. The documented spot-checks: `where` (with the right plan) picks the intended surface.
assert(topId({ where: "files", autonomy: "task", plan: "paid" }) === "cowork", "files → Cowork");
assert(topId({ where: "code", autonomy: "task", plan: "paid" }) === "code", "code → Claude Code");
assert(topId({ where: "web", autonomy: "task", plan: "paid" }) === "chrome", "web → Claude in Chrome");
assert(topId({ where: "app", autonomy: "reply", plan: "free" }) === "connector", "app → Connector/MCP");
assert(topId({ where: "expertise", autonomy: "task", plan: "paid" }) === "skill", "expertise → Skill");
assert(topId({ where: "chat", autonomy: "reply", plan: "free" }) === "chat", "chat → Chat + Artifacts");
assert(topId({ where: "office", autonomy: "task", plan: "paid" }) === "office", "office → Excel/PowerPoint");

// 2. Web is Chrome's home, but Chrome is paid-only — on Free it still ranks #1, flagged `gated`.
const webFree = rankSurfaces(SURFACES, { where: "web", autonomy: "task", plan: "free" });
assert(webFree[0].surface.id === "chrome" && webFree[0].gated, "web on Free → Chrome is #1 but gated");
const webPaid = rankSurfaces(SURFACES, { where: "web", autonomy: "task", plan: "paid" });
assert(webPaid[0].surface.id === "chrome" && !webPaid[0].gated, "web on Paid → Chrome is #1, not gated");

// 3. Gating math is exact: a paid-only surface on Free scores base × GATED_FACTOR.
const chrome = surf("chrome");
const paidScore = scoreSurface(chrome, { where: "web", autonomy: "task", plan: "paid" }).score;
const freeScore = scoreSurface(chrome, { where: "web", autonomy: "task", plan: "free" }).score;
assert(Math.abs(freeScore - paidScore * GATED_FACTOR) < 1e-9, `Free score = paid × ${GATED_FACTOR} (got ${freeScore} vs ${paidScore * GATED_FACTOR})`);
// A free (non-paid-only) surface is never gated.
assert(!scoreSurface(surf("connector"), { where: "app", autonomy: "reply", plan: "free" }).gated, "a free surface is never gated");

// 4. `where` dominates: its weight (×10) outweighs any autonomy modifier.
const cowork = surf("cowork");
const fitFiles = (cowork.fit.files ?? 0) * WHERE_WEIGHT;
const maxAutonomy = Math.max(...Object.values(cowork.autonomy).map((v) => Math.abs(v ?? 0)));
assert(fitFiles > maxAutonomy, `where weight (${fitFiles}) dwarfs any autonomy modifier (${maxAutonomy})`);

// 5. Results are sorted best-first and carry only positive scores.
const ranked = rankSurfaces(SURFACES, { where: "files", autonomy: "task", plan: "paid" });
assert(ranked.every((r, i) => i === 0 || ranked[i - 1].score >= r.score), "ranked descending by score");
assert(ranked.every((r) => r.score > 0), "non-positive scores are dropped");

// 6. recommend() (data/decide wrapper) matches the engine exactly.
const a: Answers = { where: "files", autonomy: "recurring", plan: "paid" };
assert(
  JSON.stringify(recommend(a).map((r) => [r.surface.id, r.score, r.gated])) ===
    JSON.stringify(rankSurfaces(SURFACES, a).map((r) => [r.surface.id, r.score, r.gated])),
  "recommend() == rankSurfaces(SURFACES) (the wrapper preserves behaviour)",
);

// 7. Determinism.
assert(
  JSON.stringify(rankSurfaces(SURFACES, a)) === JSON.stringify(rankSurfaces(SURFACES, a)),
  "rankSurfaces is deterministic",
);

console.log("— Tool-Picker scoring engine tests —");
console.log(`  ${checks} checks: 7 spot-checks, gated math, where-dominance, sort/filter, recommend() parity`);
console.log(`  surfaces ranked: ${SURFACES.length}`);
if (failures > 0) {
  console.error(`\n✖ ${failures} invariant failure(s).`);
  process.exit(1);
}
console.log("\n✓ All Tool-Picker scoring invariants hold.");
