import React from "react";
import { useLang } from "../../i18n/LangContext";
import type { Localized } from "../../data/types";

export function StubPage({ title, note }: { title: Localized; note: Localized }): React.ReactElement {
  const { t } = useLang();
  return (
    <div className="page">
      <h1>{t(title)}</h1>
      <p className="lead">{t(note)}</p>
      <div className="planned">
        <b>{t({ en: "Coming soon", uk: "Незабаром" })}.</b> {t(note)}
      </div>
    </div>
  );
}
