import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface HomeAnonymOrderCardProps {}

const HomeAnonymOrderCard: React.FC<HomeAnonymOrderCardProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-around gap-5 bg-white p-5 md:flex-row">
      <Heading variant="h2">{t("Home.Home.Anonym.OrderCard.title")}</Heading>
      <Heading variant="subtitle">
        {t("Home.Home.Anonym.OrderCard.subTitle")}
      </Heading>
      <Button
        to="/process/new"
        title={t("Home.Home.Anonym.OrderCard.demo")}
        startIcon={<PlayArrowIcon fontSize="large" />}
        variant="primary"
      />
    </div>
  );
};

export default HomeAnonymOrderCard;
