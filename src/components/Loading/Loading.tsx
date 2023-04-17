import React, { ReactNode } from "react";
import { TRequestStatus } from "../../interface/types";
import LoadingAnimation from "./LoadingAnimation";

interface Props {
  children?: ReactNode;
  status: TRequestStatus;
  error: Error | null | undefined;
  animation?: boolean;
}

const Loading: React.FC<Props> = (props) => {
  const { children, status, error, animation } = props;
  if (status === "loading")
    return (
      <div className="flex felx-row items-center justify-center">
        {animation !== undefined && animation === true ? (
          <LoadingAnimation />
        ) : (
          <h1>Loading...</h1>
        )}
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
