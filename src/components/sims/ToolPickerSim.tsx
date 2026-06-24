import React, { useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import { FACETS, recommend, SURFACES, type Answers, type Facet, type Ranked } from "../../data/decide";
import { moduleById } from "../../data/meta";
import { go } from "../../lib/hashRouter";
import type { Localized } from "../../data/types";
import "./toolPicker.css";

/* ★ Tool Picker — the 7th and final signature interactive (M26, also #/decide).
   A DPmap-style decision widget: answer three facets about a task (what it
   touches · how much autonomy · your plan) and the surfaces are ranked live by
   a deterministic score in decide.ts. The best fit is explained; two runners-up
   add nuance; paid-only surfaces on a Free plan are flagged, not hidden.
   No animation loop — gated transitions only; bilingual; ARIA radiogroups. */
const L = (en: string, uk: string): Localized => ({ en, uk });

function Pick({ rank, r, top }: { rank: number; r: Ranked; top?: boolean }): React.ReactElement {
  const { t } = useLang();
  const s = r.surface;
  const mod = moduleById(s.module);
  return (
    <div className={top ? "tp-pick top" : "tp-pick"}>
      <div className="tp-pick-h">
        <span className="tp-rank">{rank === 1 ? t(L("Best fit", "Найкращий вибір")) : `#${rank}`}</span>
        <span className="tp-name">{t(s.name)}</span>
        {r.gated ? <span className="tp-gate">{t(L("needs a paid plan", "потрібен платний план"))}</span> : null}
      </div>
      <div className="tp-why">{t(s.why)}</div>
      <div className="tp-limit"><span className="tp-limit-k">{t(L("Watch out", "Увага"))}</span> {t(s.limit)}</div>
      <button className="tp-link" onClick={() => go(`/m/${s.module}`)}>
        {t(L("Open", "Відкрити"))} {mod ? t(mod.title) : ""} →
      </button>
    </div>
  );
}

export function ToolPickerSim(): React.ReactElement {
  const { t } = useLang();
  const [answers, setAnswers] = useState<Answers>({ where: "files", autonomy: "task", plan: "paid" });

  const ranked = useMemo(() => recommend(answers), [answers]);
  const top = ranked[0];
  const runners = ranked.slice(1, 3);

  const set = (facet: Facet["id"], id: string): void =>
    setAnswers((a) => ({ ...a, [facet]: id }) as Answers);

  return (
    <div className="tp">
      <div className="tp-head">{t(L("Describe your task — the right surface ranks itself.", "Опиши задачу — потрібна поверхня сама стане першою."))}</div>

      <div className="tp-facets">
        {FACETS.map((f) => (
          <div className="tp-facet" key={f.id}>
            <div className="tp-q">{t(f.question)}</div>
            <div className="tp-opts" role="radiogroup" aria-label={t(f.question)}>
              {f.options.map((o) => {
                const on = answers[f.id] === o.id;
                return (
                  <button
                    key={o.id}
                    className={on ? "tp-opt on" : "tp-opt"}
                    role="radio"
                    aria-checked={on}
                    onClick={() => set(f.id, o.id)}
                  >
                    <span className="tp-opt-l">{t(o.label)}</span>
                    {o.sub ? <span className="tp-opt-s">{t(o.sub)}</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="tp-results" aria-live="polite">
        {top ? <Pick rank={1} r={top} top /> : null}
        {runners.length > 0 ? (
          <>
            <div className="tp-runners-h">{t(L("Also consider", "Також розглянь"))}</div>
            <div className="tp-runners">
              {runners.map((r, i) => (
                <Pick key={r.surface.id} rank={i + 2} r={r} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="tp-foot">
        {t(L("Surfaces ranked", "Поверхонь оцінено"))}: {SURFACES.length} · {t(L("the answer changes with your plan", "відповідь змінюється від плану"))}
      </div>
    </div>
  );
}
