import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  children: ReactNode;
  position?: "small" | "medium" | "large";
}

const IconBadge: React.FC<Props> = (props) => {
  const { icon, children, position = "medium" } = props;

  return (
    <div className="relative w-fit h-fit">
      <div
        className={`
      absolute   rounded-full h-6 w-fit p-0 px-1
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
        {icon}
      </div>
      {children}
    </div>
  );
};

export default IconBadge;
