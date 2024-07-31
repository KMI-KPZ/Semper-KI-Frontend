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
        "flex h-screen w-full shrink-0 snap-center flex-col items-center justify-center p-5 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HomeContainer;
