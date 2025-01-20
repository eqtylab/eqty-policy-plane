// src/AgentPolicyPlane/CertApp/components/serverCard.tsx
// src/AgentPolicyPlane/CertApp/components/serverCard.tsx
// src/AgentPolicyPlane/CertApp/components/serverCard.tsx
// src/AgentPolicyPlane/CertApp/components/serverCard.tsx
import React from "react";

import AtomIcon from "../icons/atom";
import AlertFilled from "../icons/alert-filled";

import NvidiaIcon from "../icons/nvidia";
import IntelIcon from "../icons/intel";

const ServerCard = () => {
  return (
    <div>
      <div className="tw-py-4 tw-mr-16 tw-rounded-lg tw-px-7 tw-bg-gradient-to-r tw-from-card-1 tw-from-[-30%] tw-to-card-2 tw-backdrop-blur-sm">
        <div className="tw-pb-4 tw-border-b tw-border-black">
          <div className="tw-flex tw-items-center tw--translate-x-4 tw-gap-x-2">
            <div className="tw-w-[8px] tw-h-[7px] tw-bg-[#00F996] tw-rounded-full tw-translate-y-1"></div>
            <h1 className="tw-text-4xl">Server Cluster 2</h1>
          </div>
          <h2 className="tw-text-xl">US East - N. Carolina</h2>
        </div>

        <div className="tw-grid tw-grid-cols-2 tw-py-4 tw-place-content-center">
          <div>
            <p className="tw-text-gray-400">
              Dell R760 <br />
              GPU: NVIDIA H100 <br />
              AVG GPU: 83.8% <br />
              AVG GPU Usage: 78.1% <br />
              CPU Cores: 48 <br />
              AVG CPU: 2.5% <br />
              AVG CPU Memory: 10.2%
            </p>
          </div>
          <div>
            <div className="tw-flex tw-mb-3 tw-gap-x-2 tw-align-center">
              {/* <img src={AtomIcon} alt="" width={40} /> */}
              <div className="tw-w-[40px]">
                <AtomIcon />
              </div>
              <h2 className="tw-text-xl tw-font-semibold">
                First Responder Agent
              </h2>
            </div>
            <div className="tw-flex tw-items-start tw-p-3 tw-bg-[#A35456] tw-rounded-lg tw-gap-x-2 ">
              <div className="tw-translate-y-2">
                <AlertFilled />
              </div>
              <p>
                Your action was halted because it flagged the sourcing protocol
                mandatory control #234
              </p>
            </div>
          </div>
        </div>

        <div className="tw-bg-[#D3E660] tw-p-2 ">
          <NvidiaIcon />
          <h2 className="tw-pt-6 tw-pb-12 tw-text-4xl tw-font-semibold tw-text-center tw-text-black">
            H100
          </h2>
        </div>
        <div className="tw-bg-[#4F99E9] tw-px-3 tw-py-6 tw-grid tw-grid-cols-3 tw-gap-2 ">
          <IntelIcon />
          <h2 className="tw-text-2xl tw-font-semibold tw-text-center tw-text-black ">
            XEON 5
          </h2>
        </div>
      </div>
      <button className="tw-px-5 tw-py-2 tw-mt-2 tw-border tw-rounded-full tw-border-grey-500">
        00000006-0454-005
      </button>
    </div>
  );
};

export default ServerCard;
