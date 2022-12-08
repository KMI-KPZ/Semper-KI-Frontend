import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const LoginCallback = (data: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, []);

  return (
    <Container>
      <h1>Succesfully Log In</h1>
      {JSON.stringify(data)}
    </Container>
  );
};

export default LoginCallback;
