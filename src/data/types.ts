/* ===========================================================================
   Content contract — Section -> Module -> Topic -> Block.
   Every human-readable string is a Localized { en; uk }. Technical terms stay
   English in both languages. Pages are rendered from this data; never hand-write.
   =========================================================================== */
export type Lang = "en" | "uk";
export type Localized = { en: string; uk: string };
export type Level = "beginner" | "middle" | "senior" | "staff";

export type Block =
  | { kind: "prose"; md: Localized }
  | { kind: "figure"; fig: string; caption?: Localized }
  | { kind: "sim"; sim: string }
  | { kind: "table"; head: Localized[]; rows: Localized[][]; caption?: Localized }
  | { kind: "code"; lang: string; code: string; note?: Localized }
  | {
      kind: "callout";
      tone: "tip" | "warn" | "senior" | "security";
      title: Localized;
      md: Localized;
    }
  | { kind: "compare"; a: Localized; b: Localized; rows: [Localized, Localized, Localized][] };

export type Topic = { id: string; title: Localized; blocks: Block[] };

export type Module = {
  id: string;
  section: string;
  order: number;
  level: Level;
  title: Localized;
  tagline: Localized;
  readMins: number;
  mentalModel: Localized;
  topics: Topic[];
  keyPoints: Localized[];
  pitfalls: { title: Localized; body: Localized }[];
  interview?: { q: Localized; a: Localized; level?: Level }[];
  seeAlso: string[];
  sources: { title: string; url: string }[];
};

export type Section = { id: string; name: Localized; accent: string; blurb: Localized };
