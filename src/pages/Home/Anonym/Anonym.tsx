import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Workflow from "@images/workflow.png";
import Coypu from "../components/Coypu";
import Container from "@component-library/Container";
import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import HomeHeader from "../components/Header";
import HomeProjects from "../components/Projects";
import HomeOrganization from "../components/Organization";
import HomeClientInfo from "../components/ClientInfo";
import HomeMagazin from "../components/Magazin";
import HomeImages from "../components/Images";
import HomeOrgaInfo from "../components/OrgaInfo";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
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
      <HomeHeader />
      <img src={Workflow} />
      <HomeProjects />
      <HomeOrgaInfo />
      <HomeClientInfo />
      <HomeMagazin />
      <Coypu />
      <HomeImages />
    </div>
  );
};

export default Home;
