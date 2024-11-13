import { Container, Divider, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ResourcesOverviewProps {}

const ResourcesOverview: React.FC<ResourcesOverviewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" width="full" justify="start">
      <Heading variant="h2">{t("Resources.Overview.header")}</Heading>
      <Divider />
      <Text>{t("Resources.Overview.text")}</Text>
    </Container>
  );
};

export default ResourcesOverview;
