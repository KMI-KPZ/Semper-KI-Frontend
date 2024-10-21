import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface HomeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HomeContainer: React.FC<PropsWithChildren<HomeContainerProps>> = (
  props
) => {
  const { children, className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={twMerge(
        "relative z-10 flex w-full flex-col items-center justify-normal gap-5  bg-white p-5  text-white ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HomeContainer;
