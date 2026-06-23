import React from "react";

/** A Project as a walled workspace: instructions + knowledge live inside the
 *  context wall; skills (global) and connectors compose in from outside.
 *  Pure SVG; colors from theme tokens. */
export function ProjectWorkspace(): React.ReactElement {
  const node = (
    x: number,
    y: number,
    w: number,
    color: string,
    l1: string,
    l2: string,
  ): React.ReactElement => (
    <g>
      <rect x={x - w / 2} y={y - 24} width={w} height={48} rx={10} fill="var(--surface)" stroke={color} strokeWidth={1.5} />
      <text x={x} y={y - 2} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--tx)">{l1}</text>
      <text x={x} y={y + 15} textAnchor="middle" fontSize={10.5} fill="var(--tx2)">{l2}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 330" role="img" aria-label="A project walls off its own instructions and knowledge inside the context window; skills and connectors compose in from outside." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="pw-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--sem-tool)" />
        </marker>
      </defs>

      {/* the project room = the context wall */}
      <rect x="40" y="44" width="446" height="252" rx="16" fill="var(--accent-dim)" stroke="var(--sem-context)" strokeWidth={2} />
      <text x="62" y="34" fontSize={13} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Project</text>
      <text x="474" y="294" textAnchor="end" fontSize={10.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>context wall (~200K)</text>

      {/* inside the wall: instructions + knowledge + chats */}
      {node(180, 96, 232, "var(--sem-context)", "Instructions", "how Claude behaves")}
      {node(180, 174, 232, "var(--sem-context)", "Knowledge (files)", "what it draws on — static")}
      {node(180, 252, 232, "var(--sem-claude)", "Project chats", "share the context")}

      {/* outside the wall: skills + connectors compose in */}
      <g strokeDasharray="5 4" stroke="var(--sem-tool)" strokeWidth={1.6} fill="none">
        <line x1="600" y1="120" x2="492" y2="150" markerEnd="url(#pw-ah)" />
        <line x1="600" y1="226" x2="492" y2="208" markerEnd="url(#pw-ah)" />
      </g>
      {node(610, 120, 196, "var(--sem-ok)", "Skills (global)", "activate everywhere")}
      {node(610, 226, 196, "var(--sem-tool)", "Connectors / MCP", "toggled per chat")}
      <text x="546" y="174" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>compose in</text>
    </svg>
  );
}
