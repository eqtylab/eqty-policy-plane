// src/AgentPolicyPlane/Interactive/DelayedRenderWrapper.tsx
import React from "react";

// Delayed render wrapper - standard render wrapped in a setTimeout

export const DelayedRenderWrapper = ({
  children,
  t = 1000,
}: {
  children: React.ReactNode;
  t: number;
}) => {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, t);
  }, []);

  return render ? <>{children}</> : null;
};
