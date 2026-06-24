import React from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { ToolPickerSim } from "../sims/ToolPickerSim";
import { go } from "../../lib/hashRouter";

/* The #/decide study surface — the Tool Picker on its own page, with a short
   intro and a link into M26 where the same widget is taught in context. */
export function DecidePage(): React.ReactElement {
  const { t } = useLang();
  return (
    <div className="page">
      <h1>{t(UI.nav.decide)}</h1>
      <p className="lead">
        {t({
          en: "Claude is one model family reached through many surfaces. Describe a task and this picker ranks the right one — Cowork, Code, Chrome, Excel/PowerPoint, a Connector, a Skill, or plain Chat + Artifacts — with the reason and the catch.",
          uk: "Claude — одна сімʼя моделей, доступна через багато поверхонь. Опиши задачу, і цей picker оцінить потрібну — Cowork, Code, Chrome, Excel/PowerPoint, Connector, Skill чи звичайний Chat + Artifacts — із причиною та застереженням.",
        })}
      </p>
      <ToolPickerSim />
      <p style={{ marginTop: 18, fontSize: "13px", color: "var(--tx2)" }}>
        {t({ en: "Want the reasoning behind it?", uk: "Хочеш логіку за цим?" })}{" "}
        <button
          className="tp-link"
          style={{ font: "inherit", fontWeight: 600 }}
          onClick={() => go("/m/m26")}
        >
          {t({ en: "Read M26 · Choosing the right tool", uk: "Читай M26 · Вибір правильного інструмента" })} →
        </button>
      </p>
    </div>
  );
}
