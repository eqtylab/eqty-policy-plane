// src/AICertificates/index.tsx
import React from "react";
import { Badge, Shield, Cpu, Server, CheckCircle } from "lucide-react";

export const AgentProvisionCertificate = () => {
  const certificationChecks = [
    {
      category: "1. Real-Time Detection Quality",
      checks: [
        "Precision/recall rates within threshold (last 15min)",
        "False positive/negative rates acceptable",
        "Confidence scores above baseline",
        "Detection accuracy > 98%",
        "No anomaly patterns detected",
      ],
    },
    {
      category: "2. System Performance Metrics",
      checks: [
        "Inference latency < 200ms",
        "Resource utilization nominal",
        "No frame drops detected",
        "Pipeline latency acceptable",
        "Sufficient resource headroom",
      ],
    },
    {
      category: "3. Data Quality Assurance",
      checks: [
        "Image quality metrics passed",
        "Stable satellite feed confirmed",
        "Metadata integrity verified",
        "Sensor calibration current",
        "Environmental conditions suitable",
      ],
    },
    {
      category: "4. Operational Integrity",
      checks: [
        "Input/output logging active",
        "Geographic coverage complete",
        "Alert response times nominal",
        "System state stable",
        "Audit trail current",
      ],
    },
    {
      category: "5. Model Drift Detection",
      checks: [
        "Inference patterns stable",
        "Feature space coverage normal",
        "Confidence distributions stable",
        "Environmental performance normal",
        "No seasonal anomalies",
      ],
    },
    {
      category: "6. Alert Verification",
      checks: [
        "Secondary sensing verified",
        "Human verification complete",
        "Alert accuracy confirmed",
        "False alarm check passed",
        "Response time within limits",
      ],
    },
    {
      category: "7. System Health",
      checks: [
        "Security posture verified",
        "System uptime normal",
        "Network connectivity stable",
        "Data pipeline intact",
        "Failover systems ready",
      ],
    },
    {
      category: "8. Required Actions",
      checks: [
        "Operations team notified",
        "Daily reports current",
        "Trend analysis complete",
        "Performance evaluation done",
        "System audit current",
      ],
    },
    {
      category: "9. Documentation",
      checks: [
        "Metrics properly logged",
        "Incident response documented",
        "System adjustments recorded",
        "Alert verification logged",
        "Performance data archived",
      ],
    },
  ];

  return (
    <div className="component-container ">
      <div className="tw-p-6 tw-px-32 tw-bg-[#09090B]  tw-flex tw-flex-col">
        <div>
          <div className="tw-flex tw-items-center tw-gap-2 tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-6">
            <Badge size={24} />
            <span>Verifiable AI Audit</span>
          </div>
        </div>
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
                  <div className="tw-text-[56px]  tw-text-blue-500">41</div>
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
                className="tw-h-fit tw-rounded-lg tw-border tw-border-gray-200"
              >
                <div className="tw-p-4 tw-bg-gray-50 tw-border-b tw-border-gray-200">
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
                        <span className="tw-text-sm">{check}</span>
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
