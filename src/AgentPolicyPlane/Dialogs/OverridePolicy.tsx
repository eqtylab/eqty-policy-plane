import React from "react";

interface AgentPolicyOverrideDialogProps {
  onOverride?: () => void;
  onCancel?: () => void;
  onDetails?: () => void;
}

export const AgentPolicyOverrideDialog: React.FC<
  AgentPolicyOverrideDialogProps
> = ({ onOverride, onCancel, onDetails }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div className="tw-rounded-xl tw-bg-branddialogbg tw-p-6 tw-max-w-[258px] tw-space-y-6">
        {/* Permission needed banner */}
        <div
          id="eq-control-dialog"
          className="tw-inline-block tw-bg-permission-gradient tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-text-xs"
        >
          Permissions needed.
        </div>

        {/* Message text */}
        <p className="tw-text-white tw-text-base">
          You action was halted because it flagged the Sourcing Protocol Control
          #234 which is mandatory.
        </p>

        {/* Buttons container */}
        <div className="tw-space-y-3">
          {/* Override button */}
          <button
            onClick={onOverride}
            onMouseEnter={() => {
              const graphAlert = document.getElementById("ripple-point-eq");
              graphAlert?.setAttribute("data-eqalertoverride", "true");
            }}
            onMouseLeave={() => {
              const graphAlert = document.getElementById("ripple-point-eq");
              graphAlert?.setAttribute("data-eqalertoverride", "false");
            }}
            className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-bg-override-gradient tw-text-white tw-text-sm hover:tw-opacity-90 tw-transition-opacity"
          >
            Override
          </button>

          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-bg-cancel-gradient tw-text-white tw-text-sm hover:tw-opacity-90 tw-transition-opacity"
          >
            Cancel
          </button>

          {/* Open Details */}
          <button
            className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-bg-open-details-gradient tw-text-white tw-text-sm hover:tw-opacity-90 tw-transition-opacity"
            onClick={onDetails}
          >
            Open Details
          </button>
        </div>
      </div>
    </div>
  );
};
