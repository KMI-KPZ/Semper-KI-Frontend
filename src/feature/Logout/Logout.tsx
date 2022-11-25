import { Button, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interface/Interface";

interface Props {
  setUser: (user: User | null) => void;
}

function Logout({ setUser }: Props) {
  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setUser(null);
    navigate("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Button variant="contained" onClick={handleOnClick}>
        Logout
      </Button>
    </Container>
  );
}

export default Logout;
