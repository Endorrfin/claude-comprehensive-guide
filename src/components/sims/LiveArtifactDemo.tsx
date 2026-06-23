import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./liveArtifactDemo.css";

/* Embedded "tiny live demo" for M9 · Live Artifacts.
   It teaches the three things that make an artifact *live* by doing two of
   them for real and labelling the third honestly:
     1. Persistent storage — REAL: entries are saved to this browser's
        localStorage, so they survive a reload (the guide is a standalone app,
        not a Claude.ai artifact, so localStorage is fine here).
     2. Claude API inside  — SIMULATED: the "Summarize" button fakes a model
        call (a static site on GitHub Pages can't call the Claude API). The
        result is clearly tagged "simulated", mirroring PromptAnatomySim.
     3. MCP / connectors    — ILLUSTRATIVE: shown as an available capability,
        not wired, so the demo never over-claims.
   SSR-safe (guards window/localStorage), bilingual, reduced-motion friendly. */

const L = (en: string, uk: string): Localized => ({ en, uk });
const STORAGE_KEY = "cg-live-demo-v1";

type Entry = { id: number; text: string };
type AiState = "idle" | "thinking" | "done";

function load(): Entry[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t): t is string => typeof t === "string")
      .map((text, i) => ({ id: Date.now() + i, text }));
  } catch {
    return [];
  }
}

export function LiveArtifactDemo(): React.ReactElement {
  const { t, lang } = useLang();
  const [entries, setEntries] = useState<Entry[]>(load);
  const [input, setInput] = useState("");
  const [ai, setAi] = useState<AiState>("idle");
  const [summary, setSummary] = useState("");
  const [reduced, setReduced] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const sync = (): void => setReduced(mq.matches);
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* persist on every change — this is the "stateful across sessions" part, for real */
  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.map((e) => e.text)));
    } catch {
      /* storage full / blocked — ignore in a demo */
    }
  }, [entries]);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const add = (): void => {
    const text = input.trim();
    if (!text) return;
    setEntries((prev) => [...prev, { id: Date.now(), text }]);
    setInput("");
    setAi("idle"); // a new entry makes any prior summary stale
    setSummary("");
  };
  const remove = (id: number): void => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setAi("idle");
    setSummary("");
  };
  const clearAll = (): void => {
    setEntries([]);
    setAi("idle");
    setSummary("");
  };

  /* SIMULATED Claude API call: derive a plausible summary from real entries */
  const buildSummary = (list: Entry[]): string => {
    const n = list.length;
    const first = list[0]?.text ?? "";
    if (lang === "uk") {
      return `Записів сьогодні: ${n}.${first ? ` Почав із «${trim(first)}».` : ""} Завтра додай ще одну — і ритм триматиметься.`;
    }
    return `Notes today: ${n}.${first ? ` You opened with “${trim(first)}.”` : ""} Add one more tomorrow to keep the streak.`;
  };
  const summarize = (): void => {
    if (entries.length === 0) return;
    setAi("thinking");
    setSummary("");
    const done = (): void => {
      setSummary(buildSummary(entries));
      setAi("done");
    };
    if (reduced) { done(); return; }
    timer.current = window.setTimeout(done, 650);
  };

  const caps = useMemo(
    () => [
      { key: "store", label: L("Persistent storage", "Persistent storage"), color: "var(--sem-ok)", state: L("live — saved to your browser", "live — збережено у браузері"), on: true },
      { key: "api", label: L("Claude API inside", "Claude API всередині"), color: "var(--sem-agentic)", state: ai === "idle" ? L("idle", "очікує") : ai === "thinking" ? L("calling…", "виклик…") : L("answered (simulated)", "відповів (simulated)"), on: ai !== "idle" },
      { key: "mcp", label: L("MCP / connectors", "MCP / connectors"), color: "var(--sem-tool)", state: L("available — not wired here", "доступно — тут не підключено"), on: false },
    ],
    [ai],
  );

  return (
    <div className="la">
      <div className="la-head">
        <span className="la-title">{t(L("Mini Live Artifact — Daily log", "Mini Live Artifact — Daily log"))}</span>
        <span className="la-badge">{t(L("demo", "демо"))}</span>
      </div>

      {/* capability strip — what makes it "live" */}
      <div className="la-caps" role="group" aria-label={t(L("Live capabilities", "Live-можливості"))}>
        {caps.map((c) => (
          <span key={c.key} className={`la-cap${c.on ? " on" : ""}`} style={c.on ? { borderColor: c.color } : undefined}>
            <span className="la-cap-dot" style={{ background: c.on ? c.color : "var(--tx3)" }} />
            <span className="la-cap-l">{t(c.label)}</span>
            <span className="la-cap-s">{t(c.state)}</span>
          </span>
        ))}
      </div>

      <div className="la-grid">
        {/* the running mini-app */}
        <div className="la-app">
          <div className="la-row">
            <input
              className="la-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") add(); }}
              placeholder={t(L("Log something… (e.g. shipped the migration)", "Запиши щось… (напр. завершив міграцію)"))}
              aria-label={t(L("New log entry", "Новий запис"))}
              maxLength={80}
            />
            <button className="btn primary" onClick={add} disabled={!input.trim()}>
              {t(L("Add", "Додати"))}
            </button>
          </div>

          {entries.length === 0 ? (
            <div className="la-empty">{t(L("No entries yet. Add a few, then reload the page — they persist.", "Поки порожньо. Додай кілька й онови сторінку — вони збережуться."))}</div>
          ) : (
            <ul className="la-list">
              {entries.map((e) => (
                <li key={e.id} className="la-item">
                  <span>{e.text}</span>
                  <button className="la-x" onClick={() => remove(e.id)} aria-label={t(L("Remove", "Видалити"))} title={t(L("Remove", "Видалити"))}>×</button>
                </li>
              ))}
            </ul>
          )}

          <div className="la-row la-actions">
            <button className="btn" onClick={summarize} disabled={entries.length === 0 || ai === "thinking"}>
              {ai === "thinking" ? `… ${t(L("Summarizing", "Підсумовую"))}` : `✦ ${t(L("Summarize with Claude", "Підсумувати з Claude"))}`}
            </button>
            <button className="btn" onClick={clearAll} disabled={entries.length === 0}>
              {t(L("Clear", "Очистити"))}
            </button>
            <span className="la-count">{t(L("entries:", "записів:"))} {entries.length}</span>
          </div>
        </div>

        {/* simulated AI output */}
        <div className="la-out" aria-live="polite">
          <div className="la-out-cap">
            {t(L("Claude API result", "Результат Claude API"))}
            <span className="la-sim">{t(L("simulated", "simulated"))}</span>
          </div>
          <div className="la-answer">
            {ai === "done" ? summary : <span className="la-muted">{t(L("Press “Summarize with Claude” to call the model on your entries.", "Натисни «Підсумувати з Claude», щоб викликати модель на твоїх записах."))}</span>}
          </div>
        </div>
      </div>

      <div className="la-note">
        {t(L(
          "Persistence here is **real** — reload the page and your entries are still there. The summary is **simulated** (a static site can't call the API). In a published Live Artifact the summary would be a real Claude API call, and storage would live on Anthropic's servers (20 MB, text-only, published-only).",
          "Persistence тут **справжній** — онови сторінку, і записи на місці. Підсумок **simulated** (статичний сайт не може викликати API). У published Live Artifact підсумок був би справжнім викликом Claude API, а storage жив би на серверах Anthropic (20 MB, лише текст, лише published).",
        )).split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>))}
      </div>
    </div>
  );
}

function trim(s: string): string {
  return s.length > 28 ? `${s.slice(0, 28)}…` : s;
}
