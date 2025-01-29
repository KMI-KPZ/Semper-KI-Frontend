import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading } from "@component-library/index";

interface ResourcesMaturityProps {}

const ResourcesMaturity: React.FC<ResourcesMaturityProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Maturity.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full"></Container>
    </Container>
  );
};

export default ResourcesMaturity;
