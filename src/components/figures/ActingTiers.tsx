import React from "react";

/* M18 · The three tiers of acting on the world. Cowork tries the MOST PRECISE
   tool first and only falls through to the next when nothing better fits:
   1) connector / MCP (fastest, bounded by scopes) → 2) browser (Claude in
   Chrome, for web work) → 3) computer use (clicks the screen directly, NO
   sandbox — the last resort). Width widens downward = broader reach / less
   precision; the dashed line marks where the sandbox ends.
   Pure SVG; theme tokens (tool=teal, context=violet, agentic=amber, warn=red). */
export function ActingTiers(): React.ReactElement {
  const tier = (
    y: number,
    x: number,
    w: number,
    color: string,
    n: string,
    title: string,
    sub: string,
  ): React.ReactElement => (
    <g>
      <rect x={x} y={y} width={w} height={50} rx={10} fill="var(--surface)" stroke={color} strokeWidth={2} />
      <circle cx={x + 22} cy={y + 25} r={11} fill={color} opacity={0.18} />
      <text x={x + 22} y={y + 29} textAnchor="middle" fontSize={13} fontWeight={700} fill={color} style={{ fontFamily: "var(--font-head)" }}>{n}</text>
      <text x={x + 42} y={y + 21} fontSize={13.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{title}</text>
      <text x={x + 42} y={y + 38} fontSize={11} fill="var(--tx2)">{sub}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 286" role="img" aria-label="Three tiers of acting: Cowork tries a connector first (fastest, bounded), then the browser via Claude in Chrome, then computer use that clicks your screen directly with no sandbox as a last resort. Reach widens and precision drops as you go down." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="at-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* left axis: precise/fast → broad/slow */}
      <line x1="30" y1="44" x2="30" y2="250" stroke="var(--tx3)" strokeWidth={1.4} markerEnd="url(#at-ah)" />
      <text x="20" y="60" fontSize="10" fill="var(--tx3)" transform="rotate(-90 20 60)" style={{ fontFamily: "var(--font-mono)" }}>precise · fast · bounded</text>
      <text x="20" y="250" fontSize="10" fill="var(--sem-warn)" transform="rotate(-90 20 250)" style={{ fontFamily: "var(--font-mono)" }}>broad · slow · no sandbox</text>

      <text x="384" y="30" textAnchor="middle" fontSize={12.5} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>Claude tries the most precise tool first ↓</text>

      {/* tier 1 · connector (narrowest = most precise) */}
      {tier(44, 234, 300, "var(--sem-tool)", "1", "Connector / MCP", "Gmail · Drive · Slack — seconds, scope-bounded")}
      {/* tier 2 · browser */}
      {tier(108, 192, 384, "var(--sem-context)", "2", "Browser — Claude in Chrome", "web work when no connector exists")}

      {/* sandbox boundary */}
      <line x1="60" y1="178" x2="700" y2="178" stroke="var(--sem-warn)" strokeWidth={1.3} strokeDasharray="5 4" />
      <text x="700" y="174" textAnchor="end" fontSize="9.5" fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>↑ sandboxed · ↓ no sandbox</text>

      {/* tier 3 · computer use (widest = broadest reach) */}
      {tier(190, 150, 468, "var(--sem-agentic)", "3", "Computer use — your screen", "clicks · types · native apps, simulators, hardware")}

      {/* caps note */}
      <text x="384" y="262" textAnchor="middle" fontSize={10.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>per-app caps push work up: browsers = view-only · terminals/IDEs = click-only</text>
    </svg>
  );
}
