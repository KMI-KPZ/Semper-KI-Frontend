import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LoginIcon from "@mui/icons-material/Login";
import HomeContainer from "./Container";
import { ContentBox } from "@component-library/index";
import useLogin from "@/api/Authentification/Querys/useLogin";
interface HomeClientInfoProps {}

const HomeClientInfo: React.FC<HomeClientInfoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const login = useLogin();

  const handleOnClickButton = () => {
    login.mutate({ userType: "user", register: true });
  };

  return (
    <HomeContainer
      className="bg-slate-300 md:flex-row md:gap-40"
      data-testid="home-anonym-individual"
    >
      <ContentBox>
        <div className="flex w-full  flex-col gap-5 md:flex-row md:justify-between md:gap-40">
          <div className="flex flex-col items-start justify-center gap-5">
            <Heading variant="h2">
              {t("Home.components.ClientInfo.title")}
            </Heading>
            <Heading variant="subtitle" className="pl-5">
              {t("Home.components.ClientInfo.subTitle")}
            </Heading>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-5 md:w-auto">
            <Button
              startIcon={<AutoAwesomeIcon fontSize="large" />}
              title={t("Home.components.ClientInfo.advantage")}
            />
            <Button
              onClick={handleOnClickButton}
              startIcon={<LoginIcon fontSize="large" />}
              title={t("Home.components.ClientInfo.register")}
            />
          </div>
        </div>
      </ContentBox>
    </HomeContainer>
  );
};

export default HomeClientInfo;
