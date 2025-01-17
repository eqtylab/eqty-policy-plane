// src/AgentPolicyPlane/Interactive/AlertLines.tsx
import React, { useEffect, useRef } from "react";

export const DrawLine = ({
  startId,
  endId,
  isEndpointInFlow = true,
}: {
  startId: string;
  endId: string;
  isEndpointInFlow?: boolean;
}) => {
  const lineRef = useRef<SVGPathElement | null>(null);
  const reactFlowWrapperRef = useRef<HTMLElement | null>(null);
  const nodeObserverRef = useRef<MutationObserver | null>(null);
  const viewportObserverRef = useRef<MutationObserver | null>(null);

  // useEffect(() => {
  //   // Find React Flow instance
  //   reactFlowWrapperRef.current =
  //     document.querySelector(".react-flow__viewport")?.parentElement || null;

  //   const updateLine = () => {
  //     const startElement = document.getElementById(startId);
  //     const endElement = document.getElementById(endId);
  //     const line = lineRef.current;
  //     const reactFlowWrapper = reactFlowWrapperRef.current;

  //     if (!startElement || !endElement || !line || !reactFlowWrapper) return;

  //     // Get the React Flow wrapper transform
  //     const transformStyle = window.getComputedStyle(
  //       reactFlowWrapper.querySelector(".react-flow__viewport") ||
  //         reactFlowWrapper
  //     );
  //     const transform = new DOMMatrix(transformStyle.transform);

  //     // Get element positions
  //     const startRect = startElement.getBoundingClientRect();
  //     const endRect = endElement.getBoundingClientRect();

  //     // Calculate the start and end points
  //     const start = {
  //       x: startRect.right,
  //       y: startRect.top + startRect.height / 2,
  //     };

  //     const end = {
  //       x: endRect.left,
  //       y: endRect.top + endRect.height / 2,
  //     };

  //     // Calculate the control points for the curve
  //     const controlPoint1X = start.x + (end.x - start.x) / 3;
  //     const controlPoint2X = start.x + ((end.x - start.x) * 2) / 3;

  //     // Create the SVG path
  //     const path = `M ${start.x} ${start.y}
  //                   C ${controlPoint1X} ${start.y},
  //                     ${controlPoint2X} ${end.y},
  //                     ${end.x} ${end.y}`;

  //     // Update the path
  //     line.setAttribute("d", path);
  //   };

  //   // Update on viewport or node changes
  //   const handleChange = () => {
  //     requestAnimationFrame(updateLine);
  //   };

  //   // Initial update
  //   updateLine();

  //   // Add viewport observer
  //   const reactFlowWrapper = reactFlowWrapperRef.current;
  //   if (reactFlowWrapper) {
  //     const viewport = reactFlowWrapper.querySelector(".react-flow__viewport");
  //     if (viewport) {
  //       viewportObserverRef.current = new MutationObserver(handleChange);
  //       viewportObserverRef.current.observe(viewport, {
  //         attributes: true,
  //         attributeFilter: ["style", "transform"],
  //       });
  //     }
  //   }

  //   // Add node observer for the end element
  //   const endNode = document
  //     .getElementById(endId)
  //     ?.closest(".react-flow__node");
  //   if (endNode) {
  //     nodeObserverRef.current = new MutationObserver(handleChange);
  //     nodeObserverRef.current.observe(endNode, {
  //       attributes: true,
  //       attributeFilter: ["style", "transform", "class"],
  //       subtree: false,
  //     });
  //   }

  //   // Handle window resize
  //   window.addEventListener("resize", handleChange);

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener("resize", handleChange);
  //     viewportObserverRef.current?.disconnect();
  //     nodeObserverRef.current?.disconnect();
  //   };
  // }, [startId, endId]);

  useEffect(() => {
    // Find React Flow instance
    reactFlowWrapperRef.current =
      document.querySelector(".react-flow__viewport")?.parentElement || null;

    const updateLine = () => {
      const startElement = document.getElementById(startId);
      const endElement = document.getElementById(endId);
      const line = lineRef.current;
      const reactFlowWrapper = reactFlowWrapperRef.current;

      if (!startElement || !endElement || !line || !reactFlowWrapper) return;

      // Get the React Flow wrapper transform
      const transformStyle = window.getComputedStyle(
        reactFlowWrapper.querySelector(".react-flow__viewport") ||
          reactFlowWrapper
      );
      const transform = new DOMMatrix(transformStyle.transform);

      // Get element positions
      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();

      // Calculate the start and end points
      const start = {
        x: startRect.right,
        y: startRect.top + startRect.height / 2,
      };

      const end = {
        x: endRect.left,
        y: endRect.top + endRect.height / 2,
      };

      // Calculate the control points for the curve
      const controlPoint1X = start.x + (end.x - start.x) / 3;
      const controlPoint2X = start.x + ((end.x - start.x) * 2) / 3;

      // Create the SVG path
      const path = `M ${start.x} ${start.y}
                      C ${controlPoint1X} ${start.y},
                        ${controlPoint2X} ${end.y},
                        ${end.x} ${end.y}`;

      // Update the path
      line.setAttribute("d", path);
    };

    // Update on viewport or node changes
    const handleChange = () => {
      requestAnimationFrame(updateLine);
    };

    // Initial update
    updateLine();

    // Add viewport observer
    const reactFlowWrapper = reactFlowWrapperRef.current;
    if (reactFlowWrapper) {
      const viewport = reactFlowWrapper.querySelector(".react-flow__viewport");
      if (viewport) {
        viewportObserverRef.current = new MutationObserver(handleChange);
        viewportObserverRef.current.observe(viewport, {
          attributes: true,
          attributeFilter: ["style", "transform"],
        });
      }
    }

    // Add node observer for the end element
    const endNode = document
      .getElementById(endId)
      ?.closest(".react-flow__node");
    if (endNode) {
      nodeObserverRef.current = new MutationObserver(handleChange);
      nodeObserverRef.current.observe(endNode, {
        attributes: true,
        attributeFilter: ["style", "transform", "class"],
        subtree: false,
      });
    }

    // Handle window resize
    window.addEventListener("resize", handleChange);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleChange);
      viewportObserverRef.current?.disconnect();
      nodeObserverRef.current?.disconnect();
    };
  }, [startId, endId]);
  return (
    <svg
      className="tw-fixed tw-inset-0 tw-pointer-events-none tw-z-50 tw-w-full tw-h-full"
      style={{ overflow: "visible" }}
    >
      <path
        ref={lineRef}
        strokeWidth="1"
        fill="none"
        strokeDasharray="8,4"
        className="tw-stroke-brandalert"
      />
    </svg>
  );
};
