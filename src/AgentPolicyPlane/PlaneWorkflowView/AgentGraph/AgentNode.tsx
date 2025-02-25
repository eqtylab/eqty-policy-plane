// src/AgentPolicyPlane/PlaneWorkflowView/AgentGraph/AgentNode.tsx
import React, { memo, type ReactNode } from "react";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import { NodeStatus } from "../../context/types.nodes";
import { AgentIcon } from "./icons/AgentIcon";
import { NemoIcon } from "./icons/NemoIcon";

export type AgentNodeData = {
  hidden?: boolean;
  controlId?: string;
  hide?: boolean;
  title?: string;
  icon?: ReactNode;
  subline?: string;
  type?: string;
  animating?: boolean;
  parallelVertSize?: boolean;
  labelPosition?: "top" | "bottom" | "left" | "right";
  status?: NodeStatus;
  role?: string;
  backstory?: string;
  goal?: string;
  resolved?: boolean;
};

const NodeLabel = ({
  title,
  subline,
  position = "top",
  type = "default",
  resolved = false,
}: {
  title: string;
  subline?: string;
  position?: "top" | "right" | "left" | "bottom";
  type?: "default" | "alert" | "nemo";
  resolved?: boolean;
}) => {
  const positionClasses = {
    top: "tw--top-10 tw-left-1/2 tw--translate-x-1/2",
    right: "tw-top-1/2 tw--translate-y-1/2 tw-left-full tw-ml-2",
    bottom: "tw-top-full tw-left-1/2 tw--translate-x-1/2 tw-mt-2",
    left: "tw-top-1/2 tw--translate-y-1/2 tw-right-full tw-mr-4", // TODO
  };
  let classes = `tw-absolute tw-whitespace-nowrap ${positionClasses[position]} !tw-border-brandbordergray tw-border tw-rounded-xl tw-p-1`;

  if (type === "alert" && !resolved) {
    classes += " tw-bg-brandred !tw-border-brandred tw-text-white";
  } else if (type === "alert" && resolved) {
    classes += " tw-bg-brandgreen !tw-border-brandgreen tw-text-branddialogbg";
    // } else if (type === "nemo") {
    // classes += " tw-bg-nvidiagreen !tw-border-nvidiagreen tw-text-white";
  } else {
    classes += " tw-text-white";
  }

  return (
    <div className={`${classes}`}>
      <div className="tw-text-[14px]">{title}</div>
      {subline && <div className=" tw-text-[10px]">{subline}</div>}
    </div>
  );
};

export default memo(({ data }: NodeProps<Node<AgentNodeData>>) => {
  const getNodeStatusStyles = (status: NodeStatus | undefined) => {
    if (!status) {
      return {};
    }

    switch (status) {
      case "running":
        return {
          background: "rgba(0, 157, 255, 0.15)",
          animation: "node-pulse 2s ease-in-out infinite",
        };
      case "completed":
        return {
          background: "rgba(39, 174, 96, 0.2)",
          boxShadow: "0 0 15px rgba(39, 174, 96, 0.5)",
        };
      case "error":
        return {
          background: "rgba(255, 0, 0, 0.2)",
          boxShadow: "0 0 15px rgba(255, 0, 0, 0.5)",
        };
      default:
        return {
          background: "rgba(255, 255, 255, 0.1)",
          opacity: 0.5,
        };
    }
  };

  if (data.hide) {
    return;
  }

  if (data.type && data.type === "policy-alert") {
    console.log("policy-alert", data);
    // alert(JSON.stringify(data));
    return (
      <div className="wrapper wrapper-alert">
        <div className="tw-flex tw-items-center tw-justify-center tw-relative tw-w-full">
          {/* Horizontal dotted line */}
          <div
            className="tw-absolute tw-w-full tw-h-px "
            style={{
              background: !data.resolved
                ? `repeating-linear-gradient(to right, rgba(208, 86, 89, 1) 0, rgba(208, 86, 89, 1) 4px, transparent 4px, transparent 8px)`
                : `repeating-linear-gradient(to right, rgb(206, 255, 220) 0, rgb(206, 255, 220) 4px, transparent 4px, transparent 8px)`,
              backgroundSize: "8px 100%",
              backgroundPosition: "6px 0", // Offsets the pattern by half its width to center it
            }}
          />

          {/* Circle with ripple effect - green when resolved, red when not */}
          <div className="tw-absolute ripple-wrapper">
            {/* Base circle */}
            <div
              id={
                data.animating
                  ? `ripple-point-eq-${data.controlId}`
                  : "requires-ID"
              }
              className={`tw-w-4 tw-h-4 tw-rounded-full tw-m-auto tw-relative ${
                data.resolved ? "tw-bg-brandgreen" : "tw-bg-brandalert"
              }`}
            >
              {/* Ripple rings - only shown when animating */}
              {data.animating && (
                <>
                  <div
                    className={`tw-absolute tw-inset-0 tw-w-4 tw-h-4 tw-rounded-full animate-ripple ${
                      data.resolved ? "tw-bg-brandgreen" : "tw-bg-brandalert"
                    }`}
                    style={{ opacity: "0.75" }}
                  ></div>
                  <div
                    className={`tw-absolute tw-inset-0 tw-w-4 tw-h-4 tw-rounded-full animate-ripple-delayed ${
                      data.resolved ? "tw-bg-brandgreen" : "tw-bg-brandalert"
                    }`}
                    style={{ opacity: "0.75" }}
                  ></div>
                  <div
                    className={`tw-absolute tw-inset-0 tw-w-4 tw-h-4 tw-rounded-full animate-ripple-more-delayed ${
                      data.resolved ? "tw-bg-brandgreen" : "tw-bg-brandalert"
                    }`}
                    style={{ opacity: "0.75" }}
                  ></div>
                </>
              )}
            </div>
          </div>
        </div>
        {data.title && (
          <NodeLabel
            title={data.title}
            subline={data.subline}
            position={data.labelPosition}
            resolved={data.resolved}
            type="alert"
          />
        )}
      </div>
    );
  }

  if (data.type && data.type === "nemo-guardrail") {
    return (
      <div
        className="wrapper tw-justify-center tw-items-center"
        style={getNodeStatusStyles(data.status)}
      >
        <div className=" tw-w-9 tw-h-9 tw-rounded-full">
          <NemoIcon />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />

          <Handle id="sourcetop" type="source" position={Position.Top} />
          <Handle id="targetbottom" type="target" position={Position.Bottom} />

          <Handle id="sourceright" type="source" position={Position.Right} />
          <Handle id="targettop" type="target" position={Position.Top} />
        </div>
        {data.title && (
          <NodeLabel
            title={data.title}
            subline={data.subline}
            position={data.labelPosition}
            // type="default"
          />
        )}
      </div>
    );
  }
  return (
    <>
      <div
        className={`${data.parallelVertSize ? "wrapper-half" : "wrapper"}${
          data.hidden ? " !tw-opacity-0 " : ""
        }
        tw-relative`}
        style={getNodeStatusStyles(data.status)}
      >
        {/* Add rotating ring for running state */}
        {data.status === "running" && (
          <div
            className="tw-absolute tw-inset-[-2px] tw-rounded-full tw-border-2 tw-border-transparent tw-border-t-blue-400"
            style={{ animation: "rotate-ring 1s linear infinite" }}
          />
        )}
        <div className="inner">
          <AgentIcon />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
          <Handle id="sourcetop" type="source" position={Position.Top} />
          <Handle id="targetbottom" type="target" position={Position.Bottom} />
          <Handle id="sourceright" type="source" position={Position.Right} />
          <Handle id="targettop" type="target" position={Position.Top} />
        </div>
        {data.title && (
          <NodeLabel
            title={data.title}
            subline={data.subline}
            position={data.labelPosition}
          />
        )}
      </div>
    </>
  );
});
