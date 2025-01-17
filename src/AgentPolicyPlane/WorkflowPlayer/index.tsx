// src/AgentPolicyPlane/WorkflowPlayer/index.tsx
import React from "react";

// import { usePipeline } from "../redux/state/PipelineContext";
import { usePipeline } from "../context/PipelineContext";

import { pipelineConfig } from "../context/demo-simulation-pipeline";

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
  const { state } = usePipeline(); // Add this

  // Add completed nodes count
  const completedNodes = Object.values(state.nodes).filter(
    node => node.status === 'completed'
  ).length;

  return (
    <div className="tw-w-[264px] tw-min-w-[264px] tw-rounded-xl tw-bg-branddialogbg tw-p-4">
      <div className="tw-flex tw-flex-col tw-gap-3">

        {/* Status indicator */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-w-full">
          <div
            className={`tw-min-w-[8px] tw-min-h-[8px] tw-rounded-full ${isBlocked
              ? "tw-bg-brandalert"
              : state.status === 'running'
                ? "tw-bg-brandblue tw-animate-pulse"
                : "tw-bg-gray-400"
              }`}
          />
          <span className="tw-text-white tw-text-xs tw-truncate">
            {isBlocked
              ? "Workflow Blocked"
              : state.status === 'running'
                ? `Running. Completed: (${completedNodes}/11 Agents)`
                : "Ready to Run"}
          </span>
        </div>

        {/* Control buttons */}
        <div className="tw-flex tw-gap-2">
          {!isPlaying ? (
            <button
              onClick={onPlay}
              disabled={isBlocked}
              className={`tw-flex-1 tw-py-2 tw-px-4 tw-rounded-lg tw-text-white tw-text-sm
                ${isBlocked
                  ? "tw-bg-gray-600 tw-cursor-not-allowed"
                  : "tw-bg-brandblue hover:tw-bg-opacity-90"}`}
            >
              Start
            </button>
          ) : (
            <button
              onClick={onPause}
              className="tw-flex-1 tw-py-2 tw-px-4 tw-rounded-lg tw-bg-yellow-600 tw-text-white tw-text-sm hover:tw-bg-opacity-90"
            >
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