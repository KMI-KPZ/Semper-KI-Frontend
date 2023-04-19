import React, { ReactNode } from "react";
import { TUseMutationStatus, TUseQueryStatus } from "../../interface/types";
import LoadingAnimation from "./LoadingAnimation";

interface Props {
  children?: ReactNode;
  status: TUseQueryStatus | TUseMutationStatus;
  error: Error | null | undefined;
  animation?: boolean;
  text?: boolean;
  loadingText?: string;
}

const Loading: React.FC<Props> = (props) => {
  const {
    children,
    status,
    error,
    animation = false,
    loadingText = "Loading...",
    text = true,
  } = props;
  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center pt-5">
        {animation !== undefined && animation === true ? (
          <LoadingAnimation />
        ) : null}
        {text === true ? <h1>{loadingText}</h1> : null}
      </div>
    );
  if (status === "error" && error !== null && error !== undefined)
    return (
      <div className="flex felx-row items-center justify-center">
        <h1>Error : {error?.message}</h1>
      </div>
    );
  return <>{children}</>;
};

export default Loading;
