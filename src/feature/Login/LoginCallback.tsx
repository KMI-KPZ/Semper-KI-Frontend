import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  login(): void;
}

const LoginCallback = ({ login }: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState("authToken empty");

  useEffect(() => {
    // let u_cookie = Cookies.get("authToken");
    // let cookie = u_cookie ? u_cookie : "authToken empty";
    // cookie = cookie.replaceAll("\\054", ",").replaceAll("\\", "");
    // // Cookies.set("authToken", JSON.parse(cookie));
    // console.log("Cookie", JSON.parse(cookie));
    // setState(cookie);
    // setUser(JSON.parse(cookie));
    // console.log("JSON", JSON.parse(cookie));
    // console.log(window.document, window.caches, window.fetch, window);

    login();
    navigate("/");
  }, []);

  return (
    <Container>
      <h1>Succesfully Log In</h1>
    </Container>
  );
};

export default LoginCallback;
