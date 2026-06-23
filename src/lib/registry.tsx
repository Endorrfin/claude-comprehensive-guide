import type React from "react";
import { AgentLoopSim } from "../components/sims/AgentLoopSim";
import { CoworkArchitecture } from "../components/figures/CoworkArchitecture";

/** Interactive widgets, referenced by key from concepts.ts blocks (kind: 'sim'). */
export const SIMS: Record<string, React.FC> = {
  "agent-loop": AgentLoopSim,
};

/** Static diagrams, referenced by key from concepts.ts blocks (kind: 'figure'). */
export const FIGURES: Record<string, React.FC> = {
  "cowork-architecture": CoworkArchitecture,
};
