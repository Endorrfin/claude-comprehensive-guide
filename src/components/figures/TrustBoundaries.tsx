import React from "react";

/* M25 · The trust boundary + the two-condition model of prompt injection.
   An attack only harms you if BOTH gates are open: Claude READS attacker-
   controlled text (left, untrusted) AND can ACT in a damaging way on your
   side (right, trusted). Close EITHER gate and the attack fails:
     • trusted sources / content classifiers close the READ gate
     • least privilege / human-in-the-loop close the ACT gate
   Pure SVG; theme tokens (warn=red untrusted, ok=green trusted, claude=coral). */
export function TrustBoundaries(): React.ReactElement {
  const gate = (cx: number, label: string, sub: string): React.ReactElement => (
    <g>
      <circle cx={cx} cy={138} r={15} fill="var(--bg)" stroke="var(--sem-warn)" strokeWidth={2.2} />
      <text x={cx} y={143} textAnchor="middle" fontSize={15} fill="var(--sem-warn)">⚷</text>
      <text x={cx} y={172} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>{label}</text>
      <text x={cx} y={187} textAnchor="middle" fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>{sub}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 720 250" role="img" aria-label="The trust boundary. Untrusted content (web pages, emails, tool and MCP output) on the left can only harm you if it passes a READ gate into the agent and then an ACT gate to your data, accounts and money on the right. Closing either gate stops a prompt-injection attack." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="tb-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" /></marker>
      </defs>

      {/* UNTRUSTED zone (left) */}
      <rect x={14} y={40} width={186} height={170} rx={12} fill="rgba(248,113,113,0.06)" stroke="var(--sem-warn)" strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={107} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--sem-warn)" style={{ fontFamily: "var(--font-mono)" }}>UNTRUSTED · the outside world</text>
      {[
        ["Web pages", "websites, search results"],
        ["Emails & messages", "anyone can write to you"],
        ["Tool & MCP output", "files, API responses"],
      ].map(([t1, t2], i) => (
        <g key={i}>
          <rect x={28} y={52 + i * 50} width={158} height={42} rx={8} fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.1} />
          <text x={40} y={70 + i * 50} fontSize={12} fontWeight={600} fill="var(--tx)">{t1}</text>
          <text x={40} y={85 + i * 50} fontSize={9.5} fill="var(--tx3)">{t2}</text>
        </g>
      ))}

      {/* READ gate → agent */}
      <line x1={200} y1={138} x2={300} y2={138} stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#tb-ah)" />
      {gate(250, "READ gate", "can Claude see it?")}

      {/* AGENT (center) */}
      <g>
        <rect x={316} y={104} width={120} height={68} rx={13} fill="var(--s2)" stroke="var(--sem-claude)" strokeWidth={2.4} />
        <circle cx={338} cy={132} r={5} fill="var(--sem-claude)" />
        <text x={352} y={130} fontSize={14} fontWeight={700} fill="var(--tx)" style={{ fontFamily: "var(--font-head)" }}>Claude</text>
        <text x={330} y={154} fontSize={9.5} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>reads · plans · acts</text>
      </g>

      {/* ACT gate → trusted */}
      <line x1={436} y1={138} x2={536} y2={138} stroke="var(--tx3)" strokeWidth={1.6} markerEnd="url(#tb-ah)" />
      {gate(486, "ACT gate", "may it do it?")}

      {/* TRUSTED zone (right) */}
      <rect x={536} y={40} width={170} height={170} rx={12} fill="rgba(108,194,74,0.07)" stroke="var(--sem-ok)" strokeWidth={1.4} />
      <text x={621} y={32} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--sem-ok)" style={{ fontFamily: "var(--font-mono)" }}>TRUSTED · what you can lose</text>
      {[
        ["Your files", "read · write · delete"],
        ["Accounts & data", "Gmail, Drive, Slack…"],
        ["Money", "purchases, transfers"],
      ].map(([t1, t2], i) => (
        <g key={i}>
          <rect x={550} y={52 + i * 50} width={142} height={42} rx={8} fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.1} />
          <text x={562} y={70 + i * 50} fontSize={12} fontWeight={600} fill="var(--tx)">{t1}</text>
          <text x={562} y={85 + i * 50} fontSize={9.5} fill="var(--tx3)">{t2}</text>
        </g>
      ))}

      {/* lesson */}
      <text x={360} y={234} textAnchor="middle" fontSize={11} fill="var(--tx2)">An attack needs <tspan fill="var(--sem-warn)" fontWeight={700}>both</tspan> gates open. Trusted sources close READ · least privilege closes ACT — shut <tspan fontWeight={700} fill="var(--tx)">either</tspan> and it fails.</text>
    </svg>
  );
}
