import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interface/Interface";

interface Props {
  login(): void;
  user: IUser | undefined;
}

const LoginCallback = ({ login, user }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    login();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <Container>
      <h1>{user !== undefined ? "Login Successful" : "Login Failed"}</h1>
    </Container>
  );
};

export default LoginCallback;
