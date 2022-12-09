import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { unstable_HistoryRouter } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  useEffect(() => {
    axios
      .get("http://localhost:8000/login")
      .then((response) => {
        console.log("get Login ", response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("get Login error", error);
      });
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        gap: 5,
      }}
    >
      <div className="lds-circle">
        <div></div>
      </div>
    </Container>
  );
};

export default Login;
