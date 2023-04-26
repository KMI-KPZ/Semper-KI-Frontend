import React, { ReactNode } from "react";

interface Props {
  count: number;
  children: ReactNode;
  position?: "small" | "medium" | "large";
}

const Badge: React.FC<Props> = (props) => {
  const { count, children, position = "medium" } = props;

  return (
    <div className="relative w-fit h-fit">
      <div
        className={`
      absolute  bg-orange text-white rounded-full h-6 w-fit p-0 px-1
      min-w-[1.5rem] flex items-center justify-center text-base font-bold
      ${
        position === "small"
          ? "-top-2 -right-2"
          : position === "medium"
          ? "-top-3 -right-3"
          : "-top-4 -right-4"
      }
      `}
      >
        {count}
      </div>
      {children}
    </div>
  );
};

export default Badge;
