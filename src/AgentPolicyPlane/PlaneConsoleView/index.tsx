// src/AgentPolicyPlane/PlaneConsoleView/index.tsx
import { DockviewDefaultTab, DockviewReact } from "dockview";
import * as React from "react";
import { useEffect, useState } from "react";

import { usePipeline } from "../context/PipelineContext";

import {
  OUTPUT_1,
  OUTPUT_2,
  OUTPUT_3,
  OUTPUT_4,
  OUTPUT_5,
  OUTPUT_6,
  OUTPUT_7,
  OUTPUT_8,
} from "../context/simulation/simulated-outputs";

import { dockviewComponents } from "./dockview/DockComponents";
import { RightControls } from "./dockview/RightControls";
import { OutputTemplate } from "../context/types.outputs";

const headerComponents = {
  default: (props: any) => {
    const onContextMenu = (event: any) => {
      event.preventDefault();
      alert("context menu");
    };
    return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />;
  },
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
    const allOutputs = Object.values(pipelineState.nodes).reduce(
      (acc, node) => acc.concat(node.outputs),
      [] as OutputTemplate[]
    );
    allOutputs.forEach((output) => {
      const existingPanel = api?.getPanel(output.id);
      if (!existingPanel) {
        api?.addPanel(output);
      }
    });
  }, [pipelineState.nodes]);

  const addNewPanel = () => {
    if (!api) return;
    if (panelCount > 7) return;

    const newPanelId = `panel_${panelCount + 1}`;
    const column = panelCount % 4;
    const row = Math.floor(panelCount / 4);

    let panelConfig: any;
    switch (panelCount) {
      case 0:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: "Video Feed Analysis",
          params: {
            content: OUTPUT_1, // NVIDIA mixed-modal LLM analysis of footage
          },
        };
        break;

      case 1:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: "Partner Reports (EMS/Fire)",
          params: {
            content: OUTPUT_2, // Structured report from emergency services
          },
        };
        break;

      case 2:
        panelConfig = {
          id: newPanelId,
          component: "jsonChart",
          renderer: "always",
          title: "Emergency Call Analysis",
          params: {
            content: OUTPUT_3, // JSON data for call frequency visualization
          },
        };
        break;

      case 3:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: "Social Media Distress Signals",
          params: {
            content: OUTPUT_4, // Filtered and verified social media reports
          },
        };
        break;

      case 4:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: "Situation Summary",
          params: {
            content: OUTPUT_5, // Comprehensive event summary
          },
        };
        break;

      case 5:
        panelConfig = {
          id: newPanelId,
          component: "riskAssesment",
          renderer: "always",
          title: "Risk Assessment",
          params: {
            content: OUTPUT_6, // Nemo guardrail analysis results
          },
        };
        break;

      case 6:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: "Response Plan",
          params: {
            content: OUTPUT_7, // Final tactical response plan
          },
        };
        break;

      case 7:
        panelConfig = {
          id: newPanelId,
          component: "toolNotify",
          renderer: "always",
          title: "First Responder Notifications",
          params: {
            content: OUTPUT_8, // Twilio/Apptek notification status
          },
        };
        break;
    }

    if (panelCount > 0 && panelConfig) {
      if (row === 0) {
        // First row, position to the right of the previous panel
        panelConfig.position = {
          referencePanel: allPanels[panelCount - 1].id,
          direction: "right",
        };
      } else {
        // Other rows, position under the corresponding panel in the previous row
        const referencePanelIndex = (row - 1) * 4 + column;
        panelConfig.position = {
          referencePanel: allPanels[referencePanelIndex].id,
          direction: "below",
        };
      }
    }

    const newPanel = api.addPanel(panelConfig);

    setAllPanels((prevPanels: any) => [...prevPanels, newPanel]);
    setPanelCount((prevCount) => prevCount + 1);
  };

  // //   simulator
  // useEffect(() => {
  //   const randomInterval = Math.floor(Math.random() * 18) + 6;
  //   const interval = setInterval(() => {
  //     addNewPanel();
  //   }, randomInterval * 100); // MARK: simulator
  //   return () => clearInterval(interval);
  // }, [api, panelCount, allPanels]);

  const onReady = (event: any) => {
    setApi(event.api);
    // LOOK HERE:
    console.log("Dockview ready"); // chrome says: AlertLines.tsx:126 Dockview ready
    console.log(initialOutputs); // chrome says:  AlertLines.tsx:127 (3) [{…}, {…}, {…}]

    // add any initial panels here
    initialOutputs.forEach((output, index) => {
      event.api.addPanel(output);
    });
    // event.api.onDidAddPanel((event: any) => {});
    // event.api.onDidActivePanelChange((event: any) => {});
    // event.api.onDidRemovePanel((event: any) => {});
    // event.api.onDidMovePanel((event: any) => {});
    // event.api.onDidAddGroup((event: any) => {});
    // event.api.onDidRemoveGroup((event: any) => {});
    // event.api.onDidActiveGroupChange((event: any) => {});
    // defaultConfig(event.api);
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
