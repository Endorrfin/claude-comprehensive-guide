import React from "react";

/* M2 · Annotated Claude UI. A sidebar (new chat · recents · projects · search)
   and the chat area, whose composer is the cockpit: the "+" / "/" menu for
   files/Research/styles, the model menu (model · effort · thinking), voice, and
   send. Pure SVG; theme tokens. */
export function InterfaceMap(): React.ReactElement {
  return (
    <svg viewBox="0 0 720 360" role="img" aria-label="The Claude interface: a left sidebar with New chat, Recents, Projects and Search, and the chat area. The composer at the bottom holds the plus or slash menu for files, Research and styles; a model menu for model, effort and thinking; a voice button; and send." style={{ width: "100%", height: "auto", fontFamily: "var(--font-body)" }}>
      <defs>
        <marker id="im-ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="var(--tx3)" />
        </marker>
      </defs>

      {/* app window */}
      <rect x="20" y="20" width="500" height="320" rx="14" fill="var(--surface)" stroke="var(--line)" strokeWidth={1.6} />

      {/* sidebar */}
      <rect x="20" y="20" width="150" height="320" rx="14" fill="var(--s2)" stroke="var(--line)" strokeWidth={1} />
      <rect x="36" y="40" width="118" height="28" rx="7" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={1.4} />
      <text x="95" y="59" textAnchor="middle" fontSize={11.5} fontWeight={600} fill="var(--accent-bright)">+ New chat</text>
      <text x="36" y="98" fontSize={11} fill="var(--tx2)">🔍 Search</text>
      <text x="36" y="126" fontSize={11} fill="var(--tx2)">Projects</text>
      <text x="36" y="150" fontSize={10.5} fontWeight={600} fill="var(--tx3)" style={{ fontFamily: "var(--font-mono)" }}>RECENTS</text>
      <text x="36" y="172" fontSize={10.5} fill="var(--tx3)">· stormwater report</text>
      <text x="36" y="192" fontSize={10.5} fill="var(--tx3)">· refactor plan</text>
      <text x="36" y="212" fontSize={10.5} fill="var(--tx3)">· trip ideas</text>

      {/* chat bubbles */}
      <rect x="300" y="48" width="200" height="30" rx="9" fill="var(--s2)" stroke="var(--line)" strokeWidth={1} />
      <text x="314" y="67" fontSize={10.5} fill="var(--tx2)">you: summarize this PDF…</text>
      <rect x="190" y="92" width="250" height="44" rx="9" fill="var(--code-bg)" stroke="var(--line)" strokeWidth={1} />
      <text x="204" y="111" fontSize={10.5} fill="var(--tx2)">Claude: here are the three key</text>
      <text x="204" y="126" fontSize={10.5} fill="var(--tx2)">trends…</text>

      {/* composer */}
      <rect x="190" y="278" width="312" height="46" rx="12" fill="var(--code-bg)" stroke="var(--accent)" strokeWidth={1.8} />
      <circle cx="210" cy="301" r="11" fill="var(--surface)" stroke="var(--sem-tool)" strokeWidth={1.4} />
      <text x="210" y="305" textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--sem-tool)">+</text>
      <text x="232" y="305" fontSize={11} fill="var(--tx3)">Ask anything…</text>
      <rect x="386" y="290" width="56" height="22" rx="7" fill="var(--surface)" stroke="var(--line2)" strokeWidth={1} />
      <text x="414" y="305" textAnchor="middle" fontSize={10} fill="var(--tx2)" style={{ fontFamily: "var(--font-mono)" }}>model ▾</text>
      <circle cx="460" cy="301" r="11" fill="var(--surface)" stroke="var(--line2)" strokeWidth={1.2} />
      <text x="460" y="305" textAnchor="middle" fontSize={11} fill="var(--tx2)">🎙</text>
      <circle cx="488" cy="301" r="11" fill="var(--accent)" />
      <text x="488" y="305" textAnchor="middle" fontSize={11} fontWeight={700} fill="#1a140d">▷</text>

      {/* annotations */}
      <g fill="none" strokeWidth={1.4}>
        <line x1="210" y1="290" x2="210" y2="246" stroke="var(--tx3)" markerEnd="url(#im-ah)" />
        <line x1="414" y1="288" x2="414" y2="246" stroke="var(--tx3)" markerEnd="url(#im-ah)" />
        <line x1="540" y1="301" x2="500" y2="301" stroke="var(--tx3)" markerEnd="url(#im-ah)" />
      </g>
      <text x="540" y="200" fontSize={11} fontWeight={700} fill="var(--sem-tool)" style={{ fontFamily: "var(--font-head)" }}>+ / "/"</text>
      <text x="540" y="216" fontSize={10} fill="var(--tx2)">files · Research</text>
      <text x="540" y="230" fontSize={10} fill="var(--tx2)">· styles · tools</text>
      <text x="540" y="258" fontSize={11} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>model menu</text>
      <text x="540" y="274" fontSize={10} fill="var(--tx2)">model · effort</text>
      <text x="540" y="288" fontSize={10} fill="var(--tx2)">· thinking</text>
      <text x="556" y="318" fontSize={11} fontWeight={700} fill="var(--tx2)" style={{ fontFamily: "var(--font-head)" }}>voice · send</text>
    </svg>
  );
}
