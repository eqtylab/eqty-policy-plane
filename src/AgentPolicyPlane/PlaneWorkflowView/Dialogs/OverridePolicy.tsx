// src/AgentPolicyPlane/PlaneWorkflowView/Dialogs/OverridePolicy.tsx

import React from "react";

interface AgentPolicyOverrideDialogProps {
  control: {
    alertType?: "authorize" | "remediate";
    id: string;
  };
  onOverride?: () => void;
  onCancel?: () => void;
  onDetails?: () => void;
}

export const AgentPolicyOverrideDialog: React.FC<
  AgentPolicyOverrideDialogProps
> = ({ control, onOverride, onCancel, onDetails }) => {
  const isAuthorizeType = control.alertType === "authorize";

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
      <div className="tw-rounded-xl tw-bg-branddialogbg tw-p-6 tw-max-w-[258px] tw-space-y-6 mt-3">
        {/* Status banner */}
        <div
          id="eq-control-dialog"
          className={`tw-inline-block ${
            isAuthorizeType ? "tw-bg-permission-gradient" : "tw-bg-red-500/20"
          } tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-text-xs`}
        >
          {isAuthorizeType ? "Permissions needed" : "Remediation required"}
        </div>

        {/* Message text */}
        <p className="tw-text-white tw-text-base">
          {isAuthorizeType
            ? "This workflow is non-compliant without human authorization of multiple Sourcing Protocol controls."
            : "This workflow cannot proceed due to CUI handling requirements (32 CFR Part 2002). Controlled Unclassified Information must be properly secured with appropriate safeguards before execution."}
        </p>

        {/* Buttons container */}
        <div className="tw-space-y-3">
          {/* Conditional primary action button */}
          {isAuthorizeType && (
            <button
              onClick={onOverride}
              onMouseEnter={() => {
                const graphAlert = document.getElementById(
                  "ripple-point-eq-ctrl-3"
                );
                graphAlert?.setAttribute("data-eqalertoverride", "true");
              }}
              onMouseLeave={() => {
                const graphAlert = document.getElementById(
                  "ripple-point-eq-ctrl-3"
                );
                graphAlert?.setAttribute("data-eqalertoverride", "false");
              }}
              className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-bg-override-gradient tw-text-white tw-text-sm hover:tw-opacity-90 tw-transition-opacity"
            >
              Grant Authorization
            </button>
          )}

          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-bg-cancel-gradient tw-text-white tw-text-sm hover:tw-opacity-90 tw-transition-opacity"
          >
            {isAuthorizeType ? "Cancel" : "Close"}
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
