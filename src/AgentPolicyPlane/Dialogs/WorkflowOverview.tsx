// src/AgentPolicyPlane/Dialogs/WorkflowOverview.tsx

import React from "react";

interface WorkflowMetric {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const metrics: WorkflowMetric[] = [
  {
    value: 11,
    label: "Total Agents",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1.75L12.25 4.375V9.625L7 12.25L1.75 9.625V4.375L7 1.75Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
    color: "tw-text-cyan-400",
  },
  {
    value: 2,
    label: "Nemo Guards",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.33334 2.33334H11.6667M2.33334 7H11.6667M2.33334 11.6667H11.6667"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "tw-text-green-400",
  },
  {
    value: 3,
    label: "Data Sources",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M4.66666 1.75H9.33332L11.6667 4.08333V9.91667L9.33332 12.25H4.66666L2.33333 9.91667V4.08333L4.66666 1.75Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
    color: "tw-text-purple-400",
  },
  {
    value: 2,
    label: "External Tools",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7.58333 1.75H11.6667V5.83333M11.6667 1.75L8.16667 5.25M6.41667 12.25H2.33333V8.16667M2.33333 12.25L5.83333 8.75"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "tw-text-orange-400",
  },
];

const stages = [
  {
    name: "Parallel Input Processing",
    details: "Video Analysis & OSINT Collection",
    color: "tw-border-blue-500/30",
  },
  {
    name: "Information Fusion",
    details: "NVIDIA LLM & OSINT Summary",
    color: "tw-border-purple-500/30",
  },
  {
    name: "Risk Assessment",
    details: "Nemo Guardrails & Human Override",
    color: "tw-border-green-500/30",
  },
  {
    name: "Response Execution",
    details: "Twilio & Apptek Integration",
    color: "tw-border-orange-500/30",
  },
];

export const AgentPolicyWorkflowOverviewDialog: React.FC = () => {
  return (
    <div className="tw-w-[264px] tw-flex tw-flex-col tw-bg-branddialogbg tw-rounded-xl tw-p-4 mt-3">
      {/* Header */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-gradient-to-br tw-from-blue-500/20 tw-to-purple-500/20 tw-flex tw-items-center tw-justify-center">
          {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L14 5V11L8 14L2 11V5L8 2Z"
              stroke="white"
              strokeWidth="1.2"
            />
          </svg> */}
        </div>
        <div>
          <h3 className="tw-text-white tw-text-sm tw-font-medium">
            Notify First Responders
          </h3>
          <p className="tw-text-white/60 tw-text-xs">Agentic Workflow</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="tw-bg-white/[0.03] tw-rounded-lg tw-p-2 tw-border !tw-border-white/10"
          >
            <div className={`tw-flex tw-items-center tw-gap-1.5 ${metric.color}`}>
              {metric.value}
              <span className="tw-text-xs">{metric.label}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="tw-mb-3">
        <div className="tw-text-white/80 tw-text-xs tw-font-medium tw-mb-2">
          Input Sources
        </div>
        <div className="tw-flex tw-flex-wrap tw-gap-1">
          {["Video Feed", "EMS Reports", "Dispatch Logs", "Social Media"].map((source) => (
            <span key={source} className="tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[10px] tw-bg-white/[0.03] tw-border !tw-border-white/10 tw-text-white/80">
              {source}
            </span>
          ))}
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="tw-space-y-2">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className={`tw-border-l-2 ${stage.color} tw-pl-2 tw-py-0.5`}
          >
            <div className="tw-text-white tw-text-xs tw-font-medium">
              {stage.name}
            </div>
            <div className="tw-text-white/60 tw-text-xs">{stage.details}</div>
          </div>
        ))}
      </div>

      {/* Integration Details */}
      <div className="tw-mt-4 tw-pt-3 tw-border-t !tw-border-white/10">
        <div className="tw-flex tw-justify-between tw-items-center tw-text-xs">
          <span className="tw-text-white/60">Core Technology</span>
          <span className="tw-text-white">NVIDIA Nemo + LLMs</span>
        </div>
        <div className="tw-flex tw-justify-between tw-items-center tw-text-xs tw-mt-1">
          <span className="tw-text-white/60">Notification</span>
          <span className="tw-text-white">Twilio + Apptek</span>
        </div>
      </div>
    </div>
  );
};