// src/AgentPolicyPlane/PlaneWorkflowView/WorkflowPlayer/index.tsx
import React from "react";

// import { usePipeline } from "../redux/state/PipelineContext";
import { usePipeline } from "../../context/PipelineContext";

import { pipelineConfig } from "../../context/simulation/demo-simulation-pipeline";

interface WorkflowPlayerProps {
  isBlocked?: boolean; // Changed from isDisabled to be more semantic
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onCancel?: () => void;
}

export const WorkflowPlayer: React.FC<WorkflowPlayerProps> = ({
  isBlocked = false,
  isPlaying = false,
  onPlay,
  onPause,
  onCancel,
}) => {
  const { state } = usePipeline();

  // Add check for override
  const hasOverride =
    state.userOverrides.length > 0 && state.userRemediations.length > 0;

  // Add completed nodes count
  const completedNodes = Object.values(state.nodes).filter(
    (node) => node.status === "completed"
  ).length;

  return (
    <div className="tw-w-[264px] tw-min-w-[264px] tw-rounded-xl tw-bg-branddialogbg tw-p-4">
      <div className="tw-flex tw-flex-col tw-gap-3">
        <div className="tw-flex tw-items-center tw-gap-2 tw-w-full">
          <div
            className={`tw-min-w-[8px] tw-min-h-[8px] tw-rounded-full ${
              isBlocked || !hasOverride
                ? "tw-bg-brandalert tw-animate-pulse-glow-alert"
                : state.status === "running"
                ? "tw-bg-brandblue tw-animate-pulse-glow-blue"
                : state.status === "completed"
                ? "tw-bg-brandgreen tw-animate-pulse-glow-green"
                : "tw-bg-gray-400 tw-animate-none"
            }`}
          />
          <span className="tw-text-white tw-text-xs tw-truncate">
            {isBlocked || !hasOverride
              ? "Workflow is not compliant"
              : state.status === "running"
              ? `Running: (${Math.min(
                  Math.max(completedNodes - 1, 0),
                  11
                )}/11 Agents Complete)`
              : state.status === "completed"
              ? "Completed"
              : "Ready to Run"}
          </span>
        </div>

        <div className="tw-flex tw-gap-2">
          {!isPlaying ? (
            state.status !== "completed" ? (
              <button
                onClick={onPlay}
                disabled={isBlocked || !hasOverride}
                className={`tw-flex-1 tw-py-2 tw-px-4 tw-rounded-lg tw-text-white tw-text-sm
                ${
                  isBlocked || !hasOverride
                    ? "tw-bg-gray-600 tw-cursor-not-allowed"
                    : "tw-bg-brandblue hover:tw-bg-opacity-90"
                }`}
              >
                Start
              </button>
            ) : (
              state.status == "completed" && (
                //  brandgreen button, "View Final Report"
                <button
                  onClick={onPlay}
                  className="tw-flex-1 tw-py-2 tw-px-4 tw-rounded-lg tw-bg-brandgreen tw-text-branddialogbg tw-text-sm hover:tw-bg-opacity-90"
                >
                  View Final Report
                </button>
              )
            )
          ) : (
            <button
              onClick={onPause}
              className="tw-flex tw-flex-1 tw-py-2 tw-px-4 tw-rounded-lg tw-bg-yellow-600/2 tw-text-white tw-text-sm hover:tw-bg-opacity-90"
            >
              <svg
                className="tw-animate-spin tw--ml-1 tw-mr-3 tw-h-5 tw-w-5 tw-text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="tw-opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="tw-opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{" "}
              Pause
            </button>
          )}

          {isPlaying && (
            <button
              onClick={onCancel}
              className="tw-flex-1 tw-py-2 tw-px-4 tw-rounded-lg tw-bg-brandred tw-text-white tw-text-sm hover:tw-bg-opacity-90"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
