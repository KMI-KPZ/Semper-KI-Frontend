import React from "react";
import { useTranslation } from "react-i18next";

import BMWKdeURL from "@images/BMWK_de.png";
import BMWKenURL from "@images/BMWE_en.png";
import HomeImgCarousel from "./ImgCarousel";
import { Container, Text } from "@component-library/index";
import HomeHeader from "./Header";
import InfAi from "@images/partner/InfAI.png";
import KMILogo from "@images/partner/KMI_Logo.svg";

interface HomeTeamProps {}

const HomeTeam: React.FC<HomeTeamProps> = (props) => {
  const {} = props;
  const { t, i18n } = useTranslation();

  return (
    <Container width="full" className="" align="start" direction="col">
      <HomeHeader
        variant="h2"
        title={t("Home.Anonym.Anonym.partner")}
        headerClassName="text-[#4868B0]"
      />
      <Container width="full" justify="start">
        <Text className="text-black md:w-1/3">
          {t("Home.Anonym.Anonym.partnertext")}
        </Text>
        <Container className="w-2/3" width="none">
          <a
            href={"https://www.bmwk.de/"}
            title={"BMWK"}
            className="flex w-fit items-center justify-center"
            target="_blank"
          >
            <img
              alt={"BMWK"}
              className="w-40 duration-300 hover:scale-105"
              src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
            />
          </a>
          <a
            href={"https://kmi-leipzig.de/"}
            title={"KMI"}
            className="flex w-fit items-center justify-center"
            target="_blank"
          >
            <img
              alt={"KMI"}
              className="w-80 duration-300 hover:scale-105"
              src={KMILogo}
            />
          </a>
          <a
            href={"https://infai.org/"}
            title={"InfAI"}
            target="_blank"
            className="flex w-fit items-center justify-center"
          >
            <img
              alt={"InfAI"}
              className="w-80 duration-300 hover:scale-105"
              src={InfAi}
            />
          </a>
        </Container>
      </Container>

      <HomeImgCarousel />
    </Container>
  );
};

export default HomeTeam;
