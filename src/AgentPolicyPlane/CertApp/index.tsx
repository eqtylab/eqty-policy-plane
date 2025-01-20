// src/AgentPolicyPlane/CertApp/index.tsx
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Lines from "./components/lines";
import Policies from "./components/policies";
import ServerCard from "./components/serverCard";
import Sidebar from "./components/sidebar";

export const CertApp = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".policies", {
      x: -100,
      duration: 1,
      ease: "power4.out",
      opacity: 0,
    });

    tl.from(".server-card", {
      y: 100,
      duration: 1,
      ease: "power4.out",
      opacity: 0,
    });

    tl.from(".sidebar", {
      y: -100,
      duration: 1,
      ease: "power4.out",
      opacity: 0,
    });

    tl.from(
      "#lines-bg",
      {
        opacity: 0,
        duration: 1,
      },
      "-=1"
    );
  }, []);

  return (
    // add background image to the div
    <div
      className="tw-h-screen tw-bg-transparent tw-flex tw-justify-center tw-items-center tw-text-white 
    "
    >
      <div className="tw-grid tw-items-center tw-grid-cols-12 tw-px-24">
        <div className="tw-col-span-2 tw-policies">
          <Policies />
        </div>
        <div className="tw-col-span-4">
          <Lines />
        </div>
        <div className="tw-col-span-4 tw-server-card">
          <ServerCard />
        </div>
        {/* <div className='col-span-1'></div> */}
        <div className="tw-col-span-2 tw-sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
