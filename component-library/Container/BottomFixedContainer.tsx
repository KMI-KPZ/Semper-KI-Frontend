import React, { PropsWithChildren } from "react";
import { Container, ContainerProps } from "@component-library/index";
import { twMerge } from "tailwind-merge";

type BottomFixedContainerProps = {};

const BottomFixedContainer: React.FC<
  PropsWithChildren<BottomFixedContainerProps & ContainerProps>
> = (props) => {
  return (
    <Container
      {...props}
      width="fit"
      direction="row"
      className={twMerge("fixed bottom-5 right-5 z-50 gap-5", props.className)}
    />
  );
};

export default BottomFixedContainer;
