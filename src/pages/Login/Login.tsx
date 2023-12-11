import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import Container from "@component-library/Container";
import { Navigate, useNavigate } from "react-router-dom";
import useLoginMutations, {
  LoginUserType,
} from "@/api/Login/useLoginMutations";

interface Props {
  path?: string;
  userType?: UserType;
}
type State = {
  orga: boolean;
};

const Login: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { path, userType } = props;
  const [state, setState] = useState<State>({
    orga: false,
  });
  const { orga } = state;
  const { loginMutation } = useLoginMutations();
  const navigate = useNavigate();

  const handleOnClickButtonLogin = () => {
    loginMutation.mutate({
      userType: orga ? "organization" : "user",
      register: false,
    });
  };
  const handleOnClickButtonRegister = () => {
    if (orga) {
      navigate("/registerorganization");
    } else {
      loginMutation.mutate({
        userType: "user",
        register: true,
      });
    }
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

  const handleOnClickButtonMockedLogin = (type: LoginUserType) => {
    loginMutation.mutate({
      userType: type,
      register: false,
    });
  };

  return (
    <Container direction="col" className="bg-white p-5">
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
          onClick={handleOnClickButtonRegister}
          title={t("Login.Login.buttons.register")}
          startIcon={<CreateIcon />}
        />
      </div>
      {process.env.NODE_ENV === "development" ? (
        <Container direction="col">
          <Heading variant="h1">{t("Login.Login.admin")}</Heading>
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeUser")}
              title={t("Login.Login.buttons.user")}
              startIcon={<PersonIcon />}
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeOrganization")}
              title={t("Login.Login.buttons.orga")}
              startIcon={<PeopleIcon />}
            />
            <Button
              onClick={() => handleOnClickButtonMockedLogin("fakeAdmin")}
              title={t("Login.Login.buttons.admin")}
              startIcon={<AdminPanelSettingsIcon />}
            />
          </div>
        </Container>
      ) : null}
    </Container>
  );
};

export default Login;
