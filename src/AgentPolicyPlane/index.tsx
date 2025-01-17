// src/AgentPolicyPlane/index.tsx

import React, { useState, useEffect, useRef } from "react";

import { AgentPolicyPlaneContainer } from "./container";
import { ActiveControlsList } from "./ActiveControlsList";
import { AgentGraph } from "./AgentGraph";
import { AgentPolicyOverrideDialog } from "./Dialogs/OverridePolicy";
import { AgentPolicyDetailsDialog } from "./Dialogs/PolicyDetails";
import { PlaneNav } from "./PlaneNav";
import { PlaneTabs } from "./PlaneNav/Tabs";
import { ComplianceLegend } from "./PlaneLegend";
import { CertApp } from "./CertApp";
import { WorkflowPlayer } from "./WorkflowPlayer";



import { PipelineProvider } from "./context/PipelineContext";
import { usePipeline } from "./context/PipelineContext";

// import { CertApp } from "./CertApp";

import { AnimationWrapper } from "./Interactive/AnimationWrapper";
import { DrawLine } from "./Interactive/AlertLines";
import { DelayedRenderWrapper } from "./Interactive/DelayedRenderWrapper";

import ResponsiveContainer from "./responsive";

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

  const { state, startPipeline } = usePipeline();


  // Track whether content is actually invisible
  const [isContentInvisible, setIsContentInvisible] = useState(false);

  const [tabs, setTabs] = React.useState([
    { name: "Workflow", current: true },
    { name: "Console", current: false },
    { name: "Audit", current: false },
  ]);

  const isWorkflowBlocked = (controls: typeof sampleControls) => {
    return controls.some(control =>
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
      alert("ho");
      setActiveAlertUID(null);
      setShowPolicyDetails(false);
    }
    console.log("Clicked on:", controlId);
    setActiveAlertUID(controlId);
    setActiveAlertControlDivId(fromDivId || null);
  };

  const handleDismissAlert = () => {
    setActiveAlertUID(null);
    setShowPolicyDetails(false);
  };

  const handleShowPolicyDetails = () => {
    setShowPolicyDetails(true);
  };

  const renderTabContent = () => {
    // console.log('debug: renderTabContent')
    const selectedTab = getSelectedTab();

    return (
      <div
        ref={fadeTransitionRef}
        className={`tw-transition-opacity tw-duration-150 tw-ease-in-out ${isVisible ? "tw-opacity-100" : "tw-opacity-0"
          }`}
      >
        {selectedTab === "Workflow" && (
          <div className="tw-text-white tw-flex tw-h-full tw-overflow-visible">
            <div className={`tw-w-full tw-flex tw-overflow-x-visible`}>
              <ActiveControlsList
                data={sampleControls}
                onControlClick={handleControlClick}
              />
              <div className="tw-h-full tw-grow tw-relative tw-flex tw-items-center">
                <AgentGraph backgroundColor="transparent" textColor="white" />
                {showPolicyDetails && (
                  <div className="tw-w-11/12 tw-h-full tw-absolute tw-left-0 tw-right-0 tw-m-auto tw-z-[1000]">
                    <AnimationWrapper>
                      <AgentPolicyDetailsDialog
                        onClose={() => setShowPolicyDetails(false)}
                      />
                    </AnimationWrapper>
                  </div>
                )}
              </div>
              <div className="tw-relative">
                <WorkflowPlayer
                  isBlocked={false} // isWorkflowBlocked(sampleControls)} // currently testing the simulation
                  isPlaying={false} // todo
                  onPlay={() => {
                    console.log('debug: about to start')
                    startPipeline()
                  }} // todo // currently testing the simulation
                  // onPlay={() => null} // todo
                  onPause={() => null} // todo
                  onCancel={() => null} // todo
                />
                {activeAlertUID && (
                  <AnimationWrapper>
                    <AgentPolicyOverrideDialog
                      onCancel={handleDismissAlert}
                      onDetails={handleShowPolicyDetails}
                    />
                  </AnimationWrapper>
                )}
                {!activeAlertUID && <div className="tw-w-[248px]"></div>}
              </div>
            </div>
            {activeAlertUID && activeAlertControlDivId && (
              <>
                <DelayedRenderWrapper t={120}>
                  <DrawLine
                    startId={activeAlertControlDivId}
                    endId="ripple-point-eq"
                  />
                </DelayedRenderWrapper>
                <DelayedRenderWrapper t={480}>
                  <DrawLine
                    startId="ripple-point-eq"
                    endId="eq-control-dialog"
                    isEndpointInFlow={false}
                  />
                </DelayedRenderWrapper>
              </>
            )}
            <div className="tw-absolute tw-bottom-1 tw-w-full tw-left-[256px]">
              <ComplianceLegend />
            </div>
          </div>
        )}
        {selectedTab === "Console" && <div>Console Content</div>}
        {selectedTab === "Audit" && <div>Audit Content</div>}
      </div>
    );
  };

  if (showCertApp) {
    return (
      <AgentPolicyPlaneContainer
        responsiveRender={() => (
          <ResponsiveContainer>
            <CertApp />
            <button
              onClick={() => {
                setShowCertApp(false);
              }}
              className="tw-absolute tw--bottom-10 tw-left-0 tw-right-0 tw-m-auto tw-w-24 tw-bg-brandred tw-text-white tw-p-2 tw-rounded-lg"
            >
              Close
            </button>
          </ResponsiveContainer>
        )}
      >
        {null}
      </AgentPolicyPlaneContainer>
    );
  }

  return (
    <AgentPolicyPlaneContainer>
      {renderTabContent()}
      <div className="tw-absolute tw--top-12 tw-left-[256px] tw-transform tw--translate-y-[32px] tw-w-full tw-flex tw-z-10">
        <PlaneNav showCertApp={showCertApp} setShowCertApp={setShowCertApp} />
        <PlaneTabs tabs={tabs} onTabChange={handleTabChange} />
      </div>
    </AgentPolicyPlaneContainer>
  );
};


export const AgentPolicyPlaneApplication = () => {
  return (
    <PipelineProvider>
      <AgentPolicyPlane />
    </PipelineProvider>
  );
}