import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import HomeHeader from "./Header";
import LaunchIcon from "@mui/icons-material/Launch";
import HomeButton from "./Button";

interface HomeResilienceProps {}

const HomeResilience: React.FC<HomeResilienceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const url: string = `${process.env.VITE_RESILIENCE}`;

  return (
    <Container width="full" className="gap-10" items="start" direction="col">
      <HomeHeader variant="h2" title={t("Home.Anonym.Resilience.heading")} />
      <Text>{t("Home.Anonym.Resilience.text")}</Text>
      <Container
        width="full"
        justify="center"
        className=" lg:pr-30 justify-center md:justify-end md:pr-20"
        direction="row"
      >
        <HomeButton
          text={t("Home.Anonym.Resilience.button")}
          icon={<LaunchIcon />}
          to={url}
          extern
        />
      </Container>
    </Container>
  );
};

export default HomeResilience;
