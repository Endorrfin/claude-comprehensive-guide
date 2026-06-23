import React from "react";

/* M23 · Three scales of running many agents, smallest → largest:
   1) Sub-agents — within ONE session; isolated context windows; return summaries.
   2) Background agents — MANY independent sessions in parallel, watched from one place.
   3) Agent teams — sessions that TALK to each other (shared task list + messages),
      git-coordinated (each on its own worktree/branch).
   Pure SVG; theme tokens (claude=coral, tool=teal, context=violet, agentic=amber). */
export function AgentScales(): React.ReactElement {
  const dot = (cx: number, cy: number, color: string, r = 7): React.ReactElement => (
    <circle cx={cx} cy={cy} r={r} fill="var(--surface)" stroke={color} strokeWidth={2} />
  );
  const panel = (x: number, title: string, tag: string): React.ReactElement => (
    <g>
      <rect x={x} y={36} width={216} height={150} rx={12} fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.3} />
      <text x={x + 16} y={60} fontSize={13.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{title}</text>
      <text x={x + 16} y={76} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{tag}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 220" role="img" aria-label="Three scales: sub-agents inside one session with isolated contexts returning summaries; background agents as many parallel independent sessions watched from one place; and agent teams as sessions that message each other, git-coordinated on separate worktrees." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="as-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--tx3)" /></marker>
      </defs>

      {/* 1 · sub-agents (one session) */}
      {panel(12, "1 · Sub-agents", "one session")}
      {dot(48, 120, "var(--sem-claude)", 9)}
      <text x={48} y={146} textAnchor="middle" fontSize={8.5} fill="var(--tx3)">main</text>
      {[100, 130, 160].map((cy, k) => (
        <g key={k}>
          <line x1="58" y1="120" x2="150" y2={cy} stroke="var(--tx3)" strokeWidth={1.2} markerEnd="url(#as-ah)" />
          {dot(162, cy, "var(--sem-tool)", 6)}
        </g>
      ))}
      <text x={196} y={104} textAnchor="middle" fontSize={8.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>isolated</text>
      <text x={120} y={178} textAnchor="middle" fontSize={9} fill="var(--tx2)">return summaries ↩</text>

      {/* 2 · background agents (many sessions) */}
      {panel(252, "2 · Background agents", "many sessions")}
      {[[300, 108], [360, 108], [420, 108], [300, 150], [360, 150], [420, 150]].map(([cx, cy], k) => (
        <g key={k}>{dot(cx, cy, "var(--sem-agentic)", 7)}</g>
      ))}
      <rect x={284} y={92} width={152} height={74} rx={8} fill="none" stroke="var(--line)" strokeDasharray="4 3" />
      <text x={360} y={180} textAnchor="middle" fontSize={9} fill="var(--tx2)">watched from one dashboard</text>

      {/* 3 · agent teams (sessions that talk) */}
      {panel(492, "3 · Agent teams", "sessions that talk")}
      {dot(560, 104, "var(--sem-context)", 8)}
      <text x={560} y={96} textAnchor="middle" fontSize={8} fill="var(--tx3)">lead</text>
      {dot(528, 152, "var(--sem-context)", 7)}
      {dot(592, 152, "var(--sem-context)", 7)}
      {/* messaging links (two-way) */}
      <line x1="552" y1="112" x2="532" y2="144" stroke="var(--sem-context)" strokeWidth={1.3} />
      <line x1="568" y1="112" x2="588" y2="144" stroke="var(--sem-context)" strokeWidth={1.3} />
      <line x1="535" y1="152" x2="585" y2="152" stroke="var(--sem-context)" strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={600} y={128} fontSize={11} fill="var(--sem-context)">⇄</text>
      <text x={600} y={170} fontSize={11} fill="var(--sem-context)">⇄</text>
      <text x={600} y={196} textAnchor="middle" fontSize={9} fill="var(--tx2)">git worktrees</text>
    </svg>
  );
}
