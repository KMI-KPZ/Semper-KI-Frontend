import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LoginIcon from "@mui/icons-material/Login";
import HomeContainer from "./Container";

interface HomeOrgaInfoProps {}

const HomeOrgaInfo: React.FC<HomeOrgaInfoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <HomeContainer
      className="bg-slate-500 md:flex-row md:gap-40"
      data-testid="home-anonym-orga"
    >
      <div className="flex w-full max-w-4xl flex-col gap-5 md:flex-row md:justify-between md:gap-40">
        <div className="flex flex-col items-start justify-center gap-5">
          <Heading variant="h2">{t("Home.components.OrgaInfo.title")}</Heading>
          <Heading variant="subtitle" className="pl-5">
            {t("Home.components.OrgaInfo.subTitle")}
          </Heading>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-5 md:w-auto">
          <Button
            startIcon={<AutoAwesomeIcon fontSize="large" />}
            title={t("Home.components.OrgaInfo.advantage")}
          />
          <Button
            to="/registerOrganization"
            startIcon={<LoginIcon fontSize="large" />}
            title={t("Home.components.OrgaInfo.register")}
          />
        </div>
      </div>
    </HomeContainer>
  );
};

export default HomeOrgaInfo;
