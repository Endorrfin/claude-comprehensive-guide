import React from "react";

/* M19 · Dispatch = ONE continuous thread spanning phone + desktop. A task texted
   from the phone runs on the AWAKE desktop, where Dispatch ROUTES it to the right
   agent (dev → Claude Code, knowledge work → Cowork); the result returns to the
   same thread with a push notification. Left→right flow + a dashed return path.
   Pure SVG; theme tokens (phone=coral, desktop=violet, Code=amber, Cowork=teal). */
export function DispatchFlow(): React.ReactElement {
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Dispatch is one continuous thread across phone and desktop. You text a task from your phone; it runs on your awake desktop where a router sends development work to a Claude Code session and knowledge work to a Cowork session; the result returns to the same thread with a push notification. Requires Pro or Max and an awake desktop." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="df-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
        <marker id="df-ah-ok" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--sem-ok)" />
        </marker>
      </defs>

      <text x="20" y="22" fontSize={12.5} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>One thread → your awake desktop → routed to the right agent</text>

      {/* phone */}
      <rect x={26} y={70} width={104} height={150} rx={16} fill="var(--surface)" stroke="var(--accent)" strokeWidth={2} />
      <rect x={40} y={92} width={76} height={86} rx={6} fill="var(--bg)" stroke="var(--line)" strokeWidth={1} />
      <text x={78} y={116} textAnchor="middle" fontSize={10} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-mono)" }}>“pull Q3</text>
      <text x={78} y={130} textAnchor="middle" fontSize={10} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-mono)" }}>numbers…”</text>
      <circle cx={78} cy={200} r={8} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
      <text x={78} y={240} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Phone</text>
      <text x={78} y={256} textAnchor="middle" fontSize={9.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>one thread</text>

      {/* phone → desktop */}
      <line x1={132} y1={130} x2={196} y2={130} stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#df-ah)" />

      {/* desktop + router */}
      <rect x={198} y={70} width={168} height={150} rx={12} fill="var(--bg)" stroke="var(--sem-context)" strokeWidth={2} />
      <text x={282} y={92} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Your desktop</text>
      <text x={282} y={107} textAnchor="middle" fontSize={9.5} fill="var(--sem-context)" style={{ fontFamily: "var(--font-mono)" }}>awake · app open</text>
      <rect x={222} y={124} width={120} height={60} rx={10} fill="var(--surface)" stroke="var(--sem-context)" strokeWidth={1.6} />
      <text x={282} y={150} textAnchor="middle" fontSize={12} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Dispatch</text>
      <text x={282} y={167} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>router</text>

      {/* router → sessions */}
      <line x1={366} y1={132} x2={452} y2={116} stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#df-ah)" />
      <line x1={366} y1={158} x2={452} y2={186} stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#df-ah)" />

      {/* Claude Code session */}
      <rect x={454} y={90} width={240} height={52} rx={10} fill="var(--surface)" stroke="var(--sem-agentic)" strokeWidth={2} />
      <text x={470} y={112} fontSize={12.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Claude Code session</text>
      <text x={470} y={129} fontSize={10} fill="var(--tx2)">dev work · own sidebar</text>

      {/* Cowork session */}
      <rect x={454} y={162} width={240} height={52} rx={10} fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={2} />
      <text x={470} y={184} fontSize={12.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Cowork session</text>
      <text x={470} y={201} fontSize={10} fill="var(--tx2)">knowledge work · own sidebar</text>

      {/* return path: sessions → back to phone */}
      <path d="M574 214 L574 268 L78 268 L78 230" fill="none" stroke="var(--sem-ok)" strokeWidth={1.6} strokeDasharray="5 4" markerEnd="url(#df-ah-ok)" />
      <text x={330} y={283} textAnchor="middle" fontSize={10.5} fill="var(--sem-ok)" style={{ fontFamily: "var(--font-mono)" }}>result returns to the same thread + push notification</text>

      {/* plan note */}
      <text x={694} y={234} textAnchor="end" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>Pro / Max · runs on your machine, not the cloud</text>
    </svg>
  );
}
