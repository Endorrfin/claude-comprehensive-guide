import React from "react";

/* CHANGED (S10b): sims and figures are now lazy-loaded. Each key maps to a
   dynamic import(), so a module page pulls only the widgets it actually renders
   — and each sim's co-located CSS splits into its own on-demand chunk. The
   render is wrapped in <Suspense> by Block.tsx. This breaks the single ~1 MB
   bundle into the shell + per-widget + per-route chunks. */
type Lazy = React.LazyExoticComponent<React.FC>;

/** Interactive widgets, referenced by key from concepts.ts blocks (kind: 'sim'). */
export const SIMS: Record<string, Lazy> = {
  "agent-loop": React.lazy(() => import("../components/sims/AgentLoopSim").then((m) => ({ default: m.AgentLoopSim }))),
  "prompt-anatomy": React.lazy(() => import("../components/sims/PromptAnatomySim").then((m) => ({ default: m.PromptAnatomySim }))),
  "live-artifact-demo": React.lazy(() => import("../components/sims/LiveArtifactDemo").then((m) => ({ default: m.LiveArtifactDemo }))),
  "token-budget": React.lazy(() => import("../components/sims/TokenBudgetSim").then((m) => ({ default: m.TokenBudgetSim }))),
  "mcp-flow": React.lazy(() => import("../components/sims/McpFlowSim").then((m) => ({ default: m.McpFlowSim }))),
  "progressive-disclosure": React.lazy(() => import("../components/sims/ProgressiveDisclosureSim").then((m) => ({ default: m.ProgressiveDisclosureSim }))),
  "schedule-timeline": React.lazy(() => import("../components/sims/ScheduleTimelineSim").then((m) => ({ default: m.ScheduleTimelineSim }))),
  "browser-agent-loop": React.lazy(() => import("../components/sims/BrowserAgentLoopSim").then((m) => ({ default: m.BrowserAgentLoopSim }))),
  "sub-agent-fanout": React.lazy(() => import("../components/sims/SubAgentFanoutSim").then((m) => ({ default: m.SubAgentFanoutSim }))),
  "tool-picker": React.lazy(() => import("../components/sims/ToolPickerSim").then((m) => ({ default: m.ToolPickerSim }))),
  "two-gate": React.lazy(() => import("../components/sims/TwoGateSim").then((m) => ({ default: m.TwoGateSim }))),
};

/** Static diagrams, referenced by key from concepts.ts blocks (kind: 'figure'). */
export const FIGURES: Record<string, Lazy> = {
  "claude-mental-model": React.lazy(() => import("../components/figures/ClaudeMentalModel").then((m) => ({ default: m.ClaudeMentalModel }))),
  "where-claude-lives": React.lazy(() => import("../components/figures/WhereClaudeLives").then((m) => ({ default: m.WhereClaudeLives }))),
  "interface-map": React.lazy(() => import("../components/figures/InterfaceMap").then((m) => ({ default: m.InterfaceMap }))),
  "prompt-flow": React.lazy(() => import("../components/figures/PromptFlow").then((m) => ({ default: m.PromptFlow }))),
  "style-pipeline": React.lazy(() => import("../components/figures/StylePipeline").then((m) => ({ default: m.StylePipeline }))),
  "memory-across-sessions": React.lazy(() => import("../components/figures/MemoryAcrossSessions").then((m) => ({ default: m.MemoryAcrossSessions }))),
  "cowork-architecture": React.lazy(() => import("../components/figures/CoworkArchitecture").then((m) => ({ default: m.CoworkArchitecture }))),
  "project-workspace": React.lazy(() => import("../components/figures/ProjectWorkspace").then((m) => ({ default: m.ProjectWorkspace }))),
  "chat-artifact-panel": React.lazy(() => import("../components/figures/ChatArtifactPanel").then((m) => ({ default: m.ChatArtifactPanel }))),
  "live-artifact-flow": React.lazy(() => import("../components/figures/LiveArtifactFlow").then((m) => ({ default: m.LiveArtifactFlow }))),
  "context-window": React.lazy(() => import("../components/figures/ContextWindow").then((m) => ({ default: m.ContextWindow }))),
  "file-flow": React.lazy(() => import("../components/figures/FileFlow").then((m) => ({ default: m.FileFlow }))),
  "acting-tiers": React.lazy(() => import("../components/figures/ActingTiers").then((m) => ({ default: m.ActingTiers }))),
  "code-architecture": React.lazy(() => import("../components/figures/CodeArchitecture").then((m) => ({ default: m.CodeArchitecture }))),
  "agent-scales": React.lazy(() => import("../components/figures/AgentScales").then((m) => ({ default: m.AgentScales }))),
  "hook-lifecycle": React.lazy(() => import("../components/figures/HookLifecycle").then((m) => ({ default: m.HookLifecycle }))),
  "cowork-project": React.lazy(() => import("../components/figures/CoworkProject").then((m) => ({ default: m.CoworkProject }))),
  "dispatch-flow": React.lazy(() => import("../components/figures/DispatchFlow").then((m) => ({ default: m.DispatchFlow }))),
  "excel-citations": React.lazy(() => import("../components/figures/ExcelCitations").then((m) => ({ default: m.ExcelCitations }))),
  "mcp-architecture": React.lazy(() => import("../components/figures/McpArchitecture").then((m) => ({ default: m.McpArchitecture }))),
  "skill-anatomy": React.lazy(() => import("../components/figures/SkillAnatomy").then((m) => ({ default: m.SkillAnatomy }))),
  "skill-build-pipeline": React.lazy(() => import("../components/figures/SkillBuildPipeline").then((m) => ({ default: m.SkillBuildPipeline }))),
  "plugin-bundle": React.lazy(() => import("../components/figures/PluginBundle").then((m) => ({ default: m.PluginBundle }))),
  "trust-boundaries": React.lazy(() => import("../components/figures/TrustBoundaries").then((m) => ({ default: m.TrustBoundaries }))),
  "tool-matrix": React.lazy(() => import("../components/figures/ToolMatrix").then((m) => ({ default: m.ToolMatrix }))),
  "ecosystem-layers": React.lazy(() => import("../components/figures/EcosystemLayers").then((m) => ({ default: m.EcosystemLayers }))),
};
