import { Button, Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";

interface AdvantagesOrganizationProps {}

const AdvantagesOrganization: React.FC<AdvantagesOrganizationProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container direction="col">
      <Heading variant="h1">
        {t("Advantages.components.Organization.heading")}
      </Heading>
      <Text className="md:max-w-md">
        {t("Advantages.components.Organization.text")}
      </Text>
      <Heading variant="h2">
        {t("Advantages.components.Organization.subHeading")}
      </Heading>
      <Heading variant="h3">
        {t("Advantages.components.Organization.subHeading2")}
      </Heading>
      <Container
        direction="col"
        gap={5}
        width="fit"
        justify="start"
        items="start"
      >
        <Text>{t("Advantages.components.Organization.fact1")}</Text>
        <Text>{t("Advantages.components.Organization.fact2")}</Text>
        <Text>{t("Advantages.components.Organization.fact3")}</Text>
        <Text>{t("Advantages.components.Organization.fact4")}</Text>
      </Container>
      <Button
        to="/registerOrganization"
        variant="primary"
        startIcon={<LoginIcon fontSize="large" />}
        title={t("Advantages.components.Organization.button.register")}
        width="full"
      />
    </Container>
  );
};

export default AdvantagesOrganization;
