import { Button } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "./Container";

interface HomeResourcesProps {}

const HomeResources: React.FC<HomeResourcesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer className="gap-5 bg-white p-5">
      <Heading variant="h2">{t("Home.components.Resources.title")}</Heading>
      <Button
        title={t("Home.components.Resources.button.edit")}
        to="/resources"
      />
    </HomeContainer>
  );
};

export default HomeResources;
