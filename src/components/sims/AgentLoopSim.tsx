import React, { useEffect, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./agentLoopSim.css";

type Phase = "prompt" | "think" | "act" | "observe" | "answer";
type Step = { phase: Phase; label: Localized; detail: Localized; tool?: string };

const L = (en: string, uk: string): Localized => ({ en, uk });

/** A real Cowork task, stepped through the agent loop. Deterministic. */
const STEPS: Step[] = [
  { phase: "prompt", label: L("User goal", "Мета користувача"), detail: L("Summarise the 3 PDFs in /reports and draft a one-pager.", "Підсумуй 3 PDF у /reports і зроби one-pager.") },
  { phase: "think", label: L("Plan the work", "Спланувати роботу"), detail: L("List the folder → read each PDF → summarise → write summary.md", "Перелічити теку → прочитати кожен PDF → підсумувати → записати summary.md") },
  { phase: "act", label: L("Call a tool", "Виклик tool"), detail: L("List the reports folder.", "Перелічити теку reports."), tool: "read_dir(\"/reports\")" },
  { phase: "observe", label: L("Read the result", "Прочитати результат"), detail: L("3 files: q1.pdf, q2.pdf, q3.pdf", "3 файли: q1.pdf, q2.pdf, q3.pdf") },
  { phase: "think", label: L("Decide next step", "Вирішити наступний крок"), detail: L("Read each PDF in turn, starting with q1.", "Читати кожен PDF по черзі, з q1.") },
  { phase: "act", label: L("Call a tool", "Виклик tool"), detail: L("Extract text from the first report.", "Витягти текст з першого звіту."), tool: "read_file(\"q1.pdf\")" },
  { phase: "observe", label: L("Read the result", "Прочитати результат"), detail: L("q1.pdf — 12 pages extracted.", "q1.pdf — 12 сторінок витягнуто.") },
  { phase: "act", label: L("Repeat the loop", "Повторити цикл"), detail: L("Read q2.pdf and q3.pdf the same way.", "Прочитати q2.pdf і q3.pdf так само."), tool: "read_file(\"q2.pdf\"), read_file(\"q3.pdf\")" },
  { phase: "observe", label: L("Read the result", "Прочитати результат"), detail: L("All three reports are now in context.", "Усі три звіти тепер у context.") },
  { phase: "think", label: L("Compose", "Скомпонувати"), detail: L("Write a one-pager with a per-report bullet table.", "Зробити one-pager з таблицею тез по звітах.") },
  { phase: "act", label: L("Call a tool", "Виклик tool"), detail: L("Write the deliverable to your folder.", "Записати результат у твою теку."), tool: "write_file(\"summary.md\")" },
  { phase: "observe", label: L("Read the result", "Прочитати результат"), detail: L("summary.md written — 1 page.", "summary.md записано — 1 сторінка.") },
  { phase: "answer", label: L("Done", "Готово"), detail: L("summary.md is in your folder, with a table of per-report highlights.", "summary.md у твоїй теці, з таблицею ключових тез по звітах.") },
];

const PHASE_COLOR: Record<Phase, string> = {
  prompt: "var(--sem-claude)",
  think: "var(--sem-context)",
  act: "var(--sem-tool)",
  observe: "var(--sem-agentic)",
  answer: "var(--sem-ok)",
};

const RING: { phase: Phase; label: string; cx: number }[] = [
  { phase: "prompt", label: "Prompt", cx: 78 },
  { phase: "think", label: "Think", cx: 240 },
  { phase: "act", label: "Act", cx: 402 },
  { phase: "observe", label: "Observe", cx: 540 },
  { phase: "answer", label: "Answer", cx: 686 },
];

export function AgentLoopSim(): React.ReactElement {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (i >= STEPS.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setI((x) => Math.min(x + 1, STEPS.length - 1)), 1400);
    return () => window.clearTimeout(id);
  }, [playing, i]);

  const cur = STEPS[i];
  const atEnd = i >= STEPS.length - 1;

  return (
    <div className="alp">
      <svg className="alp-stage" viewBox="0 0 760 210" role="img" aria-label="The agent loop: prompt, then repeating think, act and observe, ending in an answer." style={{ fontFamily: "var(--font-body)" }}>
        <defs>
          <marker id="alp-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
          </marker>
          <marker id="alp-ah-on" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" />
          </marker>
        </defs>

        {/* straight links along the row */}
        <g strokeWidth={1.6} fill="none">
          <line x1="120" y1="150" x2="196" y2="150" stroke="var(--tx3)" markerEnd="url(#alp-ah)" />
          <line x1="282" y1="150" x2="358" y2="150" stroke="var(--tx3)" markerEnd="url(#alp-ah)" />
          <line x1="444" y1="150" x2="498" y2="150" stroke="var(--tx3)" markerEnd="url(#alp-ah)" />
          <line x1="582" y1="150" x2="642" y2="150" stroke="var(--tx3)" markerEnd="url(#alp-ah)" />
          {/* loop-back arc observe -> think */}
          <path d="M540 127 C 540 70, 240 70, 240 124" stroke="var(--accent-deep)" markerEnd="url(#alp-ah-on)" />
        </g>
        <text x="390" y="60" textAnchor="middle" fontSize={11.5} fill="var(--accent)" style={{ fontFamily: "var(--font-mono)" }}>repeat</text>

        {/* phase nodes */}
        {RING.map((n) => {
          const on = n.phase === cur.phase;
          const color = PHASE_COLOR[n.phase];
          return (
            <g key={n.phase}>
              <rect
                x={n.cx - 46}
                y={128}
                width={92}
                height={44}
                rx={11}
                fill={on ? "var(--s2)" : "var(--surface)"}
                stroke={color}
                strokeWidth={on ? 2.8 : 1.3}
                opacity={on ? 1 : 0.85}
              />
              <circle cx={n.cx - 30} cy={150} r={4} fill={color} />
              <text x={n.cx + 6} y={155} textAnchor="middle" fontSize={13} fontWeight={on ? 700 : 500} fill={on ? "var(--tx)" : "var(--tx2)"}>{n.label}</text>
            </g>
          );
        })}
      </svg>

      <div className="alp-grid">
        <div className="alp-panel">
          <span className="alp-step-no">{t(L("Step", "Крок"))} {i + 1} / {STEPS.length}</span>
          <div>
            <span className="alp-chip" style={{ background: PHASE_COLOR[cur.phase] }}>{cur.phase}</span>
          </div>
          <div className="alp-label">{t(cur.label)}</div>
          <div className="alp-detail">{t(cur.detail)}</div>
          {cur.tool ? <div className="alp-tool">{cur.tool}</div> : null}
        </div>

        <div className="alp-log" aria-live="polite">
          {STEPS.slice(0, i + 1).map((s, idx) => (
            <div className="alp-log-row" key={idx}>
              <span className="ph" style={{ color: PHASE_COLOR[s.phase] }}>{s.phase}</span>
              <span>{t(s.label)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="alp-controls">
        <button className="btn" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0 && !playing}>↺ {t(L("Reset", "Скинути"))}</button>
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.max(0, x - 1)); }} disabled={i === 0}>← {t(L("Back", "Назад"))}</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (atEnd) setI(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.min(STEPS.length - 1, x + 1)); }} disabled={atEnd}>{t(L("Step", "Крок"))} →</button>
        <span className="spacer" />
        <span className="alp-hint">{t(L("think → act → observe → repeat", "think → act → observe → repeat"))}</span>
      </div>
    </div>
  );
}
