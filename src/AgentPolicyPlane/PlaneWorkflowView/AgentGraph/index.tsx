// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/index.tsx
// src/AgentPolicyPlane/WorkflowView/AgentGraph/index.tsx
// src/AgentPolicyPlane/AgentGraph/index.tsx
import "./index.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
  type ReactFlowInstance,
  NodeMouseHandler,
} from "@xyflow/react";

import { usePipeline } from "../../context/PipelineContext";

import AgentNode, { type AgentNodeData } from "./AgentNode";
import AgentEdge from "./AgentEdge";

const initialNodes: Node<AgentNodeData>[] = [
  {
    id: "start",
    position: { x: 50, y: 600 },
    data: {},
    type: "turbo",
  },
  {
    id: "partner",
    position: { x: 225, y: 525 },
    data: {
      title: "Partner Report (Paramedic/Fire)",
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
      title: "Social Media",
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
      title: "Collect video footage",
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
    id: "nemo-guardrail1",
    position: { x: 450, y: 525 },
    data: {
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
      title: "Prioritize event on need and impact",
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
      title: "Grant AI-driven action in high-risk scenario",
      type: "policy-alert",
      animating: true,
      labelPosition: "right",
      role: "Policy Override Validator",
      backstory:
        "You are a critical checkpoint for high-risk scenarios, ensuring that AI-driven actions in emergency situations have proper authorization and oversight.",
      goal: "Validate and authorize AI-driven actions in high-risk scenarios, ensuring proper protocols are followed",
    },
    type: "turbo",
  },
  {
    id: "plan",
    position: { x: 450, y: 275 },
    data: {
      title: "Establish the response plan",
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
      title: "Notify First Responders of response plan",
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
    data: {},
    type: "turbo",
  },
];

const initialEdges: Edge[] = [
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

const nodeTypes = {
  turbo: AgentNode,
};

const edgeTypes = {
  turbo: AgentEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

interface DialogState {
  visible: boolean;
  content: {
    role?: string;
    backstory?: string;
    goal?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

const AgentInfoDialog: React.FC<{
  visible: boolean;
  content: DialogState["content"];
  position: DialogState["position"];
}> = ({ visible, content, position }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 99999,
      }}
      className="tw-animate-fadeIn"
    >
      {/* Main Dialog Container */}
      <div className="tw-bg-[#09090B]/95 tw-backdrop-blur-sm tw-border !tw-border-white/10 tw-rounded-lg tw-p-4 tw-w-[320px]">
        {/* Header */}
        {content.role && (
          <div className="tw-flex tw-items-start tw-gap-3 tw-mb-3">
            <div>
              <h3 className="tw-text-white tw-text-sm tw-font-medium">
                {content.role}
              </h3>
              <div className="tw-flex tw-gap-2 tw-mt-1">
                <span className="tw-px-1.5 tw-py-0.5 tw-text-[10px] tw-bg-white/5 tw-text-white/60 tw-rounded">
                  Agent Node
                </span>
                <span className="tw-px-1.5 tw-py-0.5 tw-text-[10px] tw-bg-green-500/10 tw-text-green-400 tw-rounded">
                  Active
                </span>
                <span className="tw-px-1.5 tw-py-0.5 tw-text-[10px] tw-bg-purple-500/10 tw-text-purple-400 tw-font-mono tw-rounded">
                  bak3f...a92d
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="tw-space-y-3">
          {/* Backstory Section */}
          {content.backstory && (
            <div className="tw-p-2 tw-rounded-lg tw-bg-white/[0.03] tw-border !tw-border-white/10">
              <div className="tw-text-xs tw-text-white/60 tw-mb-1">
                Backstory
              </div>
              <div className="tw-text-sm tw-text-white/90">
                {content.backstory}
              </div>
            </div>
          )}

          {/* Goal Section */}
          {content.goal && (
            <div className="tw-p-2 tw-rounded-lg tw-bg-white/[0.03] tw-border !tw-border-white/10">
              <div className="tw-text-xs tw-text-white/60 tw-mb-1">
                Primary Goal
              </div>
              <div className="tw-text-sm tw-text-white/90">{content.goal}</div>
            </div>
          )}
        </div>
      </div>

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tw-animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export type WrappedNode = Node<AgentNodeData>;

interface FlowProps {
  backgroundColor?: string;
  textColor?: string;
  onNodeClick?: (node: WrappedNode) => void;
}

export const AgentGraph = ({
  backgroundColor,
  textColor,
  onNodeClick = () => {},
}: FlowProps) => {
  const stylesFlowBg = backgroundColor || "transparent";
  const stylesTextColor = textColor || "rgb(243, 244, 246)";

  const [dialogState, setDialogState] = useState<DialogState>({
    visible: false,
    content: {},
    position: { x: 0, y: 0 },
  });

  const { state: pipelineState } = usePipeline();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: pipelineState.nodes[node.id]?.status || "idle",
        },
      }))
    );
  }, [pipelineState, setNodes]);

  useEffect(() => {
    setEdges((edges) =>
      edges.map((edge) => {
        const sourceNode = pipelineState.nodes[edge.source];
        const targetNode = pipelineState.nodes[edge.target];

        // Edge should be animated if source is running
        const animated = sourceNode?.status === "running";

        // Edge should be dimmed if target hasn't started yet
        const style =
          targetNode?.status === "idle"
            ? { opacity: 0.2, stroke: "rgb(222, 222, 222)" }
            : { opacity: 1, stroke: "rgb(222, 222, 222)" };

        return {
          ...edge,
          animated,
          style,
        };
      })
    );
  }, [pipelineState, setEdges]);

  const handleNodeMouseEnter: NodeMouseHandler<WrappedNode> = (event, node) => {
    if (node.data?.role) {
      const reactFlowWrapper = document.querySelector(
        ".react-flow"
      ) as HTMLElement;
      if (!reactFlowWrapper) return;

      const containerBounds = reactFlowWrapper.getBoundingClientRect();
      const target = event.target as HTMLElement;
      const targetBounds = target.getBoundingClientRect();

      const dialogWidth = 320;
      const dialogHeight = 300;
      const padding = 32; // Increased padding

      const targetCenterY = targetBounds.top + targetBounds.height / 2;

      // Horizontal positioning
      let x;
      if (containerBounds.right - targetBounds.right >= dialogWidth + padding) {
        x = targetBounds.right - containerBounds.left + padding;
      } else if (
        targetBounds.left - containerBounds.left >=
        dialogWidth + padding
      ) {
        x = targetBounds.left - containerBounds.left - dialogWidth - padding;
      } else {
        x = Math.max(
          padding,
          Math.min(
            containerBounds.width - dialogWidth - padding,
            targetBounds.left - containerBounds.left - dialogWidth / 2
          )
        );
      }

      // Vertical positioning
      let y = targetCenterY - containerBounds.top - dialogHeight / 2;

      // Adjust bounds with increased padding
      const minY = padding;
      const maxY = containerBounds.height - dialogHeight - padding * 2; // Extra padding at bottom

      // Clamp y position
      y = Math.max(minY, Math.min(y, maxY));

      setDialogState({
        visible: true,
        content: {
          role: node.data.role,
          backstory: node.data.backstory,
          goal: node.data.goal,
        },
        position: { x, y },
      });
    }
  };

  const handleNodeMouseLeave: NodeMouseHandler<WrappedNode> = () => {
    setDialogState((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    Node,
    Edge
  > | null>(null);

  const onInit = (rf: any) => {
    setReactFlowInstance(rf);
  };

  const fitAndCenter = useCallback(() => {
    if (!reactFlowInstance || !nodes?.length) return;

    // 1. Fit view
    reactFlowInstance.fitView({ padding: 0.22 });

    // 2. Then shift the viewport
    const { x, y, zoom } = reactFlowInstance.getViewport();
    reactFlowInstance.setViewport({ x: x - 50, y: y + 10, zoom });
  }, [reactFlowInstance, nodes]);

  // Call once on init and/or whenever nodes or instance change
  useEffect(() => {
    fitAndCenter();
  }, [fitAndCenter]);

  // Call on window resize
  useEffect(() => {
    const handleResize = () => fitAndCenter();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fitAndCenter]);

  const proOptions = { hideAttribution: true };

  return (
    <>
      <ReactFlow
        style={{
          backgroundColor: stylesFlowBg,
          color: stylesTextColor,
          position: "relative",
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={onInit}
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={proOptions}
        onNodeClick={(event, node) => {
          onNodeClick(node);
        }}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}

        // viewport={{ x: 0, y: -120, zoom: 1.05 }}
      >
        {/* <Controls showInteractive={true} /> */}
        <svg>
          <defs>
            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle
                fill="rgba(22, 189, 202, 1)"
                r="2" // r is
                cx="0"
                cy="0"
              />
            </marker>

            {/* Node Icon */}
            <symbol id="agent-icon" viewBox="0 0 20 20">
              <path
                d="M7.5 9.97414V4.16705C7.5 3.50401 7.76339 2.86813 8.23223 2.39929C8.70107 1.93045 9.33696 1.66705 10 1.66705C10.663 1.66705 11.2989 1.93045 11.7678 2.39929C12.2366 2.86813 12.5 3.50401 12.5 4.16705V5.00289M12.5 10.0016V15.8337C12.5 16.4968 12.2366 17.1326 11.7678 17.6015C11.2989 18.0703 10.663 18.3337 10 18.3337C9.33696 18.3337 8.70107 18.0703 8.23223 17.6015C7.76339 17.1326 7.5 16.4968 7.5 15.8337V14.9879"
                stroke="white"
                strokeLinecap="round"
              />
              <path
                d="M9.99935 12.5001H4.15935C2.78268 12.5001 1.66602 11.3809 1.66602 10.0001C1.66602 8.61923 2.78268 7.50006 4.15935 7.50006H4.99477M9.99935 7.50006H15.8281C16.4917 7.49951 17.1284 7.76258 17.5981 8.23141C18.0678 8.70024 18.332 9.33643 18.3327 10.0001C18.3327 11.3809 17.2114 12.5001 15.8281 12.5001H15.0268"
                stroke="white"
                strokeLinecap="round"
              />
            </symbol>
          </defs>
        </svg>
        <AgentInfoDialog
          visible={dialogState.visible}
          content={dialogState.content}
          position={dialogState.position}
        />
      </ReactFlow>
    </>
  );
};
