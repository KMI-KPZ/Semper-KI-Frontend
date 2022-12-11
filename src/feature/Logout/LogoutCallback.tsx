import { Logout } from "@mui/icons-material";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Login/Login.scss";

interface Props {
  logout(): void;
}

const LogoutCallback = ({ logout }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return (
    <Container>
      <h1>Succesfully Log Out</h1>
    </Container>
  );
};

export default LogoutCallback;
