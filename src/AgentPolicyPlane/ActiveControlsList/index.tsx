import React, { useEffect, useRef, useState } from "react";

/** Define the structure of each control object */
type Control = {
  id: string;
  title: string;
  isAlert?: boolean;
  mandatory?: boolean;
  implemented?: boolean;
};

interface ActiveControlsListProps {
  data: Control[];
  onControlClick: (id: string) => void;
}

const DrawLine = ({ startId, endId }: { startId: string; endId: string }) => {
  const lineRef = useRef<SVGPathElement | null>(null);
  const reactFlowWrapperRef = useRef<HTMLElement | null>(null);
  const nodeObserverRef = useRef<MutationObserver | null>(null);
  const viewportObserverRef = useRef<MutationObserver | null>(null);

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

const AlertList = ({
  data,
  onControlClick,
}: {
  data: Control[];
  onControlClick: (id: string) => void;
}) => {
  const [activeLineStart, setActiveLineStart] = useState<string | null>(null);

  return (
    <>
      {data.map((control) => {
        let classes = `tw-px-2 tw-py-1 tw-rounded-lg tw-cursor-pointer tw-transition-colors tw-max-w-[153px] tw-flex tw-items-center tw-relative`;

        if (control.isAlert) {
          classes += " tw-border !tw-border-brandreddark tw-bg-brandred";
        } else if (control.mandatory && control.implemented) {
          classes += " tw-border !tw-border-brandblue ";
        } else if (!control.mandatory) {
          classes += " tw-border !tw-border-brandgray ";
        } else {
          classes += " tw-border !tw-border-red-600 tw-text-red-200";
        }

        return (
          <div key={control.id} className="tw-relative">
            <div
              className={classes}
              onClick={() => {
                if (control.isAlert) {
                  if (activeLineStart) {
                    setActiveLineStart(null);
                  } else {
                    setActiveLineStart(`${control.id}-item-wrapper`);
                  }
                }

                onControlClick(control.id);
              }}
            >
              {control.title}
            </div>

            {/* Sonar animations - only shown for alert items */}
            {control.isAlert && (
              <div
                id={`${control.id}-item-wrapper`}
                className="tw-absolute tw-inset-0 tw-z-0 tw-pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar tw-opacity-40"></div>
                <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar-delayed tw-opacity-40"></div>
                <div className="tw-absolute tw-inset-0 tw-rounded-lg tw-border !tw-border-brandreddark animate-sonar-more-delayed tw-opacity-40"></div>
              </div>
            )}
          </div>
        );
      })}
      {/* Render the line when activeLineStart is set */}
      {activeLineStart && (
        <DrawLine startId={activeLineStart} endId="ripple-point-eq" />
      )}
    </>
  );
};

/**
 * Renders a left-hand side list of active controls.
 */
export const ActiveControlsList: React.FC<ActiveControlsListProps> = ({
  data,
  onControlClick,
}) => {
  return (
    <div className="tw-text-white tw-w-64 tw-flex-col tw-flex tw-items-center tw-overflow-x-visible">
      <h2 className="tw-text-[18px] tw-mb-4 tw-font-[500] tw-w-[153px]">
        Active Controls
      </h2>
      <div
        className="tw-flex tw-flex-col tw-gap-3 tw-font-[400] tw-text-[16px]  tw-h-[90%] tw-pb-14 tw-scroll-smooth	tw-scrollbar-hidden" // removed 0verflow-y-auto
        style={{
          // maskImage: "linear-gradient(to bottom, black 80%, transparent 99%)",
          overflowX: "visible",
        }}
      >
        <AlertList data={data} onControlClick={onControlClick} />
      </div>
    </div>
  );
};
