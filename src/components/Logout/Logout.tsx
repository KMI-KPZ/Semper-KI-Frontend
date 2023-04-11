import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLogout } from "src/hooks/useLogin";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Logout = () => {
  const { data, error, isLoading } = useLogout();
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      {isLoading || data !== undefined ? (
        <LoadingAnimation />
      ) : error !== undefined ? (
        <h1>Es ist etwas schiefgelaufen : {error?.message}</h1>
      ) : null}
    </div>
  );
};

export default Logout;
