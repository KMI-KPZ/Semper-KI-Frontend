import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  setUser(user: any): void;
}

const LoginCallback = ({ setUser }: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState("authToken empty");

  useEffect(() => {
    let u_cookie = Cookies.get("authToken");
    let cookie = u_cookie ? u_cookie : "authToken empty";
    cookie = cookie.replaceAll("\\054", ",").replaceAll("\\", "");
    setState(cookie);
    setUser(JSON.parse(cookie));
    console.log("JSON", JSON.parse(cookie));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);

  return (
    <Container>
      <h1>Succesfully Log In</h1>
      {state}
    </Container>
  );
};

export default LoginCallback;
