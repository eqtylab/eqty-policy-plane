import React from "react";

export const ComplianceLegend = () => {
  return (
    <div className="tw-flex  tw-items-end tw-gap-4 tw-w-[800px]">
      <div className="tw-flex tw-items-center tw-gap-2">
        <div
          className="tw-min-h-[11px] tw-min-w-[21px] tw-rounded-full"
          style={{ backgroundColor: "rgba(206, 255, 220, 1)" }}
        ></div>
        <span
          className="tw-text-xs tw-font-medium"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Compliant
        </span>
      </div>

      <div className="tw-flex tw-items-center tw-gap-2">
        <div
          className="tw-min-h-[11px] tw-min-w-[21px] tw-rounded-full"
          style={{ backgroundColor: "rgba(208, 86, 89, 1)" }}
        ></div>
        <span
          className="tw-text-xs tw-font-medium"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Not compliant
        </span>
      </div>

      <div className="tw-flex tw-items-center tw-gap-2">
        <div
          className="tw-min-h-[11px] tw-min-w-[21px] tw-rounded-full tw-border !tw-border-dashed"
          style={{ borderColor: "rgba(255, 255, 255, 1) !important" }}
        ></div>
        <span
          className="tw-text-xs tw-font-medium"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Unknown
        </span>
      </div>
    </div>
  );
};
