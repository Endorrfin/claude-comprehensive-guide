import React from "react";

/* M16 · File flow in Cowork. Three "places": chat uploads (temporary), the
   isolated sandbox/scratchpad (temporary), and your granted folder (persists).
   Cowork READS your folder + uploads, builds in the sandbox VM, and WRITES
   deliverables (docx/xlsx/pptx/pdf) back to your folder — pausing at a
   delete/overwrite permission gate — while surfacing file cards in chat.
   Pure SVG; theme tokens; semantic colors (context=your data, tool=I/O,
   ok=sandbox, claude=agent, warn=the gate). */
export function FileFlow(): React.ReactElement {
  const chip = (x: number, label: string): React.ReactElement => (
    <g>
      <rect x={x} y={222} width={40} height={20} rx={5} fill="var(--code-bg)" stroke="var(--sem-context)" strokeWidth={1} />
      <text x={x + 20} y={236} textAnchor="middle" fontSize={10.5} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>{label}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 290" role="img" aria-label="Cowork file flow: it reads your granted folder and chat uploads, builds in an isolated sandbox scratchpad, and writes docx, xlsx, pptx and pdf deliverables back to your folder — pausing at a delete or overwrite permission gate — and shows file cards in chat. Only your folder persists." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="ff-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* arrows (behind nodes) */}
      <g fill="none" strokeWidth={1.6}>
        <line x1="212" y1="58" x2="282" y2="116" stroke="var(--tx3)" markerEnd="url(#ff-ah)" />
        <line x1="212" y1="150" x2="282" y2="150" stroke="var(--sem-ok)" markerEnd="url(#ff-ah)" />
        <line x1="282" y1="182" x2="212" y2="206" stroke="var(--sem-context)" markerEnd="url(#ff-ah)" />
        <line x1="361" y1="196" x2="361" y2="210" stroke="var(--tx3)" />
        <line x1="438" y1="124" x2="510" y2="124" stroke="var(--tx3)" markerEnd="url(#ff-ah)" />
      </g>
      <text x="247" y="140" textAnchor="middle" fontSize="9.5" fill="var(--sem-ok)" style={{ fontFamily: "var(--font-mono)" }}>read</text>
      <text x="243" y="205" textAnchor="middle" fontSize="9.5" fill="var(--sem-context)" style={{ fontFamily: "var(--font-mono)" }}>write</text>
      <text x="474" y="117" textAnchor="middle" fontSize="9.5" fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>present</text>

      {/* left · uploads (temporary) */}
      <rect x="24" y="34" width="188" height="48" rx="10" fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={1.4} />
      <text x="38" y="56" fontSize={12.5} fontWeight={600} fill="var(--tx)">Uploads</text>
      <text x="38" y="72" fontSize={10.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>chat attachments · temp</text>

      {/* left · your folder (persists) */}
      <rect x="24" y="100" width="188" height="158" rx="12" fill="var(--accent-dim)" stroke="var(--sem-context)" strokeWidth={2} />
      <text x="38" y="124" fontSize={13.5} fontWeight={700} fill="var(--sem-context)" style={{ fontFamily: "var(--font-head)" }}>Your folder</text>
      <text x="38" y="140" fontSize={10.5} fill="var(--tx2)">granted · read + write</text>
      <text x="38" y="170" fontSize={11} fill="var(--tx2)">source files in →</text>
      <text x="38" y="210" fontSize={11} fill="var(--tx2)">deliverables land here:</text>
      {chip(38, "docx")}
      {chip(82, "xlsx")}
      {chip(126, "pptx")}
      {chip(170, "pdf")}

      {/* center · the agent */}
      <rect x="282" y="100" width="156" height="84" rx="13" fill="var(--surface)" stroke="var(--accent)" strokeWidth={2.2} />
      <text x="360" y="130" textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-head)" }}>Cowork agent</text>
      <text x="360" y="150" textAnchor="middle" fontSize={11} fill="var(--tx2)">plans · runs code</text>
      <text x="360" y="168" textAnchor="middle" fontSize={11} fill="var(--tx2)">reads & writes files</text>

      {/* center · sandbox (temporary) */}
      <rect x="282" y="210" width="156" height="46" rx="10" fill="var(--surface)" stroke="var(--sem-ok)" strokeWidth={1.5} />
      <text x="360" y="231" textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--sem-ok)">Sandbox VM</text>
      <text x="360" y="247" textAnchor="middle" fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>scratchpad · temp</text>

      {/* the permission gate on the write path */}
      <g>
        <rect x="214" y="168" width="60" height="22" rx="6" fill="var(--surface)" stroke="var(--sem-warn)" strokeWidth={1.6} />
        <text x="244" y="183" textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>🔒 asks</text>
      </g>

      {/* right · chat cards */}
      <rect x="510" y="100" width="186" height="48" rx="10" fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.4} />
      <text x="524" y="122" fontSize={12.5} fontWeight={600} fill="var(--tx)">Chat</text>
      <text x="524" y="138" fontSize={10.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>file cards · present_files</text>

      {/* legend: what persists */}
      <text x="510" y="180" fontSize={11} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }} fontWeight={700}>Lifetime</text>
      <circle cx="516" cy="200" r="4" fill="var(--sem-context)" />
      <text x="526" y="204" fontSize={10.5} fill="var(--tx2)">your folder — persists</text>
      <circle cx="516" cy="220" r="4" fill="var(--sem-ok)" />
      <text x="526" y="224" fontSize={10.5} fill="var(--tx2)">sandbox — temporary</text>
      <circle cx="516" cy="240" r="4" fill="var(--sem-tool)" />
      <text x="526" y="244" fontSize={10.5} fill="var(--tx2)">uploads — temporary</text>
    </svg>
  );
}
