/* The lightweight metadata API — backed by the generated meta.json (see
   scripts/genMeta.ts). Everything that needs only nav/search/title data (the
   eager shell: TopBar search, Sidebar nav, Footer counts; plus the landing,
   gallery and glossary) imports from HERE, not from concepts.ts — so the ~600 KB
   of module bodies never enters the initial bundle. Only the lazy ModulePage
   imports the full content from concepts.ts.

   Exports mirror concepts.ts names so consumers swap the import path only. */
import metaRaw from "./meta.json";
import type { Level, Localized, Section } from "./types";

export type TopicMeta = { id: string; title: Localized };
export type ModuleMeta = {
  id: string;
  section: string;
  order: number;
  level: Level;
  title: Localized;
  tagline: Localized;
  mentalModel: Localized;
  readMins: number;
  topics: TopicMeta[];
  seeAlso: string[];
  authored: boolean;
};
type MetaFile = { sections: Section[]; signatureSims: string[]; modules: ModuleMeta[] };

const META = metaRaw as unknown as MetaFile;

export const SECTIONS: Section[] = META.sections;
export const SIGNATURE_SIMS = new Set<string>(META.signatureSims);
export const MODULES: ModuleMeta[] = [...META.modules].sort((a, b) => a.order - b.order);

export function sectionById(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}
export function moduleById(id: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.id === id);
}
export function modulesOf(sectionId: string): ModuleMeta[] {
  return MODULES.filter((m) => m.section === sectionId);
}
export function prevNext(id: string): { prev?: ModuleMeta; next?: ModuleMeta } {
  const i = MODULES.findIndex((m) => m.id === id);
  if (i === -1) return {};
  return { prev: MODULES[i - 1], next: MODULES[i + 1] };
}
/** Metadata carries the authored flag precomputed by the codegen. */
export function isAuthored(m: { authored?: boolean }): boolean {
  return !!m.authored;
}
