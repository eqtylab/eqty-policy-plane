// src/AgentPolicyPlane/ConsoleLogging/LogRow.tsx
import React from "react";

import {
  Terminal,
  CircleAlert,
  Clock,
  Database,
  ExternalLink,
  Shield,
  UserCheck,
  CheckCircle,
} from "lucide-react";

import { LogLevel, LogEntry } from "../context/types.logs";

import { logLevelStyles } from "./logStyles";

const agentColorMap: Record<string, string> = {
  "video-collector": "tw-text-blue-400",
  "video-analyzer": "tw-text-purple-400",
  "partner-analyzer": "tw-text-green-400",
  "service-call-analyzer": "tw-text-yellow-400",
  "social-monitor": "tw-text-orange-400",
  summarizer: "tw-text-cyan-400",
  "nemo-guardrail": "tw-text-red-400",
  "event-prioritizer": "tw-text-indigo-400",
  "policy-validator": "tw-text-pink-400",
  "plan-creator": "tw-text-emerald-400",
  "responder-notifier": "tw-text-amber-400",
};

const iconMap: Record<LogLevel, React.FC> = {
  info: () => <Terminal className="tw-h-3 tw-w-3" />,
  success: () => <CheckCircle className="tw-h-3 tw-w-3" />,
  error: () => <CircleAlert className="tw-h-3 tw-w-3" />,
  warning: () => <CircleAlert className="tw-h-3 tw-w-3" />,
  "agent-complete": () => <Database className="tw-h-3 tw-w-3" />,
  "agent-output": () => <ExternalLink className="tw-h-3 tw-w-3" />,
  "guardrail-pass": () => <Shield className="tw-h-3 tw-w-3" />,
  "human-override": () => <UserCheck className="tw-h-3 tw-w-3" />,
  critical: () => <CircleAlert className="tw-h-3 tw-w-3" />,
};

export function LogRow({
  entry,
  onClick,
  isAutoScrollPaused,
}: {
  entry: LogEntry;
  onClick: () => void;
  isAutoScrollPaused: boolean;
}) {
  const Icon = iconMap[entry.type];
  const styles = logLevelStyles[entry.type];

  return (
    <tr
      onClick={onClick}
      className={`
          tw-border-b 
          !tw-border-white/5
          
          ${styles.background}
          tw-text-xs // Consistent text size
        `}
    >
      <td className="tw-p-2 tw-text-white/80">{entry.timestamp}</td>

      {/* Agent Column */}
      {entry.agent ? (
        <td className="tw-p-2 tw-whitespace-nowrap tw-max-w-[196px]">
          <div
            className={`tw-flex tw-items-center tw-gap-1.5 ${
              agentColorMap[entry.agent.type]
            }`}
          >
            <span className="tw-text-xs">{entry.agent.name}</span>
          </div>
        </td>
      ) : (
        // no agent
        <td className="tw-p-2 tw-whitespace-nowrap"></td>
      )}
      {/* Type Column */}
      <td className="tw-p-2 tw-whitespace-nowrap tw-max-w-[136px]">
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <div className={` ${styles.color}`}>
            <Icon />
          </div>
          <span className={`tw-text-xs tw-font-medium ${styles.color}`}>
            {entry.type.toUpperCase()}
          </span>
        </div>
      </td>

      {/* Message Column */}
      {/* // truncate */}
      <td className="tw-p-2 tw-min-w-0">
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-truncate">{entry.content}</span>
          {entry.output && (
            <button
              className="tw-flex-shrink-0 tw-ml-2 tw-p-1 tw-rounded hover:tw-bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Navigate to:", entry.output?.location);
              }}
            >
              <ExternalLink className="tw-w-4 tw-h-4 tw-text-cyan-400" />
            </button>
          )}
        </div>
      </td>

      {/* Details Column */}
      <td className="tw-p-2 tw-min-w-0">
        <div className="tw-truncate tw-text-white/60">{entry.details}</div>
      </td>

      {/* Metrics Column */}
      {entry.metrics ? (
        <td className="tw-p-2 tw-text-xs tw-text-white/40 ">
          {entry.metrics.executionTime && (
            <div className="tw-flex tw-items-center tw-gap-1">
              <Clock className="tw-w-3 tw-h-3" />
              {entry.metrics.executionTime}ms
            </div>
          )}
        </td>
      ) : (
        <td className="tw-p-2 tw-text-xs tw-text-white/40 "></td>
      )}

      {/* Hash Column */}
      <td className="tw-p-2 tw-text-xs tw-font-mono tw-text-white/40">
        {entry.hash?.substring(0, 12)}
      </td>
    </tr>
  );
}
