import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Container from "@component-library/Container";
import Hero from "@images/Hero16.9.png";
import HomeContainer from "../components/Container";
import SemperKI from "@images/Semper-KI.png";
import WirMachen3DDruck from "@images/Wir-machen-3D-Druck.png";
import ButtonIcon from "@images/Button.png";
import SemperLogo from "@images/Logo-Semper.png";
import ContentBox from "@component-library/ContentBox";
import { Button } from "@component-library/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LoginIcon from "@mui/icons-material/Login";
import { useLogin } from "@/pages/Login/hooks/useLogin";
import HomeImgCarousel from "./components/ImgCarousel";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const {} = props;
  const { t, i18n } = useTranslation();
  const { loginMutation } = useLogin();

  const handleOnClickButton = () => {
    loginMutation.mutate({ userType: "user", register: true });
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
      <HomeContainer className="h-screen bg-black bg-opacity-70">
        <ContentBox className="">
          <img src={SemperLogo} className="w-fit" />
          <img src={SemperKI} className="w-fit" />
        </ContentBox>
        <ContentBox className="">
          <img src={WirMachen3DDruck} className="w-fit" />
          <img src={ButtonIcon} className="w-fit" />
        </ContentBox>
      </HomeContainer>
      <HomeContainer className="h-fit min-h-[50vh] bg-black bg-opacity-30">
        <ContentBox className="h-fit">
          <Text variant="body" className="text-white md:text-xl">
            {t("Home.Anonym.Anonym.vision")}
          </Text>
        </ContentBox>
      </HomeContainer>
      <HomeContainer className="h-fit min-h-[20vh] bg-ultramarinblau-dark">
        <ContentBox className="justify-between py-5">
          <Text variant="body" className="text-3xl">
            {t("Home.Anonym.Anonym.demonstrator")}
          </Text>
          <Button title={t("Home.Anonym.Anonym.buttons.demonstrator")} />
        </ContentBox>
      </HomeContainer>
      <HomeContainer
        className="h-fit min-h-[20vh] bg-slate-500"
        data-testid="home-anonym-orga"
      >
        <ContentBox className="flex w-full flex-col gap-5 md:flex-row md:justify-between md:gap-40">
          <div className="flex flex-col items-start justify-center gap-5">
            <Heading variant="h2" className="text-white">
              {t("Home.components.OrgaInfo.title")}
            </Heading>
            <Heading variant="subtitle" className="pl-5 text-white">
              {t("Home.components.OrgaInfo.subTitle")}
            </Heading>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-5 md:w-auto">
            <Button
              startIcon={<AutoAwesomeIcon fontSize="large" />}
              title={t("Home.components.OrgaInfo.advantage")}
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
      <HomeContainer className="h-fit min-h-[20vh] bg-ultramarinblau-dark">
        <ContentBox className="flex w-full  flex-col gap-5 md:flex-row md:justify-between md:gap-40">
          <div className="flex flex-col items-start justify-center gap-5">
            <Heading variant="h2" className="text-white">
              {t("Home.components.ClientInfo.title")}
            </Heading>
            <Heading variant="subtitle" className="pl-5 text-white">
              {t("Home.components.ClientInfo.subTitle")}
            </Heading>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-5 md:w-auto">
            <Button
              startIcon={<AutoAwesomeIcon fontSize="large" />}
              title={t("Home.components.ClientInfo.advantage")}
              width="full"
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
      <HomeContainer className={`bg-slate-200`}>
        <ContentBox>
          <Heading variant="h2" className="basis-1/3 text-black">
            Innovation klappt nur als Team. Wir arbeiten eng zusammen und freuen
            uns über neue Partner in Forschung und Entwicklung.
          </Heading>
          <HomeImgCarousel />
        </ContentBox>
      </HomeContainer>
    </div>
  );
};

export default Home;
