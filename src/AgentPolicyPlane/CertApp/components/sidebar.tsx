// src/AgentPolicyPlane/CertApp/components/sidebar.tsx
// src/AgentPolicyPlane/CertApp/components/sidebar.tsx
import React from "react";
import Card from "./card";

import AlertIcon from "../icons/alert";
import CheckIcon from "../icons/check";
import ShieldIcon from "../icons/shield";
import UserShield from "../icons/user-shield";
import ServerIcon from "../icons/server";

import CertIcon from "../icons/certificate";
import ExportIcon from "../icons/export";
import LogoIcon from "../icons/logo";

const cardsData = [
  {
    title: "Controls Failed",
    content: <p className="text-red-400">5 Controls</p>,
    icon: <AlertIcon />,
  },
  {
    title: "Controls Passed",
    content: <p>500 Controls</p>,
    icon: <CheckIcon />,
  },
  {
    title: "Agent Authority",
    content: <p>Provisioned by FEMA</p>,
    icon: <ShieldIcon />,
  },
  {
    title: "Developed by",
    content: <p>Supervisor #836</p>,
    icon: <UserShield />,
  },
  {
    title: "Registration",
    icon: <ServerIcon />,
    content: (
      <div>
        <p>CID bafkr...aueq</p>
        <p>HCS Oxe34...eb5e</p>
      </div>
    ),
  },
];

const Sidebar = () => {
  const renderCards = () => {
    return cardsData.map((card, index) => (
      <Card
        key={index}
        IconRR={card.icon}
        title={card.title}
        content={card.content}
      />
    ));
  };

  return (
    <div className="tw-flex tw-flex-col tw-p-3 tw-rounded-lg tw-bg-sidebar tw-gap-y-2 tw-backdrop-blur-[14px]">
      <div className="tw-flex tw-align-center tw-gap-x-2">
        <CertIcon />
        <h1 className="tw-text-xl">Audit Certificate</h1>
      </div>

      {renderCards()}
      <div className="tw-flex tw-flex-col tw-m-2 tw-gap-y-2">
        <div className="tw-flex tw-justify-end tw-align-center tw-gap-x-2">
          <ExportIcon />
          <p className="tw-text-sm">Export</p>
        </div>
        <div>
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
