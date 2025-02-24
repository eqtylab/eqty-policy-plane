// src/AgentPolicyPlane/PlaneConsoleView/index.tsx
import { DockviewDefaultTab, DockviewReact } from "dockview";
import * as React from "react";
import { useEffect, useState } from "react";

import { usePipeline } from "../context/PipelineContext";

import { dockviewComponents } from "./dockview/DockComponents";
import { RightControls } from "./dockview/RightControls";
import { OutputTemplate } from "../context/types.outputs";

const headerComponents = {
  default: (props: any) => {
    const onContextMenu = (event: any) => {
      event.preventDefault();
      // alert("context menu");
    };
    return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />;
  },
};

const calculatePanelPosition = (index: number, existingPanels: any[]) => {
  // Early return for first panel - defaults to top-left
  if (index === 0) return {};

  const column = index % 4;
  const row = Math.floor(index / 4);

  // Validate we have required panels
  if (!Array.isArray(existingPanels) || !existingPanels.length) return {};

  // First row (panels 1-3): position to right of previous panel
  if (row === 0) {
    const previousPanel = existingPanels[index - 1];
    if (!previousPanel?.id) return {};

    return {
      position: {
        referencePanel: previousPanel.id,
        direction: "right",
      },
    };
  }

  // Second row (panels 4-7): position below corresponding panel in first row
  const referencePanelIndex = (row - 1) * 4 + column;
  const referencePanel = existingPanels[referencePanelIndex];
  if (!referencePanel?.id) return {};

  return {
    position: {
      referencePanel: referencePanel.id,
      direction: "below",
    },
  };
};

export const RunDock = (props: any) => {
  const [api, setApi] = React.useState<any>();
  const [panelCount, setPanelCount] = useState(0);

  const [syncedPanels, setSyncedPanels] = useState<any>([]);
  const { state: pipelineState } = usePipeline();
  const initialOutputs = Object.values(pipelineState.nodes).reduce(
    (acc, node) => acc.concat(node.outputs),
    [] as OutputTemplate[]
  );

  const [allPanels, setAllPanels] = useState<any>(initialOutputs);
  useEffect(() => {
    if (!api) return;

    const allOutputs = Object.values(pipelineState.nodes).reduce(
      (acc, node) => acc.concat(node.outputs),
      [] as OutputTemplate[]
    );

    // Keep track of all panels we've added
    const currentPanels: any[] = [];

    allOutputs.forEach((output, index) => {
      const existingPanel = api.getPanel(output.id);
      if (!existingPanel && output.id) {
        const panelConfig = {
          ...output,
          ...calculatePanelPosition(index, currentPanels),
        };
        const newPanel = api.addPanel(panelConfig);
        currentPanels.push(newPanel);
      }
    });
  }, [pipelineState.nodes]);

  const onReady = (event: any) => {
    if (!event?.api) return;
    setApi(event.api);

    // Keep track of panels as we add them
    const currentPanels: any[] = [];

    initialOutputs.forEach((output, index) => {
      if (output.id) {
        const panelConfig = {
          ...output,
          ...calculatePanelPosition(index, currentPanels),
        };
        const newPanel = event.api.addPanel(panelConfig);
        currentPanels.push(newPanel);
      }
    });
  };

  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-grow tw-bg-transparent">
      <div className="tw-flex tw-h-0 tw-grow">
        <div className="tw-flex tw-h-full tw-overflow-hidden tw-grow">
          <DockviewReact
            components={dockviewComponents}
            defaultTabComponent={headerComponents.default}
            rightHeaderActionsComponent={RightControls}
            onReady={onReady}
            className={props.theme || "dockview-theme-abyss"}
          />
        </div>
      </div>
    </div>
  );
};
