// CHANGED (S16): pure Tool-Picker scoring engine (Wave C2, test parity). The bilingual
// surface catalog + facet copy stay in src/data/decide.ts; this module owns only the
// deterministic math, so scripts/test-decide.ts can prove the ranking without React or
// any localized content. data/decide.ts re-exports recommend()/Answers/Ranked from here,
// so every consumer (ToolPickerSim) keeps importing from data/decide unchanged.

export type WhereId = "chat" | "files" | "web" | "code" | "office" | "app" | "expertise";
export type AutonomyId = "reply" | "task" | "recurring";
export type PlanId = "free" | "paid";
export type Answers = { where: WhereId; autonomy: AutonomyId; plan: PlanId };

/** The minimal scoring shape a surface must expose. The bilingual `Surface` in
    data/decide.ts extends this with name/module/why/limit. */
export type ScorableSurface = {
  id: string;
  paidOnly: boolean;
  fit: Partial<Record<WhereId, number>>;
  autonomy: Partial<Record<AutonomyId, number>>;
};

export type Ranked<S extends ScorableSurface = ScorableSurface> = {
  surface: S;
  score: number;
  gated: boolean;
};

/** `where` dominates the score; `autonomy` is a small modifier/tie-break. */
export const WHERE_WEIGHT = 10;
/** A paid-only surface on a Free plan is penalised (flagged, not hidden). */
export const GATED_FACTOR = 0.34;

/** Score one surface for a set of answers (pure). */
export function scoreSurface(s: ScorableSurface, a: Answers): { score: number; gated: boolean } {
  const base = (s.fit[a.where] ?? 0) * WHERE_WEIGHT + (s.autonomy[a.autonomy] ?? 0);
  const gated = a.plan === "free" && s.paidOnly;
  return { score: gated ? base * GATED_FACTOR : base, gated };
}

/** Rank surfaces best-first, dropping non-positive scores. Deterministic. */
export function rankSurfaces<S extends ScorableSurface>(surfaces: readonly S[], a: Answers): Ranked<S>[] {
  return surfaces
    .map((surface) => {
      const { score, gated } = scoreSurface(surface, a);
      return { surface, score, gated };
    })
    .filter((r) => r.score > 0)
    .sort((x, y) => y.score - x.score);
}
