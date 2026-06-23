import React from "react";

/* M14 · A plugin is a bundle. One installable folder, defined by a
   .claude-plugin/plugin.json manifest, that packages several kinds of extension
   at once — skills, sub-agents, slash commands, hooks and MCP connectors. You
   install it from a marketplace (a git repo) and it activates in Cowork or
   Claude Code as a single unit. Semantic palette: coral = skills, violet =
   sub-agents, green = commands, amber = hooks, teal = MCP connectors. */
const COMPONENTS = [
  { dir: "skills/", what: "domain know-how Claude uses automatically", color: "var(--sem-claude)" },
  { dir: "agents/", what: "sub-agents for delegated, isolated work", color: "var(--sem-context)" },
  { dir: "commands/", what: "slash commands you invoke explicitly", color: "var(--sem-ok)" },
  { dir: "hooks/", what: "scripts that run on tool & lifecycle events", color: "var(--sem-agentic)" },
  { dir: ".mcp.json", what: "MCP connectors wiring Claude to your tools", color: "var(--sem-tool)" },
];

export function PluginBundle(): React.ReactElement {
  const px = 20;
  const pw = 420;
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="A plugin is one installable bundle defined by a .claude-plugin/plugin.json manifest. It packages up to five kinds of extension at once: a skills directory of domain know-how Claude uses automatically; an agents directory of sub-agents for delegated work; a commands directory of slash commands you invoke explicitly; a hooks directory of scripts that run on tool and lifecycle events; and an .mcp.json of MCP connectors wiring Claude to your tools. On the right, a marketplace — a git repo with a marketplace.json catalog — is added, then plugin install places the bundle into Cowork or Claude Code, where it activates as one unit." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <text x={px} y={28} fontSize={12} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>one plugin = one install, many extensions</text>

      {/* the plugin container */}
      <rect x={px} y={40} width={pw} height={244} rx={12} fill="var(--s2)" stroke="var(--sem-claude)" strokeWidth={1.8} />

      {/* manifest bar */}
      <rect x={px + 16} y={56} width={pw - 32} height={30} rx={7} fill="var(--code-bg)" stroke="var(--line2)" strokeWidth={1.2} />
      <text x={px + 28} y={75} fontSize={11.5} fontWeight={700} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>.claude-plugin/plugin.json</text>
      <text x={px + pw - 28} y={75} textAnchor="end" fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>name · version</text>

      {/* component chips */}
      {COMPONENTS.map((c, i) => {
        const y = 98 + i * 36;
        return (
          <g key={c.dir}>
            <rect x={px + 16} y={y} width={pw - 32} height={30} rx={7} fill="var(--surface)" stroke={c.color} strokeWidth={1.4} />
            <circle cx={px + 32} cy={y + 15} r={4} fill={c.color} />
            <text x={px + 46} y={y + 19} fontSize={11.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-mono)" }}>{c.dir}</text>
            <text x={px + 150} y={y + 19} fontSize={10} fill="var(--tx2)">{c.what}</text>
          </g>
        );
      })}

      {/* right column: marketplace → install → host */}
      {/* marketplace */}
      <rect x={476} y={56} width={224} height={56} rx={9} fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={1.5} />
      <text x={488} y={78} fontSize={12.5} fontWeight={700} fill="var(--tx)">Marketplace</text>
      <text x={488} y={97} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>git repo · marketplace.json</text>

      <line x1={588} y1={112} x2={588} y2={140} stroke="var(--line2)" strokeWidth={1.6} />
      <path d="M583 134 L588 144 L593 134 Z" fill="var(--line2)" />

      {/* install command */}
      <rect x={476} y={146} width={224} height={44} rx={9} fill="var(--code-bg)" stroke="var(--line2)" strokeWidth={1.2} />
      <text x={588} y={166} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>/plugin install</text>
      <text x={588} y={181} textAnchor="middle" fontSize={9} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>review the “Will install” list</text>

      <line x1={588} y1={190} x2={588} y2={218} stroke="var(--line2)" strokeWidth={1.6} />
      <path d="M583 212 L588 222 L593 212 Z" fill="var(--line2)" />

      {/* host */}
      <rect x={476} y={224} width={224} height={56} rx={9} fill="var(--surface)" stroke="var(--sem-ok)" strokeWidth={1.6} />
      <text x={488} y={246} fontSize={12.5} fontWeight={700} fill="var(--tx)">Cowork / Claude Code</text>
      <text x={488} y={265} fontSize={9.5} fill="var(--tx3)">activates as one unit</text>

      {/* tie the bundle to the install flow */}
      <path d="M440 120 C 458 120, 458 168, 474 168" fill="none" stroke="var(--sem-claude)" strokeWidth={1.4} strokeDasharray="4 3" />
    </svg>
  );
}
