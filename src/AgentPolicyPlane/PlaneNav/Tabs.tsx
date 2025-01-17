// src/AgentPolicyPlane/PlaneNav/Tabs.tsx

import React, { useState } from "react";

// const tabs = [
//     { name: "Workflow", current: true },
//     { name: "Console",  current: false },
//     { name: "Audit", current: false },
//   ];
export const PlaneTabs = ({
  tabs,
  onTabChange,
}: {
  tabs: { name: string; current: boolean }[];
  onTabChange: (tabName: string) => void;
}) => {
  // Internal state for immediate visual feedback
  const [selectedTab, setSelectedTab] = useState(
    () => tabs.find((tab) => tab.current)?.name || tabs[0].name
  );

  const handleTabClick = (tabName: string) => {
    // Update internal state immediately for visual feedback
    setSelectedTab(tabName);
    // Trigger parent's transition
    onTabChange(tabName);
  };

  return (
    <div className="tw-px-4 tw-py-6 sm:tw-px-6 lg:tw-px-8 tw-grow">
      <div className="tw-mx-auto tw-max-w-7xl">
        <nav className="tw-flex tw-py-4">
          <ul
            role="list"
            className="tw-flex tw-min-w-full tw-flex-wrap tw-gap-x-6 tw-gap-y-2 tw-px-2 tw-text-sm tw-font-semibold tw-text-gray-400"
          >
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className="tw-whitespace-nowrap hover:tw-text-gray-300 tw-cursor-pointer"
                onClick={() => handleTabClick(tab.name)}
              >
                <span
                  className={`tw-block tw-px-1 tw-py-2 tw-transition-colors tw-duration-150 tw-cursor-pointer  ${selectedTab === tab.name ? "tw-text-indigo-400" : ""
                    }`}
                >
                  {tab.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
