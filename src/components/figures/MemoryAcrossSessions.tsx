import React from "react";

/* M5 · Memory across sessions. By default each chat is independent; Memory is a
   durable summary that every new non-project chat reads from and writes to
   (refreshed ~24h). Each Project keeps its OWN walled memory, separate from the
   global one. Pure SVG; theme tokens; chats=surface, memory=violet. */
export function MemoryAcrossSessions(): React.ReactElement {
  const chat = (x: number, day: string): React.ReactElement => (
    <g>
      <rect x={x} y="40" width="118" height="58" rx="10" fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.4} />
      <text x={x + 59} y="64" textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--tx)">Chat</text>
      <text x={x + 59} y="82" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{day}</text>
    </g>
  );
  const arrows = (x: number): React.ReactElement => (
    <g fill="none" strokeWidth={1.5}>
      <line x1={x - 8} y1="158" x2={x - 8} y2="100" stroke="var(--sem-context)" markerEnd="url(#ms-ah)" />
      <line x1={x + 8} y1="100" x2={x + 8} y2="158" stroke="var(--sem-context)" markerEnd="url(#ms-ah)" opacity={0.6} />
    </g>
  );
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Memory across sessions: separate chats over time each read from and write to a durable Memory summary that persists between them and refreshes about every 24 hours. Each Project keeps its own walled memory, separate from the global memory." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="ms-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--sem-context)" />
        </marker>
      </defs>

      {/* time axis label */}
      <text x="24" y="28" fontSize={11} fontWeight={700} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>TIME →</text>

      {/* three general chats */}
      {chat(40, "Mon")}
      {chat(190, "Tue")}
      {chat(340, "Wed")}
      {arrows(99)}
      {arrows(249)}
      {arrows(399)}

      {/* the global Memory store (CHANGED S15: leading "global" word tripped an ESLint config-comment directive) */}
      <rect x="24" y="160" width="452" height="58" rx="12" fill="var(--accent-dim)" stroke="var(--sem-context)" strokeWidth={2} />
      <text x="40" y="184" fontSize={13.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Memory</text>
      <text x="40" y="202" fontSize={10.5} fill="var(--tx2)">editable summary · persists across chats · ~24h refresh</text>

      {/* legend for read/write */}
      <text x="130" y="132" fontSize={9.5} fill="var(--sem-context)" style={{ fontFamily: "var(--font-mono)" }}>read ↑ / write ↓</text>

      {/* project: walled separate memory */}
      <rect x="520" y="40" width="176" height="58" rx="10" fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.4} />
      <text x="608" y="64" textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--tx)">Project chat</text>
      <text x="608" y="82" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>walled context</text>

      <rect x="520" y="160" width="176" height="58" rx="12" fill="var(--surface)" stroke="var(--sem-context)" strokeWidth={1.8} strokeDasharray="6 4" />
      <text x="608" y="184" textAnchor="middle" fontSize={12.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Project memory</text>
      <text x="608" y="202" textAnchor="middle" fontSize={10} fill="var(--tx2)">separate per project</text>
      <g fill="none" strokeWidth={1.5}>
        <line x1="600" y1="158" x2="600" y2="100" stroke="var(--sem-context)" markerEnd="url(#ms-ah)" />
        <line x1="616" y1="100" x2="616" y2="158" stroke="var(--sem-context)" markerEnd="url(#ms-ah)" opacity={0.6} />
      </g>

      {/* divider between global and project worlds */}
      <line x1="498" y1="36" x2="498" y2="224" stroke="var(--line)" strokeWidth={1} strokeDasharray="3 4" />

      <text x="250" y="244" textAnchor="middle" fontSize={10.5} fill="var(--tx3)">Global memory feeds your ordinary chats</text>
      <text x="608" y="244" textAnchor="middle" fontSize={10.5} fill="var(--tx3)">…projects stay separate</text>
    </svg>
  );
}
