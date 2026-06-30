/*
 * test-token-budget.ts — golden invariants for the Token-Budget engine (src/lib/tokenBudget),
 * run via `npm run test:token-budget`. Proves the ★ Token Budget sim's numbers come from the
 * published API pricing (verified 2026-06-23), not hand-tuned values: the window fill, the
 * cacheable stable prefix billed at 10%, batch −50%, linear model pricing, and truncation.
 */
import {
  BATCH_FACTOR,
  CACHE_HIT_RATE,
  FIXED,
  MODELS,
  WINDOW_LARGE,
  WINDOW_STANDARD,
  computeBudget,
  type BKey,
  type BudgetInput,
} from "../src/lib/tokenBudget";

let failures = 0;
let checks = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) {
    failures++;
    console.error("  ✖ " + msg);
  }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps;

const ALL_ON: Record<BKey, boolean> = { sys: true, know: true, cap: true, mem: true, conv: true, file: true, out: true };
const price = (k: string): number => MODELS.find((m) => m.key === k)!.price;

// A canonical config: all blocks on, 12 turns, an 80k file, Sonnet, 200K window, caching on.
const base: BudgetInput = { on: ALL_ON, turns: 12, fileTok: 80_000, price: price("sonnet"), win: WINDOW_STANDARD, caching: true, batch: false };
const r = computeBudget(base);

// 1. Per-block tokens + total are the deterministic sum (1500+42000+9000+2000+30000+80000+8000).
assert(r.tok.conv === 12 * 2500, `conv = turns × 2500 (got ${r.tok.conv})`);
assert(r.tok.out === FIXED.out, `answer reserve is always ${FIXED.out} (got ${r.tok.out})`);
assert(r.total === 172_500, `total tokens = 172500 (got ${r.total})`);
assert(r.cacheTok === FIXED.sys + FIXED.know + FIXED.cap, `cacheable prefix = sys+know+cap = ${FIXED.sys + FIXED.know + FIXED.cap} (got ${r.cacheTok})`);
assert(r.pct === 86 && r.over === 172_500 - WINDOW_STANDARD, `86% of a 200K window, under budget (pct=${r.pct}, over=${r.over})`);

// 2. Raw input cost = total/1e6 × price; caching bills ONLY the stable prefix at 10%.
assert(near(r.raw, (172_500 / 1e6) * 3), `raw = total/1e6 × $3 (got ${r.raw})`);
assert(near(r.saved, (r.cacheTok * (1 - CACHE_HIT_RATE)) / 1e6 * 3), `caching saves the 90% of the cached prefix (got ${r.saved})`);
assert(r.opt < r.raw, `caching lowers the cost (opt ${r.opt} < raw ${r.raw})`);

// 3. Caching off ⇒ no saving; opt == raw.
const noCache = computeBudget({ ...base, caching: false });
assert(near(noCache.opt, noCache.raw) && near(noCache.saved, 0), `no caching ⇒ opt == raw, saved 0 (opt=${noCache.opt})`);

// 4. Batch halves the (already-cached) input cost.
const batched = computeBudget({ ...base, batch: true });
assert(near(batched.opt, r.opt * BATCH_FACTOR), `batch −50% halves the post-caching cost (got ${batched.opt}, want ${r.opt * BATCH_FACTOR})`);

// 5. Model price is linear: Opus = Sonnet × 5/3, Haiku = Sonnet × 1/3 (same tokens).
const opus = computeBudget({ ...base, price: price("opus") });
const haiku = computeBudget({ ...base, price: price("haiku") });
assert(near(opus.raw, r.raw * (5 / 3)) && near(haiku.raw, r.raw * (1 / 3)), `raw cost scales linearly with model price`);
assert(opus.total === r.total && haiku.total === r.total, `model choice does not change the token count`);

// 6. Truncation: a maxed file overflows a 200K window but fits the 1M window.
const overflow = computeBudget({ ...base, fileTok: 140_000 });
assert(overflow.over > 0 && overflow.total === 232_500, `maxed file overflows 200K by ${overflow.over} (total ${overflow.total})`);
const big = computeBudget({ ...base, fileTok: 140_000, win: WINDOW_LARGE });
assert(big.over < 0, `the same load fits the 1M window (over ${big.over})`);

// 7. Toggling a block off removes exactly its fixed tokens (and the answer reserve is untouched).
const noSys = computeBudget({ ...base, on: { ...ALL_ON, sys: false } });
assert(noSys.total === r.total - FIXED.sys && noSys.tok.out === FIXED.out, `dropping system removes exactly ${FIXED.sys} tokens, reserve intact`);

// 8. Determinism: identical input ⇒ byte-identical result.
assert(JSON.stringify(computeBudget(base)) === JSON.stringify(r), `computeBudget is deterministic`);

console.log("— Token-Budget engine tests —");
console.log(`  ${checks} checks: window fill, cacheable-prefix billing, batch, linear pricing, truncation`);
console.log(`  canonical: total ${r.total} tok · raw $${r.raw.toFixed(4)} · after levers $${r.opt.toFixed(4)} · saved $${r.saved.toFixed(4)}`);
if (failures > 0) {
  console.error(`\n✖ ${failures} invariant failure(s).`);
  process.exit(1);
}
console.log("\n✓ All Token-Budget invariants hold.");
