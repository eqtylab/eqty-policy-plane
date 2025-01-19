// src/AgentPolicyPlane/context/types.pipeline.ts

import { NodeState, NodeConfig } from "./types.nodes";
import { GuardrailAlert } from "./types.guardrails";

export type PipelineStatus =
  | "idle"
  | "running"
  | "paused"
  | "completed"
  | "error"
  | "blocked"
  | "cancelled";

export interface PipelineState {
  status: PipelineStatus;
  nodes: Record<string, NodeState>;
  activeGuardrail: GuardrailAlert | null;
  userOverrides: {
    nodeId: string;
    timestamp: number;
    reason: string;
  }[];
  metrics: {
    responseTime: number;
    riskLevel: "low" | "medium" | "high" | "critical";
    activeIncidents: number;
  };
  startTime?: number;
  endTime?: number;
  stats?: {
    totalNodes: number;
    completedNodes: number;
    failedNodes: number;
    blockedNodes: number;
  };
}

export interface PipelineConfig {
  nodes: Record<string, NodeConfig>;
}
