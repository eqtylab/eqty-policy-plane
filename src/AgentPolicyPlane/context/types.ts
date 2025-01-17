// src/AgentPolicyPlane/context/types.ts

export type OutputType =
  | 'markdown'
  | 'image'
  | 'pdf'
  | 'report'
  | 'alert'
  | 'json-chart'
  | 'tool-call'
  | 'video-analysis' // Need to add for video processing
  | 'osint-report'   // Specific for OSINT collection
  | 'priority-report' // For the prioritization output
  | 'response-plan'   // For the final response plan
  | 'notification';   // For first responder notifications

export type NodeStatus =
  | 'idle'
  | 'pending'  // Added for nodes waiting on dependencies
  | 'running'
  | 'completed'
  | 'error'
  | 'blocked'
  | 'cancelled'; // Added for handling cancellation

export type PipelineStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'error'
  | 'blocked'  // Added for when guardrails block execution
  | 'cancelled';

// Add metadata to outputs
export interface PipelineOutput {
  type: OutputType;
  content: string;
  timestamp: number;
  metadata?: {
    title?: string;
    description?: string;
    severity?: 'info' | 'warning' | 'error';
  };
}

export interface NodeState {
  status: NodeStatus;
  logs: Array<{
    message: string;
    timestamp: number;
    level: 'info' | 'warning' | 'error';
  }>;
  outputs: PipelineOutput[];
  completedInputs?: string[]; // New field to track dependencies
  startTime?: number;
  endTime?: number;
}

export interface GuardrailAlert {
  id: string;
  message: string;
  timestamp: number;
  severity: 'warning' | 'error';
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
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
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

// New types to add to types.ts
export type NodePhase = 'waiting' | 'ready' | 'running' | 'completed';

export interface NodeStateMetrics {
  phase: NodePhase;
  waitingOn?: string[]; // List of dependency nodeIds still needed
  startTime?: number;
  endTime?: number;
  attempts: number; // For debugging duplicate runs
}