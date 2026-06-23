import type React from "react";
import { AgentLoopSim } from "../components/sims/AgentLoopSim";
import { PromptAnatomySim } from "../components/sims/PromptAnatomySim";
import { CoworkArchitecture } from "../components/figures/CoworkArchitecture";
import { ProjectWorkspace } from "../components/figures/ProjectWorkspace";

/** Interactive widgets, referenced by key from concepts.ts blocks (kind: 'sim'). */
export const SIMS: Record<string, React.FC> = {
  "agent-loop": AgentLoopSim,
  "prompt-anatomy": PromptAnatomySim,
};

/** Static diagrams, referenced by key from concepts.ts blocks (kind: 'figure'). */
export const FIGURES: Record<string, React.FC> = {
  "cowork-architecture": CoworkArchitecture,
  "project-workspace": ProjectWorkspace,
};
