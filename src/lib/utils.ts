import type { Level } from "../data/types";

/** Conditional className join. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** The four levels, in increasing depth — used by the level filter. */
export const LEVELS: Level[] = ["beginner", "middle", "senior", "staff"];
