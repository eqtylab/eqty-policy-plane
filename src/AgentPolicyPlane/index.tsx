// src/AgentPolicyPlane/index.tsx

import React, { useState, useEffect, useRef } from "react";

import { AgentPolicyPlaneContainer } from "./container";
import { ActiveControlsList } from "./PlaneWorkflowView/ActiveControlsList";
import { AgentGraph, WrappedNode } from "./PlaneWorkflowView/AgentGraph";
import { AgentPolicyOverrideDialog } from "./PlaneWorkflowView/Dialogs/OverridePolicy";
import { AgentPolicyDetailsDialog } from "./PlaneWorkflowView/Dialogs/PolicyDetails";
import { AgentPolicyWorkflowOverviewDialog } from "./PlaneWorkflowView/Dialogs/WorkflowOverview";
import { PlaneNav } from "./PlaneNav";
import { PlaneTabs } from "./PlaneNav/Tabs";
import { ComplianceLegend } from "./PlaneWorkflowView/ComplianceLegend";
import { CertApp } from "./CertApp";
import { WorkflowPlayer } from "./PlaneWorkflowView/WorkflowPlayer";

import { RunLogging } from "./ConsoleLogging";

import { PipelineProvider } from "./context/PipelineContext";
import { usePipeline } from "./context/PipelineContext";

import { RunDock } from "./PlaneConsoleView";

import { AnimationWrapper } from "./Interactive/AnimationWrapper";
import { DrawLine } from "./Interactive/AlertLines";
import { DelayedRenderWrapper } from "./Interactive/DelayedRenderWrapper";

import ResponsiveContainer from "./responsive";
import { AgentNodeData } from "./PlaneWorkflowView/AgentGraph/AgentNode";

const sampleControls = [
  {
    id: "ctrl-1",
    title: "FEMA Control Protocol",
    isAlert: false,
    mandatory: true,
    implemented: true,
  },
  {
    id: "ctrl-2",
    title: "Privacy Protocol",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-3",
    title: "Sourcing Protocol",
    isAlert: true,
    mandatory: true,
    implemented: true,
  },
  {
    id: "ctrl-4",
    title: "Policy 3",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-5",
    title: "Policy 4",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-6",
    title: "Policy 5",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-7",
    title: "Policy 6",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-8",
    title: "Policy 7",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-9",
    title: "Policy 8",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-10",
    title: "Policy 9",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
  {
    id: "ctrl-11",
    title: "Policy 10",
    isAlert: false,
    mandatory: false,
    implemented: false,
  },
];

/**
 * This is the main functional application
 *
 * @returns
 */
const AgentPolicyPlane = () => {
  const [showCertApp, setShowCertApp] = useState(false);
  const [activeAlertUID, setActiveAlertUID] = useState<string | null>(null);
  const [activeAlertControlDivId, setActiveAlertControlDivId] = useState<
    string | null
  >(null);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fadeTransitionRef = useRef<HTMLDivElement | null>(null);

  const { state, startPipeline, overrideGuardrail } = usePipeline();
  const [overrideGranted, setOverrideGranted] = useState(false);

  const handleOverride = () => {
    // Use the overrideGuardrail function from the hook
    overrideGuardrail("ctrl-3", "Manual override approved");
    setOverrideGranted(true);
    setActiveAlertUID(null);
  };

  const [tabs, setTabs] = React.useState([
    { name: "Workflow", current: true },
    { name: "Console", current: false },
    { name: "Audit", current: false },
  ]);

  const isWorkflowBlocked = (controls: typeof sampleControls) => {
    return controls.some(
      (control) =>
        (control.mandatory && !control.implemented) || // Mandatory but not implemented
        control.isAlert // Has an active alert
    );
  };

  useEffect(() => {
    // Initial fade in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  const getSelectedTab = () => {
    return tabs.find((tab) => tab.current)?.name || tabs[0].name;
  };

  const handleTabChange = (selectedTabName: string) => {
    // Start fade out
    setIsVisible(false);

    // Use TransitionEnd event to detect when fade out is complete
    const handleTransitionEnd = () => {
      // Remove the event listener
      fadeTransitionRef.current?.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );

      // Change tab
      setTabs(
        tabs.map((tab) => ({
          ...tab,
          current: tab.name === selectedTabName,
        }))
      );

      // Start fade in after a brief delay to ensure new content is rendered
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        });
      }, 200);
    };

    // Add the event listener
    fadeTransitionRef.current?.addEventListener(
      "transitionend",
      handleTransitionEnd
    );
  };

  const handleControlClick = (controlId: string, fromDivId?: string | null) => {
    if (activeAlertUID && activeAlertUID !== controlId) {
      // todo: this is clicking on another control while an alert is active
      setActiveAlertUID(null);
      setShowPolicyDetails(false);
    } else if (activeAlertUID && activeAlertUID === controlId) {
      setActiveAlertUID(null);
      setShowPolicyDetails(false);
    } else {
      setActiveAlertUID(controlId);
      setActiveAlertControlDivId(fromDivId || null);
    }
  };

  const onNodeClick = (node: WrappedNode) => {
    if (node.id === "reconfirm") {
      handleControlClick("ctrl-3", "ctrl-3-item-wrapper");
    }
  };

  const handleDismissAlert = () => {
    setActiveAlertUID(null);
    setShowPolicyDetails(false);
  };

  const handleShowPolicyDetails = () => {
    setShowPolicyDetails(true);
  };
  const selectedTab = getSelectedTab();
  const renderTabContent = () => {
    // console.log('debug: renderTabContent')

    return (
      <div
        ref={fadeTransitionRef}
        className={`tw-transition-opacity tw-duration-150 tw-ease-in-out tw-h-full ${
          isVisible ? "tw-opacity-100" : "tw-opacity-0"
        }`}
      >
        {selectedTab === "Workflow" && (
          <div className="tw-text-white tw-flex tw-h-full tw-flex-col tw-overflow-visible tw-p-6">
            <div
              className={`tw-w-full tw-flex tw-overflow-x-visible tw-h-full`}
            >
              <ActiveControlsList
                data={sampleControls}
                onControlClick={handleControlClick}
              />
              <div className=" tw-grow tw-relative tw-flex tw-items-center">
                <AgentGraph
                  backgroundColor="transparent"
                  textColor="white"
                  onNodeClick={onNodeClick}
                />
                {showPolicyDetails && (
                  <div className="tw-w-11/12 tw-h-full tw-absolute tw-left-0 tw-right-0 tw-m-auto tw-z-[1000]">
                    <AnimationWrapper>
                      <AgentPolicyDetailsDialog
                        onClose={() => setShowPolicyDetails(false)}
                      />
                    </AnimationWrapper>
                  </div>
                )}
                {/* <div className="tw-absolute tw--top-16 tw-left-16 tw-transform tw--translate-y-[32px]  tw-flex tw-z-10">
                  <PlaneNav
                    showCertApp={showCertApp}
                    setShowCertApp={setShowCertApp}
                  />
                  <PlaneTabs tabs={tabs} onTabChange={handleTabChange} />
                </div> */}
                <div className="tw-absolute tw-bottom-0 tw-left-16">
                  <ComplianceLegend />
                </div>
              </div>
              <div className="tw-relative tw-h-full">
                <WorkflowPlayer
                  isBlocked={!overrideGranted}
                  isPlaying={state.status === "running"}
                  onPlay={startPipeline}
                  onPause={() => null}
                  onCancel={() => null}
                />
                <div className="tw-w-[264px] tw-relative">
                  {activeAlertUID && (
                    <AnimationWrapper>
                      <AgentPolicyOverrideDialog
                        onOverride={handleOverride}
                        onCancel={handleDismissAlert}
                        onDetails={handleShowPolicyDetails}
                      />
                    </AnimationWrapper>
                  )}
                  {!activeAlertUID && (
                    <AnimationWrapper>
                      <AgentPolicyWorkflowOverviewDialog />
                    </AnimationWrapper>
                  )}
                </div>
              </div>
            </div>
            {activeAlertUID && activeAlertControlDivId && (
              <>
                <DelayedRenderWrapper t={380}>
                  <DrawLine
                    startId={activeAlertControlDivId}
                    endId="ripple-point-eq"
                  />
                </DelayedRenderWrapper>
                <DelayedRenderWrapper t={380}>
                  <DrawLine
                    startId="ripple-point-eq"
                    endId="eq-control-dialog"
                    isEndpointInFlow={false}
                  />
                </DelayedRenderWrapper>
              </>
            )}
          </div>
        )}
        {selectedTab === "Console" && (
          <div className="tw-relative tw-flex tw-w-full tw-flex-col tw-h-full tw-p-6">
            <div className="tw-h-full tw-w-full">
              <RunDock />
            </div>
          </div>
        )}
        {selectedTab === "Audit" && <CertApp />}
      </div>
    );
  };

  // if (selectedTab === "Audit") {
  //   return (
  //     <AgentPolicyPlaneContainer
  //       responsiveRender={() => (
  //         <ResponsiveContainer>
  //           <CertApp />
  //           <button
  //             onClick={() => {
  //               setShowCertApp(false);
  //             }}
  //             className="tw-absolute tw--bottom-10 tw-left-0 tw-right-0 tw-m-auto tw-w-24 tw-bg-brandred tw-text-white tw-p-2 tw-rounded-lg"
  //           >
  //             Close
  //           </button>
  //         </ResponsiveContainer>
  //       )}
  //     >
  //       {null}
  //     </AgentPolicyPlaneContainer>
  //   );
  // }

  return (
    <AgentPolicyPlaneContainer outsideGridRender={() => <RunLogging />}>
      {renderTabContent()}
      <div className="tw-absolute tw--top-10 tw-left-56 tw-transform tw--translate-y-[32px]  tw-flex tw-z-10">
        <PlaneNav showCertApp={showCertApp} setShowCertApp={setShowCertApp} />
        <PlaneTabs tabs={tabs} onTabChange={handleTabChange} />
      </div>
    </AgentPolicyPlaneContainer>
  );
};

export const AgentPolicyPlaneApplication = () => {
  return (
    <PipelineProvider>
      {/* hack bootstrap style */}
      <style>
        {`
        .modal-body {
        padding: 0;}
      `}
      </style>
      <AgentPolicyPlane />
    </PipelineProvider>
  );
};
