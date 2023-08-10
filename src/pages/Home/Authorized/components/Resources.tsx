import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "../../components/Container";

interface HomeAuthorizedResourcesProps {}

const HomeAuthorizedResources: React.FC<HomeAuthorizedResourcesProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer>
      <Heading variant="h2">
        {t("Home.Home.Authorized.Resources.title")}
      </Heading>
      <Button
        title={t("Home.Home.Authorized.Resources.button.edit")}
        to="/organization"
      />
    </HomeContainer>
  );
};

export default HomeAuthorizedResources;
