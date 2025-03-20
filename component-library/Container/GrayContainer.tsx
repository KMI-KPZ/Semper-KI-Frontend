import React, { PropsWithChildren } from "react";
import { Container, ContainerProps } from "@component-library/index";
import { twMerge } from "tailwind-merge";

type GrayContainerProps = {
  headerChildren?: React.ReactNode;
  open?: boolean;
};

export const gradientStyle = {
  background: `linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3) 0%,   /* New stop from the second image */
    rgba(255, 255, 255, 0.1) 100%, /* New stop from the second image */
    rgba(38, 54, 82, 0.2) 0%,
    rgba(38, 54, 82, 0.5) 75%,
    rgba(38, 54, 82, 0.8) 100%
  )`,
};

const GrayContainer: React.FC<
  PropsWithChildren<GrayContainerProps & ContainerProps>
> = (props) => {
  const {
    className: _className = "",
    headerChildren,
    children,
    open = true,
  } = props;

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
        {open ? (
          <Container {...props} className={twMerge("p-5", _className)}>
            {children}
          </Container>
        ) : null}
      </Container>
    );

  return (
    <Container
      {...props}
      className={twMerge(className, "p-5", _className)}
      direction="col"
      style={gradientStyle}
    >
      {open ? children : null}
    </Container>
  );
};

export default GrayContainer;
