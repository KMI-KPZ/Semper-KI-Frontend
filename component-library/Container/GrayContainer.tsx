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

  const gradientStyle = {
    background: `linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.4) 0%,   
      rgba(255, 255, 255, 0.1) 100%, 
    )`,
  };
  const className = "gap-0 rounded-md p-0";

  if (headerChildren !== undefined)
    return (
      <Container
        {...props}
        className={twMerge(className, _className)}
        direction="col"
        style={gradientStyle}
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
      style={gradientStyle}
    >
      {children}
    </Container>
  );
};

export default GrayContainer;
