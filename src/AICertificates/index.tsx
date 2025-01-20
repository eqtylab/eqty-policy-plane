// src/AICertificates/index.tsx
import React from "react";
import { Badge, Shield, Cpu, Server, CheckCircle } from "lucide-react";

const CertIcon = () => (
  <svg
    className="tw-mt-[11px] tw-mr-3"
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_726_174)">
      <path
        d="M74.8813 5.7598H32.3797C30.0865 5.7598 27.8905 6.6706 26.2705 8.2906L8.29209 26.269C6.67209 27.889 5.76129 30.0886 5.76129 32.3782V66.2398C5.76129 71.0134 9.63129 74.8798 14.4013 74.8798H53.5189C49.3861 71.0026 46.8013 65.4982 46.8013 59.3998C46.8013 47.689 56.3305 38.1598 68.0413 38.1598C74.1397 38.1598 79.6441 40.7482 83.5213 44.8774V14.3998C83.5213 9.6298 79.6549 5.7598 74.8813 5.7598ZM30.9613 47.401H15.3625C14.0377 47.401 12.9613 46.3282 12.9613 44.9998C12.9613 43.6714 14.0341 42.5986 15.3625 42.5986H30.9613C32.2861 42.5986 33.3625 43.6714 33.3625 44.9998C33.3625 46.3282 32.2897 47.401 30.9613 47.401ZM47.7625 36.601H15.3625C14.0377 36.601 12.9613 35.5246 12.9613 34.1998C12.9613 32.875 14.0341 31.7986 15.3625 31.7986H47.7625C49.0873 31.7986 50.1637 32.8714 50.1637 34.1998C50.1637 35.5282 49.0909 36.601 47.7625 36.601Z"
        fill="url(#paint0_linear_726_174)"
      />
      <path
        d="M68.04 43.92C59.5044 43.92 52.56 50.8644 52.56 59.4C52.56 67.9356 59.5044 74.88 68.04 74.88C76.5756 74.88 83.52 67.9356 83.52 59.4C83.52 50.8644 76.5756 43.92 68.04 43.92Z"
        fill="url(#paint1_linear_726_174)"
      />
      <path
        d="M77.1097 54.8399L77.333 54.5924L77.0855 54.3691L76.1392 53.5153L75.8918 53.292L75.6685 53.5395L65.0042 65.3591L60.908 61.2318L60.6732 60.9953L60.4366 61.2301L59.532 62.1279L59.2954 62.3627L59.5302 62.5993L64.8232 67.9324L65.0714 68.1824L65.3073 67.9209L77.1097 54.8399Z"
        fill="black"
        stroke="black"
        stroke-width="0.666667"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_726_174"
        x1="17.4953"
        y1="8.72209"
        x2="49.8151"
        y2="86.0476"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#E2CCFF" />
        <stop offset="1" stop-color="#0D0D0D" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_726_174"
        x1="60.1618"
        y1="49.4486"
        x2="92.0893"
        y2="99.8968"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop offset="0.459251" />
        <stop offset="0.643137" />
      </linearGradient>
      <clipPath id="clip0_726_174">
        <rect width="90" height="90" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const AgentProvisionCertificate = () => {
  const certificationChecks = [
    {
      category: "1. Risk Management",
      checks: [
        // Analyzing group
        "Analyzing known health and safety risks",
        "Analyzing known fundamental rights risks",
        "Analyzing foreseeable health and safety risks",
        "Analyzing foreseeable fundamental rights risks",
        // Evaluating group
        "Evaluating emerging risks",
        "Evaluating emerging risks from misuse",
        "Evaluating risks from monitoring system",
        // Identifying group
        "Identifying known health and safety risks",
        "Identifying known fundamental rights risks",
        "Identifying foreseeable health and safety risks",
        "Identifying foreseeable fundamental rights risks",
        // Implementation
        "Implementing health and safety measures",
      ],
    },
    {
      category: "2. Data Governance",
      checks: [
        // Detecting group
        "Detecting discriminatory outputs",
        "Detecting biased health and safety outputs",
        "Detecting biased fundamental rights outputs",
        // Mitigating group
        "Mitigating discriminatory outputs",
        "Mitigating biased health and safety outputs",
        "Mitigating biased fundamental rights outputs",
        // Preventing group
        "Preventing discriminatory outputs",
        "Preventing biased health and safety outputs",
        "Preventing biased fundamental rights outputs",
      ],
    },
    {
      category: "3. System Monitoring",
      checks: [
        // Analyzing group
        "Analyzing compliance data",
        "Analyzing performance data",
        "Analyzing system interactions",
        // Collecting/Documenting group
        "Collecting performance data",
        "Documenting deployer performance data",
        "Documenting performance data",
        // Feedback loops group
        "Detecting feedback loops",
        "Implementing feedback loop mitigation measures",
      ],
    },
    {
      category: "4. Quality Management",
      checks: [
        // Primary actions
        "Conducting post-development examination procedures",
        "Executing systematic quality assurance actions",
        "Implementing quality control techniques",
        "Implementing serious incident reporting procedures",
        "Maintaining written quality management policies",
        "Managing security of supply measures",
        "Performing post-development test procedures",
      ],
    },
    {
      category: "5. Record Keeping",
      checks: [
        // Automatic logs group
        "Automatically generating logs",
        "Generating automatic logs",
        // Implementing group
        "Implementing record-keeping documentation systems",
        "Implementing record-keeping information systems",
        // Logging group
        "Logging product risk identification",
        "Logging relevant events",
        "Logging substantial modifications",
        // Maintaining group
        "Maintaining record-keeping documentation procedures",
        "Maintaining record-keeping information procedures",
      ],
    },
  ];

  const totalChecks = certificationChecks.reduce(
    (acc, category) => acc + category.checks.length,
    0
  );

  return (
    <div className="component-container ">
      <div className="tw-p-6 tw-px-32 tw-bg-[#09090B]  tw-flex tw-flex-col">
        {/* header */}
        <div className="tw-h-[126px] tw-pl-24 tw-flex tw-items-center">
          <CertIcon />
          <div className="tw-flex tw-flex-col">
            <p className="tw-text-white tw-text-[20px] tw-font-medium tw-leading-[100%] tw-mb-1">
              Audit Certificate
            </p>
            <span className="tw-text-white tw-text-[32px] tw-font-normal tw-leading-[100%] tw-mb-1">
              EU AI Act - EMS
            </span>
            <p className="tw-text-[#A1A1AA] tw-font-normal tw-text-[13px] tw-leading-[100%]">
              Last Completed 5 Sec Ago
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="tw-bg-white/5 tw-p-6 tw-pt-8 rounded">
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mb-6 tw-box-border">
            {/* Controls Card */}
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                height: "142px",
                filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.05))",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(279.39deg,  rgba(59, 130, 246, 0.35) 3.45%, rgba(21, 21, 23, 0) 102.13%)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "16px",
                  gap: "8px",
                }}
              >
                <div className="tw-flex tw-items-start tw-gap-3 tw-border-b tw-border-white/5 tw-w-full tw-min-h-[40px]">
                  <Shield size={24} className="tw-text-blue-500" />
                  <div className="tw-text-base tw-text-white tw-font-normal">
                    Controls Met
                  </div>
                </div>

                <div>
                  <div className="tw-text-[56px]  tw-text-blue-500">
                    {totalChecks}
                  </div>
                </div>
              </div>
            </div>

            {/* Authority Card */}
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                height: "142px",
                filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.05))",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(283.45deg, rgba(34, 197, 94, 0.35) 2.95%, rgba(21, 21, 23, 0) 62.89%)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "16px",
                  paddingBottom: 8,
                  gap: "8px",
                }}
              >
                <div className="tw-flex tw-items-start tw-gap-3 tw-border-b tw-border-white/5 tw-w-full tw-min-h-[40px]">
                  <Server size={24} className="tw-text-green-500" />
                  <div className="tw-text-base tw-text-white tw-font-normal">
                    Audit Authority
                  </div>
                </div>

                <div className="tw-text-[32px]  tw-text-green-500">
                  Garda Síochána
                </div>
              </div>
            </div>

            {/* Registration Card */}
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                height: "142px",
                filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.05))",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(279.39deg, rgba(226, 204, 255, 0.35) 3.45%, rgba(21, 21, 23, 0) 102.13%)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",

                  paddingTop: "16px",
                  paddingBottom: 8,
                  gap: "8px",
                }}
                className="tw-px-9"
              >
                <div className="tw-flex tw-items-start tw-gap-3 tw-border-b tw-border-white/5 tw-w-full tw-min-h-[40px]">
                  <Server size={24} className="tw-text-white" />
                  <div className="tw-text-base tw-text-white tw-font-normal">
                    Registration
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-flex-grow tw-justify-center">
                  <span className="tw-text-white tw-text-sm">
                    CID bafkr...aueq
                  </span>
                  <span className="tw-text-white tw-text-sm">
                    HCS{" "}
                    <a
                      href="https://hashscan.io/mainnet/transaction/1717101762.014321858"
                      target="_blank"
                    >
                      Oxe34...eb5e
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-max-h-[800px] tw-overflow-auto">
            {certificationChecks.map((category, idx) => (
              <div
                key={idx}
                className="tw-p-4 tw-rounded-lg tw-border tw-border-[#27272A] tw-bg-[#D9D9D9]/5"
              >
                <div className="tw-h-[40px]  tw-text-[#fafafa] tw-border-b tw-border-[#27272A]">
                  {category.category}
                </div>
                <div className="tw-p-4">
                  <div className="tw-grid tw-gap-2">
                    {category.checks.map((check, checkIdx) => (
                      <div
                        key={checkIdx}
                        className="tw-flex tw-items-center tw-gap-2"
                      >
                        <CheckCircle size={16} className="tw-text-green-500" />
                        <span className="tw-text-[14px] tw-text-[#A1A1AA]">
                          {check}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
