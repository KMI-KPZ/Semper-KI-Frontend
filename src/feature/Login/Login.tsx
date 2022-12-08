import { Button, Paper } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CRSFToken from "../../hooks/CSRFToken";
import { User } from "../../interface/Interface";

interface Props {
  setUser: (user: User | null) => void;
}

function Login({ setUser }: Props) {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/login")
      .then((response) => {
        console.log("get Login ", response);
        setState(JSON.stringify(response));
      })
      .catch((error) => {
        console.log("get Login error", error);
        setState(JSON.stringify(error));
      });
  }, []);

  const handleOnClickClient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setUser({
      email: "test@test.de",
      name: "test",
      password: "test",
      userId: 0,
      username: "test",
      userType: "client",
    });
    navigate("/");
  };

  const handleOnClickContractor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setUser({
      email: "test@test.de",
      name: "test",
      password: "test",
      userId: 1,
      username: "test",
      userType: "contractor",
    });
    navigate("/");
  };

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
      {/* <Button variant="contained" onClick={handleOnClickClient}>
        Login Client
      </Button>
      <Button variant="contained" onClick={handleOnClickContractor}>
        Login Contractor
      </Button> */}
      {state}
    </Container>
  );
}

export default Login;
