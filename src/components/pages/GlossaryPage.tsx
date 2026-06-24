import React, { useMemo, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "../../data/glossary";
import type { GlossaryCategory, GlossaryTerm } from "../../data/glossary";
import { moduleById } from "../../data/meta";
import { go } from "../../lib/hashRouter";
import { cx } from "../../lib/utils";

type CatFilter = GlossaryCategory | "all";

/* The #/glossary study surface: the comprehensive bilingual term bank, with
   live search, category filtering and A–Z grouping. Terms stay English; the
   definition follows the active language. Each term cross-links to its module(s). */
export function GlossaryPage(): React.ReactElement {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CatFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((g) => cat === "all" || g.category === cat)
      .filter((g) => !q || (g.term + " " + t(g.def)).toLowerCase().includes(q))
      .slice()
      .sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, cat, t]);

  const groups = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const g of filtered) {
      const first = g.term[0].toUpperCase();
      const key = /[A-Z]/.test(first) ? first : "#";
      const bucket = map.get(key);
      if (bucket) bucket.push(g);
      else map.set(key, [g]);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const catLabel = (id: GlossaryCategory) =>
    GLOSSARY_CATEGORIES.find((c) => c.id === id)?.label ?? { en: id, uk: id };

  return (
    <div className="page gl-page">
      <h1>{t(UI.nav.glossary)}</h1>
      <p className="lead">
        {t({
          en: "Every key term across the guide, defined in EN and UA — technical terms stay English. Search, or filter by category; each entry links to the module where it’s taught.",
          uk: "Кожен ключовий термін гайду, з визначенням EN і UA — технічні терміни лишаються English. Шукай або фільтруй за категорією; кожен запис веде до модуля, де його пояснено.",
        })}
      </p>

      <div className="gl-toolbar">
        <div className="search gl-search">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t({ en: "Search terms & definitions…", uk: "Пошук термінів і визначень…" })}
            aria-label={t({ en: "Search the glossary", uk: "Пошук у глосарії" })}
          />
        </div>
        <div className="gl-cats" role="group" aria-label={t({ en: "Category", uk: "Категорія" })}>
          <button className={cx("fbtn", cat === "all" && "on")} aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            {t(UI.levelAll)}
          </button>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={cx("fbtn", cat === c.id && "on")}
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
            >
              {t(c.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="gl-count" aria-live="polite">
        <b>{filtered.length}</b> {t({ en: "terms", uk: "термінів" })}
      </div>

      {groups.length === 0 ? (
        <div className="planned">{t({ en: "No terms match this search.", uk: "Жоден термін не підходить під цей пошук." })}</div>
      ) : (
        groups.map(([letter, items]) => (
          <section className="gl-group" key={letter}>
            <div className="gl-letter" aria-hidden="true">{letter}</div>
            <dl className="gl-list">
              {items.map((g) => (
                <div className="gl-item" key={g.term} id={"gl-" + g.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                  <dt className="gl-term">
                    {g.term}
                    <span className="gl-cat">{t(catLabel(g.category))}</span>
                  </dt>
                  <dd className="gl-def">
                    {t(g.def)}
                    {g.modules && g.modules.length > 0 ? (
                      <span className="gl-mods">
                        {g.modules.map((mid) => {
                          const m = moduleById(mid);
                          return m ? (
                            <button
                              key={mid}
                              className="gl-modlink"
                              onClick={() => go(`/m/${mid}`)}
                              title={t(m.title)}
                            >
                              {mid.replace("m", "M")}
                            </button>
                          ) : null;
                        })}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))
      )}
    </div>
  );
}
