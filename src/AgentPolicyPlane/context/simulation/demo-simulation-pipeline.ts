// src/AgentPolicyPlane/context/simulation/demo-simulation-pipeline.ts

import { PipelineConfig } from "../types.pipeline";
import { NodeConfig } from "../types.nodes";

import {
  OUTPUT_1,
  OUTPUT_2,
  OUTPUT_3,
  OUTPUT_4,
  OUTPUT_5,
  OUTPUT_6,
  OUTPUT_7,
  OUTPUT_8,
} from "./simulated-outputs";

const nodes: Record<string, NodeConfig> = {
  start: {
    id: "start",
    label: "Start",
    description: "Pipeline entry point",
    minDuration: 1000,
    maxDuration: 2000,
    outputs: [],
    logsToOutput: [
      {
        id: 9,
        content: "Human Override Required",
        details: "High-risk scenario detected - requires manual authorization",
        timestamp: "14:01:30",
        type: "warning",
        agent: {
          id: "policy-1",
          name: "Policy Override Validator",
          type: "policy-validator",
        },
        expandable: true,
        hash: "bakY7wf3b4a2",
      },
      {
        id: 10,
        content: "Human Override Granted",
        details: "Emergency response protocol override approved by operator",
        timestamp: "14:02:00",
        type: "human-override",
        metrics: {
          executionTime: 500,
        },
        expandable: true,
        hash: "bak6f2Y7e3a4",
      },
      {
        id: 1,
        content: "Pipeline execution started",
        details: "Initializing concurrent data collection paths",
        timestamp: "14:00:00",
        type: "info",
        hash: "bakk09F4w1dH",
        expandable: true,
      },
    ],
  },
  // Video Processing Branch
  video: {
    id: "video",
    label: "Collect video footage",
    description: "Collects and processes video feeds from surveillance systems",
    minDuration: 5000,
    maxDuration: 15000,
    logsToOutput: [
      {
        id: 2,
        content: "Video Feed Collector established connection",
        details:
          "Successfully connected to surveillance network - streaming from 8 critical flood zone cameras",
        timestamp: "14:00:02",
        type: "info",
        agent: {
          id: "video-1",
          name: "Video Feed Collector",
          type: "video-collector",
        },
        metrics: {
          executionTime: 1850,
          apiCalls: [
            {
              service: "surveillance-api",
              duration: 1200,
              status: 200,
            },
          ],
        },
        expandable: true,
        hash: "bak1a2k3e4d5",
      },
    ],
    outputs: [
      // {
      //   type: "video-analysis",
      //   content: "Raw video feed data",
      //   metadata: {
      //     title: "Surveillance Feed Analysis",
      //   },
      // },
    ],
    tooling: {
      type: "vision",
      provider: "nemo",
    },
  },

  analyze: {
    id: "analyze",
    label: "Analyze Footage",
    description: "Uses NVIDIA mixed-modal LLMs to analyze video content",
    minDuration: 10000,
    maxDuration: 20000,
    dependencies: [
      {
        nodeId: "video",
        required: true,
      },
    ],
    logsToOutput: [
      {
        id: 3,
        content: "Video Analysis Complete",
        details:
          "NVIDIA mixed-modal LLM analysis detected rising water levels in zones A3 and B2",
        timestamp: "14:00:45",
        type: "agent-complete",
        agent: {
          id: "analyze-1",
          name: "Video Analyzer",
          type: "video-analyzer",
        },
        output: {
          type: "report",
          id: "video-analysis-001",
          location: "/outputs/video/001",
        },
        expandable: true,
        hash: "baklf7600a2r",
      },
    ],
    outputs: [
      {
        id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        title: "Video Feed Analysis",
        component: "markdown",
        params: { content: OUTPUT_1 },
        metadata: {
          description: "Detailed analysis of visual content and events",
        },
      },
    ],
    tooling: {
      type: "vision",
      provider: "nemo",
      config: {
        modelType: "mixed-modal",
      },
    },
  },

  // OSINT Collection Branch
  partner: {
    id: "partner",
    label: "Partner Report (Paramedic/Fire)",
    description: "Collects reports from local EMS stations",
    minDuration: 3000,
    maxDuration: 8000,
    logsToOutput: [
      {
        id: 4,
        content: "Partner Report Collection Started",
        details: "Retrieving reports from 5 local EMS stations",
        timestamp: "14:00:03",
        type: "info",
        agent: {
          id: "partner-1",
          name: "Partner Report Analyzer",
          type: "partner-analyzer",
        },
        expandable: true,
        hash: "bak3a4k5e88q",
      },
    ],
    outputs: [
      {
        id: "e817b187-aba3-4b0d-a34e-a1d82319627c",
        title: "Partner Reports (EMS/Fire)",
        component: "markdown",
        params: { content: OUTPUT_2 },
      },
    ],
    tooling: {
      type: "osint",
      provider: "anthropic",
    },
  },

  calls: {
    id: "calls",
    label: "Calls for service",
    description: "Monitors dispatch logs and analyzes call patterns",
    minDuration: 4000,
    maxDuration: 10000,
    logsToOutput: [
      {
        id: 5,
        content: "Service Call Analysis Alert",
        details:
          "Detected 300% increase in water-related emergency calls in past 15 minutes",
        timestamp: "14:00:15",
        type: "warning",
        agent: {
          id: "calls-1",
          name: "Service Call Analyzer",
          type: "service-call-analyzer",
        },
        output: {
          type: "chart",
          id: "call-pattern-001",
          location: "/outputs/calls/patterns/001",
        },
        expandable: true,
        hash: "bak5a6k7e8d9",
      },
    ],
    outputs: [
      {
        id: "ce3b39d8-1bae-4ed3-b4db-2a74658f0d85",
        title: "Emergency Call Analysis",
        component: "jsonChart",
        params: { content: OUTPUT_3 },
      },
    ],
    alertConditions: {
      type: "anomaly",
      threshold: 0.75,
      triggers: ["high-call-volume", "pattern-change"],
    },
    tooling: {
      type: "osint",
      provider: "anthropic",
    },
  },

  social: {
    id: "social",
    label: "Social Media",
    description: "Monitors social media for distress signals",
    minDuration: 5000,
    maxDuration: 12000,
    logsToOutput: [
      {
        id: 6,
        content: "Social Media Monitor Alert",
        details:
          "Multiple verified distress calls detected on Twitter and Telegram in downtown area",
        timestamp: "14:00:20",
        type: "warning",
        agent: {
          id: "social-1",
          name: "Social Media Monitor",
          type: "social-monitor",
        },
        expandable: true,
        hash: "bak0a1k2e3d4",
      },
    ],
    outputs: [
      {
        id: "14c18af1-a352-45e6-976e-3c194bdc6ee8",
        title: "Social Media Distress Signals",
        component: "markdown",
        params: { content: OUTPUT_4 },
      },
    ],
    tooling: {
      type: "osint",
      provider: "anthropic",
    },
  },

  // Aggregation and Analysis
  summary: {
    id: "summary",
    label: "Summary Key Events",
    description: "Aggregates and summarizes all collected information",
    minDuration: 8000,
    maxDuration: 15000,
    dependencies: [
      { nodeId: "partner", required: true },
      { nodeId: "calls", required: true },
      { nodeId: "social", required: true },
    ],
    inputMergeStrategy: "summarize",
    logsToOutput: [
      {
        id: 7,
        content: "OSINT Summary Generated",
        details: "Compiled emergency situation report from all OSINT sources",
        timestamp: "14:01:00",
        type: "agent-output",
        agent: {
          id: "summary-1",
          name: "Information Summarizer",
          type: "summarizer",
        },
        output: {
          type: "markdown",
          id: "osint-summary-001",
          location: "/outputs/summary/001",
        },
        expandable: true,
        hash: "bak4a5k6e7d8",
      },
    ],
    outputs: [
      {
        id: "f303866d-d08a-48a7-81c3-c30486149d87",
        title: "Situation Summary",
        component: "markdown",
        params: { content: OUTPUT_5 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
  },

  remediate: {
    id: "remediate",
    label: "Validate PII protection measures",
    description: "GDPR Article 25 compliance checkpoint for data protection",
    minDuration: 2000,
    maxDuration: 4000,
    dependencies: [{ nodeId: "prioritize", required: true }],
    guardrails: {
      controlIds: ["ctrl-9"], // Maps to the "Data Protection Protocol" control
      checkOnStart: true,
      checkOnComplete: true,
    },
    alertConditions: {
      type: "data-protection",
      triggers: [
        "unprotected-pii-detected",
        "sensitive-data-exposure",
        "insufficient-encryption",
        "missing-data-minimization",
        "unauthorized-data-access",
      ],
    },

    logsToOutput: [],
  },

  "nemo-guardrail1": {
    id: "nemo-guardrail1",
    label: "Nemo Guardrail",
    description: "Analyzes risk factors and validates response necessity",
    minDuration: 3000,
    maxDuration: 7000,
    dependencies: [{ nodeId: "summary", required: true }],
    guardrails: {
      controlIds: ["ctrl-1", "ctrl-2", "ctrl-3"],
      checkOnComplete: true,
    },
    tooling: {
      type: "llm",
      provider: "nemo",
    },
    logsToOutput: [
      {
        id: 8,
        content: "Nemo Guardrail Check Initiated",
        details: "Analyzing risk factors and validating response necessity",
        timestamp: "14:01:15",
        type: "info",
        agent: {
          id: "nemo-1",
          name: "Nemo Guardrail",
          type: "nemo-guardrail",
        },
        expandable: true,
        hash: "bak9a0k1e2d3",
      },
    ],
    alertConditions: {
      type: "risk-level",
      threshold: 0.7,
      triggers: [
        "life-safety-risk",
        "misinformation-detected",
        "rapid-escalation",
      ],
    },
    outputs: [
      // {
      //   type: "alert",
      //   content: "guardrail-assessment",
      //   metadata: {
      //     title: "Risk Assessment Report",
      //   },
      // },
    ],
  },

  prioritize: {
    id: "prioritize",
    label: "Prioritize event on need and impact",
    description: "Analyzes severity and determines response priorities",
    minDuration: 6000,
    maxDuration: 12000,
    dependencies: [
      { nodeId: "nemo-guardrail1", required: true },
      { nodeId: "analyze", required: true },
    ],
    inputMergeStrategy: "prioritize",
    outputs: [
      {
        id: "e5836695-f2d0-47f4-86e8-d0dbaae4031a",
        title: "Priority Risk Assessment",
        component: "riskAssesment",
        params: { content: OUTPUT_6 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 19,
        content: "Event Prioritization Complete",
        details: "Analyzed risk factors and determined response priorities",
        timestamp: "14:01:30",
        type: "agent-complete",
        agent: {
          id: "prioritize-1",
          name: "Event Prioritizer",
          type: "event-prioritizer",
        },
        output: {
          type: "report",
          id: "priority-report-001",
          location: "/outputs/priorities/001",
        },
        expandable: true,
        hash: "bak2a3k4e5d6",
      },
    ],
  },

  reconfirm: {
    id: "reconfirm",
    label: "Grant AI-driven action in high-risk scenario",
    description: "Human approval checkpoint for high-risk scenarios",
    minDuration: 1000,
    maxDuration: 3000,
    dependencies: [{ nodeId: "prioritize", required: true }],
    guardrails: {
      controlIds: ["ctrl-3"], // Maps to the "Sourcing Protocol" control
      checkOnStart: true,
      checkOnComplete: true,
    },
    alertConditions: {
      type: "risk-level",
      threshold: 0.8,
      triggers: [
        "high-risk-scenario",
        "human-life-risk",
        "misinformation-risk",
      ],
    },
    logsToOutput: [],
  },

  plan: {
    id: "plan",
    label: "Establish the response plan",
    description: "Creates formal response plan documentation",
    minDuration: 8000,
    maxDuration: 15000,
    dependencies: [{ nodeId: "reconfirm", required: true }],
    outputs: [
      {
        id: "d22ec671-806a-4db2-8c60-f0f8754f9b7b",
        title: "Response Plan",
        component: "markdown",
        params: { content: OUTPUT_7 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 11,
        content: "Response Plan Generated",
        details: "Comprehensive emergency response plan created",
        timestamp: "14:02:30",
        type: "agent-complete",
        agent: {
          id: "plan-1",
          name: "Response Plan Creator",
          type: "plan-creator",
        },
        output: {
          type: "report",
          id: "response-plan-001",
          location: "/outputs/plans/001",
        },
        expandable: true,
        hash: "bak2a3k4e5d6",
      },
    ],
  },

  notify: {
    id: "notify",
    label: "Notify First Responders",
    description: "Dispatches notifications through multiple channels",
    minDuration: 5000,
    maxDuration: 10000,
    dependencies: [{ nodeId: "plan", required: true }],
    outputs: [
      {
        id: "108eb93a-071e-4407-8b78-a73aabd9e803",
        title: "First Responder Notifications",
        component: "toolNotify",
        params: { content: OUTPUT_8 },
      },
    ],
    tooling: {
      type: "notification",
      provider: "twilio",
    },
    logsToOutput: [
      {
        id: 12,
        content: "First Responder Notification Complete",
        details:
          "Successfully notified all emergency response units via Twilio and Apptek",
        timestamp: "14:03:00",
        type: "success",
        agent: {
          id: "notify-1",
          name: "First Responder Notifier",
          type: "responder-notifier",
        },
        metrics: {
          apiCalls: [
            {
              service: "twilio-api",
              duration: 800,
              status: 200,
            },
            {
              service: "apptek-api",
              duration: 600,
              status: 200,
            },
          ],
        },
        expandable: true,
        hash: "bak7a8k9e0d1",
      },
    ],
  },

  end: {
    id: "end",
    label: "End",
    description: "Pipeline completion",
    minDuration: 1000,
    maxDuration: 2000,
    dependencies: [{ nodeId: "notify", required: true }],
    logsToOutput: [],
  },
};

export const pipelineConfig: PipelineConfig = {
  nodes,
};
