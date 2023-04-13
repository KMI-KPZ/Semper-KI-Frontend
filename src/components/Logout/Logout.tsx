import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLogout } from "src/hooks/useLogin";
import Loading from "../Loading/Loading";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Logout = () => {
  const { data, error, status } = useLogout();
  return (
    <Loading error={error} status={status} animation>
      <h1>Weiterleiten zur Abmeldung</h1>
    </Loading>
  );
};

export default Logout;
