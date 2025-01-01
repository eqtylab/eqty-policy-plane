import React from "react";
import { useGSAP } from "@gsap/react";
import { animateLine, pulsateLine } from "../utils/anims";
import PolicyButton from "./policyButton";
import gsap from "gsap";
import { useState } from "react";
import { useButtonsStore } from "../stores/buttonsStore";

type Timeline = gsap.core.Timeline | null | undefined;

const Policies = () => {
  const policies = useButtonsStore((state) => state.props);
  const setButton = useButtonsStore((state) => state.setButton);

  const { contextSafe } = useGSAP({ dependencies: [] });
  const [anims, setAnims] = useState(
    new Array<Timeline>(policies.length).fill(null)
  );

  const handleMouseover = contextSafe((i: number) => {
    const tl = gsap.timeline({ paused: true, repeatRefresh: true });
    const selector = `.line${i + 1}`;

    let anim: Timeline = null;
    if (anims[i]) anim = anims[i];
    else {
      anim = i === 2 ? pulsateLine(selector, tl) : animateLine(selector, tl);
      setAnims((prev) => {
        const newAnims = [...prev];
        newAnims[i] = anim;
        return newAnims;
      });
    }

    if (!anim) return;

    anim.restart();
  });

  const handleMouseout = contextSafe((i: number) => {
    if (i === 2 && anims[i]) anims[i].revert();
  });

  const renderPolicies = () =>
    policies.map((policy, index) => (
      <PolicyButton
        // @ts-expect-error
        ref={(button) => button && setButton(index, button)}
        key={index}
        i={index}
        title={policy.title}
        onMouseOver={() => handleMouseover(index)}
        onMouseOut={() => handleMouseout(index)}
      />
    ));

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Active Controls</h2>
      <div className="flex flex-col gap-y-6">{renderPolicies()}</div>
    </div>
  );
};

export default Policies;
