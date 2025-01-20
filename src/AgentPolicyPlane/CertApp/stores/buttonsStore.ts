// src/AgentPolicyPlane/CertApp/stores/buttonsStore.ts
// src/AgentPolicyPlane/CertApp/stores/buttonsStore.ts
// src/AgentPolicyPlane/CertApp/stores/buttonsStore.ts
// src/AgentPolicyPlane/CertApp/stores/buttonsStore.ts
import { create } from "zustand";
import { combine } from "zustand/middleware";

enum Widths {
  THIN = 1.5,
  NORMAL = 2,
  THICK = 8,
}

type Prop = {
  title: string;
  color: string;
  width: number;
  count: number;
  hovered: boolean;
  animation: gsap.core.Timeline | null;
};

const props: Prop[] = [
  {
    title: "Garda Control Protocol",
    color: "#5db0c8",
    width: Widths.NORMAL,
    count: 2,
    hovered: false,
    animation: null,
  },
  {
    title: "Privacy Protocol",
    color: "#3c3d3d",
    width: Widths.THIN,
    count: 2,
    hovered: false,
    animation: null,
  },
  {
    title: "Sourcing Protocol",
    color: "#a35456",
    width: Widths.THICK,
    count: 1,
    hovered: false,
    animation: null,
  },
  {
    title: "Bias Detection in Emergency Prioritization",
    color: "#ffffff",
    width: Widths.NORMAL,
    count: 1,
    hovered: false,
    animation: null,
  },
  {
    title: "Social Media Input Verification",
    color: "#3c3d3d",
    width: Widths.THIN,
    count: 2,
    hovered: false,
    animation: null,
  },
  {
    title: "Decision Logging for Emergency Response",
    color: "#ffffff",
    width: Widths.NORMAL,
    count: 2,
    hovered: false,
    animation: null,
  },
  {
    title: "Health and Safety Risk Analysis",
    color: "#3c3d3d",
    width: Widths.THIN,
    count: 2,
    hovered: false,
    animation: null,
  },
  {
    title: "Feedback Loop Detection",
    color: "#3c3d3d",
    width: Widths.THICK,
    count: 1,
    hovered: false,
    animation: null,
  },
  {
    title: "Post-Incident Analysis System",
    color: "#ffffff",
    width: Widths.NORMAL,
    count: 2,
    hovered: false,
    animation: null,
  },
];

const state = {
  buttons: [] as HTMLDivElement[],
  props,
};

const useButtonsStore = create(
  combine(state, (set) => ({
    toggleHover: (index: number) => {
      set((state) => {
        const newProps = [...state.props];
        newProps[index].hovered = !newProps[index].hovered;
        return { props: newProps };
      });
    },

    setHover: (index: number, hover: boolean) => {
      set((state) => {
        const newProps = [...state.props];
        newProps[index].hovered = hover;
        return { props: newProps };
      });
    },

    setAnimation: (index: number, animation: gsap.core.Timeline) => {
      set((state) => {
        if (state.props[index].animation) return state;

        const newProps = [...state.props];
        newProps[index].animation = animation;
        return { props: newProps };
      });
    },

    setButton: (index: number, element: HTMLDivElement) => {
      set((state) => {
        const newButtons = [...state.buttons];
        newButtons[index] = element;
        return { buttons: newButtons };
      });
    },
  }))
);

export { useButtonsStore };
