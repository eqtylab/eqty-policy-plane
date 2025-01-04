import React, { useEffect, useRef, useState } from "react";

export const AgentPolicyPlaneContainer = ({
  children,
  responsiveRender,
}: {
  children: React.ReactNode;
  responsiveRender?: () => React.ReactNode;
}) => {
  const gridContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const baseCellSize = 40; // desired size

  useEffect(() => {
    const adjustGrid = () => {
      const container = gridContainerRef.current;
      if (!container) return;

      // @ts-expect-error
      const containerWidth = container.offsetWidth;
      // @ts-expect-error
      const containerHeight = container.offsetHeight;

      // Calculate number of complete cells that can fit
      const numHorizontalCells = Math.floor(containerWidth / baseCellSize);
      const numVerticalCells = Math.floor(containerHeight / baseCellSize);

      // Calculate the actual dimensions to fit these cells perfectly
      const adjustedWidth = numHorizontalCells * baseCellSize;
      const adjustedHeight = numVerticalCells * baseCellSize;

      setDimensions({
        width: adjustedWidth,
        height: adjustedHeight,
      });
    };

    adjustGrid();
    window.addEventListener("resize", adjustGrid);
    return () => window.removeEventListener("resize", adjustGrid);
  }, []);
  return (
    <div className="component-container">
      {responsiveRender && responsiveRender()}
      {!responsiveRender && (
        <div className="tw-py-16 tw-px-9 tw-w-full tw-h-full tw-overflow-scroll">
          {/* Outer container for centering */}
          <div className="tw-w-full tw-h-full tw-relative tw-flex tw-items-center tw-justify-center">
            {/* Grid container with exact dimensions */}

            <div
              ref={gridContainerRef}
              className="tw-absolute tw-inset-0 tw-z-50 tw-flex tw-justify-center"
            >
              <div
                className="tw-relative tw-shadow-[4px_4px_10px_1px_rgba(0,0,0,0.18)] tw-flex tw-justify-center"
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  backgroundImage: `
                  linear-gradient(to right, rgba(65,66,67,0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(65,66,67,0.2) 1px, transparent 1px)
                `,
                  backgroundSize: `${baseCellSize}px ${baseCellSize}px`,
                  // backgroundPosition: "1px 1px",
                  // broder bottom and right: 1px solid rgba(255,255,255,0.1)
                  borderRight: "1px solid rgba(65,66,67,0.2)",
                  borderBottom: "1px solid rgba(65,66,67,0.2)",
                }}
              >
                <div className="tw-relative tw-z-10 tw-w-full tw-max-w-[1736px] tw-h-full tw-p-8">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
