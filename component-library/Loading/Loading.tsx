import React, { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogoURL from "@images/logo192.png";
import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query";
import { Heading } from "..";
import { twMerge } from "tailwind-merge";
import LoopIcon from "@mui/icons-material/Loop";

interface LoadingAnimationProps {
  color?: string;
  text?: boolean;
  className?: string;
  variant?: "semper" | "circel";
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = (props) => {
  const { text, className, variant = "semper" } = props;
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    if (text) {
      const intervalId = setInterval(() => {
        setState((count) => (count + 1) % 5);
      }, 500);

      return () => clearInterval(intervalId);
    }
    return;
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
  if (variant === "circel")
    return (
      <div className="h-fit w-fit animate-spin overflow-hidden">
        <LoopIcon className="scale-x-[-1]   " />
      </div>
    );

  return (
    <div className={twMerge("mt-6 p-20", className)}>
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

interface AppLoadingSuspenseProps {}

export const AppLoadingSuspense: React.FC<AppLoadingSuspenseProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-clip bg-white">
      <Heading variant="h1">
        {t("App.components.LoadingSuspense.title")}
      </Heading>
      <Heading variant="h2">
        {t("App.components.LoadingSuspense.loading")}
      </Heading>
    </div>
  );
};
