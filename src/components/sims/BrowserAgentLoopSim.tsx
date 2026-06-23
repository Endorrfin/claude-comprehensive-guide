import React, { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./browserAgentLoop.css";

/* Browser-agent loop — a light interactive for M20 (Claude in Chrome).
   Step the agent through its loop on a real-ish task (sign up + read a
   confirmation): Perceive (screenshot + read DOM) → Reason (plan) → Act
   (navigate / type / create) → Observe → repeat → Done. The permission model
   is wired in exactly as verified (2026-06-23):
     • "Ask before acting"  → approve a PLAN up front, then a per-DOMAIN prompt
       on the first action on a site.
     • "Act without asking" → no plan / domain prompts…
     • …but PROTECTED actions (purchases, permanent deletes, account creation,
       permission changes) ALWAYS gate — in both modes.
   Deterministic; bilingual; ARIA; reduced-motion drops only the autoplay. */

const L = (en: string, uk: string): Localized => ({ en, uk });

type Phase = "perceive" | "reason" | "act" | "observe" | "done";
type GateKind = "none" | "plan" | "domain" | "protected";
type Step = {
  phase: Phase;
  tag?: Localized; // small act tag (navigate / type / extract …)
  title: Localized;
  detail: Localized;
  url: string;
  gate: GateKind;
};

const PHASES: { key: Phase; color: string; label: Localized; sub: Localized }[] = [
  { key: "perceive", color: "var(--sem-tool)", label: L("Perceive", "Сприйняти"), sub: L("read page", "читає сторінку") },
  { key: "reason", color: "var(--accent)", label: L("Reason", "Міркувати"), sub: L("plan next", "планує крок") },
  { key: "act", color: "var(--sem-agentic)", label: L("Act", "Діяти"), sub: L("click · type", "клік · друк") },
  { key: "observe", color: "var(--sem-context)", label: L("Observe", "Спостерігати"), sub: L("read result", "читає результат") },
];
const phaseColor = (p: Phase): string => (p === "done" ? "var(--sem-ok)" : PHASES.find((x) => x.key === p)!.color);

const STEPS: Step[] = [
  { phase: "perceive", tag: L("read", "read"), title: L("Screenshot + read the page", "Скриншот + читання сторінки"), detail: L("Claude captures the active tab and reads its text — it sees only what's on screen.", "Claude знімає активну вкладку й читає її текст — бачить лише те, що на екрані."), url: "news.example.com", gate: "none" },
  { phase: "reason", title: L("Make a plan", "Скласти план"), detail: L("Goal → steps, and the list of sites it may touch. In “Ask before acting” you approve this plan first.", "Мета → кроки й перелік сайтів, яких можна торкатися. У «Ask before acting» ти спершу схвалюєш план."), url: "news.example.com", gate: "plan" },
  { phase: "act", tag: L("navigate", "navigate"), title: L("Navigate to /signup", "Перейти на /signup"), detail: L("First action on this domain — “Ask before acting” shows a per-site permission prompt.", "Перша дія на цьому домені — «Ask before acting» показує per-site запит дозволу."), url: "news.example.com/signup", gate: "domain" },
  { phase: "observe", title: L("Signup form loaded", "Форму реєстрації завантажено"), detail: L("Claude reads the fields it can act on: email, and a “Create account” button.", "Claude читає поля, з якими може діяти: email і кнопку «Create account»."), url: "news.example.com/signup", gate: "none" },
  { phase: "act", tag: L("type", "type"), title: L("Type your email", "Ввести email"), detail: L("Fills the email field. Ordinary typing isn't gated on a trusted site.", "Заповнює поле email. Звичайний друк на довіреному сайті не гейтиться."), url: "news.example.com/signup", gate: "none" },
  { phase: "reason", title: L("Next action is protected", "Наступна дія — захищена"), detail: L("Creating an account is on the always-ask list — alongside purchases, deletes and permission changes.", "Створення акаунта — у списку «завжди питати», поряд із покупками, видаленням і зміною дозволів."), url: "news.example.com/signup", gate: "none" },
  { phase: "act", tag: L("create", "create"), title: L("Create account", "Створити акаунт"), detail: L("A protected action — Claude asks for explicit approval EVEN in “Act without asking”.", "Захищена дія — Claude питає явний дозвіл НАВІТЬ у «Act without asking»."), url: "news.example.com/signup", gate: "protected" },
  { phase: "act", tag: L("extract", "extract"), title: L("Extract the confirmation #", "Витягти номер підтвердження"), detail: L("Reads the confirmation number off the success page.", "Зчитує номер підтвердження зі сторінки успіху."), url: "news.example.com/welcome", gate: "none" },
  { phase: "done", title: L("Return the result to you", "Повернути результат тобі"), detail: L("Claude hands back the confirmation. You stayed in control at every gate.", "Claude повертає підтвердження. Ти контролював кожні ворота."), url: "news.example.com/welcome", gate: "none" },
];
const N = STEPS.length;

type Mode = "ask" | "auto";
function gateActive(step: Step, mode: Mode): boolean {
  if (step.gate === "protected") return true;
  if (step.gate === "plan" || step.gate === "domain") return mode === "ask";
  return false;
}

export function BrowserAgentLoopSim(): React.ReactElement {
  const { t } = useLang();
  const [mode, setMode] = useState<Mode>("ask");
  const [done, setDone] = useState(0); // steps executed
  const [playing, setPlaying] = useState(false);
  const [awaiting, setAwaiting] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [reduced, setReduced] = useState(false);
  const resumeRef = useRef(false);

  const finished = done >= N;
  const cursor = Math.min(done, N - 1);
  const current = STEPS[cursor];
  const activePhase: Phase = finished ? "done" : current.phase;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // reset the run when the permission mode changes
  useEffect(() => {
    setPlaying(false);
    setAwaiting(false);
    setDeclined(false);
    setDone(0);
  }, [mode]);

  // autoplay: advance, but stop and surface a prompt at an active gate
  useEffect(() => {
    if (!playing || awaiting || declined) return;
    if (finished) {
      setPlaying(false);
      return;
    }
    if (gateActive(current, mode)) {
      resumeRef.current = true;
      setPlaying(false);
      setAwaiting(true);
      return;
    }
    const id = window.setTimeout(() => setDone((d) => d + 1), 760);
    return () => window.clearTimeout(id);
  }, [playing, awaiting, declined, finished, current, mode]);

  const step = (): void => {
    if (finished || declined || awaiting) return;
    if (gateActive(current, mode)) {
      resumeRef.current = false;
      setAwaiting(true);
      return;
    }
    setDone((d) => d + 1);
  };
  const approve = (): void => {
    setAwaiting(false);
    setDone((d) => d + 1);
    if (resumeRef.current && !reduced) setPlaying(true);
    resumeRef.current = false;
  };
  const decline = (): void => {
    setAwaiting(false);
    setPlaying(false);
    setDeclined(true);
    resumeRef.current = false;
  };
  const reset = (): void => {
    setPlaying(false);
    setAwaiting(false);
    setDeclined(false);
    setDone(0);
  };
  const runToEnd = (): void => {
    // execute remaining steps, honoring protected gates by stopping at the first one
    setPlaying(false);
    let d = done;
    while (d < N && !gateActive(STEPS[Math.min(d, N - 1)], mode)) d++;
    if (d < N && gateActive(STEPS[d], mode)) {
      resumeRef.current = false;
      setDone(d);
      setAwaiting(true);
    } else {
      setDone(N);
    }
  };

  const gateLabel = (): { title: Localized; note: Localized; opts: { k: string; label: Localized; primary?: boolean }[] } => {
    if (current.gate === "plan")
      return {
        title: L("Approve the plan?", "Схвалити план?"),
        note: L("Claude will only touch the sites listed in the plan. Approving lets it act within those bounds.", "Claude торкнеться лише сайтів зі списку плану. Схвалення дозволяє діяти в цих межах."),
        opts: [
          { k: "approve", label: L("Approve plan", "Схвалити план"), primary: true },
          { k: "decline", label: L("Make changes", "Внести зміни") },
        ],
      };
    if (current.gate === "domain")
      return {
        title: L("Allow action on news.example.com?", "Дозволити дію на news.example.com?"),
        note: L("Per-site permission. “Allow this action” is safest; “Always allow” trusts the whole site.", "Per-site дозвіл. «Allow this action» — найбезпечніше; «Always allow» довіряє всьому сайту."),
        opts: [
          { k: "approve", label: L("Allow this action", "Дозволити цю дію"), primary: true },
          { k: "approve2", label: L("Always allow on site", "Завжди на цьому сайті") },
          { k: "decline", label: L("Decline", "Відхилити") },
        ],
      };
    return {
      title: L("Approve: Create account?", "Схвалити: Create account?"),
      note: L("Protected actions (purchases, deletes, account creation, permission changes) ALWAYS ask — even in “Act without asking”.", "Захищені дії (покупки, видалення, створення акаунтів, зміна дозволів) ЗАВЖДИ питають — навіть у «Act without asking»."),
      opts: [
        { k: "approve", label: L("Approve", "Схвалити"), primary: true },
        { k: "decline", label: L("Decline", "Відхилити") },
      ],
    };
  };

  const X = [16, 188, 360, 532]; // phase chip x positions
  const CW = 156;
  const g = awaiting ? gateLabel() : null;

  return (
    <div className="bal">
      {/* task + mode */}
      <div className="bal-top">
        <div className="bal-task">
          <span className="bal-task-k">{t(L("Task", "Задача"))}</span>
          {t(L("Sign up on news.example.com and bring back the confirmation number.", "Зареєструватися на news.example.com і повернути номер підтвердження."))}
        </div>
        <div className="bal-seg" role="group" aria-label={t(L("Permission mode", "Режим дозволів"))}>
          {([["ask", L("Ask before acting", "Ask before acting")], ["auto", L("Act without asking", "Act without asking")]] as [Mode, Localized][]).map(([k, lab]) => (
            <button key={k} className={mode === k ? "on" : ""} aria-pressed={mode === k} onClick={() => setMode(k)}>
              {t(lab)}
            </button>
          ))}
        </div>
      </div>

      {/* stage: browser mock + phase loop */}
      <svg className="bal-stage" viewBox="0 0 720 214" role="img" aria-label={t(L("A browser window and the agent loop. The agent perceives the page, reasons a plan, acts, observes, and repeats; permission prompts appear at gated steps.", "Вікно браузера й цикл агента. Агент сприймає сторінку, міркує план, діє, спостерігає й повторює; на гейтованих кроках зʼявляються запити дозволу."))} style={{ fontFamily: "var(--font-body)" }}>
        {/* browser chrome */}
        <rect x={16} y={10} width={688} height={120} rx={10} fill="var(--bg)" stroke="var(--line)" strokeWidth={1.5} />
        <circle cx={36} cy={30} r={4} fill="var(--line2)" /><circle cx={50} cy={30} r={4} fill="var(--line2)" /><circle cx={64} cy={30} r={4} fill="var(--line2)" />
        <rect x={84} y={21} width={368} height={18} rx={9} fill="var(--s2)" stroke="var(--line)" strokeWidth={1} />
        <text x={96} y={34} fontSize={10.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>{current.url}</text>
        <rect x={566} y={21} width={138} height={18} rx={9} fill={mode === "auto" ? "rgba(248,113,113,0.14)" : "var(--accent-dim)"} stroke={mode === "auto" ? "var(--sem-warn)" : "var(--accent-deep)"} strokeWidth={1} />
        <text x={635} y={34} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={mode === "auto" ? "var(--sem-warn)" : "var(--accent-bright)"} style={{ fontFamily: "var(--font-mono)" }}>{mode === "auto" ? "act without asking" : "ask before acting"}</text>

        {/* viewport: current step */}
        <rect x={32} y={54} width={84} height={22} rx={11} fill={phaseColor(activePhase)} opacity={0.18} />
        <text x={74} y={69} textAnchor="middle" fontSize={11} fontWeight={700} fill={phaseColor(activePhase)} style={{ fontFamily: "var(--font-head)" }}>
          {t(activePhase === "done" ? L("Done", "Готово") : PHASES.find((p) => p.key === activePhase)!.label)}
        </text>
        {current.tag ? <text x={688} y={69} textAnchor="end" fontSize={10} fill="var(--sem-agentic)" style={{ fontFamily: "var(--font-mono)" }}>[{t(current.tag)}]</text> : null}
        <text x={32} y={98} fontSize={14} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{awaiting ? `🔒 ${t(L("Waiting for your approval", "Чекаю твого дозволу"))}` : declined ? t(L("Run halted — you declined", "Запуск спинено — ти відхилив")) : t(current.title)}</text>
        <text x={32} y={118} fontSize={11} fill="var(--tx2)">{t(current.detail).length > 92 ? t(current.detail).slice(0, 90) + "…" : t(current.detail)}</text>

        {/* phase loop */}
        {PHASES.map((p, i) => {
          const on = activePhase === p.key;
          return (
            <g key={p.key}>
              <rect x={X[i]} y={150} width={CW} height={44} rx={9} fill={on ? "var(--surface)" : "var(--bg)"} stroke={on ? p.color : "var(--line)"} strokeWidth={on ? 2.2 : 1.3} />
              <circle cx={X[i] + 18} cy={172} r={6} fill={on ? p.color : "var(--line2)"} />
              <text x={X[i] + 32} y={169} fontSize={12.5} fontWeight={700} fill={on ? "var(--tx)" : "var(--tx2)"} style={{ fontFamily: "var(--font-head)" }}>{t(p.label)}</text>
              <text x={X[i] + 32} y={184} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{t(p.sub)}</text>
              {i < 3 ? <text x={X[i] + CW + 6} y={177} fontSize={14} fill="var(--tx3)">→</text> : null}
            </g>
          );
        })}
        {/* loop-back */}
        <path d="M610 196 q 0 14 -14 14 L 26 210 q -10 0 -10 -12 L 16 198" fill="none" stroke="var(--tx3)" strokeWidth={1.2} strokeDasharray="4 3" />
        <text x={360} y={209} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{t(L("repeat until the goal is met", "повторювати, доки мету не досягнуто"))}</text>
      </svg>

      {/* gate prompt */}
      {g ? (
        <div className={`bal-gate ${current.gate}`} role="alertdialog" aria-label={t(g.title)}>
          <div className="bal-gate-ttl">🔒 {t(g.title)}</div>
          <div className="bal-gate-note">{t(g.note)}</div>
          <div className="bal-gate-opts">
            {g.opts.map((o) => (
              <button key={o.k} className={`btn${o.primary ? " primary" : ""}`} onClick={o.k === "decline" ? decline : approve}>
                {t(o.label)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* controls */}
      <div className="bal-controls">
        <button className="btn" onClick={reset} disabled={done === 0 && !declined && !awaiting}>↺ {t(L("Reset", "Скинути"))}</button>
        <button className="btn" onClick={step} disabled={finished || declined || awaiting}>{t(L("Step", "Крок"))} →</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => setPlaying((p) => !p)} disabled={finished || declined || awaiting}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={runToEnd} disabled={finished || declined || awaiting}>{t(L("Run to end", "До кінця"))} →</button>
        <span className="bal-spacer" />
        <span className="bal-count">{done}/{N} {t(L("steps", "кроків"))}</span>
      </div>

      {/* insight */}
      <div className="bal-note">
        {mode === "auto"
          ? t(L(
              "“Act without asking” skips the plan and per-site prompts — faster, but it raises prompt-injection risk, so use it only on trusted sites while you watch. Protected actions still stop and ask.",
              "«Act without asking» пропускає план і per-site запити — швидше, але підвищує ризик prompt injection, тож лише на довірених сайтах і під наглядом. Захищені дії все одно спиняються й питають.",
            ))
          : t(L(
              "“Ask before acting” approves a plan up front, then prompts per site. It's the safer default: you see the sites and actions before Claude touches anything.",
              "«Ask before acting» спершу схвалює план, далі питає per-site. Це безпечніший дефолт: ти бачиш сайти й дії, перш ніж Claude щось зробить.",
            ))}
      </div>
    </div>
  );
}
