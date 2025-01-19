// src/AgentPolicyPlane/PlaneConsoleView/index.tsx
import { DockviewDefaultTab, DockviewReact } from "dockview";
import * as React from "react";
import { useEffect, useState } from "react";

import {
  OUTPUT_1,
  OUTPUT_2,
  OUTPUT_3,
  OUTPUT_4,
  OUTPUT_5,
  OUTPUT_6,
  OUTPUT_7,
  OUTPUT_8,
} from "./dockview/simulated-outputs";

import { dockviewComponents } from "./dockview/DockComponents";

import { RightControls } from "./dockview/RightControls";

const headerComponents = {
  default: (props: any) => {
    const onContextMenu = (event: any) => {
      event.preventDefault();
      alert("context menu");
    };
    return <DockviewDefaultTab onContextMenu={onContextMenu} {...props} />;
  },
};

const colors = [
  "rgba(255,0,0,0.2)",
  "rgba(0,255,0,0.2)",
  "rgba(0,0,255,0.2)",
  "rgba(255,255,0,0.2)",
  "rgba(0,255,255,0.2)",
  "rgba(255,0,255,0.2)",
];
let count = 0;

export const RunDock = (props: any) => {
  const [logLines, setLogLines] = React.useState<any>([]);
  const [panels, setPanels] = React.useState<any>([]);
  const [groups, setGroups] = React.useState<any>([]);
  const [api, setApi] = React.useState<any>();
  const [activePanel, setActivePanel] = React.useState();
  const [activeGroup, setActiveGroup] = React.useState();
  const [pending, setPending] = React.useState<any>([]);
  const [panelCount, setPanelCount] = useState(0);
  const [allPanels, setAllPanels] = useState<any>([]);

  const addLogLine = (message: string) => {
    setPending((line: any) => [
      { text: message, timestamp: new Date() },
      ...line,
    ]);
  };

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
          component: "video",
          renderer: "always",
          title: "Video Feed Analysis",
          params: {
            videoAnalysis: OUTPUT_1, // NVIDIA mixed-modal LLM analysis of footage
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
            markdown: OUTPUT_2, // Structured report from emergency services
          },
        };
        break;

      case 2:
        panelConfig = {
          id: newPanelId,
          component: "chart",
          renderer: "always",
          title: "Emergency Call Analysis",
          params: {
            chartData: OUTPUT_3, // JSON data for call frequency visualization
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
            markdown: OUTPUT_4, // Filtered and verified social media reports
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
            markdown: OUTPUT_5, // Comprehensive event summary
          },
        };
        break;

      case 5:
        panelConfig = {
          id: newPanelId,
          component: "alert",
          renderer: "always",
          title: "Risk Assessment",
          params: {
            assessment: OUTPUT_6, // Nemo guardrail analysis results
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
            markdown: OUTPUT_7, // Final tactical response plan
          },
        };
        break;

      case 7:
        panelConfig = {
          id: newPanelId,
          component: "notification",
          renderer: "always",
          title: "First Responder Notifications",
          params: {
            notifications: OUTPUT_8, // Twilio/Apptek notification status
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

  useEffect(() => {
    // randomInterval: 8 to 30 seconds
    // const randomInterval = Math.floor(Math.random() * 22) + 8;
    // random interval: 6 to 24 seconds
    const randomInterval = Math.floor(Math.random() * 18) + 6;

    const interval = setInterval(() => {
      addNewPanel();
    }, randomInterval * 100); // MARK: simulator
    return () => clearInterval(interval);
  }, [api, panelCount, allPanels]);

  React.useLayoutEffect(() => {
    if (pending.length === 0) {
      return;
    }
    const color = colors[count++ % colors.length];
    setLogLines((lines: any) => [
      ...pending.map((_: any) => ({ ..._, backgroundColor: color })),
      ...lines,
    ]);
    setPending([]);
  }, [pending]);

  const onReady = (event: any) => {
    setApi(event.api);

    event.api.onDidAddPanel((event: any) => {
      setPanels((_: any) => [..._, event.id]);
      addLogLine(`Panel Added ${event.id}`);
    });
    event.api.onDidActivePanelChange((event: any) => {
      setActivePanel(event?.id);
      addLogLine(`Panel Activated ${event?.id}`);
    });
    event.api.onDidRemovePanel((event: any) => {
      setPanels((_: any) => {
        const next = [..._];
        next.splice(
          next.findIndex((x) => x === event.id),
          1
        );

        return next;
      });
      addLogLine(`Panel Removed ${event.id}`);
    });

    event.api.onDidAddGroup((event: any) => {
      setGroups((_: any) => [..._, event.id]);
      addLogLine(`Group Added ${event.id}`);
    });

    event.api.onDidMovePanel((event: any) => {
      addLogLine(`Panel Moved ${event.panel.id}`);
    });

    event.api.onDidRemoveGroup((event: any) => {
      setGroups((_: any) => {
        const next = [..._];
        next.splice(
          next.findIndex((x) => x === event.id),
          1
        );

        return next;
      });
      addLogLine(`Group Removed ${event.id}`);
    });

    event.api.onDidActiveGroupChange((event: any) => {
      setActiveGroup(event?.id);
      addLogLine(`Group Activated ${event?.id}`);
    });

    const state = localStorage.getItem("dv-demo-state");
    if (state) {
      try {
        event.api.fromJSON(JSON.parse(state));
        return;
      } catch {
        localStorage.removeItem("dv-demo-state");
      }
      return;
    }

    // defaultConfig(event.api);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          height: 0,
          display: "flex",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            overflow: "hidden",
            height: "100%",
            display: "flex",
          }}
        >
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
