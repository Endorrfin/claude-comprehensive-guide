import React from "react";

/* M19 · A Cowork project = a LOCAL folder that wraps four project-scoped pieces
   (Instructions=coral, Scheduled tasks=amber, Context=violet, Memory=violet),
   while account-level connectors (teal) and plugins (green) plug in from OUTSIDE.
   The point: only Instructions + Context + Scheduled tasks + Memory are scoped to
   the project; connectors/plugins/skills are account-level and compose in.
   Pure SVG; theme tokens only. */
export function CoworkProject(): React.ReactElement {
  const chip = (
    x: number,
    y: number,
    color: string,
    title: string,
    sub: string,
  ): React.ReactElement => (
    <g>
      <rect x={x} y={y} width={176} height={78} rx={10} fill="var(--surface)" stroke={color} strokeWidth={2} />
      <circle cx={x + 18} cy={y + 22} r={6} fill={color} />
      <text x={x + 32} y={y + 28} fontSize={13.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{title}</text>
      <text x={x + 14} y={y + 52} fontSize={10.5} fill="var(--tx2)">{sub}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 322" role="img" aria-label="A Cowork project is a local folder holding four project-scoped pieces: Instructions, Scheduled tasks, Context and Memory. Account-level connectors and plugins plug into the project from outside. The project is stored locally with no cloud sync and its memory is walled to that project." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="cp-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--sem-tool)" />
        </marker>
      </defs>

      <text x="20" y="24" fontSize={12.5} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>A project = a local folder with four scoped parts</text>

      {/* project folder */}
      <rect x={36} y={46} width={132} height={20} rx={6} fill="var(--s2)" stroke="var(--accent-deep)" strokeWidth={2} />
      <text x={50} y={60} fontSize={10.5} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-mono)" }}>PROJECT</text>
      <rect x={36} y={64} width={404} height={222} rx={14} fill="var(--bg)" stroke="var(--accent-deep)" strokeWidth={2} />

      {chip(56, 86, "var(--accent)", "Instructions", "tone · rules for every task")}
      {chip(244, 86, "var(--sem-agentic)", "Scheduled tasks", "recurring, project-specific")}
      {chip(56, 184, "var(--sem-context)", "Context", "folder · linked project · URL")}
      {chip(244, 184, "var(--sem-context)", "Memory", "walled to this project")}

      {/* account / org column */}
      <rect x={506} y={64} width={186} height={158} rx={12} fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={599} y={86} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>ACCOUNT / ORG</text>
      <g>
        <rect x={522} y={100} width={154} height={48} rx={9} fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={2} />
        <circle cx={540} cy={124} r={6} fill="var(--sem-tool)" />
        <text x={554} y={120} fontSize={12.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Connectors</text>
        <text x={554} y={136} fontSize={9.5} fill="var(--tx2)">MCP · set once</text>
      </g>
      <g>
        <rect x={522} y={158} width={154} height={48} rx={9} fill="var(--surface)" stroke="var(--sem-ok)" strokeWidth={2} />
        <circle cx={540} cy={182} r={6} fill="var(--sem-ok)" />
        <text x={554} y={178} fontSize={12.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Plugins</text>
        <text x={554} y={194} fontSize={9.5} fill="var(--tx2)">skills · subagents · hooks</text>
      </g>

      {/* plug-in arrows: account → project */}
      <line x1={520} y1={124} x2={444} y2={132} stroke="var(--sem-tool)" strokeWidth={1.6} strokeDasharray="5 4" markerEnd="url(#cp-ah)" />
      <line x1={520} y1={182} x2={444} y2={150} stroke="var(--sem-tool)" strokeWidth={1.6} strokeDasharray="5 4" markerEnd="url(#cp-ah)" />
      <text x={474} y={108} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>plug in</text>

      {/* footer note */}
      <text x={36} y={308} fontSize={10.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>stored locally · no cloud sync · memory walled to this project</text>
    </svg>
  );
}
