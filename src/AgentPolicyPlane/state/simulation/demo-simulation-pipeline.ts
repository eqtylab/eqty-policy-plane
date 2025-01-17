// src/AgentPolicyPlane/state/simulation/demo-simulation-pipeline.ts
import { PipelineConfig, NodeConfig, LogTemplate } from '../config';
import { OutputType, } from '../types'; // WE FORGOT TO USE THIS????

// Common log templates that many nodes might use
const commonLogs: LogTemplate[] = [
    {
        message: "Starting processing...",
        level: "info",

    },
    {
        message: "Processing complete",
        level: "info",

    }
];


const nodes: Record<string, NodeConfig> = {
    "start": {
        id: "start",
        label: "Start",
        description: "Pipeline entry point",
        minDuration: 1000,
        maxDuration: 2000,
        outputs: [],
        logsToOutput: [
            {
                message: "Starting pipeline",
                level: "info",
            }
        ]
    },
    // Video Processing Branch
    "video": {
        id: "video",
        label: "Collect video footage",
        description: "Collects and processes video feeds from surveillance systems",
        minDuration: 5000,
        maxDuration: 15000,
        logsToOutput: [
            ...commonLogs,
            {
                message: "Receiving video feed stream",
                level: "info",

            }
        ],
        outputs: [
            {
                type: "video-analysis",
                template: "Raw video feed data",
                metadata: {
                    title: "Surveillance Feed Analysis"
                }
            }
        ],
        tooling: {
            type: "vision",
            provider: "nemo"
        }
    },

    "analyze": {
        id: "analyze",
        label: "Analyze Footage",
        description: "Uses NVIDIA mixed-modal LLMs to analyze video content",
        minDuration: 10000,
        maxDuration: 20000,
        dependencies: [{
            nodeId: "video",
            required: true
        }],
        logsToOutput: [
            ...commonLogs,
            {
                message: "Running mixed-modal analysis",
                level: "info",

            }
        ],
        outputs: [
            {
                type: "video-analysis",
                template: "Video analysis report",
                metadata: {
                    description: "Detailed analysis of visual content and events"
                }
            }
        ],
        tooling: {
            type: "vision",
            provider: "nemo",
            config: {
                modelType: "mixed-modal"
            }
        }
    },

    // OSINT Collection Branch
    "partner": {
        id: "partner",
        label: "Partner Report (Paramedic/Fire)",
        description: "Collects reports from local EMS stations",
        minDuration: 3000,
        maxDuration: 8000,
        logsToOutput: [
            ...commonLogs,
            {
                message: "Fetching EMS station reports",
                level: "info",

            }
        ],
        outputs: [
            {
                type: "osint-report",
                template: "EMS station report compilation",
            }
        ],
        tooling: {
            type: "osint",
            provider: "anthropic"
        }
    },

    "calls": {
        id: "calls",
        label: "Calls for service",
        description: "Monitors dispatch logs and analyzes call patterns",
        minDuration: 4000,
        maxDuration: 10000,
        logsToOutput: [
            ...commonLogs,
            {
                message: "Analyzing call frequency patterns",
                level: "info",
            }
        ],
        outputs: [
            {
                type: "json-chart",
                template: "Call frequency analysis",
            }
        ],
        alertConditions: {
            type: "anomaly",
            threshold: 0.75,
            triggers: ["high-call-volume", "pattern-change"]
        },
        tooling: {
            type: "osint",
            provider: "anthropic"
        }
    },

    "social": {
        id: "social",
        label: "Social Media",
        description: "Monitors social media for distress signals",
        minDuration: 5000,
        maxDuration: 12000,
        logsToOutput: [
            ...commonLogs,
            {
                message: "Scanning social media feeds",
                level: "info",

            }
        ],
        outputs: [
            {
                type: "osint-report",
                template: "Social media distress signals report",
            }
        ],
        tooling: {
            type: "osint",
            provider: "anthropic"
        }
    },

    // Aggregation and Analysis
    "summary": {
        id: "summary",
        label: "Summary Key Events",
        description: "Aggregates and summarizes all collected information",
        minDuration: 8000,
        maxDuration: 15000,
        dependencies: [
            { nodeId: "partner", required: true },
            { nodeId: "calls", required: true },
            { nodeId: "social", required: true }
        ],
        inputMergeStrategy: "summarize",
        logsToOutput: [
            ...commonLogs,
            {
                message: "Merging information streams",
                level: "info",

            }
        ],
        outputs: [
            {
                type: "markdown",
                template: "Comprehensive situation summary",
            }
        ],
        tooling: {
            type: "llm",
            provider: "anthropic"
        }
    },

    "nemo-guardrail1": {
        id: "nemo-guardrail1",
        label: "Nemo Guardrail",
        description: "Analyzes risk factors and validates response necessity",
        minDuration: 3000,
        maxDuration: 7000,
        dependencies: [
            { nodeId: "summary", required: true }
        ],
        guardrails: {
            controlIds: ["ctrl-1", "ctrl-2", "ctrl-3"],
            checkOnComplete: true
        },
        tooling: {
            type: "llm",
            provider: "nemo"
        },
        logsToOutput: [
            ...commonLogs,
            {
                message: "Analyzing risk factors",
                level: "info",

            }
        ],
        alertConditions: {
            type: 'risk-level',
            threshold: 0.7,
            triggers: [
                'life-safety-risk',
                'misinformation-detected',
                'rapid-escalation'
            ]
        },
        outputs: [{
            type: 'alert',
            template: 'guardrail-assessment',
            metadata: {
                title: 'Risk Assessment Report'
            }
        }]
    },

    "prioritize": {
        id: "prioritize",
        label: "Prioritize event on need and impact",
        description: "Analyzes severity and determines response priorities",
        minDuration: 6000,
        maxDuration: 12000,
        dependencies: [
            { nodeId: "nemo-guardrail1", required: true },
            { nodeId: "analyze", required: true }
        ],
        inputMergeStrategy: "prioritize",
        outputs: [
            {
                type: "priority-report",
                template: "Event prioritization and tactical approach",
            }
        ],
        tooling: {
            type: "llm",
            provider: "anthropic"
        }, logsToOutput: [
            ...commonLogs,
            {
                message: "Analyzing event severity",
                level: "info",

            }
        ]
    },

    "reconfirm": {
        id: "reconfirm",
        label: "Grant AI-driven action in high-risk scenario",
        description: "Human approval checkpoint for high-risk scenarios",
        minDuration: 1000,
        maxDuration: 3000,
        guardrails: {
            controlIds: ["ctrl-3"], // Maps to the "Sourcing Protocol" control
            checkOnStart: true,
            checkOnComplete: true
        },
        alertConditions: {
            type: "risk-level",
            threshold: 0.8,
            triggers: ["high-risk-scenario", "human-life-risk", "misinformation-risk"]
        },
        logsToOutput: [
            ...commonLogs,
            {
                message: "Human approval required for high-risk scenario",
                level: "info",

            }
        ]
    },

    "plan": {
        id: "plan",
        label: "Establish the response plan",
        description: "Creates formal response plan documentation",
        minDuration: 8000,
        maxDuration: 15000,
        outputs: [
            {
                type: "response-plan",
                template: "Formal response plan document"
            }
        ],
        tooling: {
            type: "llm",
            provider: "anthropic"
        }, logsToOutput: [
            ...commonLogs,
            {
                message: "Creating response plan document",
                level: "info",

            }
        ]
    },

    "notify": {
        id: "notify",
        label: "Notify First Responders",
        description: "Dispatches notifications through multiple channels",
        minDuration: 5000,
        maxDuration: 10000,
        outputs: [
            {
                type: "tool-call",
                template: "notification-dispatch"
            }
        ],
        tooling: {
            type: "notification",
            provider: "twilio"
        },
        logsToOutput: [
            ...commonLogs,
            {
                message: "Sending notifications to first responders",
                level: "info",

            }
        ]
    },

    "end": {
        id: "end",
        label: "End",
        description: "Pipeline completion",
        minDuration: 1000,
        maxDuration: 2000,
        dependencies: [{ nodeId: "notify", required: true }],
        logsToOutput: [
            {
                message: "Pipeline completed",
                level: "info",
            }
        ]
    }
};

export const pipelineConfig: PipelineConfig = {
    nodes,
    logFrequency: 1000,
    guardrailCheckFrequency: 2000,
};