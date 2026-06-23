import React from "react";
import { useLang } from "../../i18n/LangContext";
import { UI } from "../../i18n/ui";

export function Footer(): React.ReactElement {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="flag" aria-label="Ukraine">
          <svg viewBox="0 0 22 15" width="22" height="15" aria-hidden="true">
            <rect width="22" height="7.5" fill="#0057B7" />
            <rect y="7.5" width="22" height="7.5" fill="#FFD700" />
          </svg>
        </span>
        <b style={{ color: "var(--tx)", fontWeight: 600 }}>Vasyl Krupka</b>
        <span className="sep">·</span>
        <span>{t(UI.builtBy)}</span>
        <span className="sep">·</span>
        <span>{t({ en: "bilingual EN / UA", uk: "двомовно EN / UA" })}</span>
        <a
          className="src flink"
          href="https://github.com/Endorrfin/claude-comprehensive-guide"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
