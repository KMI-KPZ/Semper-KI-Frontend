import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ContentBoxProps {
  className?: string;
}

export const ContentBox: React.FC<PropsWithChildren<ContentBoxProps>> = (
  props
) => {
  const { children, className } = props;

  return (
    <div
      className={twMerge(
        "flex h-full w-full max-w-7xl flex-col items-center justify-center gap-5 py-5 md:flex-row md:px-5",
        className
      )}
    >
      {children}
    </div>
  );
};
