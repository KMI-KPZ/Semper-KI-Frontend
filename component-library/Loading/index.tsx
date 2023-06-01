import React, { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogoURL from "@images/logo192.png";
import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query";

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
    <div className="">
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
}

export const LoadingSuspense = <T,>(
  props: PropsWithChildren<LoadingSuspenseProps<T>>
) => {
  const { t } = useTranslation();
  const {
    children,
    query,
    animation = false,
    loadingText = t("General.LoadingSuspense.loading"),
    text = true,
    errorText,
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
      <div className="felx-row flex items-center justify-center">
        <h1>
          {errorText === undefined
            ? `${t("General.LoadingSuspense.error")} : ${query.error.message}`
            : errorText}
        </h1>
      </div>
    );
  return <>{children}</>;
};
