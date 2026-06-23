import React, { useEffect, useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./mcpFlow.css";

/* ★ MCP Request Flow — the 4th signature interactive.
   Step a real request through MCP: prompt -> plan -> connect -> discover tools
   -> choose -> permission gate -> tool call -> external app -> result back into
   context -> answer. Two toggles change the story:
     - Remote (OAuth 2.1 over HTTP, reached from Anthropic's cloud) vs
       Local (stdio server spawned on your machine, no network, no OAuth).
     - Read vs Write tool — a write hits a hard "Needs approval" gate; a read
       set to "Always allow" runs without a prompt.
   Deterministic; bilingual; reduced-motion drops the autoplay only. */

const L = (en: string, uk: string): Localized => ({ en, uk });

type Transport = "remote" | "local";
type Action = "read" | "write";
type Lane = "claude" | "server" | "api" | "gate";
type Step = {
  lane: Lane;
  label: Localized;
  detail: Localized;
  rpc?: string;
  gate?: "consent" | "approval";
  soft?: boolean; // a gate that auto-allows (read with "Always allow")
};

const LANE_COLOR: Record<Lane, string> = {
  claude: "var(--sem-claude)",
  server: "var(--sem-tool)",
  api: "var(--sem-context)",
  gate: "var(--sem-warn)",
};

function buildSteps(tr: Transport, ac: Action): Step[] {
  const remote = tr === "remote";
  const write = ac === "write";
  const steps: Step[] = [];

  steps.push({
    lane: "claude",
    label: L("Your goal", "Твоя мета"),
    detail: write
      ? L("“Add a task ‘Ship M11’ to my Notion board.”", "«Додай задачу ‘Ship M11’ на мою дошку в Notion.»")
      : L("“What are my next 3 tasks in Notion?”", "«Які мої наступні 3 задачі в Notion?»"),
  });

  steps.push({
    lane: "claude",
    label: L("Claude plans", "Claude планує"),
    detail: write
      ? L("The Notion connector is enabled — this needs the create_page tool.", "Connector Notion увімкнено — потрібен tool create_page.")
      : L("The Notion connector is enabled — this needs the search tool.", "Connector Notion увімкнено — потрібен tool search."),
  });

  if (remote) {
    steps.push({
      lane: "gate",
      gate: "consent",
      label: L("Connect — first time only", "Підключення — лише першого разу"),
      detail: L(
        "OAuth 2.1 sign-in to Notion in your browser → you grant scopes. Claude receives a scoped token and never sees your password.",
        "OAuth 2.1 вхід у Notion у браузері → ти надаєш scopes. Claude отримує обмежений token і ніколи не бачить твій пароль.",
      ),
      rpc: "oauth2.1 + PKCE",
    });
  } else {
    steps.push({
      lane: "server",
      label: L("Spawn the server", "Запуск сервера"),
      detail: L(
        "Claude Desktop launches the local MCP server as a process on your machine — stdio, no network, no OAuth.",
        "Claude Desktop запускає локальний MCP server як процес на твоїй машині — stdio, без мережі, без OAuth.",
      ),
      rpc: "stdio: spawn",
    });
  }

  steps.push({
    lane: "server",
    label: L("Discover tools", "Виявлення tools"),
    detail: L("The client asks the server what it can do.", "Client питає сервер, що той вміє."),
    rpc: "tools/list → search, read, create_page",
  });

  steps.push({
    lane: "claude",
    label: L("Choose a tool", "Вибір tool"),
    detail: write
      ? L("Claude calls create_page with the title and target board.", "Claude викликає create_page з назвою і дошкою.")
      : L("Claude calls search with your query.", "Claude викликає search із запитом."),
    rpc: write ? "create_page({ title, board })" : "search({ query })",
  });

  steps.push(
    write
      ? {
          lane: "gate",
          gate: "approval",
          label: L("Approve the call", "Підтвердження виклику"),
          detail: L(
            "create_page writes data, so it is set to “Needs approval” — you confirm before it runs.",
            "create_page змінює дані, тож стоїть «Needs approval» — ти підтверджуєш до запуску.",
          ),
          rpc: "permission: needs approval",
        }
      : {
          lane: "gate",
          gate: "approval",
          soft: true,
          label: L("Run — auto-allowed", "Запуск — auto-allow"),
          detail: L(
            "A read set to “Always allow” runs without a prompt; set it to “Needs approval” and Claude would pause here.",
            "Read зі статусом «Always allow» виконується без запиту; із «Needs approval» Claude зупинився б тут.",
          ),
          rpc: "permission: always allow",
        },
  );

  steps.push({
    lane: "server",
    label: L("Call the tool", "Виклик tool"),
    detail: remote
      ? L("Client → server over Streamable HTTP.", "Client → server по Streamable HTTP.")
      : L("Client → server over stdio.", "Client → server по stdio."),
    rpc: write ? "tools/call create_page" : "tools/call search",
  });

  steps.push({
    lane: "api",
    label: remote ? L("Reach the app", "Доступ до застосунку") : L("Act on your machine", "Дія на твоїй машині"),
    detail: remote
      ? L("The server calls the Notion API with your scoped token.", "Сервер викликає Notion API з твоїм обмеженим token.")
      : L("The server reads/writes locally — nothing leaves the device.", "Сервер читає/пише локально — нічого не залишає пристрій."),
  });

  steps.push({
    lane: "server",
    label: L("Result returns", "Результат повертається"),
    detail: write
      ? L("Notion returns the new page; it flows server → client → into Claude's context.", "Notion повертає нову сторінку; вона йде server → client → у context Claude.")
      : L("Notion returns the matching tasks; they flow back into Claude's context.", "Notion повертає задачі; вони повертаються в context Claude."),
  });

  steps.push({
    lane: "claude",
    label: L("Answer", "Відповідь"),
    detail: write
      ? L("Done — “Ship M11” is on your board.", "Готово — «Ship M11» на твоїй дошці.")
      : L("Your next 3 tasks: Ship M11, Review PR, Write tests.", "Твої наступні 3 задачі: Ship M11, Review PR, Write tests."),
  });

  return steps;
}

const NODES: { lane: Exclude<Lane, "gate">; x: number; w: number; title: Localized; sub?: Localized }[] = [
  { lane: "claude", x: 20, w: 188, title: L("Claude", "Claude"), sub: L("host + client", "host + client") },
  { lane: "server", x: 266, w: 188, title: L("MCP server", "MCP server"), sub: L("the connector", "конектор") },
  { lane: "api", x: 512, w: 188, title: L("External app", "Застосунок") },
];

export function McpFlowSim(): React.ReactElement {
  const { t } = useLang();
  const [tr, setTr] = useState<Transport>("remote");
  const [ac, setAc] = useState<Action>("write");
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const steps = useMemo(() => buildSteps(tr, ac), [tr, ac]);

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
  const activeLane: Lane = cur.lane;

  return (
    <div className="mcp">
      {/* toolbar */}
      <div className="mcp-toolbar">
        <div className="mcp-seg" role="group" aria-label={t(L("Transport", "Transport"))}>
          <button className={tr === "remote" ? "on" : ""} aria-pressed={tr === "remote"} onClick={() => restart(() => setTr("remote"))}>{t(L("Remote · HTTP", "Remote · HTTP"))}</button>
          <button className={tr === "local" ? "on" : ""} aria-pressed={tr === "local"} onClick={() => restart(() => setTr("local"))}>{t(L("Local · stdio", "Local · stdio"))}</button>
        </div>
        <div className="mcp-seg" role="group" aria-label={t(L("Tool type", "Тип tool"))}>
          <button className={ac === "read" ? "on" : ""} aria-pressed={ac === "read"} onClick={() => restart(() => setAc("read"))}>{t(L("Read tool", "Read tool"))}</button>
          <button className={ac === "write" ? "on" : ""} aria-pressed={ac === "write"} onClick={() => restart(() => setAc("write"))}>{t(L("Write tool", "Write tool"))}</button>
        </div>
        <span className="mcp-spacer" />
        <span className="mcp-transnote">{tr === "remote" ? t(L("OAuth · reached from Anthropic's cloud", "OAuth · доступ із хмари Anthropic")) : t(L("stdio · runs on your machine", "stdio · на твоїй машині"))}</span>
      </div>

      {/* stage */}
      <svg className="mcp-stage" viewBox="0 0 720 168" role="img" aria-label={t(L("MCP request flow across Claude, the MCP server and the external app.", "Потік MCP-запиту між Claude, MCP server і застосунком."))} style={{ fontFamily: "var(--font-body)" }}>
        <defs>
          <marker id="mcpf-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
          </marker>
        </defs>

        {/* links */}
        <g strokeWidth={1.5} fill="none">
          <line x1="210" y1="78" x2="262" y2="78" stroke="var(--tx3)" markerEnd="url(#mcpf-ah)" />
          <line x1="262" y1="98" x2="212" y2="98" stroke="var(--tx3)" markerEnd="url(#mcpf-ah)" />
          <line x1="456" y1="78" x2="508" y2="78" stroke="var(--tx3)" markerEnd="url(#mcpf-ah)" />
          <line x1="508" y1="98" x2="458" y2="98" stroke="var(--tx3)" markerEnd="url(#mcpf-ah)" />
        </g>
        <text x="236" y="64" textAnchor="middle" fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{tr === "remote" ? "HTTP" : "stdio"}</text>
        <text x="482" y="64" textAnchor="middle" fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>API</text>

        {/* nodes */}
        {NODES.map((n) => {
          const on = activeLane === n.lane || (activeLane === "gate" && n.lane === "claude");
          const color = LANE_COLOR[n.lane];
          return (
            <g key={n.lane}>
              <rect className={on ? "mcp-node on" : "mcp-node"} x={n.x} y={62} width={n.w} height={52} rx={10} fill={on ? "var(--s2)" : "var(--surface)"} stroke={color} strokeWidth={on ? 2.8 : 1.3} opacity={on ? 1 : 0.85} />
              <circle cx={n.x + 16} cy={80} r={4} fill={color} />
              <text x={n.x + 28} y={84} fontSize={13} fontWeight={on ? 700 : 600} fill={on ? "var(--tx)" : "var(--tx2)"} style={{ fontFamily: "var(--font-head)" }}>{t(n.title)}</text>
              {n.sub ? <text x={n.x + 14} y={102} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{t(n.sub)}</text> : null}
            </g>
          );
        })}

        {/* permission gate badge between Claude and server */}
        {activeLane === "gate" ? (
          <g className="mcp-gate">
            <rect x="176" y="20" width="120" height="30" rx="8" fill="var(--surface)" stroke={cur.soft ? "var(--sem-agentic)" : "var(--sem-warn)"} strokeWidth={2} />
            <text x="236" y="39" textAnchor="middle" fontSize={11} fontWeight={700} fill={cur.soft ? "var(--sem-agentic)" : "var(--sem-warn)"} style={{ fontFamily: "var(--font-mono)" }}>
              {cur.gate === "consent" ? "🔐 consent" : cur.soft ? "✓ auto-allow" : "⛔ approval"}
            </text>
            <line x1="236" y1="50" x2="236" y2="60" stroke={cur.soft ? "var(--sem-agentic)" : "var(--sem-warn)"} strokeWidth={1.5} strokeDasharray="3 3" />
          </g>
        ) : null}
      </svg>

      {/* detail + log */}
      <div className="mcp-grid">
        <div className="mcp-panel">
          <span className="mcp-step-no">{t(L("Step", "Крок"))} {i + 1} / {steps.length}</span>
          <div>
            <span className="mcp-chip" style={{ background: LANE_COLOR[cur.lane] }}>{cur.gate ? cur.gate : cur.lane}</span>
          </div>
          <div className="mcp-label">{t(cur.label)}</div>
          <div className="mcp-detail">{t(cur.detail)}</div>
          {cur.rpc ? <div className={cur.lane === "gate" ? "mcp-rpc gate" : "mcp-rpc"}>{cur.rpc}</div> : null}
        </div>

        <div className="mcp-log" aria-live="polite">
          {steps.slice(0, i + 1).map((s, idx) => (
            <div className="mcp-log-row" key={idx}>
              <span className="ph" style={{ color: LANE_COLOR[s.lane] }}>{s.gate ? s.gate : s.lane}</span>
              <span>{t(s.label)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="mcp-controls">
        <button className="btn" onClick={() => { setPlaying(false); setI(0); }} disabled={i === 0 && !playing}>↺ {t(L("Reset", "Скинути"))}</button>
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.max(0, x - 1)); }} disabled={i === 0}>← {t(L("Back", "Назад"))}</button>
        {!reduced ? (
          <button className="btn primary" onClick={() => { if (atEnd) setI(0); setPlaying((p) => !p); }}>
            {playing ? `❚❚ ${t(L("Pause", "Пауза"))}` : `▶ ${t(L("Play", "Грати"))}`}
          </button>
        ) : null}
        <button className="btn" onClick={() => { setPlaying(false); setI((x) => Math.min(steps.length - 1, x + 1)); }} disabled={atEnd}>{t(L("Step", "Крок"))} →</button>
        <span className="mcp-spacer" />
        <span className="mcp-hint">{t(L("prompt → connect → discover → approve → call → result", "prompt → connect → discover → approve → call → result"))}</span>
      </div>
    </div>
  );
}
