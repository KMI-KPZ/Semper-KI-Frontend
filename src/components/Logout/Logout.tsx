import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  logout(): void;
}

const Logout = ({ logout }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/logout/`)
      .then((response) => {
        console.log("get Logout ", response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("get Logout error", error);
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

export default Logout;
