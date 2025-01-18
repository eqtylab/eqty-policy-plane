// src/AgentPolicyPlane/ConsoleLogging/index.tsx
import { FileCode } from "../icons/file-code";
import { CircleAlert } from "../icons/circle-alert";
import { Terminal } from "../icons/terminal";

interface LogEntry {
  id: number;
  content: string;
  details: string;
  timestamp: string;
  type: "info" | "success" | "error" | "warning";
}

const initialLogEntries: LogEntry[] = [
  {
    id: 1,
    content: "System boot initiated",
    details: "Kernel version 5.15.0-72-generic",
    timestamp: "08:00:01",
    type: "info",
  },
  {
    id: 2,
    content: "Network interface eth0 up",
    details: "IP: 192.168.1.100",
    timestamp: "08:00:03",
    type: "success",
  },
  {
    id: 3,
    content: "Failed to mount /dev/sdb1",
    details: "Error: Device not found",
    timestamp: "08:00:05",
    type: "error",
  },
];

const newLogEntries = [
  {
    id: 1,
    content: "Video Feed Collector established connection with city cameras",
    details:
      "Successfully streaming from 12 surveillance points in flood-risk areas",
    timestamp: "09:00:00",
    type: "info",
  },
  {
    id: 2,
    content: "Social Media Monitor detected spike in flooding hashtags",
    details:
      "Multiple distress calls identified on Twitter and Facebook in downtown area",
    timestamp: "09:02:00",
    type: "warning",
  },
  {
    id: 3,
    content: "Service Call Analyzer detected anomaly in emergency calls",
    details:
      "400% increase in water-related emergency calls in past 30 minutes",
    timestamp: "09:05:00",
    type: "warning",
  },
  {
    id: 4,
    content: "Partner Report Analyzer received EMS station updates",
    details:
      "Three stations reporting rapid water level rise, two stations mobilizing boats",
    timestamp: "09:08:00",
    type: "info",
  },
  {
    id: 5,
    content: "Video Analyzer identified critical infrastructure threats",
    details: "Water approaching electrical substations in multiple locations",
    timestamp: "09:10:00",
    type: "error",
  },
  {
    id: 6,
    content: "Information Summarizer compiling initial situation report",
    details:
      "Aggregating data from social media, EMS reports, and video analysis",
    timestamp: "09:12:00",
    type: "info",
  },
  {
    id: 7,
    content: "Nemo Guardrail evaluating response triggers",
    details:
      "Checking for life-safety risks and infrastructure damage potential",
    timestamp: "09:15:00",
    type: "info",
  },
  {
    id: 8,
    content: "Event Prioritizer analyzing affected areas",
    details: "Mapping flood zones and identifying highest-risk populations",
    timestamp: "09:18:00",
    type: "info",
  },
  {
    id: 9,
    content: "Policy Override Validator requesting authorization",
    details:
      "High-risk scenario detected, requiring immediate AI-driven response",
    timestamp: "09:20:00",
    type: "warning",
  },
  {
    id: 10,
    content: "Response Plan Creator drafting emergency protocol",
    details: "Incorporating real-time data for targeted evacuation routes",
    timestamp: "09:22:00",
    type: "info",
  },
  {
    id: 11,
    content: "First Responder Notifier initiating emergency broadcasts",
    details:
      "Dispatching alerts via Twilio to all local emergency response units",
    timestamp: "09:25:00",
    type: "info",
  },
  {
    id: 12,
    content: "Emergency Response Protocol Activated",
    details:
      "All agents coordinated, first responders deploying to priority zones",
    timestamp: "09:30:00",
    type: "success",
  },
];

import React, { useState, useEffect, useRef } from "react";

const colorMap = {
  info: "tw-text-brandblue",
  success: "tw-text-green-400",
  error: "tw-text-brandred",
  warning: "tw-text-yellow-400",
};

const rowHighlightMap = {
  info: "tw-bg-brandblue/5",
  success: "tw-bg-green-400/5",
  error: "tw-bg-brandred/5",
  warning: "tw-bg-yellow-400/5",
};

const iconMap = {
  info: Terminal,
  success: FileCode,
  error: CircleAlert,
  warning: CircleAlert,
};

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logEntries]);

  return (
    <div
      className={`tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-z-50 tw-transition-transform tw-duration-300 tw-ease-in-out ${
        isOpen ? "tw-translate-y-0" : "tw-translate-y-[calc(100%-40px)]"
      }`}
    >
      {/* Header Bar */}
      <div
        onClick={
          // if closed, open the drawer
          onToggle
        }
        className="z-[9999] tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-bg-branddialogbg/40 hover:tw-bg-branddialogbg/80  tw-px-4 tw-py-2 tw-rounded-t-xl tw-border-b !tw-border-white/10 tw-transition-all tw-duration-200 "
      >
        <div className="tw-flex tw-items-center tw-gap-2">
          <div className="tw-w-4 tw-h-4 tw-text-brandblue">
            <Terminal />
          </div>
          <span className="tw-text-white tw-text-sm tw-font-medium">
            Console Output
          </span>
        </div>
      </div>

      {/* Console Content */}
      <div className="tw-bg-black tw-border-x !tw-border-white/10">
        <div
          ref={scrollRef}
          className="tw-h-[300px] tw-overflow-y-auto tw-font-mono"
        >
          <table className="tw-w-full">
            <thead className="tw-sticky tw-top-0 tw-bg-[#2d293b] tw-z-10">
              <tr className="tw-border-b !tw-border-white/10">
                <th className="tw-p-2 tw-text-left tw-text-xs tw-font-medium tw-text-white/60">
                  Time
                </th>
                <th className="tw-p-2 tw-text-left tw-text-xs tw-font-medium tw-text-white/60">
                  Type
                </th>
                <th className="tw-p-2 tw-text-left tw-text-xs tw-font-medium tw-text-white/60">
                  Message
                </th>
                <th className="tw-p-2 tw-text-left tw-text-xs tw-font-medium tw-text-white/60">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((entry, index) => {
                const Icon = iconMap[entry.type];
                return (
                  <tr
                    key={entry.id}
                    className={`tw-border-b !tw-border-white/5 ${
                      index !== 0 ? "tw-animate-fade-in" : ""
                    } ${rowHighlightMap[entry.type]}`}
                  >
                    <td className="tw-p-2 tw-text-xs tw-text-white/80">
                      {entry.timestamp}
                    </td>
                    <td className="tw-p-2 tw-whitespace-nowrap">
                      <div className="tw-flex tw-items-center tw-gap-1.5">
                        <div
                          className={`tw-w-3.5 tw-h-3.5 ${
                            colorMap[entry.type]
                          }`}
                        >
                          <Icon />
                        </div>
                        <span
                          className={`tw-text-xs tw-font-medium ${
                            colorMap[entry.type]
                          }`}
                        >
                          {entry.type.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="tw-p-2 tw-text-xs tw-text-white">
                      {entry.content}
                    </td>
                    <td className="tw-p-2 tw-text-xs tw-text-white/60">
                      {entry.details}
                    </td>
                  </tr>
                );
              })}
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
  const [logEntries, setLogEntries] = useState(initialLogEntries);
  const [lastId, setLastId] = useState(initialLogEntries.length);
  const [addedEntriesCount, setAddedEntriesCount] = useState(0);

  useEffect(() => {
    if (addedEntriesCount >= newLogEntries.length) {
      return; // Stop the effect if we've added all entries
    }
    const randomInterval = Math.floor(Math.random() * 13) + 4;

    const intervalId = setInterval(() => {
      const newEntry = {
        ...newLogEntries[addedEntriesCount],
        id: lastId + 1,
        timestamp: new Date().toISOString().substr(11, 8),
      } as LogEntry;
      setLogEntries((prevEntries) => [...prevEntries, newEntry].slice(-100));
      setLastId((prevId) => prevId + 1);
      setAddedEntriesCount((prevCount) => prevCount + 1);
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
