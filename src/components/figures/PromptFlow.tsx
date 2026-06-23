import React from "react";

/* M3 · How a request becomes a result. Your prompt + the context already in the
   window (instructions, files, history, memory) go into Claude, which reasons
   and answers; you then iterate with follow-ups in the same chat. Pure SVG;
   theme tokens; prompt=coral, context=violet. */
export function PromptFlow(): React.ReactElement {
  const ctx = (y: number, label: string): React.ReactElement => (
    <text x={44} y={y} fontSize={10.5} fill="var(--tx2)">• {label}</text>
  );
  return (
    <svg viewBox="0 0 720 280" role="img" aria-label="A prompt becomes a result: your prompt plus the context already in the window — your instructions, attached files, the conversation so far, and memory — go into Claude, which reasons and produces an answer. You then iterate with follow-ups in the same chat." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="pf-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* left · prompt + context */}
      <rect x="24" y="36" width="212" height="40" rx="10" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={2} />
      <text x="40" y="61" fontSize={12.5} fontWeight={700} fill="var(--accent-bright)">Your prompt</text>
      <text x="150" y="61" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>the goal</text>

      <rect x="24" y="86" width="212" height="138" rx="10" fill="var(--surface)" stroke="var(--sem-context)" strokeWidth={1.6} />
      <text x="40" y="108" fontSize={11.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>+ context in the window</text>
      {ctx(132, "your instructions")}
      {ctx(154, "attached files")}
      {ctx(176, "the conversation so far")}
      {ctx(198, "memory")}

      {/* center · Claude */}
      <rect x="300" y="92" width="130" height="76" rx="13" fill="var(--surface)" stroke="var(--accent)" strokeWidth={2.2} />
      <text x="365" y="124" textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Claude</text>
      <text x="365" y="144" textAnchor="middle" fontSize={10.5} fill="var(--tx2)">reasons</text>

      {/* right · answer */}
      <rect x="494" y="92" width="200" height="76" rx="13" fill="var(--s2)" stroke="var(--accent-deep)" strokeWidth={1.8} />
      <text x="594" y="124" textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Answer</text>
      <text x="594" y="144" textAnchor="middle" fontSize={10} fill="var(--tx3)">refine it with follow-ups</text>

      {/* arrows */}
      <g fill="none" strokeWidth={1.8}>
        <line x1="236" y1="130" x2="296" y2="130" stroke="var(--tx3)" markerEnd="url(#pf-ah)" />
        <line x1="430" y1="130" x2="490" y2="130" stroke="var(--tx3)" markerEnd="url(#pf-ah)" />
      </g>
      {/* iterate loop */}
      <path d="M594 168 C 594 232, 130 232, 130 230" fill="none" stroke="var(--sem-tool)" strokeWidth={1.6} strokeDasharray="5 4" markerEnd="url(#pf-ah)" />
      <text x="360" y="252" textAnchor="middle" fontSize={10.5} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-mono)" }}>follow-up · iterate (same chat keeps the context)</text>
    </svg>
  );
}
