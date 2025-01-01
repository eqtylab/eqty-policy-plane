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
        colorClass = "hover:bg-white hover:text-black";
        break;
      case blue:
        colorClass = "hover:bg-btn-blue hover:border-btn-blue";
        break;
      case red:
        colorClass = "hover:bg-btn-red hover:border-btn-red";
        break;
      case grey:
        colorClass = "hover:bg-btn-grey hover:border-btn-grey";
    }

    return (
      <div className="flex items-center justify-stretch gap-x-2">
        <div
          className={`p-2 border font-semibold border-gray-400 rounded-lg cursor-pointer grow ${colorClass}`}
          {...props}
          ref={ref}
        >
          {title}
        </div>
        <p className="mr-4 text-lg font-bold">10</p>
      </div>
    );
  }
);

export default PolicyButton;
