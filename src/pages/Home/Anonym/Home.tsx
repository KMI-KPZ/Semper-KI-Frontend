import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Workflow from "@images/workflow.png";
import HomeAnonymOrder from "./components/Order";

interface AnonymHomeProps {}

const AnonymHome: React.FC<AnonymHomeProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10"
      data-testid="home"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
        <Heading variant="h1">{t("Home.Home.Anonym.title")}</Heading>
        <div className="flex flex-col items-start justify-center">
          <Text variant="body">{t("Home.Home.Anonym.claim1")}</Text>
          <br />
          <Text variant="body">{t("Home.Home.Anonym.claim2")}</Text>
          <Text variant="body">{t("Home.Home.Anonym.claim3")}</Text>
          <Text variant="body">{t("Home.Home.Anonym.claim4")}</Text>
          <br />
          <Text variant="body">{t("Home.Home.Anonym.claim5")}</Text>
        </div>
      </div>
      <img src={Workflow} />
      <HomeAnonymOrder />
    </div>
  );
};

export default AnonymHome;
