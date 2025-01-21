// src/AgentPolicyPlane/context/types.nodes.ts

import { OutputTemplate } from "./types.outputs";
import { LogEntry } from "./types.logs";

export type NodeStatus =
  | "idle"
  | "pending"
  | "running"
  | "completed"
  | "error"
  | "blocked"
  | "cancelled";

export interface NodeState {
  status: NodeStatus;
  logs: LogEntry[];
  outputs: OutputTemplate[];
  completedInputs?: string[];
  startTime?: number;
  endTime?: number;
}

export type NodePhase = "waiting" | "ready" | "running" | "completed";

export interface NodeStateMetrics {
  phase: NodePhase;
  waitingOn?: string[]; // List of dependency nodeIds still needed
  startTime?: number;
  endTime?: number;
  attempts: number;
}

export interface NodeDependency {
  nodeId: string;
  required: boolean; // If false, node can start without this dependency
}

export interface NodeConfig {
  id: string;
  label: string;
  description?: string;
  minDuration: number;
  maxDuration: number;
  logsToOutput: LogEntry[];
  outputs?: OutputTemplate[];
  dependencies?: NodeDependency[];
  guardrails?: {
    controlIds: string[]; // References to controls that can block this node
    checkOnStart?: boolean; // Check guardrails before starting
    checkOnComplete?: boolean; // Check guardrails before completing
  };
  tooling?: {
    type: "llm" | "vision" | "notification" | "osint";
    provider?: "nemo" | "anthropic" | "twilio" | "apptek";
    config?: Record<string, any>; // Tool-specific configuration
  };

  alertConditions?: {
    type: "anomaly" | "risk-level" | "content-warning" | "data-protection";
    threshold?: number;
    triggers?: string[]; // What conditions trigger alerts
  };

  // For nodes that need to merge multiple inputs
  inputMergeStrategy?: "concat" | "summarize" | "prioritize";
}
