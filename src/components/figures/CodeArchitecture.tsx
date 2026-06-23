import React from "react";

/* M22 · Claude Code architecture. The SAME agent reaches you through three
   surfaces (terminal · IDE extension · CI / headless), runs the agent loop over
   your real repo and shell (no sandbox), and is governed by four levers:
   CLAUDE.md (context/memory) · permissions (the boundary) · model + effort ·
   tools (file edits, bash, MCP). Pure SVG; theme tokens
   (claude=coral, context=violet, tool=teal, warn=red). */
export function CodeArchitecture(): React.ReactElement {
  const surface = (y: number, label: string, sub: string): React.ReactElement => (
    <g>
      <rect x={18} y={y} width={150} height={40} rx={9} fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.3} />
      <text x={32} y={y + 18} fontSize={12.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{label}</text>
      <text x={32} y={y + 32} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{sub}</text>
    </g>
  );
  const lever = (x: number, color: string, label: string, sub: string): React.ReactElement => (
    <g>
      <rect x={x} y={170} width={150} height={44} rx={9} fill="var(--surface)" stroke={color} strokeWidth={1.6} />
      <circle cx={x + 16} cy={186} r={4} fill={color} />
      <text x={x + 27} y={190} fontSize={11.5} fontWeight={700} fill="var(--tx)">{label}</text>
      <text x={x + 12} y={206} fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 250" role="img" aria-label="Claude Code: the same agent reached via terminal, IDE extension or CI/headless, running the agent loop over your real repo and shell, governed by CLAUDE.md, permissions, model+effort and tools." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="ca-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" /></marker>
      </defs>

      {/* surfaces (left) */}
      <text x={93} y={20} textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>surfaces</text>
      {surface(28, "Terminal", "claude")}
      {surface(74, "IDE extension", "VS Code · JetBrains")}
      {surface(120, "CI / headless", "Actions · -p")}
      <line x1="168" y1="94" x2="250" y2="100" stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#ca-ah)" />

      {/* the agent core */}
      <rect x={252} y={64} width={232} height={72} rx={13} fill="var(--s2)" stroke="var(--sem-claude)" strokeWidth={2.4} />
      <circle cx={276} cy={90} r={5} fill="var(--sem-claude)" />
      <text x={288} y={94} fontSize={15} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Claude Code</text>
      <text x={268} y={114} fontSize={10.5} fill="var(--tx2)">read · edit · run · loop</text>
      <text x={268} y={129} fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>your real shell — no sandbox</text>

      {/* repo (right) */}
      <line x1="484" y1="100" x2="560" y2="100" stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#ca-ah)" />
      <line x1="560" y1="116" x2="484" y2="116" stroke="var(--tx3)" strokeWidth={1.2} strokeDasharray="4 3" markerEnd="url(#ca-ah)" />
      <rect x={562} y={70} width={140} height={60} rx={11} fill="var(--surface)" stroke="var(--sem-ok)" strokeWidth={1.8} />
      <text x={632} y={96} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Your repo</text>
      <text x={632} y={113} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>edits · commits · tests</text>

      {/* governance levers (bottom) */}
      <text x={368} y={158} textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>governed by ↓</text>
      <line x1="368" y1="136" x2="368" y2="148" stroke="var(--tx3)" strokeWidth={1.2} />
      {lever(20, "var(--sem-context)", "CLAUDE.md", "project brain")}
      {lever(196, "var(--sem-warn)", "Permissions", "allow · ask · deny")}
      {lever(372, "var(--sem-claude)", "Model + effort", "Opus · Sonnet · Haiku")}
      {lever(548, "var(--sem-tool)", "Tools", "bash · edit · MCP")}
    </svg>
  );
}
