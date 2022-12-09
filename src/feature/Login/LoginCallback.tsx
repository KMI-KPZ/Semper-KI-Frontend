import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {}

const LoginCallback = () => {
  const navigate = useNavigate();
  const data: any = useParams();
  const [state, setState] = useState("authToken empty");

  useEffect(() => {
    let u_cookie = Cookies.get("authToken");
    let cookie = u_cookie ? u_cookie : "authToken empty";
    cookie = cookie.replaceAll("\\054", ",").replaceAll("\\", ""); //.replaceAll(/'/gi, '"').
    setState(cookie);
    console.log("JSON", JSON.parse(cookie));
  }, []);

  return (
    <Container>
      <h1>Succesfully Log In</h1>
      {state}
    </Container>
  );
};

export default LoginCallback;
