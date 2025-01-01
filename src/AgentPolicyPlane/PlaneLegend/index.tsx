import React from "react";

export const ComplianceLegend = () => {
  return (
    <div className="flex justify-end items-end gap-4 w-[800px]">
      <div className="flex items-center gap-2">
        <div
          className="min-h-[11px] min-w-[21px] rounded-full"
          style={{ backgroundColor: "rgba(206, 255, 220, 1)" }}
        ></div>
        <span
          className="text-xs font-medium"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Compliant
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="min-h-[11px] min-w-[21px] rounded-full"
          style={{ backgroundColor: "rgba(208, 86, 89, 1)" }}
        ></div>
        <span
          className="text-xs font-medium"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Not compliant
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="min-h-[11px] min-w-[21px] rounded-full border !border-dashed"
          style={{ borderColor: "rgba(255, 255, 255, 1) !important" }}
        ></div>
        <span
          className="text-xs font-medium"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Unknown
        </span>
      </div>
    </div>
  );
};
