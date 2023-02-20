import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { EUserType } from "../../interface/enums";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

interface Props {
  userType: EUserType;
}

const Login: React.FC<Props> = (props) => {
  const { userType } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/public/login/`, {
        headers: {
          Usertype: EUserType[userType],
        },
      })
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
        <LoadingAnimation />
      ) : error !== undefined ? (
        <h1>Es ist etwas schiefgelaufen : {error.message}</h1>
      ) : null}
    </Container>
  );
};

export default Login;
