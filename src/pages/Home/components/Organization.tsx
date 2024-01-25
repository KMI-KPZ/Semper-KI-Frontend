import { Button, Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "./Container";

interface HomeOrganizationProps {}

const HomeOrganization: React.FC<HomeOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer className="flex-row gap-5 bg-white p-10 ">
      <Heading variant="h2">{t("Home.components.Organization.title")}</Heading>
      <Container width="full">
        <Button
          title={t("Home.components.Organization.button.edit")}
          to="/organization"
        />
      </Container>
    </HomeContainer>
  );
};

export default HomeOrganization;
