// src/AgentPolicyPlane/ConsoleLogging/index.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";

import { Terminal, Clock } from "lucide-react";

import { LogEntry } from "../context/types.logs";

import { usePipeline } from "../context/PipelineContext";

import { ExpandedDetails } from "./ExpandedRowDetails";
import { LogRow } from "./LogRow";
import { logLevelStyles } from "./logStyles";

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

export function RunLogging() {
  const [isOpen, setIsOpen] = useState(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  const { state: pipelineState } = usePipeline();
  useEffect(() => {
    const allLogs = Object.values(pipelineState.nodes).reduce(
      (acc, node) => acc.concat(node.logs),
      [] as LogEntry[]
    );
    setLogEntries(allLogs);
  }, [pipelineState.nodes]);

  return (
    <ConsoleDrawer
      logEntries={logEntries}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    />
  );
}
