import React from "react";
import Card from "./card";

const cardsData = [
  {
    title: "Controls Failed",
    content: <p className="text-red-400">5 Controls</p>,
    icon: "/icons/alert.svg",
  },
  {
    title: "Controls Passed",
    content: <p>500 Controls</p>,
    icon: "/icons/check.svg",
  },
  {
    title: "Agent Authority",
    content: <p>Provisioned by FEMA</p>,
    icon: "/icons/shield.svg",
  },
  {
    title: "Developed by",
    content: <p>Supervisor #836</p>,
    icon: "/icons/user-shield.svg",
  },
  {
    title: "Registration",
    icon: "/icons/server.svg",
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
        icon={card.icon}
        title={card.title}
        content={card.content}
      />
    ));
  };

  return (
    <div className="flex flex-col p-3 rounded-lg bg-sidebar gap-y-2 backdrop-blur-[14px]">
      <div className="flex align-center gap-x-2">
        <img src="/icons/certificate.svg" alt="Audit Certificae" />
        <h1 className="text-xl">Audit Certificate</h1>
      </div>

      {renderCards()}
      <div className="flex flex-col m-2 gap-y-2">
        <div className="flex justify-end align-center gap-x-2">
          <img src="/icons/export.svg" alt="" />
          <p className="text-sm">Export</p>
        </div>
        <div>
          <img src="/icons/logo.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
