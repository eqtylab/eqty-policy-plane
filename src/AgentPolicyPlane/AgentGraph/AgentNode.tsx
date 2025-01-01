import React, { memo, type ReactNode } from "react";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import { AgentIcon } from "./icons/AgentIcon";

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
}: {
  title: string;
  subline?: string;
  position?: "top" | "right" | "left" | "bottom";
}) => {
  const positionClasses = {
    top: "-top-10 left-1/2 -translate-x-1/2",
    right: "top-1/2 -translate-y-1/2 left-full ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "top-1/2 -translate-y-1/2 right-full mr-4", // TODO
  };

  return (
    <div
      className={`absolute whitespace-nowrap ${positionClasses[position]} !border-brandbordergray border rounded-xl p-1`}
    >
      <div className="text-white text-[14px]">{title}</div>
      {subline && <div className="text-white text-[10px]">{subline}</div>}
    </div>
  );
};

export default memo(({ data }: NodeProps<Node<AgentNodeData>>) => {
  if (data.type && data.type === "policy-alert") {
    return (
      <div className="wrapper wrapper-alert">
        <div className="flex items-center justify-center relative w-full">
          {/* Horizontal dotted line */}
          <div
            className="absolute w-full h-px "
            style={{
              background: `repeating-linear-gradient(to right, rgba(208, 86, 89, 1) 0, rgba(208, 86, 89, 1) 4px, transparent 4px, transparent 8px)`,
              backgroundSize: "8px 100%",
              backgroundPosition: "6px 0", // Offsets the pattern by half its width to center it
            }}
          />

          {/* Red circle with ripple effect */}
          <div className="absolute ripple-wrapper">
            {/* Base circle */}
            <div
              id={data.animating ? "ripple-point-eq" : ""}
              className="w-4 h-4 bg-brandalert rounded-full m-auto relative"
            >
              {/* Ripple rings - only shown when animating */}
              {data.animating && (
                <>
                  <div
                    className="absolute inset-0 w-4 h-4 rounded-full bg-brandalert animate-ripple "
                    style={{ opacity: "0.75" }}
                  ></div>
                  <div
                    className="absolute inset-0 w-4 h-4 rounded-full bg-brandalert animate-ripple-delayed "
                    style={{ opacity: "0.75" }}
                  ></div>
                  <div
                    className="absolute inset-0 w-4 h-4 rounded-full bg-brandalert animate-ripple-more-delayed "
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
