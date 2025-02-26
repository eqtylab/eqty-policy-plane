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
  OUTPUT_9,
  OUTPUT_10,
  OUTPUT_11,
  OUTPUT_12,
  OUTPUT_13,
  OUTPUT_14,
  OUTPUT_15,
  OUTPUT_16,
} from "./simulated-outputs";

const nodes: Record<string, NodeConfig> = {
  // Initial intelligence intake
  "claimant-details": {
    id: "claimant-details",
    label: "Source Intelligence Details",
    description:
      "Collects and processes detailed information from field operatives and intelligence sources",
    minDuration: 4000,
    maxDuration: 10000,
    logsToOutput: [
      {
        id: 101,
        content: "Field Intelligence Collection Complete",
        details:
          "Successfully processed raw intelligence from 5 field operatives in eastern border region",
        timestamp: "08:45:20",
        type: "success",
        agent: {
          id: "source-intel-1",
          name: "Field Intelligence Processor",
          type: "intel-collector",
        },
        metrics: {
          executionTime: 7850,
          apiCalls: [
            {
              service: "secure-comms-api",
              duration: 2200,
              status: 200,
            },
          ],
        },
        expandable: true,
        hash: "int1a2k3e4d5",
      },
    ],

    outputs: [
      {
        id: "a1eb3c99-1c0b-4ef8-bb6d-6bb9bd380a11",
        title: "Source Intelligence Report",
        component: "markdown",
        params: { content: OUTPUT_1 },
        metadata: {
          description:
            "Comprehensive details from intelligence source perspective",
        },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
  },

  "claimant-media": {
    id: "claimant-media",
    label: "SIGINT Media",
    description:
      "Processes communications, electronic emissions, and digital transmissions for national security",
    minDuration: 5000,
    maxDuration: 12000,
    logsToOutput: [
      {
        id: 102,
        content: "SIGINT Collection Active",
        details:
          "Monitoring 14 frequency bands for communications, electronic emissions, and digital transmissions",
        timestamp: "09:10:05",
        type: "info",
        agent: {
          id: "sigint-1",
          name: "Signals Intelligence Processor",
          type: "signals-collector",
        },
        metrics: {
          executionTime: 8450,
          apiCalls: [
            {
              service: "crypto-analysis-api",
              duration: 3800,
              status: 200,
            },
          ],
        },
        expandable: true,
        hash: "sig5a6k7e8d9",
      },
    ],
    outputs: [
      {
        id: "b27f1187-aba3-4b0d-a34e-a1d82319627c",
        title: "SIGINT Analysis",
        component: "markdown",
        params: { content: OUTPUT_2 },
        metadata: {
          description: "Analysis of signals intelligence gathered from sources",
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

  "triage-claims": {
    id: "triage-claims",
    label: "Intelligence Triage",
    description:
      "Categorizes and prioritizes intelligence based on credibility, relevance, and time-sensitivity",
    minDuration: 3000,
    maxDuration: 9000,
    dependencies: [
      { nodeId: "claimant-details", required: true },
      { nodeId: "claimant-media", required: true },
    ],
    inputMergeStrategy: "prioritize",
    logsToOutput: [
      {
        id: 103,
        content: "Priority Intelligence Alert",
        details:
          "Multiple high-priority indicators detected in eastern border region",
        timestamp: "09:18:45",
        type: "warning",
        agent: {
          id: "triage-1",
          name: "Intelligence Prioritization System",
          type: "triage-system",
        },
        metrics: {},
        expandable: true,
        hash: "tri9a0k1e2d3",
      },
    ],
    outputs: [
      {
        id: "c3b39d8-1bae-4ed3-b4db-2a74658f0d85",
        title: "Intelligence Triage Assessment",
        component: "jsonChart",
        params: { content: OUTPUT_3 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
  },

  // Evidence collection branches
  "witness-evidence": {
    id: "witness-evidence",
    label: "HUMINT Reports",
    description: "Collects and analyzes human intelligence reports",
    minDuration: 8000,
    maxDuration: 18000,
    logsToOutput: [
      {
        id: 104,
        content: "HUMINT Source Reports Processed",
        details:
          "3 high-reliability sources confirm military mobilization in target region",
        timestamp: "09:30:10",
        type: "agent-output",
        agent: {
          id: "humint-1",
          name: "Human Intelligence Processor",
          type: "humint-analyst",
        },
        output: {
          type: "markdown",
          id: "humint-analysis-001",
          location: "/outputs/humint/001",
        },
        expandable: true,
        hash: "hum4a5k6e7d8",
      },
    ],
    outputs: [
      {
        id: "d4c18af1-a352-45e6-976e-3c194bdc6ee8",
        title: "HUMINT Analysis",
        component: "markdown",
        params: { content: OUTPUT_4 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
  },

  "other-parties-media": {
    id: "other-parties-media",
    label: "Allied Intel Sharing",
    description:
      "Manages intelligence shared by NATO allies and partner nations",
    minDuration: 6000,
    maxDuration: 14000,
    logsToOutput: [
      {
        id: 105,
        content: "NATO Intelligence Exchange Complete",
        details:
          "Intelligence received from 3 alliance partners confirming activity patterns",
        timestamp: "09:45:30",
        type: "info",
        agent: {
          id: "allied-1",
          name: "Allied Information Exchange",
          type: "intel-exchange",
        },

        expandable: true,
        hash: "all8a9k0e1d2",
      },
    ],
    outputs: [
      {
        id: "e5303866d-d08a-48a7-81c3-c30486149d87",
        title: "Allied Intelligence Analysis",
        component: "markdown",
        params: { content: OUTPUT_5 },
      },
    ],
    tooling: {
      type: "vision",
      provider: "nemo",
    },
  },

  cctv: {
    id: "cctv",
    label: "Geospatial Intelligence",
    description:
      "Processes satellite imagery, drone footage, and other geospatial data",
    minDuration: 7000,
    maxDuration: 16000,
    logsToOutput: [
      {
        id: 106,
        content: "GEOINT Analysis Complete",
        details:
          "Satellite and drone footage analysis reveals significant military movements",
        timestamp: "10:00:15",
        type: "success",
        agent: {
          id: "geoint-1",
          name: "Geospatial Intelligence Processor",
          type: "imagery-analyst",
        },

        expandable: true,
        hash: "geo3a4k5e6d7",
      },
    ],
    outputs: [
      {
        id: "f6836695-f2d0-47f4-86e8-d0dbaae4031a",
        title: "GEOINT Analysis",
        component: "jsonChart",
        params: { content: OUTPUT_6 },
      },
    ],
    tooling: {
      type: "vision",
      provider: "nemo",
      config: {
        modelType: "video-analytics",
      },
    },
  },

  "other-media": {
    id: "other-media",
    label: "OSINT Collection",
    description:
      "Gathers and analyzes open-source intelligence from public domains",
    minDuration: 5000,
    maxDuration: 15000,
    logsToOutput: [
      {
        id: 107,
        content: "Open Source Intelligence Gathered",
        details:
          "Analysis of social media, news outlets, and public data shows corroborating patterns",
        timestamp: "10:10:40",
        type: "info",
        agent: {
          id: "osint-1",
          name: "Open Source Collector",
          type: "osint-monitor",
        },

        expandable: true,
        hash: "osi7a8k9e0d1",
      },
    ],
    outputs: [
      {
        id: "g7ec671-806a-4db2-8c60-f0f8754f9b7b",
        title: "OSINT Analysis",
        component: "markdown",
        params: { content: OUTPUT_7 },
      },
    ],
    tooling: {
      type: "vision",
      provider: "nemo",
    },
  },

  "police-report": {
    id: "police-report",
    label: "Law Enforcement Data",
    description: "Coordinates with domestic and international law enforcement",
    minDuration: 6000,
    maxDuration: 12000,
    logsToOutput: [
      {
        id: 108,
        content: "Law Enforcement Intelligence Received",
        details: "Border security reports confirm unusual patterns of activity",
        timestamp: "10:15:20",
        type: "info",
        agent: {
          id: "lawenf-1",
          name: "Law Enforcement Liaison",
          type: "le-coordinator",
        },

        expandable: true,
        hash: "law2a3k4e5d6",
      },
    ],
    outputs: [
      {
        id: "h8eb93a-071e-4407-8b78-a73aabd9e803",
        title: "Law Enforcement Data Analysis",
        component: "jsonChart",
        params: { content: OUTPUT_8 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
  },

  // Evidence aggregation
  "group-evidence": {
    id: "group-evidence",
    label: "Intelligence Fusion",
    description:
      "Aggregates intelligence from multiple sources into a cohesive operational picture",
    minDuration: 5000,
    maxDuration: 10000,
    dependencies: [
      { nodeId: "witness-evidence", required: false },
      { nodeId: "other-parties-media", required: false },
      { nodeId: "cctv", required: false },
      { nodeId: "other-media", required: false },
      { nodeId: "police-report", required: false },
    ],

    logsToOutput: [
      {
        id: 109,
        content: "Multi-Source Intelligence Fusion Complete",
        details:
          "Comprehensive intelligence picture generated from all collection sources",
        timestamp: "10:25:10",
        type: "success",
        agent: {
          id: "fusion-1",
          name: "Intelligence Fusion Engine",
          type: "intel-integrator",
        },

        expandable: true,
        hash: "fus6a7k8e9d0",
      },
    ],
    outputs: [
      {
        id: "i9eebc99-9c0b-4ef8-bb6d-6bb9bd380b22",
        title: "Consolidated Intelligence Package",
        component: "markdown",
        params: { content: OUTPUT_9 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
  },

  "guardrail-1": {
    id: "guardrail-1",
    label: "Validate Classification and Legal Compliance",
    description:
      "Ensures intelligence handling complies with relevant laws and classification protocols",
    minDuration: 2000,
    maxDuration: 4000,
    dependencies: [{ nodeId: "group-evidence", required: true }],
    guardrails: {
      controlIds: ["guardrail-1"], // Maps to the "Data Protection Protocol" control
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
    logsToOutput: [
      {
        id: 110,
        content: "Classification Compliance Check Complete",
        details:
          "All intelligence properly classified according to handling requirements",
        timestamp: "10:28:45",
        type: "success",
        agent: {
          id: "compliance-1",
          name: "Classification Validator",
          type: "compliance-monitor",
        },

        expandable: true,
        hash: "cla1a2k3e4d5",
      },
    ],
  },

  "analyze-data": {
    id: "analyze-data",
    label: "Pattern and Anomaly Detection",
    description:
      "Applies advanced analytics to identify patterns, anomalies, and correlations",
    minDuration: 10000,
    maxDuration: 20000,
    dependencies: [
      { nodeId: "triage-claims", required: true },
      { nodeId: "guardrail-1", required: true },
    ],
    outputs: [
      {
        id: "j10c18af1-a352-45e6-976e-3c194bdc6f99",
        title: "Intelligence Pattern Analysis",
        component: "markdown",
        params: { content: OUTPUT_10 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
      config: {
        modelType: "analysis",
      },
    },
    logsToOutput: [
      {
        id: 111,
        content: "Pattern Recognition Alert",
        details: "87% pattern match with April 2024 border incursion detected",
        timestamp: "10:45:30",
        type: "warning",
        agent: {
          id: "pattern-1",
          name: "Pattern Analysis System",
          type: "analytics-engine",
        },
        expandable: true,
        hash: "pat5a6k7e8d9",
      },
    ],
  },

  "verify-policy": {
    id: "verify-policy",
    label: "Verify National Security Priorities Alignment",
    description:
      "Evaluates intelligence against current national security directives",
    minDuration: 7000,
    maxDuration: 14000,
    dependencies: [{ nodeId: "analyze-data", required: true }],
    outputs: [
      {
        id: "k11eb3c99-1c0b-4ef8-bb6d-6bb9bd380c33",
        title: "Security Priority Assessment",
        component: "markdown",
        params: { content: OUTPUT_11 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 112,
        content: "Security Priority Alignment Confirmed",
        details:
          "Intelligence situation directly aligns with National Priority #1: Border Security",
        timestamp: "11:15:20",
        type: "info",
        agent: {
          id: "priority-1",
          name: "Security Priority Validator",
          type: "policy-validator",
        },

        expandable: true,
        hash: "pri9a0k1e2d3",
      },
    ],
  },

  "estimate-costs": {
    id: "estimate-costs",
    label: "Threat Assessment",
    description:
      "Evaluates potential threats based on capability, intent, and opportunity",
    minDuration: 6000,
    maxDuration: 12000,
    dependencies: [{ nodeId: "verify-policy", required: true }],
    outputs: [
      {
        id: "l12f1187-aba3-4b0d-a34e-a1d82319627d",
        title: "Threat Assessment Report",
        component: "jsonChart",
        params: { content: OUTPUT_12 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 113,
        content: "Threat Assessment Complete",
        details: "Severe threat level determined with high confidence",
        timestamp: "11:30:40",
        type: "warning",
        agent: {
          id: "threat-1",
          name: "Threat Analysis System",
          type: "threat-assessor",
        },

        expandable: true,
        hash: "thr4a5k6e7d8",
      },
    ],
  },

  "guardrail-2": {
    id: "guardrail-2",
    label: "Authorization for Sensitive Operations",
    description:
      "Ensures proper oversight for high-risk intelligence operations",
    minDuration: 3000,
    maxDuration: 6000,
    dependencies: [{ nodeId: "estimate-costs", required: true }],
    guardrails: {
      controlIds: ["guardrail-2"], // Maps to high-value claims control
      checkOnStart: true,
      checkOnComplete: true,
    },
    alertConditions: {
      type: "data-protection",
      threshold: 0.75,
      triggers: ["high-value-claim", "complex-liability", "potential-fraud"],
    },
    logsToOutput: [
      {
        id: 114,
        content: "Senior Authority Approval Required",
        details:
          "Intelligence assessment requires senior leadership authorization",
        timestamp: "11:35:10",
        type: "guardrail-pass",
        agent: {
          id: "auth-1",
          name: "Operations Authorization Monitor",
          type: "oversight-system",
        },

        expandable: true,
        hash: "aut8a9k0e1d2",
      },
    ],
  },

  "offer-care": {
    id: "offer-care",
    label: "Source Protection Assessment",
    description:
      "Identifies operational security risks and protection measures for sources",
    minDuration: 4000,
    maxDuration: 8000,
    dependencies: [{ nodeId: "triage-claims", required: true }],
    outputs: [
      {
        id: "m13b39d8-1bae-4ed3-b4db-2a74658f0d85",
        title: "Source Protection Plan",
        component: "markdown",
        params: { content: OUTPUT_13 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 115,
        content: "Source Protection Measures Implemented",
        details:
          "Protective protocols activated for 3 high-risk HUMINT sources",
        timestamp: "11:40:30",
        type: "info",
        agent: {
          id: "protection-1",
          name: "Source Security System",
          type: "asset-protector",
        },

        expandable: true,
        hash: "pro3a4k5e6d7",
      },
    ],
  },

  "generate-plan": {
    id: "generate-plan",
    label: "Generate Intelligence Product",
    description: "Synthesizes complex intelligence into actionable reports",
    minDuration: 8000,
    maxDuration: 15000,
    dependencies: [
      { nodeId: "guardrail-2", required: true },
      { nodeId: "offer-care", required: true },
    ],
    outputs: [
      {
        id: "n14c18af1-a352-45e6-976e-3c194bdc6e88",
        title: "Intelligence Product",
        component: "markdown",
        params: { content: OUTPUT_14 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 116,
        content: "Intelligence Product Generated",
        details:
          "Comprehensive intelligence assessment with recommendations completed",
        timestamp: "11:55:15",
        type: "success",
        agent: {
          id: "product-1",
          name: "Intelligence Product Generator",
          type: "intel-synthesizer",
        },

        expandable: true,
        hash: "pro7a8k9e0d1",
      },
    ],
  },

  "notify-agent": {
    id: "notify-agent",
    label: "Disseminate to Decision Makers",
    description:
      "Ensures intelligence products reach appropriate decision-makers",
    minDuration: 3000,
    maxDuration: 7000,
    dependencies: [{ nodeId: "generate-plan", required: true }],
    outputs: [
      {
        id: "o15303866d-d08a-48a7-81c3-c30486149d87",
        title: "Decision Maker Notification Package",
        component: "toolNotify",
        params: { content: OUTPUT_15 },
      },
    ],
    tooling: {
      type: "notification",
      provider: "twilio",
    },
    logsToOutput: [
      {
        id: 117,
        content: "Intelligence Dissemination Complete",
        details:
          "Priority intelligence successfully delivered to Joint Operations Command",
        timestamp: "12:00:40",
        type: "success",
        agent: {
          id: "dissem-1",
          name: "Intelligence Disseminator",
          type: "intel-distributor",
        },
        metrics: {
          apiCalls: [
            {
              service: "secure-notification-api",
              duration: 800,
              status: 200,
            },
            {
              service: "command-portal-api",
              duration: 650,
              status: 200,
            },
          ],
        },
        expandable: true,
        hash: "dis2a3k4e5d6",
      },
    ],
  },

  "guardrail-check3": {
    id: "guardrail-check3",
    label: "Human Verification of Intelligence Assessment",
    description:
      "Ensures qualified intelligence professionals review automated assessments",
    minDuration: 5000,
    maxDuration: 10000,
    dependencies: [{ nodeId: "notify-agent", required: true }],
    guardrails: {
      controlIds: ["ctrl-7"], // Maps to human oversight control
      checkOnStart: true,
      checkOnComplete: true,
    },
    alertConditions: {
      type: "content-warning",
      threshold: 0.6,
      triggers: [
        "incomplete-review",
        "automated-decision-override",
        "missing-authorization",
      ],
    },
    logsToOutput: [
      {
        id: 118,
        content: "Human Analyst Verification Complete",
        details:
          "Senior intelligence officer has reviewed and validated assessment",
        timestamp: "12:10:20",
        type: "success",
        agent: {
          id: "verify-1",
          name: "Human Oversight Validator",
          type: "verification-system",
        },

        expandable: true,
        hash: "ver6a7k8e9d0",
      },
    ],
  },

  "generate-summary": {
    id: "generate-summary",
    label: "Generate Brief for Joint Operations",
    description:
      "Compiles finalized intelligence into standardized formats for joint operations",
    minDuration: 5000,
    maxDuration: 10000,
    dependencies: [{ nodeId: "guardrail-check3", required: true }],
    outputs: [
      {
        id: "p16836695-f2d0-47f4-86e8-d0dbaae4031a",
        title: "Joint Operations Intelligence Brief",
        component: "markdown",
        params: { content: OUTPUT_16 },
      },
    ],
    tooling: {
      type: "llm",
      provider: "anthropic",
    },
    logsToOutput: [
      {
        id: 119,
        content: "Joint Operations Brief Generated",
        details:
          "NATO-compatible intelligence brief created for allied operations",
        timestamp: "12:20:15",
        type: "success",
        agent: {
          id: "brief-1",
          name: "Joint Operations Briefer",
          type: "brief-generator",
        },

        expandable: true,
        hash: "bri1a2k3e4d5",
      },
    ],
  },
};

export const pipelineConfig: PipelineConfig = {
  nodes,
};
