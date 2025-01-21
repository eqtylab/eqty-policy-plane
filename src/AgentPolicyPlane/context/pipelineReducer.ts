// src/AgentPolicyPlane/context/pipelineReducer.ts

import { PipelineState } from "./types.pipeline";
import { NodeStatus } from "./types.nodes";
import { OutputTemplate } from "./types.outputs";
import { LogEntry } from "./types.logs";

export type PipelineAction =
  | { type: "START_PIPELINE" }
  | { type: "PAUSE_PIPELINE" }
  | { type: "CANCEL_PIPELINE" }
  | { type: "COMPLETE_PIPELINE" }
  | {
      type: "UPDATE_NODE_STATUS";
      payload: { nodeId: string; status: NodeStatus };
    }
  | {
      type: "ADD_LOG";
      payload: {
        nodeId: string;
        log: LogEntry;
      };
    }
  | {
      type: "COMPLETE_NODE";
      payload: { nodeId: string; outputs?: OutputTemplate[] };
    }
  | {
      type: "OVERRIDE_GUARDRAIL";
      payload: { alertId: string; reason: string; timestamp: number };
    }
  | {
      type: "REMEDIATE_GUARDRAIL";
      payload: { alertId: string; reason: string; timestamp: number };
    };

const logStateChange = (
  action: PipelineAction,
  prevState: PipelineState,
  nextState: PipelineState
) => {
  console.group(`Pipeline Action: ${action.type}`);
  console.log("Timestamp:", new Date().toISOString());
  console.log("Action:", action);

  // Log specific changes based on action type
  switch (action.type) {
    case "START_PIPELINE":
      console.log("Pipeline Status Change:", {
        from: prevState.status,
        to: nextState.status,
        startTime: new Date(nextState.startTime!),
      });
      break;

    case "UPDATE_NODE_STATUS":
      console.log("Node Status Update:", {
        nodeId: action.payload.nodeId,
        previousStatus: prevState.nodes[action.payload.nodeId].status,
        newStatus: action.payload.status,
        timestamp: new Date(),
      });
      break;

    case "COMPLETE_NODE":
      console.log("Node Completion:", {
        nodeId: action.payload.nodeId,
        completionTime: new Date(),
        outputTypes: action.payload.outputs
          ? action.payload.outputs.map((o) => o.component)
          : [],
        totalCompletedNodes: nextState.stats?.completedNodes,
      });
      break;

    case "ADD_LOG":
      console.log("New Log Entry:", action.payload.log);
      break;
  }

  // Log state changes summary
  console.log("State Changes:", {
    pipelineStatus:
      prevState.status !== nextState.status
        ? {
            from: prevState.status,
            to: nextState.status,
          }
        : "unchanged",
    completedNodes: {
      before: prevState.stats?.completedNodes,
      after: nextState.stats?.completedNodes,
    },
    activeNodes: Object.entries(nextState.nodes)
      .filter(([_, node]) => node.status === "running")
      .map(([id]) => id),
  });

  console.groupEnd();
};

export function pipelineReducer(
  state: PipelineState,
  action: PipelineAction
): PipelineState {
  let nextState: PipelineState;

  switch (action.type) {
    case "START_PIPELINE":
      nextState = {
        ...state,
        status: "running",
        startTime: Date.now(),
      };
      break;

    case "PAUSE_PIPELINE":
      nextState = {
        ...state,
        status: "paused",
      };
      break;

    case "CANCEL_PIPELINE":
      nextState = {
        ...state,
        status: "cancelled",
        endTime: Date.now(),
      };
      break;

    case "COMPLETE_PIPELINE":
      nextState = {
        ...state,
        status: "completed",
        endTime: Date.now(),
      };
      break;

    case "UPDATE_NODE_STATUS":
      nextState = {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.nodeId]: {
            ...state.nodes[action.payload.nodeId],
            status: action.payload.status,
            ...(action.payload.status === "running"
              ? { startTime: Date.now() }
              : {}),
          },
        },
      };
      break;

    case "ADD_LOG":
      nextState = {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.nodeId]: {
            ...state.nodes[action.payload.nodeId],
            logs: [
              ...state.nodes[action.payload.nodeId].logs,
              action.payload.log,
            ],
          },
        },
      };
      break;

    case "COMPLETE_NODE":
      const completedNodes = state.stats?.completedNodes || 0;
      nextState = {
        ...state,
        nodes: {
          ...state.nodes,
          [action.payload.nodeId]: {
            ...state.nodes[action.payload.nodeId],
            status: "completed",
            endTime: Date.now(),
            outputs: action.payload.outputs || [],
          },
        },
        stats: {
          ...state.stats!,
          completedNodes: completedNodes + 1,
        },
      };
      break;

    case "OVERRIDE_GUARDRAIL":
      nextState = {
        ...state,
        userOverrides: [
          ...state.userOverrides,
          {
            nodeId: state.activeGuardrail?.nodeId || "",
            timestamp: action.payload.timestamp,
            reason: action.payload.reason,
          },
        ],
        activeGuardrail: null,
      };
      break;

    case "REMEDIATE_GUARDRAIL":
      nextState = {
        ...state,
        userRemediations: [
          ...state.userRemediations,
          {
            nodeId: state.activeGuardrail?.nodeId || "",
            timestamp: action.payload.timestamp,
            reason: action.payload.reason,
          },
        ],
        activeGuardrail: null,
      };
      break;

    default:
      return state;
  }

  // Log state changes
  // logStateChange(action, state, nextState);

  return nextState;
}
