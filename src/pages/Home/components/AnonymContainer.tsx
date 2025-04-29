import { gradientStyle } from "@component-library/Container/GrayContainer";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface HomeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const AnonymHomeContainer: React.FC<PropsWithChildren<HomeContainerProps>> = (
  props
) => {
  const { children, className, ...restProps } = props;
  return (
    <div
      {...restProps}
      style={gradientStyle}
      className={twMerge(
        "relative z-10 flex w-full flex-col items-center justify-normal gap-20 rounded-md p-10  text-white  ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnonymHomeContainer;
