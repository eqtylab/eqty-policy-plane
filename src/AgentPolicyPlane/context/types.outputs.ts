// src/AgentPolicyPlane/context/types.outputs.ts
export type OutputType =
  | "markdown"
  | "image"
  | "pdf"
  | "report"
  | "alert"
  | "jsonChart"
  | "toolCall"
  | "videoAnalysis"
  | "osintReport"
  | "riskAssesment"
  | "responsePlan"
  | "toolNotify";

export interface OutputTemplate {
  type: OutputType;
  content: any;
  timestamp?: number;
  metadata?: {
    title?: string;
    description?: string;
  };
}
