// src/AgentPolicyPlane/context/types.guardrails.ts
export interface GuardrailAlert {
  id: string;
  message: string;
  timestamp: number;
  severity: "warning" | "error";
  nodeId: string;
  controlId: string;
  context?: {
    riskFactors: string[];
    evidenceSnippets: string[];
    recommendedAction: string;
  };
  override?: {
    authorized: boolean;
    authorizedBy?: string;
    timestamp?: number;
    reason?: string;
  };
}
