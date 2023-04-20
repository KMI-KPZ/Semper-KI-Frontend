import React, { ReactNode } from "react";

interface Props {
  count: number;
  icon: ReactNode;
}

const Badge: React.FC<Props> = (props) => {
  const { count, icon } = props;

  return (
    <div className="relativ w-fit h-fit">
      {icon}
      <div className="absolut top-0 right-0">{count}</div>
    </div>
  );
};

export default Badge;
