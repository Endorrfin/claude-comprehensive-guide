import React, { useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
// CHANGED (S16): pricing/window math moved to the pure engine src/lib/tokenBudget.ts (Wave
// C2). This component keeps only the bilingual labels + colours and renders the numbers.
import { computeBudget, MODELS, ORDER, TOGGLEABLE, type BKey } from "../../lib/tokenBudget";
import "./tokenBudget.css";

/* ★ Token Budget — the 3rd signature interactive.
   The context window is a finite desk. Toggle what's on it (system · knowledge ·
   skills+tools · memory · conversation · attached file) and a reserved slice for
   the answer, watch the budget fill and truncate, and pull the real cost levers
   (model price · prompt caching −90% on the stable prefix · batch −50%).
   All numbers are deterministic and match the published API pricing
   (verified 2026-06-23). Bilingual; reduced-motion just drops the bar animation. */

const L = (en: string, uk: string): Localized => ({ en, uk });

// CHANGED (S16): BKey, MODELS, ORDER, TOGGLEABLE, FIXED + the cacheable set now live in the
// engine. BLOCKS here is display-only (bilingual label + colour, keyed by the engine's BKey).
type Block = { key: BKey; label: Localized; color: string };

const BLOCKS: Block[] = [
  { key: "sys", label: L("System / instructions", "System / instructions"), color: "var(--sem-claude)" },
  { key: "know", label: L("Project knowledge", "Project knowledge"), color: "var(--sem-context)" },
  { key: "cap", label: L("Skills + MCP tools", "Skills + MCP tools"), color: "var(--sem-tool)" },
  { key: "mem", label: L("Memory", "Memory"), color: "var(--sem-ok)" },
  { key: "conv", label: L("Conversation", "Conversation"), color: "var(--tx3)" },
  { key: "file", label: L("Attached file", "Attached file"), color: "var(--sem-agentic)" },
  { key: "out", label: L("Answer reserve", "Резерв на відповідь"), color: "var(--accent-deep)" },
];

export function TokenBudgetSim(): React.ReactElement {
  const { t } = useLang();
  const [model, setModel] = useState("sonnet");
  const [win, setWin] = useState(200000);
  const [on, setOn] = useState<Record<BKey, boolean>>({ sys: true, know: true, cap: true, mem: true, conv: true, file: true, out: true });
  const [turns, setTurns] = useState(12);
  const [fileTok, setFileTok] = useState(80000);
  const [caching, setCaching] = useState(true);
  const [batch, setBatch] = useState(false);

  const price = MODELS.find((m) => m.key === model)!.price;

  // CHANGED (S16): every figure comes from the pure, unit-tested engine (deterministic).
  const { tok, total, cacheTok, over, pct, raw, opt, saved } = useMemo(
    () => computeBudget({ on, turns, fileTok, price, win, caching, batch }),
    [on, turns, fileTok, price, win, caching, batch],
  );

  const fmt = (n: number): string => Math.round(n).toLocaleString("en-US");
  const usd = (n: number): string => `$${n.toFixed(3)}`;

  const toggle = (k: BKey): void => setOn((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="tb">
      {/* controls */}
      <div className="tb-controls">
        <select className="tb-select" value={model} onChange={(e) => setModel(e.target.value)} aria-label={t(L("Model", "Модель"))}>
          {MODELS.map((m) => (
            <option key={m.key} value={m.key}>{m.label}</option>
          ))}
        </select>
        <div className="tb-seg-toggle" role="group" aria-label={t(L("Context window size", "Розмір context window"))}>
          <button className={win === 200000 ? "on" : ""} onClick={() => setWin(200000)}>200K</button>
          <button className={win === 1000000 ? "on" : ""} onClick={() => setWin(1000000)}>1M</button>
        </div>
        <span className="tb-spacer" />
        <button className={`tb-lever${caching ? " on" : ""}`} aria-pressed={caching} onClick={() => setCaching((v) => !v)}>
          <span className="tb-lever-dot" style={{ background: caching ? "var(--sem-ok)" : "var(--tx3)" }} />
          {t(L("caching −90%", "caching −90%"))}
        </button>
        <button className={`tb-lever${batch ? " on" : ""}`} aria-pressed={batch} onClick={() => setBatch((v) => !v)}>
          <span className="tb-lever-dot" style={{ background: batch ? "var(--sem-ok)" : "var(--tx3)" }} />
          {t(L("batch −50%", "batch −50%"))}
        </button>
      </div>

      {/* the window bar */}
      <div className={`tb-bar${over > 0 ? " over" : ""}`} role="img" aria-label={t(L("Context window fill", "Заповнення context window"))}>
        {ORDER.filter((k) => tok[k] > 0).map((k) => {
          const b = BLOCKS.find((x) => x.key === k)!;
          const w = (tok[k] / Math.max(total, win)) * 100;
          return <span key={k} className="tb-seg" style={{ width: `${w}%`, background: b.color }} title={`${t(b.label)} · ${fmt(tok[k])}`} />;
        })}
      </div>
      <div className="tb-fillrow">
        <span className={over > 0 ? "tb-over" : ""}>{fmt(total)} / {fmt(win)} {t(L("tokens", "токенів"))} ({pct}%)</span>
        <span className="tb-winnote">{win === 1000000 ? t(L("1M — Opus 4.8 / Sonnet 4.6", "1M — Opus 4.8 / Sonnet 4.6")) : t(L("200K standard", "200K стандарт"))}</span>
      </div>

      {/* legend */}
      <div className="tb-legend">
        {ORDER.map((k) => {
          const b = BLOCKS.find((x) => x.key === k)!;
          return (
            <span key={k} className="tb-leg">
              <span className="tb-leg-dot" style={{ background: b.color }} />
              {t(b.label)}
            </span>
          );
        })}
      </div>

      {/* cost cards */}
      <div className="tb-cards">
        <div className="tb-card">
          <span className="tb-card-l">{t(L("raw input cost", "сира вартість input"))}</span>
          <span className="tb-card-v">{usd(raw)}</span>
        </div>
        <div className="tb-card">
          <span className="tb-card-l">{t(L("after levers", "після важелів"))}</span>
          <span className="tb-card-v ok">{usd(opt)}</span>
        </div>
        <div className="tb-card">
          <span className="tb-card-l">{t(L("saved / call", "заощаджено / виклик"))}</span>
          <span className="tb-card-v">{usd(saved)}</span>
        </div>
      </div>

      {/* sliders */}
      <div className="tb-slider">
        <label>{t(L("conversation", "розмова"))}</label>
        <input type="range" min={0} max={40} step={1} value={turns} onChange={(e) => setTurns(+e.target.value)} aria-label={t(L("conversation turns", "ходи розмови"))} />
        <span className="tb-slider-out">{turns} {t(L("turns", "ходів"))}</span>
      </div>
      <div className="tb-slider">
        <label>{t(L("attached file", "вкладений файл"))}</label>
        <input type="range" min={0} max={140000} step={1000} value={fileTok} onChange={(e) => setFileTok(+e.target.value)} aria-label={t(L("attached file size in tokens", "розмір файлу в токенах"))} />
        <span className="tb-slider-out">{fmt(fileTok)}</span>
      </div>

      {/* block toggles */}
      <div className="tb-chips" role="group" aria-label={t(L("Context blocks", "Блоки контексту"))}>
        {TOGGLEABLE.map((k) => {
          const b = BLOCKS.find((x) => x.key === k)!;
          return (
            <button key={k} className={`tb-chip${on[k] ? " on" : ""}`} aria-pressed={on[k]} onClick={() => toggle(k)} style={on[k] ? { borderColor: b.color } : undefined}>
              <span className="tb-chip-dot" style={{ background: on[k] ? b.color : "var(--tx3)" }} />
              {t(b.label)}
            </button>
          );
        })}
        <span className="tb-chip fixed" title={t(L("The answer always needs room", "Відповіді завжди потрібне місце"))}>
          <span className="tb-chip-dot" style={{ background: "var(--accent-deep)" }} />
          {t(L("answer reserve (always)", "резерв на відповідь (завжди)"))}
        </span>
      </div>

      {/* insight */}
      <div className="tb-note">
        {over > 0
          ? t(L(
              `Over budget by ${fmt(over)} tokens — the oldest turns get truncated first, but the ${fmt(tok.out)}-token answer reserve is protected. Trim the file or summarise old turns.`,
              `Перевищення на ${fmt(over)} токенів — найстаріші ходи обрізаються першими, але резерв на відповідь у ${fmt(tok.out)} токенів захищено. Зменш файл або підсумуй старі ходи.`,
            ))
          : caching
            ? t(L(
                `Stable prefix (system + knowledge + skills/tools) = ${fmt(cacheTok)} tokens, billed at 10% — that's the saving. Output is billed separately at 5× input.`,
                `Стабільний префікс (system + knowledge + skills/tools) = ${fmt(cacheTok)} токенів, оплата 10% — ось економія. Output оплачується окремо за 5× input.`,
              ))
            : t(L(
                `Turn on caching to bill the stable ${fmt(cacheTok)}-token prefix at 10%. Output is billed separately at 5× input.`,
                `Увімкни caching, щоб стабільний префікс на ${fmt(cacheTok)} токенів оплачувати за 10%. Output оплачується окремо за 5× input.`,
              ))}
      </div>
    </div>
  );
}
