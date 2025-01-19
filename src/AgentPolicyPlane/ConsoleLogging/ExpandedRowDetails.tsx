// src/AgentPolicyPlane/ConsoleLogging/ExpandedRowDetails.tsx

import React from "react";
import { ExternalLink } from "lucide-react";

import { LogEntry } from "../context/types.logs";

export function ExpandedDetails({ entry }: { entry: LogEntry }) {
  switch (entry.type) {
    case "human-override":
      return (
        <div className="tw-space-y-2">
          <h4 className="tw-text-white tw-font-medium">Override Details</h4>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div>
              <div className="tw-text-white/60 tw-text-xs">Approved By</div>
              <div className="tw-text-white">{entry.details}</div>
            </div>
            <div>
              <div className="tw-text-white/60 tw-text-xs">Justification</div>
              <div className="tw-text-white">{entry.details}</div>
            </div>
          </div>
        </div>
      );

    case "agent-output":
      return (
        <div className="tw-space-y-2">
          <h4 className="tw-text-white tw-font-medium">Output Details</h4>
          <div className="tw-grid tw-grid-cols-3 tw-gap-4">
            <div>
              <div className="tw-text-white/60 tw-text-xs">Type</div>
              <div className="tw-text-white">{entry.output?.type}</div>
            </div>
            <div>
              <div className="tw-text-white/60 tw-text-xs">ID</div>
              <div className="tw-text-white">{entry.output?.id}</div>
            </div>
            <div>
              <button
                className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 
                             tw-rounded tw-bg-cyan-500/20 tw-text-cyan-400"
                onClick={() => {
                  // Navigate to output location
                  console.log("Navigate to:", entry.output?.location);
                }}
              >
                <ExternalLink className="tw-w-4 tw-h-4" />
                View Output
              </button>
            </div>
          </div>
        </div>
      );

    case "guardrail-pass":
      return (
        <div className="tw-space-y-2">
          <h4 className="tw-text-white tw-font-medium">Guardrail Evaluation</h4>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div>
              <div className="tw-text-white/60 tw-text-xs">Checks Passed</div>
              <div className="tw-text-white">{entry.details}</div>
            </div>
            {entry.metrics && (
              <div>
                <div className="tw-text-white/60 tw-text-xs">
                  Evaluation Time
                </div>
                <div className="tw-text-white">
                  {entry.metrics.executionTime}ms
                </div>
              </div>
            )}
          </div>
        </div>
      );

    default:
      if (entry.metrics?.apiCalls?.length) {
        return (
          <div className="tw-space-y-2">
            <h4 className="tw-text-white tw-font-medium">API Calls</h4>
            <div className="tw-space-y-1">
              {entry.metrics.apiCalls.map((call, i) => (
                <div
                  key={i}
                  className="tw-flex tw-items-center tw-gap-4 tw-text-xs"
                >
                  <span className="tw-text-white/60">{call.service}</span>
                  <span className="tw-text-white">{call.duration}ms</span>
                  <span
                    className={`tw-px-1.5 tw-rounded ${
                      call.status < 400
                        ? "tw-bg-green-500/20 tw-text-green-400"
                        : "tw-bg-red-500/20 tw-text-red-400"
                    }`}
                  >
                    {call.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return null;
  }
}
