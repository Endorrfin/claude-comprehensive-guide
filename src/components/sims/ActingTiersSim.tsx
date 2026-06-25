import React, { useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";
import "./actingTiersSim.css";

/* ★ Acting-Tiers Router — promotes the static `acting-tiers` figure into a
   decision the module spends two topics distinguishing. Pick a target and the
   router shows BOTH senses of "tier" at once, side by side, so they can't be
   conflated: (1) the MECHANISM fall-through — Claude tries the most precise tool
   first (connector → browser → screen) and only falls through when nothing
   better fits; and (2) the per-app ACCESS cap (View / Click / Full) that's fixed
   by the app's category. The synthesis line shows how the cap steers work back
   to the precise tool. Toggle-driven, inherently reduced-motion-safe, ARIA
   radiogroup + live region, bilingual. Mirrors ToolPickerSim. */
const L = (en: string, uk: string): Localized => ({ en, uk });

type Mech = 1 | 2 | 3; // 1 connector · 2 browser · 3 computer use (screen)
type Access = "na" | "view" | "click" | "full";
type Target = {
  id: string;
  label: Localized;
  sub: Localized;
  mech: Mech;
  access: Access;
  blocked?: boolean;
  why: Localized;
  note: Localized;
};

const TARGETS: Target[] = [
  {
    id: "slack",
    label: L("Send a Slack message", "Надіслати повідомлення у Slack"),
    sub: L("a tool with a connector", "інструмент із connector"),
    mech: 1,
    access: "na",
    why: L("A Slack connector exists, so Claude uses it directly — seconds, bounded by its OAuth scopes. It never looks at your screen.", "Для Slack є connector, тож Claude користується ним напряму — секунди, обмежено OAuth-scopes. Він взагалі не дивиться на екран."),
    note: L("Most precise tool wins: the connector handles it, so the screen access caps never come into play.", "Перемагає найточніший tool: connector усе робить, тож access-caps екрана взагалі не задіяні."),
  },
  {
    id: "dashboard",
    label: L("Fill an internal web dashboard", "Заповнити внутрішній веб-dashboard"),
    sub: L("a web page, no API / connector", "веб-сторінка, без API / connector"),
    mech: 2,
    access: "view",
    why: L("No connector for this site, but it’s a web page — so Claude falls through to the browser (Claude in Chrome): DOM-aware, far faster and steadier than clicking pixels.", "Для сайту немає connector, але це веб-сторінка — тож Claude падає до browser (Claude in Chrome): працює з DOM, значно швидше й стабільніше за кліки по пікселях."),
    note: L("Under raw computer use a browser is View-only — that very cap is why web work goes through the Chrome tool instead of screen-clicking.", "Під «голим» computer use браузер — лише View; саме цей cap і є причиною, чому веб іде через Chrome-tool, а не кліки по екрану."),
  },
  {
    id: "native",
    label: L("Drive a native desktop app", "Керувати нативним десктоп-застосунком"),
    sub: L("a design app · hardware panel", "застосунок дизайну · панель заліза"),
    mech: 3,
    access: "full",
    why: L("No connector, not a web page — the last resort. Claude takes screenshots and clicks, types and navigates the app directly, the way you would.", "Немає connector, не веб-сторінка — останній шанс. Claude робить скриншоти й сам клікає, друкує та керує застосунком, як ти."),
    note: L("Native apps get Full control — click, type, drag, shortcuts — and there is no sandbox between Claude and the app. Supervise it.", "Нативні застосунки отримують Full control — клік, друк, drag, шорткати — і між Claude та застосунком немає sandbox. Наглядай."),
  },
  {
    id: "terminal",
    label: L("Use a terminal or IDE", "Працювати з терміналом чи IDE"),
    sub: L("Terminal · VS Code", "Terminal · VS Code"),
    mech: 3,
    access: "click",
    why: L("A terminal is neither a connector nor a web page, so via the screen it lands on computer use — but the category cap changes what Claude may do there.", "Термінал — ні connector, ні веб-сторінка, тож через екран він потрапляє в computer use — але cap категорії змінює, що Claude там може."),
    note: L("Terminals/IDEs are Click-only: Claude can click Run or scroll output, but not type. That cap pushes real shell work back to the Bash tool.", "Термінали/IDE — лише Click: Claude може натиснути Run чи гортати вивід, але не друкувати. Цей cap повертає справжню shell-роботу до Bash-tool."),
  },
  {
    id: "trading",
    label: L("Open a trading platform", "Відкрити торгову платформу"),
    sub: L("brokerage · crypto", "брокер · crypto"),
    mech: 3,
    access: "view",
    blocked: true,
    why: L("It would fall to screen control like any app with no connector — but this category is special.", "Воно впало б до керування екраном, як будь-який застосунок без connector — але ця категорія особлива."),
    note: L("Trading platforms are View-only AND blocked by default — Claude can see but not act. Moving money and crypto are off-limits.", "Торгові платформи — лише View І заблоковані за замовчуванням: Claude бачить, але не діє. Перекази грошей і crypto — поза межами."),
  },
];

const MECHS: { n: Mech; name: Localized; sub: Localized; color: string }[] = [
  { n: 1, name: L("Connector / MCP", "Connector / MCP"), sub: L("fastest · scope-bounded", "найшвидше · обмежено scope"), color: "var(--sem-tool)" },
  { n: 2, name: L("Browser — Claude in Chrome", "Browser — Claude in Chrome"), sub: L("web work, DOM-aware", "веб-робота, через DOM"), color: "var(--sem-context)" },
  { n: 3, name: L("Computer use — your screen", "Computer use — екран"), sub: L("last resort · no sandbox", "останній шанс · без sandbox"), color: "var(--sem-agentic)" },
];

const ACCESS_META: Record<Access, { label: Localized; color: string }> = {
  na: { label: L("n/a — via connector", "н/д — через connector"), color: "var(--tx3)" },
  view: { label: L("View only", "View only"), color: "var(--sem-warn)" },
  click: { label: L("Click only", "Click only"), color: "var(--sem-context)" },
  full: { label: L("Full control", "Full control"), color: "var(--sem-agentic)" },
};

export function ActingTiersSim(): React.ReactElement {
  const { t } = useLang();
  const [id, setId] = useState<string>("slack");
  const target = useMemo(() => TARGETS.find((x) => x.id === id) ?? TARGETS[0], [id]);
  const access = ACCESS_META[target.access];

  return (
    <div className="ats">
      <div className="ats-head">{t(L("Pick a target — see which mechanism Claude falls through to, and the access cap once it’s there.", "Обери ціль — побач, до якого механізму Claude падає, і який access-cap, коли вже там."))}</div>

      <div className="ats-facet">
        <div className="ats-q">{t(L("What does the task touch?", "Чого торкається задача?"))}</div>
        <div className="ats-opts" role="radiogroup" aria-label={t(L("Target", "Ціль"))}>
          {TARGETS.map((tg) => {
            const on = tg.id === id;
            return (
              <button key={tg.id} className={on ? "ats-opt on" : "ats-opt"} role="radio" aria-checked={on} onClick={() => setId(tg.id)}>
                <span className="ats-opt-l">{t(tg.label)}</span>
                <span className="ats-opt-s">{t(tg.sub)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="ats-result" aria-live="polite">
        {/* Row 1 — the mechanism fall-through ladder */}
        <div className="ats-row-h">
          <span className="ats-row-k">{t(L("1 · Mechanism", "1 · Механізм"))}</span>
          <span className="ats-row-sub">{t(L("Claude tries the most precise tool first ↓", "Claude пробує найточніший tool першим ↓"))}</span>
        </div>
        <div className="ats-ladder">
          {MECHS.map((m) => {
            const state = m.n < target.mech ? "skip" : m.n === target.mech ? "use" : "none";
            const reason = m.n === 1 ? L("no connector for this", "немає connector для цього") : L("not a web page", "не веб-сторінка");
            return (
              <div key={m.n} className={`ats-tier ${state}`} style={state === "use" ? { borderColor: m.color } : undefined}>
                <span className="ats-tier-n" style={{ background: state === "use" ? m.color : "var(--line2)" }}>{m.n}</span>
                <span className="ats-tier-body">
                  <span className="ats-tier-name">{t(m.name)}</span>
                  <span className="ats-tier-sub">{t(m.sub)}</span>
                </span>
                <span className="ats-tier-state">
                  {state === "use" ? <b style={{ color: m.color }}>✓ {t(L("used", "обрано"))}</b>
                    : state === "skip" ? <span className="ats-skip">✗ {t(reason)}</span>
                    : <span className="ats-na">{t(L("not reached", "не дістались"))}</span>}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2 — the per-app access cap (a different sense of "tier") */}
        <div className="ats-row-h">
          <span className="ats-row-k">{t(L("2 · Access cap", "2 · Access-cap"))}</span>
          <span className="ats-row-sub">{t(L("fixed by the app’s category", "зафіксовано категорією застосунку"))}</span>
        </div>
        <div className="ats-access">
          <span className="ats-badge" style={{ borderColor: access.color, color: access.color }}>{t(access.label)}</span>
          {target.blocked ? <span className="ats-badge blocked">{t(L("blocked by default", "заблоковано за замовч."))}</span> : null}
          <span className="ats-access-note">{t(target.note)}</span>
        </div>

        <div className="ats-why"><span className="ats-why-k">{t(L("Why", "Чому"))}</span> {t(target.why)}</div>
      </div>

      <div className="ats-foot">{t(L("Two different “tiers”: the mechanism is HOW Claude reaches the app; the access cap is HOW MUCH control it gets once there.", "Два різні «tier»: механізм — ЯК Claude дістається застосунку; access-cap — СКІЛЬКИ контролю він там отримує."))}</div>
    </div>
  );
}
