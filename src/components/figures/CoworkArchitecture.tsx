import React from "react";

/** Where Cowork sits and what it can reach. Pure SVG; colors from theme tokens. */
export function CoworkArchitecture(): React.ReactElement {
  const node = (
    x: number,
    y: number,
    color: string,
    l1: string,
    l2: string,
  ): React.ReactElement => (
    <g>
      <rect x={x - 78} y={y - 26} width={156} height={52} rx={11} fill="var(--surface)" stroke={color} strokeWidth={1.5} />
      <text x={x} y={y - 3} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--tx)">{l1}</text>
      <text x={x} y={y + 14} textAnchor="middle" fontSize={11} fill="var(--tx2)">{l2}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Cowork sits in Claude Desktop and reaches your files, a sandbox, connectors and your screen." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      {/* links (drawn first, behind nodes) */}
      <g stroke="var(--line2)" strokeWidth={1.5}>
        <line x1="360" y1="150" x2="150" y2="70" />
        <line x1="360" y1="150" x2="570" y2="70" />
        <line x1="360" y1="150" x2="150" y2="232" />
        <line x1="360" y1="150" x2="570" y2="232" />
      </g>

      {/* centre: Claude Desktop / Cowork */}
      <rect x="252" y="116" width="216" height="68" rx="14" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={2} />
      <text x="360" y="144" textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Claude Desktop</text>
      <text x="360" y="165" textAnchor="middle" fontSize={12.5} fill="var(--tx)">Cowork — the agent tab</text>

      {/* satellites */}
      {node(150, 70, "var(--sem-context)", "Your folder", "read & write files")}
      {node(570, 70, "var(--sem-tool)", "Connectors / MCP", "Notion, Gmail, …")}
      {node(150, 232, "var(--sem-ok)", "Sandbox", "run code safely")}
      {node(570, 232, "var(--sem-agentic)", "Your screen", "computer use")}
    </svg>
  );
}
