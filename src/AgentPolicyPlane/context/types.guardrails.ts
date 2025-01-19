// src/AgentPolicyPlane/context/types.guardrails.ts
export interface GuardrailAlert {
  id: string;
  message: string;
  timestamp: number;
  severity: "warning" | "error";
  nodeId: string; // Reference to the node that triggered the guardrail
  controlId: string; // Reference to the control that was violated
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
