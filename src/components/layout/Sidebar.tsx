import React, { useEffect, useState } from "react";
import { useLang } from "../../i18n/LangContext";
import { SECTIONS, MODULES, modulesOf, moduleById, SIGNATURE_SIMS } from "../../data/concepts";
import { go } from "../../lib/hashRouter";
import { cx } from "../../lib/utils";
import type { Level } from "../../data/types";

type Filter = Level | "all";

export function Sidebar({ activeId, level }: { activeId: string | null; level: Filter }): React.ReactElement {
  const { t } = useLang();
  const activeSection = activeId ? moduleById(activeId)?.section : undefined;
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(activeSection ? [activeSection] : [SECTIONS[0].id]));

  // keep the active module's section open when navigation changes it
  useEffect(() => {
    if (activeSection) setOpenIds((prev) => (prev.has(activeSection) ? prev : new Set(prev).add(activeSection)));
  }, [activeSection]);

  const toggle = (id: string): void =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <aside className="sidebar" aria-label="Modules">
      {SECTIONS.map((s, si) => {
        const isOpen = openIds.has(s.id);
        const mods = modulesOf(s.id);
        return (
          <div className="sb-section" key={s.id}>
            <button className="sb-section-head" onClick={() => toggle(s.id)} aria-expanded={isOpen}>
              <span className="sb-caret">{isOpen ? "▾" : "▸"}</span>
              <span className="sb-rom">{toRoman(si + 1)}</span>
              <span className="dot" style={{ background: s.accent }} />
              <span>{t(s.name)}</span>
            </button>
            {isOpen ? (
              <div className="sb-modules">
                {mods.map((m) => {
                  const on = m.id === activeId;
                  const dim = level !== "all" && m.level !== level;
                  const star = SIGNATURE_SIMS.has(m.id);
                  return (
                    <button
                      key={m.id}
                      className={cx("sb-link", on && "on", dim && "dim")}
                      onClick={() => go(`/m/${m.id}`)}
                    >
                      <span className="sb-num">{m.id.replace("m", "M")}</span>
                      <span>{t(m.title)}</span>
                      {star ? <span className="sb-star" title="signature interactive">★</span> : null}
                      <span className="sb-badge">{m.level}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
      <p className="sources" style={{ padding: "10px", marginTop: "6px" }}>
        {MODULES.length} {t({ en: "modules", uk: "модулів" })} · {SECTIONS.length} {t({ en: "sections", uk: "секцій" })}
      </p>
    </aside>
  );
}

function toRoman(n: number): string {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][n - 1] ?? String(n);
}
