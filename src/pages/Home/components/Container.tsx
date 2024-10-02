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
        "relative z-10 flex w-full flex-col items-center justify-normal gap-20 p-10  text-white md:p-20  lg:p-40",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HomeContainer;
