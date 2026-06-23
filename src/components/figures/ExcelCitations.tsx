import React from "react";

/* M21 · How the Office agents earn trust. Claude for Excel answers with
   CELL-LEVEL CITATIONS: every claim links to the exact cell, and edits are
   highlighted with an explanation (change tracking). Below, the cross-app
   feature "Work across Microsoft 365 apps" carries context from the open
   workbook into an open PowerPoint deck — open files only.
   Pure SVG; theme tokens (tool=teal citation, ok=green edit, accent=highlight). */
export function ExcelCitations(): React.ReactElement {
  // grid geometry
  const cols = ["", "A", "B", "C", "D"];
  const colX = [22, 54, 122, 190, 258]; // x of each column (col 0 = row labels)
  const colW = [32, 68, 68, 68, 68];
  const rowsLabels = ["", "10", "11", "12", "13"];
  const rowY = [56, 78, 100, 122, 144]; // y of each row top
  const rh = 22;

  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Claude for Excel answers with cell-level citations: the answer card links to cell B12, which is highlighted in the workbook, and an edited cell is marked with an explanation. Below, the Work across Microsoft 365 apps feature carries context from the open workbook into an open PowerPoint deck — open files only." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="ec-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--sem-tool)" />
        </marker>
        <marker id="ec-ah2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* ---- workbook panel ---- */}
      <text x={18} y={34} fontSize={12} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>Excel — multi-tab workbook</text>
      <rect x={14} y={42} width={324} height={158} rx={9} fill="var(--bg)" stroke="var(--line)" strokeWidth={1.5} />

      {/* grid cells */}
      {rowsLabels.map((rl, ri) =>
        cols.map((c, ci) => {
          const isHeader = ri === 0 || ci === 0;
          const cited = ci === 2 && ri === 3; // B12
          const edited = ci === 3 && ri === 2; // C11
          const fill = cited ? "var(--accent-dim)" : edited ? "rgba(108,194,74,0.16)" : isHeader ? "var(--s2)" : "var(--surface)";
          const stroke = cited ? "var(--accent)" : edited ? "var(--sem-ok)" : "var(--line)";
          return (
            <g key={`${ri}-${ci}`}>
              <rect x={colX[ci]} y={rowY[ri]} width={colW[ci]} height={rh} fill={fill} stroke={stroke} strokeWidth={cited || edited ? 2 : 0.8} />
              {isHeader ? (
                <text x={colX[ci] + colW[ci] / 2} y={rowY[ri] + 15} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>
                  {ci === 0 ? rl : c}
                </text>
              ) : (
                <text x={colX[ci] + colW[ci] / 2} y={rowY[ri] + 15} textAnchor="middle" fontSize={10.5} fill={cited ? "var(--accent-bright)" : "var(--tx2)"} style={{ fontFamily: "var(--font-mono)" }}>
                  {cited ? "4.2M" : edited ? "12%" : "·"}
                </text>
              )}
            </g>
          );
        }),
      )}
      {/* edit comment marker on C11 */}
      <circle cx={colX[3] + colW[3] - 5} cy={rowY[2] + 4} r={3.5} fill="var(--sem-ok)" />

      {/* tabs */}
      <rect x={22} y={172} width={56} height={18} rx={4} fill="var(--accent-dim)" stroke="var(--accent-deep)" strokeWidth={1} />
      <text x={50} y={185} textAnchor="middle" fontSize={9.5} fill="var(--accent-bright)" style={{ fontFamily: "var(--font-mono)" }}>Model</text>
      <rect x={84} y={172} width={84} height={18} rx={4} fill="var(--s2)" stroke="var(--line)" strokeWidth={1} />
      <text x={126} y={185} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>Assumptions</text>
      <rect x={174} y={172} width={54} height={18} rx={4} fill="var(--s2)" stroke="var(--line)" strokeWidth={1} />
      <text x={201} y={185} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>Output</text>

      {/* ---- answer card ---- */}
      <rect x={360} y={42} width={346} height={104} rx={10} fill="var(--surface)" stroke="var(--line)" strokeWidth={1.5} />
      <text x={376} y={64} fontSize={11} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>Q: why is Q3 revenue 4.2M?</text>
      <text x={376} y={86} fontSize={13} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>A: Price × Units drives it.</text>
      {/* citation chip */}
      <rect x={376} y={100} width={120} height={24} rx={12} fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={1.6} />
      <circle cx={392} cy={112} r={4} fill="var(--sem-tool)" />
      <text x={402} y={116} fontSize={11} fontWeight={700} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-mono)" }}>Model!B12</text>
      <text x={508} y={116} fontSize={10} fill="var(--tx3)">clickable citation</text>

      {/* citation arrow: chip → cited cell B12 */}
      <path d={`M376 112 C 320 112, 240 96, ${colX[2] + colW[2] + 2} ${rowY[3] + rh / 2}`} fill="none" stroke="var(--sem-tool)" strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#ec-ah)" />

      {/* edit legend */}
      <circle cx={376} cy={138} r={4} fill="var(--sem-ok)" />
      <text x={386} y={142} fontSize={10.5} fill="var(--tx2)">every edit highlighted + explained (change tracking)</text>

      {/* ---- cross-app strip ---- */}
      <line x1={16} y1={216} x2={704} y2={216} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 3" />
      <text x={18} y={236} fontSize={11.5} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>Work across Microsoft 365 apps</text>

      {/* mini workbook icon */}
      <rect x={150} y={244} width={70} height={46} rx={7} fill="var(--bg)" stroke="var(--sem-ok)" strokeWidth={1.6} />
      <text x={185} y={271} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>Excel</text>

      {/* arrow → slide */}
      <line x1={224} y1={267} x2={356} y2={267} stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#ec-ah2)" />
      <text x={290} y={259} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>context carried</text>

      {/* PowerPoint slide */}
      <rect x={360} y={240} width={150} height={54} rx={7} fill="var(--surface)" stroke="var(--sem-agentic)" strokeWidth={1.6} />
      <text x={372} y={257} fontSize={10.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>PowerPoint</text>
      <rect x={372} y={263} width={86} height={5} rx={2} fill="var(--line2)" />
      <rect x={372} y={272} width={70} height={5} rx={2} fill="var(--line2)" />
      <rect x={466} y={263} width={32} height={22} rx={3} fill="var(--sem-agentic)" opacity={0.25} />

      <text x={528} y={264} fontSize={10} fill="var(--tx2)">Reads the open workbook,</text>
      <text x={528} y={278} fontSize={10} fill="var(--tx2)">builds the open deck —</text>
      <text x={528} y={292} fontSize={10} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>open files only</text>
    </svg>
  );
}
