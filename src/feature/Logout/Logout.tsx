import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  logout(): void;
}

const Logout = ({ logout }: Props) => {
  const [link, setLink] = useState<string>("/");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/logout")
      .then((response) => {
        console.log("get Logout ", response.data);
        setLink(response.data);
      })
      .catch((error) => {
        console.log("get Logout error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        logout();
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
      ) : error === undefined ? (
        <Navigate replace to={link} />
      ) : (
        <h1>Es ist etwas schiefgelaufen : {error.message}</h1>
      )}
    </Container>
  );
};

export default Logout;
