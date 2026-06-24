import React from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";
import { MODULES, SECTIONS, SIGNATURE_SIMS } from "../../data/concepts";

/* Three centred rows: identity · tagline + live stats · built-with.
   Stats are derived from the data so they can never drift from reality. */
export function Footer(): React.ReactElement {
  const { t } = useLang();
  const sections = SECTIONS.length;
  const modules = MODULES.length;
  const sims = SIGNATURE_SIMS.size;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-id">
          <b>Vasyl Krupka</b>
          <span className="sep">·</span>
          <span>{t(UI.builtBy)}</span>
          <span className="sep">·</span>
          <span>
            {t({ en: "Ukraine", uk: "Україна" })} <span aria-label="Ukraine">🇺🇦</span>
          </span>
          <span className="sep">·</span>
          <a className="flink" href="https://www.linkedin.com/in/vasyl-krupka/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <span className="sep">·</span>
          <a className="flink" href="https://github.com/Endorrfin/claude-comprehensive-guide" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>

        <div className="footer-tag">
          <span>
            {t({
              en: "Deep, interactive, bilingual guide to mastering Claude and its tools.",
              uk: "Глибокий інтерактивний двомовний гайд з опанування Claude та його інструментів.",
            })}
          </span>
          <span className="sep">·</span>
          <span>{sections} {t(UI.statSections)}</span>
          <span className="sep">·</span>
          <span>{modules} {t(UI.statModules)}</span>
          <span className="sep">·</span>
          <span>{sims} {t({ en: "signature sims", uk: "signature sims" })}</span>
        </div>

        <div className="footer-built">{t({ en: "Built with", uk: "Зроблено на" })} Vite · React · TypeScript</div>
      </div>
    </footer>
  );
}
