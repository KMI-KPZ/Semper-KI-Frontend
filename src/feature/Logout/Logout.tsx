import { Button, Paper } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  logout(): void;
}

const Logout = ({ logout }: Props) => {
  const navigate = useNavigate();

  const [state, setState] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/logout")
      .then((response) => {
        console.log("get Logout ", response.data);
        setState(response.data);
        logout();
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("get Logout error", error);
        logout();
        navigate("/");
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      Loggin out...
      <div className="lds-circle">
        <div></div>
      </div>
    </Container>
  );
};

export default Logout;
