import React from "react";
import { EUserType } from "@/interface/enums";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useLogin } from "../../hooks/useLogin";

interface Props {
  userType: EUserType;
}

const Login: React.FC<Props> = (props) => {
  const { userType } = props;
  const { error, isLoading, data } = useLogin(userType);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      {isLoading || data !== undefined ? (
        <LoadingAnimation />
      ) : error !== undefined && error !== null ? (
        <h1>Es ist etwas schiefgelaufen {error?.message}</h1>
      ) : null}
    </div>
  );
};

export default Login;
