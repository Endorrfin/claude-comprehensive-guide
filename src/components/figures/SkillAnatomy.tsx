import React from "react";

/* M12 · Anatomy of a Skill. A Skill is a directory whose entry point is a
   SKILL.md: YAML frontmatter (name + description = the always-loaded metadata,
   L1) followed by the body (instructions, loaded only when triggered, L2). The
   folder can bundle extra files — reference docs read on demand and scripts run
   via bash whose code never enters context (L3). Semantic palette: coral = the
   Skill / SKILL.md, violet = metadata, teal = bundled resources, amber = code. */
export function SkillAnatomy(): React.ReactElement {
  return (
    <svg viewBox="0 0 720 312" role="img" aria-label="A Skill is a directory containing a SKILL.md file. SKILL.md begins with YAML frontmatter (name and description) — the level-1 metadata always loaded into the system prompt at ~100 tokens — followed by the body of instructions loaded only when the Skill is triggered. The folder also bundles level-3 files: reference docs Claude reads on demand and scripts Claude runs via bash whose code never enters the context window." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      {/* ---- left: the folder tree ---- */}
      <text x={20} y={26} fontSize={12} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>a Skill = a directory</text>

      {/* folder header */}
      <rect x={20} y={36} width={300} height={30} rx={7} fill="var(--s2)" stroke="var(--sem-claude)" strokeWidth={1.6} />
      <path d="M34 45 h10 l3 4 h12 v11 a2 2 0 0 1 -2 2 h-23 a2 2 0 0 1 -2 -2 z" fill="var(--sem-claude)" opacity={0.85} />
      <text x={70} y={56} fontSize={13.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-mono)" }}>pdf/</text>

      {/* tree rows */}
      {[
        { y: 78, name: "SKILL.md", color: "var(--sem-claude)", tag: "entry point", on: true },
        { y: 116, name: "FORMS.md", color: "var(--sem-tool)", tag: "L3 · read on demand", on: false },
        { y: 154, name: "REFERENCE.md", color: "var(--sem-tool)", tag: "L3 · read on demand", on: false },
        { y: 192, name: "scripts/fill_form.py", color: "var(--sem-agentic)", tag: "L3 · run via bash", on: false },
      ].map((r) => (
        <g key={r.name}>
          {/* tree elbow */}
          <path d={`M40 ${r.y - 8} v14 h12`} fill="none" stroke="var(--line2)" strokeWidth={1.3} />
          <rect x={56} y={r.y - 4} width={264} height={28} rx={6} fill={r.on ? "var(--s2)" : "var(--surface)"} stroke={r.color} strokeWidth={r.on ? 1.8 : 1.2} opacity={r.on ? 1 : 0.92} />
          <circle cx={70} cy={r.y + 10} r={3.5} fill={r.color} />
          <text x={82} y={r.y + 14} fontSize={12} fontWeight={r.on ? 700 : 500} fill={r.on ? "var(--tx)" : "var(--tx2)"} style={{ fontFamily: "var(--font-mono)" }}>{r.name}</text>
          <text x={314} y={r.y + 13} textAnchor="end" fontSize={8.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{r.tag}</text>
        </g>
      ))}

      {/* ---- connector from SKILL.md to the exploded card ---- */}
      <path d="M320 92 C 344 92, 344 96, 366 96" fill="none" stroke="var(--sem-claude)" strokeWidth={1.4} strokeDasharray="4 3" />

      {/* ---- right: the exploded SKILL.md ---- */}
      <rect x={366} y={36} width={334} height={236} rx={10} fill="var(--surface)" stroke="var(--sem-claude)" strokeWidth={1.6} />
      <text x={382} y={58} fontSize={13} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-mono)" }}>SKILL.md</text>

      {/* frontmatter = L1 metadata */}
      <rect x={382} y={70} width={302} height={86} rx={8} fill="var(--code-bg)" stroke="var(--sem-context)" strokeWidth={1.4} />
      <text x={394} y={88} fontSize={10.5} fill="var(--sem-context)" style={{ fontFamily: "var(--font-mono)" }}>---</text>
      <text x={394} y={104} fontSize={10.5} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>name: pdf</text>
      <text x={394} y={120} fontSize={10.5} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>description: extract text, fill</text>
      <text x={394} y={134} fontSize={10.5} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>forms… Use when the user</text>
      <text x={394} y={148} fontSize={10.5} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>mentions PDFs.   ---</text>
      <text x={684} y={66} textAnchor="end" fontSize={9} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-mono)" }}>L1 · always loaded · ~100 tok</text>

      {/* body = L2 instructions */}
      <rect x={382} y={168} width={302} height={90} rx={8} fill="var(--code-bg)" stroke="var(--sem-claude)" strokeWidth={1.4} />
      <text x={394} y={188} fontSize={10.5} fontWeight={700} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}># PDF Processing</text>
      <text x={394} y={206} fontSize={10.5} fill="var(--code-tx)" style={{ fontFamily: "var(--font-mono)" }}>## Quick start</text>
      <text x={394} y={222} fontSize={10.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>Use pdfplumber to extract…</text>
      <text x={394} y={240} fontSize={10.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>For forms, see FORMS.md →</text>
      <text x={684} y={168} textAnchor="end" fontSize={9} fontWeight={700} fill="var(--sem-claude)" style={{ fontFamily: "var(--font-mono)" }}>L2 · on trigger · &lt;5k tok</text>

      {/* caption */}
      <text x={20} y={246} fontSize={10.5} fill="var(--tx3)">Frontmatter is the only part Claude always sees. The body loads when your task</text>
      <text x={20} y={262} fontSize={10.5} fill="var(--tx3)">matches the description; bundled files (L3) load only when that file is needed.</text>
      <text x={20} y={290} fontSize={10} fill="var(--sem-agentic)" style={{ fontFamily: "var(--font-mono)" }}>scripts run via bash → only their output enters context, never the code</text>
    </svg>
  );
}
