import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "./hooks/useLogin";
import { Button } from "@component-library/Button";
import { UserSwitch } from "@/components/UserSwitch";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import { UserType } from "@/hooks/useUser";
import { Heading } from "@component-library/Typography";

interface Props {
  path?: string;
  userType?: UserType;
}
type State = {
  userType: UserType;
  load: boolean;
  register: boolean;
};

const LoginView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { path, userType: initialUserType } = props;
  const [state, setState] = useState<State>({
    load: false,
    userType: initialUserType === undefined ? UserType.client : initialUserType,
    register: false,
  });
  const { userType, load, register } = state;
  const { loginQuery } = useLogin(load, userType, register);

  const handleOnClickButtonLogin = () => {
    setState((prevState) => ({ ...prevState, load: true, register: false }));
  };
  const handleOnClickButtonRegister = () => {
    setState((prevState) => ({ ...prevState, load: true, register: true }));
  };

  const handleOnClickUserSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      userType:
        prevState.userType === UserType.client
          ? UserType.manufacturer
          : UserType.client,
    }));
  };

  return (
    <div className="flex w-fit flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">
        {path === undefined
          ? t("Login.LoginView.header")
          : t("Login.LoginView.headerPath")}
      </Heading>
      <UserSwitch onClick={handleOnClickUserSwitch} userType={userType} />
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          onClick={handleOnClickButtonLogin}
          title={t("Login.LoginView.login.header")}
          startIcon={<LoginIcon />}
        />
        <Button
          onClick={handleOnClickButtonRegister}
          title={t("Login.LoginView.register.header")}
          startIcon={<CreateIcon />}
        />
      </div>
    </div>
  );
};

export default LoginView;
