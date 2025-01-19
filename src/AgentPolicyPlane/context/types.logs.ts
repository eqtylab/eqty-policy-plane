// src/AgentPolicyPlane/context/types.logs.ts
export type LogLevel =
  | "info"
  | "success"
  | "error"
  | "warning"
  | "agent-complete"
  | "agent-output"
  | "guardrail-pass"
  | "human-override"
  | "critical";

export interface OutputReference {
  type: "markdown" | "json" | "report" | "image" | "video" | "chart";
  id: string;
  location: string; // URL or route to output
}

export interface MetricData {
  executionTime?: number;
  latency?: number;
  apiCalls?: {
    service: string;
    duration: number;
    status: number;
  }[];
}

export interface LogEntry {
  id: number;
  content: string;
  details: string;
  timestamp: string;
  type: LogLevel;
  agent?: {
    id: string;
    name: string;
    type: string;
  };
  output?: OutputReference;
  metrics?: MetricData;
  hash: string; // Cryptographic hash for audit
  expandable?: boolean;
  expanded?: boolean;
}
