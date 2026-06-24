import React, { useEffect } from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { moduleById, isAuthored } from "../../data/concepts";
import { sectionById, prevNext, SIGNATURE_SIMS } from "../../data/meta";
import { Block } from "./Block";
import { Md } from "./Md";
import { go } from "../../lib/hashRouter";
import { cx } from "../../lib/utils";

export function ModulePage({ id, topicId }: { id: string; topicId?: string }): React.ReactElement {
  const { t } = useLang();
  const m = moduleById(id);

  useEffect(() => {
    if (topicId && typeof document !== "undefined") {
      document.getElementById("t-" + topicId)?.scrollIntoView({ behavior: "auto" });
    }
  }, [topicId, id]);

  if (!m) {
    return (
      <div className="chapter">
        <h1 className="ch-title">404</h1>
        <p className="ch-tagline">{t({ en: "Module not found.", uk: "Модуль не знайдено." })}</p>
      </div>
    );
  }

  const sec = sectionById(m.section);
  const { prev, next } = prevNext(id);
  const authored = isAuthored(m);

  return (
    <article className="chapter">
      <div className="ch-head">
        <div className="crumb">{sec ? t(sec.name) : ""}</div>
        <div className="ch-meta" style={{ marginTop: 0, marginBottom: 8 }}>
          <span className={cx("lvl-badge", m.level)}>{m.level}</span>
          <span>
            {m.readMins} {t(UI.readMins)}
          </span>
          {SIGNATURE_SIMS.has(m.id) ? (
            <span style={{ color: "var(--accent)" }}>★ {t({ en: "interactive", uk: "інтерактив" })}</span>
          ) : null}
          {!authored ? <span style={{ color: "var(--accent)" }}>{t(UI.comingSoon)}</span> : null}
        </div>
        <h1 className="ch-title">{t(m.title)}</h1>
        <p className="ch-tagline">{t(m.tagline)}</p>
        <div className="mental">
          <div className="lbl">{t(UI.mentalModel)}</div>
          <p>{t(m.mentalModel)}</p>
        </div>
      </div>

      {m.topics.length > 0 ? (
        <nav className="toc" aria-label={t(UI.topicsInModule)}>
          <div className="toc-title">{t(UI.topicsInModule)}</div>
          <ol>
            {m.topics.map((tp) => (
              <li key={tp.id}>
                <a href={`#/m/${m.id}/${tp.id}`}>{t(tp.title)}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      {m.topics.map((tp) => (
        <section className="topic" id={"t-" + tp.id} key={tp.id}>
          <h2 className="sec-h">{t(tp.title)}</h2>
          {tp.blocks.length > 0 ? (
            tp.blocks.map((b, i) => <Block key={i} block={b} />)
          ) : (
            <div className="planned">{t(UI.planned)}</div>
          )}
        </section>
      ))}

      {m.keyPoints.length > 0 ? (
        <div className="block">
          <h2>{t(UI.keyPoints)}</h2>
          <div className="keypoints">
            {m.keyPoints.map((k, i) => (
              <div className="kp" key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <Md text={t(k)} />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {m.pitfalls.length > 0 ? (
        <div className="block">
          <h2>{t(UI.pitfalls)}</h2>
          {m.pitfalls.map((p, i) => (
            <div className="pitfall" key={i}>
              <div className="pt">{t(p.title)}</div>
              <p>{t(p.body)}</p>
            </div>
          ))}
        </div>
      ) : null}

      {m.interview && m.interview.length > 0 ? (
        <div className="block">
          <h2>{t(UI.interview)}</h2>
          {m.interview.map((q, i) => (
            <details className="qa" key={i}>
              <summary>
                <span className="qmark">Q</span>
                <span>{t(q.q)}</span>
                {q.level ? <span className="lvl">{q.level}</span> : null}
              </summary>
              <div className="ans">
                <Md text={t(q.a)} />
              </div>
            </details>
          ))}
        </div>
      ) : null}

      {m.seeAlso.length > 0 ? (
        <div className="block">
          <h2>{t(UI.seeAlso)}</h2>
          <div className="seealso">
            {m.seeAlso.map((sid) => {
              const sm = moduleById(sid);
              return sm ? (
                <a key={sid} href={`#/m/${sid}`}>
                  {t(sm.title)}
                </a>
              ) : null;
            })}
          </div>
        </div>
      ) : null}

      {m.sources.length > 0 ? (
        <div className="block">
          <h2>{t(UI.sources)}</h2>
          <ul className="sources">
            {m.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="prevnext">
        {prev ? (
          <button className="pn" onClick={() => go(`/m/${prev.id}`)}>
            <div className="dir">← {t(UI.prev)}</div>
            <div className="t">{t(prev.title)}</div>
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button className="pn next" onClick={() => go(`/m/${next.id}`)}>
            <div className="dir">{t(UI.next)} →</div>
            <div className="t">{t(next.title)}</div>
          </button>
        ) : (
          <span />
        )}
      </div>
    </article>
  );
}
