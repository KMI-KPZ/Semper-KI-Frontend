import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "./hooks/useLogin";
import { Button } from "@component-library/Button";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import { UserType } from "@/hooks/useUser/types";
import { Heading, Text } from "@component-library/Typography";
import Switch from "@/components/Switch";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

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

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 sm:w-fit"
      data-testid="login"
    >
      <Heading variant="h1">
        {path === undefined
          ? t("Login.LoginView.header")
          : t("Login.LoginView.headerPath")}
      </Heading>
      <Heading variant="h3" className="text-red-500">
        Momentan noch nicht funktional
      </Heading>
      <Switch
        value={orga}
        leftChildren={
          <div className="flex flex-row items-center justify-center gap-3 px-3 py-2">
            <PersonIcon />
            <Text variant="body">{t("Login.LoginView.user")}</Text>
          </div>
        }
        rightChildren={
          <div className="flex flex-row items-center justify-center gap-3 px-3 py-2">
            <GroupIcon />
            <Text variant="body">{t("Login.LoginView.orga")}</Text>
          </div>
        }
        onClick={handleOnClickSwitch}
      />
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          onClick={handleOnClickButtonLogin}
          title={t("Login.LoginView.login.header")}
          startIcon={<LoginIcon />}
        />
        <Button
          active={!orga}
          onClick={handleOnClickButtonRegister}
          title={t("Login.LoginView.register.header")}
          startIcon={<CreateIcon />}
        />
      </div>
    </div>
  );
};

export default Login;
