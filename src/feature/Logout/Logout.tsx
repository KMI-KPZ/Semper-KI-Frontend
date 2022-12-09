import { Button, Paper } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interface/Interface";

interface Props {
  setUser: (user: User | null) => void;
}

function Logout({ setUser }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/logout")
      .then((response) => {
        console.log("get Logout ", response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("get Logout error", error);
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
    </Container>
  );
}

export default Logout;
