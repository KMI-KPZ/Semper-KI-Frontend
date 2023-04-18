import React from "react";
import { useLogin } from "../../hooks/useLogin";
import { EUserType } from "../../interface/enums";
import Loading from "../Loading/Loading";

interface Props {
  userType?: EUserType;
  path?: string;
  register?: boolean;
}

const Login: React.FC<Props> = (props) => {
  const { userType, path, register } = props;
  const { error, status, data } = useLogin(userType, path, register);

  return (
    <Loading error={error} status={status} animation>
      <h1>Weiterleiten zur Anmeldung</h1>
    </Loading>
  );
};

export default Login;
