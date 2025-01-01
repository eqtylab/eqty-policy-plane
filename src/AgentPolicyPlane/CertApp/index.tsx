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
      className="h-screen bg-transparent flex justify-center items-center text-white 
    "
    >
      <div className="grid items-center grid-cols-12 px-24">
        <div className="col-span-2 policies">
          <Policies />
        </div>
        <div className="col-span-4">
          <Lines />
        </div>
        <div className="col-span-4 server-card">
          <ServerCard />
        </div>
        {/* <div className='col-span-1'></div> */}
        <div className="col-span-2 sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
