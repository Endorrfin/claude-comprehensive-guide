import React, { Suspense } from "react";
import { useLang } from "../../i18n/LangContext";
import { SIMS, FIGURES } from "../../lib/registry";
import { Md } from "./Md";
import type { Block as B } from "../../data/types";

export function Block({ block }: { block: B }): React.ReactElement | null {
  const { t } = useLang();
  // CHANGED (S10b): sims/figures are lazy-loaded — show a light placeholder while their chunk loads.
  const loading = <div className="widget-loading">{t({ en: "Loading…", uk: "Завантаження…" })}</div>;

  switch (block.kind) {
    case "prose":
      return (
        <div className="prose">
          {t(block.md)
            .split("\n\n")
            .map((p, i) => (
              <p key={i}>
                <Md text={p} />
              </p>
            ))}
        </div>
      );

    case "figure": {
      const F = FIGURES[block.fig];
      return (
        <figure className="figure">
          {F ? (
            <Suspense fallback={loading}>
              <F />
            </Suspense>
          ) : (
            <div className="planned">figure: {block.fig}</div>
          )}
          {block.caption ? <figcaption className="fig-cap">{t(block.caption)}</figcaption> : null}
        </figure>
      );
    }

    case "sim": {
      const S = SIMS[block.sim];
      return S ? (
        <Suspense fallback={loading}>
          <S />
        </Suspense>
      ) : (
        <div className="planned">sim: {block.sim}</div>
      );
    }

    case "table":
      return (
        <div className="tbl-wrap">
          <table className="data">
            <thead>
              <tr>{block.head.map((h, i) => <th key={i}>{t(h)}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>
                      <Md text={t(c)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? <div className="tbl-cap">{t(block.caption)}</div> : null}
        </div>
      );

    case "code":
      return (
        <div className="code">
          <div className="code-head">
            <span className="dot" />
            {block.lang}
          </div>
          <pre>{block.code}</pre>
          {block.note ? (
            <div className="note">
              <Md text={t(block.note)} />
            </div>
          ) : null}
        </div>
      );

    case "callout":
      return (
        <div className={`callout ${block.tone}`}>
          <div className="ttl">{t(block.title)}</div>
          <p>
            <Md text={t(block.md)} />
          </p>
        </div>
      );

    case "compare":
      return (
        <div className="compare">
          <div className="head">{t(block.a)}</div>
          <div className="head b">{t(block.b)}</div>
          {block.rows.map((row, ri) => (
            <React.Fragment key={ri}>
              <div
                className="cell"
                style={{
                  gridColumn: "1 / -1",
                  color: "var(--tx3)",
                  fontWeight: 600,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                {t(row[0])}
              </div>
              <div className="cell">{t(row[1])}</div>
              <div className="cell b">{t(row[2])}</div>
            </React.Fragment>
          ))}
        </div>
      );

    default:
      return null;
  }
}
