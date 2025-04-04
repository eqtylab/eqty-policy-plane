// src/AICertificates/SummaryCert.tsx
import React, { useEffect, useState } from "react";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";

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

const getTimestampApriori = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - 1);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "EST",
    hour12: false,
  });
};

const Header = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Get current time and subtract 1 minute
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);

    // Format the time
    const formatted = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "EST",
      hour12: false,
    });

    setTimestamp(formatted);
  }, []);

  return (
    <div className="tw-h-[126px] tw-pl-24 tw-flex tw-items-center">
      <CertIcon />
      <div className="tw-flex tw-flex-col">
        <p className="tw-text-white tw-text-[20px] tw-font-medium tw-leading-[100%] tw-mb-1">
          Claim Processing Summary
        </p>
        <span className="tw-text-white tw-text-[32px] tw-font-normal tw-leading-[100%] tw-mb-1">
          Insurance Claim Report
        </span>
        <p className="tw-text-[#A1A1AA] tw-font-normal tw-text-[13px] tw-leading-[100%]">
          Generated {timestamp}
        </p>
      </div>
    </div>
  );
};

export const AgenticSummaryReportCert = () => {
  const metrics = {
    policiesPassed: 10,
    controlsPassed: 45, // Based on certification checks shown in original cert
    controlsMitigated: 2,
  };

  const summaryText = `
  Final Claims Summary Report - ${getTimestampApriori()}
  
  CLAIM OVERVIEW
  Claim Number: AIC-2025-0045892
  Insured: Morgan Reynolds
  Incident Date: 2025-02-12 14:28 EST
  Vehicle: 2022 Tesla Model Y (VIN: 5YJYGAEE4MF123456)
  Cause of Loss: Collision with road debris and guardrail
  Liability Determination: 0% Insured / 100% Third-Party (JB Logistics)
  Coverage Applied: Comprehensive with deductible waiver
  Total Incurred: $27,892.45
  Recovery Status: Subrogation successful - 100% recovery
  
  KEY RESOLUTION TIMELINE
  - 2025-02-12: Claim reported
  - 2025-02-19: Claim approved and repair authorized
  - 2025-02-20: Repairs commenced at Tesla Service Center
  - 2025-03-05: Vehicle repairs completed
  - 2025-03-07: Vehicle returned to insured
  - 2025-03-10: Claim closed following satisfaction confirmation
  
  FINANCIAL SUMMARY
  | Expense Category     | Estimated | Actual  | Variance |
  |----------------------|-----------|---------|----------|
  | Vehicle Repairs     | $20,000.00 | $19,842.45 | -$157.55 |
  | Rental Vehicle      | $1,200.00 | $1,350.00 | +$150.00 |
  | Medical Expenses    | $2,500.00 | $2,750.00 | +$250.00 |
  | Towing/Emergency    | $350.00  | $350.00 | $0.00 |
  | Diminished Value    | $3,500.00  | $3,600.00 | +$100.00 |
  | **Total**           | **$27,550.00** | **$27,892.45** | **+$342.45** |
  
  SUBROGATION OUTCOME
  - Liability accepted by JB Logistics insurer (Continental Coverage)
  - 100% recovery achieved: $27,892.45 received on 2025-03-08
  
  CUSTOMER SATISFACTION METRICS
  - Final Satisfaction Survey: 10/10
  - Net Promoter Score: 10/10 (Promoter)
  - Retention Risk: Very Low
  
  LESSONS & PROCESS IMPROVEMENTS
  ✔ Rapid authorization minimized downtime.
  ✔ Comprehensive evidence led to full cost recovery.
  ✔ Proactive claimant support increased satisfaction.
  ❖ Tesla parts procurement process can be optimized.
  ❖ Early initiation of diminished value assessment recommended.

  FINAL DISPOSITION
  This claim was processed with optimal financial and customer experience outcomes. Claimant received prompt support, vehicle repairs met manufacturer standards, and all costs were recovered. Case marked as **reference standard** for high-value claims involving third-party liability.
  `;

  return (
    <div className="tw-p-6 tw-bg-[#09090B] tw-rounded-xl">
      <Header />

      <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mb-8">
        {/* Policies Card */}
        <div className="tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-lg tw-p-4">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
            <Shield className="tw-text-blue-500" />
            <span className="tw-text-white">Policies Passed</span>
          </div>
          <div className="tw-text-4xl tw-text-blue-500">
            {metrics.policiesPassed}
          </div>
        </div>

        {/* Controls Card */}
        <div className="tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-lg tw-p-4">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
            <CheckCircle className="tw-text-green-500" />
            <span className="tw-text-white">Controls Passed</span>
          </div>
          <div className="tw-text-4xl tw-text-green-500">
            {metrics.controlsPassed}
          </div>
        </div>

        {/* Mitigated Card */}
        <div className="tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-lg tw-p-4">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
            <AlertTriangle className="tw-text-yellow-500" />
            <span className="tw-text-white">Controls Mitigated</span>
          </div>
          <div className="tw-text-4xl tw-text-yellow-500">
            {metrics.controlsMitigated}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-lg tw-p-6">
        <h3 className="tw-text-white tw-text-xl tw-mb-4">
          Agentic Response Summary
        </h3>
        <div className="tw-text-gray-300 tw-whitespace-pre-line">
          {summaryText}
        </div>
      </div>
    </div>
  );
};
