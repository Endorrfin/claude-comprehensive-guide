/*
 * test-permission-resolver.ts — golden invariants for the permission-resolution engine
 * (src/lib/permissionResolver), run via `npm run test:permission-resolver`. Proves the ★ M22
 * Permission-Rules Resolver encodes the web-verified Claude Code semantics: deny → ask → allow
 * → mode, first match wins; a deny/ask rule survives EVERY mode (incl. bypassPermissions);
 * read-only tools need no approval unless explicitly denied; the mode only decides an unmatched call.
 */
import {
  BUCKET_INDEX,
  CALLS,
  MODES,
  MODE_INDEX,
  resolve,
  type Mode,
  type Verdict,
} from "../src/lib/permissionResolver";

let failures = 0;
let checks = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) {
    failures++;
    console.error("  ✖ " + msg);
  }
}
const call = (id: string) => CALLS.find((c) => c.id === id)!;

// 0. Precedence order: deny(0) < ask(1) < allow(2) < mode(3).
assert(BUCKET_INDEX.deny < BUCKET_INDEX.ask && BUCKET_INDEX.ask < BUCKET_INDEX.allow && BUCKET_INDEX.allow < MODE_INDEX, "precedence deny < ask < allow < mode");
assert(MODES.length === 4, `4 permission modes (got ${MODES.length})`);

// 1. Rule-decided calls resolve identically in EVERY mode — the mode cannot override a matched rule.
const RULE_DECIDED: { id: string; outcome: Verdict; index: number }[] = [
  { id: "edit-src", outcome: "allow", index: BUCKET_INDEX.allow },
  { id: "git-push", outcome: "ask", index: BUCKET_INDEX.ask }, // ask survives bypass
  { id: "rm", outcome: "deny", index: BUCKET_INDEX.deny }, // deny beats every mode
  { id: "read-env", outcome: "deny", index: BUCKET_INDEX.deny }, // deny overrides the read-only default
];
for (const { id, outcome, index } of RULE_DECIDED) {
  for (const m of MODES) {
    const r = resolve(call(id), m);
    assert(r.outcome === outcome && r.decidedBy === "rule" && r.deciderIndex === index, `${id} → ${outcome} (rule) in ${m} mode (got ${r.outcome}/${r.decidedBy})`);
  }
}

// 2. The non-obvious ones spelled out: ask + deny still hold under bypassPermissions.
assert(resolve(call("git-push"), "bypass").outcome === "ask", "an explicit ask rule still prompts under bypassPermissions");
assert(resolve(call("rm"), "bypass").outcome === "deny", "a deny rule blocks even under bypassPermissions");

// 3. Read-only, unmatched (read-config) → allowed in every mode (decided by the read-only default).
for (const m of MODES) {
  const r = resolve(call("read-config"), m);
  assert(r.outcome === "allow" && r.decidedBy === "mode" && r.deciderIndex === MODE_INDEX, `read-config (read-only) → allow in ${m} (got ${r.outcome})`);
}
// …but the same tool with an explicit deny (read-env) is blocked — only the rule differs.
assert(resolve(call("read-env"), "default").outcome === "deny" && resolve(call("read-config"), "default").outcome === "allow", "same Read tool, opposite outcome — an explicit deny is the only difference");

// 4. The MODE only decides an UNMATCHED, non-read-only call: edit-readme flips across modes.
const EDIT_README: Record<Mode, Verdict> = { default: "ask", acceptEdits: "allow", plan: "deny", bypass: "allow" };
for (const m of MODES) {
  const r = resolve(call("edit-readme"), m);
  assert(r.outcome === EDIT_README[m] && r.decidedBy === "mode" && r.deciderIndex === MODE_INDEX, `edit-readme → ${EDIT_README[m]} (mode) in ${m} (got ${r.outcome}/${r.decidedBy})`);
}
// The flip proves the mode actually matters for unmatched calls.
const readmeOutcomes = new Set(MODES.map((m) => resolve(call("edit-readme"), m).outcome));
assert(readmeOutcomes.size >= 3, `edit-readme genuinely varies by mode (got ${[...readmeOutcomes].join("/")})`);

// 5. Every CALLS entry resolves to a real verdict in every mode (no undefined leaks).
const VERDICTS = new Set<Verdict>(["deny", "ask", "allow"]);
for (const c of CALLS) for (const m of MODES) assert(VERDICTS.has(resolve(c, m).outcome), `${c.id}/${m} yields a valid verdict`);

console.log("— Permission-Rules Resolver engine tests —");
console.log(`  ${checks} checks across ${CALLS.length} calls × ${MODES.length} modes: precedence, deny/ask survive bypass, read-only default, mode-decides-unmatched`);
if (failures > 0) {
  console.error(`\n✖ ${failures} invariant failure(s).`);
  process.exit(1);
}
console.log("\n✓ All Permission-Rules Resolver invariants hold.");
