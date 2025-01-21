// src/AgentPolicyPlane/index.tsx

import React, { useState, useEffect, useRef } from "react";

import { AgentPolicyPlaneContainer } from "./container";
import {
  ActiveControlsList,
  Control,
} from "./PlaneWorkflowView/ActiveControlsList";
import { AgentGraph, WrappedNode } from "./PlaneWorkflowView/AgentGraph";
import { AgentPolicyOverrideDialog } from "./PlaneWorkflowView/Dialogs/OverridePolicy";
import {
  AgentPolicyDetailsDialog,
  AgentPolicyDetailsRemediateDialog,
} from "./PlaneWorkflowView/Dialogs/PolicyDetails";
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
    title: "Major Emergency Management (MEM)",
    isAlert: false,
    mandatory: true,
    implemented: true,
  },
  {
    id: "ctrl-2",
    title: "Local Government Act",
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
    alertType: "authorize",
  },

  {
    id: "ctrl-4",
    title: "Severe Weather and Flooding Plans",
    isAlert: false,
    mandatory: false,
    implemented: true,
  },
  {
    id: "ctrl-5",
    title: "Civil Defence Act",
    isAlert: false,
    mandatory: false,
    implemented: true,
  },
  {
    id: "ctrl-6",
    title: "Emergency Powers Act",
    isAlert: false,
    mandatory: false,
    implemented: true,
  },
  {
    id: "ctrl-7",
    title: "Roads Acts",
    isAlert: false,
    mandatory: false,
    implemented: true,
  },

  {
    id: "ctrl-9",
    title: "GDPR",
    isAlert: true,
    mandatory: false,
    implemented: true,
    alertType: "remediate",
  },
  {
    id: "ctrl-10",
    title: "Public Order Act",
    isAlert: false,
    mandatory: false,
    implemented: true,
  },
  {
    id: "ctrl-11",
    title: "Safety, Health and Welfare at Work",
    isAlert: false,
    mandatory: false,
    implemented: true,
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

  const { state, startPipeline, overrideGuardrail, remediateGuardrail } =
    usePipeline();
  const [overrideGranted, setOverrideGranted] = useState(false);
  const [remediateGranted, setRemediateGranted] = useState(false);

  const [currentActiveControl, setCurrentActiveControl] =
    useState<Control | null>();

  const handleOverride = () => {
    // Use the overrideGuardrail function from the hook
    overrideGuardrail("ctrl-3", "Manual override approved");
    setOverrideGranted(true);
    setActiveAlertUID(null);
  };

  const handleRemediate = () => {
    // Use the remediateGuardrail function from the hook
    remediateGuardrail("ctrl-9", "Manual remediation approved");
    setActiveAlertUID(null);
    setShowPolicyDetails(false);
    setRemediateGranted(true);
  };

  useEffect(() => {
    setActiveAlertUID("ctrl-3");
    setActiveAlertControlDivId("ctrl-3-item-wrapper");
    setCurrentActiveControl(sampleControls[2]);
  }, []);

  const [tabs, setTabs] = React.useState([
    { name: "Agentic Workflow", current: true },
    { name: "Console", current: false },
    { name: "Policy Audit", current: false },
  ]);

  // const isWorkflowBlocked = (controls: typeof sampleControls) => {
  //   return controls.some(
  //     (control) =>
  //       (control.mandatory && !control.implemented) || // Mandatory but not implemented
  //       control.isAlert // Has an active alert
  //   );
  // };

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

  const handleControlClick = (control: Control) => {
    // .id, `${control.id}-item-wrapper`, control.isAlert
    setCurrentActiveControl(control);

    if (control.isAlert) {
      const fromDivId = `${control.id}-item-wrapper`;

      console.log("debug: handleControlClick", control.id, fromDivId);

      if (activeAlertUID && activeAlertUID !== control.id) {
        // todo: this is clicking on another control while an alert is active
        setActiveAlertUID(control.id);
        setActiveAlertControlDivId(fromDivId);
      } else if (activeAlertUID && activeAlertUID === control.id) {
        setActiveAlertUID(null);
        setShowPolicyDetails(false);
      } else {
        setActiveAlertUID(control.id);
        setActiveAlertControlDivId(fromDivId);
      }
    } else {
      setActiveAlertUID(null);
      setShowPolicyDetails(false);
    }
  };

  const onNodeClick = (node: WrappedNode) => {
    if (node.id === "reconfirm") {
      // handleControlClick("ctrl-3", "ctrl-3-item-wrapper");
      setActiveAlertUID("ctrl-3");
      setActiveAlertControlDivId("ctrl-3-item-wrapper");
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
        {selectedTab === "Agentic Workflow" && (
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
                {showPolicyDetails && currentActiveControl?.id === "ctrl-3" && (
                  <div className="tw-w-11/12 tw-h-full tw-absolute tw-left-0 tw-right-0 tw-m-auto tw-z-[1000]">
                    <AnimationWrapper>
                      <AgentPolicyDetailsDialog
                        onClose={() => setShowPolicyDetails(false)}
                      />
                    </AnimationWrapper>
                  </div>
                )}
                {showPolicyDetails && currentActiveControl?.id === "ctrl-9" && (
                  <div className="tw-w-11/12 tw-h-full tw-absolute tw-left-0 tw-right-0 tw-m-auto tw-z-[1000]">
                    <AnimationWrapper>
                      <AgentPolicyDetailsRemediateDialog
                        onClose={() => setShowPolicyDetails(false)}
                        onClick={() => handleRemediate()}
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
                  isBlocked={!overrideGranted || !remediateGranted}
                  isPlaying={state.status === "running"}
                  onPlay={startPipeline}
                  onPause={() => null}
                  onCancel={() => null}
                />
                <div className="tw-w-[264px] tw-relative">
                  {activeAlertUID && currentActiveControl?.isAlert && (
                    <AnimationWrapper>
                      <AgentPolicyOverrideDialog
                        onOverride={handleOverride}
                        onCancel={handleDismissAlert}
                        onDetails={handleShowPolicyDetails}
                        control={currentActiveControl}
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
                    endId={`ripple-point-eq-${currentActiveControl?.id}`}
                  />
                </DelayedRenderWrapper>
                <DelayedRenderWrapper t={380}>
                  <DrawLine
                    startId={`ripple-point-eq-${currentActiveControl?.id}`}
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
        {selectedTab === "Policy Audit" && <CertApp />}
      </div>
    );
  };

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
