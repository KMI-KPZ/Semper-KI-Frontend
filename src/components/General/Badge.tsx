import React, { ReactNode } from "react";

interface Props {
  count: number;
  children: ReactNode;
}

const Badge: React.FC<Props> = (props) => {
  const { count, children } = props;

  return (
    <div className="relative w-fit h-fit">
      <div className="absolute -top-2 -right-3 bg-orange text-white rounded-full p-0 h-6 w-fit min-w-[1.5rem] flex items-center justify-center text-base font-bold">
        {count}
      </div>
      {children}
    </div>
  );
};

export default Badge;
