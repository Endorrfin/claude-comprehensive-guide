import React from "react";

/* M11 · MCP architecture: the host (a Claude app) runs one MCP client per
   server; the client speaks JSON-RPC (tools · resources · prompts) over a
   transport (stdio when local, Streamable HTTP when remote); the server is the
   adapter that calls the external app's API with your scoped OAuth token.
   Theme tokens + the semantic palette (coral = Claude, teal = tools/MCP). */
export function McpArchitecture(): React.ReactElement {
  const node = (
    x: number,
    w: number,
    color: string,
    title: string,
    sub: string,
  ): React.ReactElement => (
    <g>
      <rect x={x} y={70} width={w} height={64} rx={10} fill="var(--surface)" stroke={color} strokeWidth={2} />
      <circle cx={x + 16} cy={90} r={4} fill={color} />
      <text x={x + 28} y={94} fontSize={13.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{title}</text>
      <text x={x + 14} y={116} fontSize={10.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>{sub}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 250" role="img" aria-label="MCP architecture: a Claude app (the host) runs one MCP client per server and speaks JSON-RPC over a transport — stdio when local, Streamable HTTP when remote. The MCP server is an adapter that calls the external app's API using your scoped OAuth token. Claude never sees your password." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="mcp-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* nodes */}
      {node(20, 196, "var(--sem-claude)", "Claude app (host)", "+ MCP client (one per server)")}
      {node(282, 156, "var(--sem-tool)", "MCP server", "the adapter / connector")}
      {node(498, 202, "var(--sem-context)", "External app", "Notion · Gmail · Calendar · files")}

      {/* hop 1: client <-> server */}
      <line x1="216" y1="92" x2="280" y2="92" stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#mcp-ah)" />
      <line x1="280" y1="112" x2="218" y2="112" stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#mcp-ah)" />
      <text x="248" y="60" textAnchor="middle" fontSize={10} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-mono)" }}>JSON-RPC</text>
      <text x="248" y="150" textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>tools · resources · prompts</text>

      {/* hop 2: server <-> external API */}
      <line x1="438" y1="92" x2="496" y2="92" stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#mcp-ah)" />
      <line x1="496" y1="112" x2="440" y2="112" stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#mcp-ah)" />
      <text x="467" y="60" textAnchor="middle" fontSize={10} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>vendor API</text>
      <text x="467" y="150" textAnchor="middle" fontSize={9.5} fill="var(--sem-agentic)" style={{ fontFamily: "var(--font-mono)" }}>OAuth token (scoped)</text>

      {/* transport label under hop 1 */}
      <text x="120" y="166" textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>transport</text>
      <text x="120" y="184" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>stdio (local) · HTTP (remote)</text>

      {/* trust boundary + note */}
      <line x1="468" y1="40" x2="468" y2="200" stroke="var(--sem-warn)" strokeWidth={1.3} strokeDasharray="4 4" opacity={0.7} />
      <text x="468" y="32" textAnchor="middle" fontSize={10} fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>your account &amp; data</text>
      <text x="360" y="226" textAnchor="middle" fontSize={10.5} fill="var(--tx3)">One protocol, any tool — Claude never sees your password; the token is scoped to what you grant.</text>
    </svg>
  );
}
