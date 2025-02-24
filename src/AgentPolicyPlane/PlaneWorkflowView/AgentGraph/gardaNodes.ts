// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/gardaNodes.ts

import { type Node, type Edge } from "@xyflow/react";

import { type AgentNodeData } from "./AgentNode";
export const GARDA_NODES: Node<AgentNodeData>[] = [
  {
    id: "start",
    position: { x: 50, y: 600 },
    data: {
      title: "OSINT Feed",
      labelPosition: "bottom",
    },
    type: "turbo",
  },
  {
    id: "partner",
    position: { x: 225, y: 525 },
    data: {
      title: "Twitter",
      labelPosition: "top",
      parallelVertSize: true,
      role: "Partner Report Analyzer",
      backstory:
        "You are an agent dedicated to monitoring and analyzing reports from local EMS stations and fire departments. You understand emergency service protocols and can identify critical patterns in first responder reports.",
      goal: "Collect and analyze reports from local EMS stations, identifying key information relevant to flooding disasters",
    },
    type: "turbo",
  },
  {
    id: "calls",
    position: { x: 225, y: 600 },
    data: {
      title: "Calls for service",
      labelPosition: "top",
      parallelVertSize: true,
      role: "Service Call Analyzer",
      backstory:
        "You are a specialized agent that monitors dispatch logs and analyzes emergency call patterns. You can detect anomalies in call frequencies and understand the significance of different types of emergency calls.",
      goal: "Parse local dispatch logs, monitor call frequencies, and detect anomaly patterns that might indicate escalating emergencies",
    },
    type: "turbo",
  },
  {
    id: "social",
    position: { x: 225, y: 675 },
    data: {
      title: "Telegram",
      labelPosition: "top",
      parallelVertSize: true,
      role: "Social Media Monitor",
      backstory:
        "You are an agent skilled in monitoring social media platforms for emergency-related content. You can filter through Twitter, Facebook, and Telegram to identify genuine distress calls and emergency situations.",
      goal: "Monitor social media feeds for distress calls and emergency situations, filtering out noise to identify genuine calls for help",
    },
    type: "turbo",
  },
  {
    id: "video",
    position: { x: 100, y: 425 },
    data: {
      title: "Other Social Media",
      labelPosition: "top",
      role: "Video Feed Collector",
      backstory:
        "You are a specialized agent that interfaces with surveillance systems to gather real-time video footage during emergency situations. You understand how to efficiently collect and stream video data from multiple sources.",
      goal: "Collect and process video feeds from surveillance systems, ensuring high-quality footage is captured for analysis",
    },
    type: "turbo",
  },
  {
    id: "analyze",
    position: { x: 250, y: 425 },
    data: {
      title: "Analyze Footage",
      labelPosition: "top",
      role: "Video Analyzer",
      backstory:
        "You are an advanced NVIDIA mixed-modal LLM specializing in analyzing video content for emergency situations. You can identify critical visual elements, patterns, and events from surveillance footage.",
      goal: "Analyze video footage using mixed-modal techniques to identify and report on key events, people, objects, and potential hazards",
    },
    type: "turbo",
  },
  {
    id: "summary",
    position: { x: 450, y: 600 },
    data: {
      title: "Summary Key Events:",
      subline: "People, Object, Location, Event",
      labelPosition: "bottom",
      role: "Information Summarizer",
      backstory:
        "You are an expert in synthesizing information from multiple sources. You can take inputs from OSINT collection agents and create coherent, actionable summaries of emergency situations.",
      goal: "Create comprehensive summaries of key events by aggregating information from all OSINT sources and video analysis",
    },
    type: "turbo",
  },
  {
    id: "remediate",
    position: { x: 450, y: 525 },
    data: {
      controlId: "ctrl-9",
      title: "Validate PII protection measures",
      type: "policy-alert",
      animating: true,
      labelPosition: "right",
      role: "GDPR Data Protection Protocol - Remediation Required",
      backstory:
        "Mandatory data protection checkpoint due to GDPR Article 25 requirements. System detected potential exposure of personal data in emergency response feeds, including unprotected social media content and victim location data.",
      goal: "Ensure appropriate technical measures are in place to protect personal data before processing emergency response information",
    },
    type: "turbo",
  },
  {
    id: "nemo-guardrail1",
    position: { x: 450, y: 525 },
    data: {
      hide: true,
      title: "Nemo Guardrail",
      labelPosition: "right",
      type: "nemo-guardrail",
      role: "Nemo Guardrail",
      backstory:
        "You are a specialized safety system that analyzes risk factors and validates response necessity. You ensure all actions comply with safety protocols and ethical guidelines.",
      goal: "Analyze summaries for risk factors and validate whether emergency response is necessary, checking for potential misinformation or ethical concerns",
    },
    type: "turbo",
  },
  {
    id: "prioritize",
    position: { x: 450, y: 425 },
    data: {
      title: "Estimate Veracity",
      labelPosition: "right",
      role: "Event Prioritizer",
      backstory:
        "You are an expert in emergency triage, capable of analyzing multiple incidents and determining their relative priority based on need and potential impact.",
      goal: "Analyze severity of situations and determine response priorities, creating tactical approaches for first responders",
    },
    type: "turbo",
  },
  {
    id: "reconfirm",
    position: { x: 450, y: 350 },
    data: {
      controlId: "ctrl-3",
      title: "Grant AI-driven action in high-risk scenario",
      type: "policy-alert",
      animating: true,
      labelPosition: "right",
      role: "Sourcing Protocol - Human Authorization",
      backstory:
        "Mandatory authorization checkpoint for AI systems making life-critical prioritization decisions in disaster response, particularly when influenced by social media signals. Flagged due to algorithmic triage of human rescue priorities.",
      goal: "Ensure human oversight of AI emergency response systems through explicit authorization protocols before deployment of rescue resources",
    },
    type: "turbo",
  },
  {
    id: "plan",
    position: { x: 450, y: 275 },
    data: {
      title: "Generate Alert",
      labelPosition: "right",
      role: "Response Plan Creator",
      backstory:
        "You are an expert in emergency response planning, capable of creating detailed, actionable response plans that incorporate all gathered intelligence and priorities.",
      goal: "Create formal, comprehensive response plans that include tactical approaches and clear instructions for first responders",
    },
    type: "turbo",
  },
  {
    id: "notify",
    position: { x: 450, y: 175 },
    data: {
      title: "Send Alert to Investigators",
      labelPosition: "top",
      role: "First Responder Notifier",
      backstory:
        "You are responsible for ensuring emergency information reaches first responders quickly and effectively. You can utilize multiple communication channels including Twilio and Apptek.",
      goal: "Dispatch notifications through multiple channels to first responders, ensuring critical information is delivered effectively",
    },
    type: "turbo",
  },
  {
    id: "end",
    position: { x: 600, y: 175 },
    data: {
      title: "Summary Threat Report",
      labelPosition: "right",
    },
    type: "turbo",
  },
];

export const GARDA_EDGES: Edge[] = [
  {
    id: "e-start-partner",
    source: "start",
    target: "partner",
  },
  {
    id: "e-start-calls",
    source: "start",
    target: "calls",
  },
  {
    id: "e-start-social",
    source: "start",
    target: "social",
  },

  {
    id: "e-partner-summary",
    source: "partner",
    target: "summary",
  },
  {
    id: "e-calls-summary",
    source: "calls",
    target: "summary",
  },
  {
    id: "e-social-summary",
    source: "social",
    target: "summary",
  },
  {
    id: "e-video-analyze",
    source: "video",
    target: "analyze",
  },
  {
    id: "e-analyze-prioritize",
    source: "analyze",
    target: "prioritize",
  },
  {
    id: "e-summary-prioritize",
    source: "summary",
    target: "prioritize",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e-prioritize-plan",
    source: "prioritize",
    target: "plan",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },

  {
    id: "e-plan-notify",
    source: "plan",
    target: "notify",
    sourceHandle: "sourcetop",
    targetHandle: "targetbottom",
  },
  {
    id: "e-notify-end",
    source: "notify",
    target: "end",
  },
];
