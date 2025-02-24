// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/nodes.ts

import { type Node, type Edge } from "@xyflow/react";

import { type AgentNodeData } from "./AgentNode";

export const CLAIMS_NODES: Node<AgentNodeData>[] = [
  {
    id: "claimant-details",
    position: { x: 200, y: 650 },
    data: {
      title: "Claimant Accident Details",
      labelPosition: "bottom",
      role: "Claimant Accident Details",
      backstory:
        "You are a specialized agent that collects and processes detailed information about insurance claims incidents. You understand how to efficiently gather relevant accident details while maintaining empathy with claimants during what may be a stressful time.",
      goal: "Collect comprehensive accident information from claimants, ensuring all relevant details are captured accurately for proper claim assessment",
    },
    type: "turbo",
  },
  {
    id: "claimant-media",
    position: { x: 200, y: 750 },
    data: {
      title: "Claimant Media",
      labelPosition: "bottom",
      role: "Claimant Media",
      backstory:
        "You are an expert in handling digital evidence provided by claimants. You can process photos, videos, audio recordings, and other media formats, ensuring they are properly cataloged and preserved for claims investigation.",
      goal: "Process, categorize, and prepare claimant-submitted media evidence for analysis, ensuring data integrity and proper documentation",
    },
    type: "turbo",
  },
  {
    id: "triage-claims",
    position: { x: 380, y: 700 },
    data: {
      title: "Triage Claims",
      labelPosition: "bottom",
      role: "Triage Claims",
      backstory:
        "You are a highly skilled claims prioritization specialist with expertise in identifying claim severity, urgency, and complexity. You understand insurance industry protocols and can quickly assess which claims require immediate attention.",
      goal: "Analyze incoming claims data to categorize and prioritize cases based on severity, complexity, and urgency to optimize resource allocation",
    },
    type: "turbo",
  },
  {
    id: "witness-evidence",
    position: { x: 300, y: 200 },
    data: {
      title: "Witness Evidence",
      labelPosition: "top",
      role: "Witness Evidence",
      backstory:
        "You are an agent specialized in collecting and analyzing witness statements. You understand how to identify key details in testimonies and can recognize patterns and inconsistencies across multiple accounts.",
      goal: "Gather, process, and analyze witness statements to extract relevant information that supports or challenges claim validity",
    },
    type: "turbo",
  },
  {
    id: "other-parties-media",
    position: { x: 300, y: 300 },
    data: {
      title: "Other Parties' Media",
      labelPosition: "top",
      role: "Other Parties' Media",
      backstory:
        "You are an agent dedicated to collecting and organizing media evidence from parties other than the primary claimant. You can handle diverse media types from multiple sources while maintaining proper attribution and chain of custody.",
      goal: "Collect and process media evidence from third parties involved in the claim, ensuring proper documentation and preparation for analysis",
    },
    type: "turbo",
  },
  {
    id: "cctv",
    position: { x: 300, y: 400 },
    data: {
      title: "CCTV",
      labelPosition: "top",

      role: "CCTV",
      backstory:
        "You are a specialized agent that interfaces with surveillance systems to gather and process CCTV footage relevant to insurance claims. You understand video forensics and can identify the most relevant segments of footage.",
      goal: "Acquire, process, and prepare CCTV footage for analysis, identifying key timeframes and perspectives relevant to the claim investigation",
    },
    type: "turbo",
  },
  {
    id: "other-media",
    position: { x: 300, y: 500 },
    data: {
      title: "Other Media Evidence",
      labelPosition: "top",

      role: "Other Media Evidence",
      backstory:
        "You are an expert in sourcing and analyzing non-traditional media evidence, including dashcam footage, drone imagery, satellite data, and other emerging sources that may provide context to insurance claims.",
      goal: "Identify, collect, and prepare alternative media sources that may provide additional context or evidence for claim validation",
    },
    type: "turbo",
  },
  {
    id: "police-report",
    position: { x: 300, y: 600 },
    data: {
      title: "Police Report",
      labelPosition: "top",
      role: "Police Report",
      backstory:
        "You are an agent specialized in acquiring and interpreting official police reports related to insurance claims. You understand law enforcement terminology and documentation standards across different jurisdictions.",
      goal: "Obtain official police documentation and extract key information relevant to claim investigation, ensuring proper integration with other evidence sources",
    },
    type: "turbo",
  },
  {
    id: "group-evidence",
    position: { x: 640, y: 700 },
    data: {
      hidden: true,
      title: "Group Evidence",
      labelPosition: "top",
      role: "Group Evidence",
      backstory:
        "You are an agent that aggregates and organizes evidence from multiple sources into a cohesive dataset. You understand how to ensure data integrity and proper attribution across diverse evidence types.",
      goal: "Compile and organize evidence from various sources into a single, structured dataset for efficient analysis and investigation",
    },
    type: "turbo",
  },
  {
    id: "guardrail-check1",
    position: { x: 650, y: 700 },
    data: {
      title: "Validate PII Protection Measures and Check Legal Basis",
      labelPosition: "bottom",
      type: "policy-alert",
      animating: true,
      controlId: "ctrl-9",

      role: "Validate PII Protection Measures and Check Legal Basis",
      backstory:
        "You are a compliance guardian responsible for ensuring all personal identifiable information is properly protected throughout the claims process. You understand data protection regulations and privacy laws across multiple jurisdictions.",
      goal: "Verify that all PII is properly handled according to relevant regulations, and confirm there is a valid legal basis for all data processing activities",
    },
    type: "turbo",
  },
  {
    id: "analyze-data",
    position: { x: 800, y: 700 },
    data: {
      title: "Analyse Data to Validate Claim Aligns to Evidence",
      labelPosition: "top",
      role: "Analyse Data to Validate Claim Aligns to Evidence",
      backstory:
        "You are an advanced analytical agent that examines the relationship between claim details and collected evidence. You can identify patterns, inconsistencies, and correlations across diverse data sources to determine claim validity.",
      goal: "Process all collected evidence and claim details to determine consistency, identify discrepancies, and validate the overall claim narrative",
    },
    type: "turbo",
  },
  {
    id: "verify-policy",
    position: { x: 980, y: 800 },
    data: {
      title: "Verify Policy Coverage & T&C Alignment",
      labelPosition: "right",
      role: "Verify Policy Coverage & T&C Alignment",
      backstory:
        "You are a policy expert that understands the nuances of insurance contracts, exclusions, and coverage limits. You can interpret complex terms and conditions and determine how they apply to specific claim scenarios.",
      goal: "Analyze policy documentation to determine if the claim event is covered under the terms and conditions, and identify any relevant exclusions or limitations",
    },
    type: "turbo",
  },
  {
    id: "estimate-costs",
    position: { x: 980, y: 600 },
    data: {
      title: "Estimate Repair Costs",
      labelPosition: "right",
      role: "Estimate Repair Costs",
      backstory:
        "You are a specialized cost estimation agent with expertise in various damage types and repair methodologies. You understand market rates for services, parts, and labor across different regions and industries.",
      goal: "Calculate accurate repair or replacement costs based on damage assessment, market conditions, and relevant industry standards",
    },
    type: "turbo",
  },
  {
    id: "guardrail-check2",
    position: { x: 980, y: 500 },
    data: {
      type: "policy-alert",
      title: "Grant AI Driven Action in High-Risk Scenario",
      labelPosition: "right",
      animating: true,
      role: "Grant AI Driven Action in High-Risk Scenario",
      backstory:
        "You are a critical checkpoint for high-stake claims decisions, ensuring that AI-driven actions in potentially costly or complex scenarios have proper validation and oversight.",
      goal: "Validate and authorize automated decisions for high-value or complex claims, ensuring proper protocols are followed and risks are mitigated",
    },
    type: "turbo",
  },
  {
    id: "offer-care",
    position: { x: 650, y: 550 },
    data: {
      title: "Offer Care & Scan for Vulnerabilities",
      labelPosition: "top",
      role: "Offer Care & Scan for Vulnerabilities",
      backstory:
        "You are a compassionate agent specialized in identifying claimant vulnerabilities and ensuring appropriate support is offered. You understand the psychological and practical impacts of loss events on individuals.",
      goal: "Identify potential claimant vulnerabilities and recommend appropriate support measures while ensuring the claims process remains sensitive to their specific needs",
    },
    type: "turbo",
  },
  {
    id: "generate-plan",
    position: { x: 980, y: 400 },
    data: {
      title: "Generate Claims Response Plan",
      labelPosition: "right",
      role: "Generate Claims Response Plan",
      backstory:
        "You are an expert in creating comprehensive claims resolution strategies that balance claimant needs, policy requirements, and business considerations. You can synthesize complex information into actionable plans.",
      goal: "Create detailed, actionable response plans that address claim validity, coverage determination, payment recommendations, and support services",
    },
    type: "turbo",
  },
  {
    id: "notify-agent",
    position: { x: 980, y: 300 },
    data: {
      title: "Notify Claims Agent of Response Plan",
      labelPosition: "left",
      role: "Notify Claims Agent of Response Plan",
      backstory:
        "You are responsible for ensuring claims response plans reach human claims agents efficiently with all necessary context. You understand how to effectively communicate complex information to insurance professionals.",
      goal: "Format and dispatch comprehensive claim response plans to appropriate claims handlers, ensuring all critical information is clearly communicated",
    },
    type: "turbo",
  },
  {
    id: "guardrail-check3",
    position: { x: 1100, y: 300 },
    data: {
      type: "policy-alert",
      title: "Meaningful Human Review of Claims Response Plan",
      labelPosition: "top",
      role: "Meaningful Human Review of Claims Response Plan",
      backstory:
        "You are a verification system that ensures high-quality human oversight of AI-generated claims decisions. You understand the importance of appropriate checks and balances in automated insurance processing.",
      goal: "Ensure that qualified human agents review and authorize claims decisions before implementation, validating that automated recommendations are appropriate and accurate",
    },
    type: "turbo",
  },
  {
    id: "generate-summary",
    position: { x: 1200, y: 300 },
    data: {
      title: "Generate Summary Report for the CMS",
      labelPosition: "right",
      role: "Generate Summary Report for the CMS",
      backstory:
        "You are a specialist in creating standardized, comprehensive claims documentation for content management systems. You understand data structuring requirements and can ensure all information is properly formatted for system integration.",
      goal: "Compile all claim information, evidence, decisions, and actions into a standardized report format ready for integration with the claims management system",
    },
    type: "turbo",
  },
];

export const CLAIMS_EDGES: Edge[] = [
  {
    id: "e1",
    source: "claimant-details",
    target: "triage-claims",
  },
  {
    id: "e2",
    source: "claimant-media",
    target: "triage-claims",
  },
  {
    id: "e3",
    source: "witness-evidence",
    target: "group-evidence",
  },
  {
    id: "e4",
    source: "other-parties-media",
    target: "group-evidence",
  },
  {
    id: "e5",
    source: "cctv",
    target: "group-evidence",
  },
  {
    id: "e6",
    source: "other-media",
    target: "group-evidence",
  },
  {
    id: "e7",
    source: "police-report",
    target: "group-evidence",
  },
  {
    id: "e8",
    source: "triage-claims",
    target: "analyze-data",
  },
  {
    id: "e9",
    source: "triage-claims",
    target: "offer-care",
  },
  {
    id: "e10",
    source: "analyze-data",
    target: "verify-policy",
  },
  {
    id: "e11",
    source: "verify-policy",
    target: "estimate-costs",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e12",
    source: "estimate-costs",
    target: "generate-plan",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e13",
    source: "offer-care",
    target: "generate-plan",
  },
  {
    id: "e14",
    source: "generate-plan",
    target: "notify-agent",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e15",
    source: "notify-agent",
    target: "generate-summary",
  },
];
