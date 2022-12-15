import { Button, Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";

interface Props {
  login(): void;
}

const LoginCallback = ({ login }: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState("authToken empty");
  const { response, sendRequest } = useUser();

  useEffect(() => {
    // login();
    // navigate("/");
  }, []);

  const handleOnClick = () => {
    sendRequest();
  };

  return (
    <Container>
      <h1>Succesfully Log In</h1>
      <Button variant="contained" onClick={() => handleOnClick()}>
        Get User
      </Button>
      {response}
    </Container>
  );
};

export default LoginCallback;
