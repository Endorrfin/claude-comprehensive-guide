import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./subAgentFanout.css";

/* ★ Sub-agent Fan-out — the 7th and final signature interactive (M23).
   A main / orchestrator agent splits an INDEPENDENT job into N tasks and fans
   them out to N subagents, each with its OWN context window. They run in
   parallel and each returns only a short summary; the main agent merges those
   summaries into the answer. A Solo vs Fan-out toggle makes the trade-off
   visible across three meters:
     • wall-clock  : solo = sum of task times; fan-out = slowest task + overhead
     • main context: solo holds every raw file; fan-out holds only N summaries
     • token cost  : fan-out pays for N separate contexts → more tokens (money)
   Lesson: parallel subagents trade tokens for time + a clean main context, and
   only help when the tasks are INDEPENDENT.
   Deterministic; bilingual; reduced-motion drops autoplay + the bar transitions. */

const L = (en: string, uk: string): Localized => ({ en, uk });

type Mode = "fanout" | "solo";
type Task = { key: string; label: Localized; time: number; explore: number };

/* A real Code job: understand four corners of an unfamiliar repo. Independent
   tasks (no task needs another's output) → the ideal case for fan-out. */
const TASKS: Task[] = [
  { key: "auth", label: L("Map the auth module", "Розібрати модуль auth"), time: 5, explore: 18 },
  { key: "db", label: L("Map the database layer", "Розібрати шар бази даних"), time: 6, explore: 22 },
  { key: "api", label: L("Map the API routes", "Розібрати API-роути"), time: 4, explore: 14 },
  { key: "tests", label: L("Map the test suite", "Розібрати набір тестів"), time: 5, explore: 16 },
];

const BASE = 8; // each agent's own overhead: system prompt + plan + tool defs (k tokens)
const SUMMARY_RATIO = 0.18; // a subagent returns ~1/5 of what it read
const SPAWN_MERGE = 3; // wall-clock units for spawning + merging

type Phase = "goal" | "plan" | "spawn" | "work" | "return" | "merge" | "answer";

type Step = {
  phase: Phase;
  label: Localized;
  detail: Localized;
  active: number[]; // subagent / task indices lit up this step ([] = main only)
};

function buildSteps(mode: Mode, n: number): Step[] {
  const used = TASKS.slice(0, n);
  const all = used.map((_, i) => i);

  if (mode === "fanout") {
    return [
      { phase: "goal", label: L("The goal", "Мета"), detail: L("“Understand this unfamiliar service before I change it.”", "«Зрозуміти цей незнайомий сервіс, перш ніж його міняти.»"), active: [] },
      { phase: "plan", label: L("Split into independent tasks", "Поділ на незалежні задачі"), detail: L(`The orchestrator sees ${n} corners it can explore independently — no task needs another's output.`, `Оркестратор бачить ${n} куточки, які можна досліджувати незалежно — жодна задача не потребує результату іншої.`), active: [] },
      { phase: "spawn", label: L("Spawn subagents", "Запуск subagents"), detail: L(`${n} subagents start, each with its OWN context window, its own tools, and just one task.`, `Стартує ${n} subagents, кожен — з ВЛАСНИМ context window, своїми tools і єдиною задачею.`), active: all },
      { phase: "work", label: L("Work in parallel", "Робота паралельно"), detail: L("Each reads dozens of files in its own window. The noise never touches the main conversation.", "Кожен читає десятки файлів у своєму вікні. Шум так і не торкається головної розмови."), active: all },
      { phase: "return", label: L("Return summaries", "Повернення summaries"), detail: L("Each subagent returns only a short summary — not the raw files it read.", "Кожен subagent повертає лише короткий summary — не сирі файли, що читав."), active: all },
      { phase: "merge", label: L("Merge", "Злиття"), detail: L("The orchestrator stitches the summaries into one map of the service.", "Оркестратор зшиває summaries в одну карту сервісу."), active: [] },
      { phase: "answer", label: L("Answer", "Відповідь"), detail: L("Done — a clean overview, while the main context stayed small.", "Готово — чистий огляд, а головний context лишився малим."), active: [] },
    ];
  }
  // solo: one agent, one context, tasks done one after another
  const steps: Step[] = [
    { phase: "goal", label: L("The goal", "Мета"), detail: L("“Understand this unfamiliar service before I change it.”", "«Зрозуміти цей незнайомий сервіс, перш ніж його міняти.»"), active: [] },
    { phase: "plan", label: L("Plan a sequence", "Спланувати послідовність"), detail: L("One agent, one context window — it will read each corner in turn.", "Один агент, один context window — читатиме кожен куточок по черзі."), active: [] },
  ];
  used.forEach((tk, i) => {
    steps.push({
      phase: "work",
      label: L(`Read: ${tk.label.en}`, `Читання: ${tk.label.uk}`),
      detail: L("Every file it reads piles into the same context — which keeps growing.", "Кожен прочитаний файл лягає в той самий context — і він усе росте."),
      active: [i],
    });
  });
  steps.push({ phase: "merge", label: L("Compose", "Скомпонувати"), detail: L("Now write the overview from a context full of raw material.", "Тепер скласти огляд із context, повного сирого матеріалу."), active: [] });
  steps.push({ phase: "answer", label: L("Answer", "Відповідь"), detail: L("Same answer — but it took longer and the context is bloated.", "Та сама відповідь — але довше, і context роздутий."), active: [] });
  return steps;
}

type Metrics = { soloTime: number; fanTime: number; soloCtx: number; fanCtx: number; soloCost: number; fanCost: number };

function computeMetrics(n: number): Metrics {
  const used = TASKS.slice(0, n);
  const sumExplore = used.reduce((a, t) => a + t.explore, 0);
  const sumTime = used.reduce((a, t) => a + t.time, 0);
  const maxTime = used.reduce((a, t) => Math.max(a, t.time), 0);
  const summaries = Math.round(sumExplore * SUMMARY_RATIO);
  return {
    soloTime: sumTime,
    fanTime: maxTime + SPAWN_MERGE,
    soloCtx: BASE + sumExplore, // all raw files live in the one context
    fanCtx: BASE + summaries, // main holds only the merged summaries
    soloCost: BASE + sumExplore, // read once, in one context
    fanCost: n * BASE + sumExplore + summaries, // each subagent re-pays its own base; merge adds summaries
  };
}

const PHASE_COLOR: Record<Phase, string> = {
  goal: "var(--sem-claude)",
  plan: "var(--sem-context)",
  spawn: "var(--sem-tool)",
  work: "var(--sem-tool)",
  return: "var(--sem-agentic)",
  merge: "var(--sem-context)",
  answer: "var(--sem-ok)",
};

type Meter = { label: Localized; solo: number; fan: number; unit: string; lowerWins: boolean };

function Meters({ m }: { m: Metrics }): React.ReactElement {
  const { t } = useLang();
  const rows: Meter[] = [
    { label: L("Wall-clock time", "Час (wall-clock)"), solo: m.soloTime, fan: m.fanTime, unit: "u", lowerWins: true },
    { label: L("Main context", "Головний context"), solo: m.soloCtx, fan: m.fanCtx, unit: "k", lowerWins: true },
    { label: L("Token cost", "Вартість у токенах"), solo: m.soloCost, fan: m.fanCost, unit: "k", lowerWins: true },
  ];
  return (
    <div className="saf-meters">
      {rows.map((r) => {
        const max = Math.max(r.solo, r.fan, 1);
        const fanWins = r.lowerWins ? r.fan < r.solo : r.fan > r.solo;
        return (
          <div className="saf-meter" key={r.label.en}>
            <div className="saf-meter-h">{t(r.label)}</div>
            <div className="saf-bar-row">
              <span className="saf-bar-tag">{t(L("Solo", "Solo"))}</span>
              <div className="saf-bar-track"><div className="saf-bar solo" style={{ width: `${(r.solo / max) * 100}%` }} /></div>
              <span className="saf-bar-val">{r.solo}{r.unit}{!fanWins ? " ✓" : ""}</span>
            </div>
            <div className="saf-bar-row">
              <span className="saf-bar-tag">{t(L("Fan-out", "Fan-out"))}</span>
              <div className="saf-bar-track"><div className="saf-bar fan" style={{ width: `${(r.fan / max) * 100}%` }} /></div>
              <span className="saf-bar-val">{r.fan}{r.unit}{fanWins ? " ✓" : ""}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SubAgentFanoutSim(): React.ReactElement {
  const { t } = useLang();
  const [mode, setMode] = useState<Mode>("fanout");
  const [n, setN] = useState(3);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const steps = useMemo(() => buildSteps(mode, n), [mode, n]);
  const metrics = useMemo(() => computeMetrics(n), [n]);

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
    if (i >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setI((x) => Math.min(x + 1, steps.length - 1)), 1500);
    return () => window.clearTimeout(id);
  }, [playing, i, steps.length]);

  const restart = (next: () => void): void => {
    setPlaying(false);
    setI(0);
    next();
  };

  const cur = steps[i];
  const atEnd = i >= steps.length - 1;

  // subagent node geometry (right side), spread vertically by count (stays within the 220 viewBox)
  const subY = (idx: number): number => {
    const top = 24;
    const gap = 150 / Math.max(1, n - 1);
    return top + idx * gap;
  };

  return (
    <div className="saf">
      <div className="saf-toolbar">
        <div className="saf-seg" role="group" aria-label={t(L("Strategy", "Стратегія"))}>
          <button className={mode === "fanout" ? "on" : ""} aria-pressed={mode === "fanout"} onClick={() => restart(() => setMode("fanout"))}>{t(L("Fan-out", "Fan-out"))}</button>
          <button className={mode === "solo" ? "on" : ""} aria-pressed={mode === "solo"} onClick={() => restart(() => setMode("solo"))}>{t(L("Solo agent", "Solo-агент"))}</button>
        </div>
        <div className="saf-seg" role="group" aria-label={t(L("Number of tasks", "Кількість задач"))}>
          {[2, 3, 4].map((k) => (
            <button key={k} className={n === k ? "on" : ""} aria-pressed={n === k} onClick={() => restart(() => setN(k))}>{k} {t(L("tasks", "задачі"))}</button>
          ))}
        </div>
        <span className="saf-spacer" />
        <span className="saf-note">{mode === "fanout" ? t(L("parallel · isolated context · merge summaries", "паралельно · ізольований context · злиття summaries")) : t(L("sequential · one shared context", "послідовно · один спільний context"))}</span>
      </div>

      <svg className="saf-stage" viewBox="0 0 720 220" role="img" aria-label={t(L("A main agent fanning tasks out to parallel subagents and merging their summaries, versus one solo agent doing the tasks in sequence.", "Головний агент розгалужує задачі на паралельних subagents і зливає їхні summaries — на противагу одному solo-агенту, що робить задачі послідовно."))} style={{ fontFamily: "var(--font-body)" }}>
        <defs>
          <marker id="saf-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" /></marker>
          <marker id="saf-ah-on" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" /></marker>
        </defs>

        {/* main / orchestrator node */}
        <g>
          <rect x={20} y={84} width={150} height={52} rx={11} fill="var(--s2)" stroke="var(--sem-claude)" strokeWidth={2.4} />
          <circle cx={40} cy={104} r={4} fill="var(--sem-claude)" />
          <text x={52} y={108} fontSize={13} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{t(L("Main agent", "Головний агент"))}</text>
          <text x={36} y={126} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{mode === "fanout" ? "orchestrator" : "does it all"}</text>
        </g>

        {mode === "fanout" ? (
          <>
            {TASKS.slice(0, n).map((tk, idx) => {
              const y = subY(idx);
              const lit = cur.active.includes(idx);
              const showWork = cur.phase === "spawn" || cur.phase === "work" || cur.phase === "return";
              return (
                <g key={tk.key} opacity={showWork || cur.phase === "merge" || cur.phase === "answer" ? 1 : 0.28}>
                  {/* spawn arrow out */}
                  <path d={`M170 ${108} C 300 108, 320 ${y + 18}, 470 ${y + 18}`} fill="none" stroke={lit ? "var(--accent)" : "var(--tx3)"} strokeWidth={lit ? 2 : 1.2} markerEnd={lit ? "url(#saf-ah-on)" : "url(#saf-ah)"} />
                  {/* summary arrow back (only at/after return) */}
                  {cur.phase === "return" || cur.phase === "merge" || cur.phase === "answer" ? (
                    <path d={`M470 ${y + 30} C 320 ${y + 30}, 300 120, 172 120`} fill="none" stroke="var(--sem-agentic)" strokeWidth={1.4} strokeDasharray="4 3" markerEnd="url(#saf-ah)" />
                  ) : null}
                  <rect className={lit ? "saf-sub on" : "saf-sub"} x={470} y={y} width={172} height={36} rx={9} fill={lit ? "var(--s2)" : "var(--surface)"} stroke="var(--sem-tool)" strokeWidth={lit ? 2.4 : 1.2} />
                  <circle cx={486} cy={y + 18} r={3.5} fill="var(--sem-tool)" />
                  <text x={497} y={y + 16} fontSize={10.5} fontWeight={600} fill="var(--tx)">{t(L("subagent", "subagent"))} {idx + 1}</text>
                  <text x={497} y={y + 29} fontSize={9} fill="var(--tx3)">{t(tk.label)}</text>
                </g>
              );
            })}
            <text x={556} y={16} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>each: own context window</text>
          </>
        ) : (
          <>
            {/* solo: a single context bar that fills as tasks are read */}
            {(() => {
              const used = TASKS.slice(0, n);
              const total = BASE + used.reduce((a, t2) => a + t2.explore, 0);
              const doneIdx = cur.phase === "work" ? (cur.active[0] ?? -1) : cur.phase === "goal" || cur.phase === "plan" ? -1 : n - 1;
              const filled = BASE + used.slice(0, doneIdx + 1).reduce((a, t2) => a + t2.explore, 0);
              const pct = Math.min(100, (filled / total) * 100);
              return (
                <g>
                  <text x={470} y={70} fontSize={11} fill="var(--tx2)">{t(L("One shared context — filling up", "Один спільний context — наповнюється"))}</text>
                  <rect x={470} y={80} width={210} height={26} rx={6} fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.2} />
                  <rect className="saf-fill" x={472} y={82} width={(206 * pct) / 100} height={22} rx={5} fill="var(--sem-agentic)" opacity={0.85} />
                  <text x={575} y={97} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--ink)" style={{ fontFamily: "var(--font-mono)" }}>{Math.round(filled)}k</text>
                  <path d="M170 108 C 330 108, 320 93, 468 93" fill="none" stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#saf-ah)" />
                  <text x={470} y={128} fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>raw files never leave the window</text>
                </g>
              );
            })()}
          </>
        )}
      </svg>

      <div className="saf-grid">
        <div className="saf-panel">
          <span className="saf-step-no">{t(L("Step", "Крок"))} {i + 1} / {steps.length}</span>
          <div><span className="saf-chip" style={{ background: PHASE_COLOR[cur.phase] }}>{cur.phase}</span></div>
          <div className="saf-label">{t(cur.label)}</div>
          <div className="saf-detail">{t(cur.detail)}</div>
        </div>
        <Meters m={metrics} />
      </div>

      <div className="saf-takeaway">
        {mode === "fanout"
          ? t(L("Fan-out trades extra tokens (money) for less wall-clock time and a clean main context — the win holds only because these tasks are independent.", "Fan-out міняє зайві токени (гроші) на менший час і чистий головний context — виграш є лише тому, що задачі незалежні."))
          : t(L("Solo is cheapest in tokens, but slower, and the one context fills with raw material it must wade through to answer.", "Solo найдешевший у токенах, але повільніший, і єдиний context забивається сирим матеріалом, крізь який треба продертися до відповіді."))}
      </div>

      <div className="saf-controls">
        <button className="btn" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0 && !playing}>↺ {t(L("Reset", "Скинути"))}</button>
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.max(0, x - 1)); }} disabled={i === 0}>← {t(L("Back", "Назад"))}</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (atEnd) setI(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.min(steps.length - 1, x + 1)); }} disabled={atEnd}>{t(L("Step", "Крок"))} →</button>
        <span className="saf-spacer" />
        <span className="saf-hint">{t(L("split → spawn → parallel → merge", "поділ → запуск → паралельно → злиття"))}</span>
      </div>
    </div>
  );
}
