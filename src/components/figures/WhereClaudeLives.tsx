import React from "react";

/* M1 · Where Claude lives. One set of models (Opus·Sonnet·Haiku) powers many
   surfaces: the chat APPS (web, desktop, mobile) and the AGENTIC surfaces in
   your tools (Cowork, Claude Code, Chrome, Excel/PowerPoint). Pure SVG; theme
   tokens; claude=coral core, apps=violet, agents=amber. */
export function WhereClaudeLives(): React.ReactElement {
  const chip = (x: number, y: number, label: string, color: string): React.ReactElement => (
    <g>
      <rect x={x} y={y} width="150" height="34" rx="8" fill="var(--surface)" stroke={color} strokeWidth={1.6} />
      <text x={x + 75} y={y + 22} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--tx)">{label}</text>
    </g>
  );
  const link = (x1: number, y1: number, x2: number, y2: number, color: string): React.ReactElement => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.4} opacity={0.7} />
  );
  return (
    <svg viewBox="0 0 720 320" role="img" aria-label="One family of Claude models — Opus, Sonnet and Haiku — powers many surfaces: the chat apps (web, desktop, mobile) and the agentic surfaces in your tools (Cowork, Claude Code, Claude in Chrome, Claude for Excel and PowerPoint)." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      {/* links behind */}
      <g>
        {link(300, 130, 195, 70, "var(--sem-context)")}
        {link(300, 150, 195, 130, "var(--sem-context)")}
        {link(300, 170, 195, 190, "var(--sem-context)")}
        {link(420, 130, 525, 60, "var(--sem-agentic)")}
        {link(420, 145, 525, 116, "var(--sem-agentic)")}
        {link(420, 165, 525, 172, "var(--sem-agentic)")}
        {link(420, 180, 525, 228, "var(--sem-agentic)")}
      </g>

      {/* center core */}
      <rect x="300" y="118" width="120" height="84" rx="14" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={2.4} />
      <text x="360" y="150" textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Claude</text>
      <text x="360" y="168" textAnchor="middle" fontSize={9.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>models</text>
      <text x="360" y="184" textAnchor="middle" fontSize={9} fill="var(--tx3)">Opus·Sonnet·Haiku</text>

      {/* left · chat apps */}
      <text x="45" y="40" fontSize={12.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Chat apps</text>
      {chip(45, 53, "Web · claude.ai", "var(--sem-context)")}
      {chip(45, 113, "Desktop", "var(--sem-context)")}
      {chip(45, 173, "Mobile", "var(--sem-context)")}

      {/* right · agentic surfaces */}
      <text x="525" y="40" fontSize={12.5} fontWeight={700} fill="var(--sem-agentic)" style={{ fontFamily: "var(--font-head)" }}>In your tools (agents)</text>
      {chip(525, 43, "Cowork", "var(--sem-agentic)")}
      {chip(525, 99, "Claude Code", "var(--sem-agentic)")}
      {chip(525, 155, "Claude in Chrome", "var(--sem-agentic)")}
      {chip(525, 211, "Excel · PowerPoint", "var(--sem-agentic)")}

      {/* footnote */}
      <text x="360" y="300" textAnchor="middle" fontSize={10.5} fill="var(--tx3)">Apps work on every plan · most agentic surfaces are paid</text>
    </svg>
  );
}
