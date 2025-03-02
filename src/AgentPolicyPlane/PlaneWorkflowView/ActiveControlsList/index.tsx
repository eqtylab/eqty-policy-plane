// src/AgentPolicyPlane/PlaneWorkflowView/ActiveControlsList/index.tsx
import React from "react";
import { usePipeline } from "../../context/PipelineContext";

/** Define the structure of each control object */
export type Control = {
  id: string;
  title: string;
  isAlert?: boolean;
  mandatory?: boolean;
  implemented?: boolean;
  overridden?: boolean;
};

interface ActiveControlsListProps {
  data: Control[];
  onControlClick: (control: Control) => void;
}

const AlertList = ({
  data,
  onControlClick,
}: {
  data: Control[];
  onControlClick: (control: Control) => void;
}) => {
  const { state } = usePipeline();
  const noOverrides = state.userOverrides.length === 0;
  const noRemediations = state.userRemediations.length === 0;
  return (
    <>
      {data.map((control) => {
        let classes = `tw-px-2 tw-py-1 tw-rounded-lg tw-cursor-pointer tw-transition-colors tw-max-w-[200px] tw-flex tw-items-center tw-relative`;

        if (control.isAlert && control.id === "guardrail-2" && noOverrides) {
          classes += " tw-border !tw-border-brandreddark tw-bg-brandred";
        } else if (
          control.isAlert &&
          control.id === "guardrail-2" &&
          !noOverrides
        ) {
          classes +=
            " tw-border !tw-border-brandgreen tw-bg-brandgreen tw-text-branddialogbg";
        } else if (
          control.isAlert &&
          control.id === "guardrail-1" &&
          noRemediations
        ) {
          classes += " tw-border !tw-border-brandreddark tw-bg-brandred";
        } else if (
          control.isAlert &&
          control.id === "guardrail-1" &&
          !noRemediations
        ) {
          classes +=
            " tw-border !tw-border-brandgreen tw-bg-brandgreen tw-text-branddialogbg";
        } else if (control.mandatory && control.implemented) {
          classes += " tw-border !tw-border-brandblue ";
        } else if (!control.mandatory) {
          classes += " tw-border !tw-border-brandgray ";
        } else {
          classes += " tw-border !tw-border-red-600 tw-text-red-200";
        }

        return (
          <div key={control.id} className="tw-relative">
            <div
              className={classes}
              onClick={() => {
                onControlClick(control);
              }}
            >
              {control.title}
            </div>

            {/* Sonar animations - only shown for alert items */}
            {control.isAlert && control.id === "guardrail-2" && noOverrides && (
              <div
                id={`${control.id}-item-wrapper`}
                className="tw-absolute tw-inset-0 tw-z-0 tw-pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar tw-opacity-40"></div>
                <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar-delayed tw-opacity-40"></div>
                <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar-more-delayed tw-opacity-40"></div>
              </div>
            )}
            {control.isAlert &&
              control.id === "guardrail-1" &&
              noRemediations && (
                <div
                  id={`${control.id}-item-wrapper`}
                  className="tw-absolute tw-inset-0 tw-z-0 tw-pointer-events-none"
                  style={{ overflow: "visible" }}
                >
                  <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar tw-opacity-40"></div>
                  <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar-delayed tw-opacity-40"></div>
                  <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar-more-delayed tw-opacity-40"></div>
                </div>
              )}
          </div>
        );
      })}
    </>
  );
};

/**
 * Renders a left-hand side list of active controls.
 */
export const ActiveControlsList: React.FC<ActiveControlsListProps> = ({
  data,
  onControlClick,
}) => {
  return (
    <div className="tw-text-white tw-flex-col tw-flex tw-items-center tw-overflow-x-visible">
      <h2 className="tw-text-[18px] tw-mb-4 tw-font-[500] tw-w-[200px]">
        Active Policies
      </h2>
      <div
        className="tw-flex tw-flex-col tw-gap-3 tw-font-[400] tw-text-[14.5px]  tw-h-[90%] tw-pb-14 tw-scroll-smooth	tw-scrollbar-hidden" // removed 0verflow-y-auto
        style={{
          // maskImage: "linear-gradient(to bottom, black 80%, transparent 99%)",
          overflowX: "visible",
        }}
      >
        <AlertList data={data} onControlClick={onControlClick} />
      </div>
    </div>
  );
};
