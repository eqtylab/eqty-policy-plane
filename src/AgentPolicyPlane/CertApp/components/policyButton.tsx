// src/AgentPolicyPlane/CertApp/components/policyButton.tsx
// src/AgentPolicyPlane/CertApp/components/policyButton.tsx
import React from "react";
import { forwardRef, HTMLAttributes } from "react";
import { useButtonsStore } from "../stores/buttonsStore";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  i: number;
}

const PolicyButton = forwardRef<HTMLDivElement, Props>(
  ({ title, i, ...props }: Props, ref) => {
    const buttonProps = useButtonsStore((state) => state.props);
    const color = buttonProps[i].color;
    const blue = "#5db0c8";
    const red = "#a35456";
    const grey = "#3c3d3d";
    const white = "#ffffff";

    let colorClass = "";
    switch (color) {
      case white:
        colorClass = "hover:tw-bg-white hover:tw-text-black";
        break;
      case blue:
        colorClass = "hover:tw-bg-btn-blue hover:tw-border-btn-blue";
        break;
      case red:
        colorClass = "hover:tw-bg-btn-red hover:tw-border-btn-red";
        break;
      case grey:
        colorClass = "hover:tw-bg-btn-grey hover:tw-border-btn-grey";
    }

    return (
      <div className="tw-flex tw-items-center tw-justify-stretch tw-gap-x-2">
        <div
          className={`tw-p-2 tw-border tw-font-semibold tw-border-gray-400 tw-rounded-lg tw-cursor-pointer tw-grow ${colorClass}`}
          {...props}
          ref={ref}
        >
          {title}
        </div>
        <p className="tw-mr-4 tw-text-lg tw-font-bold">10</p>
      </div>
    );
  }
);

export default PolicyButton;
