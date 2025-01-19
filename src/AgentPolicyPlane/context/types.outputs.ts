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
  id: string;
  component: OutputType;
  title: string;
  params: {
    content: any;
  };
  metadata?: {
    description?: string;
    timestamp?: number;
  };
}
