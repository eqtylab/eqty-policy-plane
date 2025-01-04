import React, { useEffect, useState } from "react";

const SVGViewportScaler = ({ children }: { children: React.ReactNode }) => {
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const updateScale = () => {
      // Get the actual-wrap dimensions

      // Calculate available space, widt/ht of actual wrap
      const availableHeight = window.innerHeight - 160;
      const availableWidth = window.innerWidth - 90;

      // Calculate scale (viewport -> available space)
      setScale({
        x: availableWidth / window.innerWidth,
        y: availableHeight / window.innerHeight,
      });
    };

    // Initial calculation
    updateScale();

    // Update on resize
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    // <div className="component-container">
    <div className="tw-absolute tw-top-0 tw-m-auto tw-h-screen tw-w-screen ">
      <div
        className="tw-absolute tw-top-0 tw-m-auto"
        style={{
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px`,
          transform: `scale(${scale.x}, ${scale.y})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SVGViewportScaler;
