import React from "react";

/** Define the structure of each control object */
type Control = {
  id: string;
  title: string;
  isAlert?: boolean; // If true => highlight as "Not compliant" (e.g., red)
  mandatory?: boolean; // If true => highlight as "Mandatory" (e.g., blue border)
  implemented?: boolean; // If true => we show it as implemented
};

interface ActiveControlsListProps {
  /** Array of controls to display */
  data: Control[];

  /** Called when user clicks a control; passes that control’s id */
  onControlClick: (id: string) => void;
}

/**
 * Renders a left-hand side list of active controls.
 */
export const ActiveControlsList: React.FC<ActiveControlsListProps> = ({
  data,
  onControlClick,
}) => {
  return (
    <div className=" text-white w-64 flex-col flex items-center">
      <h2 className="text-[18px] mb-4 font-[500] w-[153px]">Active Controls</h2>
      <div className="flex flex-col gap-4 font-[400] text-[16px]">
        {data.map((control) => {
          // Base style for all items
          let classes = `px-2 py-1 rounded-lg cursor-pointer transition-colors max-w-[153px] min-h-[36px] flex items-center`;

          // 1) If "isAlert" is true => red border + red text
          if (control.isAlert) {
            classes += " border !border-brandreddark bg-brandred";
          }
          // 2) If mandatory and implemented => highlight with blue border
          else if (control.mandatory && control.implemented) {
            classes += " border !border-brandblue ";
            // (the above is wrong) custom tailwind border looks like:
          }
          // 3) If not mandatory => show a neutral/gray style
          else if (!control.mandatory) {
            classes += " border !border-brandgray ";
          }
          // 4) Otherwise (e.g., mandatory but not implemented, or any other combos)
          else {
            classes += " border !border-red-600 text-red-200";
          }

          return (
            <div
              key={control.id}
              className={classes}
              onClick={() => onControlClick(control.id)}
            >
              {control.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
