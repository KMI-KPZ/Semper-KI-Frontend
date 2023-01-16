import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthToken } from "../../interface/Interface";

interface Props {
  login(): void;
  authToken: IAuthToken | undefined;
}

const LoginCallback = ({ login, authToken }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    login();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <Container>
      <h1>{authToken !== undefined ? "Login Successful" : "Login Failed"}</h1>
    </Container>
  );
};

export default LoginCallback;
