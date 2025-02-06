import React, { PropsWithChildren } from "react";
import { Container, ContainerProps } from "@component-library/index";
import { twMerge } from "tailwind-merge";

type GrayContainerProps = {
  headerChildren?: React.ReactNode;
};

const GrayContainer: React.FC<
  PropsWithChildren<GrayContainerProps & ContainerProps>
> = (props) => {
  const { className: _className = "", headerChildren, children } = props;

  const className =
    "gap-0 rounded-md bg-gradient-to-br from-white/50 to-ultramarinblau/20 p-0";

  if (headerChildren !== undefined)
    return (
      <Container
        {...props}
        className={twMerge(className, _className)}
        direction="col"
      >
        {headerChildren}
        <Container {...props} className={twMerge("p-5", _className)}>
          {children}
        </Container>
      </Container>
    );

  return (
    <Container
      {...props}
      className={twMerge(className, "p-5", _className)}
      direction="col"
    >
      {children}
    </Container>
  );
};

export default GrayContainer;
