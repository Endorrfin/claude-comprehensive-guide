import React, { useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import { Md } from "../chapter/Md";
import type { Localized } from "../../data/types";
import "./permissionResolver.css";

/* ★ Permission-Rules Resolver — M22 Claude Code. Makes the abstract permission
   rule the module's settings.json block introduces concrete and pokeable: fire a
   tool call against a FIXED ruleset and watch it resolve top-to-bottom
   deny -> ask -> allow -> mode, first match wins. The ruleset is the exact one in
   M22's code block, so the sim and the JSON reinforce each other.

   It teaches the non-obvious facts straight from the Claude Code permissions doc:
   - rules are scanned deny -> ask -> allow and the FIRST match decides; rule
     specificity never changes that order;
   - a deny rule blocks in EVERY mode, including bypassPermissions;
   - an explicit ask rule still prompts even in bypassPermissions;
   - read-only tools (Read/Grep/Glob) need no approval — unless an explicit deny
     names them;
   - the permission MODE only decides a call that no rule matches.

   Toggle-driven (call x mode), deterministic, inherently reduced-motion-safe (no
   animation loop), ARIA radiogroups + a live region, bilingual. Mirrors
   ToolPickerSim / ActingTiersSim. */
const L = (en: string, uk: string): Localized => ({ en, uk });

type Verdict = "deny" | "ask" | "allow"; // a rule bucket AND a resolved outcome
type Mode = "default" | "acceptEdits" | "plan" | "bypass";

/* The fixed ruleset — mirrors the .claude/settings.json block in M22 t2. */
const RULES: { bucket: Verdict; patterns: string[] }[] = [
  { bucket: "deny", patterns: ["Read(./.env)", "Bash(rm:*)"] },
  { bucket: "ask", patterns: ["Bash(git push:*)"] },
  { bucket: "allow", patterns: ["Edit(src/**)", "Bash(npm run test:*)"] },
];
const BUCKET_INDEX: Record<Verdict, number> = { deny: 0, ask: 1, allow: 2 };

type Call = {
  id: string;
  label: string; // the literal call Claude attempts
  tool: "Edit" | "Bash" | "Read";
  desc: Localized;
  match: { bucket: Verdict; rule: string } | null; // the rule that decides (precedence-first), or null
  readOnly?: boolean; // unmatched read-only tool -> allowed in every mode
  why: Localized; // explanation for a rule-decided verdict
  modeNote?: Localized; // how the mode interacts (deny beats bypass, ask survives bypass, …)
};

const CALLS: Call[] = [
  {
    id: "edit-src",
    label: "Edit(src/api.ts)",
    tool: "Edit",
    desc: L("edit a file under src/", "редагувати файл під src/"),
    match: { bucket: "allow", rule: "Edit(src/**)" },
    why: L("It falls under the `Edit(src/**)` allow rule, so the scoped edit runs with no prompt.", "Воно підпадає під allow-правило `Edit(src/**)`, тож точкова правка виконується без запиту."),
    modeNote: L("An allow rule pre-approves it — the mode only steps in for calls no rule matches.", "Allow-правило схвалює його заздалегідь — режим втручається лише для викликів, які не збіглися з жодним правилом."),
  },
  {
    id: "edit-readme",
    label: "Edit(README.md)",
    tool: "Edit",
    desc: L("edit a file at the repo root", "редагувати файл у корені репо"),
    match: null, // README.md is not under src/ -> no rule matches -> the MODE decides
    why: L("No rule matches `README.md` (the allow rule only covers `src/**`), so the permission MODE decides — switch modes and watch the verdict flip.", "Жодне правило не збігається з `README.md` (allow покриває лише `src/**`), тож вирішує РЕЖИМ permission — перемикай режими й дивись, як змінюється вердикт."),
  },
  {
    id: "git-push",
    label: "Bash(git push origin main)",
    tool: "Bash",
    desc: L("push commits to the remote", "запушити коміти у remote"),
    match: { bucket: "ask", rule: "Bash(git push:*)" },
    why: L("It matches the `Bash(git push:*)` ask rule, so Claude pauses for your confirmation before pushing.", "Воно збігається з ask-правилом `Bash(git push:*)`, тож Claude зупиняється по твоє підтвердження перед push."),
    modeNote: L("An explicit ask rule prompts in EVERY mode — bypassPermissions skips prompts except the ones an ask rule forces.", "Явне ask-правило питає в БУДЬ-ЯКОМУ режимі — bypassPermissions пропускає запити, крім тих, які примушує ask-правило."),
  },
  {
    id: "rm",
    label: "Bash(rm -rf ~)",
    tool: "Bash",
    desc: L("delete the home directory", "видалити домашню теку"),
    match: { bucket: "deny", rule: "Bash(rm:*)" },
    why: L("It matches the `Bash(rm:*)` deny rule — blocked outright, and the scan stops at the first deny.", "Воно збігається з deny-правилом `Bash(rm:*)` — заблоковано одразу, і скан зупиняється на першому deny."),
    modeNote: L("A deny wins in EVERY mode, including bypassPermissions — and `rm -rf ~` also trips a built-in circuit breaker.", "Deny перемагає в БУДЬ-ЯКОМУ режимі, навіть bypassPermissions — а ще `rm -rf ~` спрацьовує вбудований запобіжник."),
  },
  {
    id: "read-env",
    label: "Read(./.env)",
    tool: "Read",
    desc: L("read the secrets file", "прочитати файл секретів"),
    match: { bucket: "deny", rule: "Read(./.env)" },
    why: L("It matches the `Read(./.env)` deny rule — the secret stays unreadable, even though reads are normally free.", "Воно збігається з deny-правилом `Read(./.env)` — секрет лишається недоступним, хоча читання зазвичай безкоштовне."),
    modeNote: L("Deny applies to reads too, and overrides the read-only default in every mode.", "Deny діє й на читання та перекриває read-only-дефолт у будь-якому режимі."),
  },
  {
    id: "read-config",
    label: "Read(src/config.ts)",
    tool: "Read",
    desc: L("read an ordinary source file", "прочитати звичайний файл коду"),
    match: null,
    readOnly: true,
    why: L("No rule matches, but Read is a read-only tool — read-only tools need no approval, so it runs in every mode.", "Жодне правило не збігається, але Read — read-only tool: read-only tools не потребують схвалення, тож воно працює в будь-якому режимі."),
    modeNote: L("Contrast `Read(./.env)`: same tool, opposite outcome — an explicit deny rule is the only difference.", "Порівняй із `Read(./.env)`: той самий tool, протилежний результат — різниця лише в явному deny-правилі."),
  },
];

const MODES: { id: Mode; name: string; behavior: Localized }[] = [
  { id: "default", name: "default", behavior: L("prompts on first use of each tool", "питає при першому використанні кожного tool") },
  { id: "acceptEdits", name: "acceptEdits", behavior: L("auto-accepts file edits in the working dir", "авто-приймає правки файлів у робочій теці") },
  { id: "plan", name: "plan", behavior: L("read-only — explore and propose, no edits", "лише читання — дослідити й запропонувати, без правок") },
  { id: "bypass", name: "bypassPermissions", behavior: L("skips prompts — except explicit ask rules", "пропускає запити — крім явних ask-правил") },
];

/* Outcome for an unmatched call, by mode. Read-only is handled before this. */
const MODE_EDIT: Record<Mode, Verdict> = { default: "ask", acceptEdits: "allow", plan: "deny", bypass: "allow" };
const MODE_BASH: Record<Mode, Verdict> = { default: "ask", acceptEdits: "ask", plan: "deny", bypass: "allow" };

function resolve(call: Call, mode: Mode): { outcome: Verdict; decidedBy: "rule" | "mode" } {
  if (call.match) return { outcome: call.match.bucket, decidedBy: "rule" };
  if (call.readOnly) return { outcome: "allow", decidedBy: "mode" };
  const table = call.tool === "Edit" ? MODE_EDIT : MODE_BASH;
  return { outcome: table[mode], decidedBy: "mode" };
}

const VERDICT_META: Record<Verdict, { label: Localized; cls: string }> = {
  allow: { label: L("Allowed", "Дозволено"), cls: "allow" },
  ask: { label: L("Ask first", "Спершу спитати"), cls: "ask" },
  deny: { label: L("Blocked", "Заблоковано"), cls: "deny" },
};

function modeWhy(call: Call, mode: Mode): Localized {
  // Read-only / explicitly-denied reads carry their own static `why`.
  if (call.readOnly || call.tool === "Read") return call.why;
  // Unmatched, non-read-only (the Edit-at-root case) — the mode is the decider.
  const byMode: Record<Mode, Localized> = {
    default: L("No rule matches, so the **default** mode prompts you on first use of Edit.", "Жодне правило не збігається, тож режим **default** питає при першому використанні Edit."),
    acceptEdits: L("No rule matches, but **acceptEdits** auto-approves file edits in the working directory.", "Жодне правило не збігається, але **acceptEdits** авто-схвалює правки файлів у робочій теці."),
    plan: L("No rule matches, and **plan** mode is read-only — the edit is blocked until you leave plan mode.", "Жодне правило не збігається, а режим **plan** — read-only: правку заблоковано, поки ти не вийдеш із plan mode."),
    bypass: L("No rule matches; **bypassPermissions** skips the prompt and lets the edit run.", "Жодне правило не збігається; **bypassPermissions** пропускає запит і дає правці виконатись."),
  };
  return byMode[mode];
}

export function PermissionResolverSim(): React.ReactElement {
  const { t } = useLang();
  const [callId, setCallId] = useState<string>("edit-src");
  const [mode, setMode] = useState<Mode>("default");

  const call = useMemo(() => CALLS.find((c) => c.id === callId) ?? CALLS[0], [callId]);
  const { outcome, decidedBy } = resolve(call, mode);
  const vmeta = VERDICT_META[outcome];

  // Which pipeline row decides: 0 deny · 1 ask · 2 allow · 3 mode.
  const deciderIndex = call.match ? BUCKET_INDEX[call.match.bucket] : 3;
  const rowState = (i: number): "decides" | "nomatch" | "unreached" =>
    i === deciderIndex ? "decides" : i < deciderIndex ? "nomatch" : "unreached";

  const activeMode = MODES.find((m) => m.id === mode)!;
  const why = decidedBy === "mode" ? modeWhy(call, mode) : call.why;

  return (
    <div className="prc">
      <div className="prc-head">
        {t(L("Fire a tool call and pick a permission mode — watch the ruleset resolve it, top to bottom.", "Запусти виклик tool і обери режим permission — дивись, як ruleset вирішує його згори вниз."))}
      </div>

      <div className="prc-facets">
        <div className="prc-facet">
          <div className="prc-q">{t(L("The tool call Claude attempts", "Виклик tool, який пробує Claude"))}</div>
          <div className="prc-opts" role="radiogroup" aria-label={t(L("Tool call", "Виклик tool"))}>
            {CALLS.map((c) => {
              const on = c.id === callId;
              return (
                <button key={c.id} className={on ? "prc-opt on" : "prc-opt"} role="radio" aria-checked={on} onClick={() => setCallId(c.id)}>
                  <span className="prc-opt-l">{c.label}</span>
                  <span className="prc-opt-s">{t(c.desc)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="prc-facet">
          <div className="prc-q">{t(L("Permission mode", "Режим permission"))}</div>
          <div className="prc-opts" role="radiogroup" aria-label={t(L("Permission mode", "Режим permission"))}>
            {MODES.map((m) => {
              const on = m.id === mode;
              return (
                <button key={m.id} className={on ? "prc-opt on" : "prc-opt"} role="radio" aria-checked={on} onClick={() => setMode(m.id)}>
                  <span className="prc-opt-l">{m.name}</span>
                  <span className="prc-opt-s">{t(m.behavior)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="prc-body">
        {/* The live ruleset, scanned top to bottom */}
        <div className="prc-rules">
          <div className="prc-rules-h">
            <span className="prc-file">.claude/settings.json</span>
            <span className="prc-order">{t(L("scanned deny → ask → allow → mode · first match wins", "скан deny → ask → allow → mode · перший збіг виграє"))}</span>
          </div>

          {RULES.map((r, i) => {
            const st = rowState(i);
            return (
              <div key={r.bucket} className={`prc-row ${r.bucket} ${st}`}>
                <span className="prc-bucket">{r.bucket}</span>
                <span className="prc-patterns">
                  {r.patterns.map((p) => {
                    const hit = st === "decides" && call.match?.rule === p;
                    return (
                      <code key={p} className={hit ? "prc-pat hit" : "prc-pat"}>{p}</code>
                    );
                  })}
                </span>
                <span className="prc-pill">
                  {st === "decides" ? t(L("✓ first match", "✓ перший збіг")) : st === "nomatch" ? t(L("no match", "немає збігу")) : t(L("not reached", "не дістались"))}
                </span>
              </div>
            );
          })}

          <div className={`prc-row mode ${rowState(3)}`}>
            <span className="prc-bucket">mode</span>
            <span className="prc-patterns">
              <code className="prc-pat mode">{activeMode.name}</code>
              <span className="prc-mode-beh">{t(activeMode.behavior)}</span>
            </span>
            <span className="prc-pill">
              {deciderIndex === 3 ? t(L("✓ decides", "✓ вирішує")) : t(L("not reached", "не дістались"))}
            </span>
          </div>
        </div>

        {/* The verdict */}
        <div className={`prc-verdict ${vmeta.cls}`} aria-live="polite">
          <div className="prc-v-top">
            <span className={`prc-badge ${vmeta.cls}`}>{t(vmeta.label)}</span>
            <span className="prc-decided">
              {decidedBy === "rule"
                ? t(L(`decided by the ${call.match!.bucket} rule`, `вирішено ${call.match!.bucket}-правилом`))
                : t(L(`decided by ${activeMode.name} mode — no rule matched`, `вирішено режимом ${activeMode.name} — жодне правило не збіглося`))}
            </span>
          </div>
          <div className="prc-why"><Md text={t(why)} /></div>
          {call.modeNote ? <div className="prc-note"><Md text={t(call.modeNote)} /></div> : null}
        </div>
      </div>

      <div className="prc-foot">
        {t(L("Rules always win before the mode, in the order deny → ask → allow — and a more specific allow never beats a matching deny or ask. The mode only decides a call no rule matches.", "Правила завжди виграють перед режимом, у порядку deny → ask → allow — і конкретніший allow ніколи не б'є deny чи ask, що збіглися. Режим вирішує лише виклик, який не збігся з жодним правилом."))}
      </div>
    </div>
  );
}
