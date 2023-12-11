import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import useLogin from "@/hooks/useLogin";

interface RedirectLoginProps {}

const RedirectLogin: React.FC<RedirectLoginProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const { login } = useLogin();

  useEffect(() => {
    login({
      register: false,
      userType: "organization",
      redirect: queryParameters.toString(),
    });
  }, []);

  return <LoadingAnimation />;
};

export default RedirectLogin;
