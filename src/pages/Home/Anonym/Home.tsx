import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Workflow from "@images/workflow.png";
import HomeAnonymOrder from "./components/Order";
import HomeAnonymHeader from "./components/Header";
import HomeAnonymOrga from "./components/Orga";
import HomeAnonymIndividual from "./components/Individual";
import HomeAnonymMagazinCard from "./components/Magazin";
import HomeAnonymImages from "./components/Images";

interface AnonymHomeProps {}

const AnonymHome: React.FC<AnonymHomeProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10"
      data-testid="home-anonym"
    >
      <HomeAnonymHeader />
      <img src={Workflow} />
      <HomeAnonymOrder />
      <HomeAnonymOrga />
      <HomeAnonymIndividual />
      <HomeAnonymMagazinCard />
      <HomeAnonymImages />
    </div>
  );
};

export default AnonymHome;
