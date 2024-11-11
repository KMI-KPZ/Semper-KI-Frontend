import React from "react";
interface Props {}

export const Background: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div
      className="fixed left-0 top-0 -z-10
     h-full min-h-[200px] w-full
     bg-nru
     "
    ></div>
  );
};
