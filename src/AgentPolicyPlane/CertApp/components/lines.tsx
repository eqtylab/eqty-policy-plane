// src/AgentPolicyPlane/CertApp/components/lines.tsx
import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useButtonsStore } from "../stores/buttonsStore";
import { animateLine } from "../utils/anims";
import gsap from "gsap";

const Lines = () => {
  const buttons = useButtonsStore((state) => state.buttons);
  const props = useButtonsStore((state) => state.props);
  const [lines, setPaths] = useState<ReactNode[]>([]);
  const [arrows, setArrows] = useState<ReactNode[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttons[0]) return;
    const div = ref.current?.getBoundingClientRect();
    const divH = div?.height || 1;
    const divW = div?.width || 1;

    const newLines: ReactNode[] = [];
    const newArrows: ReactNode[] = [];

    buttons.forEach((button, i) => {
      const rect = button.getBoundingClientRect();
      for (let n = 0; n < props[i].count; n++) {
        const y = rect.top + rect.height / 2 - n * 18;
        const end = divH / 1.5 - (buttons.length - i) * 20 - n * 18;

        // d='M0 1 h50 C(55 1) (63 3) (69 9) L228 154 C234 160 242 163 249 163 H337'
        // d='M0 1 h50 c(5 0) (13 2) (19 8) l159 145 c6 6 14 9 21 9 h88'

        const d = `M0 ${y} H100  L${divW * 0.7} ${end}  H${divW}`;
        const element: ReactNode = (
          <path
            d={d}
            stroke={props[i].color}
            strokeWidth={props[i].width * 0.8}
            className={`line${i + 1} line`}
          />
        );

        newLines.push(element);

        const arrowD = `M0 ${y - 10} v20 L15 ${y} L0 ${y - 10} Z`;
        const arrow = <path d={arrowD} fill={props[i].color} />;
        newArrows.push(arrow);
      }
    });

    setPaths(newLines);
    setArrows(newArrows);
  }, [buttons]);

  useLayoutEffect(() => {
    if (!lines.length) return;

    const tl = gsap.timeline({
      delay: 2,
      onComplete: () => {
        tl.kill();
      },
    });
    animateLine(".line", tl);
  }, [lines.length]);

  const rect = ref.current?.getBoundingClientRect();
  const w = rect?.width || 0; // 337 -> original
  const h = rect?.height || 0; // 164 -> original
  const first = buttons[0]?.getBoundingClientRect() || 0;
  const last = buttons[buttons.length - 1]?.getBoundingClientRect() || 0;

  return (
    <div className="tw-w-full tw-h-screen " ref={ref}>
      <svg
        className="tw-w-full tw-h-full "
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="lines-bg">
          <path
            d={`M100 ${first.top + first.height / 2} L100 ${
              last.top + last.height / 2
            } V${last.top + last.height / 2} L${w * 0.7} ${h / 1.5} V${
              h / 1.5 - buttons.length * 20
            } Z`}
            fill="#242625"
            fillOpacity="0.59"
          />
        </g>

        {[...lines]}
        {[...arrows]}
      </svg>
    </div>
  );
};

export default Lines;
