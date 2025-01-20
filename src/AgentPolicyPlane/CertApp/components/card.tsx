// src/AgentPolicyPlane/CertApp/components/card.tsx
// src/AgentPolicyPlane/CertApp/components/card.tsx
// src/AgentPolicyPlane/CertApp/components/card.tsx
// src/AgentPolicyPlane/CertApp/components/card.tsx
import React from "react";

interface Props {
  title: string;
  content: React.ReactNode;
  IconRR: React.ReactNode;
}

const Card = ({ title, content, IconRR }: Props) => {
  return (
    <article className="tw-flex tw-flex-col tw-p-2 tw-text-white tw-divide-y tw-rounded-lg tw-gap-y-1 tw-divide-sidebar/100 tw-bg-sidebar tw-backdrop-blur-sm">
      <div className="tw-flex tw-align-center tw-gap-x-1">
        {IconRR}
        <h2 className="tw-text-base">{title}</h2>
      </div>
      <div className="tw-pt-2">{content}</div>
    </article>
  );
};

export default Card;
