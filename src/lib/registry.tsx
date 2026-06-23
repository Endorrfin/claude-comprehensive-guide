import type React from "react";
import { AgentLoopSim } from "../components/sims/AgentLoopSim";
import { PromptAnatomySim } from "../components/sims/PromptAnatomySim";
import { LiveArtifactDemo } from "../components/sims/LiveArtifactDemo";
import { TokenBudgetSim } from "../components/sims/TokenBudgetSim";
import { McpFlowSim } from "../components/sims/McpFlowSim";
import { CoworkArchitecture } from "../components/figures/CoworkArchitecture";
import { McpArchitecture } from "../components/figures/McpArchitecture";
import { ProjectWorkspace } from "../components/figures/ProjectWorkspace";
import { ChatArtifactPanel } from "../components/figures/ChatArtifactPanel";
import { LiveArtifactFlow } from "../components/figures/LiveArtifactFlow";
import { ContextWindow } from "../components/figures/ContextWindow";

/** Interactive widgets, referenced by key from concepts.ts blocks (kind: 'sim'). */
export const SIMS: Record<string, React.FC> = {
  "agent-loop": AgentLoopSim,
  "prompt-anatomy": PromptAnatomySim,
  "live-artifact-demo": LiveArtifactDemo,
  "token-budget": TokenBudgetSim,
  "mcp-flow": McpFlowSim,
};

/** Static diagrams, referenced by key from concepts.ts blocks (kind: 'figure'). */
export const FIGURES: Record<string, React.FC> = {
  "cowork-architecture": CoworkArchitecture,
  "project-workspace": ProjectWorkspace,
  "chat-artifact-panel": ChatArtifactPanel,
  "live-artifact-flow": LiveArtifactFlow,
  "context-window": ContextWindow,
  "mcp-architecture": McpArchitecture,
};
