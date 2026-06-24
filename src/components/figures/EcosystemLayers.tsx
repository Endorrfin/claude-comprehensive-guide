import React from "react";

/* M27 · The whole ecosystem as five stacked layers, the way a request flows
   through them: a MODEL, reached through an APP/surface, grounded by CONTEXT,
   extended by CAPABILITIES, and scaled by ORCHESTRATION. Each band is colored
   by the guide's semantic palette and carries example chips. Pure SVG. */
type Band = { name: string; desc: string; color: string; chips: string[] };

const BANDS: Band[] = [
  { name: "Orchestration", desc: "scale it out", color: "var(--sem-ok)", chips: ["Sub-agents", "Agent teams", "Hooks", "Scheduled tasks"] },
  { name: "Capabilities", desc: "extend reach", color: "var(--sem-tool)", chips: ["Connectors / MCP", "Skills", "Artifacts", "Computer use"] },
  { name: "Context", desc: "ground it", color: "var(--sem-context)", chips: ["Context window", "Projects", "Memory"] },
  { name: "Apps / surfaces", desc: "where you meet it", color: "var(--sem-agentic)", chips: ["Chat", "Cowork", "Claude Code", "Chrome", "Excel / PPT"] },
  { name: "Models", desc: "the engine", color: "var(--sem-claude)", chips: ["Opus 4.8", "Sonnet 4.6", "Haiku 4.5"] },
];

export function EcosystemLayers(): React.ReactElement {
  const H = 54;
  const GAP = 8;
  const top = 24;
  const chipFor = (label: string): number => 22 + label.length * 6.3; // rough width

  return (
    <svg viewBox="0 0 720 360" role="img" aria-label="The Claude ecosystem in five layers, bottom to top: Models (Opus 4.8, Sonnet 4.6, Haiku 4.5); Apps and surfaces (Chat, Cowork, Claude Code, Chrome, Excel and PowerPoint); Context (context window, Projects, Memory); Capabilities (Connectors and MCP, Skills, Artifacts, Computer use); and Orchestration (sub-agents, agent teams, hooks, scheduled tasks)." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <text x={360} y={15} textAnchor="middle" fontSize={11} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>a request flows up the stack ↑</text>
      {BANDS.map((b, i) => {
        const y = top + i * (H + GAP);
        let cx = 196;
        return (
          <g key={b.name}>
            <rect x={20} y={y} width={680} height={H} rx={11} fill="var(--surface)" stroke="var(--line)" strokeWidth={1.2} />
            <rect x={20} y={y} width={6} height={H} rx={3} fill={b.color} />
            <circle cx={44} cy={y + H / 2} r={5} fill={b.color} />
            <text x={58} y={y + 24} fontSize={14} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{b.name}</text>
            <text x={58} y={y + 40} fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{b.desc}</text>
            {b.chips.map((c) => {
              const w = chipFor(c);
              const el = (
                <g key={c}>
                  <rect x={cx} y={y + 14} width={w} height={26} rx={7} fill="var(--s2)" stroke={b.color} strokeWidth={1.1} opacity={0.95} />
                  <text x={cx + w / 2} y={y + 31} textAnchor="middle" fontSize={11} fill="var(--tx)">{c}</text>
                </g>
              );
              cx += w + 9;
              return el;
            })}
          </g>
        );
      })}
    </svg>
  );
}
