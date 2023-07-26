import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeAnonymContainer from "./Container";

interface HomeAnonymHeaderProps {}

const HomeAnonymHeader: React.FC<HomeAnonymHeaderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeAnonymContainer
      className="flex-col items-center gap-10 md:flex-row md:items-start md:gap-20"
      data-testid="home-anonym-header"
    >
      <Heading variant="h1">{t("Home.Home.Anonym.Header.title")}</Heading>
      <div className="flex flex-col items-center justify-center md:items-start">
        <Text variant="body">{t("Home.Home.Anonym.Header.claim1")}</Text>
        <br />
        <Text variant="body">{t("Home.Home.Anonym.Header.claim2")}</Text>
        <Text variant="body">{t("Home.Home.Anonym.Header.claim3")}</Text>
        <Text variant="body">{t("Home.Home.Anonym.Header.claim4")}</Text>
        <br />
        <Text variant="body">{t("Home.Home.Anonym.Header.claim5")}</Text>
      </div>
    </HomeAnonymContainer>
  );
};

export default HomeAnonymHeader;
