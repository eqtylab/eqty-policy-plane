// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/nodes.ts

import { type Node, type Edge } from "@xyflow/react";

import { type AgentNodeData } from "./AgentNode";

export const CLAIMS_NODES: Node<AgentNodeData>[] = [
  // First two nodes remain the same
  {
    id: "claimant-details",
    position: { x: 200, y: 650 },
    data: {
      title: "Claimant Accident Details",
      labelPosition: "bottom",
    },
    type: "turbo",
  },
  {
    id: "claimant-media",
    position: { x: 200, y: 750 },
    data: {
      title: "Claimant Media",
      labelPosition: "bottom",
    },
    type: "turbo",
  },
  {
    id: "triage-claims",
    position: { x: 380, y: 700 },
    data: {
      title: "Triage Claims",
      labelPosition: "bottom",
    },
    type: "turbo",
  },
  // Evidence nodes - positioned to flow right into validate PII
  {
    id: "witness-evidence",
    position: { x: 300, y: 200 },
    data: {
      title: "Witness Evidence",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "other-parties-media",
    position: { x: 300, y: 300 },
    data: {
      title: "Other Parties' Media",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "cctv",
    position: { x: 300, y: 400 },
    data: {
      title: "CCTV",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "other-media",
    position: { x: 300, y: 500 },
    data: {
      title: "Other Media Evidence",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "police-report",
    position: { x: 300, y: 600 },
    data: {
      title: "Police Report",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "red-check-1",
    position: { x: 650, y: 700 },
    data: {
      title: "Validate PII Protection Measures and Check Legal Basis",
      labelPosition: "bottom",
    },
    type: "turbo",
  },
  // Vertical flow nodes
  {
    id: "analyze-data",
    position: { x: 800, y: 700 },
    data: {
      title: "Analyse Data to Validate Claim Aligns to Evidence",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "verify-policy",
    position: { x: 980, y: 800 },
    data: {
      title: "Verify Policy Coverage & T&C Alignment",
      labelPosition: "right",
    },
    type: "turbo",
  },
  {
    id: "estimate-costs",
    position: { x: 980, y: 600 },
    data: {
      title: "Estimate Repair Costs",
      labelPosition: "right",
    },
    type: "turbo",
  },
  {
    id: "red-check-2",
    position: { x: 980, y: 500 },
    data: {
      title: "Grant AI Driven Action in High-Risk Scenario",
      labelPosition: "right",
    },
    type: "turbo",
  },
  {
    id: "offer-care",
    position: { x: 650, y: 550 },
    data: {
      title: "Offer Care & Scan for Vulnerabilities",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "generate-plan",
    position: { x: 980, y: 400 },
    data: {
      title: "Generate Claims Response Plan",
      labelPosition: "right",
    },
    type: "turbo",
  },
  // Final horizontal flow nodes
  {
    id: "notify-agent",
    position: { x: 980, y: 300 },
    data: {
      title: "Notify Claims Agent of Response Plan",
      labelPosition: "left",
    },
    type: "turbo",
  },
  {
    id: "red-check-3",
    position: { x: 1100, y: 300 },
    data: {
      title: "Meaningful Human Review of Claims Response Plan",
      labelPosition: "top",
    },
    type: "turbo",
  },
  {
    id: "generate-summary",
    position: { x: 1200, y: 300 },
    data: {
      title: "Generate Summary Report for the CMS",
      labelPosition: "right",
    },
    type: "turbo",
  },
];

export const CLAIMS_EDGES: Edge[] = [
  // Initial flows to triage
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

  // Evidence nodes to Red Check 1
  {
    id: "e3",
    source: "witness-evidence",
    target: "red-check-1",
  },
  {
    id: "e4",
    source: "other-parties-media",
    target: "red-check-1",
  },
  {
    id: "e5",
    source: "cctv",
    target: "red-check-1",
  },
  {
    id: "e6",
    source: "other-media",
    target: "red-check-1",
  },
  {
    id: "e7",
    source: "police-report",
    target: "red-check-1",
  },

  // Triage to both paths
  {
    id: "e8",
    source: "triage-claims",
    target: "red-check-1",
  },
  {
    id: "e9",
    source: "triage-claims",
    target: "offer-care",
  },

  // Analysis path
  {
    id: "e10",
    source: "red-check-1",
    target: "analyze-data",
  },
  {
    id: "e11",
    source: "analyze-data",
    target: "verify-policy",
  },
  {
    id: "e12",
    source: "verify-policy",
    target: "estimate-costs",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e13",
    source: "estimate-costs",
    target: "red-check-2",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e14",
    source: "red-check-2",
    target: "generate-plan",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },

  // Care path
  {
    id: "e15",
    source: "offer-care",
    target: "generate-plan",
  },

  // Final flow
  {
    id: "e16",
    source: "generate-plan",
    target: "notify-agent",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e17",
    source: "notify-agent",
    target: "red-check-3",
  },
  {
    id: "e18",
    source: "red-check-3",
    target: "generate-summary",
  },
];
