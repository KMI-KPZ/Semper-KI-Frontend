import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LoadingAnimation from "./LoadingAnimation";

interface Props<T> {
  children?: ReactNode;
  query: UseQueryResult<T, Error> | DefinedUseQueryResult<T, Error>;
  animation?: boolean;
  text?: boolean;
  loadingText?: string;
}

const LoadingSuspense = <T,>(props: Props<T>) => {
  const { t } = useTranslation();
  const {
    children,
    query,
    animation = false,
    loadingText = t("General.LoadingSuspense.loading"),
    text = true,
  } = props;
  if (query.status === "loading")
    return (
      <div className="flex flex-col items-center justify-center pt-5">
        {animation !== undefined && animation === true ? (
          <LoadingAnimation />
        ) : null}
        {text === true ? <h1>{loadingText}</h1> : null}
      </div>
    );
  if (
    query.status === "error" &&
    query.error !== null &&
    query.error !== undefined
  )
    return (
      <div className="flex felx-row items-center justify-center">
        <h1>
          {t("General.LoadingSuspense.error")} : {query.error.message}
        </h1>
      </div>
    );
  return <>{children}</>;
};

export default LoadingSuspense;
