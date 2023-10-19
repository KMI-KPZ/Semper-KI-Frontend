import React, { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogoURL from "@images/logo192.png";
import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query";
import { Heading } from "..";

interface LoadingAnimationProps {
  color?: string;
  text?: boolean;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = (props) => {
  const { color, text } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    if (text) {
      const intervalId = setInterval(() => {
        setState((count) => (count + 1) % 5);
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, []);

  if (text)
    return (
      <div className="flex flex-row">
        {text}
        <div className={` ${state > 0 ? "" : "invisible"}`}>.</div>
        <div className={` ${state > 1 ? "" : "invisible"}`}>.</div>
        <div className={` ${state > 2 ? "" : "invisible"}`}>.</div>
      </div>
    );
  return (
    <div className=" mt-6">
      <div className="h-24 w-24 animate-bounce">
        <img src={LogoURL} alt="" />
      </div>
    </div>
  );
};

interface LoadingSuspenseProps<T> {
  // children?: ReactNode;
  query: UseQueryResult<T, Error> | DefinedUseQueryResult<T, Error>;
  animation?: boolean;
  text?: boolean;
  loadingText?: string;
  errorText?: string;
  refetchLoading?: boolean;
}

export const LoadingSuspense = <T,>(
  props: PropsWithChildren<LoadingSuspenseProps<T>>
) => {
  const { t } = useTranslation();
  const {
    children,
    query,
    animation = false,
    loadingText = t("component-library.Loading.LoadingSuspense.loading"),
    text = true,
    errorText,
    refetchLoading,
  } = props;
  if (
    query.status === "loading" ||
    (refetchLoading === true && query.isFetching)
  )
    return (
      <div className="flex flex-col items-center justify-center pt-5">
        {animation !== undefined && animation === true ? (
          <LoadingAnimation />
        ) : null}
        {text === true ? <Heading variant="h1">{loadingText}</Heading> : null}
      </div>
    );
  if (
    query.status === "error" &&
    query.error !== null &&
    query.error !== undefined
  )
    return (
      <div className="flex flex-row items-center justify-center">
        <Heading variant="h1">
          {errorText === undefined
            ? `${t("component-library.Loading.LoadingSuspense.error")} : ${
                query.error.message
              }`
            : errorText}
        </Heading>
      </div>
    );
  return <>{children}</>;
};
