import React, { memo, type ReactNode } from "react";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import { AgentIcon } from "./icons/AgentIcon";
import { NemoIcon } from "./icons/NemoIcon";

export type AgentNodeData = {
  title?: string;
  icon?: ReactNode;
  subline?: string;
  type?: string;
  animating?: boolean;
  parallelVertSize?: boolean;
  labelPosition?: "top" | "bottom" | "left" | "right";
};

const NodeLabel = ({
  title,
  subline,
  position = "top",
  type = "default",
}: {
  title: string;
  subline?: string;
  position?: "top" | "right" | "left" | "bottom";
  type?: "default" | "alert" | "nemo";
}) => {
  const positionClasses = {
    top: "tw--top-10 tw-left-1/2 tw--translate-x-1/2",
    right: "tw-top-1/2 tw--translate-y-1/2 tw-left-full tw-ml-2",
    bottom: "tw-top-full tw-left-1/2 tw--translate-x-1/2 tw-mt-2",
    left: "tw-top-1/2 tw--translate-y-1/2 tw-right-full tw-mr-4", // TODO
  };
  let classes = `tw-absolute tw-whitespace-nowrap ${positionClasses[position]} !tw-border-brandbordergray tw-border tw-rounded-xl tw-p-1`;

  if (type === "alert") {
    classes += " tw-bg-brandred !tw-border-brandred";
  } else if (type === "nemo") {
    classes += " tw-bg-nvidiagreen !tw-border-nvidiagreen";
  }

  return (
    <div className={`${classes}`}>
      <div className="tw-text-white tw-text-[14px]">{title}</div>
      {subline && <div className="tw-text-white tw-text-[10px]">{subline}</div>}
    </div>
  );
};

export default memo(({ data }: NodeProps<Node<AgentNodeData>>) => {
  if (data.type && data.type === "policy-alert") {
    return (
      <div className="wrapper wrapper-alert">
        <div className="tw-flex tw-items-center tw-justify-center tw-relative tw-w-full">
          {/* Horizontal dotted line */}
          <div
            className="tw-absolute tw-w-full tw-h-px "
            style={{
              background: `repeating-linear-gradient(to right, rgba(208, 86, 89, 1) 0, rgba(208, 86, 89, 1) 4px, transparent 4px, transparent 8px)`,
              backgroundSize: "8px 100%",
              backgroundPosition: "6px 0", // Offsets the pattern by half its width to center it
            }}
          />

          {/* Red circle with ripple effect */}
          <div className="tw-absolute ripple-wrapper">
            {/* Base circle */}
            <div
              id={data.animating ? "ripple-point-eq" : ""}
              className="tw-w-4 tw-h-4 tw-bg-brandalert tw-rounded-full tw-m-auto tw-relative data-[eqalertoverride='true']:tw-bg-brandalertblue"
              // data-eqalertoverride="false"
            >
              {/* add custom stylesheet here */}
              <style>
                {`
                [data-eqalertoverride='true'] * {
                  background-color: rgba(0,157,255,1) !important;
                }
              `}
              </style>
              {/* Ripple rings - only shown when animating */}
              {data.animating && (
                <>
                  <div
                    className="tw-absolute tw-inset-0 tw-w-4 tw-h-4 tw-rounded-full tw-bg-brandalert animate-ripple "
                    style={{ opacity: "0.75" }}
                  ></div>
                  <div
                    className="tw-absolute tw-inset-0 tw-w-4 tw-h-4 tw-rounded-full tw-bg-brandalert animate-ripple-delayed "
                    style={{ opacity: "0.75" }}
                  ></div>
                  <div
                    className="tw-absolute tw-inset-0 tw-w-4 tw-h-4 tw-rounded-full tw-bg-brandalert animate-ripple-more-delayed "
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
            type="alert"
          />
        )}
      </div>
    );
  }

  if (data.type && data.type === "nemo-guardrail") {
    return (
      <div className="wrapper tw-justify-center tw-items-center">
        <div className="tw-bg-nvidiagreen tw-w-9 tw-h-9 tw-rounded-full">
          <NemoIcon />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />

          <Handle id="sourcetop" type="source" position={Position.Top} />
          <Handle id="targetbottom" type="target" position={Position.Bottom} />
        </div>
        {data.title && (
          <NodeLabel
            title={data.title}
            subline={data.subline}
            position={data.labelPosition}
            type="nemo"
          />
        )}
      </div>
    );
  }
  return (
    <>
      <div className={`${data.parallelVertSize ? "wrapper-half" : "wrapper"}`}>
        <div className="inner">
          <AgentIcon />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />

          <Handle id="sourcetop" type="source" position={Position.Top} />
          <Handle id="targetbottom" type="target" position={Position.Bottom} />
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
