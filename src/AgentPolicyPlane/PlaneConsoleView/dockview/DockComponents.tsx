// src/AgentPolicyPlane/PlaneConsoleView/dockview/DockComponents.tsx
import React from "react";
import Markdown from "react-markdown";
// import MapApp from "./kepler/app";

const commonTWStyles =
  "tw-h-full tw-w-full tw-overflow-auto tw-text-black relative";

const AudioPlayerStack = ({ audioFiles }: any) => {
  return (
    <div className="tw-flex tw-flex-col tw-space-y-4">
      {audioFiles.slice(0, 3).map((file: any, index: number) => (
        <div key={index} className="tw-w-full tw-max-w-md">
          <audio controls className="tw-w-full" src={file}>
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

export const dockviewComponents = {
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
  alert: (props: any) => {
    const assessment = props.params?.assessment;
    if (!assessment)
      return <div className="tw-text-white">No assessment data</div>;

    return (
      <div className={commonTWStyles}>
        <div className="tw-flex tw-flex-col tw-gap-4">
          {/* Risk Level Banner */}
          <div className={`tw-bg-brandreddark/20 tw-rounded-lg tw-p-4`}>
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <h3 className="tw-text-white tw-text-lg tw-font-medium">
                Risk Level: {assessment.riskLevel}
              </h3>
              {assessment.requiresOverride && (
                <span className="tw-bg-brandreddark tw-px-2 tw-py-1 tw-rounded tw-text-sm">
                  Requires Override
                </span>
              )}
            </div>

            {/* Risk Factors */}
            <div className="tw-space-y-3">
              {assessment.factors.map((factor: any, index: number) => (
                <div
                  key={index}
                  className="tw-bg-gray-800/50 tw-rounded tw-p-3"
                >
                  <div className="tw-flex tw-justify-between tw-mb-1">
                    <span className="tw-text-white/80">{factor.category}</span>
                    <span className="tw-text-white">{factor.level}</span>
                  </div>
                  <p className="tw-text-white/60 tw-text-sm">
                    {factor.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="tw-mt-4">
              <h4 className="tw-text-white tw-text-sm tw-font-medium tw-mb-2">
                Recommendations
              </h4>
              <ul className="tw-space-y-1">
                {assessment.recommendations.map(
                  (rec: string, index: number) => (
                    <li key={index} className="tw-text-white/80 tw-text-sm">
                      • {rec}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  audio: (props: any) => {
    return (
      <div className={commonTWStyles}>
        <AudioPlayerStack audioFiles={props.params.audioFiles} />
      </div>
    );
  },
  chart: (props: any) => {
    return (
      <div className={commonTWStyles}>
        {/* Assuming we're using a charting library like recharts */}
        {props.params?.chartData ? (
          <div className="tw-bg-gray-800/50 tw-rounded-lg tw-p-4 tw-h-full">
            {/* Chart component would go here */}
            <div className="tw-text-white">
              {JSON.stringify(props.params.chartData, null, 2)}
            </div>
          </div>
        ) : (
          <div className="tw-text-white">No chart data available</div>
        )}
      </div>
    );
  },
  image: (props: any) => {
    return (
      <div className={commonTWStyles}>
        <img
          src={props.params.image}
          alt="firms"
          className="tw-h-full tw-w-full tw-object-contain"
        />
      </div>
    );
  },
  imageGrid: (props: any) => {
    return (
      <div className={commonTWStyles}>
        <ImageGrid images={props.params.images} />
      </div>
    );
  },
  map: (props: any) => {
    return <div>TODO: Kepler.gl</div>;
  },
  markdown: (props: any) => {
    return (
      <div className={commonTWStyles}>
        <Markdown className="tw-prose-xs tw-h-full tw-w-full tw-overflow-auto tw-rounded tw-bg-transparent tw-p-4 tw-text-white">
          {props.params && props.params.markdown
            ? props.params.markdown
            : "# no markdown"}
        </Markdown>
      </div>
    );
  },
  notification: (props: any) => {
    const notifications = props.params?.notifications;
    if (!notifications)
      return <div className="tw-text-white">No notifications</div>;

    return (
      <div className={commonTWStyles}>
        <div className="tw-flex tw-flex-col tw-gap-2">
          {notifications.map((notification: any, index: number) => (
            <div
              key={index}
              className="tw-bg-gray-800/50 tw-rounded-lg tw-p-4 tw-border-l-4 tw-border-l-blue-500"
            >
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                <span className="tw-text-white/60 tw-text-xs">
                  {notification.timestamp}
                </span>
                <span
                  className={`tw-px-2 tw-py-1 tw-rounded tw-text-xs tw-bg-green-500/20 tw-text-green-300`}
                >
                  {notification.status}
                </span>
              </div>

              <div className="tw-flex tw-flex-col tw-gap-1">
                <span className="tw-text-white tw-font-medium">
                  To: {notification.recipient}
                </span>
                <p className="tw-text-white/80">{notification.message}</p>
                <p className="tw-text-white/60 tw-text-sm tw-italic">
                  Response: {notification.response}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  video: (props: any) => {
    return (
      <div className={commonTWStyles}>
        <div className="tw-flex tw-flex-col tw-gap-4">
          {/* Video Analysis Results Display */}
          <div className="tw-bg-gray-800/50 tw-rounded-lg tw-p-4">
            <h3 className="tw-text-white tw-text-sm tw-font-medium tw-mb-2">
              Analysis Results
            </h3>
            <Markdown className="tw-prose-xs tw-text-white">
              {props.params?.videoAnalysis || "No analysis available"}
            </Markdown>
          </div>
          {/* Could add actual video player if needed */}
        </div>
      </div>
    );
  },
};
