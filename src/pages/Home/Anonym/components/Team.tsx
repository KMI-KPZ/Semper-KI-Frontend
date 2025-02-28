import React from "react";
import { useTranslation } from "react-i18next";
import HomeImgCarousel from "./ImgCarousel";
import { Container, Text } from "@component-library/index";
import HomeHeader from "./Header";

interface HomeTeamProps {}

const HomeTeam: React.FC<HomeTeamProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container width="full" className="" items="start" direction="col">
      <HomeHeader variant="h2" title={t("Home.Anonym.partner")} color="light" />
      <Container width="full" justify="start">
        <Text className="text-black md:w-1/3">
          {t("Home.Anonym.partnertext")}
        </Text>
        <Container className="w-2/3" width="none">
          <HomeImgCarousel />
        </Container>
      </Container>
    </Container>
  );
};

export default HomeTeam;
