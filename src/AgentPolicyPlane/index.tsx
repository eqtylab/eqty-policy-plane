import React, { useState, useEffect } from "react";

import { AgentPolicyPlaneContainer } from "./container";
import { ActiveControlsList } from "./ActiveControlsList";
import { AgentGraph } from "./AgentGraph";
import { AgentPolicyOverrideDialog } from "./OverrideDialog";
import { PlaneNav } from "./PlaneNav";
import { ComplianceLegend } from "./PlaneLegend";
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

  return (
    <AgentPolicyPlaneContainer>
      <div className="text-white flex h-full">
        {/* Wrap content in a div with transition classes */}
        <div
          className={`w-full flex transition-opacity duration-500 ease-in-out  ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <ActiveControlsList
            data={sampleControls}
            onControlClick={handleControlClick}
          />
          <div className="h-full grow relative">
            {/* absolute pos plane nav in middle  */}
            <div className="absolute top-0 left-0 transform  -translate-y-[56px]">
              <PlaneNav />
            </div>
            <AgentGraph backgroundColor="transparent" textColor="white" />
          </div>
          <div className="relative">
            {/* absolute pos compliance legend to the top right */}
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
