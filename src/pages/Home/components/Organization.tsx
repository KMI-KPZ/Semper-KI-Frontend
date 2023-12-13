import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "./Container";

interface HomeOrganizationProps {}

const HomeOrganization: React.FC<HomeOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer className="gap-5 bg-white p-5">
      <Heading variant="h2">{t("Home.components.Organization.title")}</Heading>
      <Button
        title={t("Home.components.Organization.button.edit")}
        to="/organization"
      />
    </HomeContainer>
  );
};

export default HomeOrganization;
