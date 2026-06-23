import React from "react";

/* M8 · Artifacts — the split: the conversation stays on the left; a significant,
   self-contained output moves into a dedicated artifact window on the right,
   with its own toolbar (versions · code · copy · download · publish).
   Pure SVG; colors from theme tokens. */
export function ChatArtifactPanel(): React.ReactElement {
  const bubble = (x: number, y: number, w: number, mine: boolean): React.ReactElement => (
    <rect
      x={x}
      y={y}
      width={w}
      height={16}
      rx={8}
      fill={mine ? "var(--accent-dim)" : "var(--s2)"}
      stroke={mine ? "var(--accent-deep)" : "var(--line2)"}
      strokeWidth={1}
    />
  );
  const chip = (x: number, label: string, color = "var(--tx2)"): React.ReactElement => (
    <g>
      <rect x={x} y={86} width={label.length * 6.6 + 14} height={20} rx={6} fill="var(--surface)" stroke="var(--line2)" />
      <text x={x + 7} y={100} fontSize={10.5} fill={color} style={{ fontFamily: "var(--font-mono)" }}>{label}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 312" role="img" aria-label="The chat conversation stays on the left; a substantial, self-contained output opens as an editable, versioned, shareable artifact in a dedicated window on the right." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="ca-ah" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* chat column */}
      <rect x="28" y="40" width="276" height="244" rx="14" fill="var(--surface)" stroke="var(--line)" strokeWidth={1.5} />
      <text x="46" y="30" fontSize={12.5} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>Chat</text>
      {bubble(48, 62, 150, false)}
      {bubble(126, 92, 152, true)}
      {bubble(48, 122, 196, false)}
      {bubble(48, 150, 120, false)}
      {bubble(150, 180, 128, true)}
      <text x="48" y="232" fontSize={11} fill="var(--tx3)">“Can you build this as an app?”</text>
      <text x="48" y="252" fontSize={11} fill="var(--tx3)">→ Claude opens an artifact ▸</text>

      {/* transfer arrow */}
      <line x1="306" y1="150" x2="372" y2="150" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#ca-ah)" />
      <text x="339" y="142" textAnchor="middle" fontSize={9.5} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-mono)" }}>&gt;15 lines</text>

      {/* artifact window */}
      <rect x="380" y="40" width="312" height="244" rx="14" fill="var(--s2)" stroke="var(--accent-deep)" strokeWidth={1.8} />
      <text x="398" y="30" fontSize={12.5} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Artifact window</text>

      {/* toolbar */}
      {chip(398, "v3 ▾", "var(--sem-context)")}
      {chip(446, "code")}
      {chip(498, "copy")}
      {chip(552, "↓")}
      <g>
        <rect x="590" y="86" width="84" height="20" rx="6" fill="var(--accent)" />
        <text x="632" y="100" textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--ink)" style={{ fontFamily: "var(--font-mono)" }}>Publish</text>
      </g>

      {/* rendered output preview */}
      <rect x="398" y="120" width="276" height="146" rx="9" fill="var(--code-bg)" stroke="var(--line)" />
      <text x="412" y="142" fontSize={11} fill="var(--tx2)">Runs / renders here — HTML · React · SVG · doc</text>
      <rect x="412" y="156" width="248" height="9" rx="4" fill="var(--accent-dim)" />
      {/* little bar-chart flourish */}
      <rect x="412" y="200" width="22" height="50" rx="3" fill="var(--sem-tool)" />
      <rect x="446" y="180" width="22" height="70" rx="3" fill="var(--sem-context)" />
      <rect x="480" y="214" width="22" height="36" rx="3" fill="var(--sem-ok)" />
      <rect x="514" y="192" width="22" height="58" rx="3" fill="var(--accent)" />
      <rect x="548" y="224" width="22" height="26" rx="3" fill="var(--sem-agentic)" />
      <text x="660" y="258" textAnchor="end" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>edit · version · share</text>
    </svg>
  );
}
