import React from "react";

/* M24 · Hooks fire at fixed points in Claude Code's lifecycle. The session runs
   left → right (SessionStart → UserPromptSubmit → the tool loop → Stop), and a
   hook can hang off any event. PreToolUse is the one that can BLOCK a call
   (exit/JSON decision); the others observe (format, lint, test, log, notify) or
   inject context. Pure SVG; theme tokens (warn=red gate, tool=teal observe,
   context=violet inject, claude=coral loop). */
export function HookLifecycle(): React.ReactElement {
  const tick = (x: number, label: string): React.ReactElement => (
    <g>
      <circle cx={x} cy={70} r={5} fill="var(--surface)" stroke="var(--sem-claude)" strokeWidth={2} />
      <text x={x} y={54} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>{label}</text>
    </g>
  );
  const hook = (x: number, color: string, title: string, sub: string, block = false): React.ReactElement => (
    <g>
      <line x1={x} y1={75} x2={x} y2={116} stroke={color} strokeWidth={1.3} strokeDasharray="3 3" />
      <rect x={x - 74} y={116} width={148} height={42} rx={8} fill="var(--surface)" stroke={color} strokeWidth={block ? 2.2 : 1.5} />
      <text x={x} y={134} textAnchor="middle" fontSize={11} fontWeight={700} fill={block ? color : "var(--tx)"}>{title}</text>
      <text x={x} y={150} textAnchor="middle" fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 200" role="img" aria-label="The Claude Code lifecycle as a left-to-right track with hooks hanging off events: SessionStart injects rules, UserPromptSubmit, PreToolUse can block a tool call, PostToolUse formats and tests, Stop notifies. PreToolUse and PostToolUse form the repeating tool loop." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="hl-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" /></marker>
        <marker id="hl-ah-on" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--sem-claude)" /></marker>
      </defs>

      {/* lifecycle track */}
      <line x1="40" y1="70" x2="690" y2="70" stroke="var(--line2)" strokeWidth={1.5} markerEnd="url(#hl-ah)" />
      {tick(70, "SessionStart")}
      {tick(210, "UserPrompt")}
      {tick(360, "PreToolUse")}
      {tick(500, "PostToolUse")}
      {tick(650, "Stop")}

      {/* tool loop arc PostToolUse -> PreToolUse */}
      <path d="M500 64 C 500 26, 360 26, 360 62" fill="none" stroke="var(--sem-claude)" strokeWidth={1.5} markerEnd="url(#hl-ah-on)" />
      <text x={430} y={22} textAnchor="middle" fontSize={9.5} fill="var(--sem-claude)" style={{ fontFamily: "var(--font-mono)" }}>tool loop</text>

      {/* hooks */}
      {hook(70, "var(--sem-context)", "inject context", "rules · env")}
      {hook(360, "var(--sem-warn)", "⛔ gate", "block rm · .env", true)}
      {hook(500, "var(--sem-tool)", "observe", "format · lint · test")}
      {hook(650, "var(--sem-agentic)", "notify / log", "ping · audit")}

      <text x={360} y={186} textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>hooks run deterministically — they don't depend on the model remembering</text>
    </svg>
  );
}
