// src/AgentPolicyPlane/PlaneConsoleView/dock/RightControls.tsx
import * as React from "react";
import {
  Download,
  PictureInPicture2,
  PictureInPicture,
  Expand,
} from "lucide-react";

export const RightControls = (props: any) => {
  const [isMaximized, setIsMaximized] = React.useState(
    props.containerApi.hasMaximizedGroup()
  );

  const [isPopout, setIsPopout] = React.useState(
    props.api.location.type === "popout"
  );

  React.useEffect(() => {
    const disposable = props.containerApi.onDidMaximizedGroupChange(() => {
      setIsMaximized(props.containerApi.hasMaximizedGroup());
    });

    const disposable2 = props.api.onDidLocationChange(() => {
      setIsPopout(props.api.location.type === "popout");
    });

    return () => {
      disposable.dispose();
      disposable2.dispose();
    };
  }, [props.containerApi]);

  const onClick = () => {
    if (props.containerApi.hasMaximizedGroup()) {
      props.containerApi.exitMaximizedGroup();
    } else {
      props.activePanel?.api.maximize();
    }
  };

  const onClick2 = () => {
    if (props.api.location.type !== "popout") {
      props.containerApi.addPopoutGroup(props.group);
    } else {
      props.api.moveTo({ position: "right" });
    }
  };

  return (
    <div
      className="group-control"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0px 8px",
        height: "100%",
        color: "var(--dv-activegroup-visiblepanel-tab-color)",
      }}
    >
      {/* <Download className="tw-mr-2 tw-h-4 tw-w-4" /> */}
      <Expand className="tw-mr-2 tw-h-4 tw-w-4" onClick={onClick} />
      {/* {isPopout ? (
        <PictureInPicture
          className="tw-mr-2 tw-h-4 tw-w-4"
          onClick={onClick2}
        />
      ) : (
        <PictureInPicture2
          className="tw-mr-2 tw-h-4 tw-w-4"
          onClick={onClick2}
        />
      )} */}

      {/* {!isPopout && (
				<Icon
					title={isMaximized ? "Minimize View" : "Maximize View"}
					icon={isMaximized ? "collapse_content" : "expand_content"}
					onClick={onClick}
				/>
			)} */}
    </div>
  );
};
