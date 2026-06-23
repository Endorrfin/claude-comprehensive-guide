import type React from "react";
import { AgentLoopSim } from "../components/sims/AgentLoopSim";
import { PromptAnatomySim } from "../components/sims/PromptAnatomySim";
import { LiveArtifactDemo } from "../components/sims/LiveArtifactDemo";
import { TokenBudgetSim } from "../components/sims/TokenBudgetSim";
import { McpFlowSim } from "../components/sims/McpFlowSim";
import { ProgressiveDisclosureSim } from "../components/sims/ProgressiveDisclosureSim";
import { ScheduleTimelineSim } from "../components/sims/ScheduleTimelineSim";
import { BrowserAgentLoopSim } from "../components/sims/BrowserAgentLoopSim";
import { SubAgentFanoutSim } from "../components/sims/SubAgentFanoutSim";
import { CoworkArchitecture } from "../components/figures/CoworkArchitecture";
import { CodeArchitecture } from "../components/figures/CodeArchitecture";
import { AgentScales } from "../components/figures/AgentScales";
import { HookLifecycle } from "../components/figures/HookLifecycle";
import { CoworkProject } from "../components/figures/CoworkProject";
import { DispatchFlow } from "../components/figures/DispatchFlow";
import { ExcelCitations } from "../components/figures/ExcelCitations";
import { McpArchitecture } from "../components/figures/McpArchitecture";
import { SkillAnatomy } from "../components/figures/SkillAnatomy";
import { SkillBuildPipeline } from "../components/figures/SkillBuildPipeline";
import { PluginBundle } from "../components/figures/PluginBundle";
import { ProjectWorkspace } from "../components/figures/ProjectWorkspace";
import { ChatArtifactPanel } from "../components/figures/ChatArtifactPanel";
import { LiveArtifactFlow } from "../components/figures/LiveArtifactFlow";
import { ContextWindow } from "../components/figures/ContextWindow";
import { FileFlow } from "../components/figures/FileFlow";
import { ActingTiers } from "../components/figures/ActingTiers";
import { ClaudeMentalModel } from "../components/figures/ClaudeMentalModel";
import { WhereClaudeLives } from "../components/figures/WhereClaudeLives";
import { InterfaceMap } from "../components/figures/InterfaceMap";
import { PromptFlow } from "../components/figures/PromptFlow";
import { StylePipeline } from "../components/figures/StylePipeline";
import { MemoryAcrossSessions } from "../components/figures/MemoryAcrossSessions";

/** Interactive widgets, referenced by key from concepts.ts blocks (kind: 'sim'). */
export const SIMS: Record<string, React.FC> = {
  "agent-loop": AgentLoopSim,
  "prompt-anatomy": PromptAnatomySim,
  "live-artifact-demo": LiveArtifactDemo,
  "token-budget": TokenBudgetSim,
  "mcp-flow": McpFlowSim,
  "progressive-disclosure": ProgressiveDisclosureSim,
  "schedule-timeline": ScheduleTimelineSim,
  "browser-agent-loop": BrowserAgentLoopSim,
  "sub-agent-fanout": SubAgentFanoutSim,
};

/** Static diagrams, referenced by key from concepts.ts blocks (kind: 'figure'). */
export const FIGURES: Record<string, React.FC> = {
  "claude-mental-model": ClaudeMentalModel,
  "where-claude-lives": WhereClaudeLives,
  "interface-map": InterfaceMap,
  "prompt-flow": PromptFlow,
  "style-pipeline": StylePipeline,
  "memory-across-sessions": MemoryAcrossSessions,
  "cowork-architecture": CoworkArchitecture,
  "project-workspace": ProjectWorkspace,
  "chat-artifact-panel": ChatArtifactPanel,
  "live-artifact-flow": LiveArtifactFlow,
  "context-window": ContextWindow,
  "file-flow": FileFlow,
  "acting-tiers": ActingTiers,
  "code-architecture": CodeArchitecture,
  "agent-scales": AgentScales,
  "hook-lifecycle": HookLifecycle,
  "cowork-project": CoworkProject,
  "dispatch-flow": DispatchFlow,
  "excel-citations": ExcelCitations,
  "mcp-architecture": McpArchitecture,
  "skill-anatomy": SkillAnatomy,
  "skill-build-pipeline": SkillBuildPipeline,
  "plugin-bundle": PluginBundle,
};
