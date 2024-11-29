import React from "react";
import AnonymHomeContainer from "../components/AnonymContainer";
import NRUHero from "@images/nru/KunststoffHero.jpg";
import NRU from "./components/NRU";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const {} = props;

  return (
    <div
      className={`relative  flex w-full   flex-col items-center justify-start`}
      data-testid="home-anonym"
    >
      <img
        src={NRUHero}
        className="absolute top-0  h-full w-full object-cover brightness-50"
      />
      <AnonymHomeContainer>
        <NRU />
      </AnonymHomeContainer>
      {/* <HomeBackground />
      <HomePrototypeAlert />
      <AnonymHomeContainer>
        <Heading
          variant="h1"
          className="pt-32 text-center text-4xl font-black tracking-wide text-white  md:text-7xl"
        >
          {t("Home.Anonym.heading")}
        </Heading>
        <HomeIntroduction />
        <HomeServices />
        <HomeTutorial />
      </AnonymHomeContainer>
      <AnonymHomeContainer className="bg-white">
        <HomeTeam />
      </AnonymHomeContainer> */}
    </div>
  );
};

export default Home;
