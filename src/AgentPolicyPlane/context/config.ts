// src/AgentPolicyPlane/context/config.ts


import { OutputType } from './types';

export interface OutputTemplate {
  type: OutputType;
  template: string;
  metadata?: {
    title?: string;
    description?: string;
  };
}

export interface LogTemplate {
  message: string;
  level: 'info' | 'warning' | 'error';
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
  logsToOutput: LogTemplate[];
  outputs?: OutputTemplate[];
  dependencies?: NodeDependency[];
  guardrails?: {
    controlIds: string[]; // References to controls that can block this node
    checkOnStart?: boolean; // Check guardrails before starting
    checkOnComplete?: boolean; // Check guardrails before completing
  };
  tooling?: {
    type: 'llm' | 'vision' | 'notification' | 'osint';
    provider?: 'nemo' | 'anthropic' | 'twilio' | 'apptek';
    config?: Record<string, any>; // Tool-specific configuration
  };

  alertConditions?: {
    type: 'anomaly' | 'risk-level' | 'content-warning';
    threshold?: number;
    triggers?: string[]; // What conditions trigger alerts
  };

  // For nodes that need to merge multiple inputs
  inputMergeStrategy?: 'concat' | 'summarize' | 'prioritize';
}

export interface PipelineConfig {
  nodes: Record<string, NodeConfig>;
  logFrequency?: number; // How often to emit logs (ms)
  guardrailCheckFrequency?: number; // How often to check guardrails (ms)
}