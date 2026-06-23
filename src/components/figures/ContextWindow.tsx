import React from "react";

/* M10 · Context window anatomy: one request laid out inside a fixed frame —
   system, skills/tools, knowledge, the growing conversation, the current
   message, and the room the answer needs. Anything past the edge is truncated.
   Beneath: a U-shaped recall hint ("lost in the middle"). Theme-token colors. */
export function ContextWindow(): React.ReactElement {
  const slice = (x: number, w: number, color: string, label: string): React.ReactElement => (
    <g>
      <rect x={x} y={70} width={w} height={56} fill={color} opacity={0.9} />
      <text x={x + w / 2} y={102} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--bg)" style={{ fontFamily: "var(--font-body)" }}>{label}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="One request laid out inside a fixed context window: system, skills and tools, knowledge, the growing conversation, the current message, and reserved room for the answer; content past the edge is truncated. Recall is strongest at the start and end of the window." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="cw-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* the fixed frame */}
      <rect x="34" y="64" width="608" height="68" rx="6" fill="none" stroke="var(--sem-context)" strokeWidth={2} />
      <text x="34" y="52" fontSize={12.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Context window — fixed (200K · up to 1M)</text>

      {/* ordered slices (x: 36 → 640) */}
      {slice(36, 70, "var(--sem-claude)", "system")}
      {slice(106, 78, "var(--sem-tool)", "skills+tools")}
      {slice(184, 150, "var(--sem-context)", "knowledge")}
      {slice(334, 150, "var(--tx3)", "conversation")}
      {slice(484, 64, "var(--accent-bright)", "this msg")}
      {slice(548, 92, "var(--accent-deep)", "answer room")}

      {/* conversation grows arrow */}
      <line x1="338" y1="58" x2="480" y2="58" stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#cw-ah)" />
      <text x="409" y="52" textAnchor="middle" fontSize="9.5" fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>grows each turn →</text>

      {/* overflow */}
      <text x="650" y="103" fontSize="10.5" fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>overflow</text>
      <text x="650" y="118" fontSize="10.5" fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>→ cut</text>

      {/* recall curve (lost in the middle) */}
      <text x="34" y="176" fontSize={11} fill="var(--tx2)">Recall by position</text>
      <path d="M40,250 C160,196 200,238 340,244 C480,250 520,196 636,250" fill="none" stroke="var(--sem-ok)" strokeWidth={2} />
      <line x1="40" y1="250" x2="636" y2="250" stroke="var(--line2)" strokeWidth={1} />
      <text x="40" y="268" fontSize="10" fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>start: strong</text>
      <text x="338" y="268" textAnchor="middle" fontSize="10" fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>middle: weakest</text>
      <text x="636" y="268" textAnchor="end" fontSize="10" fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>end: strong</text>
    </svg>
  );
}
