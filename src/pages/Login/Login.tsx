import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import { UserType } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/index";
import Switch from "@/components/Switch";
import PersonIcon from "@mui/icons-material/Person";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GroupIcon from "@mui/icons-material/Group";
import { UserSwitch } from "@/components/UserSwitch";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Container } from "@component-library/index";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useLogin, { LoginUserType } from "@/hooks/useLogin";
import logger from "@/hooks/useLogger";

interface Props {
  path?: string;
  userType?: UserType;
}
type State = {
  orga: boolean;
};

const Login: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const { login, mockedLogin } = useLogin();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const redirectURL = queryParameters.get("redirectURL");

  const handleLogin = (
    userType: "user" | "organization",
    register: boolean
  ) => {
    login({
      userType: userType,
      register: register,
      path: redirectURL !== null ? redirectURL : undefined,
    });
  };

  const handleOnClickButtonLoginOrga = () => {
    handleLogin("organization", false);
  };
  const handleOnClickButtonLoginClient = () => {
    handleLogin("user", false);
  };
  const handleOnClickButtonRegisterOrga = () => {
    navigate("/registerorganization");
  };
  const handleOnClickButtonRegisterClient = () => {
    handleLogin("user", true);
  };
  const handleOnClickButtonMockedLogin = (type: LoginUserType) => {
    mockedLogin(type);
  };

  return (
    <Container direction="col" className=" p-5">
      <Container direction="col" className="bg-white p-5 md:px-20">
        <PersonIcon style={{ fontSize: "45px", color: "#263652" }} />
        <Container>
          <Heading variant="h2">{t("Login.Login.client")}</Heading>
        </Container>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            onClick={handleOnClickButtonLoginClient}
            title={t("Login.Login.buttons.login")}
            startIcon={<LoginIcon />}
            variant="primary"
          />
          <Button
            onClick={handleOnClickButtonRegisterClient}
            title={t("Login.Login.buttons.register")}
            startIcon={<CreateIcon />}
          />
        </div>
      </Container>
      <Container direction="col" className="bg-white p-5 md:px-20">
        <CorporateFareIcon style={{ fontSize: "45px", color: "#263652" }} />
        <Container>
          <Heading variant="h2">{t("Login.Login.orga")}</Heading>
        </Container>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            onClick={handleOnClickButtonLoginOrga}
            title={t("Login.Login.buttons.login")}
            startIcon={<LoginIcon />}
            variant="primary"
          />
          <Button
            onClick={handleOnClickButtonRegisterOrga}
            title={t("Login.Login.buttons.register")}
            startIcon={<CreateIcon />}
          />
        </div>
      </Container>
      {process.env.NODE_ENV === "development" ? (
        <Container direction="col" className="bg-white p-5">
          <Heading variant="h1">{t("Login.Login.admin")}</Heading>
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeUser")}
              title={t("Login.Login.buttons.testuser")}
              variant="primary"
              startIcon={<PersonIcon />}
              className="bg-green-700"
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeOrganization")}
              variant="primary"
              title={t("Login.Login.buttons.testorga")}
              startIcon={<CorporateFareIcon />}
              className="bg-blue-700"
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeAdmin")}
              variant="primary"
              title={t("Login.Login.buttons.testadmin")}
              startIcon={<AdminPanelSettingsIcon />}
              className="bg-red-700"
            />
          </div>
        </Container>
      ) : null}
    </Container>
  );
};

export default Login;
