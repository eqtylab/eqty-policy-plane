// src/AgentPolicyPlane/PlaneWorkflowView/Dialogs/PolicyDetails.tsx
import React from "react";
import { NemoIcon } from "../AgentGraph/icons/NemoIcon";
interface AgentPolicyDetailsDialogProps {
  onClose?: () => void;
}

interface AgentPolicyDetailsRemediateDialogProps {
  onClose?: () => void;
  onClick?: () => void;
}

export const AgentPolicyDetailsDialog: React.FC<
  AgentPolicyDetailsDialogProps
> = ({ onClose }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-bg-branddialogbg_full tw-rounded-xl">
      <div className="tw-w-[600px] tw-p-6">
        {/* Header with Status Badge */}
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-px-2 tw-py-1 tw-bg-brandreddark tw-rounded-md tw-text-xs tw-text-white">
              CTRL-003
            </div>
            <h2 className="tw-text-lg tw-text-white">
              Sourcing Protocol: AI Action
            </h2>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-2 tw-h-2 tw-bg-brandreddark tw-rounded-full tw-animate-pulse"></div>
            <span className="tw-text-xs tw-text-white/60">Active Control</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-4">
          {/* Left Column */}
          <div className="tw-space-y-4">
            <div className="tw-bg-white/5 tw-rounded-lg tw-p-3">
              <div className="tw-text-xs tw-text-white/60 tw-mb-1">Purpose</div>
              <div className="tw-text-sm tw-text-white">
                Governs AI decision-making in emergency response when processing
                social media and life-safety data
              </div>
            </div>

            <div className="tw-bg-gradient-to-br tw-from-brandreddark/20 tw-to-brandreddark/10 tw-rounded-lg tw-p-3">
              <div className="tw-text-xs tw-text-white/60 tw-mb-2">
                Critical Triggers
              </div>
              <ul className="tw-space-y-2">
                {[
                  "Life-threat detection",
                  "Unverified social data",
                  "Direct response actions",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-white"
                  >
                    <div className="tw-w-1 tw-h-1 tw-bg-brandreddark tw-rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="tw-bg-white/5 tw-rounded-lg tw-p-3">
            <div className="tw-text-xs tw-text-white/60 tw-mb-2">
              Requirements
            </div>
            <ul className="tw-space-y-2">
              {[
                "Human authorization required",
                "Social media verification",
                "Cross-validation with EMS",
                "Override documentation",
              ].map((req, i) => (
                <li
                  key={i}
                  className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-white/80"
                >
                  <div className="tw-text-brandreddark">•</div>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="tw-flex tw-justify-between tw-items-center tw-text-xs tw-text-white/40">
          <div>Last Update: 2024-01-15</div>
          <div>Priority: Critical</div>
        </div>

        <button
          onClick={onClose}
          className="tw-w-24 tw-absolute tw-bottom-4 tw-right-0 tw-left-0 tw-m-auto tw-text-white tw-text-xs tw-py-1.5 tw-rounded-lg tw-bg-brandreddark hover:tw-bg-opacity-90 tw-transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const AgentPolicyDetailsRemediateDialog: React.FC<
  AgentPolicyDetailsRemediateDialogProps
> = ({ onClose, onClick }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-bg-branddialogbg_full tw-rounded-xl">
      <div className="tw-w-[640px] tw-p-4">
        {/* Header with Status Badge */}
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-px-2 tw-py-1 tw-bg-brandreddark tw-rounded-md tw-text-xs tw-text-white">
              CTRL-041
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
              <h2 className="tw-text-lg tw-text-white">GDPR: Article 25</h2>
              <h4 className="tw-text-xs tw-text-white">
                (Data protection by design and by default)
              </h4>
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-w-2 tw-h-2 tw-bg-brandreddark tw-rounded-full tw-animate-pulse"></div>
            <span className="tw-text-xs tw-text-white/60">Active Control</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-4">
          {/* Left Column */}
          <div className="tw-space-y-4">
            <div className="tw-bg-white/5 tw-rounded-lg tw-p-3">
              <div className="tw-text-xs tw-text-white/60 tw-mb-1">Purpose</div>
              <div className="tw-text-sm tw-text-white">
                GDPR Article 25 ("Data protection by design and by default")
                requires organizations to implement appropriate technical and
                organizational measures to protect personal data.
              </div>
            </div>

            <div className="tw-bg-gradient-to-br tw-from-brandreddark/20 tw-to-brandreddark/10 tw-rounded-lg tw-p-3">
              <div className="tw-text-xs tw-text-white/60 tw-mb-2">
                Critical Triggers
              </div>
              <ul className="tw-space-y-2">
                {[
                  "Presence of PII in fine-tuning dataset",
                  "Presence of PII in inference",
                  "No detection of PII classifiers",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-white"
                  >
                    <div className="tw-w-1 tw-h-1 tw-bg-brandreddark tw-rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column with Action */}
          <div className="tw-space-y-4">
            <div className="tw-bg-white/5 tw-rounded-lg tw-p-3">
              <div className="tw-text-xs tw-text-white/60 tw-mb-2">
                Requirements
              </div>
              <div className="tw-text-sm tw-text-white">
                Implement safeguards to protect PII from being exposed in model
                training and inference from agentic workflows.
              </div>
            </div>

            <div className="tw-bg-white/5 tw-rounded-lg tw-p-3">
              <div className="tw-text-xs tw-text-white/60 tw-mb-2">
                Suggested Action
              </div>
              <div className="tw-flex tw-justify-between tw-items-center">
                <span className="tw-text-sm tw-text-white">Implement:</span>
                <button
                  onClick={onClick}
                  className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1.5 tw-bg-nvidiagreen tw-rounded-lg tw-text-white hover:tw-bg-opacity-90 tw-transition-colors hover:tw-shadow-md"
                >
                  <div className="tw-w-8 tw-h-8">
                    <NemoIcon />
                  </div>
                  <span className="tw-text-xs">Nemo Guardrail - PII</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="tw-flex tw-justify-between tw-items-center tw-text-xs tw-text-white/40">
          <div>Last Update: 2024-01-15</div>
          <div>Priority: Critical</div>
        </div>

        <button
          onClick={onClose}
          className="tw-w-24 tw-absolute tw-bottom-4 tw-right-0 tw-left-0 tw-m-auto tw-text-white tw-text-xs tw-py-1.5 tw-rounded-lg tw-bg-brandreddark hover:tw-bg-opacity-90 tw-transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
