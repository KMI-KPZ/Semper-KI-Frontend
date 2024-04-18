import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import Hero from "@images/Hero_16_9.png";
import HomeContainer from "../components/Container";
import SemperKI from "@images/Semper-KI.png";
import WirMachen3DDruck from "@images/Wir-machen-3D-Druck.png";
import ButtonIcon from "@images/OnButton.png";
import SemperLogo from "@images/Logo-Semper.png";
import { ContentBox } from "@component-library/index";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LoginIcon from "@mui/icons-material/Login";
import HomeImgCarousel from "./components/ImgCarousel";
import { useProject } from "@/pages/Projects/hooks/useProject";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { Button } from "@component-library/index";
import BMWKdeURL from "@images/BMWK_de.png";
import BMWKenURL from "@images/BMWE_en.png";
import LaunchIcon from "@mui/icons-material/Launch";
import PersonIcon from "@mui/icons-material/Person";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const { t, i18n } = useTranslation();
  const { login } = useLogin();
  const { createProject } = useProject();
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    login({ userType: "user", register: true });
  };

  const handleOnClickButtonDemonstrator = () => {
    createProject();
  };

  return (
    <div
      className={`flex w-full flex-col items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat text-white`}
      style={{ backgroundImage: `url(${Hero})` }}
      data-testid="home-anonym"
    >
      {process.env.NODE_ENV === "production" ? (
        <Container width="full" className="bg-white p-5">
          <Text variant="body" className="text-5xl font-bold text-red-500">
            {t("Home.Anonym.Anonym.prototype")}
          </Text>
        </Container>
      ) : null}
      <HomeContainer className="h-fit min-h-screen bg-black bg-opacity-70">
        <ContentBox className="flex-wrap justify-center">
          <img src={SemperLogo} className="w-[300px]" alt="" />
          <Heading
            variant="h1"
            className="text-6xl font-black tracking-wide text-white shadow-white [text-shadow:_0px_0px_20px_var(--tw-shadow-color)] md:text-9xl"
          >
            {t("Home.Anonym.Anonym.title")}
          </Heading>
        </ContentBox>
        <ContentBox className="flex-wrap justify-center">
          <Heading
            variant="h2"
            className="text-3xl font-black tracking-wide text-white shadow-white [text-shadow:_0px_0px_20px_var(--tw-shadow-color)] md:text-5xl "
          >
            {t("Home.Anonym.Anonym.subTitle")}
          </Heading>
        </ContentBox>
      </HomeContainer>
      <HomeContainer className="h-fit min-h-[30vh]  bg-gradient-to-b from-[#064EA1]/80  via-[#2773BB]/80 to-[#43BBC2]/80 md:bg-gradient-to-r">
        {/* <HomeContainer className="h-fit min-h-[30vh]  bg-gradient-to-b from-violet-800/80  via-orange-800/80 to-türkis-800/80 md:bg-gradient-to-r"> */}
        <ContentBox className="h-fit items-start justify-between gap-10">
          <Container direction="col" gap={5} width="full" align="start">
            <Heading variant="h2" className="text-white">
              {t("Home.Anonym.Anonym.visionTitle1")}
            </Heading>
            <Text
              variant="body"
              className="hyphens-auto text-justify text-white md:text-xl"
            >
              {t("Home.Anonym.Anonym.vision1")}
            </Text>
          </Container>
          <Container direction="col" gap={5} width="full" align="start">
            <Heading variant="h2" className="text-white">
              {t("Home.Anonym.Anonym.visionTitle2")}
            </Heading>
            <Text
              variant="body"
              className="hyphens-auto text-justify text-white md:text-xl"
            >
              {t("Home.Anonym.Anonym.vision2")}
            </Text>
          </Container>
        </ContentBox>
      </HomeContainer>
      <HomeContainer className="h-fit min-h-[25vh] bg-ultramarinblau-dark">
        <ContentBox className="justify-between py-5">
          <Container direction="col" align="start">
            <Container>
              <RocketLaunchIcon fontSize="large" />
              <Heading variant="h2" className="text-3xl text-white">
                {t("Home.Anonym.Anonym.demonstrator.title")}
              </Heading>
            </Container>
            <Heading variant="h3" className="pl-16 text-white">
              {t("Home.Anonym.Anonym.demonstrator.subTitle")}
            </Heading>
          </Container>
          <Button
            startIcon={<RocketLaunchIcon fontSize="large" />}
            title={t("Home.Anonym.Anonym.buttons.demonstrator")}
            onClick={() => navigate("/projects")}
            variant="secondary"
          />
        </ContentBox>
      </HomeContainer>
      <HomeContainer
        className="h-fit min-h-[25vh] bg-slate-700"
        data-testid="home-anonym-orga"
      >
        <ContentBox className="flex w-full flex-col gap-5 md:flex-row md:justify-between md:gap-40">
          <div className="flex flex-col items-start justify-center gap-5">
            <Container>
              <CorporateFareIcon fontSize="large" />
              <Heading variant="h2" className="text-white">
                {t("Home.components.OrgaInfo.title")}
              </Heading>
            </Container>
            <Heading variant="h3" className="pl-16 text-white">
              {t("Home.components.OrgaInfo.subTitle")}
            </Heading>
          </div>
          <div className="flex w-full flex-row items-start justify-center gap-5 md:w-auto">
            <Button
              startIcon={<AutoAwesomeIcon fontSize="large" />}
              title={t("Home.components.OrgaInfo.advantage")}
              to="advantages/organization"
              width="full"
            />
            <Button
              to="/registerOrganization"
              startIcon={<LoginIcon fontSize="large" />}
              title={t("Home.components.OrgaInfo.register")}
              width="full"
            />
          </div>
        </ContentBox>
      </HomeContainer>
      <HomeContainer className="h-fit min-h-[25vh] bg-ultramarinblau-dark">
        <ContentBox className="flex w-full  flex-col gap-5 md:flex-row md:justify-between md:gap-40">
          <div className="flex flex-col items-start justify-center gap-5">
            <Container>
              <PersonIcon fontSize="large" />
              <Heading variant="h2" className="text-white">
                {t("Home.components.ClientInfo.title")}
              </Heading>
            </Container>
            <Heading variant="h3" className="pl-16 text-white">
              {t("Home.components.ClientInfo.subTitle")}
            </Heading>
          </div>
          <div className="flex w-full flex-row items-start justify-center gap-5 md:w-auto">
            <Button
              startIcon={<AutoAwesomeIcon fontSize="large" />}
              title={t("Home.components.ClientInfo.advantage")}
              width="full"
              to="advantages/user"
            />
            <Button
              onClick={handleOnClickButton}
              startIcon={<LoginIcon fontSize="large" />}
              title={t("Home.components.ClientInfo.register")}
              width="full"
            />
          </div>
        </ContentBox>
      </HomeContainer>
      <HomeContainer className={`bg-white`}>
        <ContentBox className="flex flex-col md:flex-col">
          <Heading variant="h2" className="w-full hyphens-auto text-black">
            {t("Home.Anonym.Anonym.partner")}
          </Heading>
          <HomeImgCarousel />
          <Container className="flex-col md:flex-row">
            <a
              href={"https://www.bmwk.de/"}
              title={"BMWK"}
              className="flex w-60 items-center justify-center"
            >
              <img
                alt={"BMWK"}
                className="w-40 duration-300 hover:scale-105"
                src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
              />
            </a>
            <Text variant="body" className="text-black md:text-xl">
              {t("Home.Anonym.Anonym.partnertext")}
            </Text>
            <Button
              title={t("Home.Anonym.Anonym.buttons.magazin")}
              endIcon={<LaunchIcon />}
              extern
              target="_blank"
              to="https://magazin.semper-ki.org/"
              onClick={() => navigate("/magazin")}
              variant="primary"
            />
          </Container>
        </ContentBox>
      </HomeContainer>
    </div>
  );
};

export default Home;
