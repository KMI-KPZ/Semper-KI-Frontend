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
      rgba(255, 255, 255, 0.4) 0%,   /* New stop from the second image */
      rgba(255, 255, 255, 0.1) 100%, /* New stop from the second image */
      rgba(38, 54, 82, 0.1) 30%,
      rgba(38, 54, 82, 0.5) 75%,
      rgba(38, 54, 82, 0.6) 100%
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
