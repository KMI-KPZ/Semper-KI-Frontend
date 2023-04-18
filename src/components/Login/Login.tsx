import React from "react";
import { useLogin } from "../../hooks/useLogin";
import { EUserType } from "../../interface/enums";
import Loading from "../Loading/Loading";

interface Props {
  userType?: EUserType;
  path?: string;
}

const Login: React.FC<Props> = (props) => {
  const { userType, path } = props;
  const { error, status, data } = useLogin(userType, path);

  return (
    <Loading error={error} status={status} animation>
      <h1>Weiterleiten zur Anmeldung</h1>
    </Loading>
  );
};

export default Login;
