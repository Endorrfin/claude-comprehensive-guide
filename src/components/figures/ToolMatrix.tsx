import React from "react";

/* M26 · A positioning map of the surfaces on two axes the decision actually
   turns on: WHAT the work touches (your words → your apps/web → your files &
   systems) and HOW MUCH autonomy it needs (one reply → an autonomous agent).
   The Tool Picker below turns the same logic into an interactive chooser.
   Pure SVG; theme tokens. */
type Spot = { label: string; x: number; y: number; color: string; place: "r" | "l" | "t" | "b" };

const SPOTS: Spot[] = [
  { label: "Chat + Artifacts", x: 150, y: 300, color: "var(--sem-claude)", place: "r" },
  { label: "Skill", x: 232, y: 246, color: "var(--sem-context)", place: "b" },
  { label: "Connector / MCP", x: 340, y: 288, color: "var(--sem-tool)", place: "r" },
  { label: "Excel / PowerPoint", x: 452, y: 196, color: "var(--accent-bright)", place: "t" },
  { label: "Claude in Chrome", x: 372, y: 116, color: "var(--sem-agentic)", place: "r" },
  { label: "Cowork", x: 602, y: 102, color: "var(--sem-agentic)", place: "l" },
  { label: "Claude Code", x: 618, y: 206, color: "var(--sem-tool)", place: "l" },
];

export function ToolMatrix(): React.ReactElement {
  const lx = (s: Spot): { x: number; y: number; anchor: "start" | "end" | "middle" } => {
    if (s.place === "r") return { x: s.x + 14, y: s.y + 4, anchor: "start" };
    if (s.place === "l") return { x: s.x - 14, y: s.y + 4, anchor: "end" };
    if (s.place === "t") return { x: s.x, y: s.y - 14, anchor: "middle" };
    return { x: s.x, y: s.y + 20, anchor: "middle" };
  };

  return (
    <svg viewBox="0 0 720 360" role="img" aria-label="A map of Claude's surfaces on two axes. Horizontal: what the work touches, from your words and ideas, to your apps and the web, to your files and systems. Vertical: how much autonomy, from a single reply up to an autonomous agent. Chat and Artifacts sit low-left; Connectors, Skills and Excel/PowerPoint in the middle; Claude in Chrome, Cowork and Claude Code high up, with Cowork and Code farthest toward files and systems." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="tm-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--tx3)" /></marker>
      </defs>

      {/* axes */}
      <line x1={78} y1={332} x2={690} y2={332} stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#tm-ah)" />
      <line x1={78} y1={332} x2={78} y2={32} stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#tm-ah)" />

      {/* axis labels */}
      <text x={384} y={352} textAnchor="middle" fontSize={11} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>what it touches:  your words  →  your apps & the web  →  your files & systems</text>
      <text x={20} y={180} fontSize={11} fill="var(--tx2)" transform="rotate(-90 20 180)" style={{ fontFamily: "var(--font-mono)" }}>autonomy:  one reply  →  an agent</text>

      {/* faint quadrant grid */}
      <line x1={280} y1={36} x2={280} y2={328} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 5" />
      <line x1={490} y1={36} x2={490} y2={328} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 5" />
      <line x1={82} y1={150} x2={688} y2={150} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 5" />

      {SPOTS.map((s) => {
        const l = lx(s);
        return (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r={9} fill={s.color} opacity={0.22} />
            <circle cx={s.x} cy={s.y} r={5} fill={s.color} />
            <text x={l.x} y={l.y} textAnchor={l.anchor} fontSize={12.5} fontWeight={600} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
