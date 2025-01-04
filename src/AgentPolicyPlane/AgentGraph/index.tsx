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
  // type NodeType,
  // type EdgeType,
} from "@xyflow/react";

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
    },
    type: "turbo",
  },
  {
    id: "video",
    position: { x: 100, y: 425 },
    data: { title: "Collect video footage", labelPosition: "top" },
    type: "turbo",
  },
  {
    id: "analyze",
    position: { x: 250, y: 425 },
    data: { title: "Analyze Footage", labelPosition: "top" },
    type: "turbo",
  },
  {
    id: "summary",
    position: { x: 450, y: 600 },
    data: {
      title: "Summary Key Events:",
      subline: "People, Object, Location, Event",
      labelPosition: "bottom",
    },
    type: "turbo",
  },
  {
    id: "nemo-guardrail1",
    position: { x: 450, y: 525 },
    data: {
      title: "Nemo Guardrail 1",
      labelPosition: "right",
      type: "nemo-guardrail",
    },
    type: "turbo",
  },
  {
    id: "prioritize",
    position: { x: 450, y: 425 },
    data: {
      title: "Prioritize event on need and impact",
      labelPosition: "right",
    },
    type: "turbo",
  },
  {
    id: "reconfirm",
    position: { x: 450, y: 350 },
    data: {
      title: "Reconfirm action for single source event",
      type: "policy-alert",
      animating: true,
      labelPosition: "right",
    },
    type: "turbo",
  },
  {
    id: "plan",
    position: { x: 450, y: 275 },
    data: { title: "Establish the response plan", labelPosition: "right" },
    type: "turbo",
  },
  {
    id: "notify",
    position: { x: 450, y: 175 },
    data: {
      title: "Notify First Responders of response plan",
      labelPosition: "top",
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

interface FlowProps {
  backgroundColor?: string;
  textColor?: string;
}

export const AgentGraph = ({ backgroundColor, textColor }: FlowProps) => {
  const stylesFlowBg = backgroundColor || "transparent";
  const stylesTextColor = textColor || "rgb(243, 244, 246)";

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  useEffect(() => {
    const fitAndCenter = async () => {
      if (reactFlowInstance && nodes?.length) {
        // this might be async, so we can await it if needed
        await reactFlowInstance.fitView({
          padding: 0.22,
        });

        // // 2. Then shift it over
        const { x, y, zoom } = reactFlowInstance.getViewport();

        // const newX = -275 * zoom + 270.5;
        reactFlowInstance.setViewport({ x: x - 50, y: y + 10, zoom });
      }
    };

    fitAndCenter();
  }, [reactFlowInstance, nodes?.length]);
  const proOptions = { hideAttribution: true };

  return (
    <ReactFlow
      style={{
        backgroundColor: stylesFlowBg,
        color: stylesTextColor,
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
    </ReactFlow>
  );
};
