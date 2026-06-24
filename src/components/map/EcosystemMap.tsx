import React from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { SECTIONS, MODULES, modulesOf, SIGNATURE_SIMS } from "../../data/meta";
import { go } from "../../lib/hashRouter";
import { cx } from "../../lib/utils";
import type { Level } from "../../data/types";

type Filter = Level | "all";

export function EcosystemMap({ level }: { level: Filter }): React.ReactElement {
  const { t } = useLang();
  const topics = MODULES.reduce((n, m) => n + m.topics.length, 0);

  return (
    <div className="map-wrap">
      <div className="map-hero">
        <h1>{t(UI.heroTitle)}</h1>
        <p>{t(UI.heroLead)}</p>
        <div className="map-stats">
          <div className="map-stat">
            <b>{SECTIONS.length}</b>
            {t(UI.statSections)}
          </div>
          <div className="map-stat">
            <b>{MODULES.length}</b>
            {t(UI.statModules)}
          </div>
          <div className="map-stat">
            <b>{topics}</b>
            {t(UI.statTopics)}
          </div>
          <div className="map-stat">
            <b>{SIGNATURE_SIMS.size}</b>
            {t(UI.statSims)}
          </div>
        </div>
      </div>

      <div className="map-grid">
        {SECTIONS.map((s, si) => (
          <div className="map-col" key={s.id}>
            <div className="map-col-head">
              <span className="bar" style={{ background: s.accent }} />
              <div>
                <h2>
                  {toRoman(si + 1)} · {t(s.name)}
                </h2>
                <div className="blurb">{t(s.blurb)}</div>
              </div>
            </div>
            {modulesOf(s.id).map((m) => {
              const dim = level !== "all" && m.level !== level;
              const star = SIGNATURE_SIMS.has(m.id);
              return (
                <button className={cx("card", dim && "dim")} key={m.id} onClick={() => go(`/m/${m.id}`)}>
                  <div className="card-top">
                    <span className="card-num">{m.id.replace("m", "M")}</span>
                    <span className="card-title">{t(m.title)}</span>
                  </div>
                  <div className="card-tag">{t(m.tagline)}</div>
                  <div className="card-foot">
                    <span className="pill">{m.level}</span>
                    {star ? <span className="pill hero">★ interactive</span> : null}
                    <span>
                      {m.topics.length} {t(UI.statTopics)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function toRoman(n: number): string {
  return ["I", "II", "III", "IV", "V", "VI"][n - 1] ?? String(n);
}
