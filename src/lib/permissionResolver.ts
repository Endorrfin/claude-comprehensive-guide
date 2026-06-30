// CHANGED (S16): pure Claude-Code permission-resolution engine extracted from
// PermissionResolverSim (Wave C2, test parity). No React — just the fixed ruleset and the
// resolution order, so scripts/test-permission-resolver.ts can prove the web-verified
// semantics (deny → ask → allow → mode, first match wins). The sim overlays the bilingual
// copy (desc/why/modeNote) onto these structural specs and renders identically.
//
// Web-verified (Claude Code permissions doc, S13): rules are scanned deny → ask → allow and
// the FIRST match decides — rule specificity never reorders this; a deny rule blocks in EVERY
// mode (incl. bypassPermissions); an explicit ask rule still prompts under bypassPermissions;
// read-only tools (Read/Grep/Glob) need no approval unless an explicit deny names them; the
// permission MODE only decides a call that no rule matches.

export type Verdict = "deny" | "ask" | "allow"; // a rule bucket AND a resolved outcome
export type Mode = "default" | "acceptEdits" | "plan" | "bypass";
export type Tool = "Edit" | "Bash" | "Read";

/** The fixed ruleset — mirrors the .claude/settings.json block in M22 t2. */
export const RULES: { bucket: Verdict; patterns: string[] }[] = [
  { bucket: "deny", patterns: ["Read(./.env)", "Bash(rm:*)"] },
  { bucket: "ask", patterns: ["Bash(git push:*)"] },
  { bucket: "allow", patterns: ["Edit(src/**)", "Bash(npm run test:*)"] },
];

/** Pipeline rows: 0 deny · 1 ask · 2 allow · 3 mode. */
export const BUCKET_INDEX: Record<Verdict, number> = { deny: 0, ask: 1, allow: 2 };
export const MODE_INDEX = 3;

export type CallSpec = {
  id: string;
  label: string; // the literal call Claude attempts (English code, not localized)
  tool: Tool;
  match: { bucket: Verdict; rule: string } | null; // the rule that decides (precedence-first), or null
  readOnly?: boolean; // an unmatched read-only tool → allowed in every mode
};

/** The six canonical tool calls the sim fires at the ruleset. */
export const CALLS: CallSpec[] = [
  { id: "edit-src", label: "Edit(src/api.ts)", tool: "Edit", match: { bucket: "allow", rule: "Edit(src/**)" } },
  { id: "edit-readme", label: "Edit(README.md)", tool: "Edit", match: null }, // not under src/** → mode decides
  { id: "git-push", label: "Bash(git push origin main)", tool: "Bash", match: { bucket: "ask", rule: "Bash(git push:*)" } },
  { id: "rm", label: "Bash(rm -rf ~)", tool: "Bash", match: { bucket: "deny", rule: "Bash(rm:*)" } },
  { id: "read-env", label: "Read(./.env)", tool: "Read", match: { bucket: "deny", rule: "Read(./.env)" } },
  { id: "read-config", label: "Read(src/config.ts)", tool: "Read", match: null, readOnly: true },
];

export const MODES: Mode[] = ["default", "acceptEdits", "plan", "bypass"];

/** Outcome for an UNMATCHED call, by mode (read-only is handled before this). */
export const MODE_EDIT: Record<Mode, Verdict> = { default: "ask", acceptEdits: "allow", plan: "deny", bypass: "allow" };
export const MODE_BASH: Record<Mode, Verdict> = { default: "ask", acceptEdits: "ask", plan: "deny", bypass: "allow" };

export type Resolution = {
  outcome: Verdict;
  decidedBy: "rule" | "mode";
  /** Which pipeline row decides: 0 deny · 1 ask · 2 allow · 3 mode. */
  deciderIndex: number;
};

/** Resolve a tool call: a matching rule wins (deny → ask → allow, first match),
    independent of the mode; otherwise the mode decides (read-only is always allowed). Pure. */
export function resolve(call: CallSpec, mode: Mode): Resolution {
  if (call.match) return { outcome: call.match.bucket, decidedBy: "rule", deciderIndex: BUCKET_INDEX[call.match.bucket] };
  if (call.readOnly) return { outcome: "allow", decidedBy: "mode", deciderIndex: MODE_INDEX };
  const table = call.tool === "Edit" ? MODE_EDIT : MODE_BASH;
  return { outcome: table[mode], decidedBy: "mode", deciderIndex: MODE_INDEX };
}
