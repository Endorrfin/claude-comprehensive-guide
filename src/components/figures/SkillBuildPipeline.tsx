import React from "react";

/* M13 · The skill-authoring loop. Draft a SKILL.md, push detail into bundled
   files, write the description that triggers it, test it in a fresh session
   (with vs without), and share it — iterating from real results until it both
   fires correctly and produces the right output. Semantic palette: coral = the
   skill/SKILL.md, teal = bundled resources, violet = the trigger/description,
   amber = testing, green = shipping. */
const STAGES = [
  { n: "1", x: 20, title: "Draft", sub: "SKILL.md", tag: "name · description · body", color: "var(--sem-claude)" },
  { n: "2", x: 157, title: "Bundle", sub: "scripts·refs·assets", tag: "loaded on demand", color: "var(--sem-tool)" },
  { n: "3", x: 294, title: "Describe", sub: "what + when", tag: "the trigger — be a bit pushy", color: "var(--sem-context)" },
  { n: "4", x: 431, title: "Test", sub: "fresh session", tag: "with vs without", color: "var(--sem-agentic)" },
  { n: "5", x: 568, title: "Share", sub: ".skill · plugin", tag: "scope to your audience", color: "var(--sem-ok)" },
];

export function SkillBuildPipeline(): React.ReactElement {
  const W = 120;
  const cardY = 70;
  const cardH = 96;
  const midY = cardY + cardH / 2;
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="The skill authoring loop as five stages: 1 Draft a SKILL.md with name, description and body; 2 Bundle supporting files (scripts, references, assets) loaded on demand; 3 Describe the trigger — what the skill does and when to use it, written a little pushy; 4 Test it in a fresh session, comparing with the skill versus without it; 5 Share it as a .skill file or inside a plugin, scoped to your audience. A feedback arc runs from Test back to Draft labelled iterate, because you re-draft from real results until the skill both triggers correctly and produces the right output." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <text x={20} y={30} fontSize={12} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>authoring a skill = a tight loop, not a one-shot</text>

      {/* connecting arrows between cards 1→2→3→4, then 4→5 as the "ship" step */}
      {STAGES.slice(0, 4).map((s, i) => {
        const x0 = s.x + W;
        const x1 = STAGES[i + 1].x;
        const ship = i === 3;
        return (
          <g key={`arr-${s.n}`}>
            <line x1={x0 + 1} y1={midY} x2={x1 - 6} y2={midY} stroke={ship ? "var(--sem-ok)" : "var(--line2)"} strokeWidth={ship ? 2 : 1.6} />
            <path d={`M${x1 - 6} ${midY - 5} L${x1 - 1} ${midY} L${x1 - 6} ${midY + 5} Z`} fill={ship ? "var(--sem-ok)" : "var(--line2)"} />
          </g>
        );
      })}
      <text x={(431 + 120 + 568) / 2} y={midY - 12} textAnchor="middle" fontSize={9} fill="var(--sem-ok)" style={{ fontFamily: "var(--font-mono)" }}>when it's good</text>

      {/* stage cards */}
      {STAGES.map((s) => (
        <g key={s.n}>
          <rect x={s.x} y={cardY} width={W} height={cardH} rx={10} fill="var(--surface)" stroke={s.color} strokeWidth={1.7} />
          <circle cx={s.x + 20} cy={cardY + 22} r={11} fill={s.color} opacity={0.18} />
          <text x={s.x + 20} y={cardY + 26} textAnchor="middle" fontSize={12} fontWeight={700} fill={s.color} style={{ fontFamily: "var(--font-mono)" }}>{s.n}</text>
          <text x={s.x + 38} y={cardY + 27} fontSize={14} fontWeight={700} fill="var(--tx)">{s.title}</text>
          <text x={s.x + 14} y={cardY + 52} fontSize={11} fill={s.color} style={{ fontFamily: "var(--font-mono)" }}>{s.sub}</text>
          <text x={s.x + 14} y={cardY + 74} fontSize={9.5} fill="var(--tx3)">{s.tag}</text>
        </g>
      ))}

      {/* feedback arc: Test (card 4) → Draft (card 1), the iterate loop */}
      <path d={`M${431 + W / 2} ${cardY + cardH} C ${431} ${cardY + cardH + 64}, ${20 + W / 2} ${cardY + cardH + 64}, ${20 + W / 2} ${cardY + cardH + 6}`} fill="none" stroke="var(--sem-agentic)" strokeWidth={1.8} strokeDasharray="5 4" />
      <path d={`M${20 + W / 2 - 5} ${cardY + cardH + 12} L${20 + W / 2} ${cardY + cardH + 2} L${20 + W / 2 + 5} ${cardY + cardH + 12} Z`} fill="var(--sem-agentic)" />
      <text x={(431 + 20 + W) / 2} y={cardY + cardH + 60} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--sem-agentic)">iterate</text>
      <text x={(431 + 20 + W) / 2} y={cardY + cardH + 76} textAnchor="middle" fontSize={9.5} fill="var(--tx3)">re-draft from real results — until it triggers right AND the output is right</text>
    </svg>
  );
}
