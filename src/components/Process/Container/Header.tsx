import React, { PropsWithChildren } from "react";
import ProcessMenu from "../Menu";
import { Container, Heading } from "@component-library/index";

interface ProcessHeaderProps {
  menuButtonTitle: string;
  pageTitle: string;
}

const ProcessContainerHeader: React.FC<
  PropsWithChildren<ProcessHeaderProps>
> = (props) => {
  const { children, menuButtonTitle, pageTitle } = props;

  return (
    <>
      {children !== undefined ? (
        <ProcessMenu buttonTitle={menuButtonTitle}>{children}</ProcessMenu>
      ) : null}
      <Container
        width="full"
        justify="start"
        className="rounded-md rounded-b-none bg-white p-2 px-5"
      >
        <Heading variant="h2">{pageTitle}</Heading>
      </Container>
    </>
  );
};

export default ProcessContainerHeader;
