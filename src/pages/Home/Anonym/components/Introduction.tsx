import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import IntroductionIMG from "@images/introduction.svg";
import HomeHeader from "./Header";
import HomeButton from "./Button";
import SemperKIIcon from "@images/SemperKI_ListIcon.svg";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface HomeIntroductionProps {}

const HomeIntroduction: React.FC<HomeIntroductionProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container width="full" className="gap-20" items="start" direction="col">
      <Container width="full" items="stretch" className="gap-10">
        <Container
          direction="col"
          width="full"
          className="md:w-2/5"
          height="full"
          justify="start"
          items="start"
        >
          <HomeHeader
            variant="h2"
            title={t("Home.Anonym.Introduction.heading")}
          />
          <Text>{t("Home.Anonym.Introduction.text")}</Text>
          <Container
            width="full"
            className="md:mt-20"
            items="start"
            direction="col"
          >
            <Container direction="row" width="full" justify="start">
              <img src={SemperKIIcon} />
              <Text>{t("Home.Anonym.Introduction.item1")}</Text>
            </Container>
            <Container direction="row" width="full" justify="start">
              <img src={SemperKIIcon} />
              <Text>{t("Home.Anonym.Introduction.item2")}</Text>
            </Container>
            <Container direction="row" width="full" justify="start">
              <img src={SemperKIIcon} />
              <Text>{t("Home.Anonym.Introduction.item3")}</Text>
            </Container>
          </Container>
        </Container>
        <Container
          direction="col"
          width="full"
          justify="center"
          items="center"
          className="md:w-3/5"
        >
          <img src={IntroductionIMG} />
        </Container>
      </Container>
      <Container
        width="full"
        justify="center"
        className="lg:pr-30 justify-center md:justify-end md:pr-20"
        direction="row"
      >
        <HomeButton
          text={t("Home.Anonym.button.demonstrator")}
          icon={<RocketLaunchIcon />}
          to="/demo"
        />
      </Container>
    </Container>
  );
};

export default HomeIntroduction;
