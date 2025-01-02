import React, { useState, useEffect } from "react";

import { AgentPolicyPlaneContainer } from "./container";
import { ActiveControlsList } from "./ActiveControlsList";
import { AgentGraph } from "./AgentGraph";
import { AgentPolicyOverrideDialog } from "./OverrideDialog";
import { PlaneNav } from "./PlaneNav";
import { ComplianceLegend } from "./PlaneLegend";
import { CertApp } from "./CertApp";

// import { CertApp } from "./CertApp";

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

export const AgentPolicyPlane = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCertApp, setShowCertApp] = useState(false);

  useEffect(() => {
    // Short delay to ensure components have rendered
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  const handleControlClick = (controlId: string) => {
    console.log("Clicked on:", controlId);
    // Place your logic here, e.g., open a panel, highlight in UI, etc.
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
              className="absolute -bottom-10 left-0 right-0 m-auto  w-24 bg-brandred text-white p-2 rounded-lg"
            >
              Close
            </button>
          </ResponsiveContainer>
        )}
      >
        {/* absolute positioned bg-brandred button that closes showCertApp */}
        {null}
      </AgentPolicyPlaneContainer>
    );
  }

  if (showCertApp) {
    // get the actual-wrap element
    const actualWrap = document.getElementById("actual-wrap");

    if (!actualWrap) {
      return null;
    }
    const screenHeight = window.innerHeight;
    const adjustedHeight =
      screenHeight - actualWrap.getBoundingClientRect().top;
    const scaleRatio = (adjustedHeight - 100) / screenHeight;

    const screenWidth = window.innerWidth;
    const adjustedWidth = screenWidth - actualWrap.getBoundingClientRect().left;
    const scaleRatioWidth = (adjustedWidth - 100) / screenWidth;

    return (
      <AgentPolicyPlaneContainer>
        <div className="absolute top-0 left-0 h-full w-full">
          <div
            // ref={wrapperRef}
            className="relative w-screen h-screen flex "
            style={{
              transform: `scaleX(${scaleRatioWidth}) scaleY(${scaleRatio})`,
              transformOrigin: "top left",
              // marginLeft: ,
            }}
          >
            {/* <iframe
              src="https://navai-svg.vercel.app/"
              className="h-full w-full border-none ml-[25px]"
            /> */}
            <CertApp />
          </div>
          {/* a button that closes this */}
          {/* <button
           
            className="absolute top-0 right-0 m-4"
          >
            Close
          </button> */}
          {/* make button cooler (red bg-brandred) and float down in the middle on bottom edge: */}
          <button
            onClick={() => {
              setShowCertApp(false);
            }}
            className="absolute -bottom-3 left-0 right-0 m-auto  w-24 bg-brandred text-white p-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </AgentPolicyPlaneContainer>
    );
  }

  return (
    <AgentPolicyPlaneContainer>
      <div className="text-white flex h-full overflow-visible">
        <div
          className={`w-full flex transition-opacity duration-500 ease-in-out overflow-x-visible  ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <ActiveControlsList
            data={sampleControls}
            onControlClick={handleControlClick}
          />
          <div className="h-full grow relative flex items-center pr-6">
            <div className="absolute top-0 left-0 transform  -translate-y-[56px]">
              <PlaneNav
                showCertApp={showCertApp}
                setShowCertApp={setShowCertApp}
              />
            </div>
            <AgentGraph backgroundColor="transparent" textColor="white" />
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 transform -translate-y-[56px]">
              <ComplianceLegend />
            </div>
            <AgentPolicyOverrideDialog />
          </div>
        </div>
      </div>
    </AgentPolicyPlaneContainer>
  );
};
