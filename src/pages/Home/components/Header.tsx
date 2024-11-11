import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "./Container";

interface HomeHeaderProps {}

const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer
      className="flex-col items-center gap-10 md:flex-row md:items-start md:gap-20"
      data-testid="home-anonym-header"
    >
      <Heading variant="h1">{t("Home.components.Header.heading")}</Heading>
      <div className="flex flex-col items-center justify-center md:items-start">
        <Text variant="body">{t("Home.components.Header.claim1")}</Text>
        <br />
        <Text variant="body">{t("Home.components.Header.claim2")}</Text>
        <Text variant="body">{t("Home.components.Header.claim3")}</Text>
        <Text variant="body">{t("Home.components.Header.claim4")}</Text>
        <br />
        <Text variant="body">{t("Home.components.Header.claim5")}</Text>
      </div>
    </HomeContainer>
  );
};

export default HomeHeader;
