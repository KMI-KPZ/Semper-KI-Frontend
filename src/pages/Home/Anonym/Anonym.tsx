import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Workflow from "@images/workflow.png";
import HomeAnonymProject from "./components/Project";
import HomeAnonymHeader from "./components/Header";
import HomeAnonymOrga from "./components/Orga";
import HomeAnonymClient from "./components/Client";
import HomeAnonymMagazinCard from "./components/Magazin";
import HomeAnonymImages from "./components/Images";
import Coypu from "../components/Coypu";
import Container from "@component-library/Container";
import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";

interface AnonymHomeProps {}

const AnonymHome: React.FC<AnonymHomeProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-10"
      data-testid="home-anonym"
    >
      {process.env.NODE_ENV === "production" ? (
        <Container width="full" className="bg-white p-5">
          <Text variant="body" className="text-5xl font-bold text-red-500">
            Diese Seite ist ein Prototyp und wird fortlaufend bearbeitet
          </Text>
        </Container>
      ) : null}
      <HomeAnonymHeader />
      <img src={Workflow} />
      <HomeAnonymProject />
      <HomeAnonymOrga />
      <HomeAnonymClient />
      <HomeAnonymMagazinCard />
      <Coypu />
      <HomeAnonymImages />
    </div>
  );
};

export default AnonymHome;
