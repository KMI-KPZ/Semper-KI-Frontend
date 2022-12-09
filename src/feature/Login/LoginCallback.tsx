import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {}

const LoginCallback = () => {
  const navigate = useNavigate();
  const data: any = useParams();
  const [state, setState] = useState("derp_cookie empty");

  useEffect(() => {
    const cookie = Cookies.get("derp_cookie");
    setState(cookie ? cookie : "derp_cookie empty");
    console.log(cookie);
  }, []);

  return (
    <Container>
      <h1>Succesfully Log In</h1>
      {state}
    </Container>
  );
};

export default LoginCallback;
