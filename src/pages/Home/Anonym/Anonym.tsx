import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Coypu from "../components/Coypu";
import Container from "@component-library/Container";
import HomeProjects from "../components/Projects";
import HomeClientInfo from "../components/ClientInfo";
import HomeMagazin from "../components/Magazin";
import HomeImages from "../components/Images";
import HomeOrgaInfo from "../components/OrgaInfo";
import Hero from "@images/Hero.jpg";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HomeContainer from "../components/Container";
import Background from "@/components/Background";
import { image } from "d3";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className={`flex w-full flex-col items-center justify-center bg-contain  bg-fixed bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${Hero})` }}
      data-testid="home-anonym"
    >
      {process.env.NODE_ENV === "production" ? (
        <Container width="full" className="bg-white p-5">
          <Text variant="body" className="text-5xl font-bold text-red-500">
            Diese Seite ist ein Prototyp und wird fortlaufend bearbeitet
          </Text>
        </Container>
      ) : null}
      <HomeContainer className="h-screen bg-black bg-opacity-40 ">
        <div className="relative max-w-6xl text-white">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
        <PowerSettingsNewIcon className="absolute bottom-40 right-40 font-black text-white" />
      </HomeContainer>
      <HomeContainer className="h-[70vh]">
        <div className="w-full max-w-6xl text-white">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </HomeContainer>
      <HomeProjects />
      <HomeOrgaInfo />
      <HomeClientInfo />
      <HomeImages />
    </div>
  );
};

export default Home;
