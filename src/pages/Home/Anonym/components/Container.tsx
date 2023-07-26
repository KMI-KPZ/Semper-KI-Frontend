import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface HomeAnonymContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HomeAnonymContainer: React.FC<
  PropsWithChildren<HomeAnonymContainerProps>
> = (props) => {
  const { children, className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={twMerge(
        "flex w-full flex-col items-center justify-center gap-5 bg-white p-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HomeAnonymContainer;
