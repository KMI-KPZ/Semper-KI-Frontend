import { Heading } from "@component-library/index";
import HomeIntroduction from "./components/Introduction";
import HomeServices from "./components/Services";
import HomePrototypeAlert from "./components/PrototypeAlert";
import HomeTutorial from "./components/Tutorial";
import HomeTeam from "./components/Team";
import { useTranslation } from "react-i18next";
import React from "react";
import AnonymHomeContainer from "../components/AnonymContainer";
import HomeMaturity from "./components/Maturity";
import HomeResilience from "./components/Resilience";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className={`relative  flex w-full flex-col items-center justify-start  gap-10 p-10 pt-0`}
      data-testid="home-anonym"
    >
      <HomePrototypeAlert />
      <AnonymHomeContainer className="rounded-t-none">
        <Heading
          variant="h1"
          className="text-center text-4xl font-black tracking-wide text-white  md:text-7xl"
        >
          {t("Home.Anonym.heading")}
        </Heading>
        <HomeIntroduction />
      </AnonymHomeContainer>
      <AnonymHomeContainer>
        <HomeServices />
      </AnonymHomeContainer>
      <AnonymHomeContainer>
        <HomeTutorial />
      </AnonymHomeContainer>
      <AnonymHomeContainer>
        <HomeMaturity />
      </AnonymHomeContainer>
      <AnonymHomeContainer>
        <HomeResilience />
      </AnonymHomeContainer>
      <AnonymHomeContainer>
        <HomeTeam />
      </AnonymHomeContainer>
    </div>
  );
};

export default Home;
