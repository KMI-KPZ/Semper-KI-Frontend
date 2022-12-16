import { Logout } from "@mui/icons-material";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../Login/Login.scss";

interface Props {
  logout(): void;
}

const LogoutCallback = ({ logout }: Props) => {
  useEffect(() => {
    logout();
  }, []);

  return <Navigate replace to="/" />;
};

export default LogoutCallback;
