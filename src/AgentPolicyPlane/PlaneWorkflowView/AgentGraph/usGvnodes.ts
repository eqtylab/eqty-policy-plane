// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/usGvnodes.ts
import { type Node, type Edge } from "@xyflow/react";

import { type AgentNodeData } from "./AgentNode";

export const INTEL_NODES: Node<AgentNodeData>[] = [
  {
    id: "claimant-details",
    position: { x: 200, y: 650 },
    data: {
      title: "Source Intelligence Details",
      labelPosition: "bottom",
      role: "Source Intelligence Details",
      backstory:
        "You process raw intelligence from field operatives, ensuring accurate collection of critical information while maintaining operational security protocols.",
      goal: "Collect comprehensive intelligence from sources, ensuring all relevant details are captured for proper assessment",
    },
    type: "turbo",
  },
  {
    id: "claimant-media",
    position: { x: 200, y: 750 },
    data: {
      title: "SIGINT Media",
      labelPosition: "bottom",
      role: "SIGINT Media",
      backstory:
        "You specialize in processing signals intelligence including communications, electronic emissions, and digital transmissions for national security purposes.",
      goal: "Process, categorize, and prepare SIGINT evidence for analysis, ensuring data integrity and proper classification",
    },
    type: "turbo",
  },
  {
    id: "triage-claims",
    position: { x: 380, y: 700 },
    data: {
      title: "Intelligence Triage",
      labelPosition: "bottom",
      role: "Intelligence Triage",
      backstory:
        "You evaluate incoming intelligence for credibility, relevance, and time-sensitivity to ensure critical information reaches decision-makers promptly.",
      goal: "Analyze incoming intelligence to categorize and prioritize based on criticality, reliability, and urgency to optimize resource allocation",
    },
    type: "turbo",
  },
  {
    id: "witness-evidence",
    position: { x: 300, y: 200 },
    data: {
      title: "HUMINT Reports",
      labelPosition: "top",
      role: "HUMINT Reports",
      backstory:
        "You specialize in human intelligence collection, managing field reports and identifying patterns across multiple sources.",
      goal: "Process and analyze human intelligence reports to extract actionable information for national security operations",
    },
    type: "turbo",
  },
  {
    id: "other-parties-media",
    position: { x: 300, y: 300 },
    data: {
      title: "Allied Intel Sharing",
      labelPosition: "top",
      role: "Allied Intel Sharing",
      backstory:
        "You manage intelligence shared by NATO allies and other partner nations, ensuring proper handling according to classification requirements.",
      goal: "Process shared intelligence from partner nations while maintaining proper attribution and classification protocols",
    },
    type: "turbo",
  },
  {
    id: "cctv",
    position: { x: 300, y: 400 },
    data: {
      title: "Geospatial Intelligence",
      labelPosition: "top",
      role: "Geospatial Intelligence",
      backstory:
        "You process satellite imagery, drone footage, and other geospatial data to identify strategic developments and threat indicators.",
      goal: "Analyze geospatial intelligence to identify key locations, movements, and patterns relevant to national security concerns",
    },
    type: "turbo",
  },
  {
    id: "other-media",
    position: { x: 300, y: 500 },
    data: {
      title: "OSINT Collection",
      labelPosition: "top",
      role: "OSINT Collection",
      backstory:
        "You gather and analyze open-source intelligence from public domains, social media, and commercial datasets.",
      goal: "Collect and analyze open-source information that provides context and supplements classified intelligence sources",
    },
    type: "turbo",
  },
  {
    id: "police-report",
    position: { x: 300, y: 600 },
    data: {
      title: "Law Enforcement Data",
      labelPosition: "top",
      role: "Law Enforcement Data",
      backstory:
        "You coordinate with domestic and international law enforcement to obtain relevant intelligence on threats to national security.",
      goal: "Gather and process information from law enforcement sources that may indicate potential national security threats",
    },
    type: "turbo",
  },
  {
    id: "group-evidence",
    position: { x: 640, y: 700 },
    data: {
      hidden: true,
      title: "Intelligence Fusion",
      labelPosition: "top",
      role: "Intelligence Fusion",
      backstory:
        "You aggregate intelligence from multiple sources into a cohesive operational picture while maintaining proper classification levels.",
      goal: "Combine intelligence from diverse sources into a unified dataset for comprehensive threat analysis",
    },
    type: "turbo",
  },
  {
    id: "guardrail-1",
    position: { x: 650, y: 700 },
    data: {
      title: "Validate Classification and Legal Compliance",
      labelPosition: "bottom",
      type: "policy-alert",
      animating: true,
      controlId: "guardrail-1",
      role: "Validate Classification and Legal Compliance",
      backstory:
        "You ensure all intelligence handling complies with relevant laws, treaties, and classification protocols to protect sources and methods.",
      goal: "Verify all intelligence is properly classified and handled according to legal frameworks including FISA and EO 12333",
    },
    type: "turbo",
  },
  {
    id: "analyze-data",
    position: { x: 800, y: 700 },
    data: {
      title: "Pattern and Anomaly Detection",
      labelPosition: "top",
      role: "Pattern and Anomaly Detection",
      backstory:
        "You apply advanced analytics to identify patterns, anomalies, and correlations across diverse intelligence sources.",
      goal: "Analyze collected intelligence to identify threat indicators, anomalous activities, and strategic patterns",
    },
    type: "turbo",
  },
  {
    id: "verify-policy",
    position: { x: 980, y: 800 },
    data: {
      title: "Verify National Security Priorities Alignment",
      labelPosition: "right",
      role: "Verify National Security Priorities Alignment",
      backstory:
        "You ensure intelligence findings align with established national security priorities and intelligence requirements.",
      goal: "Evaluate intelligence against current national security directives and collection priorities",
    },
    type: "turbo",
  },
  {
    id: "estimate-costs",
    position: { x: 980, y: 600 },
    data: {
      title: "Threat Assessment",
      labelPosition: "right",
      role: "Threat Assessment",
      backstory:
        "You evaluate potential threats based on capability, intent, opportunity, and historical precedent.",
      goal: "Quantify threat levels and potential impacts based on analysis of adversary capabilities and intentions",
    },
    type: "turbo",
  },
  {
    id: "guardrail-2",
    position: { x: 980, y: 500 },
    data: {
      controlId: "guardrail-2",
      type: "policy-alert",
      title: "Authorization for Sensitive Operations",
      labelPosition: "right",
      animating: true,
      role: "Authorization for Sensitive Operations",
      backstory:
        "You ensure proper oversight and authorization for high-risk intelligence operations and reporting.",
      goal: "Validate automated intelligence assessments for sensitive situations requiring additional human oversight",
    },
    type: "turbo",
  },
  {
    id: "offer-care",
    position: { x: 650, y: 550 },
    data: {
      title: "Source Protection Assessment",
      labelPosition: "top",
      role: "Source Protection Assessment",
      backstory:
        "You identify operational security risks and develop measures to protect intelligence sources and methods.",
      goal: "Identify potential vulnerabilities in intelligence collection and recommend appropriate protection measures",
    },
    type: "turbo",
  },
  {
    id: "generate-plan",
    position: { x: 980, y: 400 },
    data: {
      title: "Generate Intelligence Product",
      labelPosition: "right",
      role: "Generate Intelligence Product",
      backstory:
        "You synthesize complex intelligence into actionable reports tailored to specific operational and strategic requirements.",
      goal: "Create detailed intelligence products that address identified threats, opportunities, and recommended courses of action",
    },
    type: "turbo",
  },
  {
    id: "notify-agent",
    position: { x: 980, y: 300 },
    data: {
      title: "Disseminate to Decision Makers",
      labelPosition: "left",
      role: "Disseminate to Decision Makers",
      backstory:
        "You ensure intelligence products reach appropriate decision-makers with proper context and classification.",
      goal: "Format and dispatch intelligence products to authorized personnel according to established dissemination protocols",
    },
    type: "turbo",
  },
  {
    id: "guardrail-check3",
    position: { x: 1100, y: 300 },
    data: {
      controlId: "guardrail-check3",
      resolved: true,
      type: "policy-alert",
      title: "Human Verification of Intelligence Assessment",
      labelPosition: "top",
      role: "Human Verification of Intelligence Assessment",
      backstory:
        "You ensure qualified intelligence professionals review automated assessments before operational use.",
      goal: "Ensure that qualified human analysts verify AI-generated intelligence products before dissemination",
    },
    type: "turbo",
  },
  {
    id: "generate-summary",
    position: { x: 1200, y: 300 },
    data: {
      title: "Generate Brief for Joint Operations",
      labelPosition: "right",
      role: "Generate Brief for Joint Operations",
      backstory:
        "You compile finalized intelligence into standardized formats suitable for joint operations with NATO and partner nations.",
      goal: "Create standardized intelligence briefs compatible with joint operations systems and NATO protocols",
    },
    type: "turbo",
  },
];

export const INTEL_EDGES: Edge[] = [
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
