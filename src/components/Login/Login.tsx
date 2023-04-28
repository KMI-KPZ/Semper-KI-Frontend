import React from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../hooks/useLogin";
import { EUserType } from "../../interface/enums";
import LoadingSuspense from "../General/LoadingSuspense";

interface Props {
  userType?: EUserType;
  path?: string;
  register?: boolean;
}

const Login: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { userType, path, register } = props;
  const { loginQuery } = useLogin(userType, path, register);

  return (
    <LoadingSuspense query={loginQuery} animation>
      <h1>{t("Login.Login.redirect")}</h1>
    </LoadingSuspense>
  );
};

export default Login;
