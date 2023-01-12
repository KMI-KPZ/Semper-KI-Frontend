import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { Navigate, unstable_HistoryRouter } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/public/login/`)
      .then((response) => {
        console.log("get Login ", response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("get Login error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
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
      {isLoading ? (
        <>
          <div className="lds-circle">
            <div></div>
          </div>
        </>
      ) : error !== undefined ? (
        <h1>Es ist etwas schiefgelaufen : {error.message}</h1>
      ) : null}
    </Container>
  );
};

export default Login;
