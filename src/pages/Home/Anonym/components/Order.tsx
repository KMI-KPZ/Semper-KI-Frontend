import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HomeAnonymContainer from "./Container";

interface HomeAnonymOrderProps {}

const HomeAnonymOrder: React.FC<HomeAnonymOrderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeAnonymContainer data-testid="home-anonym-order">
      <div className="flex w-full max-w-4xl flex-col items-center gap-5 md:flex-row md:justify-between md:gap-40">
        <div className="flex w-full flex-col items-start justify-center gap-5">
          <Heading variant="h2" className="text-7xl">
            {t("Home.Home.Anonym.Order.title")}
          </Heading>
          <Heading variant="subtitle" className="pl-5">
            {t("Home.Home.Anonym.Order.subTitle")}
          </Heading>
        </div>
        <Button
          to="/demo"
          title={t("Home.Home.Anonym.Order.demo")}
          startIcon={<PlayArrowIcon fontSize="large" />}
        />
      </div>
    </HomeAnonymContainer>
  );
};

export default HomeAnonymOrder;
