import React, { ReactNode } from "react";

interface BadgeProps {
  count: number;
  children: ReactNode;
  position?: "small" | "medium" | "large";
}

export const Badge: React.FC<BadgeProps> = (props) => {
  const { count, children, position = "medium" } = props;

  return (
    <div className="relative h-fit w-fit">
      <div
        className={`
      absolute flex h-6 w-fit min-w-[1.5rem] items-center
      justify-center rounded-full bg-orange p-0 px-1 text-base font-bold text-white
      ${
        position === "small"
          ? " -right-2 -top-2 "
          : position === "medium"
          ? " -right-3 -top-3 "
          : " -right-4 -top-4 "
      }
      `}
      >
        {count}
      </div>
      {children}
    </div>
  );
};

interface IconBadgeProps {
  icon: ReactNode;
  children: ReactNode;
  position?: "small" | "medium" | "large";
}

export const IconBadge: React.FC<IconBadgeProps> = (props) => {
  const { icon, children, position = "medium" } = props;

  return (
    <div className="relative h-fit w-fit">
      <div
        className={`
      absolute flex h-6 w-fit
      min-w-[1.5rem] items-center justify-center rounded-full p-0 px-1 text-base font-bold
      ${
        position === "small"
          ? "-right-2 -top-2"
          : position === "medium"
          ? "-right-3 -top-3"
          : "-right-4 -top-4"
      }
      `}
      >
        {icon}
      </div>
      {children}
    </div>
  );
};
