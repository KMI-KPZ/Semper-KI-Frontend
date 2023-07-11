import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRedirectLogin } from "./hooks/useRedirectLogin";

interface RedirectLoginProps {}

const RedirectLogin: React.FC<RedirectLoginProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();
  const { redirectLoginQuery } = useRedirectLogin(queryParameters.toString());

  return <LoadingSuspense query={redirectLoginQuery} />;
};

export default RedirectLogin;
