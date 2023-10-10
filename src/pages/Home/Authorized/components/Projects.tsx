import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "../../components/Container";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";

interface HomeAuthorizedProjectsProps {}

const HomeAuthorizedProjects: React.FC<HomeAuthorizedProjectsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.Home.Authorized.Projects.title")}</Heading>
      <Button title={t("Home.Home.Authorized.Projects.title")} to="/projects" />
    </HomeContainer>
  );
};

export default HomeAuthorizedProjects;
