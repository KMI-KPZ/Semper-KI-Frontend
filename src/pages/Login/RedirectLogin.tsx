import useLogin from "@/api/Authentification/Querys/useLogin";
import { LoadingAnimation } from "@component-library/index";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface RedirectLoginProps {}

const RedirectLogin: React.FC<RedirectLoginProps> = (props) => {
  const {} = props;
  const [queryParameters] = useSearchParams();
  const login = useLogin();

  useEffect(() => {
    login.mutate({
      register: false,
      userType: "organization",
      redirect: queryParameters.toString(),
    });
  }, []);

  return <LoadingAnimation />;
};

export default RedirectLogin;
