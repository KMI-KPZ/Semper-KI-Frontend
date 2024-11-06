import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import { UserType } from "@/hooks/useUser";
import { Heading } from "@component-library/index";
import PersonIcon from "@mui/icons-material/Person";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Container } from "@component-library/index";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLogin, {
  LoginUserType,
} from "@/api/Authentification/Querys/useLogin";
import useMockedLogin from "@/api/Authentification/Querys/useMockedLogin";

interface Props {
  path?: string;
  userType?: UserType;
}

const Login: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const login = useLogin();
  const mockedLogin = useMockedLogin();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const redirectURL = queryParameters.get("redirectURL");

  const handleLogin = (
    userType: "user" | "organization",
    register: boolean
  ) => {
    login.mutate({
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
    mockedLogin.mutate(type);
  };

  return (
    <Container direction="col" className=" p-5">
      <Container direction="col" className="bg-white p-5 md:px-20">
        <PersonIcon style={{ fontSize: "45px", color: "#263652" }} />
        <Container>
          <Heading variant="h2">{t("Login.client")}</Heading>
        </Container>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            onClick={handleOnClickButtonLoginClient}
            title={t("Login.button.login")}
            startIcon={<LoginIcon />}
            variant="primary"
          />
          <Button
            onClick={handleOnClickButtonRegisterClient}
            title={t("Login.button.register")}
            startIcon={<CreateIcon />}
          />
        </div>
      </Container>
      <Container direction="col" className="bg-white p-5 md:px-20">
        <CorporateFareIcon style={{ fontSize: "45px", color: "#263652" }} />
        <Container>
          <Heading variant="h2">{t("Login.orga")}</Heading>
        </Container>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            onClick={handleOnClickButtonLoginOrga}
            title={t("Login.button.login")}
            startIcon={<LoginIcon />}
            variant="primary"
          />
          <Button
            onClick={handleOnClickButtonRegisterOrga}
            title={t("Login.button.register")}
            startIcon={<CreateIcon />}
          />
        </div>
      </Container>
      {process.env.NODE_ENV === "development" ? (
        <Container direction="col" className="bg-white p-5">
          <Heading variant="h1">{t("Login.admin")}</Heading>
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeUser")}
              title={t("Login.button.testuser")}
              variant="primary"
              startIcon={<PersonIcon />}
              className="bg-green-700"
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeOrganization")}
              variant="primary"
              title={t("Login.button.testorga")}
              startIcon={<CorporateFareIcon />}
              className="bg-blue-700"
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeAdmin")}
              variant="primary"
              title={t("Login.button.testadmin")}
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
