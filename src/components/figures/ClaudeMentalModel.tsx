import React from "react";

/* M1 · The core mental model. Claude reads everything currently in its CONTEXT
   WINDOW (your message, files, conversation, instructions, memory), reasons over
   it, and answers — and when given TOOLS it can also act in the world (search,
   files, apps, code). Pure SVG; theme tokens; semantic colors
   (context=violet, claude=coral, tool=teal). */
export function ClaudeMentalModel(): React.ReactElement {
  const ctxLine = (y: number, label: string): React.ReactElement => (
    <text x={44} y={y} fontSize={11} fill="var(--tx2)">• {label}</text>
  );
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Claude reads everything in its context window — your message, attached files, the conversation, your instructions and memory — reasons over it, and answers. With tools it can also act on the world: web search, files, apps and code." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="cm-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* left · context window */}
      <rect x="24" y="48" width="208" height="204" rx="12" fill="var(--accent-dim)" stroke="var(--sem-context)" strokeWidth={2} />
      <text x="40" y="74" fontSize={13.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Context window</text>
      <text x="40" y="92" fontSize={10.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>everything Claude can see</text>
      {ctxLine(122, "your message")}
      {ctxLine(146, "attached files & images")}
      {ctxLine(170, "the conversation so far")}
      {ctxLine(194, "your instructions")}
      {ctxLine(218, "memory")}

      {/* center · Claude */}
      <rect x="290" y="108" width="140" height="84" rx="14" fill="var(--surface)" stroke="var(--accent)" strokeWidth={2.4} />
      <text x="360" y="142" textAnchor="middle" fontSize={18} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Claude</text>
      <text x="360" y="164" textAnchor="middle" fontSize={11} fill="var(--tx2)">reads · reasons</text>

      {/* right · tools → world */}
      <rect x="488" y="64" width="208" height="72" rx="12" fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={2} />
      <text x="504" y="90" fontSize={13.5} fontWeight={700} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-head)" }}>Tools</text>
      <text x="504" y="110" fontSize={10.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>web · files · apps · code</text>
      <text x="504" y="124" fontSize={10} fill="var(--tx3)">only what you grant</text>

      {/* arrows */}
      <g fill="none" strokeWidth={1.8}>
        <line x1="232" y1="150" x2="286" y2="150" stroke="var(--sem-context)" markerEnd="url(#cm-ah)" />
        <line x1="430" y1="132" x2="486" y2="108" stroke="var(--sem-tool)" markerEnd="url(#cm-ah)" />
        <line x1="486" y1="120" x2="432" y2="146" stroke="var(--sem-tool)" markerEnd="url(#cm-ah)" />
        <line x1="360" y1="192" x2="360" y2="236" stroke="var(--tx3)" markerEnd="url(#cm-ah)" />
      </g>
      <text x="259" y="142" textAnchor="middle" fontSize={9.5} fill="var(--sem-context)" style={{ fontFamily: "var(--font-mono)" }}>reads</text>
      <text x="468" y="100" textAnchor="middle" fontSize={9.5} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-mono)" }}>acts</text>
      <text x="452" y="150" textAnchor="middle" fontSize={9.5} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-mono)" }}>observes</text>

      {/* answer */}
      <rect x="286" y="244" width="148" height="40" rx="10" fill="var(--s2)" stroke="var(--accent-deep)" strokeWidth={1.6} />
      <text x="360" y="269" textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--tx)">Answer</text>
    </svg>
  );
}
