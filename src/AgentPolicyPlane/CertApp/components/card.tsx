import React from "react";

interface Props {
  title: string;
  content: React.ReactNode;
  IconRR: React.ReactNode;
}

const Card = ({ title, content, IconRR }: Props) => {
  return (
    <article className="flex flex-col p-4 text-white divide-y rounded-lg gap-y-3 divide-sidebar/100 bg-sidebar backdrop-blur-sm">
      <div className="flex align-center gap-x-3">
        {IconRR}
        <h2 className="text-lg">{title}</h2>
      </div>
      <div className="pt-2">{content}</div>
    </article>
  );
};

export default Card;
