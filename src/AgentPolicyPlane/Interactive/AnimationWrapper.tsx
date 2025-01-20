// src/AgentPolicyPlane/Interactive/AnimationWrapper.tsx
import React from "react";

export const AnimationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className=" tw-h-full tw-w-full"
      style={{
        animation: "smoothSlideIn 0.6s ease-out forwards",
      }}
    >
      <style>{`
        @keyframes smoothSlideIn {
          0% {
            opacity: 0;
            transform: translateX(30px);
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
