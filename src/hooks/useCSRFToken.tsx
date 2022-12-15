import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useCRSFToken = () => {
  const url: string = "http://localhost:8000/csrfCookie/";
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        setCsrfToken(token !== undefined ? token : "");
        console.log("CSRFToken", token, url);
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
      });
  }, []);

  useEffect(() => {
    axios.defaults.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
  }, [csrfToken]);
};

export default useCRSFToken;
