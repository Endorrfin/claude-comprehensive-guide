import React from "react";

/* M4 · Inputs in, style out. You bring material in (files, images, voice, text);
   Claude processes it; a chosen style shapes the voice; the result comes out as
   Markdown or, when substantial, an Artifact. Pure SVG; theme tokens;
   inputs=teal, claude=coral, style=violet. */
export function StylePipeline(): React.ReactElement {
  const inp = (y: number, label: string): React.ReactElement => (
    <g>
      <rect x="24" y={y} width="150" height="30" rx="8" fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={1.5} />
      <text x="99" y={y + 20} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="var(--tx)">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 720 290" role="img" aria-label="Inputs in, style out: files, images, voice and text go into Claude; a chosen writing style shapes the voice; and the response comes out as Markdown or, when it is substantial and self-contained, as an Artifact." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="sp-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* left · inputs */}
      <text x="24" y="44" fontSize={12} fontWeight={700} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-head)" }}>Inputs in</text>
      {inp(54, "Files")}
      {inp(94, "Images")}
      {inp(134, "Voice")}
      {inp(174, "Text")}

      {/* center · Claude */}
      <rect x="288" y="96" width="130" height="76" rx="13" fill="var(--surface)" stroke="var(--accent)" strokeWidth={2.2} />
      <text x="353" y="128" textAnchor="middle" fontSize={15} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Claude</text>
      <text x="353" y="148" textAnchor="middle" fontSize={10.5} fill="var(--tx2)">processes</text>

      {/* style modifier above the output arrow */}
      <rect x="424" y="58" width="172" height="34" rx="9" fill="var(--accent-dim)" stroke="var(--sem-context)" strokeWidth={1.6} />
      <text x="510" y="79" textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--sem-context)">Style: Concise · custom…</text>
      <line x1="510" y1="92" x2="510" y2="120" stroke="var(--sem-context)" strokeWidth={1.4} strokeDasharray="4 3" markerEnd="url(#sp-ah)" />
      <text x="566" y="110" fontSize={9} fill="var(--tx3)">→ Skills (M12)</text>

      {/* right · output */}
      <rect x="470" y="120" width="226" height="86" rx="12" fill="var(--s2)" stroke="var(--accent-deep)" strokeWidth={1.8} />
      <text x="583" y="146" textAnchor="middle" fontSize={13.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Response</text>
      <rect x="486" y="158" width="92" height="34" rx="8" fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.2} />
      <text x="532" y="179" textAnchor="middle" fontSize={11} fill="var(--tx2)">Markdown</text>
      <rect x="588" y="158" width="92" height="34" rx="8" fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.2} />
      <text x="634" y="179" textAnchor="middle" fontSize={11} fill="var(--tx2)">Artifact</text>

      {/* arrows */}
      <g fill="none" strokeWidth={1.8}>
        <line x1="174" y1="134" x2="284" y2="134" stroke="var(--tx3)" markerEnd="url(#sp-ah)" />
        <line x1="418" y1="140" x2="466" y2="150" stroke="var(--tx3)" markerEnd="url(#sp-ah)" />
      </g>
      <text x="228" y="126" textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>attach</text>
    </svg>
  );
}
