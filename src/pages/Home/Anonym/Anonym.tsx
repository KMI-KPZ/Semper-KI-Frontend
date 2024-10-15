import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeIntroduction from "./components/Introduction";
import HomeServices from "./components/Services";
import HomePrototypeAlert from "./components/PrototypeAlert";
import HomeBackground from "./components/Background";
import HomeTutorial from "./components/Tutorial";
import HomeTeam from "./components/Team";
import AnonymHomeContainer from "../components/AnonymContainer";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className={`relative  flex  w-full flex-col items-center justify-start`}
      data-testid="home-anonym"
    >
      <HomeBackground />
      <HomePrototypeAlert />
      <AnonymHomeContainer>
        <Heading
          variant="h1"
          className="pt-32 text-center text-4xl font-black tracking-wide text-white  md:text-7xl"
        >
          {t("Home.Anonym.Anonym.title")}
        </Heading>
        <HomeIntroduction />
        <HomeServices />
        <HomeTutorial />
      </AnonymHomeContainer>
      <AnonymHomeContainer className="bg-white">
        <HomeTeam />
      </AnonymHomeContainer>
    </div>
  );
};

export default Home;
