import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  setUser(user: any): void;
}

const LoginCallback = ({ setUser }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);

  return (
    <Container>
      <h1>Succesfully Log Out</h1>
    </Container>
  );
};

export default LoginCallback;
