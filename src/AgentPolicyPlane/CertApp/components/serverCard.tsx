import React from "react";
const ServerCard = () => {
  return (
    <div>
      <div className="py-4 mr-16 rounded-lg px-7 bg-gradient-to-r from-card-1 from-[-30%] to-card-2 backdrop-blur-sm">
        <div className="pb-4 border-b border-black">
          <div className="flex items-center -translate-x-4 gap-x-2">
            <div className="w-[8px] h-[7px] bg-[#00F996] rounded-full translate-y-1"></div>
            <h1 className="text-4xl">Server Cluster 2</h1>
          </div>
          <h2 className="text-xl">US East - N. Carolina</h2>
        </div>

        <div className="grid grid-cols-2 py-4 place-content-center">
          <div>
            <p className="text-gray-400">
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
            <div className="flex mb-3 gap-x-2 align-center">
              <img src="/icons/atom.svg" alt="" width={40} />
              <h2 className="text-xl font-semibold">First Responder Agent</h2>
            </div>
            <div className="flex  items-start p-3 bg-[#A35456] rounded-lg gap-x-2 ">
              <img
                src="/icons/alert-filled.svg"
                alt=""
                className="translate-y-2"
              />
              <p>
                Your action was halted because it flagged the sourcing protocol
                mandatory control #234
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#D3E660] p-2 ">
          <img src="/icons/nvidia.svg" alt="" />
          <h2 className="pt-6 pb-12 text-4xl font-semibold text-center text-black">
            H100
          </h2>
        </div>
        <div className="bg-[#4F99E9] px-3 py-6 grid grid-cols-3 gap-2 ">
          <img src="/icons/intel.svg" alt="" />
          <h2 className="text-2xl font-semibold text-center text-black ">
            XEON 5
          </h2>
        </div>
      </div>
      <button className="px-5 py-2 mt-2 border rounded-full border-grey-500">
        00000006-0454-005
      </button>
    </div>
  );
};

export default ServerCard;
