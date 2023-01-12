import { Button, Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { IAuthToken, IUser } from "../../interface/Interface";
import Account from "../AuthorizedHome/Account/Account";

interface Props {
  login(): void;
  authToken: IAuthToken | undefined;
}

const LoginCallback = ({ login, authToken }: Props) => {
  useEffect(() => {
    login();
  }, []);

  return (
    <Container>
      <h1>{authToken !== undefined ? "Succesfully Log In" : "Login Failed"}</h1>
      {authToken !== undefined ? <Account authToken={authToken} /> : null}
    </Container>
  );
};

export default LoginCallback;
