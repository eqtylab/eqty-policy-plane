// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/index.tsx
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

import { CLAIMS_NODES, CLAIMS_EDGES } from "./nodes";

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
    isAlert?: boolean;
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
  if (content.isAlert) {
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
        <div className="tw-bg-[#09090B]/95 tw-backdrop-blur-sm tw-border !tw-border-white/10 tw-rounded-lg tw-p-4 tw-w-[320px]">
          {/* Header */}
          <div className="tw-flex tw-items-start tw-gap-3 tw-mb-3">
            <div>
              <h3 className="tw-text-white tw-text-sm tw-font-medium">
                Authorization Required
              </h3>
              <div className="tw-flex tw-gap-2 tw-mt-1">
                <span className="tw-px-1.5 tw-py-0.5 tw-text-[10px] tw-bg-amber-500/10 tw-text-amber-400 tw-rounded">
                  Auth Gate
                </span>
                <span className="tw-px-1.5 tw-py-0.5 tw-text-[10px] tw-bg-red-500/10 tw-text-red-400 tw-rounded">
                  Pending
                </span>
                <span className="tw-px-1.5 tw-py-0.5 tw-text-[10px] tw-bg-white/5 tw-text-white/60 tw-font-mono tw-rounded">
                  GATE_ID: bak3f...a92d
                </span>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="tw-space-y-3">
            {/* System Alert */}
            <div className="tw-p-2 tw-rounded-lg tw-bg-amber-500/[0.03] tw-border !tw-border-amber-500/10">
              <div className="tw-text-xs tw-text-amber-400 tw-mb-1">
                Critical System Notice
              </div>
              <div className="tw-text-sm tw-text-white/90">
                AI system requires authorization for emergency response
                prioritization. Social media data integration may influence
                rescue priority decisions.
              </div>
            </div>

            {/* Authorization Requirements */}
            <div className="tw-p-2 tw-rounded-lg tw-bg-white/[0.03] tw-border !tw-border-white/10">
              <div className="tw-text-xs tw-text-white/60 tw-mb-1">
                Authorization Protocol
              </div>
              <div className="tw-text-sm tw-text-white/90">
                Human verification required for AI-driven emergency response
                system. Confirm implementation of safety controls before
                authorizing deployment.
              </div>
            </div>
          </div>
        </div>

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
  }
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
  const [nodes, setNodes, onNodesChange] = useNodesState(CLAIMS_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(CLAIMS_EDGES);

  useEffect(() => {
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        status: pipelineState.nodes[node.id]?.status || "idle",
        animating:
          (node.id === "guardrail-2" &&
            pipelineState.userOverrides.length === 0) ||
          (node.id === "guardrail-1" &&
            pipelineState.userRemediations.length === 0),
        resolved:
          (node.id === "guardrail-2" &&
            pipelineState.userOverrides.length > 0) ||
          (node.id === "guardrail-1" &&
            pipelineState.userRemediations.length > 0) ||
          node.id === "guardrail-check3",
        hide:
          (node.id === "nemo-guardrail1" &&
            pipelineState.userRemediations.length === 0) ||
          (node.id === "guardrail-1" &&
            pipelineState.userRemediations.length > 0),
      },
    }));

    console.log("Updated nodes:", updatedNodes);

    setNodes(updatedNodes);
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
            ? { opacity: 0.6, stroke: "rgb(222, 222, 222)" }
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
          isAlert: node.id === "reconfirm" || node.id === "remediate",
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
    // remove any dialogs
    setDialogState((prev) => ({
      visible: false,
      content: {},
      position: { x: 0, y: 0 },
    }));
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
