// src/AgentPolicyPlane/Dialogs/PolicyDetails.tsx
import React from "react";

interface AgentPolicyDetailsDialogProps {
  //   onOverride?: () => void;
  onClose?: () => void;
}

export const AgentPolicyDetailsDialog: React.FC<
  AgentPolicyDetailsDialogProps
> = ({ onClose }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-bg-branddialogbg_full tw-rounded-xl ">
      <div className=" tw-p-6 tw-space-y-6">Hey Im a policy</div>
      <button
        onClick={onClose}
        className="tw-w-32 tw-absolute tw-bottom-2 tw-right-0 tw-left-0 tw-m-auto tw-text-white tw-text-sm tw-p-2 tw-rounded-lg tw-bg-brandred"
      >
        Close
      </button>
    </div>
  );
};
