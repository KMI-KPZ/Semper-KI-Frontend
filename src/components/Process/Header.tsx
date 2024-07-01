import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import ProcessMenu from "./Menu";
import { Container, Divider, Heading } from "@component-library/index";

interface ProcessHeaderProps {
  menuTitle: string;
  pageTitle: string;
}

const ProcessHeader: React.FC<PropsWithChildren<ProcessHeaderProps>> = (
  props
) => {
  const { children, menuTitle, pageTitle } = props;

  return (
    <>
      <ProcessMenu title={menuTitle}>{children}</ProcessMenu>
      <Container width="full" justify="start">
        <Heading variant="h2">{pageTitle}</Heading>
      </Container>
      <Divider />
    </>
  );
};

export default ProcessHeader;
