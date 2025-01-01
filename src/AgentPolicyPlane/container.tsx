import React, { useEffect, useRef, useState } from "react";

export const AgentPolicyPlaneContainer = ({
  children,
}: {
  children: React.ReactNode;
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
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* Padded container */}
      <div className="py-16 px-9 w-full h-full">
        {/* Outer container for centering */}
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Grid container with exact dimensions */}

          <div
            ref={gridContainerRef}
            className="absolute inset-0 z-50 flex justify-center"
          >
            <div
              className="relative shadow-[4px_4px_10px_1px_rgba(0,0,0,0.18)] "
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
              <div className="relative z-10 w-full h-full p-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Blur effect */}
      {/* <div
        className="absolute bottom-0 right-0 w-1/2 h-full  blur-[300px] opacity-30"
        style={{
          backgroundColor: "rgba(131, 73, 255, 1)",

          transform: "translate(66%, 40%)",
        }}
      /> */}
    </div>
  );
};

// import React, { useEffect, useRef, useState } from 'react';

// export const AgentPolicyContainer = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const gridContainerRef = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const baseCellSize = 40;

//   // Handle resize
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (gridContainerRef.current) {
//         const container = gridContainerRef.current;
//         // @ts-expect-error
//         const parent = container.parentElement;
//         const width = Math.min(parent.clientWidth - 64, 1200); // Max width of 1200px
//         const height = Math.min(parent.clientHeight - 64, 800); // Max height of 800px
//         setDimensions({ width, height });
//       }
//     };

//     updateDimensions();
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, []);

//   // Draw canvas effect
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     const { width, height } = canvas;

//     // Clear canvas
//     ctx.clearRect(0, 0, width, height);

//     // Save context state
//     ctx.save();

//     // Move to bottom right corner and rotate
//     ctx.translate(width * 0.95, height * 0.77);

//     // Create gradient
//     const gradient = ctx.createRadialGradient(
//       0,
//       0,
//       0, // Inner circle (x, y, radius)
//       0,
//       0,
//       width * 0.22 // Outer circle (x, y, radius)
//     );

//     // Add color stops
//     gradient.addColorStop(0, "rgba(131, 73, 255, 0.4)");
//     gradient.addColorStop(1, "rgba(131, 73, 255, 0.1)");

//     // Draw ellipse with rotation parameter
//     ctx.beginPath();
//     ctx.ellipse(
//       0,
//       0,
//       width * 0.22,
//       height * 0.55,
//       (24 * Math.PI) / 180,
//       0,
//       2 * Math.PI
//     );

//     // Apply gradient
//     ctx.fillStyle = gradient;
//     ctx.fill();

//     // Restore context
//     ctx.restore();

//     // Apply blur
//     ctx.filter = "blur(300px)";
//     ctx.drawImage(canvas, 0, 0);
//     ctx.filter = "none";
//   }, [dimensions]);

//   return (
//     <div
//       className="relative w-full h-screen overflow-hidden"
//       style={{ backgroundColor: "rgba(13,14,15,1)" }}
//     >
//       {/* Background canvas */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//         width={window.innerWidth}
//         height={window.innerHeight}
//       />

//       {/* Padded container */}
//       <div className="py-16 px-9 w-full h-full">
//         <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
//           {/* Grid container */}
//           <div
//             ref={gridContainerRef}
//             className="absolute inset-0 z-50 flex justify-center"
//           >
//             <div
//               className="relative shadow-[4px_4px_10px_1px_rgba(0,0,0,0.18)]"
//               style={{
//                 width: dimensions.width,
//                 height: dimensions.height,
//                 backgroundImage: `
//                   linear-gradient(to right, rgba(65,66,67,0.2) 1px, transparent 1px),
//                   linear-gradient(to bottom, rgba(65,66,67,0.2) 1px, transparent 1px)
//                 `,
//                 backgroundSize: `${baseCellSize}px ${baseCellSize}px`,
//                 borderRight: "1px solid rgba(65,66,67,0.2)",
//                 borderBottom: "1px solid rgba(65,66,67,0.2)",
//               }}
//             >
//               <div className="relative z-10 w-full h-full p-8">{children}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
