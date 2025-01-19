// src/AgentPolicyPlane/PlaneConsoleView/index.tsx
import { DockviewDefaultTab, DockviewReact } from "dockview";
import * as React from "react";

import { useEffect, useState } from "react";

import firmsImage from "./assets/firms.png";
import firmsImage2 from "./assets/firms2.jpg";
import rainbowImage from "./assets/rainbow.png";
import rainbowImage2 from "./assets/rainbow2.jpg";

import a1 from "./assets/a1.mp3";
import a2 from "./assets/a2.mp3";
import a3 from "./assets/a3.mp3";
import c1 from "./assets/c1.png";
import c2 from "./assets/c2.png";
import c3 from "./assets/c3.png";
import c4 from "./assets/c4.png";

// images must be imported as : URL, e.g.  new URL('./assets/image.png', import.meta.url).href;
// const firmsImage2 = new URL("./assets/firms2.jpg", import.meta.url).href;
// const rainbowImage2 = new URL("./assets/rainbow2.jpg", import.meta.url).href;

// const a1 = new URL("./assets/a1.mp3", import.meta.url).href;
// const a2 = new URL("./assets/a2.mp3", import.meta.url).href;
// const a3 = new URL("./assets/a3.mp3", import.meta.url).href;
// const c1 = new URL("./assets/c1.png", import.meta.url).href;
// const c2 = new URL("./assets/c2.png", import.meta.url).href;
// const c3 = new URL("./assets/c3.png", import.meta.url).href;
// const c4 = new URL("./assets/c4.png", import.meta.url).href;

import {
  EXAMPLE_MARKDOWN,
  EXAMPLE_MARKDOWN_2,
  EXAMPLE_MARKDOWN_3,
  EXAMPLE_MARKDOWN_4,
} from "./dock/runDockLayout";
// import { LeftControls, PrefixHeaderControls, RightControls } from "./controls";

import { RightControls } from "./dock/RightControls";

import Markdown from "react-markdown";

// import MapApp from "./kepler/app";

const AudioPlayerStack = ({ audioFiles }: any) => {
  return (
    <div className="flex flex-col space-y-4">
      {audioFiles.slice(0, 3).map((file: any, index: number) => (
        <div key={index} className="w-full max-w-md">
          <audio controls className="w-full" src={file}>
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

const ImageGrid = ({ images }: any) => {
  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 p-4">
      {images.slice(0, 4).map((image: any, index: number) => (
        <div
          key={index}
          className="relative overflow-hidden"
          style={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            color: "black",
            position: "relative",
            // padding: "1em",
          }}
        >
          <img
            src={image}
            alt={`Grid image ${index + 1}`}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

const components = {
  default: (props: any) => {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          color: "black",
          position: "relative",

          // border: '5px dashed purple',
        }}
      >
        {/* <Table data={metadata} /> */}
        <div className="tw-h-full tw-w-full tw-rounded tw-bg-gray-500/50">
          {props.params && props.params.mike
            ? props.params.mike
            : props.api.title}
        </div>
      </div>
    );
  },
  iframe: () => {
    return (
      <iframe
        style={{
          width: "100%",
          height: "100%",
        }}
        src="https://dockview.dev"
      />
    );
  },
  markdown: (props: any) => {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          color: "black",
          position: "relative",

          // border: '5px dashed purple',
        }}
      >
        {/* <Table data={metadata} /> */}

        <Markdown className="tw-prose-xs tw-h-full tw-w-full tw-overflow-auto tw-rounded tw-bg-transparent tw-p-4 tw-text-white">
          {props.params && props.params.markdown
            ? props.params.markdown
            : "# no markdown"}
        </Markdown>
      </div>
    );
  },
  map: (props: any) => {
    return <div>No</div>;
  },
  image: (props: any) => {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          color: "black",
          position: "relative",
          padding: "1em",
          // border: '5px dashed purple',
        }}
      >
        {/* <Table data={metadata} /> */}
        <img
          src={props.params.image}
          alt="firms"
          className="tw-h-full tw-w-full tw-object-contain"
        />
      </div>
    );
  },
  audio: (props: any) => {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          color: "black",
          position: "relative",
          padding: "1em",
          // border: '5px dashed purple',
        }}
      >
        <AudioPlayerStack audioFiles={props.params.audioFiles} />
      </div>
    );
  },
  imageGrid: (props: any) => {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          color: "black",
          position: "relative",
          padding: "1em",
          // border: '5px dashed purple',
        }}
      >
        <ImageGrid images={props.params.images} />
      </div>
    );
  },
};

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
          component: "markdown",
          renderer: "always",
          title: `Social Media Analyst - Curation`,
          params: {
            markdown: EXAMPLE_MARKDOWN,
          },
        };
        break;

      case 1:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: `Humanitarian Analyst - Report`,
          params: {
            markdown: EXAMPLE_MARKDOWN_2,
          },
        };
        break;
      case 2:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: `OSINT Manager - AI SOW`,
          params: {
            markdown: EXAMPLE_MARKDOWN_3,
          },
        };
        break;
      case 3:
        panelConfig = {
          id: newPanelId,
          component: "image",
          renderer: "always",
          title: `FIRMS Analyst - Map`,
          params: {
            image: firmsImage2,
          },
        };
        break;
      case 4:
        panelConfig = {
          id: newPanelId,
          component: "image",
          renderer: "always",
          title: `Satellite Analyst - Image`,
          params: {
            image: rainbowImage2,
          },
        };
        break;
      case 5:
        panelConfig = {
          id: newPanelId,
          component: "audio",
          renderer: "always",
          title: `Comms Analyst - Audio`,
          params: {
            audioFiles: [a1, a2, a3],
          },
        };
        break;
      case 6:
        panelConfig = {
          id: newPanelId,
          component: "imageGrid",
          renderer: "always",
          title: `AdTech Analyst - Map Grid`,
          params: {
            images: [c1, c2, c3, c4],
          },
        };
        break;
      case 7:
        panelConfig = {
          id: newPanelId,
          component: "markdown",
          renderer: "always",
          title: `Evidence Reporting Analyst - Human Handoff`,
          params: {
            markdown: EXAMPLE_MARKDOWN_4,
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
            components={components}
            defaultTabComponent={headerComponents.default}
            rightHeaderActionsComponent={RightControls}
            // leftHeaderActionsComponent={LeftControls}
            // prefixHeaderActionsComponent={PrefixHeaderControls}
            onReady={onReady}
            className={props.theme || "dockview-theme-abyss"}
          />
        </div>
      </div>
    </div>
  );
};
