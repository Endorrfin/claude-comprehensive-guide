import React from "react";

/* M9 · Live Artifacts — the data flow that makes an artifact "live": it runs on
   Anthropic's infrastructure and gains three powers — persistent storage, a
   Claude API inside, and MCP/connectors to the outside world. A static artifact
   is one-shot (dashed, no loop back); a live one keeps state and calls out.
   Pure SVG; colors from theme tokens. */
export function LiveArtifactFlow(): React.ReactElement {
  const cap = (
    y: number,
    color: string,
    title: string,
    sub: string,
  ): React.ReactElement => (
    <g>
      <rect x="516" y={y - 26} width="190" height="52" rx="10" fill="var(--surface)" stroke={color} strokeWidth={1.6} />
      <text x="530" y={y - 5} fontSize={12.5} fontWeight={700} fill="var(--tx)">{title}</text>
      <text x="530" y={y + 13} fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{sub}</text>
      {/* two-way link to the artifact */}
      <line x1="430" y1={y} x2="512" y2={y} stroke={color} strokeWidth={1.6} markerStart="url(#la-back)" markerEnd="url(#la-fwd)" />
    </g>
  );

  return (
    <svg viewBox="0 0 720 332" role="img" aria-label="You interact with a Live Artifact that runs on Anthropic's infrastructure; it keeps state in persistent storage, calls the Claude API inside itself, and reaches external tools through MCP connectors." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="la-fwd" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx2)" />
        </marker>
        <marker id="la-back" markerWidth="9" markerHeight="9" refX="1" refY="3" orient="auto">
          <path d="M7,0 L0,3 L7,6 Z" fill="var(--tx2)" />
        </marker>
      </defs>

      {/* you */}
      <rect x="24" y="128" width="96" height="56" rx="12" fill="var(--s2)" stroke="var(--line2)" strokeWidth={1.5} />
      <text x="72" y="152" textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--tx)">You</text>
      <text x="72" y="170" textAnchor="middle" fontSize={10} fill="var(--tx3)">+ everyone you share with</text>

      {/* you <-> artifact */}
      <line x1="120" y1="156" x2="214" y2="156" stroke="var(--accent)" strokeWidth={2} markerStart="url(#la-back)" markerEnd="url(#la-fwd)" />

      {/* the live artifact */}
      <rect x="216" y="96" width="214" height="120" rx="14" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={2} />
      <text x="323" y="132" textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Live Artifact</text>
      <text x="323" y="154" textAnchor="middle" fontSize={11} fill="var(--tx2)">a published mini-app</text>
      <text x="323" y="186" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>runs on Anthropic's infra</text>
      <text x="323" y="201" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>each user → own instance</text>

      {/* three capabilities */}
      {cap(110, "var(--sem-ok)", "Persistent storage", "20MB · text · published")}
      {cap(168, "var(--sem-claude)", "Claude API inside", "no API keys · their plan")}
      {cap(226, "var(--sem-tool)", "MCP / connectors", "Asana · Calendar · Slack")}

      {/* static vs live caption */}
      <rect x="24" y="250" width="682" height="54" rx="10" fill="var(--surface)" stroke="var(--line)" />
      <circle cx="44" cy="270" r="4" fill="var(--tx3)" />
      <text x="56" y="274" fontSize={11.5} fill="var(--tx2)"><tspan fontWeight={700} fill="var(--tx)">Static artifact:</tspan> one-shot output — no memory, no calls out. Reopen it and it starts blank.</text>
      <circle cx="44" cy="290" r="4" fill="var(--sem-ok)" />
      <text x="56" y="294" fontSize={11.5} fill="var(--tx2)"><tspan fontWeight={700} fill="var(--tx)">Live artifact:</tspan> remembers state, calls the model, and talks to your tools — a tool you return to.</text>
    </svg>
  );
}
