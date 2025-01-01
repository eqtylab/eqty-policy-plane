import React from "react";

interface AgentPolicyOverrideDialogProps {
  onOverride?: () => void;
  onCancel?: () => void;
}

export const AgentPolicyOverrideDialog: React.FC<
  AgentPolicyOverrideDialogProps
> = ({ onOverride, onCancel }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="rounded-xl bg-branddialogbg p-6 max-w-[258px] space-y-6">
        {/* Permission needed banner */}
        <div className="inline-block bg-permission-gradient text-white rounded-lg px-4 py-2 text-xs">
          Permissions needed.
        </div>

        {/* Message text */}
        <p className="text-white text-base">
          You action was halted because it flagged the Sourcing Protocol Control
          #234 which is mandatory.
        </p>

        {/* Buttons container */}
        <div className="space-y-3">
          {/* Override button */}
          <button
            onClick={onOverride}
            className="w-full py-3 px-4 rounded-xl bg-override-gradient text-white text-sm hover:opacity-90 transition-opacity"
          >
            Override
          </button>

          {/* Cancel button */}
          <button
            onClick={onCancel}
            className="w-full py-3 px-4 rounded-xl bg-cancel-gradient text-white text-sm hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentPolicyOverrideDialog;
