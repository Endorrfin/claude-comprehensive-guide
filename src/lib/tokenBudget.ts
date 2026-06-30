// CHANGED (S16): pure pricing/window engine extracted from TokenBudgetSim (Wave C2,
// test parity). No React — deterministic math only, so scripts/test-token-budget.ts can
// prove the published API pricing (verified 2026-06-23) without rendering anything. The
// sim keeps the bilingual labels + colours and just consumes computeBudget() for the numbers.
//
// Model: the context window is a finite desk. The stable prefix (system + project
// knowledge + skills/tools) is cacheable and billed at 10% with prompt caching on;
// everything else is billed in full. Batch halves the (already cached) input cost.

/** The seven stacked context blocks, in render order. */
export type BKey = "sys" | "know" | "cap" | "mem" | "conv" | "file" | "out";

/** Consumer chat models and their per-MTok INPUT price (output is billed separately at 5×). */
export const MODELS: { key: string; label: string; price: number }[] = [
  { key: "opus", label: "Opus 4.8 · $5/MTok", price: 5 },
  { key: "sonnet", label: "Sonnet 4.6 · $3/MTok", price: 3 },
  { key: "haiku", label: "Haiku 4.5 · $1/MTok", price: 1 },
];

/** Fixed token sizes for the non-conversation, non-file blocks. */
export const FIXED: Record<"sys" | "know" | "cap" | "mem" | "out", number> = {
  sys: 1500,
  know: 42000,
  cap: 9000,
  mem: 2000,
  out: 8000, // the answer always needs room
};

/** Render/stack order of the blocks. */
export const ORDER: BKey[] = ["sys", "know", "cap", "mem", "conv", "file", "out"];
/** The blocks the user can toggle on/off (the rest are always present). */
export const TOGGLEABLE: BKey[] = ["sys", "know", "cap", "mem"];
/** The stable prefix that prompt caching can bill at 10%. */
export const CACHEABLE: ReadonlySet<BKey> = new Set<BKey>(["sys", "know", "cap"]);

export const CONV_TOKENS_PER_TURN = 2500;
export const CACHE_HIT_RATE = 0.1; // cached prefix billed at 10% of input (−90%)
export const BATCH_FACTOR = 0.5; // batch processing: −50%
export const WINDOW_STANDARD = 200_000;
export const WINDOW_LARGE = 1_000_000;

export type BudgetInput = {
  /** Whether each toggleable block is on. Only sys/know/cap/mem are read here. */
  on: Record<BKey, boolean>;
  turns: number; // conversation turns (each ≈ CONV_TOKENS_PER_TURN)
  fileTok: number; // attached-file size in tokens
  price: number; // model input price per MTok
  win: number; // context window size (WINDOW_STANDARD | WINDOW_LARGE)
  caching: boolean; // prompt caching on the stable prefix
  batch: boolean; // batch processing
};

export type BudgetResult = {
  tok: Record<BKey, number>; // tokens per block
  total: number; // total tokens in the window
  cacheTok: number; // tokens in the cacheable stable prefix
  over: number; // total − win (positive ⇒ truncation)
  pct: number; // total / win, rounded to a percent
  raw: number; // raw input $ for one call (no levers)
  opt: number; // $ after caching + batch
  saved: number; // raw − opt
};

/** Deterministically compute the window fill + the three cost figures for one call. */
export function computeBudget(input: BudgetInput): BudgetResult {
  const { on, turns, fileTok, price, win, caching, batch } = input;
  const tok: Record<BKey, number> = {
    sys: on.sys ? FIXED.sys : 0,
    know: on.know ? FIXED.know : 0,
    cap: on.cap ? FIXED.cap : 0,
    mem: on.mem ? FIXED.mem : 0,
    conv: turns * CONV_TOKENS_PER_TURN,
    file: fileTok,
    out: FIXED.out, // the answer always needs room
  };
  const total = ORDER.reduce((a, k) => a + tok[k], 0);
  const cacheTok = ORDER.reduce((a, k) => a + (CACHEABLE.has(k) ? tok[k] : 0), 0);
  const over = total - win;
  const pct = Math.round((total / win) * 100);

  const raw = (total / 1e6) * price;
  const effInput = caching ? total - cacheTok + cacheTok * CACHE_HIT_RATE : total;
  const opt = (effInput / 1e6) * price * (batch ? BATCH_FACTOR : 1);
  const saved = raw - opt;

  return { tok, total, cacheTok, over, pct, raw, opt, saved };
}
