// src/AgentPolicyPlane/context/types.outputs.ts
export type OutputType =
  | "markdown"
  | "image"
  | "pdf"
  | "report"
  | "alert"
  | "json-chart"
  | "tool-call"
  | "video-analysis"
  | "osint-report"
  | "priority-report"
  | "response-plan"
  | "notification";

export interface PipelineOutput {
  type: OutputType;
  content: string;
  timestamp: number;
  metadata?: {
    title?: string;
    description?: string;
    severity?: "info" | "warning" | "error";
  };
}

export interface OutputTemplate {
  type: OutputType;
  template: string;
  metadata?: {
    title?: string;
    description?: string;
  };
}
