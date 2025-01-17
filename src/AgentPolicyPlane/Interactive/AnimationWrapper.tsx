// src/AgentPolicyPlane/Interactive/AnimationWrapper.tsx
import React from "react";

export const AnimationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="tw-transform tw-transition-all tw-duration-700 tw-h-full tw-w-full"
      style={{
        animation: "smoothSlideIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <style>{`
        @keyframes smoothSlideIn {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          20% {
            opacity: 0.5;
          }
          45% {
            transform: translateX(-8px);
          }
          65% {
            transform: translateX(4px);
          }
          85% {
            transform: translateX(-2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      {children}
    </div>
  );
};
