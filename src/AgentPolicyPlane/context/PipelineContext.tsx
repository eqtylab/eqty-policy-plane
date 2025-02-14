// src/AgentPolicyPlane/context/PipelineContext.tsx

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { PipelineState, PipelineStatus } from "./types.pipeline";
import { pipelineReducer, PipelineAction } from "./pipelineReducer";
import { PipelineOrchestrator } from "./PipelineOrchestrator";
import { pipelineConfig } from "./simulation/demo-simulation-pipeline";

interface PipelineContextValue {
  state: PipelineState;
  startPipeline: () => void;
  pausePipeline: () => void;
  cancelPipeline: () => void;
  overrideGuardrail: (alertId: string, reason: string) => void;
  remediateGuardrail: (alertId: string, reason: string) => void;
}

const initialState: PipelineState = {
  status: "idle",
  nodes: Object.keys(pipelineConfig.nodes).reduce(
    (acc, nodeId) => ({
      ...acc,
      [nodeId]: {
        status: "idle",
        logs: [],
        outputs: [],
      },
    }),
    {}
  ),
  activeGuardrail: null,
  userOverrides: [],
  userRemediations: [],
  metrics: {
    responseTime: 0,
    riskLevel: "low",
    activeIncidents: 0,
  },
  stats: {
    totalNodes: Object.keys(pipelineConfig.nodes).length,
    completedNodes: 0,
    failedNodes: 0,
    blockedNodes: 0,
  },
};

const PipelineContext = createContext<PipelineContextValue | undefined>(
  undefined
);

export function PipelineProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(pipelineReducer, initialState);

  // Create orchestrator instance
  const orchestrator = useMemo(
    () => new PipelineOrchestrator(pipelineConfig, dispatch),
    []
  );

  const startPipeline = useCallback(() => {
    // Prevent starting if already running
    if (state.status === "running") {
      return;
    }

    // Reset state if previously completed or cancelled
    if (
      state.status === "idle" ||
      state.status === "completed" ||
      state.status === "cancelled"
    ) {
      dispatch({ type: "START_PIPELINE" });
    }

    // Start orchestrator
    orchestrator.start();
  }, [state.status, orchestrator]);

  const pausePipeline = useCallback(() => {
    if (state.status === "running") {
      dispatch({ type: "PAUSE_PIPELINE" });
    }
  }, [state.status]);

  const cancelPipeline = useCallback(() => {
    if (state.status === "running" || state.status === "paused") {
      dispatch({ type: "CANCEL_PIPELINE" });
    }
  }, [state.status]);

  const overrideGuardrail = useCallback((alertId: string, reason: string) => {
    dispatch({
      type: "OVERRIDE_GUARDRAIL",
      payload: {
        alertId,
        reason,
        timestamp: Date.now(),
      },
    });
  }, []);

  const remediateGuardrail = useCallback((alertId: string, reason: string) => {
    dispatch({
      type: "REMEDIATE_GUARDRAIL",
      payload: {
        alertId,
        reason,
        timestamp: Date.now(),
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      state,
      startPipeline,
      pausePipeline,
      cancelPipeline,
      overrideGuardrail,
      remediateGuardrail,
    }),
    [
      state,
      startPipeline,
      pausePipeline,
      cancelPipeline,
      overrideGuardrail,
      remediateGuardrail,
    ]
  );

  return (
    <PipelineContext.Provider value={value}>
      {children}
    </PipelineContext.Provider>
  );
}

// Custom hook to use the pipeline context
export function usePipeline() {
  const context = useContext(PipelineContext);
  if (context === undefined) {
    throw new Error("usePipeline must be used within a PipelineProvider");
  }
  return context;
}
