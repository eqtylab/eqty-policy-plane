// src/AgentPolicyPlane/ConsoleLogging/index.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";

import {
  FileCode,
  Terminal,
  CircleAlert,
  Clock,
  Database,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Shield,
  UserCheck,
  CheckCircle,
} from "lucide-react";

import { LogEntry, LogLevel, AgentType } from "./types";

const agentColorMap: Record<AgentType, string> = {
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

const logLevelStyles: Record<LogLevel, { color: string; background: string }> =
  {
    info: {
      color: "tw-text-brandblue",
      background: "tw-bg-brandblue/5",
    },
    success: {
      color: "tw-text-green-400",
      background: "tw-bg-green-400/5",
    },
    error: { color: "tw-text-brandred", background: "tw-bg-brandred/5" },
    warning: { color: "tw-text-yellow-400", background: "tw-bg-yellow-400/5" },
    "agent-complete": {
      color: "tw-text-purple-400",
      background: "tw-bg-purple-400/5",
    },
    "agent-output": {
      color: "tw-text-cyan-400",
      background: "tw-bg-cyan-400/5",
    },
    "guardrail-pass": {
      color: "tw-text-emerald-400",
      background: "tw-bg-emerald-400/5",
    },
    "human-override": {
      color: "tw-text-amber-400",
      background: "tw-bg-amber-400/5",
    },
    critical: { color: "tw-text-red-500", background: "tw-bg-red-500/5" },
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

function LogRow({
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

function ConsoleDrawer({
  logEntries = [],
  isOpen = true,
  onToggle,
}: {
  logEntries: LogEntry[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [filterAgent, setFilterAgent] = useState<string | null>(null);
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(
    new Set()
  );

  // Handle row expansion
  const toggleExpand = (entryId: number) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }
      return next;
    });
  };

  // Get unique agents for filtering
  const agents = useMemo(() => {
    const uniqueAgents = new Set();
    logEntries.forEach((entry) => {
      if (entry.agent) {
        uniqueAgents.add(entry.agent);
      }
    });
    return Array.from(uniqueAgents);
  }, [logEntries]);

  return (
    <div
      className={`tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-z-50 
                      tw-transition-transform tw-duration-300 tw-ease-in-out 
                      ${
                        isOpen
                          ? "tw-translate-y-0"
                          : "tw-translate-y-[calc(100%-40px)]"
                      }`}
    >
      {/* Header Bar */}
      <div
        onClick={onToggle}
        className={`tw-flex tw-items-center tw-justify-between  tw-cursor-pointer
                         tw-px-4 tw-py-2 tw-rounded-t-xl 
                        tw-border-b !tw-border-white/10
                        
                         ${
                           isOpen
                             ? "tw-bg-branddialogbg/90"
                             : "tw-bg-branddialogbg/40"
                         }`}
      >
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-flex tw-items-center tw-gap-2 ">
            <Terminal className="tw-w-4 tw-h-4 tw-text-brandblue" />
            <span className="tw-text-white tw-text-sm tw-font-medium">
              Console Output
            </span>
          </div>

          {/* Agent Filter */}
          <select
            className={`tw-bg-transparent tw-border !tw-border-white/20 tw-rounded 
                         tw-px-2 tw-py-1 tw-text-white/80 tw-text-xs tw-w-[200px]
                         
                         ${isOpen ? "tw-block" : "tw-hidden"}

                         `}
            value={filterAgent || ""}
            onChange={(e) => setFilterAgent(e.target.value || null)}
          >
            <option value="">All Agents</option>
            {agents.map((agent: any) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>

          {/* Auto-scroll Toggle */}
          <button
            className={`tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 
                         tw-rounded tw-text-xs ${
                           isAutoScrollPaused
                             ? "tw-bg-white/10 tw-text-white/60"
                             : "tw-bg-brandblue/20 tw-text-brandblue"
                         }
                         
                          ${isOpen ? "tw-block" : "tw-hidden"}
                          `}
            onClick={() => setIsAutoScrollPaused(!isAutoScrollPaused)}
          >
            <Clock className="tw-w-3 tw-h-3" />
            {isAutoScrollPaused ? "Resume Auto-scroll" : "Auto-scrolling"}
          </button>
        </div>
      </div>

      {/* Console Content */}
      <div className="tw-bg-black tw-border-x !tw-border-white/10">
        <div
          ref={scrollRef}
          className="tw-h-[300px] tw-overflow-y-auto tw-font-mono"
        >
          <table className="tw-w-full tw-table-fixed tw-text-xs tw-border-spacing-0">
            <colgroup>
              {/* Time column - fixed width for timestamps */}
              <col className="tw-w-[45px]" />
              {/* Agent column - medium width */}
              <col className="tw-w-[116px]" />
              {/* Type column - medium width */}
              <col className="tw-w-[90px]" />
              {/* Message column - flexible width */}
              <col className="tw-w-[200px]" />
              {/* Details column - flexible width */}
              <col className="tw-w-[300px]" />
              {/* Metrics column - small fixed width */}
              <col className="tw-w-[50px]" />
              {/* Hash column - fixed width for consistent hash display */}
              <col className="tw-w-[70px]" />
            </colgroup>
            <thead className="tw-sticky tw-top-0 tw-bg-[#2d293b]  tw-z-10   tw-border-b   !tw-border-white/10">
              <tr className="tw-border-b !tw-border-white/10">
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60 tw-w-[45px]">
                  Time
                </th>
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60 tw-w-[116px]">
                  Agent
                </th>
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60 tw-w-[90px]">
                  Type
                </th>
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60">
                  Message
                </th>
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60">
                  Details
                </th>
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60 tw-w-[50px]">
                  Metrics
                </th>
                <th className="tw-p-2 tw-text-left tw-font-medium tw-text-white/60 tw-w-[70px]">
                  CID
                </th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((entry) => (
                <React.Fragment key={entry.id}>
                  <LogRow
                    entry={{
                      ...entry,
                      expanded: expandedEntries.has(entry.id),
                    }}
                    onClick={() => {
                      if (entry.expandable) {
                        toggleExpand(entry.id);
                      }
                      setIsAutoScrollPaused(true);
                    }}
                    isAutoScrollPaused={isAutoScrollPaused}
                  />
                  {/* Expanded Details for Critical Events */}
                  {entry.expandable && expandedEntries.has(entry.id) && (
                    <tr
                      className={`${
                        logLevelStyles[entry.type].background
                      } tw-opacity-80`}
                    >
                      <td colSpan={7} className="tw-p-2 tw-h-8">
                        <ExpandedDetails entry={entry} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="tw-h-8" />
        </div>
      </div>
    </div>
  );
}

// Expanded Details Component for Critical Events
function ExpandedDetails({ entry }: { entry: LogEntry }) {
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

// const simulatedLogs: Omit<LogEntry, "id" | "timestamp" | "hash">[] = [
//   {
//     content: "Video Feed Collector established connection with city cameras",
//     details:
//       "Successfully streaming from 12 surveillance points in flood-risk areas",
//     type: "info",
//     agent: {
//       id: "video-1",
//       name: "Video Collector",
//       type: "video-collector",
//     },
//     metrics: {
//       executionTime: 234,
//       apiCalls: [{ service: "surveillance-api", duration: 123, status: 200 }],
//     },
//     expandable: true,
//   },
//   {
//     content: "Social Media Monitor detected spike in flooding hashtags",
//     details:
//       "Multiple distress calls identified on Twitter and Facebook in downtown area",
//     type: "warning",
//     agent: {
//       id: "social-1",
//       name: "Social Monitor",
//       type: "social-monitor",
//     },
//     expandable: true,
//   },
//   {
//     content: "Service Call Analyzer detected anomaly in emergency calls",
//     details:
//       "400% increase in water-related emergency calls in past 30 minutes",
//     type: "critical",
//     agent: {
//       id: "calls-1",
//       name: "Service Call Analyzer",
//       type: "service-call-analyzer",
//     },
//     output: {
//       type: "chart",
//       id: "anomaly-001",
//       location: "/outputs/anomaly-001",
//     },
//     expandable: true,
//   },
//   {
//     content: "NEMO Guardrail Analysis Complete",
//     details: "Risk assessment passed - Emergency response authorized",
//     type: "guardrail-pass",
//     agent: {
//       id: "nemo-1",
//       name: "NEMO Guardrail",
//       type: "nemo-guardrail",
//     },
//     metrics: {
//       executionTime: 456,
//     },
//     expandable: true,
//   },
//   {
//     content: "Response Plan Generated",
//     details: "Emergency response plan created and validated",
//     type: "agent-complete",
//     agent: {
//       id: "plan-1",
//       name: "Plan Creator",
//       type: "plan-creator",
//     },
//     output: {
//       type: "report",
//       id: "plan-001",
//       location: "/outputs/plan-001",
//     },
//     expandable: true,
//   },
// ];

export const FullLogOut: LogEntry[] = [
  {
    id: 1,
    content: "Pipeline execution started",
    details: "Initializing concurrent data collection paths",
    timestamp: "14:00:00",
    type: "info",
    hash: "a1b2c3d4e5f6g7h8",
    expandable: true,
  },
  {
    id: 2,
    content: "Video Feed Collector established connection",
    details:
      "Successfully connected to surveillance network - streaming from 8 critical flood zone cameras",
    timestamp: "14:00:02",
    type: "info",
    agent: {
      id: "video-1",
      name: "Video Feed Collector",
      type: "video-collector",
    },
    metrics: {
      executionTime: 1850,
      apiCalls: [
        {
          service: "surveillance-api",
          duration: 1200,
          status: 200,
        },
      ],
    },
    expandable: true,
  },
  {
    id: 3,
    content: "Video Analysis Complete",
    details:
      "NVIDIA mixed-modal LLM analysis detected rising water levels in zones A3 and B2",
    timestamp: "14:00:45",
    type: "agent-complete",
    agent: {
      id: "analyze-1",
      name: "Video Analyzer",
      type: "video-analyzer",
    },
    output: {
      type: "report",
      id: "video-analysis-001",
      location: "/outputs/video/001",
    },
    expandable: true,
  },
  {
    id: 4,
    content: "Partner Report Collection Started",
    details: "Retrieving reports from 5 local EMS stations",
    timestamp: "14:00:03",
    type: "info",
    agent: {
      id: "partner-1",
      name: "Partner Report Analyzer",
      type: "partner-analyzer",
    },
    expandable: true,
  },
  {
    id: 5,
    content: "Service Call Analysis Alert",
    details:
      "Detected 300% increase in water-related emergency calls in past 15 minutes",
    timestamp: "14:00:15",
    type: "warning",
    agent: {
      id: "calls-1",
      name: "Service Call Analyzer",
      type: "service-call-analyzer",
    },
    output: {
      type: "chart",
      id: "call-pattern-001",
      location: "/outputs/calls/patterns/001",
    },
    expandable: true,
  },
  {
    id: 6,
    content: "Social Media Monitor Alert",
    details:
      "Multiple verified distress calls detected on Twitter and Telegram in downtown area",
    timestamp: "14:00:20",
    type: "warning",
    agent: {
      id: "social-1",
      name: "Social Media Monitor",
      type: "social-monitor",
    },
    expandable: true,
  },
  {
    id: 7,
    content: "OSINT Summary Generated",
    details: "Compiled emergency situation report from all OSINT sources",
    timestamp: "14:01:00",
    type: "agent-output",
    agent: {
      id: "summary-1",
      name: "Information Summarizer",
      type: "summarizer",
    },
    output: {
      type: "markdown",
      id: "osint-summary-001",
      location: "/outputs/summary/001",
    },
    expandable: true,
  },
  {
    id: 8,
    content: "Nemo Guardrail Check Initiated",
    details: "Analyzing risk factors and validating response necessity",
    timestamp: "14:01:15",
    type: "info",
    agent: {
      id: "nemo-1",
      name: "Nemo Guardrail",
      type: "nemo-guardrail",
    },
    expandable: true,
  },
  {
    id: 9,
    content: "Human Override Required",
    details: "High-risk scenario detected - requires manual authorization",
    timestamp: "14:01:30",
    type: "warning",
    agent: {
      id: "policy-1",
      name: "Policy Override Validator",
      type: "policy-validator",
    },
    expandable: true,
  },
  {
    id: 10,
    content: "Human Override Granted",
    details: "Emergency response protocol override approved by operator",
    timestamp: "14:02:00",
    type: "human-override",
    metrics: {
      executionTime: 500,
    },
    expandable: true,
  },
  {
    id: 11,
    content: "Response Plan Generated",
    details: "Comprehensive emergency response plan created",
    timestamp: "14:02:30",
    type: "agent-complete",
    agent: {
      id: "plan-1",
      name: "Response Plan Creator",
      type: "plan-creator",
    },
    output: {
      type: "report",
      id: "response-plan-001",
      location: "/outputs/plans/001",
    },
    expandable: true,
  },
  {
    id: 12,
    content: "First Responder Notification Complete",
    details:
      "Successfully notified all emergency response units via Twilio and Apptek",
    timestamp: "14:03:00",
    type: "success",
    agent: {
      id: "notify-1",
      name: "First Responder Notifier",
      type: "responder-notifier",
    },
    metrics: {
      apiCalls: [
        {
          service: "twilio-api",
          duration: 800,
          status: 200,
        },
        {
          service: "apptek-api",
          duration: 600,
          status: 200,
        },
      ],
    },
    expandable: true,
  },
];

export function RunLogging() {
  const [isOpen, setIsOpen] = useState(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [lastId, setLastId] = useState(0);
  const [addedEntriesCount, setAddedEntriesCount] = useState(0);

  // Generate hash for audit
  const generateHash = async (entry: LogEntry) => {
    const data = JSON.stringify({
      timestamp: entry.timestamp,
      content: entry.content,
      agent: entry.agent?.id,
    });
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(data)
    );
    const h = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // replace first 3 chars with bak
    return `bak${h.slice(3)}`;
  };

  useEffect(() => {
    if (addedEntriesCount >= FullLogOut.length) {
      return;
    }

    const randomInterval = Math.floor(Math.random() * 13) + 4;

    const intervalId = setInterval(async () => {
      const baseEntry = FullLogOut[addedEntriesCount];
      const newEntry: LogEntry = {
        ...baseEntry,
        id: lastId + 1,
        timestamp: new Date().toISOString().substr(11, 8),
        hash: await generateHash({
          ...baseEntry,
          id: lastId + 1,
          timestamp: new Date().toISOString().substr(11, 8),
        } as LogEntry),
      };

      setLogEntries((prev) => [...prev, newEntry].slice(-100));
      setLastId((prev) => prev + 1);
      setAddedEntriesCount((prev) => prev + 1);
    }, randomInterval * 150);

    return () => clearInterval(intervalId);
  }, [lastId, addedEntriesCount]);

  return (
    <ConsoleDrawer
      logEntries={logEntries}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    />
  );
}
