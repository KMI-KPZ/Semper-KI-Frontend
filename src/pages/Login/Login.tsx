import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "./hooks/useLogin";
import { Button } from "@component-library/Button";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import { UserType } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/Typography";
import Switch from "@/components/Switch";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { UserSwitch } from "@/components/UserSwitch";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import useDevMode, { MockedUserType } from "@/hooks/useDevMode";

interface Props {
  path?: string;
  userType?: UserType;
}
type State = {
  load: boolean;
  register: boolean;
  orga: boolean;
};

const Login: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { path, userType: initialUserType } = props;
  const [state, setState] = useState<State>({
    load: false,
    register: false,
    orga: false,
  });
  const { load, register, orga } = state;
  const { loginQuery } = useLogin(load, orga, register);

  const { mockedLoginMutation } = useDevMode();

  const handleOnClickButtonLogin = () => {
    setState((prevState) => ({ ...prevState, load: true, register: false }));
  };
  const handleOnClickButtonRegister = () => {
    setState((prevState) => ({ ...prevState, load: true, register: true }));
  };

  const handleOnClickSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      orga: !prevState.orga,
    }));
  };

  const testOnClick = (userType: UserType) => {
    setState((prevState) => ({
      ...prevState,
      orga: userType === UserType.ORGANIZATION,
    }));
  };

  const handleOnClickButtonMockedLogin = (type: MockedUserType) => {
    mockedLoginMutation.mutate(type);
  };

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 sm:w-fit"
      data-testid="login"
    >
      <Heading variant="h1">
        {path === undefined
          ? t("Login.Login.header")
          : t("Login.Login.headerPath")}
      </Heading>
      <UserSwitch
        onClick={testOnClick}
        userType={orga ? UserType.ORGANIZATION : UserType.USER}
      />
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          onClick={handleOnClickButtonLogin}
          title={t("Login.Login.buttons.login")}
          startIcon={<LoginIcon />}
        />
        <Button
          active={!orga}
          onClick={handleOnClickButtonRegister}
          title={t("Login.Login.buttons.register")}
          startIcon={<CreateIcon />}
        />
      </div>
      {process.env.NODE_ENV === "development" ? (
        <>
          <Heading variant="h1">{t("Login.Login.admin")}</Heading>
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <Button
              onClick={() => handleOnClickButtonMockedLogin("user")}
              title={t("Login.Login.buttons.user")}
              startIcon={<PersonIcon />}
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("organisation")}
              title={t("Login.Login.buttons.orga")}
              startIcon={<PeopleIcon />}
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("admin")}
              title={t("Login.Login.buttons.admin")}
              startIcon={<AdminPanelSettingsIcon />}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Login;
