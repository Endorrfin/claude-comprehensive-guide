import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./hooks.css";

/* ★ Hooks — the deterministic-gate stepper (M24). Promotes the static
   `hook-lifecycle` figure into the loop it describes: walk the Claude Code
   lifecycle (SessionStart → UserPromptSubmit → PreToolUse → PostToolUse → Stop)
   while a dangerous `rm -rf` rides through it. Toggle the `block-rm` deny-hook
   ON and the PreToolUse hook stops the command BEFORE it runs — every time,
   deterministically. Toggle it OFF and there is no deterministic gate: blocking
   rides on the model refusing + your permission prompt — usually, not always.
   The single idea the module exists to teach, made interactive. Deterministic;
   play/pause/step; reduced-motion-safe; ARIA live region; bilingual. Mirrors
   AgentLoopSim (stepper) + TwoGateSim (a toggle that flips the outcome). */
const L = (en: string, uk: string): Localized => ({ en, uk });

type Ev = "SessionStart" | "UserPrompt" | "PreToolUse" | "PostToolUse" | "Stop";
type HookKind = "inject" | "gate" | "observe" | "notify";
type Danger = "none" | "armed" | "blocked" | "safe" | "ungated";
type Step = { ev: Ev; hook: HookKind | null; label: Localized; detail: Localized; danger: Danger };

/* Fixed lifecycle nodes, left → right (mirrors the hook-lifecycle figure). */
const NODES: { ev: Ev; label: string; cx: number; color: string }[] = [
  { ev: "SessionStart", label: "SessionStart", cx: 70, color: "var(--sem-context)" },
  { ev: "UserPrompt", label: "UserPrompt", cx: 224, color: "var(--sem-claude)" },
  { ev: "PreToolUse", label: "PreToolUse", cx: 380, color: "var(--sem-warn)" },
  { ev: "PostToolUse", label: "PostToolUse", cx: 536, color: "var(--sem-tool)" },
  { ev: "Stop", label: "Stop", cx: 690, color: "var(--sem-agentic)" },
];

const HOOK_COLOR: Record<HookKind, string> = {
  inject: "var(--sem-context)",
  gate: "var(--sem-warn)",
  observe: "var(--sem-tool)",
  notify: "var(--sem-agentic)",
};
const HOOK_TEXT: Record<HookKind, Localized> = {
  inject: L("inject context", "інжект context"),
  gate: L("⛔ deny", "⛔ deny"),
  observe: L("format · test", "format · test"),
  notify: L("notify · log", "notify · log"),
};

const DANGER_COLOR: Record<Danger, string> = {
  none: "var(--tx3)",
  armed: "var(--sem-agentic)",
  blocked: "var(--sem-ok)",
  safe: "var(--sem-ok)",
  ungated: "var(--sem-warn)",
};
const DANGER_GLYPH: Record<Danger, string> = { none: "", armed: "⚠", blocked: "🛡", safe: "✓", ungated: "⚠" };

const CMD = "Bash(rm -rf ~/project)";
const SAFE_CMD = "Bash(rm -rf ./dist)";

/** The two scripts. Same dangerous command; the hook toggle changes its fate. */
function buildSteps(hooks: boolean): Step[] {
  if (hooks) {
    return [
      { ev: "SessionStart", hook: "inject", label: L("SessionStart hook fires", "Спрацьовує SessionStart hook"), detail: L("A hook injects your project rules into context — guaranteed, before the first prompt. Not “if the model remembers”.", "Hook інжектить правила проєкту в context — гарантовано, ще до першого prompt. А не «якщо модель згадає»."), danger: "none" },
      { ev: "UserPrompt", hook: null, label: L("You send the task", "Ти надсилаєш задачу"), detail: L("“Clean up the project and free some disk space.”", "«Прибери проєкт і звільни трохи місця на диску.»"), danger: "none" },
      { ev: "PreToolUse", hook: null, label: L("Claude plans a tool call", "Claude планує виклик tool"), detail: L("To free space it proposes a shell command — Bash(rm -rf ~/project). Dangerous and irreversible.", "Щоб звільнити місце, він пропонує shell-команду — Bash(rm -rf ~/project). Небезпечно й незворотно."), danger: "armed" },
      { ev: "PreToolUse", hook: "gate", label: L("block-rm hook → deny", "block-rm hook → deny"), detail: L("The PreToolUse hook reads the command on stdin, matches rm -rf, and returns permissionDecision: deny. The call is blocked before it ever runs — deterministically.", "PreToolUse hook читає команду зі stdin, ловить rm -rf і повертає permissionDecision: deny. Виклик заблоковано ще до запуску — детерміновано."), danger: "blocked" },
      { ev: "PreToolUse", hook: null, label: L("Claude adapts", "Claude підлаштовується"), detail: L("Blocked, Claude proposes a scoped Bash(rm -rf ./dist). The hook inspects it, finds it safe, and allows it.", "Заблокований, Claude пропонує точкове Bash(rm -rf ./dist). Hook перевіряє, бачить безпечне — і пропускає."), danger: "safe" },
      { ev: "PostToolUse", hook: "observe", label: L("PostToolUse hook → verify", "PostToolUse hook → перевірка"), detail: L("After the change a hook auto-runs format + tests — every time, not when the model remembers to.", "Після зміни hook авто-запускає format + тести — щоразу, а не коли модель згадає."), danger: "none" },
      { ev: "Stop", hook: "notify", label: L("Stop hook → audit", "Stop hook → аудит"), detail: L("A Stop hook logs the session and pings you. The dangerous command never executed.", "Stop hook логує сесію і пінгує тебе. Небезпечна команда так і не виконалась."), danger: "none" },
    ];
  }
  return [
    { ev: "SessionStart", hook: null, label: L("Session starts — no hook", "Сесія стартує — без hook"), detail: L("Nothing injects your rules. Claude works from CLAUDE.md only if it recalls it under load.", "Ніщо не інжектить правила. Claude бере з CLAUDE.md, лише якщо згадає під навантаженням."), danger: "none" },
    { ev: "UserPrompt", hook: null, label: L("You send the task", "Ти надсилаєш задачу"), detail: L("“Clean up the project and free some disk space.”", "«Прибери проєкт і звільни трохи місця на диску.»"), danger: "none" },
    { ev: "PreToolUse", hook: null, label: L("Claude plans a tool call", "Claude планує виклик tool"), detail: L("It proposes the same dangerous command — Bash(rm -rf ~/project).", "Він пропонує ту саму небезпечну команду — Bash(rm -rf ~/project)."), danger: "armed" },
    { ev: "PreToolUse", hook: null, label: L("No PreToolUse gate", "Немає PreToolUse-воріт"), detail: L("Nothing deterministically inspects the command. Whether it’s stopped rides on the model refusing plus your permission prompt — usually yes, but not guaranteed.", "Ніщо детерміновано не перевіряє команду. Чи буде зупинено — залежить від відмови моделі плюс твого permission-запиту: зазвичай так, але не гарантовано."), danger: "ungated" },
    { ev: "PostToolUse", hook: null, label: L("No PostToolUse hook either", "Так само немає PostToolUse hook"), detail: L("No automatic format / lint / test runs after a change — you just hope it happened.", "Жоден format / lint / тест не запускається автоматично після зміни — лишається тільки сподіватися."), danger: "none" },
    { ev: "Stop", hook: null, label: L("No Stop hook — no audit trail", "Немає Stop hook — немає аудиту"), detail: L("The turn ends with no log and no notification. Nothing here was guaranteed.", "Хід завершується без логу й сповіщення. Тут нічого не було гарантовано."), danger: "ungated" },
  ];
}

export function HooksSim(): React.ReactElement {
  const { t } = useLang();
  const [hooks, setHooks] = useState(true);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const steps = useMemo(() => buildSteps(hooks), [hooks]);
  const cur = steps[i];
  const atEnd = i >= steps.length - 1;
  const activeIdx = NODES.findIndex((n) => n.ev === cur.ev);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // Flipping the hook toggle re-arms the run from the start.
  useEffect(() => {
    setPlaying(false);
    setI(0);
  }, [hooks]);

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setI((x) => Math.min(x + 1, steps.length - 1)), 1400);
    return () => window.clearTimeout(id);
  }, [playing, i, steps.length]);

  const verdict = hooks
    ? { cls: "safe", title: L("Guaranteed 🛡", "Гарантовано 🛡"), body: L("The block-rm hook denied rm -rf before it ran — every run, deterministically. Hooks turn “please don’t” into “can’t”.", "block-rm hook відхилив rm -rf до запуску — щоразу, детерміновано. Hooks перетворюють «будь ласка, ні» на «не можна».") }
    : { cls: "risk", title: L("No guarantee ⚠", "Без гарантій ⚠"), body: L("Nothing deterministically stopped the command. The model usually refuses and the permission prompt usually catches it — but “usually” isn’t a control. For lines you never want crossed, use a hook.", "Ніщо детерміновано не зупинило команду. Модель зазвичай відмовляється, а permission-запит зазвичай ловить — але «зазвичай» це не контроль. Для меж, які не можна переходити, став hook.") };

  // The command chip appears once the dangerous call is on the table (danger != none/from step 'armed' on).
  const showCmd = cur.danger !== "none" || steps.slice(0, i + 1).some((s) => s.danger !== "none");
  const cmdLabel = cur.danger === "safe" ? SAFE_CMD : CMD;
  const cmdColor = DANGER_COLOR[cur.danger === "none" ? "armed" : cur.danger];
  const cmdGlyph = DANGER_GLYPH[cur.danger === "none" ? "armed" : cur.danger];

  return (
    <div className="hk">
      <div className="hk-toggle-wrap">
        <div className="hk-q">{t(L("PreToolUse hook — is a block-rm deny-hook registered?", "PreToolUse hook — чи зареєстровано block-rm deny-hook?"))}</div>
        <div className="hk-opts" role="radiogroup" aria-label={t(L("Hooks", "Hooks"))}>
          <button className={hooks ? "hk-opt on ok" : "hk-opt"} role="radio" aria-checked={hooks} onClick={() => setHooks(true)}>
            <span className="hk-opt-l">{t(L("Hooks ON", "Hooks УВІМК"))}</span>
            <span className="hk-opt-s">{t(L("block-rm registered · deterministic", "block-rm зареєстровано · детерміновано"))}</span>
          </button>
          <button className={!hooks ? "hk-opt on danger" : "hk-opt"} role="radio" aria-checked={!hooks} onClick={() => setHooks(false)}>
            <span className="hk-opt-l">{t(L("No hooks", "Без hooks"))}</span>
            <span className="hk-opt-s">{t(L("rely on the model · probabilistic", "покладаєшся на модель · імовірнісно"))}</span>
          </button>
        </div>
      </div>

      <svg className="hk-stage" viewBox="0 0 760 232" role="img" aria-label={t(L("The Claude Code lifecycle as a track: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop. A dangerous rm -rf command rides through it; a PreToolUse block-rm hook stops it before it runs.", "Життєвий цикл Claude Code як доріжка: SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop. Небезпечна команда rm -rf проходить крізь нього; PreToolUse block-rm hook зупиняє її до запуску."))} style={{ fontFamily: "var(--font-body)" }}>
        <defs>
          <marker id="hk-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" /></marker>
        </defs>

        {/* the command chip (top) — only after the dangerous call is proposed */}
        {showCmd ? (
          <g style={{ transform: `translateX(${NODES[activeIdx].cx}px)`, transition: reduced ? "none" : "transform 0.4s ease" }}>
            <rect x={-92} y={14} width={184} height={30} rx={8} fill="var(--bg)" stroke={cmdColor} strokeWidth={1.8} />
            <text x={-78} y={33} fontSize={11.5} fill={cmdColor}>{cmdGlyph}</text>
            <text x={6} y={33} textAnchor="middle" fontSize={11} fill="var(--tx)" style={{ fontFamily: "var(--font-mono)" }}>{cmdLabel}</text>
            <line x1={0} y1={44} x2={0} y2={68} stroke={cmdColor} strokeWidth={1.3} strokeDasharray="3 3" />
          </g>
        ) : null}

        {/* lifecycle track */}
        <line x1="40" y1="96" x2="716" y2="96" stroke="var(--line2)" strokeWidth={1.5} markerEnd="url(#hk-ah)" />

        {/* nodes */}
        {NODES.map((n, idx) => {
          const on = idx === activeIdx;
          const passed = idx < activeIdx;
          return (
            <g key={n.ev}>
              <rect x={n.cx - 50} y={76} width={100} height={40} rx={10} fill={on ? "var(--s2)" : "var(--surface)"} stroke={n.color} strokeWidth={on ? 2.8 : 1.3} opacity={on ? 1 : passed ? 0.92 : 0.8} />
              <text x={n.cx} y={101} textAnchor="middle" fontSize={11} fontWeight={on ? 700 : 500} fill={on ? "var(--tx)" : "var(--tx2)"} style={{ fontFamily: "var(--font-mono)" }}>{n.label}</text>
            </g>
          );
        })}

        {/* hook hanging off the active event, when one fires this step */}
        {cur.hook ? (
          <g>
            <line x1={NODES[activeIdx].cx} y1={117} x2={NODES[activeIdx].cx} y2={150} stroke={HOOK_COLOR[cur.hook]} strokeWidth={1.4} strokeDasharray="3 3" />
            <rect x={NODES[activeIdx].cx - 70} y={150} width={140} height={44} rx={9} fill="var(--surface)" stroke={HOOK_COLOR[cur.hook]} strokeWidth={cur.hook === "gate" ? 2.4 : 1.6} />
            <text x={NODES[activeIdx].cx} y={169} textAnchor="middle" fontSize={11} fontWeight={700} fill={cur.hook === "gate" ? HOOK_COLOR[cur.hook] : "var(--tx)"}>{cur.hook === "gate" ? t(L("PreToolUse hook", "PreToolUse hook")) : t(L("hook", "hook"))}</text>
            <text x={NODES[activeIdx].cx} y={184} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{t(HOOK_TEXT[cur.hook])}</text>
          </g>
        ) : (
          <text x={NODES[activeIdx].cx} y={168} textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{t(L("no hook here", "тут немає hook"))}</text>
        )}

        <text x={380} y={222} textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{t(L("hooks run deterministically — every time, not when the model remembers", "hooks працюють детерміновано — щоразу, а не коли модель згадає"))}</text>
      </svg>

      <div className="hk-grid">
        <div className="hk-panel">
          <span className="hk-step-no">{t(L("Step", "Крок"))} {i + 1} / {steps.length}</span>
          <div><span className="hk-chip" style={{ background: cur.hook ? HOOK_COLOR[cur.hook] : "var(--tx3)" }}>{cur.ev}</span></div>
          <div className="hk-label">{t(cur.label)}</div>
          <div className="hk-detail" aria-live="polite">{t(cur.detail)}</div>
        </div>
        <div className={`hk-verdict ${atEnd ? verdict.cls : "pending"}`} aria-live="polite">
          {atEnd ? (
            <>
              <div className="hk-verdict-t">{t(verdict.title)}</div>
              <div className="hk-verdict-b">{t(verdict.body)}</div>
            </>
          ) : (
            <div className="hk-verdict-b">
              {t(L("PreToolUse gate", "PreToolUse-ворота"))}: <b className={hooks ? "ok" : "danger"}>{hooks ? t(L("deterministic", "детерміновано")) : t(L("none", "немає"))}</b>
              <div className="hk-verdict-run">{t(L("Step to the end to see how the rm -rf ends up.", "Дійди до кінця, щоб побачити, чим завершиться rm -rf."))}</div>
            </div>
          )}
        </div>
      </div>

      <div className="hk-controls">
        <button className="btn" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0 && !playing}>↺ {t(L("Reset", "Скинути"))}</button>
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.max(0, x - 1)); }} disabled={i === 0}>← {t(L("Back", "Назад"))}</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (atEnd) setI(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.min(steps.length - 1, x + 1)); }} disabled={atEnd}>{t(L("Step", "Крок"))} →</button>
        <span className="spacer" />
        <span className="hk-hint">{t(L("a hook is a guarantee, not a suggestion", "hook — це гарантія, а не порада"))}</span>
      </div>

      <div className="hk-foot">{t(L("Use a hook for the lines you never want crossed (block rm -rf, always test); leave judgement to the model.", "Став hook на межі, які не можна переходити (блок rm -rf, завжди тести); судження лиши моделі."))}</div>
    </div>
  );
}
