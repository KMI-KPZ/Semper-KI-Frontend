import React, { PropsWithChildren } from "react";
import ProcessMenu from "../Menu";
import { Container, Divider, Heading } from "@component-library/index";

interface ProcessHeaderProps {
  menuButtonTitle: string;
  pageTitle: string;
}

const ProcessHeader: React.FC<PropsWithChildren<ProcessHeaderProps>> = (
  props
) => {
  const { children, menuButtonTitle, pageTitle } = props;

  return (
    <>
      {children !== undefined ? (
        <ProcessMenu buttonTitle={menuButtonTitle}>{children}</ProcessMenu>
      ) : null}
      <Container width="full" justify="start">
        <Heading variant="h2">{pageTitle}</Heading>
      </Container>
      <Divider />
    </>
  );
};

export default ProcessHeader;
